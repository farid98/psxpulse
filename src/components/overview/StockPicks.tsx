"use client";

import { useState } from "react";
import { opportunities } from "@/data/opportunities";
import { SignalBadge } from "@/components/shared/SignalBadge";
import { ChevronDown } from "lucide-react";

const scoreColor = (s: number) =>
  s >= 7 ? "text-emerald-600" : s >= 4 ? "text-amber-500" : "text-red-500";

const categoryColor: Record<string, string> = {
  Value: "bg-emerald-50 text-emerald-700",
  Growth: "bg-violet-50 text-violet-700",
  Income: "bg-blue-50 text-blue-700",
  Quality: "bg-amber-50 text-amber-700",
  Momentum: "bg-rose-50 text-rose-700",
};

export function StockPicks() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">Stock Picks</h2>
        <p className="text-[11px] text-stone-400 mt-0.5">Tap any pick for the rationale</p>
      </div>
      <div className="divide-y divide-stone-100">
        {opportunities.map((opp) => {
          const expanded = open === opp.rank;
          const isUp = opp.change1d > 0;
          return (
            <div key={opp.ticker}>
              <button
                onClick={() => setOpen(expanded ? null : opp.rank)}
                className="w-full px-5 py-3 hover:bg-stone-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-stone-400 tabular-nums w-4 shrink-0">
                    {opp.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-stone-900">{opp.ticker}</span>
                      <span className="text-[12px] text-stone-400 truncate">{opp.name}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${categoryColor[opp.category]}`}>
                    {opp.category}
                  </span>
                  <span className={`text-[13px] font-semibold tabular-nums shrink-0 ${scoreColor(opp.compositeScore)}`}>
                    {opp.compositeScore.toFixed(1)}
                  </span>
                  <SignalBadge signal={opp.signal} />
                  <span className={`text-[12px] font-semibold tabular-nums w-10 text-right shrink-0 ${isUp ? "text-emerald-600" : "text-red-500"}`}>
                    {isUp ? "+" : ""}{opp.change1d.toFixed(1)}%
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-300 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </div>
              </button>

              {expanded && (
                <div className="px-5 pb-4 bg-stone-50/60 border-t border-stone-100">
                  <p className="text-[12px] text-stone-700 leading-relaxed pt-3">{opp.thesis}</p>
                  <p className="text-[11px] text-stone-500 leading-relaxed mt-2 italic">{opp.whyNow}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                    {opp.keyMetrics.map((m) => (
                      <div key={m.label}>
                        <span className="text-[10px] text-stone-400">{m.label} </span>
                        <span className={`text-[11px] font-semibold ${m.positive ? "text-emerald-600" : "text-stone-700"}`}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
