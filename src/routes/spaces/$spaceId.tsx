import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, Check, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { AppShell } from "@/components/chaon/AppShell";
import { spaceDetails } from "@/data/spaceDetails";

export const Route = createFileRoute("/spaces/$spaceId")({
  component: SpaceDetail,
});

function SpaceDetail() {
  const { spaceId } = Route.useParams();
  const space = spaceDetails[spaceId];

  if (!space) {
    return (
      <AppShell>
        <div className="py-16 text-center">
          <p className="font-display text-xl">이 놀거리는 아직 준비 중이에요.</p>
          <Link to="/spaces" className="mt-4 inline-flex rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">놀거리로 돌아가기</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link to="/spaces" className="tap mb-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-muted-foreground">
        <ArrowLeft size={17} strokeWidth={2.25} /> 놀거리
      </Link>

      <section className="overflow-hidden rounded-[30px] bg-card shadow-card">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img src={space.photo} alt={space.photoAlt} className="size-full object-cover" loading="eager" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent p-5 pt-16 text-white">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/70">{space.eyebrow}</p>
            <h1 className="mt-1 font-display text-3xl">{space.title}</h1>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{space.description}</p>

          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-primary/8 px-3.5 py-3 text-xs font-bold text-primary">
            <MapPin size={16} /> 대야동 차오름 · 주민센터 2층
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2"><Sparkles size={18} className="text-primary" /><h2 className="font-display text-xl">이렇게 놀아봐</h2></div>
            <div className="mt-3 space-y-2.5">{space.highlights.map((item) => <div key={item} className="flex items-start gap-2.5 rounded-2xl bg-muted/70 p-3.5 text-sm"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={12} strokeWidth={3} /></span>{item}</div>)}</div>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary p-4">
            <p className="font-display text-base">친구랑 같이 할 거라면?</p>
            <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">{space.tips.map((tip) => <li key={tip}>· {tip}</li>)}</ul>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link to="/community" className="tap flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-display text-sm text-primary-foreground shadow-pop"><CalendarPlus size={17} /> 약속 만들기</Link>
            <a href={space.sourceUrl} target="_blank" rel="noreferrer" className="tap flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-muted py-3.5 font-display text-sm"><ExternalLink size={17} /> 관련 정보</a>
          </div>

          <p className="mt-3 text-center text-[10px] text-muted-foreground">사진: {space.sourceLabel} · 외부 참고 이미지</p>
        </div>
      </section>
    </AppShell>
  );
}
