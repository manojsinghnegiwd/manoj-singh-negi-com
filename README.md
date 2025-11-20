# Portfolio Website

A minimal, single-page portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 **Minimal Design**: Clean, modern interface with dark mode support
- 🏢 **Companies Showcase**: Display companies you've helped build with clickable links
- 🎥 **YouTube Integration**: Displays your most popular videos with auto-refresh API
- 📝 **Blog Integration**: Pulls latest posts from WordPress (debuggingmylife.com)
- 📱 **Fully Responsive**: Optimized for all screen sizes
- ⚡ **Fast & Modern**: Built with Next.js 14 App Router and server components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Web Scraping**: Puppeteer for YouTube crawler
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- No API keys required!

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd manojsinghnegicom
```

2. Install dependencies:
```bash
npm install
```

3. Update your personal information in `config/site.ts`:
   - Name, tagline, and bio
   - Social links (GitHub, YouTube, LinkedIn, etc.)
   - Featured GitHub repository slugs
   - YouTube video details
   - AI chatbot system prompt

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### YouTube Video Auto-Fetch Scripts

Instead of manually updating video information, use our scripts:

**Option 1: Simple URL Formatter** (No API key needed)
```bash
npm run fetch:youtube-simple
```
Paste your video URLs and get formatted config output.

**Option 2: Automatic with API** (Fetches titles & views automatically)
```bash
npm run fetch:youtube YOUR_CHANNEL_ID 5
```
Requires YouTube Data API key in `.env.local`.

See `scripts/README.md` for detailed instructions.

### Personal Information

Edit `config/site.ts` to customize:

- **Personal details**: Name, tagline, bio
- **Social links**: GitHub, YouTube, Blog, LinkedIn, Email
- **Featured repos**: Add your GitHub repository slugs (e.g., "username/repo-name")
- **YouTube videos**: Add video IDs, titles, thumbnails, and view counts
- **AI chatbot**: Customize the system prompt with your background and expertise

### GitHub Projects

The site automatically fetches repository data from GitHub. To display your projects:

1. Add repository slugs to `featuredRepos` in `config/site.ts`
2. Format: `"username/repository-name"`
3. No GitHub token required for public repos (60 requests/hour limit)
4. Add `GITHUB_TOKEN` to `.env.local` for higher rate limits

### YouTube Videos

YouTube integration is manual (no API key required):

1. Get video IDs from YouTube URLs (e.g., `https://youtube.com/watch?v=VIDEO_ID`)
2. Get thumbnails: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
3. Add video details to `featuredVideos` in `config/site.ts`

### WordPress Blog

The site automatically fetches posts from your WordPress blog:

1. Ensure your blog has the WordPress REST API enabled (default)
2. Update `WORDPRESS_BLOG_URL` in `.env.local`
3. Displays the 3 most recent posts

## API Endpoints for Content Refresh

The portfolio includes API endpoints to keep your content up to date. These can be called manually or set up as scheduled tasks.

### Refresh Blog Posts
```bash
GET /api/refresh-blog?count=3
```
Fetches the latest blog posts from WordPress and returns formatted data.

**Response:**
```json
{
  "success": true,
  "count": 3,
  "posts": [...],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Refresh YouTube Videos
```bash
GET /api/refresh-youtube
```
Runs the YouTube crawler script to fetch latest videos from your channel.

**Response:**
```json
{
  "success": true,
  "message": "YouTube videos refreshed",
  "output": "..."
}
```

### Refresh All Content
```bash
GET /api/refresh-content?youtube=true&blog=true&maxVideos=3&maxPosts=3
```
Fetches both YouTube videos and blog posts in one request.

**Query Parameters:**
- `youtube` (boolean): Refresh YouTube videos (default: true)
- `blog` (boolean): Refresh blog posts (default: true)
- `maxVideos` (number): Maximum videos to fetch (default: 3)
- `maxPosts` (number): Maximum posts to fetch (default: 3)

**Example Usage:**
```bash
# Refresh blog posts only
curl http://localhost:3000/api/refresh-blog?count=5

# Refresh YouTube videos
curl http://localhost:3000/api/refresh-youtube

# Refresh everything
curl http://localhost:3000/api/refresh-content
```

**For Production:**
Set up a cron job or scheduled task (e.g., GitHub Actions, Vercel Cron) to call these endpoints periodically:
```bash
# Example cron job (runs daily at 3 AM)
0 3 * * * curl https://your-domain.com/api/refresh-content
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy! (No environment variables needed)

### Deploy to Other Platforms

This is a standard Next.js 14 application and can be deployed to:
- Netlify
- AWS Amplify
- Self-hosted (Node.js server)

Ensure environment variables are set in your hosting platform.

## Project Structure

```
/app
  /api
    /blog              # WordPress API proxy
    /refresh-content   # Refresh all content (YouTube + Blog)
    /refresh-youtube   # Refresh YouTube videos
    /refresh-blog      # Refresh blog posts
  layout.tsx           # Root layout with footer and theme toggle
  page.tsx             # Main landing page
/components
  - hero.tsx                  # Hero section with intro and social links
  - companies.tsx             # Companies showcase
  - youtube-section.tsx       # YouTube videos grid
  - blog-posts.tsx            # Blog posts grid
  - footer.tsx                # Site footer
  - theme-toggle.tsx          # Dark/light mode toggle
  - floating-theme-toggle.tsx # Floating theme toggle button
  /ui                         # shadcn/ui components
/lib
  - wordpress.ts       # WordPress API helpers
  - youtube-crawler.ts # Puppeteer-based YouTube crawler
  - utils.ts           # Utility functions
/config
  - site.ts            # Site configuration (companies, videos, links)
/scripts
  - crawl-youtube-channel.js # YouTube channel crawler
  - README.md                # Script documentation
```

## Customization

### Colors & Theme

The project uses Tailwind CSS with shadcn/ui theming. To customize colors:

1. Edit `app/globals.css` to change color variables
2. Modify `--color-*` variables for light and dark modes

### Layout

All sections are in a single page (`app/page.tsx`). The layout is designed for minimal scrolling:
- Hero: 1 viewport
- Projects: 0.5 viewport
- Videos: 0.5 viewport
- Blog: 0.5 viewport
- Total: ~2.5 viewports

### Adding Sections

To add new sections:

1. Create a new component in `/components`
2. Import and add it to `app/page.tsx`
3. Wrap async components in `<Suspense>` with a skeleton fallback

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you encounter issues:
1. Check that all environment variables are set
2. Ensure your OpenAI API key is valid
3. Verify your GitHub repo slugs are correct
4. Check that your WordPress blog's REST API is accessible

For more help, open an issue on GitHub.
