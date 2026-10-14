"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { createQuiz } from "@/lib/api";
import type { Difficulty, QuestionCategory } from "@/lib/types";

const difficulties: { id: Difficulty; label: string }[] = [
  { id: "easy", label: "Fácil" },
  { id: "medium", label: "Médio" },
  { id: "hard", label: "Difícil" },
];

const categories: { id: QuestionCategory; label: string }[] = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "react", label: "React" },
  { id: "node", label: "Node.js" },
  { id: "sql", label: "SQL" },
  { id: "algorithms", label: "Algoritmos" },
  { id: "css", label: "CSS" },
];

const PROMPT_LIMIT = 100;

export function QuizForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [selectedCategories, setSelectedCategories] = useState<QuestionCategory[]>([
    "javascript",
  ]);
  const [includeOpenEnded, setIncludeOpenEnded] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  function toggleCategory(id: QuestionCategory) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const quiz = await createQuiz({
      name: name || "Quiz sem nome",
      difficulty,
      includeOpenEnded,
      customPrompt: customPrompt || undefined,
      categories: selectedCategories,
      questionCount,
    });
    router.push(`/quizzes/${quiz.id}`);
  }

  return (
    <Card className="glow-card border-border/70">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <Label htmlFor="quiz-name">Nome do quiz</Label>
            <Input
              id="quiz-name"
              placeholder="Ex.: Revisão de React Hooks"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Dificuldade</Label>
            <div className="grid grid-cols-3 gap-2.5">
              {difficulties.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                    difficulty === d.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-primary/40"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categorias</Label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {categories.map((c) => {
                const active = selectedCategories.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-xs font-medium transition-all",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background hover:border-primary/40"
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-4 py-3">
            <div>
              <Label htmlFor="open-ended" className="text-sm font-medium">
                Incluir questões dissertativas
              </Label>
              <p className="text-xs text-muted-foreground">
                Perguntas abertas, sem alternativas de múltipla escolha.
              </p>
            </div>
            <Switch
              id="open-ended"
              checked={includeOpenEnded}
              onCheckedChange={setIncludeOpenEnded}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade de perguntas</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={20}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-28"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-prompt">Especifique o tipo de questão (opcional)</Label>
              <span className="text-xs text-muted-foreground">
                {customPrompt.length}/{PROMPT_LIMIT}
              </span>
            </div>
            <Textarea
              id="custom-prompt"
              placeholder="Ex.: foque em hooks de performance e closures"
              value={customPrompt}
              maxLength={PROMPT_LIMIT}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full rounded-full sm:w-auto">
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Gerar quiz
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
