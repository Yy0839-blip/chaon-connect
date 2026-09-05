import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { localEvents } from "@/data/localEvents";

export const Route = createFileRoute("/programs/nearby")({
  head: () => ({ meta: [{ title: "주변 청소년 프로그램 · 차온" }, { name: "description", content: "시흥 지역에서 현재 확인되는 실제 청소년 프로그램과 행사를 모아 보여줘요." }] }),
  component: NearbyPrograms,
});

function NearbyPrograms() {
  return <AppShell>
    <Link to="/programs" className="tap inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-muted-foreground"><ArrowLeft size={17} /> 프로그램</Link>
    <PageTitle kicker="NEARBY YOUTH" title="주변 청소년 프로그램" sub="시흥 지역 공식 안내에서 확인한 실제 일정만 모았어요." />
    <div className="mt-5 space-y-3">{localEvents.map((event) => <a key={event.id} href={event.sourceUrl} target="_blank" rel="noreferrer" className="tap block rounded-3xl bg-card p-4 shadow-card"><div className="flex items-start gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><CalendarDays size={19} /></span><div className="min-w-0 flex-1"><span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">{event.month}</span><h2 className="mt-1 font-display text-lg leading-tight">{event.title}</h2><p className="mt-1 text-xs font-bold text-muted-foreground">{event.date}{event.time ? ` · ${event.time}` : ""}</p></div></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{event.description}</p><div className="mt-3 flex items-start gap-1.5 text-[11px] font-bold text-muted-foreground"><MapPin size={14} className="mt-0.5 shrink-0" />{event.place}</div><p className="mt-2 text-[11px] font-bold text-primary">대상: {event.audience} · 공식 안내 보기 →</p></a>)}</div>
    <p className="mt-4 pb-3 text-center text-[10px] leading-relaxed text-muted-foreground">일정은 기관 사정에 따라 변경될 수 있어요. 신청 전 공식 안내를 확인해 주세요.</p>
  </AppShell>;
}
