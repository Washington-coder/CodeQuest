"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { frameworkOptions, focusOptions, languageOptions } from "@/lib/mock-data";
import { savePreferences } from "@/lib/api";
import type { OnboardingPreferences } from "@/lib/types";

const interfaceLanguages: { id: OnboardingPreferences["interfaceLanguage"]; label: string }[] = [
  { id: "pt-BR", label: "Português (BR)" },
  { id: "en-US", label: "English (US)" },
  { id: "es-ES", label: "Español" },
];

const steps = [
  { title: "Linguagens", subtitle: "Quais linguagens você mais usa ou quer praticar?" },
  { title: "Frameworks", subtitle: "Com quais frameworks e ferramentas você trabalha?" },
  { title: "Foco", subtitle: "Qual é a sua área de atuação principal?" },
  { title: "Idioma", subtitle: "Em qual idioma você prefere usar o CodeQuest?" },
] as const;

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [languages, setLanguages] = useState<string[]>(["JavaScript", "TypeScript"]);
  const [frameworks, setFrameworks] = useState<string[]>(["React"]);
  const [focus, setFocus] = useState<string[]>(["frontend"]);
  const [interfaceLanguage, setInterfaceLanguage] =
    useState<OnboardingPreferences["interfaceLanguage"]>("pt-BR");
  const [saving, setSaving] = useState(false);

  const progress = ((step + 1) / steps.length) * 100;
  const canContinue =
    (step === 0 && languages.length > 0) ||
    (step === 1 && frameworks.length > 0) ||
    (step === 2 && focus.length > 0) ||
    step === 3;

  async function handleFinish() {
    setSaving(true);
    await savePreferences({
      languages,
      frameworks,
      focus: focus as OnboardingPreferences["focus"],
      interfaceLanguage,
    });
    router.push("/practice");
  }

  return (
    <Card className="glow-card w-full max-w-2xl border-border/70">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">
            Passo {step + 1} de {steps.length}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Onboarding
          </span>
        </div>
        <Progress value={progress} className="mb-8 h-1.5" />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="font-display text-xl font-semibold sm:text-2xl">
              {steps[step].title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{steps[step].subtitle}</p>

            <div className="mt-6">
              {step === 0 && (
                <OptionGrid
                  options={languageOptions}
                  selected={languages}
                  onToggle={(v) => setLanguages((l) => toggle(l, v))}
                />
              )}
              {step === 1 && (
                <OptionGrid
                  options={frameworkOptions}
                  selected={frameworks}
                  onToggle={(v) => setFrameworks((f) => toggle(f, v))}
                />
              )}
              {step === 2 && (
                <OptionGrid
                  options={focusOptions.map((f) => f.label)}
                  selected={focus.map(
                    (id) => focusOptions.find((f) => f.id === id)?.label ?? id
                  )}
                  onToggle={(label) => {
                    const id = focusOptions.find((f) => f.label === label)?.id;
                    if (id) setFocus((f) => toggle(f, id));
                  }}
                />
              )}
              {step === 3 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {interfaceLanguages.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setInterfaceLanguage(lang.id)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                        interfaceLanguage === lang.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-primary/40"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>

          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={!canContinue}
              className="rounded-full"
            >
              Continuar <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={saving} className="rounded-full">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Concluir
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function OptionGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={cn(
              "flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all",
              active
                ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20"
                : "border-border bg-card text-foreground hover:border-primary/40"
            )}
          >
            {option}
            {active && <Check className="h-4 w-4" />}
          </button>
        );
      })}
    </div>
  );
}
