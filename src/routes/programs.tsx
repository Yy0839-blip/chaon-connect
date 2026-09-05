import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { centerPrograms } from "@/data/centerPrograms";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/programs")({
  head: () => ({ meta: [{ title: "공식 프로그램 · 차온 | 차오름" }, { name: "description", content: "차오름에서 확정한 공식 프로그램과 주변 청소년 프로그램을 구분해 확인해요." }] }),
  component: Programs,
});

function Programs() {
  const { joinedPrograms, toggleProgram } = useChaon();
  return <AppShell>
    <PageTitle kicker="PROGRAMS" title="프로그램" sub="센터 공식 프로그램과 주변 청소년 프로그램을 섞지 않고 따로 보여드려요." />
    {centerPrograms.length ? <div className="mt-5 space-y-3">{centerPrograms.map((p) => {
      const joined = joinedPrograms.includes(p.id);
      const closed = p.status === "마감";
      return <article key={p.id} className="rise rounded-3xl bg-card p-5 shadow-card"><div className="flex items-start gap-3"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">{p.emoji}</span><div className="min-w-0 flex-1"><p className="font-display text-lg leading-tight">{p.title}</p><p className="mt-1 text-xs font-bold text-muted-foreground">{p.target} · {p.status}</p></div></div><p className="mt-3 text-sm text-muted-foreground">{p.desc}</p><button type="button" disabled={closed && !joined} onClick={() => { const isJoined = toggleProgram(p.id); toast[isJoined ? "success" : "info"](isJoined ? "신청 완료!" : "신청을 취소했어요."); }} className={`tap mt-3 w-full rounded-2xl py-3.5 font-display text-base ${joined ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>{closed && !joined ? "마감" : joined ? "신청 취소" : "신청하기"}</button></article>;
    })}</div> : <section className="rise mt-5 rounded-[28px] bg-secondary p-5 text-center"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-card text-primary shadow-card"><CircleCheckBig size={24} /></div><h2 className="mt-4 font-display text-xl">현재 차오름 공식 프로그램은 없어요</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">확인되지 않은 날짜나 모집 정보를 임의로 넣지 않았어요.<br />대신 주변 청소년 시설의 실제 프로그램을 모아볼 수 있어요.</p><Link to="/programs/nearby" className="tap mt-4 flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-display text-sm text-primary-foreground"><ArrowRight size={17} /> 주변 청소년 프로그램 보기</Link></section>}
    <section className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-card"><p className="font-display text-base">프로그램과 약속은 달라요</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">프로그램은 기관이 운영하는 공식 일정이고, 약속은 친구끼리 직접 만드는 일정이에요. 약속은 커뮤니티에서만 만들 수 있어요.</p></section>
  </AppShell>;
}
