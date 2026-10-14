import Link from "next/link";
import { Terminal } from "lucide-react";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
          <Terminal className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          Code<span className="text-gradient">Quest</span>
        </span>
      </Link>
      <OnboardingFlow />
    </div>
  );
}
