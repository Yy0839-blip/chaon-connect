import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { Celebrate, type CelebrateData } from "@/components/chaon/Celebrate";
import { allBadges, missions } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "차온 미션 · 포인트 모으기 | 차온 CHAON" },
      {
        name: "description",
        content:
          "차오름에서 미션을 완료하고 차온 포인트와 배지를 모아요. 오늘의 미션과 도전 미션을 확인하세요.",
      },
      { property: "og:title", content: "차온 미션 · 포인트 모으기" },
      { property: "og:description", content: "미션 완료하고 포인트와 배지 모으기." },
    ],
  }),
  component: Missions,
});

function Missions() {
  const { doneMissions, points, badges, completeMission } = useChaon();
  const [celebrate, setCelebrate] = useState<CelebrateData | null>(null);
  const daily = missions.filter((m) => m.daily);
  const challenge = missions.filter((m) => !m.daily);

  const List = ({ items }: { items: typeof missions }) => (
    <div className="space-y-2.5">
      {items.map((m) => {
        const done = doneMissions.includes(m.id);
        return (
          <div key={m.id} className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-muted text-2xl">
              {m.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-base leading-tight">{m.title}</span>
              <span className="block text-xs text-muted-foreground">{m.hint}</span>
              <span className="mt-1 inline-block text-[11px] font-bold text-primary">
                +{m.point} POINT
              </span>
            </span>
            <button
              type="button"
              disabled={done}
              onClick={() => {
                const res = completeMission(m.id);
                if (res) setCelebrate(res);
              }}
              className="tap shrink-0 rounded-2xl bg-lime px-3.5 py-2.5 text-xs font-bold text-lime-foreground disabled:opacity-40"
            >
              {done ? "완료" : "완료하기"}
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <AppShell>
      <Celebrate data={celebrate} onClose={() => setCelebrate(null)} />
      <PageTitle
        kicker="CHAON MISSION"
        title="미션 깨고 포인트 모으기"
        sub="차오름에서 하나씩 도전해봐"
      />

      <div className="rise mt-5 flex items-center justify-between rounded-3xl bg-night p-5 text-navy-foreground shadow-card">
        <span>
          <span className="block text-[11px] font-bold tracking-[0.22em] text-lime">MY POINT</span>
          <span className="block font-display text-3xl">{points}</span>
        </span>
        <span className="text-right text-xs text-navy-foreground/70">
          완료 {doneMissions.length} / {missions.length}
          <br />
          배지 {badges.length}개
        </span>
      </div>

      <h2 className="mb-3 mt-7 font-display text-xl">오늘의 미션</h2>
      <List items={daily} />

      <h2 className="mb-3 mt-7 font-display text-xl">도전 미션</h2>
      <List items={challenge} />

      <h2 className="mb-3 mt-7 font-display text-xl">배지 도감</h2>
      <div className="grid grid-cols-3 gap-2.5">
        {allBadges.map((b) => {
          const owned = badges.includes(b.id);
          return (
            <div
              key={b.id}
              className={`rounded-2xl p-3 text-center shadow-card ${owned ? "bg-sky text-sky-foreground" : "bg-card opacity-50"}`}
            >
              <div className="text-2xl">{b.emoji}</div>
              <p className="mt-1 text-[11px] font-bold">{b.id}</p>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
