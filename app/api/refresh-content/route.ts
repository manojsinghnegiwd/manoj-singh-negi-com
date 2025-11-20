import { NextResponse } from "next/server";
import { getWordPressPosts } from "@/lib/wordpress";
import { crawlYouTubeChannel } from "@/lib/youtube-crawler";
import { siteConfig } from "@/config/site";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const refreshYouTube = searchParams.get('youtube') !== 'false';
    const refreshBlog = searchParams.get('blog') !== 'false';
    const maxVideos = parseInt(searchParams.get('maxVideos') || '3', 10);
    const maxPosts = parseInt(searchParams.get('maxPosts') || '3', 10);

    const results: {
      youtube?: any;
      blog?: any;
      timestamp: string;
    } = {
      timestamp: new Date().toISOString(),
    };

    // Fetch YouTube videos
    if (refreshYouTube) {
      const channelUrl = `${siteConfig.links.youtube}/videos`;
      const videos = await crawlYouTubeChannel(channelUrl, maxVideos);
      results.youtube = {
        videos: videos,
        count: videos.length,
      };
    }

    // Fetch blog posts
    if (refreshBlog) {
      const blogUrl = process.env.WORDPRESS_BLOG_URL || siteConfig.links.blog;
      const posts = await getWordPressPosts(blogUrl, maxPosts);
      
      results.blog = {
        posts: posts.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          link: post.link,
          date: post.date,
        })),
        count: posts.length,
      };
    }

    return NextResponse.json({
      success: true,
      data: results,
      message: 'Content refreshed successfully',
    });
  } catch (error) {
    console.error('Error refreshing content:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh content',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST endpoint to trigger refresh (useful for webhooks)
export async function POST(request: Request) {
  return GET(request);
}

