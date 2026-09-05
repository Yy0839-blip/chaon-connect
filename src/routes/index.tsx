import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/chaon/AppShell";
import { Celebrate, type CelebrateData } from "@/components/chaon/Celebrate";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { missions, recommendations, spaces } from "@/data/chaon";
import { localEvents, nearbyYouthFacilities } from "@/data/localEvents";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "차온 CHAON — 오늘 뭐 하지?" },
      { name: "description", content: "대야동 청소년이 오늘 할 일을 고르고, 친구와 약속을 만드는 차온." },
      { property: "og:title", content: "차온 CHAON — 오늘 뭐 하지?" },
      { property: "og:description", content: "오늘 뭐 할지 고르고, 같이 놀 친구를 만나보세요." },
    ],
  }),
  component: Home,
});

const toneClass = {
  primary: "bg-primary text-primary-foreground",
  lime: "bg-lime text-lime-foreground",
  sky: "bg-sky text-sky-foreground",
} as const;

type ChaonStatus = { isOpen: boolean; label: string; hours: string };

function getChaonStatus(): ChaonStatus {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (day === 0 || day === 1) return { isOpen: false, label: "차오름 휴무", hours: "오늘은 쉬는 날" };
  if (day >= 2 && day <= 5) {
    const isOpen = minutes >= 900 && minutes < 1200;
    return { isOpen, label: isOpen ? "지금 OPEN" : "지금 CLOSED", hours: "화–금 15:00–20:00" };
  }
  const isOpen = minutes >= 600 && minutes < 1080;
  return { isOpen, label: isOpen ? "지금 OPEN" : "지금 CLOSED", hours: "토 10:00–18:00" };
}

