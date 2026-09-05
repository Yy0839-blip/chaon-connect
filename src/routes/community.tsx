import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageTitle } from "@/components/chaon/AppShell";
import { spaces } from "@/data/chaon";
import { useChaon } from "@/lib/chaon-store";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "커뮤니티 · 지금 다들 뭐 해? | 차온 CHAON" },
      {
        name: "description",
        content: "차오름에 온 친구들이 오늘 뭘 했는지 구경하고, 내 이야기도 남겨보세요.",
      },
      { property: "og:title", content: "커뮤니티 · 지금 다들 뭐 해?" },
      { property: "og:description", content: "차오름 친구들의 오늘 이야기." },
    ],
  }),
  component: Community,
});

function Community() {
  const { posts, addPost, toggleLike, nickname, avatar } = useChaon();
  const [text, setText] = useState("");
  const [place, setPlace] = useState(spaces[0]!.name);

  return (
    <AppShell>
      <PageTitle kicker="CHAON COMMUNITY" title="지금 다들 뭐 해?" sub="차오름에서 있었던 일 자랑하기" />

      <div className="rise mt-5 rounded-3xl bg-card p-4 shadow-card">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-sky/60 text-base">{avatar}</span>
          <span className="text-sm font-bold">{nickname || "익명의 차오름러"}</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 140))}
          placeholder="오늘 차오름에서 뭐 했어?"
          rows={3}
          className="mt-3 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {spaces.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPlace(s.name)}
              className={`tap rounded-full px-3 py-1.5 text-xs font-bold ${
                place === s.name ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={!text.trim()}
          onClick={() => {
            addPost(text.trim(), place);
            setText("");
            toast.success("올렸어! +5 포인트 🎉");
          }}
          className="tap bg-sunrise mt-3 w-full rounded-2xl py-3.5 font-display text-base text-primary-foreground disabled:opacity-40"
        >
          올리기
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {posts.map((p) => (
          <article key={p.id} className="rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-muted text-base">{p.avatar}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold leading-tight">{p.nickname}</span>
                <span className="block text-[11px] text-muted-foreground">
                  {p.place} · {p.time}
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{p.text}</p>
            <div className="mt-3 flex gap-4 text-xs font-bold text-muted-foreground">
              <button
                type="button"
                onClick={() => toggleLike(p.id)}
                className={`tap ${p.liked ? "text-primary" : ""}`}
              >
                ♥ {p.likes}
              </button>
              <span>💬 {p.comments}</span>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
