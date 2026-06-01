import type { SignalsProfile } from "@/data/signals";
import { MiniSparkline } from "@/components/shared/MiniSparkline";

const signalStyle = {
  bull: "text-emerald-600 bg-emerald-50",
  bear: "text-red-500 bg-red-50",
  neutral: "text-stone-500 bg-stone-100",
} as const;

const strengthDot = {
  strong: "bg-stone-900",
  moderate: "bg-stone-500",
  weak: "bg-stone-300",
} as const;

export function TechnicalPanel({ data }: { data: SignalsProfile }) {
  const t = data.technical;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Price chart + summary - spans 2 cols */}
      <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 flex items-baseline justify-between">
          <div>
            <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
              60-Day Price & Signal Summary
            </h2>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Daily closes · {t.priceHistory.length} sessions
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">High</p>
            <p className="text-[12px] font-semibold text-stone-700 tabular-nums">
              {Math.max(...t.priceHistory).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="px-5 pt-4 pb-2">
          <MiniSparkline data={t.priceHistory} positive={data.change >= 0} height={120} />
        </div>
        <div className="px-5 py-3 border-t border-stone-100">
          <p className="text-[13px] text-stone-700 leading-relaxed tracking-[-0.005em]">
            {t.summary}
          </p>
        </div>
      </div>

      {/* Patterns */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Detected Patterns
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">Ranked by confidence</p>
        </div>
        <div className="px-5 py-3 space-y-3">
          {t.patterns.map((p) => (
            <div key={p.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      p.bullish ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {p.bullish ? "Bull" : "Bear"}
                  </span>
                  <span className="text-[13px] text-stone-700 font-medium">{p.name}</span>
                </div>
                <span className="text-[11px] text-stone-500 font-semibold tabular-nums">
                  {p.confidence}%
                </span>
              </div>
              <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.bullish ? "bg-emerald-500" : "bg-red-400"}`}
                  style={{ width: `${p.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators grid */}
      <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Key Indicators
          </h2>
        </div>
        <div className="grid grid-cols-2 divide-x divide-stone-100">
          {t.indicators.map((ind, i) => (
            <div
              key={ind.label}
              className={`px-5 py-3 ${
                i < t.indicators.length - 2 ? "border-b border-stone-100" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-stone-500">{ind.label}</span>
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    signalStyle[ind.signal]
                  }`}
                >
                  {ind.signal}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[14px] font-semibold text-stone-900 tabular-nums">
                  {ind.value}
                </span>
                {ind.hint && <span className="text-[10px] text-stone-400">· {ind.hint}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support / Resistance */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Levels
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">Support and resistance</p>
        </div>
        <div className="divide-y divide-stone-100">
          {t.levels.map((lv, i) => (
            <div key={i} className="px-5 py-2.5 flex items-center gap-3">
              <span className={`w-1 h-3 rounded-full ${strengthDot[lv.strength]}`} />
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  lv.type === "Resistance" ? "text-red-500" : "text-emerald-600"
                }`}
              >
                {lv.type[0]}
              </span>
              <span className="flex-1 text-[12px] text-stone-500 capitalize">{lv.strength}</span>
              <span className="text-[13px] font-semibold text-stone-800 tabular-nums">
                {lv.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
