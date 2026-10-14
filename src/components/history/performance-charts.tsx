"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyPerformance } from "@/lib/types";

const COLORS = {
  correct: "var(--color-chart-2)",
  incorrect: "var(--color-chart-3)",
};

function formatDay(date: string) {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function PerformanceCharts({
  daily,
}: {
  daily: DailyPerformance[];
}) {
  const totalCorrect = daily.reduce((sum, d) => sum + d.correct, 0);
  const totalIncorrect = daily.reduce((sum, d) => sum + d.incorrect, 0);
  const total = totalCorrect + totalIncorrect;
  const successRate = total ? Math.round((totalCorrect / total) * 100) : 0;

  const pieData = [
    { name: "Corretas", value: totalCorrect },
    { name: "Incorretas", value: totalIncorrect },
  ];

  const chartData = daily.map((d) => ({ ...d, day: formatDay(d.date) }));

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <Card className="border-border/70 lg:col-span-3">
        <CardHeader>
          <CardTitle>Desempenho diário (últimos 7 dias)</CardTitle>
        </CardHeader>
        <CardContent className="h-72 px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              barGap={6}
              margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 6" stroke="var(--border)" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis
                type="category"
                dataKey="day"
                width={44}
                tick={{ fontSize: 12 }}
                stroke="var(--muted-foreground)"
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--popover)",
                  fontSize: 12,
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">
                    {value === "correct" ? "Corretas" : "Incorretas"}
                  </span>
                )}
              />
              <Bar dataKey="correct" stackId="a" fill={COLORS.correct} radius={[8, 8, 8, 8]} maxBarSize={18} />
              <Bar dataKey="incorrect" stackId="a" fill={COLORS.incorrect} radius={[8, 8, 8, 8]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/70 lg:col-span-2">
        <CardHeader>
          <CardTitle>Taxa de acerto geral</CardTitle>
        </CardHeader>
        <CardContent className="flex h-72 flex-col items-center justify-center">
          <div className="relative h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={56}
                  outerRadius={80}
                  paddingAngle={4}
                  cornerRadius={8}
                  stroke="none"
                >
                  <Cell fill={COLORS.correct} />
                  <Cell fill={COLORS.incorrect} />
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--popover)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-semibold">{successRate}%</span>
              <span className="text-[11px] text-muted-foreground">acerto</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {totalCorrect} corretas / {totalIncorrect} incorretas ({total} no total)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
