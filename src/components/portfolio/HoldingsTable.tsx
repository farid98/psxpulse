"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { holdings } from "@/data/portfolio";

export function HoldingsTable() {
  const router = useRouter();
  const [showManage, setShowManage] = useState(false);
  const equityValue = holdings.reduce((s, h) => s + h.shares * h.currentPrice, 0);

  return (
    <>
      {showManage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
          onClick={() => setShowManage(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[15px] font-semibold text-stone-900 tracking-[-0.01em] mb-2">
              Manage Portfolio
            </h2>
            <p className="text-[13px] text-stone-500 leading-relaxed">
              This will be a dedicated area to add or remove stocks in your portfolio, or to set guidelines for the algorithm to do so automatically.
            </p>
            <button
              onClick={() => setShowManage(false)}
              className="mt-5 text-[12px] font-medium text-stone-600 border border-stone-200 px-3 py-1.5 rounded hover:bg-stone-50 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100 flex items-baseline justify-between">
        <div>
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Holdings
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {holdings.length} active positions
          </p>
        </div>
        <button
          onClick={() => setShowManage(true)}
          className="text-[11px] font-medium text-white bg-stone-900 px-2.5 py-1 rounded hover:bg-stone-800"
        >
          Manage Portfolio
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-stone-100 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              <th className="text-left px-6 py-2.5">Position</th>
              <th className="text-right px-3 py-2.5">Shares</th>
              <th className="text-right px-3 py-2.5">Avg Cost</th>
              <th className="text-right px-3 py-2.5">Price</th>
              <th className="text-right px-3 py-2.5">Day</th>
              <th className="text-right px-3 py-2.5">Market Value</th>
              <th className="text-right px-3 py-2.5">Unrealised P&L</th>
              <th className="text-right px-6 py-2.5">Weight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {holdings.map((h) => {
              const mv = h.shares * h.currentPrice;
              const cost = h.shares * h.avgCost;
              const pl = mv - cost;
              const plPct = (pl / cost) * 100;
              const weight = (mv / equityValue) * 100;
              const dayUp = h.change1d > 0;
              const plUp = pl > 0;
              return (
                <tr
                  key={h.ticker}
                  onClick={() => router.push(`/signals?ticker=${h.ticker}`)}
                  className="hover:bg-stone-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-3.5">
                    <p className="font-semibold text-stone-900 tracking-[-0.01em]">{h.ticker}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {h.name} · since {h.entryDate}
                    </p>
                  </td>
                  <td className="px-3 py-3.5 text-right text-stone-700 tabular-nums font-medium">
                    {h.shares.toLocaleString()}
                  </td>
                  <td className="px-3 py-3.5 text-right text-stone-500 tabular-nums">
                    {h.avgCost.toFixed(2)}
                  </td>
                  <td className="px-3 py-3.5 text-right text-stone-900 tabular-nums font-semibold">
                    {h.currentPrice.toFixed(2)}
                  </td>
                  <td
                    className={`px-3 py-3.5 text-right tabular-nums font-semibold ${
                      dayUp ? "text-emerald-600" : h.change1d < 0 ? "text-red-500" : "text-stone-400"
                    }`}
                  >
                    {dayUp ? "+" : ""}{h.change1d.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3.5 text-right text-stone-700 tabular-nums font-medium">
                    {mv.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    <p className={`font-semibold ${plUp ? "text-emerald-600" : "text-red-500"}`}>
                      {plUp ? "+" : ""}{pl.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </p>
                    <p className={`text-[10px] ${plUp ? "text-emerald-600" : "text-red-500"}`}>
                      {plUp ? "+" : ""}{plPct.toFixed(1)}%
                    </p>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-10 h-1 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-stone-700 rounded-full"
                          style={{ width: `${weight}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-stone-600 font-semibold tabular-nums w-7">
                        {weight.toFixed(0)}%
                      </span>
                      <span className="text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity text-[12px]">
                        →
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
