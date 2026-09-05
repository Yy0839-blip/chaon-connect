import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

type ChaonStatus = {
  isOpen: boolean;
  label: string;
  hours: string;
};

function getChaonStatus(): ChaonStatus {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0 || day === 1) {
    return { isOpen: false, label: "차오름 휴무", hours: "오늘은 쉬는 날" };
  }

  if (day >= 2 && day <= 5) {
    const open = 15 * 60;
    const close = 20 * 60;
    const isOpen = minutes >= open && minutes < close;
    return {
      isOpen,
      label: isOpen ? "지금 OPEN" : "지금 CLOSED",
      hours: "화–금 15:00–20:00",
    };
  }

  if (day === 6) {
    const open = 10 * 60;
    const close = 18 * 60;
    const isOpen = minutes >= open && minutes < close;
    return {
      isOpen,
      label: isOpen ? "지금 OPEN" : "지금 CLOSED",
      hours: "토 10:00–18:00",
    };
  }

  return { isOpen: false, label: "지금 CLOSED", hours: "" };
}

function Home() {
  const { nickname, doneMissions, completeMission } = useChaon();
  const [celebrate, setCelebrate] = useState<CelebrateData | null>(null);
  const [chaonStatus, setChaonStatus] = useState<ChaonStatus>(() => getChaonStatus());

  useEffect(() => {
    const updateStatus = () => setChaonStatus(getChaonStatus());
    updateStatus();
    const interval = window.setInterval(updateStatus, 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const todayMission = missions.find((m) => !doneMissions.includes(m.id)) ?? missions[0]!;
  const openSpaces = chaonStatus.isOpen ? spaces.filter((s) => s.open) : [];
  const missionDone = doneMissions.includes(todayMission.id);

  const quickActions = [
    { to: "/spaces", emoji: "🎮", title: "놀거리", sub: "지금 할 수 있는 것" },
    { to: "/programs", emoji: "📅", title: "프로그램", sub: "이번 달 뭐 있지?" },
    { to: "/missions", emoji: "⚡", title: "미션", sub: "+POINT 모으기" },
    { to: "/community", emoji: "💬", title: "친구들", sub: "같이 놀 사람" },
  ] as const;

  return (
    <AppShell>
      <Celebrate data={celebrate} onClose={() => setCelebrate(null)} />

      <section className="rise relative overflow-hidden pt-5">
        <div className="absolute -right-7 -top-8 size-28 rounded-full bg-sunrise/20 blur-2xl" />
        <div className="absolute right-5 top-7 text-3xl" aria-hidden="true">🐿️</div>

        <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">
          대야동 청소년 공간 · 차오름
        </p>
        <h1 className="mt-2 max-w-[290px] font-display text-[2.7rem] leading-[1.02] tracking-tight">
          {nickname ? `${nickname}아, ` : ""}오늘 뭐 <span className="text-grad">하지?</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          지금 바로 할 수 있는 것만 골라봤어요.
        </p>
      </section>

      <section className="rise mt-5 rounded-[28px] bg-night p-4 text-navy-foreground shadow-card ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
              {chaonStatus.isOpen && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
              )}
              <span className={`relative inline-flex size-2.5 rounded-full ${chaonStatus.isOpen ? "bg-lime" : "bg-red-400"}`} />
            </span>
            <span className="font-display text-base">{chaonStatus.label}</span>
          </div>
          <span className="text-right text-[11px] font-bold text-navy-foreground/55">{chaonStatus.hours}</span>
        </div>

        {chaonStatus.isOpen ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {openSpaces.slice(0, 4).map((s) => (
              <Link key={s.id} to="/spaces" hash={s.id} className="tap flex min-h-11 items-center justify-between rounded-2xl bg-white/10 px-3 text-xs font-bold">
                {s.name}
                <span className="size-1.5 rounded-full bg-lime" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-2xl bg-white/10 px-3 py-3 text-center text-xs font-bold text-navy-foreground/70">
            {chaonStatus.hours === "오늘은 쉬는 날" ? "오늘은 차오름이 쉬는 날이에요." : "지금은 운영시간이 아니에요."}
          </div>
        )}
        <div className="mt-3"><ShareCTA /></div>
      </section>

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-primary">QUICK START</p>
            <h2 className="mt-0.5 font-display text-xl">바로 가기</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`tap min-h-[112px] rounded-[26px] p-4 shadow-card transition-transform ${
                index === 0 ? "bg-sunrise text-primary-foreground" :
                index === 1 ? "bg-sky text-sky-foreground" :
                index === 2 ? "bg-lime text-lime-foreground" :
                "bg-card"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
              <span className="mt-3 block font-display text-lg">{item.title}</span>
              <span className="mt-0.5 block text-[11px] opacity-65">{item.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-primary">PICK FOR YOU</p>
            <h2 className="mt-0.5 font-display text-xl">오늘은 이거 어때?</h2>
          </div>
          <Link to="/programs" className="text-xs font-bold text-primary">더 보기 →</Link>
        </div>

        <div className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recommendations.map((r) => (
            <Link
              key={r.id}
              to="/spaces"
              hash={r.spaceId}
              className={`tap min-w-[210px] snap-start rounded-[26px] p-4 shadow-card ${toneClass[r.tone]}`}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white/25 text-2xl" aria-hidden="true">{r.emoji}</span>
              <span className="mt-4 block font-display text-lg leading-tight">{r.title}</span>
              <span className="mt-1 block text-xs opacity-70">{r.sub}</span>
              <span className="mt-4 block text-xs font-bold">바로 보기 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[28px] bg-night p-5 text-navy-foreground shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-lime">TODAY MISSION</p>
            <p className="mt-1 font-display text-xl">오늘의 차온 미션</p>
          </div>
          <span className="rounded-full bg-lime/15 px-2.5 py-1 font-display text-xs text-lime">+{todayMission.point}P</span>
        </div>

        <div className="mt-4 rounded-2xl bg-white/7 p-4">
          <p className="font-display text-lg">{todayMission.emoji} {todayMission.title}</p>
          <p className="mt-1 text-xs text-navy-foreground/60">{todayMission.hint}</p>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={missionDone}
            onClick={() => {
              const res = completeMission(todayMission.id);
              if (res) setCelebrate(res);
            }}
            className="tap min-h-11 flex-1 rounded-2xl bg-lime py-3 font-display text-base text-lime-foreground disabled:opacity-50"
          >
            {missionDone ? "완료했어!" : "완료하기"}
          </button>
          <Link to="/missions" className="tap grid min-h-11 place-items-center rounded-2xl bg-white/10 px-4 text-xs font-bold">전체 미션</Link>
        </div>
      </section>

      <section className="mt-8">
        <Link to="/events" className="tap shine block rounded-[28px] bg-limeGrad p-5 shadow-card glow-lime">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-lime-foreground/65">COMING UP</p>
              <p className="mt-1 font-display text-2xl leading-tight text-lime-foreground">{yearEnd.slogan}</p>
            </div>
            <span className="text-2xl" aria-hidden="true">🎉</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {yearEnd.items.map((i) => (
              <span key={i.id} className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-lime-foreground">{i.emoji} {i.name}</span>
            ))}
          </div>
          <p className="mt-4 font-display text-sm text-lime-foreground">이벤트 자세히 보기 →</p>
        </Link>
      </section>

      <section className="mt-8 pb-2">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-primary">COMMUNITY</p>
            <h2 className="mt-0.5 font-display text-xl">친구들은 지금</h2>
          </div>
          <Link to="/community" className="text-xs font-bold text-primary">전체 보기 →</Link>
        </div>
        <Link to="/community" className="tap block rounded-[26px] bg-card p-4 shadow-card">
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky text-lg" aria-hidden="true">🥔</span>
            <div className="min-w-0">
              <p className="text-sm leading-relaxed">“오늘 친구들이랑 보드게임함, 마지막에 역전당해서 개억울”</p>
              <p className="mt-2 text-[11px] text-muted-foreground">달려라감자 · 12분 전 · ♥ 24</p>
            </div>
          </div>
        </Link>
      </section>
    </AppShell>
  );
}
