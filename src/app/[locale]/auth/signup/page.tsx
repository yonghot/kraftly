"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-warm-border/60 bg-card p-8">
          {/* 로고 */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold/80">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="mt-4 font-serif text-xl font-bold tracking-tight text-navy">
              {t("signupTitle")}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {t("email")}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border-warm-border"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {t("password")}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg border-warm-border"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {t("confirmPassword")}
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg border-warm-border"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg bg-gold text-white hover:bg-gold/90"
            >
              {t("signupButton")}
            </Button>
          </form>
        </div>

        <Separator className="my-6 bg-warm-border/40" />

        <p className="text-center text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link
            href="/auth/login"
            className="font-medium text-gold hover:underline"
          >
            {t("loginButton")}
          </Link>
        </p>
      </div>
    </div>
  );
}
