export interface FundamentalRatio {
  label: string;
  value: string;
  sectorAvg?: string;
  status?: "good" | "neutral" | "bad";
  hint?: string;
}

export interface FinancialYear {
  fy: string;
  revenue: number;
  opProfit: number;
  netIncome: number;
  eps: number;
}

export interface DividendYear {
  fy: string;
  divPerShare: number;
  payoutRatio: number;
}

export interface PeerCompare {
  ticker: string;
  name: string;
  pe: number;
  pb: number;
  divYield: number;
  roe: number;
  current?: boolean;
}

export interface FundamentalProfile {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  marketCap: string;
  asOf: string;
  valuation: FundamentalRatio[];
  profitability: FundamentalRatio[];
  growth: FundamentalRatio[];
  health: FundamentalRatio[];
  fiveYear: FinancialYear[];
  dividends: DividendYear[];
  peers: PeerCompare[];
}

export const fundamentalsByTicker: Record<string, FundamentalProfile> = {
  ENGRO: {
    ticker: "ENGRO",
    name: "Engro Corporation",
    sector: "Fertiliser / Conglomerate",
    price: 284.5,
    change: 1.8,
    marketCap: "PKR 152B",
    asOf: "Q3 FY25 · filed 14 May 2025",
    valuation: [
      { label: "P/E", value: "6.8×", sectorAvg: "7.2×", status: "good", hint: "Below sector" },
      { label: "P/B", value: "1.2×", sectorAvg: "1.4×", status: "good", hint: "Below sector" },
      { label: "EV / EBITDA", value: "5.4×", sectorAvg: "6.1×", status: "good" },
      { label: "P/S", value: "0.8×", sectorAvg: "1.0×", status: "good" },
      { label: "Div Yield", value: "8.2%", sectorAvg: "6.4%", status: "good", hint: "Above sector" },
      { label: "Payout Ratio", value: "56%", sectorAvg: "48%", status: "neutral" },
    ],
    profitability: [
      { label: "Gross Margin", value: "34%", sectorAvg: "31%", status: "good" },
      { label: "Op Margin", value: "22%", sectorAvg: "19%", status: "good" },
      { label: "Net Margin", value: "15%", sectorAvg: "13%", status: "good" },
      { label: "ROE", value: "18%", sectorAvg: "16%", status: "good", hint: "Above sector" },
      { label: "ROA", value: "12%", sectorAvg: "10%", status: "good" },
      { label: "ROIC", value: "15%", sectorAvg: "12%", status: "good" },
    ],
    growth: [
      { label: "Revenue YoY", value: "+12%", sectorAvg: "+8%", status: "good" },
      { label: "EPS YoY", value: "+18%", sectorAvg: "+11%", status: "good", hint: "Outperforming" },
      { label: "Op Cash YoY", value: "+14%", sectorAvg: "+9%", status: "good" },
      { label: "Revenue 3Y CAGR", value: "+11%", sectorAvg: "+7%", status: "good" },
      { label: "EPS 3Y CAGR", value: "+16%", sectorAvg: "+10%", status: "good" },
      { label: "Book Value/Share", value: "+9%", sectorAvg: "+6%", status: "good" },
    ],
    health: [
      { label: "Debt / Equity", value: "0.34", sectorAvg: "0.52", status: "good" },
      { label: "Current Ratio", value: "1.8", sectorAvg: "1.4", status: "good" },
      { label: "Quick Ratio", value: "1.4", sectorAvg: "1.1", status: "good" },
      { label: "Interest Coverage", value: "8.5×", sectorAvg: "5.2×", status: "good" },
      { label: "Net Cash", value: "PKR 42B", status: "good", hint: "Strong balance" },
      { label: "Altman Z-Score", value: "3.4", status: "good", hint: "Safe zone" },
    ],
    fiveYear: [
      { fy: "FY20", revenue: 234, opProfit: 41, netIncome: 28, eps: 22.4 },
      { fy: "FY21", revenue: 268, opProfit: 52, netIncome: 35, eps: 28.0 },
      { fy: "FY22", revenue: 295, opProfit: 61, netIncome: 42, eps: 33.6 },
      { fy: "FY23", revenue: 314, opProfit: 68, netIncome: 44, eps: 35.2 },
      { fy: "FY24", revenue: 352, opProfit: 78, netIncome: 52, eps: 41.8 },
    ],
    dividends: [
      { fy: "FY20", divPerShare: 16.0, payoutRatio: 71 },
      { fy: "FY21", divPerShare: 18.0, payoutRatio: 64 },
      { fy: "FY22", divPerShare: 20.0, payoutRatio: 60 },
      { fy: "FY23", divPerShare: 22.0, payoutRatio: 63 },
      { fy: "FY24", divPerShare: 23.5, payoutRatio: 56 },
    ],
    peers: [
      { ticker: "ENGRO", name: "Engro Corp", pe: 6.8, pb: 1.2, divYield: 8.2, roe: 18, current: true },
      { ticker: "FFC", name: "Fauji Fertiliser", pe: 7.4, pb: 1.5, divYield: 7.8, roe: 22 },
      { ticker: "EFERT", name: "Engro Fertilisers", pe: 6.2, pb: 1.1, divYield: 9.1, roe: 16 },
      { ticker: "FATIMA", name: "Fatima Fertiliser", pe: 8.5, pb: 1.0, divYield: 5.4, roe: 13 },
    ],
  },

  HBL: {
    ticker: "HBL",
    name: "Habib Bank Limited",
    sector: "Banking",
    price: 168.3,
    change: 0.9,
    marketCap: "PKR 245B",
    asOf: "Q1 CY25 · filed 28 Apr 2025",
    valuation: [
      { label: "P/E", value: "4.2×", sectorAvg: "4.6×", status: "good", hint: "Below sector" },
      { label: "P/B", value: "0.6×", sectorAvg: "0.8×", status: "good", hint: "Below book" },
      { label: "EV / EBITDA", value: "n/a", hint: "Bank — use P/B" },
      { label: "P/Pre-Prov", value: "2.1×", sectorAvg: "2.4×", status: "good" },
      { label: "Div Yield", value: "10.4%", sectorAvg: "8.9%", status: "good", hint: "Above sector" },
      { label: "Payout Ratio", value: "44%", sectorAvg: "38%", status: "neutral" },
    ],
    profitability: [
      { label: "Net Interest Margin", value: "5.8%", sectorAvg: "5.4%", status: "good" },
      { label: "Cost / Income", value: "48%", sectorAvg: "52%", status: "good" },
      { label: "ROE", value: "19%", sectorAvg: "17%", status: "good", hint: "Above sector" },
      { label: "ROA", value: "1.4%", sectorAvg: "1.2%", status: "good" },
      { label: "Net Margin", value: "27%", sectorAvg: "24%", status: "good" },
      { label: "Fee Income Mix", value: "22%", sectorAvg: "20%", status: "good" },
    ],
    growth: [
      { label: "NII YoY", value: "+14%", sectorAvg: "+10%", status: "good" },
      { label: "EPS YoY", value: "+11%", sectorAvg: "+9%", status: "good" },
      { label: "Deposits YoY", value: "+9%", sectorAvg: "+8%", status: "good" },
      { label: "Loans YoY", value: "+7%", sectorAvg: "+6%", status: "neutral" },
      { label: "EPS 3Y CAGR", value: "+13%", sectorAvg: "+10%", status: "good" },
      { label: "Book Value/Share", value: "+8%", sectorAvg: "+7%", status: "good" },
    ],
    health: [
      { label: "CAR (Tier 1)", value: "16.8%", sectorAvg: "14.5%", status: "good", hint: "Well capitalised" },
      { label: "NPL Ratio", value: "5.4%", sectorAvg: "6.2%", status: "good" },
      { label: "Coverage Ratio", value: "92%", sectorAvg: "85%", status: "good" },
      { label: "Liquidity Coverage", value: "168%", sectorAvg: "150%", status: "good" },
      { label: "ADR", value: "48%", sectorAvg: "52%", status: "neutral" },
      { label: "Tangible Equity", value: "PKR 285B", status: "good" },
    ],
    fiveYear: [
      { fy: "CY20", revenue: 158, opProfit: 42, netIncome: 30, eps: 20.4 },
      { fy: "CY21", revenue: 171, opProfit: 48, netIncome: 34, eps: 23.1 },
      { fy: "CY22", revenue: 195, opProfit: 58, netIncome: 41, eps: 28.0 },
      { fy: "CY23", revenue: 218, opProfit: 65, netIncome: 49, eps: 33.5 },
      { fy: "CY24", revenue: 246, opProfit: 76, netIncome: 58, eps: 40.1 },
    ],
    dividends: [
      { fy: "CY20", divPerShare: 8.0, payoutRatio: 39 },
      { fy: "CY21", divPerShare: 9.5, payoutRatio: 41 },
      { fy: "CY22", divPerShare: 11.0, payoutRatio: 39 },
      { fy: "CY23", divPerShare: 15.0, payoutRatio: 45 },
      { fy: "CY24", divPerShare: 17.5, payoutRatio: 44 },
    ],
    peers: [
      { ticker: "HBL", name: "Habib Bank", pe: 4.2, pb: 0.6, divYield: 10.4, roe: 19, current: true },
      { ticker: "MCB", name: "MCB Bank", pe: 5.1, pb: 0.8, divYield: 9.1, roe: 21 },
      { ticker: "UBL", name: "United Bank", pe: 4.6, pb: 0.7, divYield: 11.2, roe: 20 },
      { ticker: "MEBL", name: "Meezan Bank", pe: 5.8, pb: 1.4, divYield: 7.6, roe: 28 },
    ],
  },

  LUCK: {
    ticker: "LUCK",
    name: "Lucky Cement",
    sector: "Cement",
    price: 780.0,
    change: -0.6,
    marketCap: "PKR 241B",
    asOf: "Q3 FY25 · filed 22 Apr 2025",
    valuation: [
      { label: "P/E", value: "9.1×", sectorAvg: "9.8×", status: "good" },
      { label: "P/B", value: "1.5×", sectorAvg: "1.6×", status: "good" },
      { label: "EV / EBITDA", value: "6.8×", sectorAvg: "7.4×", status: "good" },
      { label: "P/S", value: "1.4×", sectorAvg: "1.6×", status: "good" },
      { label: "Div Yield", value: "3.1%", sectorAvg: "4.2%", status: "bad", hint: "Below sector" },
      { label: "Payout Ratio", value: "28%", sectorAvg: "41%", status: "neutral" },
    ],
    profitability: [
      { label: "Gross Margin", value: "29%", sectorAvg: "24%", status: "good" },
      { label: "Op Margin", value: "21%", sectorAvg: "17%", status: "good" },
      { label: "Net Margin", value: "14%", sectorAvg: "11%", status: "good" },
      { label: "ROE", value: "16%", sectorAvg: "13%", status: "good" },
      { label: "ROA", value: "11%", sectorAvg: "8%", status: "good" },
      { label: "ROIC", value: "13%", sectorAvg: "10%", status: "good" },
    ],
    growth: [
      { label: "Revenue YoY", value: "+6%", sectorAvg: "+8%", status: "neutral" },
      { label: "EPS YoY", value: "+4%", sectorAvg: "+9%", status: "bad", hint: "Demand soft" },
      { label: "Op Cash YoY", value: "+8%", sectorAvg: "+10%", status: "neutral" },
      { label: "Revenue 3Y CAGR", value: "+9%", sectorAvg: "+11%", status: "neutral" },
      { label: "EPS 3Y CAGR", value: "+7%", sectorAvg: "+12%", status: "bad" },
      { label: "Book Value/Share", value: "+12%", sectorAvg: "+9%", status: "good" },
    ],
    health: [
      { label: "Debt / Equity", value: "0.18", sectorAvg: "0.48", status: "good", hint: "Strong balance" },
      { label: "Current Ratio", value: "2.4", sectorAvg: "1.6", status: "good" },
      { label: "Quick Ratio", value: "1.7", sectorAvg: "1.0", status: "good" },
      { label: "Interest Coverage", value: "14.2×", sectorAvg: "6.4×", status: "good" },
      { label: "Net Cash", value: "PKR 38B", status: "good", hint: "Strong balance" },
      { label: "Altman Z-Score", value: "4.1", status: "good", hint: "Safe zone" },
    ],
    fiveYear: [
      { fy: "FY20", revenue: 124, opProfit: 21, netIncome: 14, eps: 42.3 },
      { fy: "FY21", revenue: 148, opProfit: 29, netIncome: 19, eps: 58.8 },
      { fy: "FY22", revenue: 162, opProfit: 34, netIncome: 22, eps: 68.5 },
      { fy: "FY23", revenue: 174, opProfit: 36, netIncome: 24, eps: 74.2 },
      { fy: "FY24", revenue: 184, opProfit: 38, netIncome: 28, eps: 85.7 },
    ],
    dividends: [
      { fy: "FY20", divPerShare: 12.0, payoutRatio: 28 },
      { fy: "FY21", divPerShare: 16.0, payoutRatio: 27 },
      { fy: "FY22", divPerShare: 18.0, payoutRatio: 26 },
      { fy: "FY23", divPerShare: 20.0, payoutRatio: 27 },
      { fy: "FY24", divPerShare: 24.0, payoutRatio: 28 },
    ],
    peers: [
      { ticker: "LUCK", name: "Lucky Cement", pe: 9.1, pb: 1.5, divYield: 3.1, roe: 16, current: true },
      { ticker: "MLCF", name: "Maple Leaf", pe: 8.4, pb: 1.2, divYield: 4.6, roe: 14 },
      { ticker: "DGKC", name: "DG Khan Cement", pe: 11.2, pb: 0.9, divYield: 2.4, roe: 9 },
      { ticker: "FCCL", name: "Fauji Cement", pe: 10.8, pb: 1.4, divYield: 5.1, roe: 12 },
    ],
  },

  SYS: {
    ticker: "SYS",
    name: "Systems Limited",
    sector: "Technology",
    price: 442.1,
    change: 2.3,
    marketCap: "PKR 64B",
    asOf: "Q1 CY25 · filed 30 Apr 2025",
    valuation: [
      { label: "P/E", value: "14.5×", sectorAvg: "16.2×", status: "good" },
      { label: "P/B", value: "4.1×", sectorAvg: "3.8×", status: "neutral" },
      { label: "EV / EBITDA", value: "11.8×", sectorAvg: "13.4×", status: "good" },
      { label: "P/S", value: "3.2×", sectorAvg: "3.5×", status: "good" },
      { label: "Div Yield", value: "1.8%", sectorAvg: "2.4%", status: "bad" },
      { label: "Payout Ratio", value: "26%", sectorAvg: "34%", status: "neutral", hint: "Reinvesting" },
    ],
    profitability: [
      { label: "Gross Margin", value: "42%", sectorAvg: "38%", status: "good" },
      { label: "Op Margin", value: "26%", sectorAvg: "22%", status: "good" },
      { label: "Net Margin", value: "22%", sectorAvg: "18%", status: "good" },
      { label: "ROE", value: "28%", sectorAvg: "21%", status: "good", hint: "Strong returns" },
      { label: "ROA", value: "21%", sectorAvg: "16%", status: "good" },
      { label: "ROIC", value: "25%", sectorAvg: "19%", status: "good" },
    ],
    growth: [
      { label: "Revenue YoY", value: "+38%", sectorAvg: "+24%", status: "good", hint: "Outperforming" },
      { label: "EPS YoY", value: "+46%", sectorAvg: "+28%", status: "good", hint: "Outperforming" },
      { label: "Op Cash YoY", value: "+34%", sectorAvg: "+22%", status: "good" },
      { label: "Revenue 3Y CAGR", value: "+32%", sectorAvg: "+22%", status: "good" },
      { label: "EPS 3Y CAGR", value: "+38%", sectorAvg: "+25%", status: "good" },
      { label: "Book Value/Share", value: "+24%", sectorAvg: "+16%", status: "good" },
    ],
    health: [
      { label: "Debt / Equity", value: "0.08", sectorAvg: "0.18", status: "good", hint: "Near debt-free" },
      { label: "Current Ratio", value: "3.2", sectorAvg: "2.4", status: "good" },
      { label: "Quick Ratio", value: "2.9", sectorAvg: "2.1", status: "good" },
      { label: "Interest Coverage", value: "42×", sectorAvg: "18×", status: "good" },
      { label: "Net Cash", value: "PKR 14B", status: "good" },
      { label: "Altman Z-Score", value: "5.8", status: "good", hint: "Very safe" },
    ],
    fiveYear: [
      { fy: "CY20", revenue: 11.2, opProfit: 2.4, netIncome: 1.9, eps: 13.2 },
      { fy: "CY21", revenue: 18.4, opProfit: 4.6, netIncome: 3.6, eps: 25.1 },
      { fy: "CY22", revenue: 26.8, opProfit: 6.8, netIncome: 5.4, eps: 37.6 },
      { fy: "CY23", revenue: 33.5, opProfit: 8.9, netIncome: 6.8, eps: 47.3 },
      { fy: "CY24", revenue: 42.1, opProfit: 11.2, netIncome: 9.2, eps: 64.5 },
    ],
    dividends: [
      { fy: "CY20", divPerShare: 3.5, payoutRatio: 26 },
      { fy: "CY21", divPerShare: 5.0, payoutRatio: 20 },
      { fy: "CY22", divPerShare: 7.5, payoutRatio: 20 },
      { fy: "CY23", divPerShare: 10.0, payoutRatio: 21 },
      { fy: "CY24", divPerShare: 12.5, payoutRatio: 19 },
    ],
    peers: [
      { ticker: "SYS", name: "Systems Ltd", pe: 14.5, pb: 4.1, divYield: 1.8, roe: 28, current: true },
      { ticker: "NETSOL", name: "Netsol Technologies", pe: 18.2, pb: 3.4, divYield: 0.0, roe: 14 },
      { ticker: "AVN", name: "Avanceon", pe: 12.8, pb: 2.6, divYield: 2.4, roe: 22 },
      { ticker: "TPLP", name: "TPL Properties", pe: 16.4, pb: 1.8, divYield: 3.2, roe: 11 },
    ],
  },

  OGDC: {
    ticker: "OGDC",
    name: "Oil & Gas Dev. Co.",
    sector: "Exploration & Production",
    price: 138.75,
    change: 1.1,
    marketCap: "PKR 596B",
    asOf: "Q3 FY25 · filed 12 May 2025",
    valuation: [
      { label: "P/E", value: "5.6×", sectorAvg: "6.4×", status: "good" },
      { label: "P/B", value: "0.9×", sectorAvg: "1.1×", status: "good" },
      { label: "EV / EBITDA", value: "3.2×", sectorAvg: "4.1×", status: "good", hint: "Cheap" },
      { label: "P/S", value: "1.6×", sectorAvg: "1.9×", status: "good" },
      { label: "Div Yield", value: "9.8%", sectorAvg: "8.4%", status: "good" },
      { label: "Payout Ratio", value: "55%", sectorAvg: "52%", status: "neutral" },
    ],
    profitability: [
      { label: "Gross Margin", value: "62%", sectorAvg: "54%", status: "good" },
      { label: "Op Margin", value: "48%", sectorAvg: "42%", status: "good" },
      { label: "Net Margin", value: "32%", sectorAvg: "28%", status: "good" },
      { label: "ROE", value: "21%", sectorAvg: "18%", status: "good" },
      { label: "ROA", value: "17%", sectorAvg: "14%", status: "good" },
      { label: "ROIC", value: "22%", sectorAvg: "17%", status: "good" },
    ],
    growth: [
      { label: "Revenue YoY", value: "+8%", sectorAvg: "+6%", status: "good" },
      { label: "EPS YoY", value: "+9%", sectorAvg: "+7%", status: "good" },
      { label: "Op Cash YoY", value: "+11%", sectorAvg: "+8%", status: "good" },
      { label: "Revenue 3Y CAGR", value: "+9%", sectorAvg: "+7%", status: "good" },
      { label: "EPS 3Y CAGR", value: "+10%", sectorAvg: "+8%", status: "good" },
      { label: "Book Value/Share", value: "+11%", sectorAvg: "+8%", status: "good" },
    ],
    health: [
      { label: "Debt / Equity", value: "0.04", sectorAvg: "0.21", status: "good", hint: "Near debt-free" },
      { label: "Current Ratio", value: "4.1", sectorAvg: "2.6", status: "good" },
      { label: "Quick Ratio", value: "3.8", sectorAvg: "2.2", status: "good" },
      { label: "Interest Coverage", value: "82×", sectorAvg: "28×", status: "good" },
      { label: "Receivables (circ debt)", value: "PKR 480B", status: "bad", hint: "High exposure" },
      { label: "Altman Z-Score", value: "4.6", status: "good" },
    ],
    fiveYear: [
      { fy: "FY20", revenue: 240, opProfit: 116, netIncome: 75, eps: 17.4 },
      { fy: "FY21", revenue: 268, opProfit: 132, netIncome: 86, eps: 20.0 },
      { fy: "FY22", revenue: 342, opProfit: 178, netIncome: 121, eps: 28.1 },
      { fy: "FY23", revenue: 376, opProfit: 192, netIncome: 134, eps: 31.2 },
      { fy: "FY24", revenue: 412, opProfit: 214, netIncome: 152, eps: 35.4 },
    ],
    dividends: [
      { fy: "FY20", divPerShare: 7.0, payoutRatio: 40 },
      { fy: "FY21", divPerShare: 8.0, payoutRatio: 40 },
      { fy: "FY22", divPerShare: 10.5, payoutRatio: 37 },
      { fy: "FY23", divPerShare: 12.0, payoutRatio: 38 },
      { fy: "FY24", divPerShare: 13.5, payoutRatio: 38 },
    ],
    peers: [
      { ticker: "OGDC", name: "OGDC", pe: 5.6, pb: 0.9, divYield: 9.8, roe: 21, current: true },
      { ticker: "PPL", name: "Pakistan Petroleum", pe: 4.8, pb: 0.8, divYield: 11.4, roe: 18 },
      { ticker: "POL", name: "Pakistan Oilfields", pe: 6.4, pb: 1.6, divYield: 8.2, roe: 26 },
      { ticker: "MARI", name: "Mari Petroleum", pe: 6.8, pb: 2.1, divYield: 6.8, roe: 32 },
    ],
  },

  MCB: {
    ticker: "MCB",
    name: "MCB Bank Limited",
    sector: "Banking",
    price: 212.4,
    change: -0.3,
    marketCap: "PKR 252B",
    asOf: "Q1 CY25 · filed 28 Apr 2025",
    valuation: [
      { label: "P/E", value: "5.1×", sectorAvg: "4.6×", status: "neutral" },
      { label: "P/B", value: "0.8×", sectorAvg: "0.8×", status: "neutral" },
      { label: "EV / EBITDA", value: "n/a", hint: "Bank — use P/B" },
      { label: "P/Pre-Prov", value: "2.5×", sectorAvg: "2.4×", status: "neutral" },
      { label: "Div Yield", value: "9.1%", sectorAvg: "8.9%", status: "neutral" },
      { label: "Payout Ratio", value: "46%", sectorAvg: "38%", status: "neutral" },
    ],
    profitability: [
      { label: "Net Interest Margin", value: "6.2%", sectorAvg: "5.4%", status: "good", hint: "Above sector" },
      { label: "Cost / Income", value: "44%", sectorAvg: "52%", status: "good" },
      { label: "ROE", value: "21%", sectorAvg: "17%", status: "good", hint: "Top tier" },
      { label: "ROA", value: "1.6%", sectorAvg: "1.2%", status: "good" },
      { label: "Net Margin", value: "31%", sectorAvg: "24%", status: "good" },
      { label: "Fee Income Mix", value: "18%", sectorAvg: "20%", status: "neutral" },
    ],
    growth: [
      { label: "NII YoY", value: "+8%", sectorAvg: "+10%", status: "neutral" },
      { label: "EPS YoY", value: "+6%", sectorAvg: "+9%", status: "bad" },
      { label: "Deposits YoY", value: "+7%", sectorAvg: "+8%", status: "neutral" },
      { label: "Loans YoY", value: "+4%", sectorAvg: "+6%", status: "bad", hint: "Conservative" },
      { label: "EPS 3Y CAGR", value: "+8%", sectorAvg: "+10%", status: "neutral" },
      { label: "Book Value/Share", value: "+6%", sectorAvg: "+7%", status: "neutral" },
    ],
    health: [
      { label: "CAR (Tier 1)", value: "19.4%", sectorAvg: "14.5%", status: "good", hint: "Well capitalised" },
      { label: "NPL Ratio", value: "4.8%", sectorAvg: "6.2%", status: "good" },
      { label: "Coverage Ratio", value: "98%", sectorAvg: "85%", status: "good" },
      { label: "Liquidity Coverage", value: "184%", sectorAvg: "150%", status: "good" },
      { label: "ADR", value: "42%", sectorAvg: "52%", status: "neutral", hint: "Under-lent" },
      { label: "Tangible Equity", value: "PKR 312B", status: "good" },
    ],
    fiveYear: [
      { fy: "CY20", revenue: 142, opProfit: 48, netIncome: 32, eps: 27.4 },
      { fy: "CY21", revenue: 148, opProfit: 51, netIncome: 34, eps: 28.6 },
      { fy: "CY22", revenue: 168, opProfit: 58, netIncome: 38, eps: 32.4 },
      { fy: "CY23", revenue: 186, opProfit: 64, netIncome: 42, eps: 35.8 },
      { fy: "CY24", revenue: 206, opProfit: 72, netIncome: 48, eps: 41.6 },
    ],
    dividends: [
      { fy: "CY20", divPerShare: 16.0, payoutRatio: 58 },
      { fy: "CY21", divPerShare: 18.0, payoutRatio: 63 },
      { fy: "CY22", divPerShare: 19.0, payoutRatio: 59 },
      { fy: "CY23", divPerShare: 19.0, payoutRatio: 53 },
      { fy: "CY24", divPerShare: 19.5, payoutRatio: 47 },
    ],
    peers: [
      { ticker: "MCB", name: "MCB Bank", pe: 5.1, pb: 0.8, divYield: 9.1, roe: 21, current: true },
      { ticker: "HBL", name: "Habib Bank", pe: 4.2, pb: 0.6, divYield: 10.4, roe: 19 },
      { ticker: "UBL", name: "United Bank", pe: 4.6, pb: 0.7, divYield: 11.2, roe: 20 },
      { ticker: "MEBL", name: "Meezan Bank", pe: 5.8, pb: 1.4, divYield: 7.6, roe: 28 },
    ],
  },
};

export const stockOptions = [
  { ticker: "ENGRO", name: "Engro Corporation", price: 284.5, change: 1.8, sector: "Fertiliser" },
  { ticker: "HBL", name: "Habib Bank Limited", price: 168.3, change: 0.9, sector: "Banking" },
  { ticker: "LUCK", name: "Lucky Cement", price: 780.0, change: -0.6, sector: "Cement" },
  { ticker: "SYS", name: "Systems Limited", price: 442.1, change: 2.3, sector: "Technology" },
  { ticker: "OGDC", name: "Oil & Gas Dev. Co.", price: 138.75, change: 1.1, sector: "E&P" },
  { ticker: "MCB", name: "MCB Bank Limited", price: 212.4, change: -0.3, sector: "Banking" },
];
