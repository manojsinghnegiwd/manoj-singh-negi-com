# Quick Setup Guide

## 🚀 Getting Your Portfolio Running

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Set Up Environment Variables

Create or update `.env.local` with your actual API key:

```env
# Required for AI Chatbot
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Optional - for higher GitHub API limits
GITHUB_TOKEN=ghp_your_github_token_here

# Your WordPress blog URL
WORDPRESS_BLOG_URL=https://debuggingmylife.com
```

### 3. Customize Your Content

Edit `config/site.ts` with your information:

```typescript
export const siteConfig = {
  name: "Your Name Here",
  tagline: "Your Tagline Here",
  bio: "Your bio here...",
  
  links: {
    github: "https://github.com/yourusername",
    youtube: "https://youtube.com/@yourchannel",
    blog: "https://yourblog.com",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:your@email.com",
  },

  // Add YOUR actual GitHub repos (username/repo-name)
  featuredRepos: [
    "yourusername/your-awesome-project",
    "yourusername/another-cool-project",
    "yourusername/interesting-tool",
  ],

  // Add YOUR YouTube videos
  featuredVideos: [
    {
      id: "YOUR_VIDEO_ID",  // From YouTube URL
      title: "Your Video Title",
      thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg",
      views: "10K",
      url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
    },
    // Add 2-3 more videos...
  ],
};
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Test Features

- ✅ Check all sections load correctly
- ✅ Test the AI chatbot (make sure OPENAI_API_KEY is set)
- ✅ Toggle dark/light mode
- ✅ Verify GitHub projects display
- ✅ Check YouTube videos
- ✅ Confirm blog posts load

### 6. Build for Production

```bash
npm run build
npm start
```

### 7. Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (OPENAI_API_KEY, etc.)
5. Deploy!

## 📝 Important Notes

### Getting Your YouTube Video IDs

From this URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
The video ID is: `dQw4w9WgXcQ`

Thumbnail URL format:
```
https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
```

### GitHub Repo Format

- Format: `"username/repository-name"`
- Example: `"facebook/react"`, `"vercel/next.js"`
- Must be public repositories (or add GITHUB_TOKEN for private)

### OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Add it to `.env.local`

**Note**: The chatbot uses GPT-4o-mini for cost efficiency. You can change the model in `lib/openai.ts`.

### WordPress Blog

Your WordPress blog must have the REST API enabled (it's on by default). The site will fetch posts from:
```
https://yourblog.com/wp-json/wp/v2/posts
```

Test it by visiting that URL in your browser. You should see JSON data.

## 🎨 Customization Tips

### Change Colors

Edit `app/globals.css` - modify the CSS variables for light/dark modes.

### Adjust Section Sizes

Edit `app/page.tsx` and component files to change grid layouts:
- `sm:grid-cols-2` = 2 columns on small screens
- `lg:grid-cols-3` = 3 columns on large screens

### Modify AI Chatbot Personality

Edit `chatbotPrompt` in `config/site.ts` to change how the AI responds.

### Add More Sections

1. Create new component in `/components`
2. Import and add to `app/page.tsx`
3. Wrap async components in `<Suspense>`

## 🐛 Troubleshooting

### GitHub Repos Not Showing
- Check repo slugs are correct (username/repo-name)
- Ensure repos are public or add GITHUB_TOKEN
- Check browser console for errors

### AI Chat Not Working
- Verify OPENAI_API_KEY is set in `.env.local`
- Check you have credits in your OpenAI account
- Look at browser console for error messages

### Blog Posts Not Loading
- Verify WordPress URL is correct
- Test the REST API: `https://yourblog.com/wp-json/wp/v2/posts`
- Check browser console for CORS or fetch errors

### Build Errors
- Run `npm run build` to see detailed error messages
- Check all imports are correct
- Ensure all required environment variables are set

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [OpenAI API](https://platform.openai.com/docs)
- [GitHub API](https://docs.github.com/en/rest)

## ✨ You're All Set!

Your minimal portfolio is ready to go. Customize it, make it yours, and deploy it to share with the world! 🚀

