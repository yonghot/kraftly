"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useArtisanStore } from "@/stores/artisan-store";
import { getArtisanById } from "@/data/artisans";
import { QuoteForm } from "@/components/artisan/quote-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ArtisanQuotePage() {
  const t = useTranslations("artisans");
  const locale = useLocale();
  const router = useRouter();
  const { matchRequest, selectedArtisanId, submitQuote } = useArtisanStore();

  const artisan = selectedArtisanId
    ? getArtisanById(selectedArtisanId)
    : null;

  if (!artisan) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/20" />
        <p className="mt-4 text-sm text-muted-foreground">
          {t("noArtisan")}
        </p>
        <Button
          variant="outline"
          className="mt-6 rounded-lg"
          onClick={() => router.push("/artisans")}
        >
          {t("backToMatch")}
        </Button>
      </div>
    );
  }

  const artisanName =
    locale === "ko" ? artisan.display_name_ko : artisan.display_name_en;

  const handleSubmit = () => {
    submitQuote();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-8 md:py-14">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 text-xs text-muted-foreground"
        onClick={() => router.push("/artisans/match")}
      >
        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
        {t("backToMatch")}
      </Button>

      <h1 className="text-2xl font-bold tracking-tight text-navy md:text-3xl">
        {t("quoteTitle")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("quoteSubtitle")}
      </p>

      <div className="mt-8">
        <QuoteForm
          artisanName={artisanName}
          designImageUrl={matchRequest.designImageUrl}
          categoryId={matchRequest.categoryId}
          jewelryType={matchRequest.jewelryType}
          material={matchRequest.material}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
