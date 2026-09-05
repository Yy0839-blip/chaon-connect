import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ImagePlus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { ShareCTA } from "@/components/chaon/ShareCTA";
import { allBadges, missions } from "@/data/chaon";
import { centerPrograms } from "@/data/centerPrograms";
import { useChaon } from "@/lib/chaon-store";

export const Route = createFileRoute("/profile")({ head: () => ({ meta: [{ title: "내 프로필 · 차온 CHAON" }, { name: "description", content: "내 포인트, 배지, 취향과 참여 기록을 확인하세요." }] }), component: Profile });

const TAGS = ["친구랑 노는 걸 좋아해", "게임 좋아해", "음악 좋아해", "운동 좋아해", "사진 찍는 거 좋아해", "조용히 노는 게 좋아", "새로운 거 해보고 싶어", "맛있는 거 좋아해", "춤 좋아해", "그림·만들기 좋아해"];

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => { const image = new Image(); image.onload = () => { const size = 256; const scale = Math.min(1, size / Math.max(image.width, image.height)); const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale)); const ctx = canvas.getContext("2d"); if (!ctx) return reject(new Error("canvas unavailable")); ctx.drawImage(image, 0, 0, canvas.width, canvas.height); resolve(canvas.toDataURL("image/jpeg", 0.82)); }; image.onerror = reject; image.src = String(reader.result); }; reader.onerror = reject; reader.readAsDataURL(file);
  });
}

