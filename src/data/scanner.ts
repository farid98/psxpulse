import type { Signal } from "@/types";

export interface ScanPreset {
  id: string;
  name: string;
  description: string;
  category: "Momentum" | "Reversal" | "Trend" | "Volume";
  criteria: string[];
  matches: number;
  active?: boolean;
}

export interface ScanResult {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change1d: number;
  rsi: number;
  volMultiple: number;
  pattern: string;
  signal: Signal;
  spark: number[];
}

export const presetScans: ScanPreset[] = [
  {
    id: "breakouts",
    name: "Bullish Breakouts",
    category: "Momentum",
    description: "Price breaking above 20-day high with volume confirmation",
    criteria: ["Price > 20D high", "Vol > 1.5× avg", "RSI 40–70"],
    matches: 8,
    active: true,
  },
  {
    id: "oversold-quality",
    name: "Oversold Quality",
    category: "Reversal",
    description: "Quality names with stretched RSI — potential mean-reversion",
    criteria: ["RSI < 30", "P/E < sector avg", "ROE > 15%"],
    matches: 5,
  },
  {
    id: "volume-spikes",
    name: "Volume Spikes",
    category: "Volume",
    description: "Unusual volume spikes signaling institutional interest",
    criteria: ["Vol > 3× 30D avg", "Price change > 1%"],
    matches: 11,
  },
  {
    id: "golden-cross",
    name: "Golden Cross",
    category: "Trend",
    description: "50-day MA crossed above 200-day MA in last 5 sessions",
    criteria: ["MA50 > MA200", "Cross within 5D", "Above 200D MA"],
    matches: 4,
  },
  {
    id: "near-52w",
    name: "Near 52W High",
    category: "Momentum",
    description: "Within 5% of 52-week high — leadership candidates",
    criteria: ["Price > 95% of 52W high", "RSI > 55", "Vol > avg"],
    matches: 9,
  },
  {
    id: "rsi-divergence",
    name: "Bullish RSI Divergence",
    category: "Reversal",
    description: "Price made new low but RSI didn't — possible bottom",
    criteria: ["New 20D low", "RSI higher than prior low", "Vol declining"],
    matches: 3,
  },
];

export const scanResults: ScanResult[] = [
  {
    ticker: "ENGRO",
    name: "Engro Corporation",
    sector: "Fertiliser",
    price: 284.5,
    change1d: 1.8,
    rsi: 58,
    volMultiple: 2.1,
    pattern: "20D Breakout",
    signal: "Strong Buy",
    spark: [278.2, 282.1, 277.5, 286.3, 284.5],
  },
  {
    ticker: "HBL",
    name: "Habib Bank Limited",
    sector: "Banking",
    price: 168.3,
    change1d: 0.9,
    rsi: 52,
    volMultiple: 1.7,
    pattern: "Cup & Handle",
    signal: "Buy",
    spark: [165.2, 169.1, 164.8, 167.5, 168.3],
  },
  {
    ticker: "SYS",
    name: "Systems Limited",
    sector: "Technology",
    price: 442.1,
    change1d: 2.3,
    rsi: 64,
    volMultiple: 2.4,
    pattern: "Flag Breakout",
    signal: "Buy",
    spark: [424.0, 433.8, 429.5, 438.2, 442.1],
  },
  {
    ticker: "OGDC",
    name: "Oil & Gas Dev. Co.",
    sector: "E&P",
    price: 138.75,
    change1d: 1.1,
    rsi: 55,
    volMultiple: 1.6,
    pattern: "20D Breakout",
    signal: "Buy",
    spark: [134.5, 136.8, 135.2, 137.9, 138.75],
  },
  {
    ticker: "PPL",
    name: "Pakistan Petroleum",
    sector: "E&P",
    price: 102.4,
    change1d: 1.4,
    rsi: 61,
    volMultiple: 1.9,
    pattern: "Ascending Triangle",
    signal: "Buy",
    spark: [98.5, 100.2, 99.4, 101.1, 102.4],
  },
  {
    ticker: "UBL",
    name: "United Bank Limited",
    sector: "Banking",
    price: 198.5,
    change1d: 1.2,
    rsi: 56,
    volMultiple: 1.5,
    pattern: "Bullish Engulf",
    signal: "Buy",
    spark: [193.2, 196.4, 194.1, 196.8, 198.5],
  },
  {
    ticker: "MEBL",
    name: "Meezan Bank",
    sector: "Banking",
    price: 225.6,
    change1d: 1.6,
    rsi: 62,
    volMultiple: 2.3,
    pattern: "20D Breakout",
    signal: "Strong Buy",
    spark: [218.0, 222.5, 219.8, 224.0, 225.6],
  },
  {
    ticker: "POL",
    name: "Pakistan Oilfields",
    sector: "E&P",
    price: 482.0,
    change1d: 1.9,
    rsi: 67,
    volMultiple: 1.8,
    pattern: "Flag Breakout",
    signal: "Buy",
    spark: [468.5, 475.2, 472.1, 478.8, 482.0],
  },
];
