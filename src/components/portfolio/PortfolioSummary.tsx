import { holdings, cashPosition } from "@/data/portfolio";

export function PortfolioSummary() {
  const equityValue = holdings.reduce((s, h) => s + h.shares * h.currentPrice, 0);
  const costBasis = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
  const totalValue = equityValue + cashPosition;
  const totalPL = equityValue - costBasis;
  const totalPLPct = (totalPL / costBasis) * 100;
  const dayPL = holdings.reduce(
    (s, h) => s + h.shares * h.currentPrice * (h.change1d / 100),
    0
  );
  const dayPLPct = (dayPL / equityValue) * 100;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-stone-100 grid grid-cols-1 md:grid-cols-4 divide-x divide-stone-100">
        <div className="md:pr-6">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.12em] mb-1.5">
            Total Value
          </p>
          <p className="text-[28px] font-semibold text-stone-900 tabular-nums leading-none tracking-[-0.02em]">
            PKR {fmt(totalValue)}
          </p>
          <p className="text-[11px] text-stone-500 mt-2 tabular-nums">
            Equity {fmt(equityValue)} · Cash {fmt(cashPosition)}
          </p>
        </div>
        <div className="md:px-6 pt-4 md:pt-0">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.12em] mb-1.5">
            Total Return
          </p>
          <p
            className={`text-[28px] font-semibold tabular-nums leading-none tracking-[-0.02em] ${
              totalPL >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {totalPL >= 0 ? "+" : ""}
            {fmt(totalPL)}
          </p>
          <p
            className={`text-[11px] mt-2 tabular-nums font-semibold ${
              totalPL >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {totalPLPct >= 0 ? "+" : ""}
            {totalPLPct.toFixed(2)}% lifetime
          </p>
        </div>
        <div className="md:px-6 pt-4 md:pt-0">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.12em] mb-1.5">
            Today
          </p>
          <p
            className={`text-[28px] font-semibold tabular-nums leading-none tracking-[-0.02em] ${
              dayPL >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {dayPL >= 0 ? "+" : ""}
            {fmt(dayPL)}
          </p>
          <p
            className={`text-[11px] mt-2 tabular-nums font-semibold ${
              dayPL >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {dayPLPct >= 0 ? "+" : ""}
            {dayPLPct.toFixed(2)}% vs KSE +0.68%
          </p>
        </div>
        <div className="md:pl-6 pt-4 md:pt-0">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.12em] mb-1.5">
            Positions
          </p>
          <p className="text-[28px] font-semibold text-stone-900 tabular-nums leading-none tracking-[-0.02em]">
            {holdings.length}
          </p>
          <p className="text-[11px] text-stone-500 mt-2">
            {new Set(holdings.map((h) => h.sector)).size} sectors · cash 11.5%
          </p>
        </div>
      </div>
    </div>
  );
}
