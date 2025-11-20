import { NextResponse } from "next/server";
import { crawlYouTubeChannel } from "@/lib/youtube-crawler";
import { siteConfig } from "@/config/site";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxVideos = parseInt(searchParams.get("maxVideos") || "5", 10);
    const channelUrl = `${siteConfig.links.youtube}/videos`;

    const videos = await crawlYouTubeChannel(channelUrl, maxVideos);

    return NextResponse.json({
      success: true,
      message: "YouTube videos refreshed successfully",
      count: videos.length,
      videos: videos,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error refreshing YouTube videos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh YouTube videos",
        message: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}

