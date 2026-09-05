import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { spaces } from "@/data/chaon";

export const Route = createFileRoute("/spaces")({
  head: () => ({
    meta: [
      { title: "공간 둘러보기 · 차오름 | 차온 CHAON" },
      {
        name: "description",
        content: "댄스실, 빔프로젝터, 보드게임, 복층 공간까지. 차오름에서 뭘 할 수 있는지 한눈에 확인해요.",
      },
      { property: "og:title", content: "공간 둘러보기 · 차오름" },
      { property: "og:description", content: "차오름의 댄스실·빔프로젝터·보드게임·복층 공간 소개." },
    ],
  }),
  component: Spaces,
});

const tone = {
  primary: "bg-sunrise text-primary-foreground",
  lime: "bg-lime text-lime-foreground",
  sky: "bg-sky text-sky-foreground",
  navy: "bg-navy text-navy-foreground",
} as const;

function Spaces() {
  return (
    <AppShell>
      <PageTitle kicker="CHAORUM SPACES" title="여기서 뭐 할 수 있어?" sub="대야동 주민센터 2층, 차오름 공간 안내" />

      <div className="mt-5 space-y-4">
        {spaces.map((s) => (
          <section key={s.id} id={s.id} className={`rise scroll-mt-24 rounded-3xl p-5 shadow-card ${tone[s.tone]}`}>
            <div className="flex items-center justify-between">
              <span className="text-4xl">{s.emoji}</span>
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold">
                {s.open ? "지금 이용 가능" : "이용 불가"}
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl leading-tight">{s.name}</h2>
            <p className="mt-1 text-sm opacity-80">{s.tagline}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.can.map((c) => (
                <li key={c} className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                  {c}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-6">
        <ShareCTA label="친구한테 공간 자랑하기" message="차오름에 댄스실이랑 보드게임 있대. 같이 갈래?" tone="navy" />
      </div>
    </AppShell>
  );
}
