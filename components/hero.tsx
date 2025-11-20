import { siteConfig } from "@/config/site";
import { Github, Youtube, ExternalLink, Mail, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-20 pb-0 text-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
        {siteConfig.tagline}
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {siteConfig.bio}
      </p>

      <div className="mt-8 text-center">
        <a
          href={siteConfig.links.email}
          className="text-lg font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors sm:text-xl"
        >
          Let's work together
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="default">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="mr-2 h-4 w-4" />
            YouTube
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href={siteConfig.links.blog}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Blog
          </a>
        </Button>
        <Button asChild variant="outline" size="icon">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
        <Button asChild variant="outline" size="icon">
          <a href={siteConfig.links.email} aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
        </Button>
        <Button asChild variant="outline" size="icon">
          <a href={siteConfig.links.phone} aria-label="Phone">
            <Phone className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}

