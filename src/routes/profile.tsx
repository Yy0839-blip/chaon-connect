import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { allBadges, missions, programs } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "내 프로필 · 포인트와 배지 | 차온 CHAON" },
      {
        name: "description",
        content: "내가 모은 차온 포인트, 배지, 신청한 프로그램과 차오름 방문 기록을 확인하세요.",
      },
      { property: "og:title", content: "내 프로필 · 포인트와 배지" },
      { property: "og:description", content: "차온 포인트, 배지, 참여 프로그램 한눈에." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { nickname, avatar, points, badges, doneMissions, joinedPrograms, visits, setProfile } = useChaon();
  const joined = programs.filter((p) => joinedPrograms.includes(p.id));

  return (
    <AppShell>
      <PageTitle kicker="MY CHAON" title="내 프로필" />

      <section className="rise mt-5 rounded-3xl bg-night p-5 text-navy-foreground shadow-card">
        <div className="flex items-center gap-3">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/15 text-3xl">{avatar}</span>
          <span>
            <span className="block font-display text-2xl">{nickname || "익명의 차오름러"}</span>
            <span className="block text-xs text-navy-foreground/60">차오름 방문 {visits}회</span>
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { l: "포인트", v: points },
            { l: "배지", v: badges.length },
            { l: "미션", v: `${doneMissions.length}/${missions.length}` },
          ].map((i) => (
            <div key={i.l} className="rounded-2xl bg-white/10 py-3">
              <p className="font-display text-xl text-lime">{i.v}</p>
              <p className="text-[11px] text-navy-foreground/60">{i.l}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setProfile("", avatar)}
          className="mt-4 w-full py-2 text-xs font-bold text-navy-foreground/60"
        >
          닉네임 다시 정하기
        </button>
      </section>

      <h2 className="mb-3 mt-7 font-display text-xl">내 배지</h2>
      <div className="grid grid-cols-3 gap-2.5">
        {allBadges.map((b) => {
          const owned = badges.includes(b.id);
          return (
            <div
              key={b.id}
              className={`rounded-2xl p-3 text-center shadow-card ${owned ? "bg-lime text-lime-foreground" : "bg-card opacity-50"}`}
            >
              <div className="text-2xl">{b.emoji}</div>
              <p className="mt-1 text-[11px] font-bold">{b.id}</p>
              <p className="text-[10px] opacity-70">{b.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-3 mt-7 flex items-end justify-between">
        <h2 className="font-display text-xl">신청한 프로그램</h2>
        <Link to="/programs" className="text-xs font-bold text-primary">
          더 보기 →
        </Link>
      </div>
      {joined.length ? (
        <div className="space-y-2.5">
          {joined.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card">
              <span className="text-2xl">{p.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base leading-tight">{p.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {p.date} · {p.time}
                </span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-3xl bg-card p-4 text-sm text-muted-foreground shadow-card">
          아직 신청한 프로그램이 없어. 프로그램 탭에서 골라봐!
        </p>
      )}

      <div className="mt-6">
        <ShareCTA label="친구 초대하고 같이 모으기" tone="navy" />
      </div>
    </AppShell>
  );
}
