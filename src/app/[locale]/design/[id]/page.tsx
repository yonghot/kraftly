import { useTranslations } from "next-intl";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;

  // 초안: mock 데이터로 표시 — Supabase 연결 후 실제 데이터 조회로 교체
  const categoryIdx = Math.abs(
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 6
  );
  const category = K_DESIGN_CATEGORIES[categoryIdx];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      {/* 뒤로 가기 */}
      <Link
        href="/gallery"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Gallery
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 이미지 */}
        <div
          className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${category.color_palette[0]}20, ${category.color_palette[1]}30)`,
          }}
        >
          <Sparkles
            className="h-16 w-16 opacity-20"
            style={{ color: category.color_palette[0] }}
          />
        </div>

        {/* 정보 */}
        <div>
          <Badge
            className="mb-4"
            style={{
              backgroundColor: category.color_palette[0] + "15",
              color: category.color_palette[0],
            }}
          >
            {category.name_en}
          </Badge>

          <h1 className="font-serif text-2xl font-bold text-navy">
            {category.name_en} Design
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {category.description_en}
          </p>

          <Separator className="my-6" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{category.name_en}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Jewelry Type</span>
              <span className="font-medium">Ring</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material</span>
              <span className="font-medium">Sterling Silver</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Design ID</span>
              <span className="font-mono text-xs">{id}</span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* 액션 버튼 */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-xl">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              className="rounded-xl bg-navy text-white hover:bg-navy/90"
              disabled
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Order This Design
              <span className="ml-1 text-xs opacity-70">(Coming Soon)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
