"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-6">
      <Link href="/practice" className="flex items-center gap-2 px-2 pt-1" onClick={onNavigate}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
          <Terminal className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          Code<span className="text-gradient">Quest</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/15"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "relative z-10",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="relative z-10 ml-auto rounded-full bg-accent/20 px-2 py-0.5 font-display text-[10px] uppercase tracking-wide text-accent-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-4">
        <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">
          Ofensiva
        </p>
        <p className="mt-1 text-2xl font-semibold">
          6 <span className="text-sm font-normal text-muted-foreground">dias seguidos 🔥</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Continue praticando hoje para manter sua sequência.
        </p>
      </div>
    </div>
  );
}
