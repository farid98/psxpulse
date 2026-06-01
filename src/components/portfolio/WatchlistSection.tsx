import Link from "next/link";
import { watchlist } from "@/data/portfolio";

export function WatchlistSection() {
  if (watchlist.length === 0) return null;

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Watchlist
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">
          Tracking but not owned · {watchlist.length} stocks
        </p>
      </div>
      <div className="divide-y divide-stone-100">
        {watchlist.map((w) => {
          const isUp = w.change1d > 0;
          return (
            <div
              key={w.ticker}
              className="px-6 py-3 hover:bg-stone-50/70 transition-colors flex items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold text-stone-900 tracking-[-0.01em]">
                    {w.ticker}
                  </p>
                  <span className="text-[11px] text-stone-400">{w.name}</span>
                </div>
                {w.note && (
                  <p className="text-[11px] text-stone-500 mt-0.5 italic">
                    “{w.note}”
                  </p>
                )}
              </div>
              <p className="text-[13px] font-semibold text-stone-900 tabular-nums w-20 text-right">
                {w.currentPrice.toFixed(2)}
              </p>
              <p
                className={`text-[12px] font-semibold tabular-nums w-14 text-right ${
                  isUp ? "text-emerald-600" : w.change1d < 0 ? "text-red-500" : "text-stone-400"
                }`}
              >
                {isUp ? "+" : ""}
                {w.change1d.toFixed(1)}%
              </p>
              <Link
                href={{ pathname: "/signals", query: { source: "portfolio", ticker: w.ticker } }}
                className="text-[11px] font-medium text-stone-700 border border-stone-200 px-2.5 py-1 rounded hover:bg-stone-50 hover:border-stone-300"
              >
                Analyse →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
