"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./question-card";
import type { Question, Quiz } from "@/lib/types";

export function QuizRunner({
  quiz,
  questions,
}: {
  quiz: Quiz;
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const total = questions.length;
  const current = questions[index];
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (!current) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 p-10 text-center text-sm text-muted-foreground">
        Este quiz ainda não possui perguntas.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">
            {quiz.name}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Pergunta {index + 1} de {total}
          </span>
        </div>
        <Progress value={progress} className="mt-2 h-1.5" />
      </div>

      <QuestionCard key={current.id} question={current} />

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          style={{ visibility: isFirst ? "hidden" : "visible" }}
          disabled={isFirst}
        >
          <ChevronLeft className="h-4 w-4" />
          Pergunta anterior
        </Button>
        <Button
          className="rounded-full"
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          style={{ visibility: isLast ? "hidden" : "visible" }}
          disabled={isLast}
        >
          Próxima pergunta
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
