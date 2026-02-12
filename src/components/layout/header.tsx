"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Menu, Globe, Sparkles, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Studio 페이지에서는 Header 숨김 (Studio 자체 헤더 사용)
  if (pathname.startsWith("/studio")) {
    return null;
  }

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "ko" });
  };

  const navItems = [
    { href: "/studio" as const, label: t("studio") },
    { href: "/gallery" as const, label: t("gallery") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-warm-border/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold/80">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-navy">
            Kraftly
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold/10 text-gold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-2">
          {/* 언어 선택 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-1.5 rounded-lg px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-medium uppercase">
                  {locale}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              <DropdownMenuItem
                onClick={() => switchLocale("en")}
                className={locale === "en" ? "bg-gold/10 font-semibold text-gold" : ""}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchLocale("ko")}
                className={locale === "ko" ? "bg-gold/10 font-semibold text-gold" : ""}
              >
                한국어
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 로그인 버튼 */}
          <Link href="/auth/login" className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-warm-border text-sm"
            >
              {t("login")}
            </Button>
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 border-t border-warm-border/60 bg-white/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/auth/login"
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("login")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
