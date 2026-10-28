"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Search, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { frameworkOptions, focusOptions, languageOptions } from "@/lib/mock-data";
import { hasCompletedOnboarding, savePreferences } from "@/lib/api";
import type { OnboardingPreferences } from "@/lib/types";
import { TagIcon } from "./tag-icon";
import { LanguageFlag } from "./language-flag";

type StepId = "focus" | "language" | "framework" | "interface";

interface Option {
  label: string;
  value: string;
}

const steps: { id: StepId; title: string; subtitle: string }[] = [
  { id: "focus", title: "Área de atuação", subtitle: "Qual é a sua área de atuação principal?" },
  { id: "language", title: "Linguagens", subtitle: "Quais linguagens você mais usa ou quer praticar?" },
  { id: "framework", title: "Frameworks", subtitle: "Com quais frameworks e ferramentas você trabalha?" },
  { id: "interface", title: "Idioma", subtitle: "Em qual idioma você prefere usar o CodeQuest?" },
];

const optionsByStep: Record<Exclude<StepId, "interface">, Option[]> = {
  focus: focusOptions.map((f) => ({ label: f.label, value: f.id })),
  language: languageOptions.map((l) => ({ label: l, value: l })),
  framework: frameworkOptions.map((f) => ({ label: f, value: f })),
};

const interfaceLanguages: { id: OnboardingPreferences["interfaceLanguage"]; label: string }[] = [
  { id: "pt-BR", label: "Português (BR)" },
  { id: "en-US", label: "English (US)" },
  { id: "es-ES", label: "Español" },
];

function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<Exclude<StepId, "interface">, string[]>>({
    focus: [],
    language: [],
    framework: [],
  });
  const [interfaceLanguage, setInterfaceLanguage] = useState<
    OnboardingPreferences["interfaceLanguage"] | null
  >(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (hasCompletedOnboarding()) router.replace("/practice");
  }, [router]);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const canContinue =
    current.id === "interface" ? interfaceLanguage !== null : selected[current.id].length > 0;

  const filtered = useMemo(() => {
    if (current.id === "interface") return [];
    const q = normalize(query.trim());
    const all = optionsByStep[current.id];
    return q ? all.filter((o) => normalize(o.label).includes(q)) : all;
  }, [current.id, query]);

  function goTo(next: number) {
    setQuery("");
    setStep(next);
  }

  async function handleFinish() {
    if (!interfaceLanguage) return;
    setSaving(true);
    await savePreferences({
      languages: selected.language,
      frameworks: selected.framework,
      focus: selected.focus as OnboardingPreferences["focus"],
      interfaceLanguage,
    });
    router.push("/practice");
  }

  return (
    <Card className="glow-card w-full max-w-2xl border-border/70">
      <CardContent className="flex min-h-[560px] flex-col p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Bem-vindo ao CodeQuest
          </span>
        </div>

        <ol className="mb-10 flex items-start" aria-label="Etapas">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={s.id}
                aria-current={active ? "step" : undefined}
                className={cn("flex items-start", i < steps.length - 1 && "flex-1")}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                      done && "border-primary bg-primary text-primary-foreground",
                      active && "border-primary bg-primary/10 text-primary shadow-md shadow-primary/30",
                      !done && !active && "border-border bg-card text-muted-foreground"
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden text-xs sm:block",
                      active ? "font-semibold text-primary" : "text-muted-foreground"
                    )}
                  >
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 mt-[17px] h-0.5 flex-1 rounded-full transition-colors",
                      done ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-1 flex-col justify-center"
          >
            <h2 className="mt-8 font-display text-2xl font-semibold sm:text-3xl">
              {current.title}
            </h2>
            <p className="mt-1 text-base text-muted-foreground">{current.subtitle}</p>

            {current.id === "interface" ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {interfaceLanguages.map((lang) => {
                  const active = interfaceLanguage === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setInterfaceLanguage(lang.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-base font-medium transition-all",
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-primary/40"
                      )}
                    >
                      <LanguageFlag id={lang.id} />
                      {lang.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="relative mt-6">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Buscar em ${current.title.toLowerCase()}...`}
                    aria-label="Buscar tags"
                    className="h-11 pl-10 text-base"
                  />
                </div>
                <div className="mt-6 min-h-48">
                  {filtered.length === 0 ? (
                    <p className="py-8 text-center text-base text-muted-foreground">
                      Nenhuma tag encontrada para &quot;{query}&quot;.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      {filtered.map((opt) => {
                        const key = current.id as Exclude<StepId, "interface">;
                        const active = selected[key].includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setSelected((s) => ({
                                ...s,
                                [key]: toggle(s[key], opt.value),
                              }))
                            }
                            className={cn(
                              "flex items-center gap-2.5 rounded-full border px-4 py-2 text-base font-medium transition-all",
                              active
                                ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20"
                                : "border-border bg-card text-foreground hover:border-primary/40"
                            )}
                          >
                            <TagIcon label={opt.label} value={opt.value} />
                            {opt.label}
                            {active && <X className="h-4 w-4" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <Button
              variant="ghost"
              size="lg"
              onClick={() => goTo(step - 1)}
              className="rounded-full text-base"
            >
              <ArrowLeft className="h-4 w-4" /> Anterior
            </Button>
          ) : (
            <span />
          )}

          {isLast ? (
            <Button
              size="lg"
              onClick={handleFinish}
              disabled={!canContinue || saving}
              className="rounded-full text-base"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Concluir
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => goTo(step + 1)}
              disabled={!canContinue}
              className="rounded-full text-base"
            >
              Próximo <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
