"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { JewelryType, Material } from "@/types";

const SPECIALTIES: JewelryType[] = [
  "ring",
  "necklace",
  "earring",
  "bracelet",
  "brooch",
];

const MATERIALS: Material[] = [
  "silver",
  "gold_14k",
  "gold_18k",
  "rose_gold",
  "platinum",
];

const LOCATIONS_EN = [
  "Seoul",
  "Busan",
  "Daegu",
  "Jeonju",
  "Incheon",
  "Gwangju",
];
const LOCATIONS_KO = [
  "서울",
  "부산",
  "대구",
  "전주",
  "인천",
  "광주",
];

interface ArtisanFiltersProps {
  specialty: JewelryType | null;
  material: Material | null;
  location: string | null;
  onSpecialtyChange: (v: JewelryType | null) => void;
  onMaterialChange: (v: Material | null) => void;
  onLocationChange: (v: string | null) => void;
  locale: string;
}

export function ArtisanFilters({
  specialty,
  material,
  location,
  onSpecialtyChange,
  onMaterialChange,
  onLocationChange,
  locale,
}: ArtisanFiltersProps) {
  const t = useTranslations("artisans");
  const tJewelry = useTranslations("jewelryTypes");
  const tMaterial = useTranslations("materials");

  const chipClass = (active: boolean) =>
    cn(
      "rounded-full text-xs",
      active
        ? "bg-gold text-white hover:bg-gold/90"
        : "border-warm-border hover:border-gold/30"
    );

  return (
    <div className="space-y-4">
      {/* 전문 분야 */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {t("filterSpecialty")}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={specialty === null ? "default" : "outline"}
            size="sm"
            className={chipClass(specialty === null)}
            onClick={() => onSpecialtyChange(null)}
          >
            {t("filterAll")}
          </Button>
          {SPECIALTIES.map((s) => (
            <Button
              key={s}
              variant={specialty === s ? "default" : "outline"}
              size="sm"
              className={chipClass(specialty === s)}
              onClick={() => onSpecialtyChange(s)}
            >
              {tJewelry(s)}
            </Button>
          ))}
        </div>
      </div>

      {/* 소재 */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {t("filterMaterial")}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={material === null ? "default" : "outline"}
            size="sm"
            className={chipClass(material === null)}
            onClick={() => onMaterialChange(null)}
          >
            {t("filterAll")}
          </Button>
          {MATERIALS.map((m) => (
            <Button
              key={m}
              variant={material === m ? "default" : "outline"}
              size="sm"
              className={chipClass(material === m)}
              onClick={() => onMaterialChange(m)}
            >
              {tMaterial(m)}
            </Button>
          ))}
        </div>
      </div>

      {/* 지역 */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {t("filterLocation")}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={location === null ? "default" : "outline"}
            size="sm"
            className={chipClass(location === null)}
            onClick={() => onLocationChange(null)}
          >
            {t("filterAll")}
          </Button>
          {(locale === "ko" ? LOCATIONS_KO : LOCATIONS_EN).map((loc) => (
            <Button
              key={loc}
              variant={location === loc ? "default" : "outline"}
              size="sm"
              className={chipClass(location === loc)}
              onClick={() => onLocationChange(loc)}
            >
              {loc}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
