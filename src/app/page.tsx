import Link from "next/link";
import { ArrowRight, Braces, Flame, LineChart, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LandingHero } from "@/components/marketing/landing-hero";

const features = [
  {
    icon: Braces,
    title: "Stack sob medida",
    description:
      "Escolha suas linguagens e frameworks favoritos no onboarding e receba perguntas feitas para o seu caminho.",
  },
  {
    icon: Sparkles,
    title: "Quizzes sob demanda",
    description:
      "Gere quizzes customizados por dificuldade, com ou sem questões abertas, descrevendo o que quer praticar.",
  },
  {
    icon: LineChart,
    title: "Evolução visível",
    description:
      "Acompanhe seu progresso dos últimos 7 dias com gráficos e um histórico detalhado de cada resposta.",
  },
  {
    icon: Flame,
    title: "Ofensiva diária",
    description:
      "Construa uma sequência de estudos e mantenha a motivação em alta com metas curtas e recompensadoras.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
            <Terminal className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Code<span className="text-gradient">Quest</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" render={<Link href="/login" />}>
            Entrar
          </Button>
          <Button render={<Link href="/register" />} className="rounded-full">
            Criar conta <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <LandingHero />

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="glow-card border-border/70 bg-card/80 p-5 backdrop-blur"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-sm font-semibold">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
