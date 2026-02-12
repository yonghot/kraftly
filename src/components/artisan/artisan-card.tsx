"use client";

import type { ArtisanProfile } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Star, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtisanCardProps {
  artisan: ArtisanProfile;
  matchScore?: number;
  onSelect?: (id: string) => void;
}

export function ArtisanCard({ artisan, matchScore, onSelect }: ArtisanCardProps) {
  const t = useTranslations("artisans");
  const tJewelry = useTranslations("jewelryTypes");
  const tMaterial = useTranslations("materials");
  const locale = useLocale();

  const name = locale === "ko" ? artisan.display_name_ko : artisan.display_name_en;
  const location = locale === "ko" ? artisan.location_ko : artisan.location_en;

  return (
    <div className="group overflow-hidden rounded-2xl border border-warm-border/40 bg-card transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5">
      {/* 상단: 아바타 + 기본정보 */}
      <div className="flex items-start gap-4 p-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
          <img
            src={artisan.avatar_url}
            alt={name}
            className="h-full w-full object-cover"
          />
          {artisan.is_verified && (
            <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-500 p-0.5">
              <Award className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-navy">
              {name}
            </h3>
            {matchScore != null && (
              <Badge
                className={cn(
                  "shrink-0 text-[11px]",
                  matchScore >= 0.9
                    ? "bg-amber-100 text-amber-700"
                    : matchScore >= 0.7
                      ? "bg-slate-100 text-slate-600"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {t("matchScore", { score: Math.round(matchScore * 100) })}
              </Badge>
            )}
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {t("rating", {
                score: artisan.avg_rating.toFixed(1),
                count: artisan.total_reviews,
              })}
            </span>
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            {t("yearsExp", { count: artisan.years_experience })}
            {" · "}
            {t("minPrice", { price: artisan.min_price_krw.toLocaleString() })}
            {" · "}
            <Clock className="inline h-3 w-3" />{" "}
            {t("leadTime", { days: artisan.avg_lead_days })}
          </div>
        </div>
      </div>

      {/* 전문분야 + 소재 뱃지 */}
      <div className="border-t border-warm-border/30 px-5 py-3">
        <div className="flex flex-wrap gap-1.5">
          {artisan.specialties.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-md text-[11px]"
            >
              {tJewelry(s)}
            </Badge>
          ))}
          {artisan.materials.map((m) => (
            <Badge
              key={m}
              variant="outline"
              className="rounded-md text-[11px]"
            >
              {tMaterial(m)}
            </Badge>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2 border-t border-warm-border/30 px-5 py-3">
        <Link href={`/artisans/${artisan.id}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-lg text-xs"
          >
            {t("viewProfile")}
          </Button>
        </Link>
        {onSelect && (
          <Button
            size="sm"
            className="flex-1 rounded-lg bg-gold text-xs text-white hover:bg-gold/90"
            onClick={() => onSelect(artisan.id)}
          >
            {t("selectArtisan")}
          </Button>
        )}
      </div>
    </div>
  );
}
