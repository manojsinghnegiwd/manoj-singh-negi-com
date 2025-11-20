# YouTube Video Crawler

Automatically crawl your YouTube channel and extract video information - **no API key required!**

## 🚀 Quick Start

Run the crawler for your channel:

```bash
npm run crawl:youtube
```

That's it! The script will:
1. Open your YouTube channel in a headless browser
2. Crawl the videos page
3. Extract titles, view counts, and video IDs
4. Generate formatted config code
5. Save data to `youtube-videos.json`

## 📋 Custom Usage

Crawl different channel or change number of videos:

```bash
node scripts/crawl-youtube-channel.js [channelUrl] [maxVideos]
```

**Examples:**

```bash
# Get 5 videos (default)
node scripts/crawl-youtube-channel.js https://www.youtube.com/@Manojsinghnegiwd/videos

# Get 10 videos
node scripts/crawl-youtube-channel.js https://www.youtube.com/@Manojsinghnegiwd/videos 10

# Different channel
node scripts/crawl-youtube-channel.js https://www.youtube.com/@YourChannel/videos 3
```

## ✨ What It Does

The crawler:
- ✅ Uses Puppeteer (headless Chrome) to load your channel
- ✅ Extracts video titles, IDs, view counts
- ✅ Gets high-quality thumbnail URLs
- ✅ Formats everything for `config/site.ts`
- ✅ Saves JSON backup
- ✅ **No API key needed!**

## 📝 After Running

1. Check the terminal output
2. Copy the `featuredVideos` array
3. Paste into `config/site.ts`
4. Refresh your portfolio - videos updated! ✨

## 🎯 Example Output

```javascript
featuredVideos: [
  {
    id: "lnOq5AYTBCs",
    title: "Building an AI Task Planner with Next js & OpenAI",
    thumbnail: "https://img.youtube.com/vi/lnOq5AYTBCs/maxresdefault.jpg",
    views: "146",
    url: "https://www.youtube.com/watch?v=lnOq5AYTBCs",
  },
  // ... more videos
],
```

## 🔧 Troubleshooting

### "No videos found"
- Make sure the channel URL ends with `/videos`
- Try increasing the timeout in the script
- Check if YouTube's HTML structure changed

### Script hangs or times out
- YouTube might be slow to load
- Try running again
- Check your internet connection

### Wrong view counts
- View counts are approximate
- YouTube sometimes shows "No views" for very new videos
- You can manually adjust in `config/site.ts`

## 💡 Tips

**Best Practices:**
- Run the script periodically to keep videos updated
- Show 2-3 videos for minimal design
- Pick videos with good thumbnails
- Sort by views to show most popular

**Manual Adjustments:**
After running the script, you can manually:
- Reorder videos
- Update titles for better formatting
- Adjust view counts to be more appealing (e.g., "150" → "150+")

## 🆚 vs API Method

| Feature | Web Crawler | YouTube API |
|---------|------------|-------------|
| API Key | ❌ Not needed | ✅ Required |
| View Count | ✅ Accurate | ✅ Accurate |
| Titles | ✅ Exact | ✅ Exact |
| Speed | 🐢 Slower (15-30s) | ⚡ Faster (2-5s) |
| Rate Limits | ✅ None | ⚠️ 10K/day |
| Reliability | ⚠️ May break if YT changes HTML | ✅ Stable |

**Recommendation:** Use the web crawler for initial setup and occasional updates. It's simple and requires no API setup!

## 📚 Technical Details

**Stack:**
- Puppeteer (headless Chrome)
- No external APIs
- Direct HTML parsing

**How it works:**
1. Launches Chrome in headless mode
2. Navigates to your channel's videos page
3. Waits for videos to render
4. Scrolls to load more content
5. Extracts data from DOM
6. Formats and outputs config

## 🔄 Keeping Videos Fresh

To update your portfolio videos regularly:

1. **Manual:** Run `npm run crawl:youtube` whenever you want
2. **Scheduled:** Set up a cron job or GitHub Action
3. **On demand:** Run before deployments

**Example weekly update:**
```bash
# Add to crontab (runs every Sunday at 3 AM)
0 3 * * 0 cd /path/to/project && npm run crawl:youtube
```

---

**Happy crawling! 🕷️** Your portfolio now stays synced with your latest YouTube content! 🎥
