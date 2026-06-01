import type { Signal, Sentiment } from "@/types";

export interface SignalsProfile {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  scores: {
    technical: number;
    fundamental: number;
    news: number;
    overall: number;
  };
  recommendation: Signal;
  confidence: number;

  technical: {
    summary: string;
    indicators: { label: string; value: string; signal: "bull" | "bear" | "neutral"; hint?: string }[];
    patterns: { name: string; bullish: boolean; confidence: number }[];
    levels: { type: "Resistance" | "Support"; price: number; strength: "strong" | "moderate" | "weak" }[];
    priceHistory: number[];
  };

  fundamental: {
    summary: string;
    metrics: { label: string; value: string; sectorAvg: string; status: "good" | "neutral" | "bad" }[];
    highlights: { type: "+" | "-"; text: string }[];
  };

  news: {
    summary: string;
    label: "Bullish" | "Bearish" | "Neutral" | "Mixed";
    sentimentTrend: number[];
    items: { headline: string; source: string; sentiment: Sentiment; daysAgo: number }[];
    analysts: { buy: number; hold: number; sell: number };
  };

  overall: {
    summary: string;
    strengths: string[];
    risks: string[];
    timeHorizon: string;
  };
}

const genTrend = (start: number, end: number, days: number, volatility = 0.02): number[] => {
  const series: number[] = [];
  const drift = (end - start) / days;
  let v = start;
  for (let i = 0; i < days; i++) {
    const noise = (Math.sin(i * 1.3) + Math.cos(i * 0.7)) * volatility * start;
    v = start + drift * i + noise;
    series.push(parseFloat(v.toFixed(2)));
  }
  series[series.length - 1] = end;
  return series;
};

const genSentiment = (bias: number, days = 30): number[] => {
  const series: number[] = [];
  for (let i = 0; i < days; i++) {
    const wave = Math.sin(i * 0.5) * 0.3 + Math.cos(i * 0.3) * 0.2;
    series.push(parseFloat((bias + wave).toFixed(2)));
  }
  return series;
};

