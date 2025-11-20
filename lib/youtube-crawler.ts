import puppeteer from 'puppeteer';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

function extractVideoId(url: string): string | null {
  const match = url.match(/\/watch\?v=([^&]+)/);
  return match ? match[1] : null;
}

async function autoScroll(page: any) {
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
          resolve(null);
        }
      }, 100);
    });
  });
  
  // Wait for content to load
  await new Promise(resolve => setTimeout(resolve, 2000));
}

export async function crawlYouTubeChannel(
  channelUrl: string,
  maxVideos: number = 5
): Promise<YouTubeVideo[]> {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.goto(channelUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for videos to load
    await page.waitForSelector('ytd-rich-item-renderer', { timeout: 15000 });

    // Scroll to load more videos
    await autoScroll(page);

    // Extract video data
    const videos = await page.evaluate((maxCount) => {
      const videoElements = document.querySelectorAll('ytd-rich-item-renderer');
      const videoData: Array<{ url: string; title: string; thumbnail: string }> = [];

      for (let i = 0; i < Math.min(videoElements.length, maxCount * 2); i++) {
        const element = videoElements[i];
        
        try {
          // Get video link
          const linkElement = element.querySelector('#video-title-link') as HTMLAnchorElement;
          if (!linkElement) continue;
          
          const url = linkElement.href;
          const title = linkElement.getAttribute('title') || linkElement.textContent?.trim() || '';

          // Get thumbnail
          const thumbnailElement = element.querySelector('img') as HTMLImageElement;
          const thumbnail = thumbnailElement?.src || '';

          if (url && title) {
            videoData.push({
              url,
              title,
              thumbnail
            });
          }
        } catch (err) {
          console.error('Error extracting video:', err);
        }
      }

      return videoData;
    }, maxVideos);

    await browser.close();

    // Process and format videos
    const formattedVideos: YouTubeVideo[] = videos.slice(0, maxVideos).map((video) => {
      const videoId = extractVideoId(video.url);
      const thumbnail = videoId 
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : video.thumbnail;

      return {
        id: videoId || '',
        title: video.title,
        thumbnail: thumbnail,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });

    return formattedVideos;

  } catch (error) {
    if (browser) await browser.close();
    console.error('Error crawling YouTube channel:', error);
    throw error;
  }
}

