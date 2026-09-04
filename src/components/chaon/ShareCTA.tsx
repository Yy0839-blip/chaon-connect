import { toast } from "sonner";

export function shareChaon(text: string) {
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const payload = `${text}\n차온에서 보기 👉 ${url}`;
  if (typeof navigator !== "undefined" && navigator.share) {
    navigator.share({ title: "차온", text, url }).catch(() => undefined);
    return;
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(payload).then(
      () => toast.success("초대 메시지를 복사했어! 친구한테 붙여넣기 하기 📎"),
      () => toast.error("복사에 실패했어. 다시 해볼래?"),
    );
    return;
  }
  toast.info(payload);
}

export function ShareCTA({
  label = "친구랑 같이 갈래?",
  message = "나 지금 차오름 갈 건데 같이 갈래?",
  tone = "lime",
}: {
  label?: string;
  message?: string;
  tone?: "lime" | "navy" | "outline";
}) {
  const cls =
    tone === "lime"
      ? "bg-lime text-lime-foreground"
      : tone === "navy"
        ? "bg-navy text-navy-foreground"
        : "border border-border bg-card text-foreground";
  return (
    <button
      type="button"
      onClick={() => shareChaon(message)}
      className={`tap w-full rounded-2xl py-3.5 font-display text-base shadow-card ${cls}`}
    >
      {label} →
    </button>
  );
}
