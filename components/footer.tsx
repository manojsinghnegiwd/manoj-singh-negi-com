import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 px-4">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>
          © {currentYear} {siteConfig.name}. Built with Next.js, TypeScript, and
          Tailwind CSS.
        </p>
        <p className="mt-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            View Source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

