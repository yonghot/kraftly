import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
      {/* 타이틀 */}
      <div className="flex justify-center">
        <Skeleton className="h-12 w-64 rounded-xl" />
      </div>

      {/* 필터 바 */}
      <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-9 w-40 rounded-lg" />
      </div>

      {/* 갤러리 그리드 */}
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-warm-border/40"
          >
            <Skeleton
              className="w-full"
              style={{
                aspectRatio: i % 3 === 1 ? "3/4" : "1/1",
              }}
            />
            <div className="p-3.5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
