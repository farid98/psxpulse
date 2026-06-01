import type { FundamentalProfile } from "@/data/fundamentals";

interface Props {
  data: FundamentalProfile;
}

export function FundamentalHero({ data }: Props) {
  const isUp = data.change > 0;

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="text-[28px] font-semibold text-stone-900 tracking-[-0.02em] leading-none">
              {data.ticker}
            </h2>
            <span className="text-[15px] text-stone-500">{data.name}</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-1.5">
            {data.sector}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[28px] font-semibold text-stone-900 tabular-nums leading-none tracking-[-0.02em]">
            {data.price.toFixed(2)}
          </p>
          <div className="flex items-center justify-end gap-2 mt-2">
            <span
              className={`text-[13px] font-semibold tabular-nums ${
                isUp ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {isUp ? "▲ +" : "▼ "}
              {Math.abs(data.change).toFixed(1)}%
            </span>
            <span className="text-[12px] text-stone-400">Today</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">
            Mkt Cap{" "}
            <span className="font-semibold text-stone-600 tabular-nums">{data.marketCap}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-stone-100">
        <p className="text-[11px] text-stone-500">
          <span className="font-medium">Source:</span> Company filings · {data.asOf}
        </p>
      </div>
    </div>
  );
}
