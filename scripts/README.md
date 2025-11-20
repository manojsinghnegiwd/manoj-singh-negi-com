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
3. Extract titles and video IDs
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
- ✅ Extracts video titles and IDs
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

## 💡 Tips

**Best Practices:**
- Run the script periodically to keep videos updated
- Show 2-3 videos for minimal design
- Pick videos with good thumbnails

**Manual Adjustments:**
After running the script, you can manually:
- Reorder videos
- Update titles for better formatting

## 🔄 Keeping Videos Fresh

To update your portfolio videos regularly:

1. **Manual:** Run `npm run crawl:youtube` whenever you want
2. **API:** Use the refresh endpoint: `GET /api/refresh-youtube`

**Example API call:**
```bash
curl https://your-domain.com/api/refresh-youtube?maxVideos=5
```

---

**Happy crawling! 🕷️** Your portfolio now stays synced with your latest YouTube content! 🎥
