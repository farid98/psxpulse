import type { SignalsProfile } from "@/data/signals";

const statusColor = {
  good: "text-emerald-600",
  neutral: "text-stone-700",
  bad: "text-red-500",
} as const;

const statusDot = {
  good: "bg-emerald-500",
  neutral: "bg-stone-300",
  bad: "bg-red-400",
} as const;

export function FundamentalPanel({ data }: { data: SignalsProfile }) {
  const f = data.fundamental;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Metrics - 2 cols */}
      <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Core Metrics vs Sector
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">{f.summary}</p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-stone-100">
          {f.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`px-5 py-3.5 ${
                i < f.metrics.length - 2 ? "border-b border-stone-100" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-1 h-1 rounded-full ${statusDot[m.status]}`} />
                <span className="text-[11px] font-medium text-stone-500">{m.label}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span
                  className={`text-[18px] font-semibold tabular-nums tracking-tight ${
                    statusColor[m.status]
                  }`}
                >
                  {m.value}
                </span>
                <span className="text-[10px] text-stone-400 tabular-nums">
                  Sector {m.sectorAvg}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Key Highlights
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">Strengths and concerns</p>
        </div>
        <div className="px-5 py-3 space-y-2.5">
          {f.highlights.map((h, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span
                className={`text-[11px] font-bold w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                  h.type === "+"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {h.type}
              </span>
              <p className="text-[12px] text-stone-700 leading-snug tracking-[-0.005em]">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
