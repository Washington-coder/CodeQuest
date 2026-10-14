"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionCard } from "./question-card";
import { getRandomQuestion } from "@/lib/api";
import type { Difficulty, Question } from "@/lib/types";

const difficultyOptions: { id: Difficulty | "all"; label: string }[] = [
  { id: "all", label: "Todas as dificuldades" },
  { id: "easy", label: "Fácil" },
  { id: "medium", label: "Médio" },
  { id: "hard", label: "Difícil" },
];

export function FreeRandomPanel() {
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getRandomQuestion(difficulty === "all" ? undefined : { difficulty }).then(
      (next) => {
        if (!cancelled) {
          setQuestion(next);
          setLoading(false);
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, [difficulty, refreshKey]);

  function handleDifficultyChange(value: Difficulty | "all") {
    setLoading(true);
    setDifficulty(value);
  }

  function handleNext() {
    setLoading(true);
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">
            Modo livre
          </p>
          <h2 className="text-lg font-semibold">Baseado nas suas preferências</h2>
        </div>
        <Select
          value={difficulty}
          onValueChange={(v) => handleDifficultyChange(v as Difficulty | "all")}
        >
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Dificuldade" />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading || !question ? (
        <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <div className="space-y-2.5 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full rounded-xl" />
            ))}
          </div>
        </div>
      ) : (
        <QuestionCard key={question.id} question={question} />
      )}

      <motion.div whileTap={{ scale: 0.97 }} className="flex justify-end">
        <Button onClick={handleNext} disabled={loading} className="rounded-full">
          <Shuffle className="h-4 w-4" />
          Próxima pergunta
        </Button>
      </motion.div>
    </div>
  );
}
