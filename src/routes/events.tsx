import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { contestCategories, yearEnd } from "@/data/chaon";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "2026 연말 이벤트 · 공모전·플리마켓·파티 | 차온 CHAON" },
      {
        name: "description",
        content: "차오름 연말 이벤트 안내. 공모전, 플리마켓, 연말파티까지 우리들의 연말을 직접 만들어요.",
      },
      { property: "og:title", content: "2026 CHAON YEAR-END" },
      { property: "og:description", content: "공모전·플리마켓·연말파티, 우리들의 연말을 만들어보자." },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <AppShell>
      <PageTitle kicker={yearEnd.title} title={yearEnd.slogan} sub={yearEnd.period} />

      <div className="mt-5 space-y-3">
        {yearEnd.items.map((i) => (
          <Link
            key={i.id}
            to="/events"
            hash={i.id}
            className="tap flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-muted text-3xl">{i.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg leading-tight">{i.name}</span>
              <span className="block text-xs text-muted-foreground">{i.desc}</span>
            </span>
            <span className="text-lg">→</span>
          </Link>
        ))}
      </div>

      <section id="contest" className="mt-7 scroll-mt-24 rounded-3xl bg-limeGrad p-5 shadow-card">
        <p className="text-[11px] font-bold tracking-[0.22em] text-lime-foreground/70">CONTEST</p>
        <h2 className="mt-1 font-display text-2xl text-lime-foreground">🏆 우리 동네를 우리가 만든다</h2>
        <p className="mt-1.5 text-sm text-lime-foreground/80">
          영상, 사진, 그림, 디자인, 댄스, 아이디어 중 하나만 골라 제출하면 끝. 수상작은 연말파티에서 공개돼.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {contestCategories.map((c) => (
            <span key={c.id} className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-lime-foreground">
              {c.emoji} {c.name}
            </span>
          ))}
        </div>
      </section>

      <section id="market" className="mt-4 scroll-mt-24 rounded-3xl bg-sky p-5 text-sky-foreground shadow-card">
        <p className="text-[11px] font-bold tracking-[0.22em] opacity-70">FLEA MARKET</p>
        <h2 className="mt-1 font-display text-2xl">🛍️ 내 물건으로 부스 열기</h2>
        <p className="mt-1.5 text-sm opacity-80">
          안 쓰는 물건, 직접 만든 굿즈 뭐든 OK. 부스 신청은 두 명부터, 자리는 차오름 1층에 깔려.
        </p>
        <ul className="mt-3 space-y-1 text-xs font-bold">
          <li>· 12월 13일 (일) 13:00 - 17:00</li>
          <li>· 부스 20팀 · 참가비 없음</li>
        </ul>
      </section>

      <section id="party" className="mt-4 scroll-mt-24 rounded-3xl bg-night p-5 text-navy-foreground shadow-card">
        <p className="text-[11px] font-bold tracking-[0.22em] text-lime">YEAR-END PARTY</p>
        <h2 className="mt-1 font-display text-2xl">🎊 1년 활동 다 모아서 한 판</h2>
        <p className="mt-1.5 text-sm text-navy-foreground/70">
          댄스 무대, 공모전 시상, 올해의 차오름러 발표까지. 포인트 많이 모은 사람은 앞자리 확정!
        </p>
        <ul className="mt-3 space-y-1 text-xs font-bold text-navy-foreground/80">
          <li>· 12월 20일 (일) 17:00 - 20:00</li>
          <li>· 대야동 주민센터 2층 차오름</li>
        </ul>
      </section>

      <div className="mt-6">
        <ShareCTA label="친구랑 같이 신청하기" message="차오름 연말 이벤트 같이 나갈래? 공모전에 플리마켓까지 있어!" />
      </div>
    </AppShell>
  );
}
