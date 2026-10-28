"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { hasCompletedOnboarding } from "@/lib/api";

const subscribe = () => () => {};

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const allowed = mounted && hasCompletedOnboarding();

  useEffect(() => {
    if (mounted && !allowed) router.replace("/onboarding");
  }, [mounted, allowed, router]);

  return allowed ? <>{children}</> : null;
}
