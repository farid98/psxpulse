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

export const kse100Spark = [
  108200, 109400, 107800, 110200, 111500, 110800, 112100, 111300, 113200,
  112600, 114000, 113400, 112800, 114500, 115200, 113800, 112400, 113900,
  115600, 114800, 113200, 114100, 115800, 114600, 113400, 114900, 115300,
  113700, 114100, 114280,
];
