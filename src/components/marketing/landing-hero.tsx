"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const codeLines = [
  "const skills = ['TypeScript', 'React', 'SQL']",
  "function practice(stack) {",
  "  return generateQuiz(stack)",
  "}",
  "> streak: 6 dias 🔥",
];

export function LandingHero() {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-2 lg:items-center lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Prática diária e gamificada
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Treine sua lógica de{" "}
          <span className="text-gradient">programação</span> todos os dias
        </h1>
        <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
          O CodeQuest conecta você a perguntas e quizzes feitos para a sua
          stack. Pratique, erre, entenda a explicação e evolua — tudo em uma
          interface rápida e feita para devs.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" render={<Link href="/register" />} className="rounded-full px-6">
            Começar agora <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/login" />}
            className="rounded-full px-6"
          >
            Já tenho conta
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
          {["Gratuito para começar", "Modo livre e quizzes", "+8 linguagens"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {item}
              </span>
            )
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        <Card className="glow-card relative overflow-hidden border-border/70 bg-card/90 p-0 backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-border/70 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="ml-3 font-display text-xs text-muted-foreground">
              question.ts
            </span>
          </div>
          <div className="space-y-1 p-5 font-display text-sm">
            {codeLines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className={
                  line.startsWith(">")
                    ? "text-accent"
                    : "text-foreground/90"
                }
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-border/70 p-5">
            <div className="rounded-xl bg-muted/60 p-3">
              <p className="text-xs text-muted-foreground">Acertos hoje</p>
              <p className="font-display text-xl font-semibold text-accent">87%</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <p className="text-xs text-muted-foreground">XP acumulado</p>
              <p className="font-display text-xl font-semibold text-primary">3.420</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
