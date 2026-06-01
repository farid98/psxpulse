export type Signal = "Strong Buy" | "Buy" | "Hold" | "Reduce" | "Sell";
export type Sentiment = "Bullish" | "Bearish" | "Neutral";

export interface MarketMetric {
  label: string;
  value: string;
  subtext: string;
  trend: "up" | "down" | "neutral";
}

export interface NewsItem {
  id: string;
  sentiment: Sentiment;
  headline: string;
  source: string;
  time: string;
  tags: string[];
  sources: { name: string; snippet: string }[];
}

export interface SectorData {
  name: string;
  indexPts: number;
  change1d: number;
  change1w: number;
  pe: number;
  signal: Signal;
  keyDriver: string;
  summary: string;
}

export interface StockData {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  pe: number;
  divYield: number;
  rsi: number;
  macd: "Bullish" | "Bearish" | "Neutral";
  high52w: number;
  low52w: number;
  mktCap: string;
  eps: number;
  recommendation: Signal;
  spark: number[];
}
