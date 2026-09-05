import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { programs } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "프로그램 신청 · 차오름 활동 | 차온 CHAON" },
      {
        name: "description",
        content:
          "댄스 챌린지, 보드게임 데이, 금요 영화 상영회까지. 차오름 프로그램을 확인하고 바로 신청해요.",
      },
      { property: "og:title", content: "프로그램 신청 · 차오름 활동" },
      { property: "og:description", content: "차오름에서 열리는 프로그램 신청하기." },
    ],
  }),
  component: Programs,
});

const statusClass = {
  모집중: "bg-lime text-lime-foreground",
  마감임박: "bg-sunrise text-primary-foreground",
  마감: "bg-muted text-muted-foreground",
} as const;

function Programs() {
  const { joinedPrograms, toggleProgram } = useChaon();

  return (
    <AppShell>
      <PageTitle
        kicker="CHAON PROGRAMS"
        title="같이 할 사람?"
        sub="신청하면 친구랑 같이 참여할 수 있어"
      />

      <div className="mt-5 space-y-3">
        {programs.map((p) => {
          const joined = joinedPrograms.includes(p.id);
          const closed = p.status === "마감";
          const pct = Math.min(100, Math.round((p.joined / p.capacity) * 100));
          return (
            <article key={p.id} className="rise rounded-3xl bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-muted text-2xl">
                  {p.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg leading-tight">{p.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {p.date} · {p.time} · {p.target}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass[p.status]}`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className="bg-sunrise h-full rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1.5 text-[11px] font-bold text-muted-foreground">
                {p.joined} / {p.capacity}명 신청
              </p>
              <button
                type="button"
                disabled={closed && !joined}
                onClick={() => {
                  const isJoined = toggleProgram(p.id);
                  toast[isJoined ? "success" : "info"](
                    isJoined ? "신청 완료! 그날 보자 🎉" : "신청을 취소했어",
                  );
                }}
                className={`tap mt-3 w-full rounded-2xl py-3.5 font-display text-base disabled:opacity-40 ${
                  joined ? "bg-muted text-foreground" : "bg-sunrise text-primary-foreground"
                }`}
              >
                {closed && !joined ? "마감됐어" : joined ? "신청 취소" : "신청하기"}
              </button>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
