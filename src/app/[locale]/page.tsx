import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/design/category-card";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { Sparkles, Palette, Cpu, Hammer, ArrowRight, ChevronRight } from "lucide-react";

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
      <section className="relative overflow-hidden bg-gradient-to-b from-navy via-[#162d4a] to-[#0f2137] px-4 py-28 text-center md:py-36">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/8 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/3 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>K-Design AI Jewelry Platform</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-6xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link href="/studio">
              <Button
                size="lg"
                className="group rounded-xl bg-gold px-10 py-6 text-base font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/35"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {t("heroCta")}
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <p className="text-sm text-white/40">{t("heroNote")}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
            {t("howItWorks")}
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center rounded-2xl border border-warm-border/60 bg-card p-8 text-center transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/8">
                  <step.icon className="h-6 w-6 text-gold" />
                </div>
                <div className="mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-base font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* K-Design Categories */}
      <section className="bg-gradient-to-b from-warm-muted/30 to-warm-muted/60 px-4 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
            {t("categoriesTitle")}
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
            {K_DESIGN_CATEGORIES.map((category) => (
              <Link key={category.id} href="/studio">
                <CategoryCard category={category} showDescription />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
            {t("galleryPreview")}
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {t("heroNote")}
          </p>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="group aspect-square overflow-hidden rounded-2xl border border-warm-border/40 transition-all duration-300 hover:border-gold/20 hover:shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${K_DESIGN_CATEGORIES[i % 6].color_palette[0]}10, ${K_DESIGN_CATEGORIES[i % 6].color_palette[1]}18)`,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground/20 transition-all duration-300 group-hover:scale-110 group-hover:text-gold/30" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/gallery">
              <Button
                variant="outline"
                className="group rounded-xl border-warm-border px-6"
              >
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Artisans */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-[#0f2137] px-4 py-24 text-center md:px-8">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("forArtisans")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            {t("artisanBenefits")}
          </p>
          <Button
            size="lg"
            className="mt-8 rounded-xl bg-white/10 px-8 py-6 text-base font-semibold text-white/70 backdrop-blur-sm"
            disabled
          >
            {t("joinArtisan")}
            <span className="ml-2 text-xs opacity-50">(Coming Soon)</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
