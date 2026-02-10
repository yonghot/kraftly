"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-warm-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* 로고 + 설명 */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold" />
              <span className="font-serif text-lg font-bold text-navy">
                Kraftly
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              K-Design AI Jewelry Platform
            </p>
          </div>

          {/* 네비게이션 링크 */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-navy">
              {t("about")}
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-navy">
              {t("gallery")}
            </Link>
            <span className="cursor-default text-muted-foreground/50">
              {t("forArtisans")}
            </span>
            <span className="cursor-default text-muted-foreground/50">
              {t("faq")}
            </span>
          </nav>
        </div>

        {/* 저작권 */}
        <div className="mt-8 border-t border-warm-border pt-8 text-center text-xs text-muted-foreground">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
