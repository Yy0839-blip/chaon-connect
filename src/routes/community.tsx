import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock3, MapPin, Plus, UsersRound } from "lucide-react";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { spaces } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "같이 놀기 · 친구와 약속 만들기 | 차온 CHAON" },
      {
        name: "description",
        content: "친구를 모집하고 차오름에서 만날 약속을 만들어보세요.",
      },
      { property: "og:title", content: "같이 놀기 · 친구와 약속 만들기" },
      { property: "og:description", content: "오늘 같이 놀 친구를 찾고 약속을 만들어보세요." },
    ],
  }),
  component: Community,
});

function Community() {
  const { meetups, addMeetup } = useChaon();
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(spaces[0]!.name);
  const [maxPeople, setMaxPeople] = useState("4");

  const submit = () => {
    if (!title.trim() || !date || !time) {
      toast.error("뭘 할지, 날짜와 시간을 정해줘!");
      return;
    }
    addMeetup({
      title: title.trim(),
      date,
      time,
      place,
      maxPeople: Math.max(2, Number(maxPeople) || 4),
    });
    setTitle("");
    setDate("");
    setTime("");
    setMaxPeople("4");
    setOpenForm(false);
    toast.success("약속을 만들었어. 친구를 기다려보자!");
  };

  return (
    <AppShell>
      <PageTitle
        kicker="CHAON TOGETHER"
        title="같이 놀 사람?"
        sub="친구를 모집하고 차오름에서 만날 약속을 만들어보세요."
      />

      <button
        type="button"
        onClick={() => setOpenForm((v) => !v)}
        className="tap mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-display text-base text-primary-foreground shadow-pop"
      >
        <Plus size={19} /> 약속 추가하기
      </button>

      {openForm && (
        <section className="rise mt-3 rounded-3xl bg-card p-4 shadow-card">
          <p className="font-display text-lg">새 약속 만들기</p>
          <p className="mt-1 text-xs text-muted-foreground">친구가 들어올 수 있게 간단하게 적어주세요.</p>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 40))}
            placeholder="예: 보드게임 같이 할 사람!"
            className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />

          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="rounded-2xl bg-muted p-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground"><CalendarDays size={13} /> 날짜</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full bg-transparent text-sm outline-none" />
            </label>
            <label className="rounded-2xl bg-muted p-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground"><Clock3 size={13} /> 시간</span>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full bg-transparent text-sm outline-none" />
            </label>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="rounded-2xl bg-muted p-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground"><MapPin size={13} /> 장소</span>
              <select value={place} onChange={(e) => setPlace(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none">
                {spaces.map((s) => <option key={s.id}>{s.name}</option>)}
              </select>
            </label>
            <label className="rounded-2xl bg-muted p-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground"><UsersRound size={13} /> 최대 인원</span>
              <select value={maxPeople} onChange={(e) => setMaxPeople(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none">
                {[2, 3, 4, 5, 6, 8].map((n) => <option key={n} value={n}>{n}명</option>)}
              </select>
            </label>
          </div>

          <button type="button" onClick={submit} className="tap mt-3 w-full rounded-2xl bg-primary py-3.5 font-display text-base text-primary-foreground">
            약속 만들기
          </button>
        </section>
      )}

      <section className="mt-7">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-primary">OPEN MEETUPS</p>
            <h2 className="mt-0.5 font-display text-xl">지금 모집 중</h2>
          </div>
          <span className="text-xs text-muted-foreground">{meetups.length}개</span>
        </div>

        {meetups.length ? (
          <div className="space-y-3">
            {meetups.map((m) => {
              const full = m.joinedPeople >= m.maxPeople;
              return (
                <article key={m.id} className="rounded-3xl bg-card p-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-xl">{m.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg leading-tight">{m.title}</p>
                      <p className="mt-1 text-xs font-bold text-muted-foreground">{m.creator}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                    <span className="rounded-xl bg-muted px-3 py-2">{m.date}</span>
                    <span className="rounded-xl bg-muted px-3 py-2">{m.time}</span>
                    <span className="rounded-xl bg-muted px-3 py-2">{m.place}</span>
                    <span className="rounded-xl bg-muted px-3 py-2">{m.joinedPeople}/{m.maxPeople}명</span>
                  </div>
                  <button
                    type="button"
                    disabled={full}
                    onClick={() => {
                      const joined = useChaon().toggleMeetup(m.id);
                      toast[joined ? "success" : "info"](joined ? "약속에 참여했어!" : "이미 마감된 약속이야.");
                    }}
                    className="tap mt-3 w-full rounded-2xl bg-primary py-3 font-display text-sm text-primary-foreground disabled:opacity-40"
                  >
                    {full ? "모집 마감" : "같이 할래?"}
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-secondary p-5 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-card text-primary shadow-card"><UsersRound size={22} /></div>
            <p className="mt-3 font-display text-lg">아직 올라온 약속이 없어요.</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">친구랑 하고 싶은 걸 정했다면<br />첫 번째 약속을 직접 만들어보세요.</p>
          </div>
        )}
      </section>
    </AppShell>
  );
}
