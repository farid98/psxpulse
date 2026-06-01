import { newsItems } from "@/data/news";
import type { Sentiment } from "@/types";

const sentimentConfig: Record<Sentiment, { stripe: string; label: string }> = {
  Bullish: {
    stripe: "bg-emerald-500",
    label: "text-emerald-700",
  },
  Bearish: {
    stripe: "bg-red-500",
    label: "text-red-600",
  },
  Neutral: {
    stripe: "bg-stone-300",
    label: "text-stone-500",
  },
};

export function NewsDigest() {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            News Digest
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">Curated by sentiment · last 24h</p>
        </div>
        <span className="text-[10px] font-medium text-stone-400 tabular-nums">
          {newsItems.length} items
        </span>
      </div>
      <div className="divide-y divide-stone-100">
        {newsItems.map((item) => {
          const cfg = sentimentConfig[item.sentiment];
          return (
            <div
              key={item.id}
              className="px-5 py-3.5 hover:bg-stone-50/70 transition-colors cursor-default flex gap-3"
            >
              <div className={`w-[3px] rounded-full shrink-0 ${cfg.stripe}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${cfg.label}`}
                  >
                    {item.sentiment}
                  </span>
                  <span className="text-[10px] text-stone-300">·</span>
                  <span className="text-[11px] text-stone-400 font-medium">{item.source}</span>
                  <span className="text-[10px] text-stone-300">·</span>
                  <span className="text-[11px] text-stone-400 tabular-nums">{item.time}</span>
                </div>
                <p className="text-[13px] text-stone-800 leading-snug tracking-[-0.005em] mb-1.5">
                  {item.headline}
                </p>
                <div className="flex gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
