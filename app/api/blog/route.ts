import { getWordPressPosts } from "@/lib/wordpress";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get("count") || "5", 10);
    const blogUrl = process.env.WORDPRESS_BLOG_URL || "https://debuggingmylife.com";

    const posts = await getWordPressPosts(blogUrl, count);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("WordPress API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

