import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/chaon/AppShell";
import { ApplyButton } from "@/components/chaon/ApplyButton";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import type { EventDetail as EventDetailData } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";

const tone = {
  lime: "bg-limeGrad text-lime-foreground",
  sky: "bg-sky text-sky-foreground",
  navy: "bg-night text-navy-foreground",
} as const;

export function EventDetailPage({ event }: { event: EventDetailData }) {
  const { joinedEvents, toggleEvent } = useChaon();
  const joined = joinedEvents.includes(event.id);

  return (
    <AppShell>
      <Link
        to="/events"
        className="tap mt-3 inline-flex min-h-[44px] items-center gap-1 rounded-2xl px-1 text-sm font-bold text-muted-foreground"
      >
        <ChevronLeft className="size-4" />
        연말 이벤트
      </Link>

      <header className={`rise mt-2 rounded-3xl p-5 shadow-card ${tone[event.tone]}`}>
        <p className="text-[11px] font-bold tracking-[0.22em] opacity-70">2026 CHAON YEAR-END</p>
        <h1 className="mt-1.5 font-display text-3xl leading-tight">
          {event.emoji} {event.name}
        </h1>
        <p className="mt-1 font-display text-lg opacity-90">{event.headline}</p>
        <p className="mt-2 text-sm opacity-80">{event.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {event.facts.map((f) => (
            <span key={f} className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold">
              {f}
            </span>
          ))}
        </div>
      </header>

      <section className="mt-4 grid grid-cols-1 gap-2 xs:grid-cols-2">
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">언제</p>
          <p className="mt-1 text-sm font-bold">{event.when}</p>
        </div>
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <p className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">어디서</p>
          <p className="mt-1 text-sm font-bold">{event.where}</p>
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-card">
        <h2 className="font-display text-xl">이렇게 참여해</h2>
        <ol className="mt-3 space-y-2.5">
          {event.steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3">
              <span className="bg-sunrise grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-sm">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-4 rounded-3xl bg-card p-4 shadow-card">
        <p className="mb-3 text-center text-xs font-bold text-muted-foreground">
          신청하면 참여 확정, 당일 출석하면 +{event.point} CHAON POINT
        </p>
        <ApplyButton joined={joined} onToggle={() => toggleEvent(event.id)} />
      </div>

      <div className="mt-3">
        <ShareCTA
          label="친구랑 같이 신청하기"
          message={`차오름 ${event.name} 같이 나갈래? ${event.headline}`}
          tone="navy"
        />
      </div>
    </AppShell>
  );
}
