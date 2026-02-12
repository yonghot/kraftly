"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();

  // Studio 페이지에서는 Footer 숨김
  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <footer className="border-t border-warm-border/60 bg-warm-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* 로고 + 설명 */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold/80">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-navy">
                Kraftly
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              K-Design AI Jewelry Platform
            </p>
          </div>

          {/* 네비게이션 링크 */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("about")}
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-foreground">
              {t("gallery")}
            </Link>
            <span className="cursor-default text-muted-foreground/40">
              {t("forArtisans")}
            </span>
            <span className="cursor-default text-muted-foreground/40">
              {t("faq")}
            </span>
          </nav>
        </div>

        {/* 저작권 */}
        <div className="mt-8 border-t border-warm-border/40 pt-8 text-center text-xs text-muted-foreground/60">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
