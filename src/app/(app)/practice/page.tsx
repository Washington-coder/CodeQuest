import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FreeRandomPanel } from "@/components/practice/free-random-panel";
import { listQuizzes } from "@/lib/api";

const difficultyLabel: Record<string, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Praticar
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha o modo livre para perguntas baseadas no seu perfil ou entre em um quiz customizado.
        </p>
      </div>

      <Tabs defaultValue="free">
        <TabsList>
          <TabsTrigger value="free">Modo livre</TabsTrigger>
          <TabsTrigger value="quiz">Modo quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="free" className="mt-6">
          <FreeRandomPanel />
        </TabsContent>

        <TabsContent value="quiz" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Seus quizzes customizados, prontos para praticar.
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              render={<Link href="/quizzes/new" />}
            >
              <Sparkles className="h-4 w-4" />
              Criar quiz
            </Button>
          </div>

          <Suspense fallback={<QuizGridSkeleton />}>
            <QuizGrid />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function QuizGrid() {
  const quizzes = await listQuizzes();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="glow-card border-border/70">
          <CardContent className="flex h-full flex-col gap-3 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border-none font-display text-[10px] uppercase tracking-wide">
                {difficultyLabel[quiz.difficulty]}
              </Badge>
              {quiz.includeOpenEnded && (
                <Badge variant="outline" className="rounded-full font-display text-[10px] uppercase tracking-wide">
                  Com dissertativas
                </Badge>
              )}
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">{quiz.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{quiz.description}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {quiz.questionIds.length} pergunta(s)
            </p>
            <Button
              className="mt-auto rounded-full"
              render={<Link href={`/quizzes/${quiz.id}`} />}
            >
              Começar quiz <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function QuizGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-2xl" />
      ))}
    </div>
  );
}
