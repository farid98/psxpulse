import { sentimentData, kse100Spark } from "@/data/market";
import { SentimentBar } from "@/components/shared/SentimentBar";
import { MiniSparkline } from "@/components/shared/MiniSparkline";

const supporting = [
  {
    label: "Market Volume",
    value: "312M",
    sub: "+8.6% vs 287M avg",
    trend: "up" as const,
  },
  {
    label: "Adv / Dec",
    value: "224 / 118",
    sub: "+106 net advancers",
    trend: "up" as const,
  },
  {
    label: "News Sentiment",
    value: "Bullish",
    sub: null,
    trend: "up" as const,
    sentiment: true,
  },
];

export function MarketMetrics() {
  return (
    <div className="flex flex-col gap-2">
      {/* Hero tile */}
      <div className="bg-stone-900 rounded-lg px-5 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1">
            KSE-100 · Tue 27 May
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-[42px] font-semibold text-white tabular-nums leading-none tracking-[-0.03em]">
              114,280
            </span>
            <span className="text-[16px] font-semibold text-emerald-400 tabular-nums">
              ▲ +0.68%
            </span>
          </div>
          <p className="text-[12px] text-stone-500 mt-1 tabular-nums">+772 pts today · 11:04 AM PKT</p>
        </div>
        <div className="shrink-0 w-32 sm:w-44">
          <MiniSparkline data={kse100Spark} positive={true} height={44} />
          <p className="text-[9px] text-stone-600 mt-1 text-center font-medium uppercase tracking-wider">
            30D
          </p>
        </div>
      </div>

      {/* Supporting tiles */}
      <div className="grid grid-cols-3 gap-2">
        {supporting.map((m) => {
          const up = m.trend === "up";
          const tint = up ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100";
          const valueColor = up ? "text-emerald-900" : "text-red-900";
          const subColor = up ? "text-emerald-600" : "text-red-500";
          return (
            <div key={m.label} className={`rounded-lg border px-3 py-2.5 ${tint}`}>
              <p className="text-[10px] font-medium text-stone-500 mb-1">{m.label}</p>
              <p className={`text-[16px] font-semibold tabular-nums leading-none tracking-tight ${valueColor}`}>
                {m.value}
              </p>
              {m.sentiment ? (
                <div className="mt-1.5">
                  <SentimentBar
                    bull={sentimentData.bull}
                    neutral={sentimentData.neutral}
                    bear={sentimentData.bear}
                  />
                </div>
              ) : (
                <p className={`text-[10px] font-medium mt-1 ${subColor}`}>{m.sub}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
