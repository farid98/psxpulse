import type { NewsItem } from "@/types";

export const newsItems: NewsItem[] = [
  {
    id: "1",
    sentiment: "Bullish",
    headline:
      "SBP holds policy rate at 12% — signals cautious optimism on inflation trajectory",
    source: "Dawn",
    time: "9:15 AM",
    tags: ["Banking", "Macro"],
  },
  {
    id: "2",
    sentiment: "Bullish",
    headline:
      "Pakistan-IMF review completed; $1.1B tranche cleared ahead of expectations",
    source: "Tribune",
    time: "8:40 AM",
    tags: ["Macro"],
  },
  {
    id: "3",
    sentiment: "Bearish",
    headline:
      "Textile exports dip 4.2% MoM — rupee appreciation cited by sector bodies",
    source: "Business Recorder",
    time: "10:02 AM",
    tags: ["Textiles"],
  },
  {
    id: "4",
    sentiment: "Neutral",
    headline:
      "NEPRA opens public hearing on revised power tariff structure for Q3 FY25",
    source: "ARY News",
    time: "7:55 AM",
    tags: ["Energy"],
  },
  {
    id: "5",
    sentiment: "Bullish",
    headline:
      "Foreign portfolio inflows rise to $48M in May — highest since Dec 2023",
    source: "Dawn",
    time: "6:30 AM",
    tags: ["Macro"],
  },
  {
    id: "6",
    sentiment: "Bearish",
    headline:
      "Cement dispatches fall 8% YoY in April amid weak construction demand",
    source: "Tribune",
    time: "8:10 AM",
    tags: ["Cement"],
  },
];