export const signalsByTicker: Record<string, SignalsProfile> = {
  ENGRO: {
    ticker: "ENGRO",
    name: "Engro Corporation",
    sector: "Fertiliser / Conglomerate",
    price: 284.5,
    change: 1.8,
    scores: { technical: 7.4, fundamental: 8.6, news: 7.8, overall: 8.0 },
    recommendation: "Strong Buy",
    confidence: 82,
    technical: {
      summary: "Breakout above 20-day resistance with confirming volume; trending above all key moving averages.",
      indicators: [
        { label: "RSI (14)", value: "58", signal: "bull", hint: "Bullish zone" },
        { label: "MACD", value: "Bullish cross", signal: "bull", hint: "Above signal line" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "28", signal: "bull", hint: "Strong trend" },
        { label: "Volume vs 30D avg", value: "2.1×", signal: "bull", hint: "Confirming move" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "20D Breakout", bullish: true, confidence: 86 },
        { name: "Ascending Triangle", bullish: true, confidence: 72 },
      ],
      levels: [
        { type: "Resistance", price: 296.0, strength: "strong" },
        { type: "Resistance", price: 305.5, strength: "moderate" },
        { type: "Support", price: 278.0, strength: "strong" },
        { type: "Support", price: 268.5, strength: "moderate" },
      ],
      priceHistory: genTrend(258, 284.5, 60, 0.018),
    },
    fundamental: {
      summary: "Trading below sector P/E with above-average ROE and strong dividend coverage.",
      metrics: [
        { label: "P/E", value: "6.8×", sectorAvg: "7.2×", status: "good" },
        { label: "ROE", value: "18%", sectorAvg: "16%", status: "good" },
        { label: "EPS Growth (YoY)", value: "+18%", sectorAvg: "+11%", status: "good" },
        { label: "Div Yield", value: "8.2%", sectorAvg: "6.4%", status: "good" },
        { label: "Debt / Equity", value: "0.34", sectorAvg: "0.52", status: "good" },
        { label: "Net Margin", value: "15%", sectorAvg: "13%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "EPS 3Y CAGR of 16% outpaces sector at 10%" },
        { type: "+", text: "Net cash position of PKR 42B provides downside protection" },
        { type: "+", text: "Dividend yield of 8.2% with sustainable 56% payout" },
        { type: "-", text: "Gas price uncertainty could compress margins near-term" },
      ],
    },
    news: {
      summary: "Tone has been net positive for 3 consecutive weeks; macro news (IMF tranche, rate hold) supportive.",
      label: "Bullish",
      sentimentTrend: genSentiment(0.4),
      items: [
        { headline: "Engro Corp posts +18% EPS growth in Q3 — beats analyst estimates", source: "Dawn", sentiment: "Bullish", daysAgo: 1 },
        { headline: "SBP rate hold seen as positive for capex-heavy conglomerates", source: "Tribune", sentiment: "Bullish", daysAgo: 2 },
        { headline: "ENGRO board approves PKR 23.5 final dividend for FY24", source: "Business Recorder", sentiment: "Bullish", daysAgo: 4 },
        { headline: "Gas pricing review opens Friday — fertiliser sector watching", source: "Dawn", sentiment: "Neutral", daysAgo: 6 },
        { headline: "Foreign portfolio inflows favour blue-chip names — ENGRO among top picks", source: "Tribune", sentiment: "Bullish", daysAgo: 8 },
      ],
      analysts: { buy: 9, hold: 3, sell: 0 },
    },
    overall: {
      summary: "Technically strong, fundamentally cheap-to-fair, and news-tape supportive. A high-conviction long with manageable risk.",
      strengths: [
        "All three signal layers (technical, fundamental, news) aligned positive",
        "Below-sector valuation with above-sector profitability",
        "Net cash balance sheet absorbs macro shocks",
      ],
      risks: [
        "Gas price formula revision could compress fertiliser margins",
        "PKR appreciation pressure on conglomerate's export-linked subsidiaries",
      ],
      timeHorizon: "6–12 months",
    },
  },

  HBL: {
    ticker: "HBL",
    name: "Habib Bank Limited",
    sector: "Banking",
    price: 168.3,
    change: 0.9,
    scores: { technical: 6.8, fundamental: 8.2, news: 7.4, overall: 7.5 },
    recommendation: "Buy",
    confidence: 76,
    technical: {
      summary: "Cup-and-handle formation completing with positive momentum; trading just below 52W high.",
      indicators: [
        { label: "RSI (14)", value: "52", signal: "neutral", hint: "Neutral zone" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "22", signal: "neutral", hint: "Moderate trend" },
        { label: "Volume vs 30D avg", value: "1.7×", signal: "bull" },
        { label: "Bollinger Position", value: "Mid", signal: "neutral" },
      ],
      patterns: [
        { name: "Cup & Handle", bullish: true, confidence: 78 },
      ],
      levels: [
        { type: "Resistance", price: 172.0, strength: "strong" },
        { type: "Resistance", price: 180.5, strength: "moderate" },
        { type: "Support", price: 162.0, strength: "strong" },
        { type: "Support", price: 155.0, strength: "moderate" },
      ],
      priceHistory: genTrend(148, 168.3, 60, 0.016),
    },
    fundamental: {
      summary: "Trading at 0.6× book with 19% ROE and 10.4% dividend yield — cheap by any banking lens.",
      metrics: [
        { label: "P/E", value: "4.2×", sectorAvg: "4.6×", status: "good" },
        { label: "P/B", value: "0.6×", sectorAvg: "0.8×", status: "good" },
        { label: "ROE", value: "19%", sectorAvg: "17%", status: "good" },
        { label: "Div Yield", value: "10.4%", sectorAvg: "8.9%", status: "good" },
        { label: "CAR (Tier 1)", value: "16.8%", sectorAvg: "14.5%", status: "good" },
        { label: "NPL Ratio", value: "5.4%", sectorAvg: "6.2%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "Trading at 0.6× book vs sector 0.8× — deep value" },
        { type: "+", text: "Tier 1 capital of 16.8% well above regulatory minimum" },
        { type: "+", text: "Net Interest Margin expanding on rate environment" },
        { type: "-", text: "Loan growth of 7% below sector — conservative posture" },
      ],
    },
    news: {
      summary: "Generally supportive; rate hold viewed as positive for NIMs but some regulatory chatter on minimum saving rate.",
      label: "Bullish",
      sentimentTrend: genSentiment(0.3),
      items: [
        { headline: "HBL Q1 net profit up 14%; NIM expands to 5.8%", source: "Dawn", sentiment: "Bullish", daysAgo: 2 },
        { headline: "SBP holds policy rate — banking NIMs supported", source: "Tribune", sentiment: "Bullish", daysAgo: 3 },
        { headline: "Minimum saving rate review could trim deposit margins", source: "Business Recorder", sentiment: "Bearish", daysAgo: 5 },
        { headline: "HBL announces final dividend of PKR 9 per share", source: "ARY", sentiment: "Bullish", daysAgo: 7 },
      ],
      analysts: { buy: 7, hold: 4, sell: 1 },
    },
    overall: {
      summary: "Deep-value banking play with capital cushion and improving NIMs. Slight technical neutrality limits short-term upside conviction.",
      strengths: [
        "Trading at 0.6× book with 19% ROE — unusually attractive",
        "Strong capital ratios provide defensive characteristics",
        "10.4% dividend yield with 44% payout — well covered",
      ],
      risks: [
        "Regulatory tinkering with minimum saving rate floor",
        "Loan growth lagging sector — slower earnings recovery",
      ],
      timeHorizon: "12 months",
    },
  },

  LUCK: {
    ticker: "LUCK",
    name: "Lucky Cement",
    sector: "Cement",
    price: 780.0,
    change: -0.6,
    scores: { technical: 4.2, fundamental: 7.1, news: 5.4, overall: 5.7 },
    recommendation: "Hold",
    confidence: 64,
    technical: {
      summary: "Bearish MACD cross with price below 20-day EMA; consolidating near support.",
      indicators: [
        { label: "RSI (14)", value: "44", signal: "neutral", hint: "Below midline" },
        { label: "MACD", value: "Bearish cross", signal: "bear" },
        { label: "EMA 20 / 50 / 200", value: "Below 20, above 200", signal: "neutral" },
        { label: "ADX", value: "16", signal: "neutral", hint: "Weak trend" },
        { label: "Volume vs 30D avg", value: "0.8×", signal: "bear", hint: "Below average" },
        { label: "Bollinger Position", value: "Lower third", signal: "bear" },
      ],
      patterns: [
        { name: "Bearish MACD Cross", bullish: false, confidence: 68 },
        { name: "Lower High Sequence", bullish: false, confidence: 55 },
      ],
      levels: [
        { type: "Resistance", price: 810.0, strength: "strong" },
        { type: "Resistance", price: 845.0, strength: "moderate" },
        { type: "Support", price: 760.0, strength: "strong" },
        { type: "Support", price: 720.0, strength: "moderate" },
      ],
      priceHistory: genTrend(820, 780, 60, 0.02),
    },
    fundamental: {
      summary: "Strong balance sheet but earnings growth has slowed materially; valuation in line with sector.",
      metrics: [
        { label: "P/E", value: "9.1×", sectorAvg: "9.8×", status: "good" },
        { label: "ROE", value: "16%", sectorAvg: "13%", status: "good" },
        { label: "EPS Growth (YoY)", value: "+4%", sectorAvg: "+9%", status: "bad" },
        { label: "Div Yield", value: "3.1%", sectorAvg: "4.2%", status: "bad" },
        { label: "Debt / Equity", value: "0.18", sectorAvg: "0.48", status: "good" },
        { label: "Op Margin", value: "21%", sectorAvg: "17%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "Net cash of PKR 38B and D/E of 0.18 — fortress balance sheet" },
        { type: "+", text: "Operating margin 4pp above sector average" },
        { type: "-", text: "EPS growth of just 4% vs sector 9% — demand-driven slowdown" },
        { type: "-", text: "Dividend yield below sector — capital being retained" },
      ],
    },
    news: {
      summary: "Mixed tone with sector cement dispatches falling and uncertainty around upcoming budget.",
      label: "Mixed",
      sentimentTrend: genSentiment(-0.05),
      items: [
        { headline: "Cement dispatches fall 8% YoY in April amid weak construction", source: "Tribune", sentiment: "Bearish", daysAgo: 2 },
        { headline: "Federal budget could include infrastructure stimulus — cement watch", source: "Dawn", sentiment: "Bullish", daysAgo: 4 },
        { headline: "Lucky Cement maintains FY24 EBITDA guidance despite volume softness", source: "Business Recorder", sentiment: "Neutral", daysAgo: 6 },
        { headline: "Coal prices stabilise — cement margins protected near-term", source: "Dawn", sentiment: "Neutral", daysAgo: 9 },
      ],
      analysts: { buy: 4, hold: 6, sell: 2 },
    },
    overall: {
      summary: "Quality balance sheet but cyclical earnings pressure and weak technicals warrant a hold. Reassess after June budget.",
      strengths: [
        "Net cash balance sheet and operating margins above sector",
        "Low debt provides downside protection during cycle",
      ],
      risks: [
        "Construction demand recovery slower than expected",
        "Bearish technical setup needs confirmation of base",
        "Coal price volatility could pressure margins",
      ],
      timeHorizon: "12+ months — wait for catalyst",
    },
  },

  SYS: {
    ticker: "SYS",
    name: "Systems Limited",
    sector: "Technology",
    price: 442.1,
    change: 2.3,
    scores: { technical: 8.1, fundamental: 8.8, news: 7.6, overall: 8.3 },
    recommendation: "Strong Buy",
    confidence: 84,
    technical: {
      summary: "Flag breakout with above-average volume; RSI rising but not yet overbought.",
      indicators: [
        { label: "RSI (14)", value: "64", signal: "bull", hint: "Strong but not extreme" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "32", signal: "bull", hint: "Strong trend" },
        { label: "Volume vs 30D avg", value: "2.4×", signal: "bull" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "Flag Breakout", bullish: true, confidence: 84 },
        { name: "Higher High / Higher Low", bullish: true, confidence: 92 },
      ],
      levels: [
        { type: "Resistance", price: 460.0, strength: "strong" },
        { type: "Resistance", price: 498.0, strength: "moderate" },
        { type: "Support", price: 425.0, strength: "strong" },
        { type: "Support", price: 408.0, strength: "moderate" },
      ],
      priceHistory: genTrend(380, 442.1, 60, 0.022),
    },
    fundamental: {
      summary: "Sector-leading growth with 28% ROE and near debt-free balance sheet; valuation premium justified.",
      metrics: [
        { label: "P/E", value: "14.5×", sectorAvg: "16.2×", status: "good" },
        { label: "ROE", value: "28%", sectorAvg: "21%", status: "good" },
        { label: "Revenue Growth (YoY)", value: "+38%", sectorAvg: "+24%", status: "good" },
        { label: "EPS Growth (YoY)", value: "+46%", sectorAvg: "+28%", status: "good" },
        { label: "Debt / Equity", value: "0.08", sectorAvg: "0.18", status: "good" },
        { label: "Op Margin", value: "26%", sectorAvg: "22%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "38% revenue growth with margin expansion — operating leverage" },
        { type: "+", text: "Near debt-free balance sheet and 28% ROE" },
        { type: "+", text: "IT export momentum + SEZ policy benefits long-term" },
        { type: "-", text: "Premium valuation leaves no room for execution misses" },
      ],
    },
    news: {
      summary: "Net positive on IT exports trajectory; SEZ-related policy headlines supportive.",
      label: "Bullish",
      sentimentTrend: genSentiment(0.35),
      items: [
        { headline: "Systems Ltd Q1 revenue +42% YoY; raises full-year guidance", source: "Dawn", sentiment: "Bullish", daysAgo: 1 },
        { headline: "Pakistan IT exports cross $4B run-rate — tailwind for sector", source: "Tribune", sentiment: "Bullish", daysAgo: 3 },
        { headline: "SEZ policy clarification expected by Q3 — Systems exposed", source: "Business Recorder", sentiment: "Bullish", daysAgo: 5 },
        { headline: "Currency stability aids tech sector margins on USD revenues", source: "Dawn", sentiment: "Bullish", daysAgo: 7 },
      ],
      analysts: { buy: 11, hold: 2, sell: 0 },
    },
    overall: {
      summary: "Top-quartile growth across all three signal layers. Premium valuation is the main risk, but warranted given execution.",
      strengths: [
        "Best-in-class growth profile across sector and market",
        "Operating leverage delivering margin expansion",
        "Net cash position and high ROE — quality compounder",
      ],
      risks: [
        "Premium multiple sensitive to growth deceleration",
        "PKR appreciation reduces USD-denominated revenue value",
      ],
      timeHorizon: "12–24 months",
    },
  },

  OGDC: {
    ticker: "OGDC",
    name: "Oil & Gas Dev. Co.",
    sector: "Exploration & Production",
    price: 138.75,
    change: 1.1,
    scores: { technical: 7.0, fundamental: 7.8, news: 6.4, overall: 7.1 },
    recommendation: "Buy",
    confidence: 72,
    technical: {
      summary: "20-day breakout with widening Bollinger bands; volume confirming the move.",
      indicators: [
        { label: "RSI (14)", value: "55", signal: "bull" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "24", signal: "neutral", hint: "Moderate trend" },
        { label: "Volume vs 30D avg", value: "1.6×", signal: "bull" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "20D Breakout", bullish: true, confidence: 76 },
      ],
      levels: [
        { type: "Resistance", price: 145.0, strength: "strong" },
        { type: "Resistance", price: 154.0, strength: "moderate" },
        { type: "Support", price: 134.0, strength: "strong" },
      ],
      priceHistory: genTrend(126, 138.75, 60, 0.015),
    },
    fundamental: {
      summary: "Cheap on EV/EBITDA with 21% ROE; main overhang is circular debt receivables.",
      metrics: [
        { label: "P/E", value: "5.6×", sectorAvg: "6.4×", status: "good" },
        { label: "EV / EBITDA", value: "3.2×", sectorAvg: "4.1×", status: "good" },
        { label: "ROE", value: "21%", sectorAvg: "18%", status: "good" },
        { label: "Div Yield", value: "9.8%", sectorAvg: "8.4%", status: "good" },
        { label: "Debt / Equity", value: "0.04", sectorAvg: "0.21", status: "good" },
        { label: "Net Margin", value: "32%", sectorAvg: "28%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "EV/EBITDA of 3.2× vs sector 4.1× — material discount" },
        { type: "+", text: "62% gross margin with strong reserve replacement" },
        { type: "-", text: "Circular debt receivables of PKR 480B remain a drag" },
      ],
    },
    news: {
      summary: "Sector tone steady; circular debt resolution chatter providing intermittent positive signal.",
      label: "Neutral",
      sentimentTrend: genSentiment(0.1),
      items: [
        { headline: "Circular debt resolution plan progresses in cabinet review", source: "Dawn", sentiment: "Bullish", daysAgo: 2 },
        { headline: "Brent settles above $82 — local E&P names supported", source: "Tribune", sentiment: "Bullish", daysAgo: 4 },
        { headline: "OGDC announces new exploration block award in Balochistan", source: "Business Recorder", sentiment: "Bullish", daysAgo: 6 },
        { headline: "Gas tariff revision delayed — OGDC realization uncertain", source: "Dawn", sentiment: "Neutral", daysAgo: 9 },
      ],
      analysts: { buy: 8, hold: 3, sell: 1 },
    },
    overall: {
      summary: "Cheap valuation, high yield, and improving sector tone. Circular debt remains the structural overhang.",
      strengths: [
        "Lowest EV/EBITDA in sector with above-sector profitability",
        "9.8% dividend yield with comfortable coverage",
      ],
      risks: [
        "Circular debt accumulation despite resolution promises",
        "Oil price volatility — Brent below $75 changes thesis",
      ],
      timeHorizon: "12 months",
    },
  },

  MCB: {
    ticker: "MCB",
    name: "MCB Bank Limited",
    sector: "Banking",
    price: 212.4,
    change: -0.3,
    scores: { technical: 5.4, fundamental: 7.4, news: 6.6, overall: 6.5 },
    recommendation: "Hold",
    confidence: 68,
    technical: {
      summary: "MACD turning neutral; price flat below 50-day average, awaiting catalyst.",
      indicators: [
        { label: "RSI (14)", value: "49", signal: "neutral" },
        { label: "MACD", value: "Neutral", signal: "neutral" },
        { label: "EMA 20 / 50 / 200", value: "Below 20/50", signal: "bear" },
        { label: "ADX", value: "14", signal: "neutral", hint: "Weak trend" },
        { label: "Volume vs 30D avg", value: "0.9×", signal: "neutral" },
        { label: "Bollinger Position", value: "Mid", signal: "neutral" },
      ],
      patterns: [
        { name: "Tight Consolidation", bullish: false, confidence: 58 },
      ],
      levels: [
        { type: "Resistance", price: 218.0, strength: "moderate" },
        { type: "Resistance", price: 232.0, strength: "strong" },
        { type: "Support", price: 206.0, strength: "strong" },
        { type: "Support", price: 195.0, strength: "moderate" },
      ],
      priceHistory: genTrend(216, 212.4, 60, 0.012),
    },
    fundamental: {
      summary: "Top-tier ROE banking franchise but slower earnings growth than HBL; fairly valued.",
      metrics: [
        { label: "P/E", value: "5.1×", sectorAvg: "4.6×", status: "neutral" },
        { label: "P/B", value: "0.8×", sectorAvg: "0.8×", status: "neutral" },
        { label: "ROE", value: "21%", sectorAvg: "17%", status: "good" },
        { label: "Div Yield", value: "9.1%", sectorAvg: "8.9%", status: "neutral" },
        { label: "CAR (Tier 1)", value: "19.4%", sectorAvg: "14.5%", status: "good" },
        { label: "NPL Ratio", value: "4.8%", sectorAvg: "6.2%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "Top sector ROE of 21% and strong asset quality" },
        { type: "+", text: "Tier 1 capital of 19.4% — best in sector" },
        { type: "-", text: "EPS growth of 6% trails sector — conservative posture" },
      ],
    },
    news: {
      summary: "Steady; supported by macro stability but no specific positive catalyst.",
      label: "Neutral",
      sentimentTrend: genSentiment(0.05),
      items: [
        { headline: "MCB Q1 EPS up 6% YoY; conservative provisioning continues", source: "Dawn", sentiment: "Neutral", daysAgo: 3 },
        { headline: "SBP rate hold benefits established deposit franchises", source: "Tribune", sentiment: "Bullish", daysAgo: 4 },
        { headline: "Minimum saving rate floor pressure on bank margins", source: "Business Recorder", sentiment: "Bearish", daysAgo: 6 },
      ],
      analysts: { buy: 4, hold: 7, sell: 1 },
    },
    overall: {
      summary: "Quality franchise but lacking near-term catalyst. Hold for yield; switch to HBL if you want active banking exposure.",
      strengths: [
        "Best-in-sector capital ratios and asset quality",
        "21% ROE with 9.1% dividend yield",
      ],
      risks: [
        "Lagging sector earnings growth on conservative lending",
        "Trades at sector P/E despite ROE premium — fully valued",
      ],
      timeHorizon: "12 months · for yield",
    },
  },

  MEBL: {
    ticker: "MEBL",
    name: "Meezan Bank",
    sector: "Banking",
    price: 225.6,
    change: 1.6,
    scores: { technical: 8.2, fundamental: 8.8, news: 7.6, overall: 8.4 },
    recommendation: "Strong Buy",
    confidence: 86,
    technical: {
      summary: "Cleanly broke 220 resistance on 2.3× volume; strongest momentum profile in banking sector.",
      indicators: [
        { label: "RSI (14)", value: "62", signal: "bull" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "30", signal: "bull", hint: "Strong trend" },
        { label: "Volume vs 30D avg", value: "2.3×", signal: "bull" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "20D Breakout", bullish: true, confidence: 88 },
        { name: "Higher High Sequence", bullish: true, confidence: 80 },
      ],
      levels: [
        { type: "Resistance", price: 234.0, strength: "moderate" },
        { type: "Support", price: 218.0, strength: "strong" },
        { type: "Support", price: 208.0, strength: "moderate" },
      ],
      priceHistory: genTrend(202, 225.6, 60, 0.02),
    },
    fundamental: {
      summary: "Highest-ROE bank (28%) with growing low-cost CASA franchise; valuation premium justified.",
      metrics: [
        { label: "P/E", value: "5.8×", sectorAvg: "4.6×", status: "neutral" },
        { label: "P/B", value: "1.4×", sectorAvg: "0.8×", status: "neutral" },
        { label: "ROE", value: "28%", sectorAvg: "17%", status: "good" },
        { label: "Div Yield", value: "7.6%", sectorAvg: "8.9%", status: "neutral" },
        { label: "CAR (Tier 1)", value: "21.2%", sectorAvg: "14.5%", status: "good" },
        { label: "NPL Ratio", value: "2.1%", sectorAvg: "6.2%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "Industry-leading 28% ROE with sector-best CAR of 21.2%" },
        { type: "+", text: "CASA mix above 70% — structural NIM advantage" },
        { type: "-", text: "Premium valuation leaves no margin for execution miss" },
      ],
    },
    news: {
      summary: "Solid sentiment going into Q1 results; Islamic banking growth narrative supportive.",
      label: "Bullish",
      sentimentTrend: genSentiment(0.35),
      items: [
        { headline: "Meezan Bank Q1 due in 2 weeks — consensus +18% NII growth", source: "Dawn", sentiment: "Bullish", daysAgo: 1 },
        { headline: "Islamic banking deposit share crosses 22% nationally", source: "Tribune", sentiment: "Bullish", daysAgo: 4 },
        { headline: "MEBL announces new branch expansion plan", source: "Business Recorder", sentiment: "Bullish", daysAgo: 7 },
      ],
      analysts: { buy: 10, hold: 2, sell: 0 },
    },
    overall: {
      summary: "Top conviction in banking — strongest fundamentals across the universe and a breakout technical setup heading into earnings.",
      strengths: [
        "Best-in-class ROE and asset quality",
        "Structural deposit advantage from Islamic franchise",
        "Strong technical setup confirms fundamental thesis",
      ],
      risks: [
        "Valuation premium sensitive to growth deceleration",
        "Sharia-board regulatory changes could impact product mix",
      ],
      timeHorizon: "12–18 months",
    },
  },

  PPL: {
    ticker: "PPL",
    name: "Pakistan Petroleum",
    sector: "Exploration & Production",
    price: 102.4,
    change: 1.4,
    scores: { technical: 7.6, fundamental: 8.4, news: 7.2, overall: 8.1 },
    recommendation: "Buy",
    confidence: 80,
    technical: {
      summary: "Ascending triangle resolving higher; volume building under the apex.",
      indicators: [
        { label: "RSI (14)", value: "61", signal: "bull" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "26", signal: "bull", hint: "Strong trend" },
        { label: "Volume vs 30D avg", value: "1.9×", signal: "bull" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "Ascending Triangle", bullish: true, confidence: 82 },
      ],
      levels: [
        { type: "Resistance", price: 108.0, strength: "strong" },
        { type: "Resistance", price: 115.0, strength: "moderate" },
        { type: "Support", price: 96.0, strength: "strong" },
      ],
      priceHistory: genTrend(92, 102.4, 60, 0.018),
    },
    fundamental: {
      summary: "Cheapest E&P on EV/EBITDA (3.0×) with the highest dividend yield (11.4%).",
      metrics: [
        { label: "P/E", value: "4.8×", sectorAvg: "6.4×", status: "good" },
        { label: "EV / EBITDA", value: "3.0×", sectorAvg: "4.1×", status: "good" },
        { label: "ROE", value: "18%", sectorAvg: "18%", status: "neutral" },
        { label: "Div Yield", value: "11.4%", sectorAvg: "8.4%", status: "good" },
        { label: "Debt / Equity", value: "0.06", sectorAvg: "0.21", status: "good" },
        { label: "Net Margin", value: "29%", sectorAvg: "28%", status: "neutral" },
      ],
      highlights: [
        { type: "+", text: "Lowest EV/EBITDA in sector despite comparable production profile" },
        { type: "+", text: "11.4% dividend yield with 55% payout — well covered" },
        { type: "-", text: "Circular debt exposure of PKR 280B remains a structural drag" },
      ],
    },
    news: {
      summary: "Brent firmness and circular debt resolution progress driving positive tape.",
      label: "Bullish",
      sentimentTrend: genSentiment(0.25),
      items: [
        { headline: "Circular debt resolution plan moves to cabinet review", source: "Dawn", sentiment: "Bullish", daysAgo: 2 },
        { headline: "Brent settles above $82 — local E&P names rally", source: "Tribune", sentiment: "Bullish", daysAgo: 4 },
        { headline: "PPL announces new gas discovery in Sindh block", source: "Business Recorder", sentiment: "Bullish", daysAgo: 6 },
      ],
      analysts: { buy: 9, hold: 2, sell: 0 },
    },
    overall: {
      summary: "Cheapest E&P with the highest yield and a clean technical setup. Circular debt is the only meaningful overhang.",
      strengths: [
        "Lowest EV/EBITDA in sector with strong production profile",
        "11.4% yield gives a margin of safety",
        "Technical breakout aligns with fundamental cheapness",
      ],
      risks: [
        "Circular debt accumulation despite resolution promises",
        "Brent below $75 changes the dividend cover math",
      ],
      timeHorizon: "12 months",
    },
  },

  FFC: {
    ticker: "FFC",
    name: "Fauji Fertiliser",
    sector: "Fertiliser",
    price: 154.2,
    change: 1.1,
    scores: { technical: 6.8, fundamental: 8.2, news: 7.4, overall: 7.6 },
    recommendation: "Buy",
    confidence: 78,
    technical: {
      summary: "Recently broke 150 resistance; trend constructive though momentum less explosive than peers.",
      indicators: [
        { label: "RSI (14)", value: "57", signal: "bull" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "21", signal: "neutral" },
        { label: "Volume vs 30D avg", value: "1.4×", signal: "bull" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "Resistance Break", bullish: true, confidence: 74 },
      ],
      levels: [
        { type: "Resistance", price: 162.0, strength: "moderate" },
        { type: "Support", price: 148.0, strength: "strong" },
      ],
      priceHistory: genTrend(140, 154.2, 60, 0.014),
    },
    fundamental: {
      summary: "Sector-leading ROE (22%) with near debt-free balance sheet — defensive cyclical exposure.",
      metrics: [
        { label: "P/E", value: "7.4×", sectorAvg: "7.2×", status: "neutral" },
        { label: "ROE", value: "22%", sectorAvg: "16%", status: "good" },
        { label: "EPS Growth (YoY)", value: "+8%", sectorAvg: "+11%", status: "neutral" },
        { label: "Div Yield", value: "7.8%", sectorAvg: "6.4%", status: "good" },
        { label: "Debt / Equity", value: "0.12", sectorAvg: "0.52", status: "good" },
        { label: "Net Margin", value: "17%", sectorAvg: "13%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "22% ROE leads the fertiliser sector by 6 points" },
        { type: "+", text: "Near debt-free with 7.8% covered dividend yield" },
        { type: "-", text: "Gas pricing review could compress margins in H2" },
      ],
    },
    news: {
      summary: "Steady; sector commentary supportive though gas pricing uncertainty caps upside near-term.",
      label: "Neutral",
      sentimentTrend: genSentiment(0.15),
      items: [
        { headline: "FFC declares interim dividend of PKR 4.50/share", source: "Dawn", sentiment: "Bullish", daysAgo: 3 },
        { headline: "Gas pricing review delayed — fertiliser sector watching", source: "Tribune", sentiment: "Neutral", daysAgo: 5 },
        { headline: "Urea demand recovery in evidence — manufacturer feedback", source: "Business Recorder", sentiment: "Bullish", daysAgo: 7 },
      ],
      analysts: { buy: 7, hold: 4, sell: 0 },
    },
    overall: {
      summary: "Quality defensive play in fertiliser cycle — best ROE, lowest leverage, 7.8% yield.",
      strengths: [
        "Sector-leading ROE and balance sheet quality",
        "Yield + low debt provides downside protection",
      ],
      risks: [
        "Gas pricing revision could compress margins",
        "Slower EPS growth than sector — limits upside",
      ],
      timeHorizon: "12 months · for yield + quality",
    },
  },

  UBL: {
    ticker: "UBL",
    name: "United Bank Limited",
    sector: "Banking",
    price: 198.5,
    change: 1.2,
    scores: { technical: 6.6, fundamental: 7.8, news: 7.4, overall: 7.4 },
    recommendation: "Buy",
    confidence: 74,
    technical: {
      summary: "Steady uptrend with bullish engulfing pattern last session; momentum building.",
      indicators: [
        { label: "RSI (14)", value: "56", signal: "bull" },
        { label: "MACD", value: "Bullish", signal: "bull" },
        { label: "EMA 20 / 50 / 200", value: "Above all", signal: "bull" },
        { label: "ADX", value: "19", signal: "neutral" },
        { label: "Volume vs 30D avg", value: "1.5×", signal: "bull" },
        { label: "Bollinger Position", value: "Upper third", signal: "bull" },
      ],
      patterns: [
        { name: "Bullish Engulfing", bullish: true, confidence: 72 },
      ],
      levels: [
        { type: "Resistance", price: 206.0, strength: "moderate" },
        { type: "Support", price: 190.0, strength: "strong" },
      ],
      priceHistory: genTrend(184, 198.5, 60, 0.015),
    },
    fundamental: {
      summary: "Cheap on P/B (0.7×) with the highest dividend yield in big-bank universe (11.2%).",
      metrics: [
        { label: "P/E", value: "4.6×", sectorAvg: "4.6×", status: "neutral" },
        { label: "P/B", value: "0.7×", sectorAvg: "0.8×", status: "good" },
        { label: "ROE", value: "20%", sectorAvg: "17%", status: "good" },
        { label: "Div Yield", value: "11.2%", sectorAvg: "8.9%", status: "good" },
        { label: "CAR (Tier 1)", value: "17.2%", sectorAvg: "14.5%", status: "good" },
        { label: "NPL Ratio", value: "5.1%", sectorAvg: "6.2%", status: "good" },
      ],
      highlights: [
        { type: "+", text: "Highest dividend yield among big banks — 11.2%" },
        { type: "+", text: "P/B of 0.7× with 20% ROE — value with quality" },
        { type: "+", text: "Strong fee income mix (24%) — diversified earnings" },
      ],
    },
    news: {
      summary: "Recent earnings beat and interim dividend reinforced the income thesis.",
      label: "Bullish",
      sentimentTrend: genSentiment(0.25),
      items: [
        { headline: "UBL Q1 net profit up 12% — beats consensus", source: "Dawn", sentiment: "Bullish", daysAgo: 2 },
        { headline: "UBL board approves interim dividend of PKR 11/share", source: "Tribune", sentiment: "Bullish", daysAgo: 4 },
        { headline: "International remittance volumes strong — UBL fee income tailwind", source: "Business Recorder", sentiment: "Bullish", daysAgo: 7 },
      ],
      analysts: { buy: 8, hold: 3, sell: 0 },
    },
    overall: {
      summary: "Highest-yielding big bank with 20% ROE and strong capital — income with growth optionality.",
      strengths: [
        "11.2% dividend yield with comfortable cover",
        "Diversified fee income reduces NIM dependence",
        "Strong capital ratios provide defensive characteristics",
      ],
      risks: [
        "Minimum saving rate review could pressure deposit margins",
        "Technical setup less explosive than MEBL — slower upside",
      ],
      timeHorizon: "12 months · for income",
    },
  },
};

export const signalStocks = Object.values(signalsByTicker).map((s) => ({
  ticker: s.ticker,
  name: s.name,
  sector: s.sector,
  price: s.price,
  change: s.change,
}));
