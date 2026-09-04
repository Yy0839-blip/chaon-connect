import { useState } from "react";
import { useChaon } from "@/lib/chaon-store";

const avatars = ["🐤", "🐻", "🥔", "👻", "🍿", "🐸", "🦊", "🐼"];

export function Onboarding() {
  const { ready, nickname, setProfile } = useChaon();
  const [value, setValue] = useState("");
  const [avatar, setAvatar] = useState("🐤");

  if (!ready || nickname) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-navy/50 backdrop-blur-sm sm:place-items-center">
      <div className="popin w-full max-w-[430px] rounded-t-[32px] bg-card p-6 pb-8 shadow-pop sm:rounded-[32px]">
        <p className="text-[11px] font-bold tracking-[0.24em] text-muted-foreground">WELCOME TO CHAON</p>
        <h2 className="mt-2 font-display text-3xl leading-tight">
          차온에 오신 걸<br />
          환영해! 🎈
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          닉네임만 정하면 바로 둘러볼 수 있어. 실명은 쓰지 않아도 돼요.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {avatars.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className={`tap grid size-11 place-items-center rounded-2xl text-xl ${
                avatar === a ? "bg-lime ring-2 ring-primary" : "bg-muted"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 12))}
          placeholder="닉네임 (예: 달려라감자)"
          className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base outline-none focus:border-primary"
        />

        <button
          type="button"
          disabled={!value.trim()}
          onClick={() => setProfile(value.trim(), avatar)}
          className="tap bg-sunrise mt-3 w-full rounded-2xl py-4 font-display text-lg text-primary-foreground shadow-pop disabled:opacity-40"
        >
          시작하기
        </button>
        <button
          type="button"
          onClick={() => setProfile("익명의 차오름러", avatar)}
          className="mt-2 w-full py-2 text-xs font-bold text-muted-foreground"
        >
          그냥 둘러볼래
        </button>
      </div>
    </div>
  );
}
