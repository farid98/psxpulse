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
    sentiment: "Bullish",
    headline: "Pakistan-IMF review completed; $1.1B tranche cleared ahead of expectations",
    source: "Tribune",
    time: "8:40 AM",
    tags: ["Macro"],
    sources: [
      { name: "Tribune", snippet: "The IMF board approved the tranche two weeks ahead of schedule, citing strong fiscal consolidation and FX reserve improvement." },
      { name: "Dawn", snippet: "The clearance removes near-term external financing risk and is expected to boost investor sentiment heading into Q3." },
      { name: "Reuters", snippet: "Pakistan's forex reserves are now projected to reach $12B by end of FY25 on the back of the disbursement and export receipts." },
    ],
  },
  {
    id: "3",
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
    id: "4",
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
  {
    id: "5",
    sentiment: "Bullish",
    headline: "Foreign portfolio inflows rise to $48M in May — highest since Dec 2023",
    source: "Dawn",
    time: "6:30 AM",
    tags: ["Macro"],
    sources: [
      { name: "Dawn", snippet: "NCCPL data shows net foreign buying of $48M in equities during May, concentrated in Banking and Technology sectors." },
      { name: "Business Recorder", snippet: "Analysts attribute the inflow to the IMF tranche clearance and improving macro indicators making Pakistan attractive on a risk-adjusted basis." },
      { name: "Tribune", snippet: "HBL, MCB, and SYS were the top three stocks by foreign net buying volume in the month." },
    ],
  },
  {
    id: "6",
    sentiment: "Bearish",
    headline: "Cement dispatches fall 8% YoY in April amid weak construction demand",
    source: "Tribune",
    time: "8:10 AM",
    tags: ["Cement"],
    sources: [
      { name: "Tribune", snippet: "Industry dispatches of 4.1M tonnes in April were down 8% YoY, as high financing costs continue to suppress new construction starts." },
      { name: "Business Recorder", snippet: "Retention prices held steady despite volume decline, limiting the earnings impact for large producers like LUCK and DGKC." },
    ],
  },
];
