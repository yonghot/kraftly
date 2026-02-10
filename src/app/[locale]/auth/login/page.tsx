"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase Auth 연결 후 구현 예정
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="mb-8 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-navy">
            {t("loginTitle")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              {t("email")}
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              {t("password")}
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-gold text-white hover:bg-gold/90"
          >
            {t("loginButton")}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="text-gold hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/auth/signup" className="font-medium text-gold hover:underline">
            {t("signupButton")}
          </Link>
        </p>
      </div>
    </div>
  );
}
