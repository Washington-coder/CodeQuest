"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

export const passwordRules: PasswordRule[] = [
  { label: "Mínimo de 8 caracteres", test: (v) => v.length >= 8 },
  { label: "Pelo menos 1 número", test: (v) => /\d/.test(v) },
  { label: "Pelo menos 1 caractere especial", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export function passwordIsValid(value: string) {
  return passwordRules.every((rule) => rule.test(value));
}

export function PasswordStrength({ value }: { value: string }) {
  return (
    <ul className="mt-2 space-y-1">
      {passwordRules.map((rule) => {
        const passed = rule.test(value);
        return (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              passed ? "text-accent" : "text-muted-foreground"
            )}
          >
            {passed ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
