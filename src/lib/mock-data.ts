// Dados simulados para prototipagem da interface.
// Quando a API/banco de dados forem definidos, substitua estes mocks por
// chamadas reais (ex.: funções em src/lib/api.ts consumindo fetch/SDK),
// mantendo os mesmos tipos de src/lib/types.ts para não quebrar a UI.

import type {
  AnsweredQuestion,
  DailyPerformance,
  Question,
  Quiz,
  QuizHistoryEntry,
  User,
} from "./types";

export const currentUser: User = {
  id: "u-1",
  name: "Alex Rivera",
  email: "alex.rivera@codequest.dev",
  role: "member",
  level: 12,
  xp: 3420,
  streakDays: 6,
  createdAt: "2024-11-02T10:00:00.000Z",
};

export const languageOptions = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "C#",
  "PHP",
];

export const frameworkOptions = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Django",
  "Spring Boot",
  "Laravel",
];

export const focusOptions: { id: string; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Fullstack" },
  { id: "data", label: "Dados / IA" },
];

export const questions: Question[] = [
  {
    id: "q-1",
    prompt:
      "Em JavaScript, qual é o resultado de `typeof NaN`?",
    type: "multiple-choice",
    category: "javascript",
    difficulty: "easy",
    options: [
      { id: "a", label: "'number'" },
      { id: "b", label: "'NaN'" },
      { id: "c", label: "'undefined'" },
      { id: "d", label: "'object'" },
    ],
    correctOptionId: "a",
    explanation:
      "Apesar do nome 'Not a Number', o tipo de NaN continua sendo 'number'. Isso ocorre porque NaN é um valor especial dentro do conjunto de números de ponto flutuante (IEEE 754).",
  },
  {
    id: "q-2",
    prompt: "Qual hook do React é usado para memorizar valores computados entre renders?",
    type: "multiple-choice",
    category: "react",
    difficulty: "easy",
    options: [
      { id: "a", label: "useEffect" },
      { id: "b", label: "useMemo" },
      { id: "c", label: "useRef" },
      { id: "d", label: "useCallback" },
    ],
    correctOptionId: "b",
    explanation:
      "useMemo memoriza o resultado de um cálculo caro e só o recalcula quando uma das dependências muda, evitando trabalho desnecessário em cada renderização.",
  },
  {
    id: "q-3",
    prompt:
      "No TypeScript, qual utility type torna todas as propriedades de um tipo opcionais?",
    type: "multiple-choice",
    category: "typescript",
    difficulty: "medium",
    options: [
      { id: "a", label: "Required<T>" },
      { id: "b", label: "Readonly<T>" },
      { id: "c", label: "Partial<T>" },
      { id: "d", label: "Pick<T, K>" },
    ],
    correctOptionId: "c",
    explanation:
      "Partial<T> transforma todas as propriedades de T em opcionais, útil para objetos de atualização parcial (ex.: PATCH em uma API).",
  },
  {
    id: "q-4",
    prompt: "Qual comando SQL é usado para remover duplicatas de um resultado de SELECT?",
    type: "multiple-choice",
    category: "sql",
    difficulty: "easy",
    options: [
      { id: "a", label: "UNIQUE" },
      { id: "b", label: "DISTINCT" },
      { id: "c", label: "GROUP ONLY" },
      { id: "d", label: "FILTER" },
    ],
    correctOptionId: "b",
    explanation:
      "DISTINCT remove linhas duplicadas do resultado de uma consulta, considerando todas as colunas selecionadas.",
  },
  {
    id: "q-5",
    prompt: "Qual é a complexidade de tempo média de busca em uma tabela hash?",
    type: "multiple-choice",
    category: "algorithms",
    difficulty: "medium",
    options: [
      { id: "a", label: "O(n)" },
      { id: "b", label: "O(log n)" },
      { id: "c", label: "O(1)" },
      { id: "d", label: "O(n log n)" },
    ],
    correctOptionId: "c",
    explanation:
      "Em média, operações de busca, inserção e remoção em uma hash table são O(1), assumindo uma boa função de hash e poucas colisões.",
  },
  {
    id: "q-6",
    prompt: "Descreva a diferença entre `let`, `const` e `var` em JavaScript.",
    type: "open-ended",
    category: "javascript",
    difficulty: "easy",
    explanation:
      "`var` tem escopo de função e é içada (hoisted), `let` e `const` têm escopo de bloco. `const` não permite reatribuição da referência, enquanto `let` permite.",
  },
  {
    id: "q-7",
    prompt: "No Node.js, qual módulo nativo permite criar um servidor HTTP sem frameworks?",
    type: "multiple-choice",
    category: "node",
    difficulty: "easy",
    options: [
      { id: "a", label: "fs" },
      { id: "b", label: "http" },
      { id: "c", label: "path" },
      { id: "d", label: "events" },
    ],
    correctOptionId: "b",
    explanation:
      "O módulo `http` é nativo do Node.js e permite criar servidores e clientes HTTP sem dependências externas.",
  },
  {
    id: "q-8",
    prompt: "Qual propriedade CSS cria um contexto de flexbox em um elemento?",
    type: "multiple-choice",
    category: "css",
    difficulty: "easy",
    options: [
      { id: "a", label: "display: flex" },
      { id: "b", label: "position: flex" },
      { id: "c", label: "flex: box" },
      { id: "d", label: "layout: flex" },
    ],
    correctOptionId: "a",
    explanation:
      "`display: flex` transforma o elemento em um flex container, habilitando propriedades como justify-content e align-items nos filhos diretos.",
  },
  {
    id: "q-9",
    prompt: "Em Python, qual estrutura de dados é imutável e ordenada?",
    type: "multiple-choice",
    category: "python",
    difficulty: "medium",
    options: [
      { id: "a", label: "list" },
      { id: "b", label: "dict" },
      { id: "c", label: "set" },
      { id: "d", label: "tuple" },
    ],
    correctOptionId: "d",
    explanation:
      "Tuplas em Python são ordenadas e imutáveis — depois de criadas, seus elementos não podem ser alterados.",
  },
  {
    id: "q-10",
    prompt:
      "Qual algoritmo de ordenação tem pior caso O(n²) mas é estável e eficiente para listas quase ordenadas?",
    type: "multiple-choice",
    category: "algorithms",
    difficulty: "hard",
    options: [
      { id: "a", label: "Quick Sort" },
      { id: "b", label: "Insertion Sort" },
      { id: "c", label: "Heap Sort" },
      { id: "d", label: "Selection Sort" },
    ],
    correctOptionId: "b",
    explanation:
      "Insertion Sort tem pior caso O(n²), mas é muito eficiente (quase O(n)) quando a lista já está parcialmente ordenada, além de ser estável.",
  },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-1",
    name: "Fundamentos de JavaScript",
    description: "Revisão rápida dos conceitos essenciais de JS moderno.",
    difficulty: "easy",
    includeOpenEnded: true,
    categories: ["javascript"],
    questionIds: ["q-1", "q-6"],
    createdAt: "2025-02-10T14:00:00.000Z",
  },
  {
    id: "quiz-2",
    name: "React na Prática",
    description: "Hooks, performance e padrões comuns em aplicações React.",
    difficulty: "medium",
    includeOpenEnded: false,
    categories: ["react"],
    questionIds: ["q-2"],
    createdAt: "2025-02-12T09:30:00.000Z",
  },
  {
    id: "quiz-3",
    name: "SQL & Algoritmos",
    description: "Mistura de consultas SQL com lógica de algoritmos clássicos.",
    difficulty: "hard",
    includeOpenEnded: false,
    customPrompt: "Focar em joins, índices e complexidade de algoritmos de ordenação",
    categories: ["sql", "algorithms"],
    questionIds: ["q-4", "q-5", "q-10"],
    createdAt: "2025-02-14T18:15:00.000Z",
  },
];

