import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { spaces } from "@/data/chaon";

export const Route = createFileRoute("/spaces")({
  head: () => ({
    meta: [
      { title: "놀거리 둘러보기 · 차오름 | 차온 CHAON" },
      {
        name: "description",
        content: "댄스실, 빔프로젝터, 보드게임, 복층 공간까지. 차오름에서 뭘 할 수 있는지 사진과 함께 확인해요.",
      },
      { property: "og:title", content: "놀거리 둘러보기 · 차오름" },
      { property: "og:description", content: "차오름의 놀거리와 이용 아이디어를 사진과 함께 확인해요." },
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
      <PageTitle
        kicker="CHAON PLAY"
        title="오늘 뭐 하고 놀까?"
        sub="카드를 누르면 사진·추천 활동·약속 만들기까지 볼 수 있어요."
      />

      <div className="mt-5 space-y-4">
        {spaces.map((s) => (
          <Link
            key={s.id}
            to="/spaces/$spaceId"
            params={{ spaceId: s.id }}
            className={`tap rise block scroll-mt-24 rounded-3xl p-5 shadow-card ${tone[s.tone]}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl" aria-hidden="true">{s.emoji}</span>
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold">
                {s.open ? "지금 이용 가능" : "이용 불가"}
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl leading-tight">{s.name}</h2>
            <p className="mt-1 text-sm opacity-80">{s.tagline}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.can.map((c) => (
                <li key={c} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{c}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between text-xs font-bold">
              <span className="inline-flex items-center gap-1.5"><CalendarPlus size={14} /> 같이 할 약속 만들기</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <ShareCTA
          label="친구한테 놀거리 공유하기"
          message="차오름에서 같이 놀자! 뭐 할지 골라봐."
          tone="navy"
        />
      </div>
    </AppShell>
  );
}
