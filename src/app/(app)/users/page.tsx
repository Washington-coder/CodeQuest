import { Suspense } from "react";
import { Flame, Mail, Shield, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTeamMembers } from "@/lib/api";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Usuários
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Membros da sua equipe e o progresso de cada um no CodeQuest.
        </p>
      </div>

      <Suspense fallback={<UsersGridSkeleton />}>
        <UsersGrid />
      </Suspense>
    </div>
  );
}

function UsersGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-44 rounded-2xl" />
      ))}
    </div>
  );
}

async function UsersGrid() {
  const users = await getTeamMembers();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("");

          return (
            <Card key={user.id} className="glow-card border-border/70">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent font-display text-sm font-semibold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold">{user.name}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <Mail className="h-3 w-3 shrink-0" /> {user.email}
                    </p>
                  </div>
                  {user.role === "admin" && (
                    <Badge className="ml-auto shrink-0 rounded-full border-none bg-primary/15 text-primary">
                      <Shield className="h-3 w-3" /> Admin
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/70 bg-background p-3 text-center">
                  <div>
                    <p className="flex items-center justify-center gap-1 text-sm font-semibold">
                      <Trophy className="h-3.5 w-3.5 text-primary" /> {user.level}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Nível</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.xp.toLocaleString("pt-BR")}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">XP</p>
                  </div>
                  <div>
                    <p className="flex items-center justify-center gap-1 text-sm font-semibold">
                      <Flame className="h-3.5 w-3.5 text-warning-foreground" /> {user.streakDays}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}
