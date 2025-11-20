import { siteConfig } from "@/config/site";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

export function YouTubeSection() {
  return (
    <section className="px-4 py-12 bg-muted/50">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.featuredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/30">
                  <div className="rounded-full bg-red-600 p-3">
                    <Play className="h-6 w-6 text-white" fill="white" />
                  </div>
                </div>
              </a>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-base">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {video.title}
                  </a>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Code with me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

