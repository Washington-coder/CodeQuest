import { Suspense } from "react";
import { Download, Target, TrendingUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnsweredHistory, getQuizHistoryEntries } from "@/lib/api";
import type { QuestionCategory } from "@/lib/types";

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

export default function ReportPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Relatório
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Resumo geral de desempenho, pronto para exportação quando a integração estiver disponível.
          </p>
        </div>
        <Button variant="outline" className="rounded-full">
          <Download className="h-4 w-4" />
          Exportar relatório
        </Button>
      </div>

      <Suspense fallback={<SummarySkeleton />}>
        <SummaryCards />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <CategoryBreakdown />
      </Suspense>
    </div>
  );
}

async function SummaryCards() {
  const [answers, quizEntries] = await Promise.all([
    getAnsweredHistory(),
    getQuizHistoryEntries(),
  ]);

  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const totalAnswered = answers.length;
  const successRate = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="glow-card border-border/70">
        <CardContent className="space-y-1 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Target className="h-4 w-4" />
          </span>
          <p className="mt-2 text-2xl font-semibold">{totalAnswered}</p>
          <p className="text-xs text-muted-foreground">Perguntas respondidas</p>
        </CardContent>
      </Card>
      <Card className="glow-card border-border/70">
        <CardContent className="space-y-1 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
            <TrendingUp className="h-4 w-4" />
          </span>
          <p className="mt-2 text-2xl font-semibold">{successRate}%</p>
          <p className="text-xs text-muted-foreground">Taxa de acerto geral</p>
        </CardContent>
      </Card>
      <Card className="glow-card border-border/70">
        <CardContent className="space-y-1 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/15 text-warning-foreground">
            <Trophy className="h-4 w-4" />
          </span>
          <p className="mt-2 text-2xl font-semibold">{quizEntries.length}</p>
          <p className="text-xs text-muted-foreground">Quizzes customizados concluídos</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function CategoryBreakdown() {
  const answers = await getAnsweredHistory();

  const byCategory = new Map<QuestionCategory, { correct: number; total: number }>();
  for (const answer of answers) {
    const entry = byCategory.get(answer.question.category) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (answer.isCorrect) entry.correct += 1;
    byCategory.set(answer.question.category, entry);
  }

  return (
    <Card className="border-border/70">
      <CardContent className="space-y-4 p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Desempenho por categoria
        </h2>
        <div className="space-y-4">
          {Array.from(byCategory.entries()).map(([category, stats]) => {
            const rate = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={category} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{categoryLabels[category]}</span>
                  <span className="text-muted-foreground">
                    {stats.correct}/{stats.total} · {rate}%
                  </span>
                </div>
                <Progress value={rate} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SummarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}
