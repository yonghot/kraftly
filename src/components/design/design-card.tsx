"use client";

import type { Design } from "@/types";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

interface DesignCardProps {
  design: Design;
}

export function DesignCard({ design }: DesignCardProps) {
  const locale = useLocale();
  const category = K_DESIGN_CATEGORIES.find(
    (c) => c.id === design.category_id
  );
  const categoryName = category
    ? locale === "ko"
      ? category.name_ko
      : category.name_en
    : design.category_id;

  const displayImage =
    design.selected_image_url || design.image_urls[0] || "";

  return (
    <Link
      href={`/design/${design.id}`}
      className="group block overflow-hidden rounded-2xl border border-warm-border/40 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5"
    >
      {/* 이미지 */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {displayImage ? (
          <img
            src={displayImage}
            alt={`${categoryName} ${design.jewelry_type}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* 카드 하단 정보 */}
      <div className="p-3.5">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="rounded-md bg-transparent px-0 text-[11px] font-medium"
            style={{
              color: category?.color_palette[0],
            }}
          >
            {categoryName}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <Heart className="h-3 w-3" />
            <span>{design.likes_count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
