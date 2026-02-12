"use client";

import type { DesignCategory } from "@/types";
import Image from "next/image";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CATEGORY_IMAGES } from "@/data/images";

interface CategoryCardProps {
  category: DesignCategory;
  selected?: boolean;
  onClick?: () => void;
  showDescription?: boolean;
}

export function CategoryCard({
  category,
  selected = false,
  onClick,
  showDescription = false,
}: CategoryCardProps) {
  const locale = useLocale();
  const name = locale === "ko" ? category.name_ko : category.name_en;
  const description =
    locale === "ko" ? category.description_ko : category.description_en;
  const imageUrl = CATEGORY_IMAGES[category.id];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex aspect-[3/4] w-full min-w-[160px] flex-col justify-end overflow-hidden rounded-2xl border-2 transition-all duration-300",
        selected
          ? "border-gold shadow-lg shadow-gold/20"
          : "border-transparent shadow-sm hover:shadow-md"
      )}
    >
      {/* 배경 이미지 */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${category.color_palette[0]}20, ${category.color_palette[1]}30, ${category.color_palette[2]}20)`,
          }}
        />
      )}

      {/* 하단 그라데이션 오버레이 + 텍스트 */}
      <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-20">
        <h3 className="text-sm font-bold text-white">{name}</h3>
        {showDescription && description && (
          <p className="mt-1 line-clamp-2 text-xs text-white/80">
            {description}
          </p>
        )}
      </div>

      {/* 선택 표시 */}
      {selected && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs text-white">
          ✓
        </div>
      )}
    </button>
  );
}
