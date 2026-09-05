import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, CircleCheckBig } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { centerPrograms } from "@/data/centerPrograms";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "공식 프로그램 · 차오름 | 차온 CHAON" },
      { name: "description", content: "차오름 운영진이 확정한 공식 프로그램만 확인할 수 있어요." },
      { property: "og:title", content: "공식 프로그램 · 차오름" },
      { property: "og:description", content: "공식 일정이 확인된 차오름 프로그램만 표시합니다." },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { joinedPrograms, toggleProgram } = useChaon();

  return (
    <AppShell>
      <PageTitle kicker="OFFICIAL CHAON" title="차오름 프로그램" sub="센터에서 확정한 공식 프로그램만 보여드려요." />

      {centerPrograms.length ? (
        <div className="mt-5 space-y-3">
          {centerPrograms.map((p) => {
            const joined = joinedPrograms.includes(p.id);
            const closed = p.status === "마감";
            return (
              <article key={p.id} className="rise rounded-3xl bg-card p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-tight">{p.title}</p>
                    <p className="mt-1 text-xs font-bold text-muted-foreground">{p.target} · {p.status}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                <button type="button" disabled={closed && !joined} onClick={() => {
                  const isJoined = toggleProgram(p.id);
                  toast[isJoined ? "success" : "info"](isJoined ? "신청 완료!" : "신청을 취소했어.");
                }} className={`tap mt-3 w-full rounded-2xl py-3.5 font-display text-base ${joined ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                  {closed && !joined ? "마감됐어" : joined ? "신청 취소" : "신청하기"}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="rise mt-5 rounded-[28px] bg-secondary p-5 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-card text-primary shadow-card"><CircleCheckBig size={24} /></div>
          <h2 className="mt-4 font-display text-xl">공식 일정 준비 중</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">임의의 날짜를 넣지 않고,<br />차오름에서 확정된 일정이 들어오면 바로 보여드릴게요.</p>
          <button type="button" onClick={() => toast.info("공식 프로그램이 등록되면 이 화면에서 확인할 수 있어요.")} className="tap mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
            <CalendarPlus size={17} /> 공식 일정 기다리기
          </button>
        </section>
      )}

      <section className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-card">
        <p className="font-display text-base">날짜가 없는 게 이상한 게 아니에요.</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">센터 공식 프로그램은 확정된 일정만 표시하고, 친구끼리 노는 일정은 ‘같이 놀기’에서 직접 약속을 만들 수 있게 분리했어요.</p>
      </section>
    </AppShell>
  );
}
