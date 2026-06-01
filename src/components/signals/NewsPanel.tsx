import type { SignalsProfile } from "@/data/signals";
import type { Sentiment } from "@/types";

const sentStripe: Record<Sentiment, string> = {
  Bullish: "bg-emerald-500",
  Bearish: "bg-red-500",
  Neutral: "bg-stone-300",
};

const sentLabel: Record<Sentiment, string> = {
  Bullish: "text-emerald-700",
  Bearish: "text-red-600",
  Neutral: "text-stone-500",
};

function SentimentTrendChart({ data }: { data: number[] }) {
  const W = 320;
  const H = 64;
  const padX = 4;
  const padY = 4;
  const min = -1;
  const max = 1;
  const range = max - min;
  const stepX = (W - padX * 2) / (data.length - 1);
  const midY = padY + ((max - 0) / range) * (H - padY * 2);

  const points = data.map((v, i) => {
    const x = padX + i * stepX;
    const y = padY + ((max - v) / range) * (H - padY * 2);
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height={H}>
      {/* Zero baseline */}
      <line
        x1={padX}
        y1={midY}
        x2={W - padX}
        y2={midY}
        stroke="#d6d3d1"
        strokeWidth="1"
        strokeDasharray="2 2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={linePath}
        fill="none"
        stroke="#10b981"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={2.5} fill="#10b981" />
    </svg>
  );
}

export function NewsPanel({ data }: { data: SignalsProfile }) {
  const n = data.news;
  const totalAnalysts = n.analysts.buy + n.analysts.hold + n.analysts.sell;
  const avg = (n.sentimentTrend.reduce((a, b) => a + b, 0) / n.sentimentTrend.length).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Sentiment trend + analysts - 1 col */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            30-Day Sentiment
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">News tone moving average</p>
        </div>
        <div className="px-5 py-4">
          <SentimentTrendChart data={n.sentimentTrend} />
          <div className="flex justify-between text-[10px] text-stone-400 font-medium mt-1 tabular-nums">
            <span>30D ago</span>
            <span>Today</span>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between">
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">Tone</p>
              <p className={`text-[14px] font-semibold ${sentLabel[n.label === "Mixed" ? "Neutral" : n.label]}`}>
                {n.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">30D Avg</p>
              <p className="text-[14px] font-semibold text-stone-800 tabular-nums">
                {parseFloat(avg) > 0 ? "+" : ""}
                {avg}
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-stone-100">
          <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-2">Analyst Ratings</p>
          <div className="flex h-2 rounded-full overflow-hidden gap-px bg-stone-100 mb-2">
            <div
              className="bg-emerald-500"
              style={{ width: `${(n.analysts.buy / totalAnalysts) * 100}%` }}
            />
            <div
              className="bg-stone-300"
              style={{ width: `${(n.analysts.hold / totalAnalysts) * 100}%` }}
            />
            <div
              className="bg-red-400"
              style={{ width: `${(n.analysts.sell / totalAnalysts) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] tabular-nums">
            <span className="text-emerald-700 font-semibold">{n.analysts.buy} Buy</span>
            <span className="text-stone-500 font-semibold">{n.analysts.hold} Hold</span>
            <span className="text-red-500 font-semibold">{n.analysts.sell} Sell</span>
          </div>
        </div>
      </div>

      {/* News items - 2 cols */}
      <div className="lg:col-span-2 bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Recent News
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">{n.summary}</p>
        </div>
        <div className="divide-y divide-stone-100">
          {n.items.map((item, i) => (
            <div key={i} className="px-5 py-3 hover:bg-stone-50/70 transition-colors flex gap-3">
              <div className={`w-[3px] rounded-full shrink-0 ${sentStripe[item.sentiment]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${
                      sentLabel[item.sentiment]
                    }`}
                  >
                    {item.sentiment}
                  </span>
                  <span className="text-[10px] text-stone-300">·</span>
                  <span className="text-[11px] text-stone-400 font-medium">{item.source}</span>
                  <span className="text-[10px] text-stone-300">·</span>
                  <span className="text-[11px] text-stone-400">
                    {item.daysAgo}d ago
                  </span>
                </div>
                <p className="text-[13px] text-stone-800 leading-snug tracking-[-0.005em]">
                  {item.headline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
