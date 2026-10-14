"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/types";

const difficultyLabel: Record<Question["difficulty"], string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

const difficultyClass: Record<Question["difficulty"], string> = {
  easy: "bg-accent/15 text-accent-foreground",
  medium: "bg-warning/15 text-warning-foreground",
  hard: "bg-destructive/15 text-destructive",
};

export function QuestionCard({ question }: { question: Question }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [openAnswer, setOpenAnswer] = useState("");

  const isCorrect = selected === question.correctOptionId;

  function handleRetry() {
    setSelected(null);
    setConfirmed(false);
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8"
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge className={cn("rounded-full border-none font-display text-[10px] uppercase tracking-wide", difficultyClass[question.difficulty])}>
          {difficultyLabel[question.difficulty]}
        </Badge>
        <Badge variant="secondary" className="rounded-full font-display text-[10px] uppercase tracking-wide">
          {question.category}
        </Badge>
        {question.type === "open-ended" && (
          <Badge variant="outline" className="rounded-full font-display text-[10px] uppercase tracking-wide">
            Dissertativa
          </Badge>
        )}
      </div>

      <h2 className="font-display text-lg font-medium leading-relaxed sm:text-xl">
        {question.prompt}
      </h2>

      {question.type === "multiple-choice" ? (
        <div className="mt-6 space-y-2.5">
          {question.options?.map((option) => {
            const isSelected = selected === option.id;
            const isAnswerOption = option.id === question.correctOptionId;
            return (
              <button
                key={option.id}
                type="button"
                disabled={confirmed}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all disabled:cursor-default",
                  !confirmed && isSelected && "border-primary bg-primary/10 text-primary",
                  !confirmed && !isSelected && "border-border bg-background hover:border-primary/40",
                  confirmed && isAnswerOption && "border-accent bg-accent/15 text-accent-foreground",
                  confirmed && isSelected && !isAnswerOption && "border-destructive bg-destructive/10 text-destructive",
                  confirmed && !isSelected && !isAnswerOption && "border-border bg-background opacity-60"
                )}
              >
                <span>{option.label}</span>
                {confirmed && isAnswerOption && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                {confirmed && isSelected && !isAnswerOption && <XCircle className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-6">
          <Textarea
            placeholder="Escreva sua resposta..."
            value={openAnswer}
            disabled={confirmed}
            onChange={(e) => setOpenAnswer(e.target.value)}
            rows={4}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {confirmed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 overflow-hidden"
          >
            <div
              className={cn(
                "rounded-xl border p-4",
                question.type === "open-ended" || isCorrect
                  ? "border-accent/40 bg-accent/10"
                  : "border-destructive/40 bg-destructive/10"
              )}
            >
              <p className="flex items-center gap-2 font-display text-sm font-semibold">
                {question.type === "open-ended" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Resposta registrada
                  </>
                ) : isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Resposta correta!
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-destructive" /> Resposta incorreta
                  </>
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center gap-3">
        {!confirmed ? (
          <Button
            onClick={() => setConfirmed(true)}
            disabled={question.type === "multiple-choice" ? !selected : !openAnswer.trim()}
            className="rounded-full"
          >
            Confirmar resposta
          </Button>
        ) : (
          <Button variant="outline" onClick={handleRetry} className="rounded-full">
            <RotateCcw className="h-4 w-4" /> Tentar novamente
          </Button>
        )}
      </div>
    </motion.div>
  );
}
