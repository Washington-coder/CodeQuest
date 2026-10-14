import { Suspense } from "react";
import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/practice/quiz-runner";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuestionsByIds, listQuizzes } from "@/lib/api";

export async function generateStaticParams() {
  const quizzes = await listQuizzes();
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Suspense fallback={<QuizPageSkeleton />}>
        <QuizContent params={params} />
      </Suspense>
    </div>
  );
}

async function QuizContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quizzes = await listQuizzes();
  const quiz = quizzes.find((q) => q.id === id);

  if (!quiz) {
    notFound();
  }

  const questions = await getQuestionsByIds(quiz.questionIds);

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {quiz.name}
        </h1>
        {quiz.description && (
          <p className="mt-1 text-sm text-muted-foreground">{quiz.description}</p>
        )}
      </div>
      <QuizRunner quiz={quiz} questions={questions} />
    </>
  );
}

function QuizPageSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}