function Profile() {
  const { nickname, avatar, profileTags, points, badges, doneMissions, joinedPrograms, visits, setProfile, setProfileTags, meetups } = useChaon();
  const [editingTags, setEditingTags] = useState(false);
  const joined = centerPrograms.filter((p) => joinedPrograms.includes(p.id));
  const myMeetups = meetups.filter((m) => m.creator === (nickname || "익명의 차오름러"));
  const handlePhoto = async (file?: File) => { if (!file || !file.type.startsWith("image/")) return; try { setProfile(nickname, await resizeImage(file)); } catch { /* ignore */ } };
  const toggleTag = (tag: string) => setProfileTags(profileTags.includes(tag) ? profileTags.filter((t) => t !== tag) : [...profileTags, tag].slice(0, 5));

  return <AppShell>
    <PageTitle kicker="MY CHAON" title="나" sub="내가 좋아하는 것과 오늘의 기분을 보여주는 공간이에요." />
    <section className="rise mt-5 rounded-[30px] bg-night p-5 text-navy-foreground shadow-card">
      <div className="flex items-center gap-3"><label className="tap relative grid size-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[24px] bg-white/15 text-3xl ring-2 ring-white/15" title="갤러리에서 사진 선택">{avatar.startsWith("data:image/") ? <img src={avatar} alt="내 프로필 사진" className="size-full object-cover" /> : avatar}<span className="absolute bottom-1 right-1 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-pop"><ImagePlus size={14} /></span><input type="file" accept="image/*" className="sr-only" onChange={(e) => void handlePhoto(e.target.files?.[0])} /></label><span><span className="block font-display text-2xl">{nickname || "익명의 차오름러"}</span><span className="block text-xs text-navy-foreground/60">차오름 방문 {visits}회</span><span className="mt-1 block text-[10px] font-bold text-lime">사진을 눌러 나만의 모습으로 바꿔보세요</span></span></div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">{[{ l: "포인트", v: points }, { l: "배지", v: badges.length }, { l: "미션", v: `${doneMissions.length}/${missions.length}` }].map((i) => <div key={i.l} className="rounded-2xl bg-white/10 py-3"><p className="font-display text-xl text-lime">{i.v}</p><p className="text-[11px] text-navy-foreground/60">{i.l}</p></div>)}</div>
      <button type="button" onClick={() => setProfile("", avatar)} className="mt-4 w-full py-2 text-xs font-bold text-navy-foreground/60">닉네임 다시 정하기</button>
    </section>

    <section className="mt-4 rounded-[28px] bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.16em] text-primary">THIS IS ME</p><h2 className="mt-1 font-display text-xl">나는 이런 걸 좋아해</h2><p className="mt-1 text-xs text-muted-foreground">최대 5개를 골라서 나를 표현해보세요.</p></div><button type="button" onClick={() => setEditingTags((v) => !v)} className="tap rounded-xl bg-secondary px-3 py-2 text-xs font-bold text-primary">{editingTags ? "완료" : "편집"}</button></div>
      <div className="mt-3 flex flex-wrap gap-2">{(profileTags.length ? profileTags : ["아직 골라보지 않았어요"]).map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">{tag}</span>)}</div>
      {editingTags && <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">{TAGS.map((tag) => { const selected = profileTags.includes(tag); return <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`tap rounded-full border px-3 py-2 text-xs font-bold ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted"}`}>{selected ? <Check size={13} className="mr-1 inline" /> : null}{tag}</button>; })}</div>}
    </section>

    <Link to="/music" className="tap mt-3 flex items-center gap-3 rounded-[24px] bg-secondary p-4 shadow-card"><span className="grid size-11 place-items-center rounded-2xl bg-white text-primary">♫</span><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold text-primary">MY VIBE</span><span className="block font-display text-base">내가 좋아하는 음악도 골라봐</span><span className="block text-xs text-muted-foreground">투표하고 추천곡 남기기</span></span><Sparkles size={17} className="text-primary" /></Link>

    <h2 className="mb-3 mt-7 font-display text-xl">내 배지</h2><div className="grid grid-cols-3 gap-2.5">{allBadges.map((b) => { const owned = badges.includes(b.id); return <div key={b.id} className={`rounded-2xl p-3 text-center shadow-card ${owned ? "bg-lime text-lime-foreground" : "bg-card opacity-50"}`}><div className="text-2xl">{b.emoji}</div><p className="mt-1 text-[11px] font-bold">{b.id}</p><p className="text-[10px] opacity-70">{b.desc}</p></div>; })}</div>
    <div className="mb-3 mt-7 flex items-end justify-between"><h2 className="font-display text-xl">신청한 프로그램</h2><Link to="/programs" className="text-xs font-bold text-primary">공식 프로그램 →</Link></div>
    {joined.length ? <div className="space-y-2.5">{joined.map((p) => <div key={p.id} className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card"><span className="text-2xl">{p.emoji}</span><span className="min-w-0 flex-1"><span className="block font-display text-base leading-tight">{p.title}</span><span className="block text-xs text-muted-foreground">센터 공식 프로그램</span></span></div>)}</div> : <div className="rounded-3xl bg-secondary p-4 shadow-card"><p className="font-display text-base">현재 신청한 공식 프로그램이 없어요.</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">차오름에서 공식 일정이 등록되면 여기에서 신청 내역을 확인할 수 있어요.</p><Link to="/programs" className="tap mt-3 flex items-center justify-center rounded-2xl bg-primary py-3 font-display text-sm text-primary-foreground">공식 프로그램 보기</Link></div>}
    <div className="mb-3 mt-7 flex items-end justify-between"><h2 className="font-display text-xl">내가 만든 약속</h2><Link to="/meetup" className="text-xs font-bold text-primary">+ 새 약속</Link></div>
    {myMeetups.length ? <div className="space-y-2.5">{myMeetups.slice(0, 3).map((m) => <Link key={m.id} to="/community" className="tap flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card"><span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-lg">{m.avatar}</span><span className="min-w-0 flex-1"><span className="block truncate font-display text-base">{m.title}</span><span className="block text-xs text-muted-foreground">{m.date} · {m.time} · {m.joinedPeople}/{m.maxPeople}명</span></span></Link>)}</div> : <Link to="/meetup" className="tap flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card"><span className="grid size-10 place-items-center rounded-2xl bg-secondary text-primary"><Plus size={19} /></span><span><span className="block font-display text-base">첫 약속 만들기</span><span className="block text-xs text-muted-foreground">친구와 놀 계획을 정해보세요.</span></span></Link>}
    <div className="mt-6"><ShareCTA label="친구 초대하고 같이 놀기" tone="navy" /></div>
  </AppShell>;
}
