"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/motion";

export default function MyDesignsPage() {
  const t = useTranslations("my");

  // Supabase Auth 연결 후 실제 사용자 디자인 조회로 교체 예정
  const designs: unknown[] = [];

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl">
          {t("designsTitle")}
        </h1>

        {designs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-24 flex flex-col items-center text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-warm-muted">
              <Palette className="h-9 w-9 text-muted-foreground/30" />
            </div>
            <h2 className="mt-6 text-lg font-semibold text-navy">
              {t("noDesigns")}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Create your first K-Design jewelry piece with our AI Studio.
            </p>
            <Link href="/studio" className="mt-8 inline-block">
              <Button className="rounded-xl bg-gold px-8 py-5 text-sm font-semibold text-white shadow-md shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/25">
                <Sparkles className="mr-2 h-4 w-4" />
                {t("startDesigning")}
              </Button>
            </Link>
          </motion.div>
        ) : null}
      </div>
    </PageTransition>
  );
}
