import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, ChevronRight } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { spaces } from "@/data/chaon";
import { spaceDetails } from "@/data/spaceDetails";

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
    <PageTitle kicker="CHAON PLAY" title="오늘 뭐 하고 놀까?" sub="마음에 드는 놀거리를 누르면 자세히 볼 수 있어요." />
    <div className="mt-5 space-y-4">
      {spaces.map((s) => {
        const detail = spaceDetails[s.id];
        return <div key={s.id}>
          <Link to="/spaces/$spaceId" params={{ spaceId: s.id }} className="tap block rounded-3xl" aria-label={`${s.name} 자세히 보기`}>
            <article className={`overflow-hidden rounded-3xl shadow-card ${tone[s.tone]}`}>
              {detail ? <div className="relative aspect-[16/8] overflow-hidden bg-black/10"><img src={detail.photo} alt={detail.photoAlt} className="size-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /><span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-800">참고 사진</span><div className="absolute inset-x-4 bottom-3"><h2 className="font-display text-2xl leading-tight">{s.name}</h2><p className="mt-0.5 text-xs text-white/85">{s.tagline}</p></div></div> : <div className="p-4"><h2 className="font-display text-2xl">{s.name}</h2><p className="mt-1 text-xs">{s.tagline}</p></div>}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold">{s.open ? "지금 이용 가능" : "이용 불가"}</span><span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">자세히 보기 <ChevronRight size={14} /></span></div>
                <ul className="mt-3 flex flex-wrap gap-2">{s.can.map((c) => <li key={c} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{c}</li>)}</ul>
              </div>
            </article>
          </Link>
          <Link to="/meetup" search={{ space: s.id }} className="tap mt-2 flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-card font-display text-sm shadow-card"><CalendarPlus size={17} /> {s.name} 같이 할 약속 만들기</Link>
        </div>;
      })}
    </div>
    <div className="mt-6"><ShareCTA label="친구한테 놀거리 공유하기" message="차오름에서 같이 놀자! 뭐 할지 골라봐." tone="navy" /></div>
  </AppShell>;
}
