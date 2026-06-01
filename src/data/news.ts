import type { NewsItem } from "@/types";

export const newsItems: NewsItem[] = [
  {
    id: "1",
    sentiment: "Bullish",
    headline: "SBP holds policy rate at 12% — signals cautious optimism on inflation trajectory",
    source: "Dawn",
    time: "9:15 AM",
    tags: ["Banking", "Macro"],
    sources: [
      { name: "Dawn", snippet: "The State Bank kept rates unchanged, citing easing CPI and a stable rupee as reasons for a measured pause rather than a cut." },
      { name: "Business Recorder", snippet: "MPC statement hinted at a possible cut in the July review if inflation continues its downward trend toward the 10–11% range." },
      { name: "The News", snippet: "Banking stocks rallied on the decision — stable NIMs seen as a positive for sector earnings over the next two quarters." },
    ],
  },
  {
    id: "2",
    sentiment: "Bearish",
    headline: "Textile exports dip 4.2% MoM — rupee appreciation cited by sector bodies",
    source: "Business Recorder",
    time: "10:02 AM",
    tags: ["Textiles"],
    sources: [
      { name: "Business Recorder", snippet: "APTMA attributed the decline to PKR appreciation making Pakistani garments less price-competitive vs. Bangladesh and Vietnam." },
      { name: "Tribune", snippet: "Spinners saw the sharpest drop at -6.1% MoM; value-added apparel held up better at -2.4% thanks to existing order books." },
    ],
  },
  {
    id: "3",
    sentiment: "Neutral",
    headline: "NEPRA opens public hearing on revised power tariff structure for Q3 FY25",
    source: "ARY News",
    time: "7:55 AM",
    tags: ["Energy"],
    sources: [
      { name: "ARY News", snippet: "NEPRA has invited public submissions on a proposed tariff revision affecting all consumer categories, with a decision expected within 30 days." },
      { name: "Dawn", snippet: "IPPs with dollar-indexed tariffs are largely insulated; domestic distribution companies face most of the regulatory uncertainty." },
    ],
  },
];
