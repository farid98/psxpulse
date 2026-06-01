"use client";

import { useState } from "react";
import { sectorsData } from "@/data/sectors";
import { SignalBadge } from "@/components/shared/SignalBadge";
import { ChevronDown } from "lucide-react";

export function SectorSnapshot() {
  const snapshot = sectorsData.slice(0, 7);
  const maxChange = Math.max(...snapshot.map((s) => Math.abs(s.change1d)));
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="bg-amber-800 px-5 py-3.5">
        <h2 className="text-[13px] font-semibold text-white tracking-[-0.01em]">Sector Snapshot</h2>
        <p className="text-[11px] text-amber-300/70 mt-0.5">Tap a sector for the recommendation basis</p>
      </div>
      <div className="divide-y divide-stone-100">
        {snapshot.map((sector) => {
          const isUp = sector.change1d > 0;
          const isFlat = sector.change1d === 0;
          const barWidth = maxChange === 0 ? 0 : (Math.abs(sector.change1d) / maxChange) * 100;
          const expanded = open === sector.name;

          return (
            <div key={sector.name}>
              <button
                onClick={() => setOpen(expanded ? null : sector.name)}
                className="w-full px-5 py-3 hover:bg-stone-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-1 text-[13px] font-medium text-stone-700 tracking-[-0.005em]">
                    {sector.name}
                  </span>
                  <div className="w-20 flex items-center justify-end">
                    <div className="relative w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 h-full rounded-full ${
                          isUp ? "bg-emerald-500 left-0" : isFlat ? "bg-stone-300 left-0" : "bg-red-400 right-0"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-[12px] font-semibold tabular-nums w-12 text-right ${
                      isUp ? "text-emerald-600" : isFlat ? "text-stone-400" : "text-red-500"
                    }`}
                  >
                    {isUp ? "+" : ""}{sector.change1d.toFixed(1)}%
                  </span>
                  <div className="w-14 flex justify-end">
                    <SignalBadge signal={sector.signal} />
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-300 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </div>
              </button>

              {expanded && (
                <div className="px-5 pb-4 bg-stone-50/60 border-t border-stone-100">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider pt-3 mb-1.5">
                    Why {sector.signal}
                  </p>
                  <p className="text-[12px] text-stone-600 leading-relaxed">
                    {sector.summary}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-2 font-medium">
                    Key driver: {sector.keyDriver} · P/E {sector.pe}× · 1W {sector.change1w > 0 ? "+" : ""}{sector.change1w.toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
