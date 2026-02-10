"use client";

import { useTranslations } from "next-intl";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { JewelryType } from "@/types";

// 초안용 목(mock) 데이터 — Supabase 연결 후 교체 예정
const MOCK_DESIGNS = K_DESIGN_CATEGORIES.flatMap((cat, catIdx) =>
  Array.from({ length: 3 }).map((_, i) => ({
    id: `mock-${cat.id}-${i}`,
    category_id: cat.id,
    jewelry_type: (["ring", "necklace", "earring", "bracelet", "brooch"] as JewelryType[])[
      (catIdx + i) % 5
    ],
    likes_count: Math.floor(Math.random() * 50) + 5,
    image_url: null as string | null,
    color: cat.color_palette[i % 4],
  }))
);

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState<"latest" | "popular">("latest");

  const filteredDesigns =
    activeCategory === "all"
      ? MOCK_DESIGNS
      : MOCK_DESIGNS.filter((d) => d.category_id === activeCategory);

  const sortedDesigns = [...filteredDesigns].sort((a, b) =>
    sort === "popular" ? b.likes_count - a.likes_count : 0
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      {/* 타이틀 */}
      <h1 className="text-center font-serif text-3xl font-bold text-navy md:text-4xl">
        {t("title")}
      </h1>

      {/* 필터 바 */}
      <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveCategory("all")}
          >
            {t("allCategories")}
          </Button>
          {K_DESIGN_CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveCategory(cat.id)}
            >
              {locale === "ko" ? cat.name_ko : cat.name_en}
            </Button>
          ))}
        </div>

        {/* 정렬 */}
        <Tabs
          value={sort}
          onValueChange={(v) => setSort(v as "latest" | "popular")}
        >
          <TabsList>
            <TabsTrigger value="latest">{t("sortLatest")}</TabsTrigger>
            <TabsTrigger value="popular">{t("sortPopular")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 갤러리 그리드 */}
      {sortedDesigns.length === 0 ? (
        <div className="mt-20 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">{t("noDesigns")}</p>
        </div>
      ) : (
        <div className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4">
          {sortedDesigns.map((design) => {
            const category = K_DESIGN_CATEGORIES.find(
              (c) => c.id === design.category_id
            );
            const catName = category
              ? locale === "ko"
                ? category.name_ko
                : category.name_en
              : "";

            return (
              <Link
                key={design.id}
                href={`/design/${design.id}`}
                className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {/* 이미지 (플레이스홀더) */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    aspectRatio:
                      design.jewelry_type === "necklace" ? "3/4" : "1/1",
                    background: `linear-gradient(135deg, ${design.color}20, ${category?.color_palette[1] || "#E5E2DC"}30)`,
                  }}
                >
                  <Sparkles
                    className="h-8 w-8 opacity-20 transition-opacity group-hover:opacity-40"
                    style={{ color: design.color }}
                  />
                </div>

                {/* 정보 */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{
                        backgroundColor: design.color + "15",
                        color: design.color,
                      }}
                    >
                      {catName}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      <span>{design.likes_count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
