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
      <PageTitle kicker="CHAON PLAY" title="오늘 뭐 하고 놀까?" sub="카드를 누르면 실제 참고 사진·관련 정보·이용 팁까지 바로 볼 수 있어요." />
      <div className="mt-5 space-y-4">
        {spaces.map((s) => {
          const detail = spaceDetails[s.id];
          return (
            <Link key={s.id} to="/spaces/$spaceId" params={{ spaceId: s.id }} className={`tap rise block overflow-hidden rounded-3xl shadow-card ${tone[s.tone]}`}>
              {detail ? (
                <div className="relative aspect-[16/8] overflow-hidden bg-black/10">
                  <img src={detail.photo} alt={detail.photoAlt} className="size-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-800">실제 참고 사진</span>
                  <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 text-white">
                    <div><h2 className="font-display text-2xl leading-tight">{s.name}</h2><p className="mt-0.5 text-xs text-white/80">{s.tagline}</p></div>
                    <ArrowRight size={18} />
                  </div>
                </div>
              ) : null}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold">{s.open ? "지금 이용 가능" : "이용 불가"}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold opacity-75"><ExternalLink size={12} /> 관련 정보 보기</span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">{s.can.map((c) => <li key={c} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{c}</li>)}</ul>
                <div className="mt-4 flex items-center justify-between text-xs font-bold"><span className="inline-flex items-center gap-1.5"><CalendarPlus size={14} /> 같이 할 약속 만들기</span><span>자세히 →</span></div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-6"><ShareCTA label="친구한테 놀거리 공유하기" message="차오름에서 같이 놀자! 뭐 할지 골라봐." tone="navy" /></div>
    </AppShell>
  );
}
