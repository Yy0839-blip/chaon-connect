import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Gamepad2, MapPin, UsersRound } from "lucide-react";
import { AppShell } from "@/components/chaon/AppShell";
import { localEvents, nearbyYouthFacilities } from "@/data/localEvents";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "차온 CHAON — 오늘 뭐 하지?" },
      { name: "description", content: "대야동 청소년이 오늘 할 일을 고르고, 친구와 약속을 만들고, 시흥의 청소년 정보를 한곳에서 확인하는 차온." },
    ],
  }),
  component: Home,
});

function Home() {
  const featuredEvents = localEvents.slice(0, 3);
  const featuredFacilities = nearbyYouthFacilities.slice(0, 3);

  return (
    <AppShell>
      <section className="rise relative overflow-hidden pt-5 pb-2">
        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative max-w-[330px]">
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">대야동 청소년 공간 · 차오름</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,9vw,2.7rem)] font-bold leading-[1.08] tracking-[-0.04em]">
            오늘 뭐 <span className="text-grad">하지?</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">놀거리부터 시흥 청소년 정보까지 한곳에서 찾아봐요.</p>
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

      <section className="mt-7 rounded-[28px] bg-card p-4 shadow-card">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-primary">LOCAL INFO</p>
            <h2 className="mt-1 font-display text-xl">시흥 청소년 정보 모아보기</h2>
          </div>
          <Link to="/programs/nearby" className="tap text-xs font-bold text-primary">더 보기 →</Link>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">여러 기관의 공개 정보를 차온에서 보기 쉽게 모았어요.</p>

        <div className="mt-4 space-y-2.5">
          {featuredEvents.map((event) => (
            <a key={event.id} href={event.sourceUrl} target="_blank" rel="noreferrer" className="tap block rounded-2xl bg-secondary/60 p-3.5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary"><CalendarDays size={18} /></span>
                <span className="min-w-0 flex-1">
                  <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{event.month}</span>
                  <span className="mt-1 block font-display text-base leading-tight">{event.title}</span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">{event.date} · {event.place}</span>
                </span>
                <ArrowRight size={16} className="mt-2 shrink-0 text-muted-foreground" />
              </div>
            </a>
          ))}
        </div>

        <div className="my-4 h-px bg-border" />
        <p className="text-xs font-bold text-foreground">주변 청소년 시설</p>
        <div className="mt-2 grid gap-2">
          {featuredFacilities.map((facility) => (
            <a key={facility.id} href={facility.sourceUrl} target="_blank" rel="noreferrer" className="tap flex min-h-11 items-center gap-3 rounded-2xl bg-muted/60 px-3 py-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-primary"><MapPin size={17} /></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{facility.name}</span><span className="block truncate text-[11px] text-muted-foreground">{facility.distanceLabel} · {facility.address}</span></span>
              <ArrowRight size={15} className="shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      <Link to="/music" className="tap mt-4 flex items-center gap-3 rounded-[22px] bg-card p-4 shadow-card">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">♫</span>
        <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold text-primary">오늘의 음악</span><span className="mt-0.5 block font-display text-base">오늘 들을 노래 골라보기</span></span>
        <ArrowRight size={17} className="shrink-0 text-muted-foreground" />
      </Link>
    </AppShell>
  );
}
