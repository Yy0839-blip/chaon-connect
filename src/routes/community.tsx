import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock3, Heart, ImagePlus, MapPin, Plus, Send, UsersRound } from "lucide-react";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { spaces } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [
    { title: "커뮤니티 · 차온 CHAON" },
    { name: "description", content: "차오름 친구들과 글을 올리고, 놀거리와 약속을 함께 찾아보세요." },
  ] }),
  component: Community,
});

function Community() {
  const { posts, addPost, toggleLike, meetups, addMeetup, toggleMeetup } = useChaon();
  const [openPost, setOpenPost] = useState(false);
  const [text, setText] = useState("");
  const [place, setPlace] = useState(spaces[0]!.name);
  const [image, setImage] = useState("");
  const [meetupOpen, setMeetupOpen] = useState(false);
  const [meetTitle, setMeetTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const readImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, 900 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const submitPost = () => {
    if (!text.trim()) {
      toast.error("게시글 내용을 먼저 적어주세요.");
      return;
    }
    addPost(text.trim(), place, image || undefined);
    setText("");
    setImage("");
    setOpenPost(false);
    toast.success("커뮤니티에 글을 올렸어요. +5P");
  };

  const submitMeetup = () => {
    if (!meetTitle.trim() || !date || !time) {
      toast.error("약속 내용, 날짜, 시간을 정해주세요.");
      return;
    }
    addMeetup({ title: meetTitle.trim(), date, time, place: spaces[0]!.name, maxPeople: 4 });
    setMeetTitle(""); setDate(""); setTime(""); setMeetupOpen(false);
    toast.success("약속을 올렸어요.");
  };

  return (
    <AppShell>
      <PageTitle kicker="CHAON COMMUNITY" title="커뮤니티" sub="사진은 선택, 글은 자유롭게. 차오름에서 있었던 일을 남겨보세요." />

      <section className="mt-5 rounded-[28px] bg-primary p-4 text-primary-foreground shadow-card">
        <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.18em] text-primary-foreground/65">WRITE</p><p className="mt-1 font-display text-xl">오늘 뭐 했어?</p></div><button type="button" onClick={() => setOpenPost((v) => !v)} className="tap grid size-11 place-items-center rounded-2xl bg-white text-primary"><Plus size={20} /></button></div>
        <p className="mt-1 text-xs text-primary-foreground/70">텍스트만 올려도 되고, 갤러리 사진을 하나 추가해도 돼요.</p>
      </section>

      {openPost && <section className="rise mt-3 rounded-3xl bg-card p-4 shadow-card">
        <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, 300))} placeholder="예: 오늘 보드게임 새로 해봤는데 진짜 재밌었음" className="min-h-28 w-full resize-none rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-primary/20" />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="rounded-2xl bg-muted p-3"><span className="block text-[10px] font-bold text-muted-foreground">어디에서?</span><select value={place} onChange={(e) => setPlace(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none">{spaces.map((s) => <option key={s.id}>{s.name}</option>)}</select></label>
          <label className="flex cursor-pointer items-center gap-2 rounded-2xl bg-muted p-3 text-xs font-bold"><ImagePlus size={17} className="text-primary" /><span className="min-w-0 truncate">{image ? "사진 추가됨" : "사진 추가 (선택)"}</span><input type="file" accept="image/*" className="hidden" onChange={(e) => readImage(e.target.files?.[0])} /></label>
        </div>
        {image && <div className="relative mt-3 overflow-hidden rounded-2xl"><img src={image} alt="게시글 사진 미리보기" className="max-h-64 w-full object-cover" /><button type="button" onClick={() => setImage("")} className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white">삭제</button></div>}
        <button type="button" onClick={submitPost} className="tap mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-display text-base text-primary-foreground"><Send size={16} /> 글 올리기</button>
      </section>}

      <section className="mt-8"><div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-bold tracking-[0.18em] text-primary">FEED</p><h2 className="mt-0.5 font-display text-xl">친구들 이야기</h2></div><span className="text-xs text-muted-foreground">{posts.length}개</span></div>
        <div className="space-y-3">{posts.map((p) => <article key={p.id} className="rounded-3xl bg-card p-4 shadow-card"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary text-lg">{p.avatar.startsWith("data:image/") ? <img src={p.avatar} alt="" className="size-full object-cover" /> : p.avatar}</span><div className="min-w-0 flex-1"><p className="font-display text-sm">{p.nickname}</p><p className="text-[10px] text-muted-foreground">{p.place} · {p.time}</p></div></div><p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{p.text}</p>{p.image ? <img src={p.image} alt="게시글 첨부 사진" className="mt-3 max-h-80 w-full rounded-2xl object-cover" /> : null}<div className="mt-3 flex items-center gap-4 text-xs font-bold text-muted-foreground"><button type="button" onClick={() => toggleLike(p.id)} className={`tap inline-flex items-center gap-1.5 ${p.liked ? "text-rose-500" : ""}`}><Heart size={15} fill={p.liked ? "currentColor" : "none"} /> {p.likes}</button><span>댓글 {p.comments}</span></div></article>)}</div>
      </section>

      <section className="mt-8 pb-2"><div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-bold tracking-[0.18em] text-primary">MEETUPS</p><h2 className="mt-0.5 font-display text-xl">같이 놀 약속</h2></div><button type="button" onClick={() => setMeetupOpen((v) => !v)} className="tap rounded-xl bg-secondary px-3 py-2 text-xs font-bold text-primary"><Plus size={14} className="mr-1 inline" />약속</button></div>
        {meetupOpen && <div className="mb-3 rounded-3xl bg-card p-4 shadow-card"><input value={meetTitle} onChange={(e) => setMeetTitle(e.target.value.slice(0, 40))} placeholder="예: 보드게임 같이 할 사람" className="w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none" /><div className="mt-2 grid grid-cols-2 gap-2"><label className="rounded-2xl bg-muted p-3 text-[10px] font-bold"><CalendarDays size={13} className="mr-1 inline" />날짜<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full bg-transparent text-sm outline-none" /></label><label className="rounded-2xl bg-muted p-3 text-[10px] font-bold"><Clock3 size={13} className="mr-1 inline" />시간<input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full bg-transparent text-sm outline-none" /></label></div><button type="button" onClick={submitMeetup} className="tap mt-2 w-full rounded-2xl bg-primary py-3 font-display text-sm text-primary-foreground">약속 올리기</button></div>}
        <div className="space-y-3">{meetups.slice(0, 4).map((m) => <article key={m.id} className="rounded-3xl bg-card p-4 shadow-card"><div className="flex items-center gap-2"><span className="text-xl">{m.avatar}</span><p className="min-w-0 flex-1 font-display text-base">{m.title}</p><span className="text-[11px] font-bold">{m.joinedPeople}/{m.maxPeople}</span></div><p className="mt-2 text-xs text-muted-foreground">{m.date} · {m.time} · {m.place}</p><button type="button" onClick={() => toggleMeetup(m.id)} disabled={m.joinedPeople >= m.maxPeople} className="tap mt-3 flex w-full items-center justify-center gap-1 rounded-2xl bg-secondary py-3 text-xs font-bold text-primary disabled:opacity-40"><UsersRound size={14} />{m.joinedPeople >= m.maxPeople ? "모집 마감" : "같이 할래?"}</button></article>)}</div>
      </section>
    </AppShell>
  );
}
