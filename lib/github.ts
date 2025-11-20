export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  homepage: string | null;
  fork: boolean;
}

export async function getGitHubRepo(repoSlug: string): Promise<GitHubRepo | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${repoSlug}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch repo ${repoSlug}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching GitHub repo ${repoSlug}:`, error);
    return null;
  }
}

export async function getGitHubRepos(repoSlugs: string[]): Promise<GitHubRepo[]> {
  const repos = await Promise.all(repoSlugs.map(slug => getGitHubRepo(slug)));
  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}

