import { NextResponse } from "next/server";
import { getWordPressPosts, stripHtmlTags, decodeHtmlEntitiesServer } from "@/lib/wordpress";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get("count") || "3", 10);
    const blogUrl = "https://debuggingmylife.com";

    const posts = await getWordPressPosts(blogUrl, count);

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: decodeHtmlEntitiesServer(stripHtmlTags(post.title.rendered)),
      excerpt: decodeHtmlEntitiesServer(stripHtmlTags(post.excerpt.rendered)),
      link: post.link,
      date: post.date,
      formattedDate: new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    return NextResponse.json({
      success: true,
      count: formattedPosts.length,
      posts: formattedPosts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(new Request("http://localhost/api/refresh-blog"));
}

