"use client";

import { useTranslations } from "next-intl";
import { useDesignStore } from "@/stores/design-store";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { CATEGORY_IMAGES } from "@/data/images";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Sparkles,
  RefreshCw,
  Share2,
  ShoppingBag,
  Check,
  ArrowLeft,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
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
  const locale = useLocale();

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

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;

    setGenerating(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(
        Math.min(90, useDesignStore.getState().generationProgress + Math.random() * 15)
      );
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

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setProgress(100);
      setGeneratedImages(data.images);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch {
      setProgress(100);
      const placeholders = Array.from({ length: 4 }).map(
        (_, i) =>
          `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
              <rect width="512" height="512" fill="${selectedCategoryData?.color_palette[i % 4] || "#E5E2DC"}22"/>
              <text x="256" y="240" text-anchor="middle" font-family="serif" font-size="20" fill="${selectedCategoryData?.color_palette[0] || "#1B3A5C"}">K-Design</text>
              <text x="256" y="280" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6B7280">${selectedCategoryData?.name_en || "Design"} #${i + 1}</text>
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

  return (
    <div className="dark flex h-[100dvh] flex-col bg-dark-bg">
      {/* 미니 헤더 (Stitch 스타일) */}
      <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-dark-border px-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg p-1.5 text-dark-text-muted transition-colors hover:bg-dark-surface-high hover:text-dark-text"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-dark-accent" />
            <span className="text-sm font-bold tracking-tighter text-dark-text">
              Kraftly
            </span>
          </div>
        </div>
        <span className="text-xs font-medium text-dark-text-muted">
          {t("title")}
        </span>
      </header>

      {/* 캔버스 영역 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
          {/* 카테고리 선택 */}
          <section className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-dark-text-muted">
              {t("step1")}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {K_DESIGN_CATEGORIES.map((category) => {
                const name =
                  locale === "ko" ? category.name_ko : category.name_en;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setCategory(category.id)}
                    className={cn(
                      "group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl border transition-all duration-300",
                      isSelected
                        ? "border-dark-accent gold-glow"
                        : "border-dark-border hover:border-dark-surface-highest"
                    )}
                  >
                    {/* 배경 이미지 */}
                    {CATEGORY_IMAGES[category.id] ? (
                      <Image
                        src={CATEGORY_IMAGES[category.id]}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 16vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${category.color_palette[0]}18, ${category.color_palette[1]}25, ${category.color_palette[2]}15)`,
                        }}
                      />
                    )}

                    {/* 하단 텍스트 */}
                    <div className="relative z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-12">
                      <h3 className="text-xs font-semibold text-white">
                        {name}
                      </h3>
                    </div>

                    {/* 선택 표시 */}
                    {isSelected && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-dark-accent">
                        <Check className="h-3 w-3 text-dark-bg" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 디자인 옵션 (카테고리 선택 후 표시) */}
          {selectedCategory && (
            <section className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="mb-4 text-sm font-medium text-dark-text-muted">
                {t("step2")}
              </h2>

              <div className="rounded-xl border border-dark-border bg-dark-surface p-5">
                {/* Jewelry Type */}
                <div className="mb-5">
                  <label className="mb-2.5 block text-xs font-medium text-dark-text-muted">
                    {t("jewelryType")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {JEWELRY_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setJewelryType(type.value)}
                        className={cn(
                          "rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all",
                          jewelryType === type.value
                            ? "border-dark-accent/50 bg-dark-accent/15 text-dark-accent"
                            : "border-dark-border text-dark-text-muted hover:border-dark-surface-highest hover:text-dark-text"
                        )}
                      >
                        {tj(type.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material */}
                <div>
                  <label className="mb-2.5 block text-xs font-medium text-dark-text-muted">
                    {t("material")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {MATERIALS.map((mat) => (
                      <button
                        key={mat.value}
                        onClick={() => setMaterial(mat.value)}
                        className={cn(
                          "rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all",
                          material === mat.value
                            ? "border-dark-accent/50 bg-dark-accent/15 text-dark-accent"
                            : "border-dark-border text-dark-text-muted hover:border-dark-surface-highest hover:text-dark-text"
                        )}
                      >
                        {tm(mat.labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 생성 결과 */}
          {(generatedImages.length > 0 || isGenerating) && (
            <section ref={resultsRef} className="mb-8 animate-in fade-in duration-300">
              <h2 className="mb-4 text-sm font-medium text-dark-text-muted">
                {t("step3")}
              </h2>

              {/* 프로그레스 바 */}
              {isGenerating && (
                <div className="mb-4">
                  <Progress
                    value={generationProgress}
                    className="h-1 bg-dark-surface-high [&>div]:bg-dark-accent [&>div]:shadow-[0_0_10px_rgba(212,184,122,0.3)]"
                  />
                  <p className="mt-2 text-center text-xs text-dark-text-muted">
                    {t("generating")}
                  </p>
                </div>
              )}

              {/* 이미지 그리드 */}
              <div className="grid grid-cols-2 gap-3">
                {isGenerating && generatedImages.length === 0
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="aspect-square rounded-xl bg-dark-surface-mid"
                      />
                    ))
                  : generatedImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => selectImage(i)}
                        className={cn(
                          "group relative aspect-square overflow-hidden rounded-xl border transition-all duration-200",
                          selectedImageIndex === i
                            ? "border-dark-accent gold-glow"
                            : "border-dark-border hover:border-dark-surface-highest"
                        )}
                      >
                        <img
                          src={img}
                          alt={`Design ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                        {selectedImageIndex === i && (
                          <div className="absolute inset-0 flex items-center justify-center bg-dark-accent/15">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-accent">
                              <Check className="h-4 w-4 text-dark-bg" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2">
                          <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                            #{i + 1}
                          </span>
                        </div>
                      </button>
                    ))}
              </div>

              {/* 선택 후 액션 */}
              {selectedImageIndex !== null && (
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-dark-border bg-transparent text-dark-text-muted hover:bg-dark-surface-high hover:text-dark-text"
                    onClick={handleGenerate}
                  >
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                    {t("regenerate")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-dark-border bg-transparent text-dark-text-muted hover:bg-dark-surface-high hover:text-dark-text"
                    onClick={() => setShared(true)}
                  >
                    <Share2 className="mr-1.5 h-3.5 w-3.5" />
                    {shared ? "Shared!" : t("shareToGallery")}
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-lg bg-dark-surface-high text-dark-text-muted"
                    disabled
                  >
                    <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                    {t("findArtisan")}
                    <span className="ml-1 text-[10px] opacity-60">(Phase 2)</span>
                  </Button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* 플로팅 프롬프트 바 (Stitch 스타일) */}
      <div className="flex-shrink-0 border-t border-dark-border bg-dark-bg px-4 pb-6 pt-4">
        {/* 선택된 옵션 칩 */}
        {(selectedCategory || jewelryType || material) && (
          <div className="mx-auto mb-3 flex max-w-2xl flex-wrap gap-1.5">
            {selectedCategoryData && (
              <span className="inline-flex items-center gap-1 rounded-md bg-dark-surface-mid px-2 py-0.5 text-[11px] font-medium text-dark-text-muted">
                {locale === "ko"
                  ? selectedCategoryData.name_ko
                  : selectedCategoryData.name_en}
              </span>
            )}
            {jewelryType && (
              <span className="inline-flex items-center gap-1 rounded-md bg-dark-surface-mid px-2 py-0.5 text-[11px] font-medium text-dark-text-muted">
                {tj(jewelryType)}
              </span>
            )}
            {material && (
              <span className="inline-flex items-center gap-1 rounded-md bg-dark-surface-mid px-2 py-0.5 text-[11px] font-medium text-dark-text-muted">
                {tm(material)}
              </span>
            )}
          </div>
        )}

        {/* 프롬프트 입력 + 생성 버튼 */}
        <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-dark-border bg-dark-surface-mid px-4 py-3">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value.slice(0, 200))}
            placeholder={t("additionalPlaceholder")}
            maxLength={200}
            className="flex-1 bg-transparent text-sm text-dark-text placeholder:text-dark-text-muted/50 focus:outline-none"
          />
          <Button
            size="sm"
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className={cn(
              "rounded-xl px-5 font-semibold transition-all",
              canGenerate
                ? "bg-dark-accent text-dark-bg hover:bg-dark-accent/90 gold-glow"
                : "bg-dark-surface-high text-dark-text-muted"
            )}
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {t("generate")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
