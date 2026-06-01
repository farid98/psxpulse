"use client";

import { useState } from "react";
import { presetScans, scanResults } from "@/data/scanner";
import { SignalBadge } from "@/components/shared/SignalBadge";
import { MiniSparkline } from "@/components/shared/MiniSparkline";

const categoryColor: Record<string, string> = {
  Momentum: "bg-emerald-50 text-emerald-700",
  Reversal: "bg-violet-50 text-violet-700",
  Trend: "bg-blue-50 text-blue-700",
  Volume: "bg-amber-50 text-amber-700",
};

const categoryColorActive: Record<string, string> = {
  Momentum: "bg-emerald-600 text-white",
  Reversal: "bg-violet-600 text-white",
  Trend: "bg-blue-600 text-white",
  Volume: "bg-amber-500 text-white",
};

export function ScannerView() {
  const [activeId, setActiveId] = useState(
    presetScans.find((s) => s.active)?.id ?? presetScans[0].id
  );
  const active = presetScans.find((s) => s.id === activeId) ?? presetScans[0];
  const scanIndex = presetScans.findIndex((s) => s.id === activeId);
  const offset = scanIndex % scanResults.length;
  const rotated = [...scanResults.slice(offset), ...scanResults.slice(0, offset)];
  const results = rotated.slice(0, active.matches);

  return (
    <div className="flex flex-col gap-4">
      {/* Scan pills */}
      <div className="flex flex-wrap gap-2">
        {presetScans.map((scan) => {
          const isActive = scan.id === activeId;
          return (
            <button
              key={scan.id}
              onClick={() => setActiveId(scan.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-all duration-150 ${
                isActive
                  ? "bg-stone-900 border-stone-900 text-white"
                  : "bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900"
              }`}
            >
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isActive ? "bg-white/20 text-white" : categoryColor[scan.category]
                }`}
              >
                {scan.category}
              </span>
              {scan.name}
              <span className={`tabular-nums text-[11px] ${isActive ? "text-stone-300" : "text-stone-400"}`}>
                {scan.matches}
              </span>
            </button>
          );
        })}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-[12px] font-medium text-stone-400 hover:text-stone-600 hover:border-stone-400 transition-colors">
          + Custom
        </button>
      </div>

      {/* Active scan context */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${categoryColor[active.category]}`}>
              {active.category}
            </span>
            <span className="text-[13px] font-semibold text-stone-900">{active.name}</span>
          </div>
          <p className="text-[12px] text-stone-400">{active.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {active.criteria.map((c) => (
              <span key={c} className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Symbol</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Price</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">1D</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">RSI</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Vol×</th>
                <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Pattern</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Signal</th>
                <th className="text-right px-5 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider w-[120px]">5D</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {results.map((r) => {
                const isUp = r.change1d > 0;
                return (
                  <tr key={r.ticker} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-stone-900">{r.ticker}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{r.sector}</p>
                    </td>
                    <td className="px-3 py-3 text-right text-stone-700 font-semibold tabular-nums">{r.price.toFixed(2)}</td>
                    <td className={`px-3 py-3 text-right font-semibold tabular-nums ${isUp ? "text-emerald-600" : "text-red-500"}`}>
                      {isUp ? "+" : ""}{r.change1d.toFixed(1)}%
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      <span className={r.rsi >= 70 ? "text-red-500" : r.rsi <= 30 ? "text-blue-500" : "text-stone-700"}>
                        {r.rsi}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      <span className="inline-flex items-center text-[11px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                        {r.volMultiple.toFixed(1)}×
                      </span>
                    </td>
                    <td className="px-3 py-3 text-stone-600 text-[12px]">{r.pattern}</td>
                    <td className="px-3 py-3 text-right"><SignalBadge signal={r.signal} /></td>
                    <td className="px-5 py-3 w-[120px]">
                      <div className="ml-auto" style={{ width: 100 }}>
                        <MiniSparkline data={r.spark} positive={isUp} height={24} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
