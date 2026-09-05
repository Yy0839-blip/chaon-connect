import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/chaon/AppShell";
import { Celebrate, type CelebrateData } from "@/components/chaon/Celebrate";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { missions, recommendations, spaces, yearEnd } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "차온 CHAON — 오늘 뭐 하지?" },
      {
        name: "description",
        content:
          "시흥시 대야동 청소년 공간 차오름에서 오늘 할 수 있는 것. 추천 활동, 미션, 프로그램을 한 번에.",
      },
      { property: "og:title", content: "차온 CHAON — 오늘 뭐 하지?" },
      {
        property: "og:description",
        content: "차오름에서, 오늘을 더 재밌게. 청소년 공유공간 차오름 앱.",
      },
    ],
  }),
  component: Home,
});

const toneClass = {
  primary: "bg-sunrise text-primary-foreground",
  lime: "bg-lime text-lime-foreground",
  sky: "bg-sky text-sky-foreground",
} as const;

function Home() {
  const { nickname, doneMissions, completeMission } = useChaon();
  const [celebrate, setCelebrate] = useState<CelebrateData | null>(null);
  const todayMission = missions.find((m) => !doneMissions.includes(m.id)) ?? missions[0]!;
  const openSpaces = spaces.filter((s) => s.open);

  return (
    <AppShell>
      <Celebrate data={celebrate} onClose={() => setCelebrate(null)} />

      <section className="rise relative pt-6">
        <span className="float-slow absolute right-2 top-4 text-4xl">🛼</span>
        <p className="text-[11px] font-bold tracking-[0.24em] text-muted-foreground">
          대야동 차오름 · 주민센터 2층
        </p>
        <h1 className="mt-2 font-display text-[3.2rem] leading-[0.98] tracking-tight">
          오늘 뭐
          <br />
          <span className="text-grad">하지?</span>
        </h1>
        <p className="mt-2.5 text-sm text-muted-foreground">
          {nickname ? `${nickname}아, ` : ""}차오름에서 오늘을 더 재밌게 🎈
        </p>
      </section>

      <section className="rise mt-5 rounded-3xl bg-night p-4 text-navy-foreground shadow-card ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
            </span>
            <span className="font-display text-base">차오름 OPEN</span>
          </span>
          <span className="text-xs font-bold text-navy-foreground/60">21:30 마감</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {openSpaces.map((s) => (
            <Link
              key={s.id}
              to="/spaces"
              hash={s.id}
              className="tap flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5 text-xs font-bold"
            >
              {s.name}
              <span className="size-1.5 rounded-full bg-lime" />
            </Link>
          ))}
        </div>
        <div className="mt-3">
          <ShareCTA />
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl">오늘의 추천</h2>
          <Link to="/programs" className="text-xs font-bold text-primary">
            프로그램 보기 →
          </Link>
        </div>
        <div className="space-y-3">
          {recommendations.map((r) => (
            <Link
              key={r.id}
              to="/spaces"
              hash={r.spaceId}
              className={`tap flex items-center gap-3 rounded-3xl p-4 shadow-card ${toneClass[r.tone]}`}
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/25 text-3xl">
                {r.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg leading-tight">{r.title}</span>
                <span className="block text-xs opacity-75">{r.sub}</span>
              </span>
              <span className="shrink-0 text-lg">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-3xl bg-night p-5 text-navy-foreground shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.22em] text-lime">
            오늘의 차온 미션
          </span>
          <span className="font-display text-sm text-lime">+{todayMission.point} POINT</span>
        </div>
        <p className="mt-2 font-display text-xl leading-snug">
          {todayMission.emoji} {todayMission.title}
        </p>
        <p className="mt-1 text-xs text-navy-foreground/60">{todayMission.hint}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            disabled={doneMissions.includes(todayMission.id)}
            onClick={() => {
              const res = completeMission(todayMission.id);
              if (res) setCelebrate(res);
            }}
            className="tap flex-1 rounded-2xl bg-lime py-3.5 font-display text-base text-lime-foreground disabled:opacity-50"
          >
            {doneMissions.includes(todayMission.id) ? "완료했어!" : "완료하기"}
          </button>
          <Link
            to="/missions"
            className="tap grid place-items-center rounded-2xl bg-white/10 px-4 text-xs font-bold"
          >
            전체 미션
          </Link>
        </div>
      </section>

      <section className="mt-7">
        <Link
          to="/events"
          className="tap shine block rounded-3xl bg-limeGrad p-5 shadow-card glow-lime"
        >
          <p className="text-[11px] font-bold tracking-[0.22em] text-lime-foreground/70">
            {yearEnd.title}
          </p>
          <p className="mt-1.5 font-display text-2xl leading-tight text-lime-foreground">
            {yearEnd.slogan}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {yearEnd.items.map((i) => (
              <span
                key={i.id}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-lime-foreground"
              >
                {i.emoji} {i.name}
              </span>
            ))}
          </div>
          <p className="mt-4 font-display text-sm text-lime-foreground">연말 이벤트 보러가기 →</p>
        </Link>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl">지금 다들 뭐 해?</h2>
          <Link to="/community" className="text-xs font-bold text-primary">
            커뮤니티 →
          </Link>
        </div>
        <Link to="/community" className="tap block rounded-3xl bg-card p-4 shadow-card">
          <p className="text-sm">🎲 “오늘 친구들이랑 보드게임함, 마지막에 역전당해서 개억울”</p>
          <p className="mt-2 text-xs text-muted-foreground">달려라감자 · 12분 전 · ♥ 24</p>
        </Link>
      </section>
    </AppShell>
  );
}
