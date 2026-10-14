import type { LucideIcon } from "lucide-react";
import { BarChart3, FileText, Home, ListChecks, Sparkles, Users } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const navItems: NavItem[] = [
  { href: "/practice", label: "Praticar", icon: Home },
  { href: "/quizzes/new", label: "Criar Quiz", icon: Sparkles, badge: "novo" },
  { href: "/history", label: "Histórico", icon: BarChart3 },
  { href: "/users", label: "Usuários", icon: Users },
  { href: "/report", label: "Relatório", icon: FileText },
];

export { ListChecks };
