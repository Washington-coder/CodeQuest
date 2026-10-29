// Cliente HTTP (axios) do CodeQuest.
// Configure NEXT_PUBLIC_API_URL no .env.local para apontar ao backend.
// Ex.: NEXT_PUBLIC_API_URL=https://api.codequest.app

import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});
