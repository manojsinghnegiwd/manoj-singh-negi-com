import { getGitHubRepos } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repos = await getGitHubRepos(siteConfig.featuredRepos);
    return NextResponse.json(repos);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories" },
      { status: 500 }
    );
  }
}

