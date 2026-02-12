"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface QuoteFormProps {
  artisanName: string;
  designImageUrl: string | null;
  categoryId: string | null;
  jewelryType: string | null;
  material: string | null;
  onSubmit: () => void;
}

export function QuoteForm({
  artisanName,
  designImageUrl,
  categoryId,
  jewelryType,
  material,
  onSubmit,
}: QuoteFormProps) {
  const t = useTranslations("artisans");
  const tJewelry = useTranslations("jewelryTypes");
  const tMaterial = useTranslations("materials");

  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock submit — 1초 딜레이
    setTimeout(() => {
      toast.success(t("quoteSuccess"));
      setSubmitting(false);
      onSubmit();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 디자인 요약 */}
      <div className="overflow-hidden rounded-xl border border-warm-border/40 bg-muted/30">
        <div className="p-4">
          <p className="mb-3 text-sm font-medium text-navy">
            {t("designSummary")}
          </p>
          <div className="flex gap-4">
            {designImageUrl && (
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={designImageUrl}
                  alt="Design"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap items-start gap-2">
              {categoryId && (
                <Badge variant="secondary" className="text-xs">
                  {categoryId}
                </Badge>
              )}
              {jewelryType && (
                <Badge variant="secondary" className="text-xs">
                  {tJewelry(jewelryType)}
                </Badge>
              )}
              {material && (
                <Badge variant="outline" className="text-xs">
                  {tMaterial(material)}
                </Badge>
              )}
              <Badge className="bg-gold/10 text-xs text-gold">
                → {artisanName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 예산 */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          {t("quoteBudget")}
        </label>
        <Input
          type="text"
          placeholder={t("quoteBudgetPlaceholder")}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="rounded-lg"
        />
      </div>

      {/* 납기 */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          {t("quoteDeadline")}
        </label>
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="rounded-lg"
        />
      </div>

      {/* 메모 */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          {t("quoteNotes")}
        </label>
        <textarea
          placeholder={t("quoteNotesPlaceholder")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* 제출 */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gold text-white hover:bg-gold/90"
      >
        <Send className="mr-2 h-4 w-4" />
        {submitting ? "..." : t("quoteSubmit")}
      </Button>
    </form>
  );
}
