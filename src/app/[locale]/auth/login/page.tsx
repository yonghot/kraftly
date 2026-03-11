"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-warm-border/60 bg-card p-8 shadow-lg shadow-black/3">
          {/* 로고 */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold/80 shadow-md shadow-gold/20"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="mt-5 font-serif text-2xl font-bold tracking-tight text-navy">
              {t("loginTitle")}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                {t("email")}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border-warm-border py-5"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                {t("password")}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-warm-border py-5"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gold py-5 text-sm font-semibold text-white shadow-md shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/25"
            >
              {t("loginButton")}
            </Button>
          </form>

          <div className="mt-5 text-center text-xs text-muted-foreground">
            <Link
              href="/auth/login"
              className="text-gold transition-colors hover:text-gold/80 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-warm-border/40" />

        <p className="text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-gold transition-colors hover:text-gold/80 hover:underline"
          >
            {t("signupButton")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
