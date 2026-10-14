import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PerformanceCharts } from "@/components/history/performance-charts";
import { QuizHistorySection } from "@/components/history/quiz-history-section";
import { AnsweredList } from "@/components/history/answered-list";
import {
  getAnsweredHistory,
  getDailyPerformance,
  getQuizHistoryEntries,
} from "@/lib/api";

export default function HistoryPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Histórico
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe seu desempenho dos últimos 7 dias e revise cada resposta.
        </p>
      </div>

      <Suspense fallback={<ChartsSkeleton />}>
        <ChartsSection />
      </Suspense>

      <Suspense fallback={<ListSkeleton />}>
        <QuizHistoryContent />
      </Suspense>

      <Suspense fallback={<ListSkeleton />}>
        <AnsweredContent />
      </Suspense>
    </div>
  );
}

async function ChartsSection() {
  const daily = await getDailyPerformance();
  return <PerformanceCharts daily={daily} />;
}

async function QuizHistoryContent() {
  const entries = await getQuizHistoryEntries();
  return <QuizHistorySection entries={entries} />;
}

async function AnsweredContent() {
  const answered = await getAnsweredHistory();
  return <AnsweredList answers={[...answered].reverse()} />;
}

function ChartsSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <Skeleton className="h-80 rounded-2xl lg:col-span-3" />
      <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}
