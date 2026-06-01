"use client";

import { useState } from "react";
import { fundamentalsByTicker, stockOptions } from "@/data/fundamentals";
import { FundamentalHero } from "./FundamentalHero";
import { RatioGroup } from "./RatioGroup";
import { FinancialTrend } from "./FinancialTrend";
import { DividendHistory } from "./DividendHistory";
import { PeerComparison } from "./PeerComparison";

export function FundamentalsView() {
  const [selected, setSelected] = useState("ENGRO");
  const data = fundamentalsByTicker[selected];

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white border border-stone-200/80 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.12em]">
            Select stock
          </span>
          <span className="text-[10px] text-stone-300">
            {stockOptions.length} available · click any to view fundamentals
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stockOptions.map((s) => {
            const isActive = s.ticker === selected;
            const isUp = s.change > 0;
            return (
              <button
                key={s.ticker}
                onClick={() => setSelected(s.ticker)}
                className={`group relative flex items-center gap-3 px-3.5 py-2 rounded-lg border transition-all duration-150 ${
                  isActive
                    ? "bg-stone-900 border-stone-900 text-white"
                    : "bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50 text-stone-700"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[13px] font-semibold tracking-[-0.01em] ${
                      isActive ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {s.ticker}
                  </p>
                  <p
                    className={`text-[10px] font-medium uppercase tracking-wider ${
                      isActive ? "text-stone-400" : "text-stone-400"
                    }`}
                  >
                    {s.sector}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-[12px] font-semibold tabular-nums leading-tight ${
                      isActive ? "text-white" : "text-stone-700"
                    }`}
                  >
                    {s.price.toFixed(2)}
                  </p>
                  <p
                    className={`text-[10px] font-semibold tabular-nums leading-tight ${
                      isActive
                        ? isUp
                          ? "text-emerald-300"
                          : "text-red-300"
                        : isUp
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {isUp ? "+" : ""}
                    {s.change.toFixed(1)}%
                  </p>
                </div>
                {isActive && (
                  <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <FundamentalHero data={data} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RatioGroup title="Valuation" ratios={data.valuation} />
        <RatioGroup title="Profitability" ratios={data.profitability} />
        <RatioGroup title="Growth" ratios={data.growth} />
        <RatioGroup title="Financial Health" ratios={data.health} />
      </div>

      <FinancialTrend fiveYear={data.fiveYear} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DividendHistory dividends={data.dividends} />
        <PeerComparison peers={data.peers} sectorName={data.sector} />
      </div>
    </div>
  );
}
