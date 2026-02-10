"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function MyDesignsPage() {
  const t = useTranslations("my");

  // Supabase Auth 연결 후 실제 사용자 디자인 조회로 교체 예정
  const designs: unknown[] = [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
      <h1 className="font-serif text-3xl font-bold text-navy">
        {t("designsTitle")}
      </h1>

      {designs.length === 0 ? (
        <div className="mt-20 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">{t("noDesigns")}</p>
          <Link href="/studio" className="mt-6 inline-block">
            <Button className="rounded-xl bg-gold text-white hover:bg-gold/90">
              <Sparkles className="mr-2 h-4 w-4" />
              {t("startDesigning")}
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
