import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/design/category-card";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { Sparkles, Palette, Cpu, Hammer, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const t = useTranslations("landing");
  const tc = useTranslations("common");

  const steps = [
    { icon: Palette, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Cpu, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Hammer, title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-secondary to-navy px-4 py-24 text-center md:py-32">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-gold" />
            <span>K-Design AI Jewelry Platform</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link href="/studio">
              <Button
                size="lg"
                className="rounded-xl bg-gold px-10 py-6 text-lg font-semibold text-white shadow-lg shadow-gold/30 transition-all hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/40"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {t("heroCta")}
              </Button>
            </Link>
            <p className="text-sm text-white/50">{t("heroNote")}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-navy md:text-4xl">
            {t("howItWorks")}
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10">
                  <step.icon className="h-8 w-8 text-gold" />
                </div>
                <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* K-Design Categories */}
      <section className="bg-muted/50 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-navy md:text-4xl">
            {t("categoriesTitle")}
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {K_DESIGN_CATEGORIES.map((category) => (
              <Link key={category.id} href="/studio">
                <CategoryCard category={category} showDescription />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-navy md:text-4xl">
            {t("galleryPreview")}
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            {t("heroNote")}
          </p>

          {/* 플레이스홀더 갤러리 그리드 */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-warm-border"
                style={{
                  background: `linear-gradient(135deg, ${K_DESIGN_CATEGORIES[i % 6].color_palette[0]}15, ${K_DESIGN_CATEGORIES[i % 6].color_palette[1]}25)`,
                }}
              >
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground/50">
                  <Sparkles className="h-8 w-8 opacity-30" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/gallery">
              <Button variant="outline" className="rounded-xl">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Artisans */}
      <section className="bg-navy px-4 py-20 text-center md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            {t("forArtisans")}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t("artisanBenefits")}</p>
          <Button
            size="lg"
            className="mt-8 rounded-xl bg-gold px-8 py-6 text-lg font-semibold text-white"
            disabled
          >
            {t("joinArtisan")}
            <span className="ml-2 text-xs opacity-70">(Coming Soon)</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
