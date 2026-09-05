import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3, MapPin, UsersRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { spaces } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/meetup")({ component: MeetupPage });

function MeetupPage() {
  const navigate = useNavigate();
  const { addMeetup } = useChaon();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(spaces[0]?.name ?? "차오름");

  const submit = () => {
    if (!title.trim() || !date || !time || !place) {
      toast.error("무엇을 할지, 날짜와 시간을 정해주세요.");
      return;
    }
    addMeetup({ title: title.trim(), date, time, place, maxPeople: 4 });
    toast.success("약속을 만들었어요. 친구들이 볼 수 있어요!");
    void navigate({ to: "/community" });
  };

  return (
    <AppShell>
      <Link to="/" className="tap mb-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft size={17} /> 홈으로
      </Link>
      <PageTitle kicker="CHAON MEETUP" title="같이 놀 약속 만들기" sub="하고 싶은 걸 정해서 친구들에게 알려주세요." />

      <section className="mt-5 rounded-[30px] bg-primary p-5 text-primary-foreground shadow-card">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15"><UsersRound size={22} /></span>
          <div><p className="text-[10px] font-bold tracking-[0.16em] text-primary-foreground/60">MAKE A PLAN</p><p className="font-display text-xl">오늘 뭐 같이 할래?</p></div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-primary-foreground/75">예: “금요일에 보드게임 같이 할 사람!”처럼 편하게 만들어보세요.</p>
      </section>

      <section className="mt-3 rounded-[28px] bg-card p-4 shadow-card">
        <label className="block"><span className="text-[11px] font-bold text-muted-foreground">무엇을 할까요?</span><input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 40))} placeholder="보드게임 같이 할 사람" className="mt-1.5 w-full rounded-2xl bg-muted px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20" /></label>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="rounded-2xl bg-muted p-3"><span className="text-[10px] font-bold text-muted-foreground"><CalendarDays size={13} className="mr-1 inline" /> 날짜</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none" /></label>
          <label className="rounded-2xl bg-muted p-3"><span className="text-[10px] font-bold text-muted-foreground"><Clock3 size={13} className="mr-1 inline" /> 시간</span><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none" /></label>
        </div>
        <label className="mt-3 block rounded-2xl bg-muted p-3"><span className="text-[10px] font-bold text-muted-foreground"><MapPin size={13} className="mr-1 inline" /> 어디에서?</span><select value={place} onChange={(e) => setPlace(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none">{spaces.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}</select></label>
        <button type="button" onClick={submit} className="tap mt-4 min-h-12 w-full rounded-2xl bg-primary font-display text-base text-primary-foreground shadow-pop">약속 만들기</button>
      </section>
    </AppShell>
  );
}
