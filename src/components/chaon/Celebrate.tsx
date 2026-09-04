import { useEffect } from "react";

export type CelebrateData = { point: number; badge?: string | undefined };

const confetti = [
  { tx: "-70px", ty: "-90px", r: "220deg", c: "var(--primary)" },
  { tx: "60px", ty: "-110px", r: "-180deg", c: "var(--sky)" },
  { tx: "95px", ty: "-50px", r: "300deg", c: "var(--lime)" },
  { tx: "-100px", ty: "-40px", r: "120deg", c: "var(--navy)" },
  { tx: "10px", ty: "-130px", r: "160deg", c: "var(--primary)" },
  { tx: "-40px", ty: "-120px", r: "-90deg", c: "var(--lime)" },
];

export function Celebrate({ data, onClose }: { data: CelebrateData | null; onClose: () => void }) {
  useEffect(() => {
    if (!data) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-navy/45 px-8 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div className="popin relative w-full max-w-[300px] rounded-3xl bg-card p-6 text-center shadow-pop">
        <div className="pointer-events-none absolute inset-x-0 top-10 grid place-items-center">
          {confetti.map((c, i) => (
            <span
              key={i}
              className="absolute size-2.5 rounded-[3px]"
              style={
                {
                  background: c.c,
                  ["--tx" as string]: c.tx,
                  ["--ty" as string]: c.ty,
                  ["--r" as string]: c.r,
                  animation: `chaon-confetti 1.1s ${i * 0.05}s ease-out forwards`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="text-5xl">🎉</div>
        <p className="mt-3 font-display text-2xl">미션 완료!</p>
        <p className="mt-1 font-display text-xl text-primary">+{data.point} CHAON POINT</p>
        {data.badge ? (
          <p className="mt-3 inline-block rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-lime-foreground">
            🏅 배지 획득 · {data.badge}
          </p>
        ) : null}
      </div>
    </div>
  );
}
