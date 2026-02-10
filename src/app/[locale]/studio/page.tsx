"use client";

import { useTranslations } from "next-intl";
import { useDesignStore } from "@/stores/design-store";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/design/category-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  RefreshCw,
  Share2,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { JewelryType, Material } from "@/types";
import { cn } from "@/lib/utils";

const JEWELRY_TYPES: { value: JewelryType; labelKey: string }[] = [
  { value: "ring", labelKey: "ring" },
  { value: "necklace", labelKey: "necklace" },
  { value: "earring", labelKey: "earring" },
  { value: "bracelet", labelKey: "bracelet" },
  { value: "brooch", labelKey: "brooch" },
];

const MATERIALS: { value: Material; labelKey: string }[] = [
  { value: "silver", labelKey: "silver" },
  { value: "gold_14k", labelKey: "gold_14k" },
  { value: "gold_18k", labelKey: "gold_18k" },
  { value: "rose_gold", labelKey: "rose_gold" },
  { value: "platinum", labelKey: "platinum" },
];

export default function StudioPage() {
  const t = useTranslations("studio");
  const tj = useTranslations("jewelryTypes");
  const tm = useTranslations("materials");

  const {
    selectedCategory,
    jewelryType,
    material,
    userPrompt,
    generatedImages,
    selectedImageIndex,
    isGenerating,
    generationProgress,
    setCategory,
    setJewelryType,
    setMaterial,
    setUserPrompt,
    setGeneratedImages,
    selectImage,
    setGenerating,
    setProgress,
  } = useDesignStore();

  const resultsRef = useRef<HTMLDivElement>(null);
  const [shared, setShared] = useState(false);

  const selectedCategoryData = K_DESIGN_CATEGORIES.find(
    (c) => c.id === selectedCategory
  );

  const canGenerate = selectedCategory && jewelryType && material;

  // AI 이미지 생성 (API 호출)
  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;

    setGenerating(true);
    setProgress(0);

    // 프로그레스 시뮬레이션
    const progressInterval = setInterval(() => {
      setProgress(Math.min(90, useDesignStore.getState().generationProgress + Math.random() * 15));
    }, 1500);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: selectedCategory,
          jewelry_type: jewelryType,
          material,
          user_prompt: userPrompt || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Generation failed");
      }

      const data = await res.json();
      setProgress(100);
      setGeneratedImages(data.images);

      // 결과로 스크롤
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch {
      // API가 아직 연결 안 된 경우 — 플레이스홀더 이미지 생성
      setProgress(100);
      const placeholders = Array.from({ length: 4 }).map(
        (_, i) =>
          `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
              <rect width="512" height="512" fill="${selectedCategoryData?.color_palette[i % 4] || '#E5E2DC'}22"/>
              <text x="256" y="240" text-anchor="middle" font-family="serif" font-size="20" fill="${selectedCategoryData?.color_palette[0] || '#1B3A5C'}">K-Design</text>
              <text x="256" y="280" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6B7280">${selectedCategoryData?.name_en || 'Design'} #${i + 1}</text>
            </svg>`
          )}`
      );
      setGeneratedImages(placeholders);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } finally {
      clearInterval(progressInterval);
      setGenerating(false);
    }
  }, [
    canGenerate,
    selectedCategory,
    jewelryType,
    material,
    userPrompt,
    selectedCategoryData,
    setGenerating,
    setProgress,
    setGeneratedImages,
  ]);

  // 카테고리 선택 시 배경 그라데이션 변경
  const bgStyle = selectedCategoryData
    ? {
        background: `linear-gradient(180deg, ${selectedCategoryData.color_palette[0]}08 0%, transparent 40%)`,
      }
    : {};

  return (
    <div className="min-h-screen" style={bgStyle}>
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {/* 타이틀 */}
        <div className="mb-10 text-center">
          <h1 className="font-serif text-3xl font-bold text-navy md:text-4xl">
            {t("title")}
          </h1>
        </div>

        {/* Step 1: 카테고리 선택 */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-navy">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-sm text-white">
              1
            </span>
            {t("step1")}
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:overflow-visible">
            {K_DESIGN_CATEGORIES.map((category) => (
              <div key={category.id} className="w-40 flex-shrink-0 md:w-auto">
                <CategoryCard
                  category={category}
                  selected={selectedCategory === category.id}
                  onClick={() => setCategory(category.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: 디자인 상세 */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-navy">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-sm text-white">
              2
            </span>
            {t("step2")}
          </h2>

          <div className="rounded-2xl bg-card p-6 shadow-sm">
            {/* Jewelry Type */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-navy">
                {t("jewelryType")}
              </label>
              <div className="flex flex-wrap gap-2">
                {JEWELRY_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setJewelryType(type.value)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm transition-all",
                      jewelryType === type.value
                        ? "border-gold bg-gold/10 font-medium text-gold"
                        : "border-warm-border text-muted-foreground hover:border-gold/50"
                    )}
                  >
                    {tj(type.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-navy">
                {t("material")}
              </label>
              <div className="flex flex-wrap gap-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.value}
                    onClick={() => setMaterial(mat.value)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm transition-all",
                      material === mat.value
                        ? "border-gold bg-gold/10 font-medium text-gold"
                        : "border-warm-border text-muted-foreground hover:border-gold/50"
                    )}
                  >
                    {tm(mat.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Prompt */}
            <div>
              <label className="mb-2 block text-sm font-medium text-navy">
                {t("additionalDetails")}
              </label>
              <Input
                value={userPrompt}
                onChange={(e) =>
                  setUserPrompt(e.target.value.slice(0, 200))
                }
                placeholder={t("additionalPlaceholder")}
                className="rounded-xl"
                maxLength={200}
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {userPrompt.length}/200
              </p>
            </div>
          </div>
        </section>

        {/* Generate 버튼 */}
        <div className="mb-10 text-center">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="rounded-xl bg-gold px-12 py-6 text-lg font-semibold text-white shadow-lg shadow-gold/30 transition-all hover:bg-gold/90 hover:shadow-xl disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                {t("generating")}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {t("generate")}
              </>
            )}
          </Button>

          {/* 프로그레스 바 */}
          {isGenerating && (
            <div className="mx-auto mt-4 max-w-md">
              <Progress value={generationProgress} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">
                {t("generating")}
              </p>
            </div>
          )}
        </div>

        {/* Step 3: 생성 결과 */}
        {(generatedImages.length > 0 || isGenerating) && (
          <section ref={resultsRef} className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-navy">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-sm text-white">
                3
              </span>
              {t("step3")}
            </h2>

            {/* 이미지 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              {isGenerating && generatedImages.length === 0
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="aspect-square rounded-2xl"
                    />
                  ))
                : generatedImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => selectImage(i)}
                      className={cn(
                        "group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all",
                        selectedImageIndex === i
                          ? "border-gold shadow-lg shadow-gold/20"
                          : "border-transparent hover:border-gold/30"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Design ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                      {selectedImageIndex === i && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gold/20">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white">
                            <Check className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="bg-white/80 text-xs">
                          #{i + 1}
                        </Badge>
                      </div>
                    </button>
                  ))}
            </div>

            {/* 선택 후 액션 버튼 */}
            {selectedImageIndex !== null && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleGenerate}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("regenerate")}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setShared(true)}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {shared ? "Shared!" : t("shareToGallery")}
                </Button>
                <Button
                  className="rounded-xl bg-navy text-white hover:bg-navy/90"
                  disabled
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {t("findArtisan")}
                  <span className="ml-1 text-xs opacity-70">(Phase 2)</span>
                </Button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
