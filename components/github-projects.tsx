import { getGitHubRepos } from "@/lib/github";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function GitHubProjects() {
  const repos = await getGitHubRepos(siteConfig.featuredRepos);

  if (repos.length === 0) {
    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Featured Projects</h2>
          <p className="text-center text-muted-foreground">
            Update your GitHub repository slugs in config/site.ts to display projects.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-bold">Featured Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <Card key={repo.full_name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-1">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {repo.name}
                  </a>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {repo.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <Badge variant="secondary">{repo.language}</Badge>
                  )}
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </Badge>
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Project
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

