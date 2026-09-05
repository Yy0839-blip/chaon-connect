import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Flame,
  Gamepad2,
  House,
  CircleCheckBig,
  UsersRound,
  UserRound,
} from "lucide-react";
import { useChaon } from "@/lib/chaon-store";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "홈", icon: House, exact: true },
  { to: "/spaces", label: "놀거리", icon: Gamepad2, exact: false },
  { to: "/missions", label: "미션", icon: CircleCheckBig, exact: false },
  { to: "/community", label: "같이 놀기", icon: UsersRound, exact: false },
  { to: "/profile", label: "나", icon: UserRound, exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { points, avatar, nickname } = useChaon();

  return (
    <div className="app-bg min-h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background/40 px-5 pb-32 pt-3 sm:shadow-[0_0_80px_-30px_oklch(0.26_0.055_265_/_0.5)]">
        <header className="sticky top-2 z-30 -mx-5 px-5 py-2.5">
          <div className="glass flex w-full items-center justify-between rounded-[24px] px-3 py-2.5">
            <Link to="/" className="tap flex min-w-0 items-center gap-2.5">
              <span className="bg-sunrise shine grid size-10 shrink-0 place-items-center rounded-[15px] font-display text-lg text-primary-foreground shadow-pop">차</span>
              <span className="min-w-0 leading-none"><span className="text-grad block font-display text-xl tracking-tight">차온</span><span className="mt-0.5 block truncate text-[9px] font-bold tracking-[0.24em] text-muted-foreground">대야동 · 차오름</span></span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <span className="bg-sunrise flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-pop" aria-label={`${points} 포인트`}><Flame className="size-3.5" aria-hidden="true" />{points}</span>
              <Link to="/profile" className="tap grid size-10 place-items-center rounded-full bg-sky/65 text-lg ring-2 ring-white/70" aria-label={nickname || "내 프로필"}>{avatar}</Link>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-40" aria-label="주요 메뉴">
          <div className="mx-auto w-full max-w-[430px] px-5 pb-[max(12px,env(safe-area-inset-bottom))]">
            <div className="glass grid grid-cols-5 rounded-[28px] p-1.5">
              {tabs.map((t) => {
                const Icon = t.icon;
                return <Link key={t.to} to={t.to} activeOptions={{ exact: t.exact }} className="tap group flex min-w-0 flex-col items-center gap-0.5 rounded-[20px] py-1.5">
                  {({ isActive }) => <><span className={cn("grid size-8 place-items-center rounded-[14px] transition-all duration-200", isActive ? "bg-primary text-primary-foreground shadow-pop" : "text-muted-foreground group-hover:bg-white/50")} aria-hidden="true"><Icon className={cn("size-[19px] stroke-[2.25] transition-transform duration-200", isActive && "scale-105")} /></span><span className={cn("truncate text-[10px] font-bold", isActive ? "text-foreground" : "text-muted-foreground")}>{t.label}</span></>}
                </Link>;
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function PageTitle({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return <div className="rise pt-5">{kicker ? <p className="text-[11px] font-bold tracking-[0.22em] text-muted-foreground">{kicker}</p> : null}<h1 className="mt-1 font-display text-3xl leading-tight tracking-tight">{title}</h1>{sub ? <p className="mt-1.5 text-sm text-muted-foreground">{sub}</p> : null}</div>;
}
