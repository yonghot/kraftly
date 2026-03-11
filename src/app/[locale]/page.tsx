import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/design/category-card";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import { HERO_IMAGES, getAllGalleryImages } from "@/data/images";
import {
  Sparkles,
  Palette,
  Cpu,
  Hammer,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Gem,
} from "lucide-react";
import { LandingAnimations } from "./landing-animations";

export default function LandingPage() {
  const t = useTranslations("landing");
  const tc = useTranslations("common");
  const galleryImages = getAllGalleryImages();

  const steps = [
    { icon: Palette, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Cpu, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Hammer, title: t("step3Title"), desc: t("step3Desc") },
  ];

  const stats = [
    { icon: Users, value: "2,400+", label: t("statUsers") },
    { icon: Gem, value: "12,000+", label: t("statDesigns") },
    { icon: Star, value: "4.9", label: t("statRating") },
  ];

  return (
    <LandingAnimations
      heroImage={HERO_IMAGES.main}
      heroTitle={t("heroTitle")}
      heroSubtitle={t("heroSubtitle")}
      heroCta={t("heroCta")}
      heroNote={t("heroNote")}
      stats={stats}
      steps={steps}
      categoriesTitle={t("categoriesTitle")}
      categories={K_DESIGN_CATEGORIES}
      galleryTitle={t("galleryPreview")}
      galleryNote={t("heroNote")}
      galleryImages={galleryImages}
      viewAllLabel={t("viewAll")}
      artisanTitle={t("forArtisans")}
      artisanDesc={t("artisanBenefits")}
      artisanCta={t("joinArtisan")}
    />
  );
}
