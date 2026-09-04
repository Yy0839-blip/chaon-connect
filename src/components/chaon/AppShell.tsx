import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Flame } from "lucide-react";
import { useChaon } from "@/lib/chaon-store";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "홈", icon: "🏠", exact: true },
  { to: "/spaces", label: "공간", icon: "🚪", exact: false },
  { to: "/missions", label: "미션", icon: "🎯", exact: false },
  { to: "/community", label: "커뮤니티", icon: "💬", exact: false },
  { to: "/profile", label: "프로필", icon: "🙂", exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { points, avatar, nickname } = useChaon();

  return (
    <div className="app-bg min-h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background/40 px-5 pb-32 pt-4 sm:shadow-[0_0_80px_-30px_oklch(0.26_0.055_265_/_0.5)]">
        <header className="sticky top-0 z-30 -mx-5 flex items-center justify-between bg-background/80 px-5 py-2.5 backdrop-blur-xl">
          <Link to="/" className="tap flex items-center gap-2">
            <span className="bg-sunrise grid size-9 -rotate-3 place-items-center rounded-xl font-display text-base text-primary-foreground shadow-pop">
              차
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg tracking-tight">차온</span>
              <span className="block text-[9px] font-bold tracking-[0.28em] text-muted-foreground">CHAON</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-card px-2.5 py-1.5 text-xs font-bold shadow-card">
              <Flame className="size-3.5 text-primary" />
              {points}
            </span>
            <Link
              to="/profile"
              className="tap grid size-9 place-items-center rounded-full bg-sky/60 text-base"
              aria-label={nickname || "프로필"}
            >
              {avatar}
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-40">
          <div className="mx-auto w-full max-w-[430px] px-5 pb-4">
            <div className="grid grid-cols-5 rounded-3xl border border-border/60 bg-card/90 py-2 shadow-card backdrop-blur-xl">
              {tabs.map((t) => (
                <Link
                  key={t.to}
                  to={t.to}
                  activeOptions={{ exact: t.exact }}
                  className="tap group flex flex-col items-center gap-1 py-1"
                >
                  {({ isActive }) => (
                    <>
                      <span className={cn("text-lg transition-transform", isActive && "scale-110")}>{t.icon}</span>
                      <span
                        className={cn(
                          "text-[10px] font-bold",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {t.label}
                      </span>
                    </>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function PageTitle({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="rise pt-5">
      {kicker ? (
        <p className="text-[11px] font-bold tracking-[0.22em] text-muted-foreground">{kicker}</p>
      ) : null}
      <h1 className="mt-1 font-display text-3xl leading-tight tracking-tight">{title}</h1>
      {sub ? <p className="mt-1.5 text-sm text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
