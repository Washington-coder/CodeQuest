"use client";

import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarRange, CheckCircle2, ClipboardList, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { AnsweredQuestion, QuestionCategory } from "@/lib/types";

const categoryLabels: Record<QuestionCategory, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  react: "React",
  node: "Node.js",
  sql: "SQL",
  algorithms: "Algoritmos",
  css: "CSS",
};

type CorrectnessFilter = "all" | "correct" | "incorrect";

export function AnsweredList({ answers }: { answers: AnsweredQuestion[] }) {
  const [correctness, setCorrectness] = useState<CorrectnessFilter>("all");
  const [category, setCategory] = useState<QuestionCategory | "all">("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [active, setActive] = useState<AnsweredQuestion | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(answers.map((a) => a.question.category))),
    [answers]
  );

  const filtered = answers.filter((a) => {
    if (correctness === "correct" && !a.isCorrect) return false;
    if (correctness === "incorrect" && a.isCorrect) return false;
    if (category !== "all" && a.question.category !== category) return false;
    if (dateRange?.from) {
      const answeredAt = new Date(a.answeredAt);
      const from = new Date(dateRange.from);
      from.setHours(0, 0, 0, 0);
      const to = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
      to.setHours(23, 59, 59, 999);
      if (answeredAt < from || answeredAt > to) return false;
    }
    return true;
  });

  const rangeLabel = dateRange?.from
    ? dateRange.to
      ? `${dateRange.from.toLocaleDateString("pt-BR")} - ${dateRange.to.toLocaleDateString("pt-BR")}`
      : dateRange.from.toLocaleDateString("pt-BR")
    : "Período";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Respostas individuais
          </h2>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" className="w-44 justify-start rounded-lg font-normal">
                  <CalendarRange className="h-4 w-4" />
                  {rangeLabel}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
              />
              {dateRange?.from && (
                <div className="border-t border-border/70 p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-lg"
                    onClick={() => setDateRange(undefined)}
                  >
                    Limpar período
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          <Select value={correctness} onValueChange={(v) => setCorrectness(v as CorrectnessFilter)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Resultado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os resultados</SelectItem>
              <SelectItem value="correct">Apenas corretas</SelectItem>
              <SelectItem value="incorrect">Apenas incorretas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={(v) => setCategory(v as QuestionCategory | "all")}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Categoria / linguagem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {categoryLabels[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card">
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            Nenhuma resposta encontrada para os filtros selecionados.
          </p>
        )}
        {filtered.map((answer) => (
          <button
            key={answer.id}
            type="button"
            onClick={() => setActive(answer)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted/60 sm:px-5"
          >
            {answer.isCorrect ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-foreground" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-destructive" />
            )}
            <span className="flex-1 truncate">{answer.question.prompt}</span>
            <Badge variant="secondary" className="hidden rounded-full font-display text-[10px] uppercase tracking-wide sm:inline-flex">
              {categoryLabels[answer.question.category]}
            </Badge>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {new Date(answer.answeredAt).toLocaleDateString("pt-BR")}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da resposta</DialogTitle>
            <DialogDescription>
              {active && new Date(active.answeredAt).toLocaleString("pt-BR")}
            </DialogDescription>
          </DialogHeader>
          {active && (
            <div className="space-y-4">
              <p className="text-sm font-medium">{active.question.prompt}</p>

              {active.question.options ? (
                <div className="space-y-2">
                  {active.question.options.map((opt) => {
                    const isSelected = opt.id === active.selectedOptionId;
                    const isAnswer = opt.id === active.question.correctOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={
                          "rounded-lg border px-3 py-2 text-sm " +
                          (isAnswer
                            ? "border-accent bg-accent/15 text-accent-foreground"
                            : isSelected
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : "border-border bg-background")
                        }
                      >
                        {opt.label}
                        {isSelected && <span className="ml-2 text-xs">(sua resposta)</span>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  Pergunta dissertativa — resposta registrada em texto livre.
                </div>
              )}

              <div className="rounded-xl border border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
                {active.question.explanation}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
