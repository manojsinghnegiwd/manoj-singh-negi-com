#!/usr/bin/env node

/**
 * Simple YouTube Video Formatter
 * 
 * This script helps you format YouTube video URLs into the config format.
 * No API key required - just paste your video URLs!
 * 
 * Usage:
 *   node scripts/fetch-youtube-simple.js
 * 
 * Then paste your video URLs (one per line) and press Ctrl+D when done.
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const videos = [];

console.log('📹 YouTube Video Formatter\n');
console.log('Paste your YouTube video URLs (one per line)');
console.log('Press Ctrl+D (Mac/Linux) or Ctrl+Z (Windows) when done\n');

rl.on('line', (line) => {
  const url = line.trim();
  if (!url) return;

  // Extract video ID from various YouTube URL formats
  let videoId = null;
  
  // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  let match = url.match(/[?&]v=([^&]+)/);
  if (match) videoId = match[1];
  
  // Short URL: https://youtu.be/VIDEO_ID
  if (!videoId) {
    match = url.match(/youtu\.be\/([^?]+)/);
    if (match) videoId = match[1];
  }
  
  // Embed URL: https://www.youtube.com/embed/VIDEO_ID
  if (!videoId) {
    match = url.match(/youtube\.com\/embed\/([^?]+)/);
    if (match) videoId = match[1];
  }

  if (videoId) {
    videos.push({
      id: videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    });
    console.log(`✓ Added: ${videoId}`);
  } else {
    console.log(`✗ Invalid URL: ${url}`);
  }
});

rl.on('close', () => {
  if (videos.length === 0) {
    console.log('\n⚠️  No valid YouTube URLs found');
    process.exit(0);
  }

  console.log(`\n✅ Found ${videos.length} video(s)\n`);
  console.log('📝 Copy this to your config/site.ts:\n');
  console.log('featuredVideos: [');
  
  videos.forEach((video, index) => {
    console.log('  {');
    console.log(`    id: "${video.id}",`);
    console.log(`    title: "Your Video Title Here", // TODO: Add title`);
    console.log(`    thumbnail: "${video.thumbnail}",`);
    console.log(`    url: "${video.url}",`);
    console.log('  }' + (index < videos.length - 1 ? ',' : ''));
  });
  
  console.log('],\n');
  console.log('💡 Tips:');
  console.log('  - Update the title for each video');
  console.log('  - Keep 2-3 videos for minimal design\n');
});

