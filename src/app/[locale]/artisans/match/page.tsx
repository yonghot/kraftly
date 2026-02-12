"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useArtisanStore } from "@/stores/artisan-store";
import { ArtisanCard } from "@/components/artisan/artisan-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { JewelryType, Material } from "@/types";

export default function ArtisanMatchPage() {
  const t = useTranslations("artisans");
  const tJewelry = useTranslations("jewelryTypes");
  const tMaterial = useTranslations("materials");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    matchRequest,
    matchedArtisans,
    setMatchRequest,
    runMatching,
    selectArtisan,
  } = useArtisanStore();

  // URL query parameter fallback (직접 접근/Design 상세에서 올 때)
  useEffect(() => {
    const qJewelry = searchParams.get("jewelry_type") as JewelryType | null;
    const qMaterial = searchParams.get("material") as Material | null;
    const qCategory = searchParams.get("category");
    const qImage = searchParams.get("image");

    if (qJewelry || qMaterial) {
      setMatchRequest({
        jewelryType: qJewelry || matchRequest.jewelryType,
        material: qMaterial || matchRequest.material,
        categoryId: qCategory || matchRequest.categoryId,
        designImageUrl: qImage || matchRequest.designImageUrl,
      });
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // matchRequest 변경 시 매칭 실행
  useEffect(() => {
    if (matchRequest.jewelryType && matchRequest.material) {
      runMatching();
    }
  }, [matchRequest.jewelryType, matchRequest.material, runMatching]);

  const handleSelect = (artisanId: string) => {
    selectArtisan(artisanId);
    router.push("/artisans/quote");
  };

  // 디자인 정보가 없는 경우
  if (!matchRequest.jewelryType || !matchRequest.material) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/20" />
        <p className="mt-4 text-sm text-muted-foreground">{t("noDesign")}</p>
        <Button
          variant="outline"
          className="mt-6 rounded-lg"
          onClick={() => router.push("/studio")}
        >
          {t("backToStudio")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      {/* 헤더 */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 text-xs text-muted-foreground"
          onClick={() => router.push("/studio")}
        >
          <ArrowLeft className="mr-1 h-3.5 w-3.5" />
          {t("backToStudio")}
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-navy md:text-3xl">
          {t("matchTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("matchSubtitle")}
        </p>
      </div>

      {/* 디자인 요약 카드 */}
      <div className="mb-8 overflow-hidden rounded-xl border border-warm-border/40 bg-muted/30 p-5">
        <p className="mb-3 text-sm font-medium text-navy">
          {t("designSummary")}
        </p>
        <div className="flex items-center gap-4">
          {matchRequest.designImageUrl && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
              <img
                src={matchRequest.designImageUrl}
                alt="Design"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {matchRequest.jewelryType && (
              <Badge variant="secondary" className="text-xs">
                {tJewelry(matchRequest.jewelryType)}
              </Badge>
            )}
            {matchRequest.material && (
              <Badge variant="outline" className="text-xs">
                {tMaterial(matchRequest.material)}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 매칭 결과 */}
      {matchedArtisans.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">{t("noResults")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matchedArtisans.map((matched, idx) => (
            <div key={matched.artisan.id}>
              {/* 매칭 분석 바 */}
              <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-navy">#{idx + 1}</span>
                <div className="flex flex-1 items-center gap-2">
                  <span>{t("breakdownSpecialty")}</span>
                  <Progress
                    value={matched.matchBreakdown.specialty * 100}
                    className="h-1.5 w-16"
                  />
                  <span>{t("breakdownMaterial")}</span>
                  <Progress
                    value={matched.matchBreakdown.material * 100}
                    className="h-1.5 w-16"
                  />
                </div>
              </div>
              <ArtisanCard
                artisan={matched.artisan}
                matchScore={matched.matchScore}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
