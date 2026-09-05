import { createFileRoute } from "@tanstack/react-router";
import { Check, Music2, Send } from "lucide-react";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { dailySongs } from "@/data/music";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/music")({
  head: () => ({ meta: [{ title: "오늘의 음악 투표 · 차온" }, { name: "description", content: "매일 한 곡을 고르고 친구들이 듣고 싶은 노래를 추천해요." }] }),
  component: Music,
});

const baseVotes = [8, 6, 5, 7];

function Music() {
  const { musicVotes, musicVoteCounts, musicRecommendations, voteMusic, addMusicRecommendation } = useChaon();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
  const voted = musicVotes[date];
  const counts = dailySongs.map((song, index) => Math.max(baseVotes[index]!, musicVoteCounts[`${date}:${song.id}`] || 0));
  const total = counts.reduce((a, b) => a + b, 0);
  const recommend = () => {
    if (!title.trim() || !artist.trim()) return toast.error("노래 제목과 가수를 적어주세요.");
    addMusicRecommendation(title.trim(), artist.trim(), date);
    setTitle(""); setArtist("");
    toast.success("오늘의 추천곡에 추가했어요.");
  };

  return <AppShell>
    <PageTitle kicker="CHAON MUSIC" title="오늘 뭐 들을까?" sub="매일 한 곡을 고르고, 듣고 싶은 노래도 직접 추천해요." />
    <section className="mt-5 rounded-[30px] bg-primary p-5 text-primary-foreground shadow-card">
      <div className="flex items-center gap-2"><Music2 size={20} /><p className="text-[10px] font-bold tracking-[0.18em] text-primary-foreground/65">TODAY'S VOTE · {date}</p></div>
      <h2 className="mt-2 font-display text-2xl">오늘의 1등곡을 정해보자</h2>
      <p className="mt-1 text-xs text-primary-foreground/70">하루에 한 번 투표하고 +1P · 결과는 오늘 자정까지</p>
      <div className="mt-4 space-y-2">{dailySongs.map((song, index) => {
        const selected = voted === song.id;
        return <button key={song.id} type="button" disabled={!!voted} onClick={() => { if (voteMusic(date, song.id)) toast.success("투표 완료! +1P"); }} className={`tap w-full rounded-2xl p-3 text-left ${selected ? "bg-white text-primary" : "bg-white/12 text-primary-foreground"}`}>
          <div className="flex items-center gap-3"><span className={`grid size-10 place-items-center rounded-xl ${selected ? "bg-primary/10" : "bg-white/10"}`}><Music2 size={17} /></span><span className="min-w-0 flex-1"><span className="block font-display text-base">{song.title}</span><span className={`block text-[11px] ${selected ? "text-primary/60" : "text-primary-foreground/60"}`}>{song.artist} · {song.mood}</span></span><span className="text-xs font-bold">{counts[index]}표</span>{selected ? <Check size={19} /> : null}</div>
          <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${selected ? "bg-primary/10" : "bg-white/10"}`}><div className="h-full rounded-full bg-current" style={{ width: `${(counts[index] / total) * 100}%` }} /></div>
        </button>;
      })}</div>
    </section>
    <section className="mt-7 rounded-[28px] bg-card p-5 shadow-card">
      <div><p className="text-[10px] font-bold tracking-[0.18em] text-primary">REQUEST A SONG</p><h2 className="mt-1 font-display text-xl">듣고 싶은 노래 추천하기</h2><p className="mt-1 text-xs text-muted-foreground">추천한 노래는 다음날 투표 후보로 모을 수 있어요.</p></div>
      <input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 60))} placeholder="노래 제목" className="mt-4 w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none" />
      <input value={artist} onChange={(e) => setArtist(e.target.value.slice(0, 40))} placeholder="가수 / 아티스트" className="mt-2 w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none" />
      <button type="button" onClick={recommend} className="tap mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary py-3 font-display text-sm text-primary"><Send size={15} /> 추천곡 올리기</button>
    </section>
    <section className="mt-7 pb-3"><div className="mb-3"><p className="text-[10px] font-bold tracking-[0.18em] text-primary">COMMUNITY PICKS</p><h2 className="mt-1 font-display text-xl">친구들이 추천한 노래</h2></div><div className="space-y-2">{musicRecommendations.length ? musicRecommendations.map((song) => <div key={song.id} className="rounded-2xl bg-card p-4 shadow-card"><p className="font-display text-base">{song.title}</p><p className="text-xs text-muted-foreground">{song.artist} · {song.recommender}</p></div>) : <div className="rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">아직 추천곡이 없어요. 첫 곡을 올려보세요.</div>}</div></section>
  </AppShell>;
}
