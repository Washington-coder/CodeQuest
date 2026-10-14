"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton({ fallbackHref = "/practice" }: { fallbackHref?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-full border-border/80 bg-card"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      aria-label="Voltar"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
