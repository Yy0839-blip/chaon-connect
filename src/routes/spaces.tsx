import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarPlus } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { spaces } from "@/data/chaon";

export const Route = createFileRoute("/spaces")({
  head: () => ({ meta: [
    { title: "놀거리 둘러보기 · 차오름 | 차온 CHAON" },
    { name: "description", content: "차오름에서 친구들과 즐길 수 있는 놀거리를 찾아봐요." },
  ] }),
  component: Spaces,
});

const tone = { primary: "bg-primary text-primary-foreground", lime: "bg-lime text-lime-foreground", sky: "bg-sky text-sky-foreground", navy: "bg-navy text-navy-foreground" } as const;

function Spaces() {
  return <AppShell>
    <PageTitle kicker="CHAON PLAY" title="오늘 뭐 하고 놀까?" sub="차오름에서 친구들과 즐길 수 있는 놀거리를 골라봐요." />
    <div className="mt-5 space-y-4">
      {spaces.map((s) => (
        <div key={s.id}>
          <article className={`overflow-hidden rounded-3xl shadow-card ${tone[s.tone]}`}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl leading-tight">{s.name}</h2>
                  <p className="mt-1 text-xs opacity-85">{s.tagline}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold">{s.open ? "지금 이용 가능" : "이용 불가"}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">{s.can.map((c) => <li key={c} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{c}</li>)}</ul>
            </div>
          </article>
          <Link to="/meetup" search={{ space: s.id }} className="tap mt-2 flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-card font-display text-sm shadow-card"><CalendarPlus size={17} /> {s.name} 같이 할 약속 만들기</Link>
        </div>
      ))}
    </div>
    <div className="mt-6"><ShareCTA label="친구한테 놀거리 공유하기" message="차오름에서 같이 놀자! 뭐 할지 골라봐." tone="navy" /></div>
  </AppShell>;
}
