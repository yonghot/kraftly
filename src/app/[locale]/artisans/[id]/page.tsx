"use client";

import { use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getArtisanById, getReviewsByArtisan } from "@/data/artisans";
import { useArtisanStore } from "@/stores/artisan-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Award,
  MapPin,
  Star,
  Clock,
  ShoppingBag,
} from "lucide-react";

export default function ArtisanDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations("artisans");
  const tJewelry = useTranslations("jewelryTypes");
  const tMaterial = useTranslations("materials");
  const locale = useLocale();
  const router = useRouter();
  const { selectArtisan } = useArtisanStore();

  const artisan = getArtisanById(id);
  const reviews = getReviewsByArtisan(id);

  if (!artisan) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">{t("noArtisan")}</p>
        <Button
          variant="outline"
          className="mt-6 rounded-lg"
          onClick={() => router.push("/artisans")}
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          {t("title")}
        </Button>
      </div>
    );
  }

  const name =
    locale === "ko" ? artisan.display_name_ko : artisan.display_name_en;
  const bio = locale === "ko" ? artisan.bio_ko : artisan.bio_en;
  const location =
    locale === "ko" ? artisan.location_ko : artisan.location_en;

  const handleRequestQuote = () => {
    selectArtisan(artisan.id);
    router.push("/artisans/quote");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
      {/* 뒤로 가기 */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 text-xs text-muted-foreground"
        onClick={() => router.push("/artisans")}
      >
        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
        {t("title")}
      </Button>

      {/* 프로필 헤더 */}
      <div className="flex items-start gap-6">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted">
          <img
            src={artisan.avatar_url}
            alt={name}
            className="h-full w-full object-cover"
          />
          {artisan.is_verified && (
            <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-blue-500 p-1">
              <Award className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-navy">
              {name}
            </h1>
            {artisan.is_verified && (
              <Badge className="bg-blue-100 text-xs text-blue-700">
                {t("verified")}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {t("rating", {
                score: artisan.avg_rating.toFixed(1),
                count: artisan.total_reviews,
              })}
            </span>
            <span>
              {t("yearsExp", { count: artisan.years_experience })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {t("leadTime", { days: artisan.avg_lead_days })}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {artisan.specialties.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="rounded-md text-xs"
              >
                {tJewelry(s)}
              </Badge>
            ))}
            {artisan.materials.map((m) => (
              <Badge
                key={m}
                variant="outline"
                className="rounded-md text-xs"
              >
                {tMaterial(m)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8 bg-warm-border/40" />

      {/* 탭 */}
      <Tabs defaultValue="about">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="about" className="text-xs">
            {t("tabAbout")}
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="text-xs">
            {t("tabPortfolio")}
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs">
            {t("tabReviews", { count: reviews.length })}
          </TabsTrigger>
        </TabsList>

        {/* 소개 */}
        <TabsContent value="about" className="mt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {bio}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-warm-border/40 p-4">
              <p className="text-xs text-muted-foreground">
                {t("minPrice", {
                  price: artisan.min_price_krw.toLocaleString(),
                })}
              </p>
            </div>
            <div className="rounded-xl border border-warm-border/40 p-4">
              <p className="text-xs text-muted-foreground">
                {artisan.total_orders} orders completed
              </p>
            </div>
          </div>
        </TabsContent>

        {/* 포트폴리오 */}
        <TabsContent value="portfolio" className="mt-6">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {artisan.portfolio_urls.map((url, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <img
                  src={url}
                  alt={`${name} portfolio ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 리뷰 */}
        <TabsContent value="reviews" className="mt-6">
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => {
                const comment =
                  locale === "ko" ? review.comment_ko : review.comment_en;
                return (
                  <div
                    key={review.id}
                    className="rounded-xl border border-warm-border/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-navy">
                        {review.reviewer_name}
                      </span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {comment}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground/60">
                      {new Date(review.created_at).toLocaleDateString(locale)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 하단 견적 요청 버튼 */}
      <div className="mt-10">
        <Button
          className="w-full rounded-lg bg-gold text-white hover:bg-gold/90 sm:w-auto"
          onClick={handleRequestQuote}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {t("requestQuote")}
        </Button>
      </div>
    </div>
  );
}
