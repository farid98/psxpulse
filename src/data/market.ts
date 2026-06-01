import type { MarketMetric } from "@/types";

export const marketMetrics: MarketMetric[] = [
  {
    label: "KSE-100",
    value: "114,280",
    subtext: "▲ 772 pts (+0.68%)",
    trend: "up",
  },
  {
    label: "Volume",
    value: "312M shares",
    subtext: "Avg: 287M",
    trend: "up",
  },
  {
    label: "Advancers / Decliners",
    value: "224 / 118",
    subtext: "Breadth positive",
    trend: "up",
  },
  {
    label: "News Sentiment",
    value: "Bullish",
    subtext: "58% bull · 24% neutral · 18% bear",
    trend: "up",
  },
];

export const sentimentData = { bull: 58, neutral: 24, bear: 18 };