function buildAnswered(
  questionId: string,
  selectedOptionId: string | undefined,
  isCorrect: boolean,
  answeredAt: string,
  mode: "free-random" | "quiz",
  quizId?: string
): AnsweredQuestion {
  const question = questions.find((q) => q.id === questionId)!;
  return {
    id: `ans-${questionId}-${answeredAt}`,
    questionId,
    question,
    selectedOptionId,
    isCorrect,
    answeredAt,
    mode,
    quizId,
  };
}

export const answeredHistory: AnsweredQuestion[] = [
  buildAnswered("q-1", "a", true, "2025-02-16T08:10:00.000Z", "free-random"),
  buildAnswered("q-2", "d", false, "2025-02-16T08:12:00.000Z", "quiz", "quiz-2"),
  buildAnswered("q-3", "c", true, "2025-02-17T10:00:00.000Z", "free-random"),
  buildAnswered("q-4", "b", true, "2025-02-17T10:05:00.000Z", "quiz", "quiz-3"),
  buildAnswered("q-5", "a", false, "2025-02-17T10:08:00.000Z", "quiz", "quiz-3"),
  buildAnswered("q-6", undefined, true, "2025-02-18T12:30:00.000Z", "quiz", "quiz-1"),
  buildAnswered("q-7", "b", true, "2025-02-18T12:40:00.000Z", "free-random"),
  buildAnswered("q-8", "a", true, "2025-02-19T09:00:00.000Z", "free-random"),
  buildAnswered("q-9", "a", false, "2025-02-19T09:05:00.000Z", "free-random"),
  buildAnswered("q-10", "b", true, "2025-02-20T15:20:00.000Z", "quiz", "quiz-3"),
  buildAnswered("q-1", "a", true, "2025-02-21T11:00:00.000Z", "free-random"),
  buildAnswered("q-2", "b", true, "2025-02-21T11:05:00.000Z", "quiz", "quiz-2"),
  buildAnswered("q-3", "a", false, "2025-02-22T16:45:00.000Z", "free-random"),
];

