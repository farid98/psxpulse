export interface Holding {
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  change1d: number;
  entryDate: string;
}

export interface WatchlistItem {
  ticker: string;
  name: string;
  sector: string;
  currentPrice: number;
  change1d: number;
  addedDate: string;
  note?: string;
}

export const holdings: Holding[] = [
  {
    ticker: "ENGRO",
    name: "Engro Corporation",
    sector: "Fertiliser",
    shares: 500,
    avgCost: 248.0,
    currentPrice: 284.5,
    change1d: 1.8,
    entryDate: "Sep 2024",
  },
  {
    ticker: "HBL",
    name: "Habib Bank Limited",
    sector: "Banking",
    shares: 800,
    avgCost: 152.0,
    currentPrice: 168.3,
    change1d: 0.9,
    entryDate: "Nov 2024",
  },
  {
    ticker: "SYS",
    name: "Systems Limited",
    sector: "Technology",
    shares: 200,
    avgCost: 380.0,
    currentPrice: 442.1,
    change1d: 2.3,
    entryDate: "Jan 2025",
  },
  {
    ticker: "OGDC",
    name: "Oil & Gas Dev. Co.",
    sector: "E&P",
    shares: 1500,
    avgCost: 124.0,
    currentPrice: 138.75,
    change1d: 1.1,
    entryDate: "Dec 2024",
  },
  {
    ticker: "LUCK",
    name: "Lucky Cement",
    sector: "Cement",
    shares: 100,
    avgCost: 820.0,
    currentPrice: 780.0,
    change1d: -0.6,
    entryDate: "Oct 2024",
  },
];

export const watchlist: WatchlistItem[] = [
  {
    ticker: "MCB",
    name: "MCB Bank Limited",
    sector: "Banking",
    currentPrice: 212.4,
    change1d: -0.3,
    addedDate: "Apr 2025",
    note: "Waiting for MACD reversal",
  },
];

export const cashPosition = 75000;
