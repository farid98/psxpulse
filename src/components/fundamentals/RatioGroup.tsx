import type { FundamentalRatio } from "@/data/fundamentals";

interface RatioGroupProps {
  title: string;
  ratios: FundamentalRatio[];
}

const statusColor: Record<NonNullable<FundamentalRatio["status"]>, string> = {
  good: "text-emerald-600",
  neutral: "text-stone-700",
  bad: "text-red-500",
};

const statusDot: Record<NonNullable<FundamentalRatio["status"]>, string> = {
  good: "bg-emerald-500",
  neutral: "bg-stone-300",
  bad: "bg-red-400",
};

export function RatioGroup({ title, ratios }: RatioGroupProps) {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-stone-100">
        <h3 className="text-[12px] font-semibold text-stone-900 tracking-[-0.01em]">{title}</h3>
      </div>
      <div className="divide-y divide-stone-100">
        {ratios.map((r) => {
          const color = r.status ? statusColor[r.status] : "text-stone-700";
          const dot = r.status ? statusDot[r.status] : "bg-stone-300";
          return (
            <div key={r.label} className="px-5 py-2.5 flex items-center gap-3">
              <div className={`w-1 h-1 rounded-full shrink-0 ${dot}`} />
              <span className="text-[12px] text-stone-500 flex-1 tracking-[-0.005em]">
                {r.label}
              </span>
              <div className="text-right">
                <div className={`text-[13px] font-semibold tabular-nums tracking-tight ${color}`}>
                  {r.value}
                </div>
                {r.sectorAvg && (
                  <div className="text-[10px] text-stone-400 tabular-nums">
                    Sector {r.sectorAvg}
                  </div>
                )}
                {r.hint && !r.sectorAvg && (
                  <div className="text-[10px] text-stone-400">{r.hint}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
