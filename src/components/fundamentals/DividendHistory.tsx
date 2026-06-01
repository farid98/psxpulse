import type { DividendYear } from "@/data/fundamentals";

interface Props {
  dividends: DividendYear[];
}

export function DividendHistory({ dividends }: Props) {
  const maxDiv = Math.max(...dividends.map((y) => y.divPerShare));

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Dividend History
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">DPS and payout ratio · 5 years</p>
      </div>
      <div className="px-5 py-5">
        <div className="flex items-end gap-4 h-32 mb-3">
          {dividends.map((y) => {
            const h = (y.divPerShare / maxDiv) * 100;
            return (
              <div key={y.fy} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-semibold text-stone-700 tabular-nums">
                  {y.divPerShare.toFixed(1)}
                </span>
                <div className="w-full relative bg-stone-100 rounded-t-sm" style={{ height: 90 }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-emerald-500/85 rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-stone-400 tabular-nums">{y.fy}</span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-stone-100 pt-3 flex justify-between text-[11px]">
          <div>
            <p className="text-stone-400">5Y Avg DPS</p>
            <p className="text-stone-800 font-semibold tabular-nums">
              {(dividends.reduce((a, b) => a + b.divPerShare, 0) / dividends.length).toFixed(1)} PKR
            </p>
          </div>
          <div className="text-center">
            <p className="text-stone-400">Latest Payout</p>
            <p className="text-stone-800 font-semibold tabular-nums">
              {dividends[dividends.length - 1].payoutRatio}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-stone-400">DPS Growth (5Y)</p>
            <p className="text-emerald-600 font-semibold tabular-nums">
              +
              {(
                ((dividends[dividends.length - 1].divPerShare - dividends[0].divPerShare) /
                  dividends[0].divPerShare) *
                100
              ).toFixed(0)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
