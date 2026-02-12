"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { ShoppingBag } from "lucide-react";

interface OrderButtonProps {
  categoryId: string;
  imageUrl: string | null;
}

export function OrderButton({ categoryId, imageUrl }: OrderButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams();
    params.set("category", categoryId);
    // 기본값: ring + silver (Design 상세에는 타입/소재 정보가 제한적이므로)
    params.set("jewelry_type", "ring");
    params.set("material", "silver");
    if (imageUrl) params.set("image", imageUrl);
    router.push(`/artisans/match?${params.toString()}`);
  };

  return (
    <Button
      size="sm"
      className="rounded-lg bg-navy text-white hover:bg-navy/90"
      onClick={handleClick}
    >
      <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
      Order This Design
    </Button>
  );
}
