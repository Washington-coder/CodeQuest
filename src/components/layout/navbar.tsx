"use client";

import { usePathname } from "next/navigation";
import { Menu, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "./back-button";
import { SidebarContent } from "./sidebar-content";
import { navItems } from "./nav-items";
import { currentUser } from "@/lib/mock-data";

const titleByPath: Record<string, string> = {
  "/practice": "Praticar",
  "/quizzes/new": "Criar Quiz",
  "/history": "Histórico",
  "/users": "Usuários",
  "/report": "Relatório",
};

function getTitle(pathname: string) {
  const match = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );
  return match ? titleByPath[match.href] ?? match.label : "CodeQuest";
}

export function Navbar() {
  const pathname = usePathname();
  const title = getTitle(pathname);
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/80 bg-background/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full lg:hidden" />
          }
        >
          <Menu className="h-4 w-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-r border-border/80 bg-sidebar p-4">
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <BackButton />

      <div className="flex flex-col leading-tight">
        <h1 className="font-display text-base font-semibold sm:text-lg">{title}</h1>
        <p className="hidden text-xs text-muted-foreground sm:block">
          codequest.dev / {pathname.replace(/^\//, "") || "practice"}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Badge
          variant="secondary"
          className="hidden items-center gap-1 rounded-full border-none bg-warning/15 text-warning-foreground sm:flex"
        >
          <Flame className="h-3.5 w-3.5 text-warning-foreground" />
          {currentUser.streakDays} dias
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 rounded-full border border-border/80 bg-card py-1 pl-1 pr-3 transition-colors hover:bg-muted" />
            }
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-[11px] font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline">
              Nível {currentUser.level}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs font-normal text-muted-foreground">
                {currentUser.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Meu perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferências</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
