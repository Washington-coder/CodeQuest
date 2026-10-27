// Camada de acesso a dados do CodeQuest.
//
// Por enquanto tudo é resolvido com dados mockados (src/lib/mock-data.ts),
// mas a assinatura das funções já representa os futuros endpoints da API
// (ex.: POST /auth/login, GET /questions/random, POST /quizzes, GET /history).
// Quando o backend/banco de dados forem definidos, basta trocar a
// implementação de cada função por uma chamada `fetch`/SDK mantendo os
// mesmos parâmetros e tipos de retorno — a UI não precisa mudar.

import {
  answeredHistory,
  currentUser,
  dailyPerformance,
  getQuizHistory,
  questions,
  quizzes,
  teamMembers,
} from "./mock-data";
import type {
  Difficulty,
  OnboardingPreferences,
  Question,
  QuestionMode,
  Quiz,
} from "./types";

const LATENCY_MS = 350;

function delay<T>(value: T, ms = LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---------- Autenticação (RF-01, RF-02, RF-03) ----------

export async function loginWithEmail(_email: string, _password: string) {
  // TODO: substituir por POST /auth/login
  return delay({ user: currentUser, token: "mock-token" });
}

export async function registerWithEmail(
  _name: string,
  _email: string,
  _password: string
) {
  // TODO: substituir por POST /auth/register
  return delay({ user: currentUser, token: "mock-token" });
}

export async function loginWithGoogle() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error(
      "Configure NEXT_PUBLIC_GOOGLE_CLIENT_ID e NEXT_PUBLIC_GOOGLE_REDIRECT_URI no .env.local e reinicie o servidor."
    );
  }

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");

  window.location.href = googleAuthUrl.toString();
}

// ---------- Onboarding (RF-04) ----------

export async function savePreferences(preferences: OnboardingPreferences) {
  // TODO: substituir por PUT /users/me/preferences
  return delay({ success: true, preferences });
}

// ---------- Perguntas (RF-05, RF-06, RF-13) ----------

export async function getRandomQuestion(filters?: {
  difficulty?: Difficulty;
}): Promise<Question> {
  const pool = filters?.difficulty
    ? questions.filter((q) => q.difficulty === filters.difficulty)
    : questions;
  const pick = pool[Math.floor(Math.random() * pool.length)] ?? questions[0];
  return delay(pick, 200);
}

export async function getQuestionsByIds(ids: string[]): Promise<Question[]> {
  return delay(ids.map((id) => questions.find((q) => q.id === id)!).filter(Boolean));
}

// ---------- Quizzes (RF-14, RF-15, RF-16) ----------

export interface CreateQuizInput {
  name: string;
  difficulty: Difficulty;
  includeOpenEnded: boolean;
  customPrompt?: string;
  categories: string[];
  questionCount: number;
}

export async function createQuiz(input: CreateQuizInput): Promise<Quiz> {
  // TODO: substituir por POST /quizzes (geração provavelmente feita por LLM no backend)
  const pool = questions.filter(
    (q) =>
      q.difficulty === input.difficulty &&
      (input.categories.length === 0 || input.categories.includes(q.category)) &&
      (input.includeOpenEnded || q.type !== "open-ended")
  );
  const selected = pool.slice(0, input.questionCount || pool.length);
  const quiz: Quiz = {
    id: `quiz-${Date.now()}`,
    name: input.name,
    description: input.customPrompt,
    difficulty: input.difficulty,
    includeOpenEnded: input.includeOpenEnded,
    customPrompt: input.customPrompt,
    categories: input.categories as Quiz["categories"],
    questionIds: selected.map((q) => q.id),
    createdAt: new Date().toISOString(),
  };
  return delay(quiz, 900);
}

export async function listQuizzes(): Promise<Quiz[]> {
  return delay(quizzes);
}

// ---------- Histórico & Dashboard (RF-17 a RF-24) ----------

export async function getDailyPerformance() {
  return delay(dailyPerformance);
}

export async function getAnsweredHistory() {
  return delay(answeredHistory);
}

export async function getQuizHistoryEntries() {
  return delay(getQuizHistory());
}

// ---------- Usuários ----------

export async function getTeamMembers() {
  return delay(teamMembers);
}

export async function getCurrentUser() {
  return delay(currentUser);
}

export type { QuestionMode };
