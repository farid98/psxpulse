import Link from "next/link";
import type { Opportunity } from "@/data/opportunities";
import { SignalBadge } from "@/components/shared/SignalBadge";
import { MiniSparkline } from "@/components/shared/MiniSparkline";

const categoryColor: Record<Opportunity["category"], string> = {
  Value: "bg-emerald-50 text-emerald-700",
  Growth: "bg-violet-50 text-violet-700",
  Income: "bg-blue-50 text-blue-700",
  Quality: "bg-amber-50 text-amber-700",
  Momentum: "bg-rose-50 text-rose-700",
};

const scoreColor = (s: number) =>
  s >= 7 ? "text-emerald-600" : s >= 4 ? "text-amber-500" : "text-red-500";
const scoreBar = (s: number) =>
  s >= 7 ? "bg-emerald-500" : s >= 4 ? "bg-amber-400" : "bg-red-400";

export function OpportunityCard({ opp }: { opp: Opportunity }) {
  const isUp = opp.change1d > 0;

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden hover:border-stone-300 transition-all">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-stone-500 tabular-nums">
              #{opp.rank}
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-0.5">
              <p className="text-[18px] font-semibold text-stone-900 tracking-[-0.02em]">
                {opp.ticker}
              </p>
              <span className="text-[12px] text-stone-500">{opp.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-stone-400">
                {opp.sector}
              </span>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  categoryColor[opp.category]
                }`}
              >
                {opp.category}
              </span>
              <SignalBadge signal={opp.signal} />
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[18px] font-semibold text-stone-900 tabular-nums tracking-[-0.02em] leading-none">
            {opp.price.toFixed(2)}
          </p>
          <p
            className={`text-[12px] font-semibold tabular-nums mt-1.5 ${
              isUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isUp ? "+" : ""}
            {opp.change1d.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Score strip */}
      <div className="px-5 pb-3 flex items-center gap-3">
        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider shrink-0">
          Composite
        </span>
        <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${scoreBar(opp.compositeScore)}`}
            style={{ width: `${(opp.compositeScore / 10) * 100}%` }}
          />
        </div>
        <span
          className={`text-[14px] font-semibold tabular-nums tracking-tight ${scoreColor(opp.compositeScore)}`}
        >
          {opp.compositeScore.toFixed(1)}
          <span className="text-stone-300 text-[11px] font-medium">/10</span>
        </span>
      </div>

      <div className="mx-5 border-t border-stone-100" />

      {/* Thesis */}
      <div className="px-5 py-4">
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
          Thesis
        </p>
        <p className="text-[13px] text-stone-700 leading-relaxed tracking-[-0.005em] mb-3">
          {opp.thesis}
        </p>
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
          Why now
        </p>
        <p className="text-[12px] text-stone-600 leading-relaxed tracking-[-0.005em] italic">
          {opp.whyNow}
        </p>
      </div>

      <div className="mx-5 border-t border-stone-100" />

      {/* Key metrics + sparkline */}
      <div className="px-5 py-3 grid grid-cols-2 gap-3 items-center">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {opp.keyMetrics.map((m) => (
            <div key={m.label}>
              <p className="text-[10px] text-stone-400 font-medium">{m.label}</p>
              <p
                className={`text-[12px] font-semibold tabular-nums ${
                  m.positive ? "text-emerald-600" : "text-stone-800"
                }`}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
        <div>
          <MiniSparkline data={opp.spark} positive={isUp} height={40} />
          <p className="text-[9px] text-stone-400 mt-1 text-center font-medium uppercase tracking-wider">
            5D
          </p>
        </div>
      </div>

      <div className="mx-5 border-t border-stone-100" />

      {/* Actions */}
      <div className="px-5 py-3 flex items-center gap-2">
        <Link
          href={{ pathname: "/signals", query: { source: "opportunities", ticker: opp.ticker } }}
          className="text-[12px] font-semibold text-white bg-stone-900 px-3 py-1.5 rounded hover:bg-stone-800"
        >
          Analyse →
        </Link>
        <button className="text-[12px] font-medium text-stone-700 border border-stone-200 px-3 py-1.5 rounded hover:bg-stone-50">
          + Portfolio
        </button>
        <button className="text-[12px] font-medium text-stone-500 hover:text-stone-900 ml-auto">
          + Watchlist
        </button>
      </div>
    </div>
  );
}
