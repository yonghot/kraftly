import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center gap-6">
        <Skeleton className="h-12 w-3/4 max-w-lg rounded-xl" />
        <Skeleton className="h-5 w-2/3 max-w-md rounded-lg" />
        <Skeleton className="mt-4 h-12 w-40 rounded-xl" />
      </div>

      {/* Content skeleton */}
      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-warm-border/40">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-4 w-1/3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
