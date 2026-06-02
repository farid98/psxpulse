"use client";

import { useState } from "react";
import { marketEvents, impactSectors, type ImpactScore, type MarketEvent } from "@/data/impact";
import { ChevronDown } from "lucide-react";

type Filter = "All" | "Macro" | "Policy" | "Sector" | "Global";
const filters: Filter[] = ["All", "Macro", "Policy", "Sector", "Global"];

const categoryColor: Record<string, string> = {
  Macro:  "bg-blue-50 text-blue-700",
  Policy: "bg-violet-50 text-violet-700",
  Sector: "bg-amber-50 text-amber-700",
  Global: "bg-stone-100 text-stone-600",
};

function ImpactDot({ score }: { score: ImpactScore }) {
  if (score === null) return <span className="text-stone-300 text-[12px]">–</span>;
  const styles: Record<number, string> = {
    2:  "bg-emerald-600 ring-2 ring-emerald-200",
    1:  "bg-emerald-400",
    0:  "bg-stone-200",
    [-1]: "bg-red-300",
    [-2]: "bg-red-600 ring-2 ring-red-200",
  };
  const labels: Record<number, string> = { 2: "Strong +", 1: "+", 0: "Neutral", [-1]: "–", [-2]: "Strong –" };
  return (
    <span
      title={labels[score]}
      className={`inline-block w-3.5 h-3.5 rounded-full ${styles[score]}`}
    />
  );
}

function DrillDown({ event, sector }: { event: MarketEvent; sector: string }) {
  const impact = event.sectorImpacts[sector];
  if (!impact) return null;
  return (
    <div className="bg-stone-50 border-t border-stone-100 px-4 py-3">
      <p className="text-[11px] text-stone-600 mb-2 leading-snug">{impact.reason}</p>
      {impact.stocks.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {impact.stocks.map((s) => (
            <div key={s.ticker} className="flex items-start gap-2">
              <span className="text-[11px] font-semibold text-stone-800 w-12 shrink-0">{s.ticker}</span>
              <ImpactDot score={s.score} />
              <span className="text-[11px] text-stone-500 leading-snug">{s.note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ImpactMatrix() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeCell, setActiveCell] = useState<{ eventId: string; sector: string } | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const visible = filter === "All" ? marketEvents : marketEvents.filter((e) => e.category === filter);

  function toggleCell(eventId: string, sector: string) {
    const same = activeCell?.eventId === eventId && activeCell?.sector === sector;
    setActiveCell(same ? null : { eventId, sector });
  }

  function toggleEvent(eventId: string) {
    setExpandedEvent((prev) => (prev === eventId ? null : eventId));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
              filter === f
                ? "bg-stone-900 border-stone-900 text-white"
                : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Matrix */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]" style={{ minWidth: 700 }}>
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-wider w-52">
                  Event
                </th>
                {impactSectors.map((s) => (
                  <th key={s} className="px-2 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-wider text-center whitespace-nowrap">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((event) => (
                <>
                  <tr key={event.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                    <td className="px-4 py-3 align-top">
                      <button
                        onClick={() => toggleEvent(event.id)}
                        className="text-left w-full group"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${categoryColor[event.category]}`}>
                            {event.category}
                          </span>
                          <span className="text-[10px] text-stone-400 tabular-nums">{event.date}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <p className="text-[12px] font-medium text-stone-800 leading-snug flex-1">{event.headline}</p>
                          <ChevronDown
                            className={`w-3 h-3 text-stone-300 shrink-0 mt-0.5 transition-transform duration-150 ${expandedEvent === event.id ? "rotate-180" : ""}`}
                            strokeWidth={2}
                          />
                        </div>
                      </button>
                    </td>
                    {impactSectors.map((sector) => {
                      const impact = event.sectorImpacts[sector];
                      const isActive = activeCell?.eventId === event.id && activeCell?.sector === sector;
                      const hasStocks = impact && impact.stocks.length > 0;
                      return (
                        <td key={sector} className="px-2 py-3 text-center align-middle">
                          <button
                            onClick={() => impact && toggleCell(event.id, sector)}
                            className={`inline-flex items-center justify-center gap-1 rounded px-1.5 py-1 transition-colors ${
                              impact ? "hover:bg-stone-100 cursor-pointer" : "cursor-default"
                            } ${isActive ? "bg-stone-100" : ""}`}
                          >
                            <ImpactDot score={impact?.score ?? null} />
                            {hasStocks && (
                              <ChevronDown
                                className={`w-2.5 h-2.5 text-stone-400 transition-transform ${isActive ? "rotate-180" : ""}`}
                                strokeWidth={2}
                              />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                  {expandedEvent === event.id && (
                    <tr key={`${event.id}-detail`} className="border-b border-stone-100">
                      <td colSpan={impactSectors.length + 1} className="px-4 py-3 bg-stone-50 border-t border-stone-100">
                        <p className="text-[12px] text-stone-600 leading-relaxed">{event.detail}</p>
                      </td>
                    </tr>
                  )}
                  {activeCell?.eventId === event.id && (
                    <tr key={`${event.id}-drill`} className="border-b border-stone-100">
                      <td colSpan={impactSectors.length + 1} className="p-0">
                        <div className="px-4 py-1 bg-stone-50 border-t border-stone-100">
                          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider pt-2 mb-2">
                            {activeCell.sector} — detail
                          </p>
                          <DrillDown event={event} sector={activeCell.sector} />
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Impact scale</span>
        {[
          { score: 2 as ImpactScore, label: "Strong +" },
          { score: 1 as ImpactScore, label: "Positive" },
          { score: 0 as ImpactScore, label: "Neutral" },
          { score: -1 as ImpactScore, label: "Negative" },
          { score: -2 as ImpactScore, label: "Strong –" },
        ].map(({ score, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <ImpactDot score={score} />
            <span className="text-[11px] text-stone-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
