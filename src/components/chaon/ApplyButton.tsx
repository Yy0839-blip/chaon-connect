import { toast } from "sonner";

export function ApplyButton({
  joined,
  onToggle,
  labelIdle = "참여 신청하기",
  labelJoined = "신청 취소",
  disabled = false,
  disabledLabel = "마감됐어",
  tone = "primary",
}: {
  joined: boolean;
  onToggle: () => boolean;
  labelIdle?: string;
  labelJoined?: string;
  disabled?: boolean;
  disabledLabel?: string;
  tone?: "primary" | "lime";
}) {
  const idleCls = tone === "lime" ? "bg-lime text-lime-foreground" : "bg-sunrise text-primary-foreground";

  return (
    <button
      type="button"
      disabled={disabled && !joined}
      aria-pressed={joined}
      onClick={() => {
        const isJoined = onToggle();
        toast[isJoined ? "success" : "info"](isJoined ? "신청 완료! 그날 보자 🎉" : "신청을 취소했어");
      }}
      className={`tap min-h-[52px] w-full rounded-2xl py-3.5 font-display text-base shadow-card disabled:opacity-40 ${
        joined ? "bg-muted text-foreground" : idleCls
      }`}
    >
      {disabled && !joined ? disabledLabel : joined ? labelJoined : labelIdle}
    </button>
  );
}
