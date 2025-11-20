import { Hero } from "@/components/hero";
import { Companies } from "@/components/companies";
import { YouTubeSection } from "@/components/youtube-section";
import { BlogPosts } from "@/components/blog-posts";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function BlogSkeleton() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-bold">Latest from the Blog</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <YouTubeSection />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogPosts />
      </Suspense>
    </>
  );
}
