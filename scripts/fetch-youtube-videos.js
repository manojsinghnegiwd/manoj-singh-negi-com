#!/usr/bin/env node

/**
 * YouTube Video Fetcher Script
 * 
 * This script fetches your most popular YouTube videos using the YouTube Data API
 * and generates the config format needed for your portfolio.
 * 
 * Usage:
 *   node scripts/fetch-youtube-videos.js [channelId] [maxResults]
 * 
 * Example:
 *   node scripts/fetch-youtube-videos.js UC_x5XG1OV2P6uZZ5FSM9Ttw 5
 * 
 * Requirements:
 *   - YouTube Data API key (get one at https://console.cloud.google.com/)
 *   - Add YOUTUBE_API_KEY to your .env.local file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

function formatViews(viewCount) {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

function fetchChannelUploadsPlaylist(channelId) {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        if (json.error) {
          reject(new Error(json.error.message));
        } else if (json.items && json.items.length > 0) {
          const uploadsPlaylistId = json.items[0].contentDetails.relatedPlaylists.uploads;
          resolve(uploadsPlaylistId);
        } else {
          reject(new Error('Channel not found'));
        }
      });
    }).on('error', reject);
  });
}

function fetchPlaylistVideos(playlistId, maxResults = 5) {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        if (json.error) {
          reject(new Error(json.error.message));
        } else {
          resolve(json.items || []);
        }
      });
    }).on('error', reject);
  });
}

function fetchVideoStats(videoIds) {
  return new Promise((resolve, reject) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        if (json.error) {
          reject(new Error(json.error.message));
        } else {
          resolve(json.items || []);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const channelId = process.argv[2];
  const maxResults = parseInt(process.argv[3] || '5');

  if (!channelId) {
    console.error('❌ Error: Channel ID is required');
    console.log('\nUsage: node scripts/fetch-youtube-videos.js [channelId] [maxResults]');
    console.log('\nHow to find your Channel ID:');
    console.log('1. Go to your YouTube channel');
    console.log('2. Click on your profile icon');
    console.log('3. Go to "YouTube Studio"');
    console.log('4. Click "Settings" → "Channel" → "Advanced settings"');
    console.log('5. Copy your Channel ID');
    console.log('\nExample: node scripts/fetch-youtube-videos.js UC_x5XG1OV2P6uZZ5FSM9Ttw 5');
    process.exit(1);
  }

  if (!YOUTUBE_API_KEY) {
    console.error('❌ Error: YOUTUBE_API_KEY not found in .env.local');
    console.log('\nHow to get a YouTube API key:');
    console.log('1. Go to https://console.cloud.google.com/');
    console.log('2. Create a new project or select existing one');
    console.log('3. Enable "YouTube Data API v3"');
    console.log('4. Go to "Credentials" → "Create Credentials" → "API Key"');
    console.log('5. Copy the API key');
    console.log('6. Add to .env.local: YOUTUBE_API_KEY=your_key_here');
    process.exit(1);
  }

  try {
    console.log('🔍 Fetching channel information...');
    const uploadsPlaylistId = await fetchChannelUploadsPlaylist(channelId);
    
    console.log('📹 Fetching videos from channel...');
    const playlistItems = await fetchPlaylistVideos(uploadsPlaylistId, maxResults);
    
    if (playlistItems.length === 0) {
      console.log('⚠️  No videos found in this channel');
      process.exit(0);
    }

    const videoIds = playlistItems.map(item => item.snippet.resourceId.videoId);
    
    console.log('📊 Fetching video statistics...');
    const videos = await fetchVideoStats(videoIds);

    // Sort by view count
    videos.sort((a, b) => {
      return parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount);
    });

    // Take top videos
    const topVideos = videos.slice(0, maxResults);

    console.log('\n✅ Top ' + topVideos.length + ' Most Popular Videos:\n');

    const configFormat = topVideos.map((video, index) => {
      const videoId = video.id;
      const title = video.snippet.title;
      const views = formatViews(video.statistics.viewCount);
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      console.log(`${index + 1}. ${title}`);
      console.log(`   Views: ${views} | ID: ${videoId}\n`);

      return {
        id: videoId,
        title: title,
        thumbnail: thumbnail,
        views: views,
        url: url,
      };
    });

    // Generate config file format
    console.log('\n📝 Copy this to your config/site.ts:\n');
    console.log('featuredVideos: [');
    configFormat.forEach((video, index) => {
      console.log('  {');
      console.log(`    id: "${video.id}",`);
      console.log(`    title: "${video.title.replace(/"/g, '\\"')}",`);
      console.log(`    thumbnail: "${video.thumbnail}",`);
      console.log(`    url: "${video.url}",`);
      console.log('  }' + (index < configFormat.length - 1 ? ',' : ''));
    });
    console.log('],\n');

    // Optionally save to file
    const outputPath = path.join(__dirname, '../youtube-videos.json');
    fs.writeFileSync(outputPath, JSON.stringify(configFormat, null, 2));
    console.log(`💾 Video data saved to: ${outputPath}`);
    console.log('\n✨ Done! Copy the config above to config/site.ts');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

