import { CalendarPlus, ExternalLink } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
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

const photoBySpace: Record<string, { url: string; alt: string }> = {
  dance: {
    url: "https://www.shyouth.or.kr/template/resources_ss/images/cont/shcs/page_04image3.png",
    alt: "시흥시청소년수련관 댄스연습실 실제 사진",
  },
  beam: {
    url: "https://www.shyouth.or.kr/template/resources_ss/images/cont/shcs/page_04image8.png",
    alt: "시흥시청소년수련관 다목적실 실제 사진",
  },
  board: {
    url: "https://www.shyouth.or.kr/storage/ck//2026/06/30/1782793716733_87119401.png",
    alt: "시흥시청소년수련관 자율이용공간 보드게임 실제 사진",
  },
  loft: {
    url: "https://www.shyouth.or.kr/storage/ck/2026/03/Mobr2YpOKRLJIw82WbJk.png",
    alt: "시흥시청소년수련관 청소년 공간 실제 사진",
  },
};

const tone = {
  primary: "bg-primary text-primary-foreground",
  lime: "bg-lime text-lime-foreground",
  sky: "bg-sky text-sky-foreground",
  navy: "bg-navy text-navy-foreground",
} as const;

function Spaces() {
  return <AppShell>
    <PageTitle kicker="CHAON PLAY" title="오늘 뭐 하고 놀까?" sub="차오름에서 친구들과 즐길 수 있는 놀거리를 골라봐요." />

    <div className="mt-5 rounded-3xl bg-card p-4 shadow-card">
      <p className="text-sm font-bold text-foreground">실제 청소년 공간 사진으로 미리 보기</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">아래 사진은 시흥시청소년청년재단이 공개한 실제 시설 사진입니다. 차오름 시설의 실제 사진은 운영기관 확인 후 교체할 수 있어요.</p>
    </div>

    <div className="mt-4 space-y-4">
      {spaces.map((s) => {
        const photo = photoBySpace[s.id];
        return <div key={s.id}>
          <article className={`overflow-hidden rounded-3xl shadow-card ${tone[s.tone]}`}>
            {photo && <img src={photo.url} alt={photo.alt} className="h-44 w-full object-cover" loading="lazy" />}
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
        </div>;
      })}
    </div>

    <a href="https://www.shyouth.or.kr/base/contents/view?contentsNo=489&menuLevel=2&menuNo=657" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground underline underline-offset-4">
      사진 출처 · 시흥시청소년청년재단 시설안내 <ExternalLink size={13} />
    </a>

    <div className="mt-6"><ShareCTA label="친구한테 놀거리 공유하기" message="차오름에서 같이 놀자! 뭐 할지 골라봐." tone="navy" /></div>
  </AppShell>;
}
