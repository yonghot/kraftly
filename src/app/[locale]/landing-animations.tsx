"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/design/category-card";
import {
  FadeInSection,
  StaggerContainer,
  StaggerItem,
  HoverLift,
} from "@/components/motion";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { DesignCategory } from "@/types";

interface LandingAnimationsProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroNote: string;
  stats: { icon: LucideIcon; value: string; label: string }[];
  steps: { icon: LucideIcon; title: string; desc: string }[];
  categoriesTitle: string;
  categories: DesignCategory[];
  galleryTitle: string;
  galleryNote: string;
  galleryImages: string[];
  viewAllLabel: string;
  artisanTitle: string;
  artisanDesc: string;
  artisanCta: string;
}

export function LandingAnimations({
  heroImage,
  heroTitle,
  heroSubtitle,
  heroCta,
  heroNote,
  stats,
  steps,
  categoriesTitle,
  categories,
  galleryTitle,
  galleryNote,
  galleryImages,
  viewAllLabel,
  artisanTitle,
  artisanDesc,
  artisanCta,
}: LandingAnimationsProps) {
  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden px-4 py-36 text-center md:py-48">
        <Image
          src={heroImage}
          alt="Jewelry crafting"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white/80 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>K-Design AI Jewelry Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl"
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <Link href="/studio">
              <Button
                size="lg"
                className="group rounded-xl bg-gold px-10 py-6 text-base font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/35 hover:scale-[1.03]"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {heroCta}
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <p className="text-sm text-white/40">{heroNote}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Social Proof / Stats ─── */}
      <FadeInSection className="border-b border-warm-border/40 bg-white px-4 py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center gap-2"
            >
              <stat.icon className="h-5 w-5 text-gold" />
              <span className="text-2xl font-bold tracking-tight text-navy md:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* ─── How It Works ─── */}
      <FadeInSection className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
            {steps.length > 0 ? "How It Works" : ""}
          </h2>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3" delay={0.15}>
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <HoverLift>
                  <div className="group relative flex flex-col items-center rounded-2xl border border-warm-border/60 bg-card p-10 text-center transition-all duration-300 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/8">
                      <step.icon className="h-7 w-7 text-gold" />
                    </div>
                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeInSection>

      {/* ─── K-Design Categories ─── */}
      <FadeInSection className="bg-gradient-to-b from-warm-muted/30 to-warm-muted/60 px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
            {categoriesTitle}
          </h2>

          <StaggerContainer className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6" delay={0.1}>
            {categories.map((category) => (
              <StaggerItem key={category.id}>
                <HoverLift>
                  <Link href="/studio">
                    <CategoryCard category={category} showDescription />
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeInSection>

      {/* ─── Gallery Preview ─── */}
      <FadeInSection className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
            {galleryTitle}
          </h2>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {galleryNote}
          </p>

          <StaggerContainer className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5" delay={0.05}>
            {galleryImages.slice(0, 8).map((imgUrl, i) => (
              <StaggerItem key={i}>
                <div className="group relative aspect-square overflow-hidden rounded-2xl border border-warm-border/40 transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5">
                  <Image
                    src={imgUrl}
                    alt={`Jewelry design ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href="/gallery">
              <Button
                variant="outline"
                className="group rounded-xl border-warm-border px-8 py-5 text-sm font-medium transition-all hover:border-gold/30 hover:shadow-md"
              >
                {viewAllLabel}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </FadeInSection>

      {/* ─── For Artisans CTA ─── */}
      <FadeInSection className="relative overflow-hidden bg-gradient-to-b from-navy to-[#0f2137] px-4 py-28 text-center md:px-8 md:py-36">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold/3 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            {artisanTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base leading-relaxed text-white/55 md:text-lg"
          >
            {artisanDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="mt-10 rounded-xl bg-white/10 px-10 py-6 text-base font-semibold text-white/70 backdrop-blur-sm transition-all hover:bg-white/15"
              disabled
            >
              {artisanCta}
              <span className="ml-2 text-xs opacity-50">(Coming Soon)</span>
            </Button>
          </motion.div>
        </div>
      </FadeInSection>
    </div>
  );
}
