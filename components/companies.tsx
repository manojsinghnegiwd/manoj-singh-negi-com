import { siteConfig } from "@/config/site";

export function Companies() {
  if (siteConfig.companies.length === 0) {
    return null;
  }

  return (
    <section className="px-4 pt-2 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-base font-medium text-muted-foreground md:text-lg">
            Companies I have helped build
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {siteConfig.companies.map((company, index) => (
            <a
              key={index}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl font-bold text-foreground transition-colors hover:!text-blue-600 dark:hover:!text-blue-400 md:text-5xl"
            >
              {company.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

