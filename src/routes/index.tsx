import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Gamepad2, MapPin, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "@/components/chaon/AppShell";
import { localEvents, nearbyYouthFacilities } from "@/data/localEvents";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "차온 CHAON — 오늘 뭐 하지?" },
    { name: "description", content: "대야동 청소년이 차오름의 놀거리, 프로그램과 시흥 청소년 정보를 한곳에서 만나는 차온." },
  ] }),
  component: Home,
});

function Home() {
  const { nickname, avatar, profileTags, points } = useChaon();
  const featuredEvents = localEvents.slice(0, 3);
  const featuredFacilities = nearbyYouthFacilities.slice(0, 3);

  return (
    <AppShell>
      <section className="rise relative overflow-hidden pt-5 pb-1">
        <div className="absolute -right-10 -top-8 size-36 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">대야동 청소년 공간 · 차오름</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div><h1 className="font-display text-[clamp(2rem,9vw,2.7rem)] font-bold leading-[1.08] tracking-[-0.04em]">오늘 뭐 <span className="text-grad">하지?</span></h1><p className="mt-2 text-sm text-muted-foreground">차오름에서 놀거리 찾고, 친구와 같이 놀아봐요.</p></div>
            <Link to="/profile" className="tap grid size-14 shrink-0 place-items-center overflow-hidden rounded-[20px] bg-secondary text-2xl shadow-card" aria-label="내 프로필">{avatar.startsWith("data:image/") ? <img src={avatar} alt="내 프로필" className="size-full object-cover" /> : avatar}</Link>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[28px] bg-primary p-5 text-primary-foreground shadow-card">
        <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.18em] text-primary-foreground/65">COME & PLAY</p><h2 className="mt-1 font-display text-2xl leading-tight">차오름에서 뭐 할까?</h2><p className="mt-1.5 text-xs text-primary-foreground/70">댄스 · 보드게임 · 영화 · 친구와 약속까지</p></div><Gamepad2 size={28} /></div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to="/spaces" className="tap flex min-h-12 items-center justify-center gap-1 rounded-2xl bg-white font-display text-sm text-primary">놀거리 보기 <ArrowRight size={15} /></Link>
          <Link to="/meetup" className="tap flex min-h-12 items-center justify-center gap-1 rounded-2xl bg-white/15 font-display text-sm text-primary-foreground">약속 만들기 <UsersRound size={15} /></Link>
        </div>
      </section>

      <section className="mt-3 rounded-[28px] bg-card p-4 shadow-card">
        <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.16em] text-primary">THIS IS ME</p><h2 className="mt-1 font-display text-xl">{nickname || "나를 표현해볼까요?"}</h2></div><span className="rounded-full bg-lime/25 px-2.5 py-1 text-[10px] font-bold text-primary">{points}P</span></div>
        <div className="mt-3 flex flex-wrap gap-2">{(profileTags.length ? profileTags : ["내가 좋아하는 것 고르기"]).slice(0, 4).map((tag) => <span key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary">{tag}</span>)}</div>
        <Link to="/profile" className="tap mt-3 flex min-h-10 items-center justify-center gap-1 rounded-2xl bg-muted text-xs font-bold">나 꾸미기 <ArrowRight size={14} /></Link>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/missions" className="tap rounded-[24px] bg-card p-4 shadow-card"><span className="grid size-11 place-items-center rounded-2xl bg-lime/20 text-primary">+P</span><span className="mt-3 block font-display text-lg">오늘의 미션</span><span className="mt-1 block text-xs text-muted-foreground">가볍게 하고 포인트 받기</span><span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">도전하기 <ArrowRight size={14} /></span></Link>
        <Link to="/music" className="tap rounded-[24px] bg-card p-4 shadow-card"><span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary">♫</span><span className="mt-3 block font-display text-lg">오늘의 음악</span><span className="mt-1 block text-xs text-muted-foreground">친구들과 같이 골라요</span><span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">투표하기 <ArrowRight size={14} /></span></Link>
      </section>

      <section className="mt-7 rounded-[28px] bg-card p-4 shadow-card">
        <div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.16em] text-primary">LOCAL INFO</p><h2 className="mt-1 font-display text-xl">이번 주 청소년 정보</h2></div><Link to="/programs/nearby" className="tap text-xs font-bold text-primary">더 보기 →</Link></div>
        <p className="mt-1 text-xs text-muted-foreground">시흥에서 열리는 행사와 청소년 시설을 한곳에서 확인해요.</p>
        <div className="mt-4 space-y-2.5">{featuredEvents.map((event) => <a key={event.id} href={event.sourceUrl} target="_blank" rel="noreferrer" className="tap block rounded-2xl bg-secondary/60 p-3.5"><div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary"><CalendarDays size={18} /></span><span className="min-w-0 flex-1"><span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{event.month}</span><span className="mt-1 block font-display text-base leading-tight">{event.title}</span><span className="mt-1 block text-[11px] text-muted-foreground">{event.date} · {event.place}</span></span><ArrowRight size={16} className="mt-2 shrink-0 text-muted-foreground" /></div></a>)}</div>
        <div className="my-4 h-px bg-border" /><p className="text-xs font-bold">주변 청소년 시설</p><div className="mt-2 grid gap-2">{featuredFacilities.map((facility) => <a key={facility.id} href={facility.sourceUrl} target="_blank" rel="noreferrer" className="tap flex min-h-11 items-center gap-3 rounded-2xl bg-muted/60 px-3 py-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-primary"><MapPin size={17} /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{facility.name}</span><span className="block truncate text-[11px] text-muted-foreground">{facility.distanceLabel} · {facility.address}</span></span><ArrowRight size={15} className="shrink-0 text-muted-foreground" /></a>)}</div>
      </section>

      <div className="mt-3 rounded-[22px] bg-secondary p-4 shadow-card"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-primary"><Sparkles size={17} /></span><div><p className="font-display text-sm">차오름에서 같이 놀 친구를 찾아봐요</p><p className="mt-0.5 text-[11px] text-muted-foreground">QR로 친구에게 차온을 공유할 수도 있어요.</p></div></div></div>
    </AppShell>
  );
}
