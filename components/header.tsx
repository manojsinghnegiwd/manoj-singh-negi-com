import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="font-semibold">{siteConfig.name}</div>
        <ThemeToggle />
      </div>
    </header>
  );
}

