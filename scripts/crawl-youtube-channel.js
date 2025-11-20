#!/usr/bin/env node

/**
 * YouTube Channel Crawler
 * 
 * This script crawls your YouTube channel page and extracts video information.
 * No API key required - direct web scraping!
 * 
 * Usage:
 *   node scripts/crawl-youtube-channel.js [channelUrl] [maxVideos]
 * 
 * Example:
 *   node scripts/crawl-youtube-channel.js https://www.youtube.com/@Manojsinghnegiwd/videos 5
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function formatViews(viewText) {
  if (!viewText) return '0';
  
  // Extract number from text like "1.2K views" or "50,123 views"
  const match = viewText.match(/([\d,.]+[KMB]?)/);
  if (match) {
    let num = match[1].replace(/,/g, '');
    // Already formatted (has K, M, B)
    if (/[KMB]/.test(num)) {
      return num;
    }
    // Convert raw numbers to K/M format
    const count = parseInt(num);
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }
  return '0';
}

function extractVideoId(url) {
  const match = url.match(/\/watch\?v=([^&]+)/);
  return match ? match[1] : null;
}

async function crawlYouTubeChannel(channelUrl, maxVideos = 5) {
  console.log('🚀 Starting YouTube channel crawler...\n');
  console.log(`📍 Channel URL: ${channelUrl}`);
  console.log(`📊 Max videos to fetch: ${maxVideos}\n`);

  let browser;
  
  try {
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('📥 Loading channel page...');
    await page.goto(channelUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for videos to load
    console.log('⏳ Waiting for videos to load...');
    await page.waitForSelector('ytd-rich-item-renderer', { timeout: 15000 });

    // Scroll to load more videos
    console.log('📜 Scrolling to load more videos...');
    await autoScroll(page);

    // Extract video data
    console.log('🔍 Extracting video information...');
    const videos = await page.evaluate((maxCount) => {
      const videoElements = document.querySelectorAll('ytd-rich-item-renderer');
      const videoData = [];

      for (let i = 0; i < Math.min(videoElements.length, maxCount * 2); i++) {
        const element = videoElements[i];
        
        try {
          // Get video link
          const linkElement = element.querySelector('#video-title-link');
          if (!linkElement) continue;
          
          const url = linkElement.href;
          const title = linkElement.getAttribute('title') || linkElement.textContent.trim();
          
          // Get view count
          const metadataLine = element.querySelector('#metadata-line');
          let viewText = '';
          if (metadataLine) {
            const spans = metadataLine.querySelectorAll('span');
            viewText = spans[0]?.textContent || '';
          }
          
          // Get thumbnail
          const thumbnailElement = element.querySelector('img');
          const thumbnail = thumbnailElement?.src || '';

          if (url && title) {
            videoData.push({
              url,
              title,
              viewText,
              thumbnail
            });
          }
        } catch (err) {
          console.error('Error extracting video:', err.message);
        }
      }

      return videoData;
    }, maxVideos);

    console.log(`\n✅ Found ${videos.length} videos\n`);

    if (videos.length === 0) {
      console.log('⚠️  No videos found. The page structure might have changed.');
      await browser.close();
      return;
    }

    // Process and format videos
    const formattedVideos = videos.slice(0, maxVideos).map((video, index) => {
      const videoId = extractVideoId(video.url);
      const views = formatViews(video.viewText);
      const thumbnail = videoId 
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : video.thumbnail;

      console.log(`${index + 1}. ${video.title}`);
      console.log(`   Views: ${views} | ID: ${videoId}`);
      console.log(`   URL: ${video.url}\n`);

      return {
        id: videoId,
        title: video.title,
        thumbnail: thumbnail,
        views: views,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });

    // Generate config file format
    console.log('\n📝 Copy this to your config/site.ts:\n');
    console.log('featuredVideos: [');
    formattedVideos.forEach((video, index) => {
      console.log('  {');
      console.log(`    id: "${video.id}",`);
      console.log(`    title: "${video.title.replace(/"/g, '\\"')}",`);
      console.log(`    thumbnail: "${video.thumbnail}",`);
      console.log(`    url: "${video.url}",`);
      console.log('  }' + (index < formattedVideos.length - 1 ? ',' : ''));
    });
    console.log('],\n');

    // Save to file
    const outputPath = path.join(__dirname, '../youtube-videos.json');
    fs.writeFileSync(outputPath, JSON.stringify(formattedVideos, null, 2));
    console.log(`💾 Video data saved to: ${outputPath}`);
    console.log('\n✨ Done! Copy the config above to config/site.ts');

    await browser.close();

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight || totalHeight >= 3000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // Wait for content to load
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Main execution
const channelUrl = process.argv[2] || 'https://www.youtube.com/@Manojsinghnegiwd/videos';
const maxVideos = parseInt(process.argv[3] || '5');

if (!channelUrl.includes('youtube.com')) {
  console.error('❌ Error: Invalid YouTube URL');
  console.log('\nUsage: node scripts/crawl-youtube-channel.js [channelUrl] [maxVideos]');
  console.log('\nExample:');
  console.log('  node scripts/crawl-youtube-channel.js https://www.youtube.com/@Manojsinghnegiwd/videos 5');
  process.exit(1);
}

crawlYouTubeChannel(channelUrl, maxVideos);

