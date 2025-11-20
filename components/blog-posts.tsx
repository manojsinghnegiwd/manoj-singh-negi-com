import { getWordPressPosts, stripHtmlTags, formatDate, decodeHtmlEntitiesServer } from "@/lib/wordpress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";

export async function BlogPosts() {
  const blogUrl = "https://debuggingmylife.com";
  const posts = await getWordPressPosts(blogUrl, 3);

  if (posts.length === 0) {
    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-muted-foreground">
            Unable to load blog posts. Check your WordPress blog URL.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <a
            href={blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors md:text-5xl"
          >
            Debuggingmylife.com
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {decodeHtmlEntitiesServer(stripHtmlTags(post.title.rendered))}
                  </a>
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {decodeHtmlEntitiesServer(stripHtmlTags(post.excerpt.rendered))}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Read More
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View All Posts
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

