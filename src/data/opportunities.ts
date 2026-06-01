import type { Signal } from "@/types";

export interface Opportunity {
  rank: number;
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change1d: number;
  category: "Value" | "Growth" | "Income" | "Quality" | "Momentum";
  thesis: string;
  whyNow: string;
  compositeScore: number;
  signal: Signal;
  keyMetrics: { label: string; value: string; positive?: boolean }[];
  spark: number[];
}

export const opportunities: Opportunity[] = [
  {
    rank: 1,
    ticker: "MEBL",
    name: "Meezan Bank",
    sector: "Banking",
    price: 225.6,
    change1d: 1.6,
    category: "Growth",
    thesis:
      "Highest-ROE bank in the universe (28%) with growing low-cost CASA deposit franchise. Trading at 1.4× book — premium to peers but warranted by structural growth.",
    whyNow:
      "Just broke above 220 resistance with 2.3× volume. Q1 results due in 2 weeks, consensus expecting +18% NII growth.",
    compositeScore: 8.4,
    signal: "Strong Buy",
    keyMetrics: [
      { label: "ROE", value: "28%", positive: true },
      { label: "P/E", value: "5.8×" },
      { label: "Div Yield", value: "7.6%" },
      { label: "Pattern", value: "20D Breakout" },
    ],
    spark: [218.0, 222.5, 219.8, 224.0, 225.6],
  },
  {
    rank: 2,
    ticker: "PPL",
    name: "Pakistan Petroleum",
    sector: "E&P",
    price: 102.4,
    change1d: 1.4,
    category: "Value",
    thesis:
      "Cheapest E&P on EV/EBITDA basis (3.0×) with the highest dividend yield in sector (11.4%). Operational metrics in line with OGDC but trades at a 25% discount.",
    whyNow:
      "Circular debt resolution plan moving forward; Brent firming above $82. Technical setup is an ascending triangle on the daily.",
    compositeScore: 8.1,
    signal: "Buy",
    keyMetrics: [
      { label: "EV/EBITDA", value: "3.0×", positive: true },
      { label: "Div Yield", value: "11.4%", positive: true },
      { label: "ROE", value: "18%" },
      { label: "Pattern", value: "Asc. Triangle" },
    ],
    spark: [98.5, 100.2, 99.4, 101.1, 102.4],
  },
  {
    rank: 3,
    ticker: "FFC",
    name: "Fauji Fertiliser",
    sector: "Fertiliser",
    price: 154.2,
    change1d: 1.1,
    category: "Quality",
    thesis:
      "Sector-leading ROE (22%) with a near debt-free balance sheet and proven dividend payer. A defensive way to play fertilizer cycle while waiting for gas pricing clarity.",
    whyNow:
      "Recently broke past 150 resistance. Consensus expects 8% EPS growth despite gas headwinds; downside cushioned by 7.8% yield.",
    compositeScore: 7.6,
    signal: "Buy",
    keyMetrics: [
      { label: "ROE", value: "22%", positive: true },
      { label: "P/E", value: "7.4×" },
      { label: "Div Yield", value: "7.8%" },
      { label: "D/E", value: "0.12" },
    ],
    spark: [148.5, 151.2, 149.8, 152.4, 154.2],
  },
  {
    rank: 4,
    ticker: "UBL",
    name: "United Bank Limited",
    sector: "Banking",
    price: 198.5,
    change1d: 1.2,
    category: "Income",
    thesis:
      "Highest dividend yield in big-bank universe (11.2%) with a healthy 20% ROE. Trades at 0.7× book — closer to HBL but with stronger fee income mix.",
    whyNow:
      "Q1 results showed +12% net profit growth. Board approved interim dividend of PKR 11 — yield extends to 11.5% forward.",
    compositeScore: 7.4,
    signal: "Buy",
    keyMetrics: [
      { label: "Div Yield", value: "11.2%", positive: true },
      { label: "P/B", value: "0.7×" },
      { label: "ROE", value: "20%" },
      { label: "CAR", value: "17.2%" },
    ],
    spark: [193.2, 196.4, 194.1, 196.8, 198.5],
  },
];
