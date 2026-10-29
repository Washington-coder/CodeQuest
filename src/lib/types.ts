// Tipos de domínio do CodeQuest.
// Hoje os dados vêm de mocks (src/lib/mock-data.ts), mas os formatos abaixo já
// refletem o modelo esperado quando a API/banco de dados forem integrados.

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionCategory =
  | "javascript"
  | "typescript"
  | "python"
  | "react"
  | "node"
  | "sql"
  | "algorithms"
  | "css";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "member";
  level: number;
  xp: number;
  streakDays: number;
  createdAt: string;
}

export type { OnboardingPreferences } from "./schemas";

export type QuestionType = "multiple-choice" | "open-ended";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  category: QuestionCategory;
  difficulty: Difficulty;
  options?: QuestionOption[];
  correctOptionId?: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  name: string;
  description?: string;
  difficulty: Difficulty;
  includeOpenEnded: boolean;
  customPrompt?: string;
  categories: QuestionCategory[];
  questionIds: string[];
  createdAt: string;
}

export interface AnsweredQuestion {
  id: string;
  questionId: string;
  question: Question;
  selectedOptionId?: string;
  isCorrect: boolean;
  answeredAt: string;
  mode: "free-random" | "quiz";
  quizId?: string;
}

export interface QuizHistoryEntry {
  quiz: Quiz;
  answers: AnsweredQuestion[];
  correctCount: number;
  incorrectCount: number;
  successRate: number;
}

export interface DailyPerformance {
  date: string;
  correct: number;
  incorrect: number;
}

export type QuestionMode = "free-random" | "quiz";
