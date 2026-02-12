import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { GALLERY_IMAGES } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;

  const categoryIdx = Math.abs(
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 6
  );
  const category = K_DESIGN_CATEGORIES[categoryIdx];

  const categoryImages = GALLERY_IMAGES[category.id] ?? [];
  const imageIdx = Math.abs(
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % Math.max(categoryImages.length, 1)
  );
  const imageUrl = categoryImages[imageIdx] ?? null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
      {/* 뒤로 가기 */}
      <Link
        href="/gallery"
        className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Gallery
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* 이미지 */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-warm-border/40">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${category.name_en} Design`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div
              className="flex h-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${category.color_palette[0]}18, ${category.color_palette[1]}25)`,
              }}
            />
          )}
        </div>

        {/* 정보 */}
        <div>
          <Badge
            className="mb-5 rounded-md text-xs font-medium"
            style={{
              backgroundColor: category.color_palette[0] + "12",
              color: category.color_palette[0],
            }}
          >
            {category.name_en}
          </Badge>

          <h1 className="text-2xl font-bold tracking-tight text-navy">
            {category.name_en} Design
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {category.description_en}
          </p>

          <Separator className="my-6 bg-warm-border/40" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium text-foreground">{category.name_en}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Jewelry Type</span>
              <span className="font-medium text-foreground">Ring</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material</span>
              <span className="font-medium text-foreground">Sterling Silver</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Design ID</span>
              <span className="font-mono text-xs text-muted-foreground">{id}</span>
            </div>
          </div>

          <Separator className="my-6 bg-warm-border/40" />

          {/* 액션 버튼 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-warm-border"
            >
              <Heart className="mr-1.5 h-3.5 w-3.5" />
              Like
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-warm-border"
            >
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
              Share
            </Button>
            <Button
              size="sm"
              className="rounded-lg bg-navy text-white hover:bg-navy/90"
              disabled
            >
              <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
              Order This Design
              <span className="ml-1 text-[10px] opacity-60">(Coming Soon)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
