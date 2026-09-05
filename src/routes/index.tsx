import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gamepad2, UsersRound } from "lucide-react";
import { AppShell } from "@/components/chaon/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "차온 CHAON — 오늘 뭐 하지?" },
      { name: "description", content: "대야동 청소년이 오늘 할 일을 고르고, 친구와 약속을 만드는 차온." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      <section className="rise relative overflow-hidden pt-5 pb-2">
        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative max-w-[330px]">
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">대야동 청소년 공간 · 차오름</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,9vw,2.7rem)] font-bold leading-[1.08] tracking-[-0.04em]">
            오늘 뭐 <span className="text-grad">하지?</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">하고 싶은 걸 고르고, 친구와 바로 약속해요.</p>
        </div>
      </section>

      <section className="mt-5 rounded-[28px] bg-primary p-5 text-primary-foreground shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-primary-foreground/65">오늘의 약속</p>
            <h2 className="mt-1 font-display text-2xl leading-tight">오늘 같이 놀 사람?</h2>
            <p className="mt-1.5 text-xs text-primary-foreground/70">보드게임, 춤, 영화… 하고 싶은 걸 약속으로 만들어보세요.</p>
          </div>
          <UsersRound size={28} strokeWidth={2.1} />
        </div>
        <Link to="/community" className="tap mt-4 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white font-display text-sm text-primary">
          약속 만들기 <ArrowRight size={16} />
        </Link>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/spaces" className="tap rounded-[24px] bg-card p-4 shadow-card">
          <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary"><Gamepad2 size={20} /></span>
          <span className="mt-3 block font-display text-lg">놀거리</span>
          <span className="mt-1 block text-xs text-muted-foreground">뭐 하고 놀지 골라봐</span>
          <span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">둘러보기 <ArrowRight size={14} /></span>
        </Link>
        <Link to="/missions" className="tap rounded-[24px] bg-card p-4 shadow-card">
          <span className="grid size-11 place-items-center rounded-2xl bg-lime/20 text-primary">+P</span>
          <span className="mt-3 block font-display text-lg">오늘의 미션</span>
          <span className="mt-1 block text-xs text-muted-foreground">재미있게 포인트 모으기</span>
          <span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">확인하기 <ArrowRight size={14} /></span>
        </Link>
      </section>

      <Link to="/music" className="tap mt-4 flex items-center gap-3 rounded-[22px] bg-card p-4 shadow-card">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">♫</span>
        <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold text-primary">오늘의 음악</span><span className="mt-0.5 block font-display text-base">오늘 들을 노래 골라보기</span></span>
        <ArrowRight size={17} className="shrink-0 text-muted-foreground" />
      </Link>
    </AppShell>
  );
}
