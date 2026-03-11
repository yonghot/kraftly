"use client";

import { useTranslations } from "next-intl";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { GALLERY_IMAGES } from "@/data/images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import type { JewelryType } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/motion";

const MOCK_DESIGNS = K_DESIGN_CATEGORIES.flatMap((cat, catIdx) =>
  Array.from({ length: 3 }).map((_, i) => ({
    id: `mock-${cat.id}-${i}`,
    category_id: cat.id,
    jewelry_type: (
      ["ring", "necklace", "earring", "bracelet", "brooch"] as JewelryType[]
    )[(catIdx + i) % 5],
    likes_count: Math.floor(Math.random() * 50) + 5,
    image_url: GALLERY_IMAGES[cat.id]?.[i] ?? null,
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
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        {/* 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-5xl"
        >
          {t("title")}
        </motion.h1>

        {/* 필터 바 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-between"
        >
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full text-xs transition-all",
                activeCategory === "all"
                  ? "bg-gold text-white shadow-md shadow-gold/20 hover:bg-gold/90"
                  : "border-warm-border hover:border-gold/30"
              )}
              onClick={() => setActiveCategory("all")}
            >
              {t("allCategories")}
            </Button>
            {K_DESIGN_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full text-xs transition-all",
                  activeCategory === cat.id
                    ? "bg-gold text-white shadow-md shadow-gold/20 hover:bg-gold/90"
                    : "border-warm-border hover:border-gold/30"
                )}
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
            <TabsList className="bg-muted/50">
              <TabsTrigger value="latest" className="text-xs">
                {t("sortLatest")}
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-xs">
                {t("sortPopular")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* 갤러리 그리드 */}
        {sortedDesigns.length === 0 ? (
          <div className="mt-28 text-center">
            <Sparkles className="mx-auto h-14 w-14 text-muted-foreground/15" />
            <p className="mt-5 text-sm text-muted-foreground">
              {t("noDesigns")}
            </p>
            <Link href="/studio" className="mt-6 inline-block">
              <Button className="rounded-xl bg-gold text-white hover:bg-gold/90">
                <Sparkles className="mr-2 h-4 w-4" />
                Start Designing
              </Button>
            </Link>
          </div>
        ) : (
          <StaggerContainer className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4" delay={0.05}>
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
                <StaggerItem key={design.id}>
                  <Link
                    href={`/design/${design.id}`}
                    className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-warm-border/40 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5"
                  >
                    {/* 이미지 */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio:
                          design.jewelry_type === "necklace" ? "3/4" : "1/1",
                      }}
                    >
                      {design.image_url ? (
                        <Image
                          src={design.image_url}
                          alt={`${catName} design`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div
                          className="flex h-full items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${design.color}15, ${category?.color_palette[1] || "#E5E2DC"}22)`,
                          }}
                        >
                          <Sparkles
                            className="h-8 w-8 opacity-15"
                            style={{ color: design.color }}
                          />
                        </div>
                      )}
                    </div>

                    {/* 정보 */}
                    <div className="p-3.5">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="rounded-md bg-transparent px-0 text-[11px] font-medium"
                          style={{ color: design.color }}
                        >
                          {catName}
                        </Badge>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                          <Heart className="h-3 w-3" />
                          <span>{design.likes_count}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </PageTransition>
  );
}
