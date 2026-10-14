import { QuizForm } from "@/components/quizzes/quiz-form";

export default function NewQuizPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Criar quiz
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Personalize dificuldade, categorias e tipos de pergunta para gerar um quiz sob medida.
        </p>
      </div>
      <QuizForm />
    </div>
  );
}