function Home() {
  const { nickname, doneMissions, completeMission, meetups } = useChaon();
  const [celebrate, setCelebrate] = useState<CelebrateData | null>(null);
  const [chaonStatus, setChaonStatus] = useState<ChaonStatus>(() => getChaonStatus());

  useEffect(() => {
    const updateStatus = () => setChaonStatus(getChaonStatus());
    updateStatus();
    const interval = window.setInterval(updateStatus, 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const todayMission = missions.find((m) => !doneMissions.includes(m.id)) ?? missions[0]!;
  const missionDone = doneMissions.includes(todayMission.id);
  const openSpaces = chaonStatus.isOpen ? spaces.filter((s) => s.open) : [];

  return (
    <AppShell>
      <Celebrate data={celebrate} onClose={() => setCelebrate(null)} />

      <section className="rise relative overflow-hidden pt-5">
        <div className="absolute -right-7 -top-8 size-28 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute right-4 top-2 text-4xl" aria-hidden="true">🐿️</div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">대야동 청소년 공간 · 차오름</p>
        <h1 className="mt-3 whitespace-nowrap font-display text-[2.1rem] leading-none tracking-tight sm:text-[2.7rem]">
          {nickname ? `${nickname}아, ` : ""}오늘 뭐 <span className="text-grad">하지?</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">하고 싶은 걸 고르고, 친구와 바로 약속해요.</p>
      </section>

      <section className="rise mt-5 rounded-[28px] bg-night p-4 text-navy-foreground shadow-card ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className={`size-2.5 rounded-full ${chaonStatus.isOpen ? "bg-lime" : "bg-red-400"}`} />
            <span className="font-display text-base">{chaonStatus.label}</span>
          </div>
          <span className="text-right text-[11px] font-bold text-navy-foreground/55">{chaonStatus.hours}</span>
        </div>
        {chaonStatus.isOpen ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {openSpaces.slice(0, 4).map((s) => (
              <Link key={s.id} to="/spaces/$spaceId" params={{ spaceId: s.id }} className="tap flex min-h-11 items-center justify-between rounded-2xl bg-white/10 px-3 text-xs font-bold">
                {s.name}<span className="size-1.5 rounded-full bg-lime" />
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

      <section className="mt-8 rounded-[28px] bg-primary p-5 text-primary-foreground shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-primary-foreground/65">MEET UP</p>
            <h2 className="mt-1 font-display text-2xl leading-tight">오늘 같이 놀 사람?</h2>
            <p className="mt-1.5 text-xs text-primary-foreground/70">보드게임, 춤, 영화… 하고 싶은 걸 약속으로 만들어보세요.</p>
          </div>
          <UsersRound size={28} strokeWidth={2.1} />
        </div>

        {meetups.length ? (
          <div className="mt-4 space-y-2">
            {meetups.slice(0, 2).map((m) => (
              <div key={m.id} className="rounded-2xl bg-white/12 p-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{m.avatar}</span>
                  <p className="min-w-0 flex-1 truncate font-display text-base">{m.title}</p>
                  <span className="text-[11px] font-bold">{m.joinedPeople}/{m.maxPeople}</span>
                </div>
                <p className="mt-1 text-[11px] text-primary-foreground/65">{m.date} · {m.time} · {m.place}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-white/12 px-3 py-3 text-xs font-bold text-primary-foreground/75">아직 약속이 없어요. 네가 첫 약속을 만들어봐!</div>
        )}

        <Link to="/community" className="tap mt-3 flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white font-display text-sm text-primary">
          약속 추가하기 <ArrowRight size={16} />
        </Link>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <div><p className="text-[10px] font-bold tracking-[0.18em] text-primary">PICK FOR YOU</p><h2 className="mt-0.5 font-display text-xl">오늘은 이거 어때?</h2></div>
          <Link to="/spaces" className="text-xs font-bold text-primary">더 보기 →</Link>
        </div>
        <div className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recommendations.map((r) => (
            <Link key={r.id} to="/spaces/$spaceId" params={{ spaceId: r.spaceId }} className={`tap min-w-[210px] snap-start rounded-[26px] p-4 shadow-card ${toneClass[r.tone]}`}>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/25 text-2xl" aria-hidden="true">{r.emoji}</span>
              <span className="mt-4 block font-display text-lg leading-tight">{r.title}</span>
              <span className="mt-1 block text-xs opacity-70">{r.sub}</span>
              <span className="mt-4 flex items-center gap-1 text-xs font-bold">사진·정보 보기 <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[28px] bg-night p-5 text-navy-foreground shadow-card">
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-bold tracking-[0.18em] text-lime">TODAY MISSION</p><p className="mt-1 font-display text-xl">오늘의 차온 미션</p></div>
          <span className="rounded-full bg-lime/15 px-2.5 py-1 font-display text-xs text-lime">+{todayMission.point}P</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white/7 p-4">
          <p className="font-display text-lg">{todayMission.emoji} {todayMission.title}</p>
          <p className="mt-1 text-xs text-navy-foreground/60">{todayMission.hint}</p>
        </div>
        <div className="mt-3 flex gap-2">
          <button type="button" disabled={missionDone} onClick={() => { const res = completeMission(todayMission.id); if (res) setCelebrate(res); }} className="tap min-h-11 flex-1 rounded-2xl bg-lime py-3 font-display text-base text-lime-foreground disabled:opacity-50">
            {missionDone ? "완료했어!" : "완료하기"}
          </button>
          <Link to="/missions" className="tap grid min-h-11 place-items-center rounded-2xl bg-white/10 px-4 text-xs font-bold">전체 미션</Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3"><p className="text-[10px] font-bold tracking-[0.18em] text-primary">NEARBY YOUTH</p><h2 className="mt-0.5 font-display text-xl">주변 청소년 시설</h2></div>
        <div className="space-y-2.5">
          {nearbyYouthFacilities.map((facility) => (
            <a key={facility.id} href={facility.sourceUrl} target="_blank" rel="noreferrer" className="tap flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><MapPin size={19} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base">{facility.name}</span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">{facility.distanceLabel} · {facility.address}</span>
              </span>
              <ArrowRight size={16} className="shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <div><p className="text-[10px] font-bold tracking-[0.18em] text-primary">REAL LOCAL EVENTS</p><h2 className="mt-0.5 font-display text-xl">이번 달 · 다음 달</h2></div>
          <span className="text-[10px] font-bold text-muted-foreground">공식 확인 일정</span>
        </div>
        <div className="space-y-3">
          {localEvents.map((event) => (
            <a key={event.id} href={event.sourceUrl} target="_blank" rel="noreferrer" className="tap block rounded-3xl bg-card p-4 shadow-card">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><CalendarDays size={19} /></span>
                <span className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full bg-secondary px-2 py-1 text-[10px] font-bold text-primary">{event.month}</span>
                  <span className="mt-1 block font-display text-lg leading-tight">{event.title}</span>
                  <span className="mt-1 block text-xs font-bold text-muted-foreground">{event.date}{event.time ? ` · ${event.time}` : ""}</span>
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{event.description}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-bold">
                <span className="text-muted-foreground">{event.place} · {event.audience}</span>
                <span className="text-primary">공식 안내 →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 pb-2">
        <div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-bold tracking-[0.18em] text-primary">TOGETHER</p><h2 className="mt-0.5 font-display text-xl">친구들이 만든 약속</h2></div><Link to="/community" className="text-xs font-bold text-primary">전체 보기 →</Link></div>
        <Link to="/community" className="tap flex items-center gap-3 rounded-[26px] bg-secondary p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-card text-primary"><UsersRound size={19} /></span>
          <span className="min-w-0 flex-1"><span className="block font-display text-base">같이 놀고 싶다면 먼저 약속을 만들어봐</span><span className="mt-0.5 block text-xs text-muted-foreground">친구가 들어오면 인원이 바로 보여요.</span></span>
          <ArrowRight size={17} className="shrink-0" />
        </Link>
      </section>
    </AppShell>
  );
}
