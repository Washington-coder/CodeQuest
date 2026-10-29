// Schemas de validação (Zod) do CodeQuest.
// O schema é a fonte da verdade: o tipo é derivado dele via z.infer, evitando
// duplicação entre a definição de runtime e a de tipos.

import { z } from "zod";

export const onboardingPreferencesSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  focus: z.array(z.enum(["frontend", "backend", "fullstack", "data"])),
  interfaceLanguage: z.enum(["pt-BR", "en-US", "es-ES"]),
});

export type OnboardingPreferences = z.infer<typeof onboardingPreferencesSchema>;
