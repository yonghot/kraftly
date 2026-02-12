"use client";

import { useTranslations, useLocale } from "next-intl";
import { MOCK_ARTISANS } from "@/data/artisans";
import { ArtisanCard } from "@/components/artisan/artisan-card";
import { ArtisanFilters } from "@/components/artisan/artisan-filters";
import { useArtisanStore } from "@/stores/artisan-store";
import { Users } from "lucide-react";
import type { JewelryType, Material } from "@/types";

export default function ArtisansPage() {
  const t = useTranslations("artisans");
  const locale = useLocale();
  const { filters, setFilter } = useArtisanStore();

  const filtered = MOCK_ARTISANS.filter((a) => {
    if (!a.is_active) return false;
    if (filters.specialty && !a.specialties.includes(filters.specialty))
      return false;
    if (filters.material && !a.materials.includes(filters.material))
      return false;
    if (filters.location) {
      const loc = locale === "ko" ? a.location_ko : a.location_en;
      if (!loc.includes(filters.location)) return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-center text-3xl font-bold tracking-tight text-navy md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        {t("subtitle")}
      </p>

      {/* 필터 */}
      <div className="mt-8">
        <ArtisanFilters
          specialty={filters.specialty}
          material={filters.material}
          location={filters.location}
          onSpecialtyChange={(v: JewelryType | null) =>
            setFilter("specialty", v)
          }
          onMaterialChange={(v: Material | null) => setFilter("material", v)}
          onLocationChange={(v: string | null) => setFilter("location", v)}
          locale={locale}
        />
      </div>

      {/* 장인 그리드 */}
      {filtered.length === 0 ? (
        <div className="mt-24 text-center">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/20" />
          <p className="mt-4 text-sm text-muted-foreground">
            {t("noResults")}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}
    </div>
  );
}
