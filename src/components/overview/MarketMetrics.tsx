import { TrendingUp, BarChart2, Activity, Newspaper } from "lucide-react";
import { sentimentData } from "@/data/market";
import { SentimentBar } from "@/components/shared/SentimentBar";

const metrics = [
  {
    label: "KSE-100",
    value: "114,280",
    sub: "+772 pts",
    subPercent: "+0.68%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    label: "Market Volume",
    value: "312M",
    sub: "vs 287M avg",
    subPercent: "+8.6%",
    trend: "up" as const,
    icon: BarChart2,
  },
  {
    label: "Adv / Dec",
    value: "224 / 118",
    sub: "Net advancers",
    subPercent: "+106",
    trend: "up" as const,
    icon: Activity,
  },
  {
    label: "News Sentiment",
    value: "Bullish",
    sub: "Past 24 hours",
    subPercent: null,
    trend: "up" as const,
    icon: Newspaper,
    hasSentimentBar: true,
  },
];

export function MarketMetrics() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="bg-white rounded-lg border border-stone-200/80 px-3 py-2.5 hover:border-stone-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-medium text-stone-400 tracking-[-0.005em]">
                {m.label}
              </p>
              <Icon className="w-3 h-3 text-stone-300" strokeWidth={2} />
            </div>
            <p className="text-[20px] font-semibold text-stone-900 tabular-nums leading-none tracking-[-0.02em]">
              {m.value}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {m.subPercent && (
                <span className="text-[11px] font-semibold text-emerald-600 tabular-nums">
                  {m.subPercent}
                </span>
              )}
              <span className="text-[10px] text-stone-400">{m.sub}</span>
            </div>
            {m.hasSentimentBar && (
              <div className="mt-2">
                <SentimentBar
                  bull={sentimentData.bull}
                  neutral={sentimentData.neutral}
                  bear={sentimentData.bear}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
