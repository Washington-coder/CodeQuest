"use client";

import { useState } from "react";
import { CheckCircle2, ListChecks, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { QuizHistoryEntry } from "@/lib/types";

export function QuizHistorySection({ entries }: { entries: QuizHistoryEntry[] }) {
  const [active, setActive] = useState<QuizHistoryEntry | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-primary" />
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quizzes customizados
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <button
            key={entry.quiz.id}
            type="button"
            onClick={() => setActive(entry)}
            className="text-left"
          >
            <Card className="glow-card h-full border-border/70 transition-transform hover:-translate-y-0.5">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-sm font-semibold">{entry.quiz.name}</h3>
                  <Badge className="rounded-full border-none bg-primary/15 text-primary">
                    {entry.successRate}%
                  </Badge>
                </div>
                <Progress value={entry.successRate} className="h-1.5" />
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-accent-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {entry.correctCount} corretas
                  </span>
                  <span className="flex items-center gap-1 text-destructive">
                    <XCircle className="h-3.5 w-3.5" /> {entry.incorrectCount} incorretas
                  </span>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{active?.quiz.name}</DialogTitle>
            <DialogDescription>
              {active?.answers.length} pergunta(s) respondida(s) · {active?.successRate}% de acerto
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-80">
            <div className="space-y-2 pr-3">
              {active?.answers.map((answer) => (
                <div
                  key={answer.id}
                  className="flex items-start gap-2.5 rounded-xl border border-border/70 p-3"
                >
                  {answer.isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}
                  <p className="text-sm">{answer.question.prompt}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