export const dailyPerformance: DailyPerformance[] = [
  { date: "2025-02-16", correct: 1, incorrect: 1 },
  { date: "2025-02-17", correct: 2, incorrect: 1 },
  { date: "2025-02-18", correct: 2, incorrect: 0 },
  { date: "2025-02-19", correct: 1, incorrect: 1 },
  { date: "2025-02-20", correct: 1, incorrect: 0 },
  { date: "2025-02-21", correct: 2, incorrect: 0 },
  { date: "2025-02-22", correct: 0, incorrect: 1 },
];

export function getQuizHistory(): QuizHistoryEntry[] {
  return quizzes.map((quiz) => {
    const answers = answeredHistory.filter((a) => a.quizId === quiz.id);
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const incorrectCount = answers.length - correctCount;
    const successRate = answers.length
      ? Math.round((correctCount / answers.length) * 100)
      : 0;
    return { quiz, answers, correctCount, incorrectCount, successRate };
  });
}

export const teamMembers: User[] = [
  currentUser,
  {
    id: "u-2",
    name: "Bianca Souza",
    email: "bianca.souza@codequest.dev",
    role: "admin",
    level: 18,
    xp: 6120,
    streakDays: 14,
    createdAt: "2024-08-20T10:00:00.000Z",
  },
  {
    id: "u-3",
    name: "Diego Fernandes",
    email: "diego.fernandes@codequest.dev",
    role: "member",
    level: 7,
    xp: 1890,
    streakDays: 2,
    createdAt: "2025-01-05T10:00:00.000Z",
  },
  {
    id: "u-4",
    name: "Luiza Pontes",
    email: "luiza.pontes@codequest.dev",
    role: "member",
    level: 21,
    xp: 7840,
    streakDays: 31,
    createdAt: "2024-05-11T10:00:00.000Z",
  },
  {
    id: "u-5",
    name: "Marco Tulio",
    email: "marco.tulio@codequest.dev",
    role: "member",
    level: 3,
    xp: 520,
    streakDays: 0,
    createdAt: "2025-02-01T10:00:00.000Z",
  },
];
