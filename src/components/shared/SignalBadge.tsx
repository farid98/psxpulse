import type { Signal } from "@/types";

interface SignalBadgeProps {
  signal: Signal;
}

const signalStyles: Record<Signal, string> = {
  "Strong Buy": "bg-emerald-600 text-white",
  Buy: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60",
  Hold: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60",
  Reduce: "bg-red-50 text-red-600 ring-1 ring-red-200/60",
  Sell: "bg-red-600 text-white",
};

export function SignalBadge({ signal }: SignalBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[-0.005em] ${signalStyles[signal]}`}
    >
      {signal}
    </span>
  );
}
