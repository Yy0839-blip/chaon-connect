import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarPlus, ExternalLink } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { spaces } from "@/data/chaon";
import { spaceDetails } from "@/data/spaceDetails";

export const Route = createFileRoute("/spaces")({
  head: () => ({
    meta: [
      { title: "놀거리 둘러보기 · 차오름 | 차온 CHAON" },
      { name: "description", content: "댄스실, 빔프로젝터, 보드게임, 복층 공간까지. 차오름에서 뭘 할 수 있는지 실제 참고 사진과 함께 확인해요." },
      { property: "og:title", content: "놀거리 둘러보기 · 차오름" },
      { property: "og:description", content: "차오름의 놀거리와 이용 아이디어를 실제 참고 사진과 함께 확인해요." },
    ],
  }),
  component: Spaces,
});

const tone = {
  primary: "bg-primary text-primary-foreground",
  lime: "bg-lime text-lime-foreground",
  sky: "bg-sky text-sky-foreground",
  navy: "bg-navy text-navy-foreground",
} as const;

function Spaces() {
  return (
    <AppShell>
      <PageTitle kicker="CHAON PLAY" title="오늘 뭐 하고 놀까?" sub="궁금한 카드를 골라 사진과 이용 방법을 확인해요." />
      <div className="mt-5 space-y-4">
        {spaces.map((s) => {
          const detail = spaceDetails[s.id];
          return (
            <article key={s.id} className={`overflow-hidden rounded-3xl shadow-card ${tone[s.tone]}`}>
              {detail ? (
                <div className="relative aspect-[16/8] overflow-hidden bg-black/10">
                  <img src={detail.photo} alt={detail.photoAlt} className="size-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-800">실제 참고 사진</span>
                  <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 text-white">
                    <div><h2 className="font-display text-2xl leading-tight">{s.name}</h2><p className="mt-0.5 text-xs text-white/80">{s.tagline}</p></div>
                    <Link to="/spaces/$spaceId" params={{ spaceId: s.id }} className="tap grid size-11 shrink-0 place-items-center rounded-full bg-white text-slate-900 shadow-lg" aria-label={`${s.name} 자세히 보기`}>
                      <ArrowRight size={19} />
                    </Link>
                  </div>
                </div>
              ) : null}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold">{s.open ? "지금 이용 가능" : "이용 불가"}</span>
                  {detail ? <a href={detail.sourceUrl} target="_blank" rel="noreferrer" className="tap inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-white/15 px-3 text-[11px] font-bold" aria-label={`${s.name} 관련 정보 보기`}><ExternalLink size={13} /> 관련 정보</a> : null}
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">{s.can.map((c) => <li key={c} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{c}</li>)}</ul>
                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                  <Link to="/spaces/$spaceId" params={{ spaceId: s.id }} className="tap flex min-h-11 items-center justify-center gap-1.5 rounded-2xl bg-white font-display text-sm text-slate-900">자세히 보기 <ArrowRight size={15} /></Link>
                  <Link to="/community" className="tap grid min-h-11 min-w-12 place-items-center rounded-2xl bg-white/15" aria-label={`${s.name}으로 약속 만들기`}><CalendarPlus size={17} /></Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-6"><ShareCTA label="친구한테 놀거리 공유하기" message="차오름에서 같이 놀자! 뭐 할지 골라봐." tone="navy" /></div>
    </AppShell>
  );
}
