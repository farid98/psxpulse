export type ImpactScore = -2 | -1 | 0 | 1 | 2 | null;

export interface SectorImpact {
  score: ImpactScore;
  reason: string;
  stocks: { ticker: string; name: string; score: ImpactScore; note: string }[];
}

export interface MarketEvent {
  id: string;
  date: string;
  category: "Macro" | "Policy" | "Sector" | "Global";
  headline: string;
  detail: string;
  sectorImpacts: Partial<Record<string, SectorImpact>>;
}

export const impactSectors = [
  "Banking", "E&P", "Fertiliser", "Cement", "Textiles", "Technology", "Power", "Auto", "Pharma",
];

export const marketEvents: MarketEvent[] = [
  {
    id: "1",
    date: "27 May",
    category: "Policy",
    headline: "SBP holds rate at 12%",
    detail: "The Monetary Policy Committee voted unanimously to hold at 12%, citing CPI easing to 13.4% YoY and a stable PKR. The statement noted that if inflation continues its downward path, a 100–150bps cut could come at the July review. Markets had priced a 50% probability of a cut, so the hold was mildly hawkish at the margin.",
    sectorImpacts: {
      Banking:   { score: 2,  reason: "Stable NIMs; no NII compression from a cut", stocks: [{ ticker: "HBL", name: "Habib Bank", score: 2, note: "NIM-sensitive; hold benefits earnings" }, { ticker: "MEBL", name: "Meezan Bank", score: 2, note: "High CASA ratio amplifies NIM benefit" }] },
      "E&P":     { score: 1,  reason: "Lower cost of capital for capex financing", stocks: [{ ticker: "OGDC", name: "OGDC", score: 1, note: "Minor benefit on borrowing costs" }] },
      Fertiliser:{ score: 0,  reason: "Rate-neutral; gas pricing is the key variable", stocks: [] },
      Cement:    { score: -1, reason: "Elevated financing costs persist, suppressing demand", stocks: [{ ticker: "LUCK", name: "Lucky Cement", score: -1, note: "Consumer financing still expensive" }] },
      Textiles:  { score: 0,  reason: "Marginal; export competitiveness drives the sector", stocks: [] },
      Technology:{ score: 1,  reason: "Stable cost of debt; growth-mode companies benefit", stocks: [{ ticker: "SYS", name: "Systems Ltd", score: 1, note: "Lower discount rate supports premium valuation" }] },
      Power:     { score: 0,  reason: "Tariff outcome is the key variable, not rates", stocks: [] },
      Auto:      { score: -1, reason: "High rates still suppress vehicle financing demand", stocks: [{ ticker: "PSMC", name: "Pak Suzuki", score: -1, note: "Financing penetration key to volume recovery" }] },
      Pharma:    { score: 0,  reason: "Largely rate-insensitive; rupee stability matters more", stocks: [] },
    },
  },
  {
    id: "2",
    date: "27 May",
    category: "Macro",
    headline: "IMF $1.1B tranche cleared",
    detail: "The IMF Executive Board approved the 7th review of Pakistan's $3B Stand-By Arrangement, clearing a $1.1B disbursement two weeks ahead of schedule. The early clearance was driven by strong fiscal performance (primary surplus of 0.4% of GDP vs. 0.2% target) and FX reserve accumulation. Pakistan's gross reserves now stand at $9.8B, up from $4.3B a year ago.",
    sectorImpacts: {
      Banking:   { score: 2,  reason: "Sovereign risk reduction; re-rating of Pakistan-linked assets", stocks: [{ ticker: "HBL", name: "Habib Bank", score: 2, note: "Foreign holdings in HBL likely to increase" }, { ticker: "MCB", name: "MCB Bank", score: 1, note: "Benefits from improved sovereign creditworthiness" }] },
      "E&P":     { score: 2,  reason: "Circular debt resolution pathway strengthened", stocks: [{ ticker: "OGDC", name: "OGDC", score: 2, note: "Receivables risk reduced materially" }, { ticker: "PPL", name: "Pakistan Petroleum", score: 2, note: "Direct beneficiary of circular debt easing" }] },
      Fertiliser:{ score: 1,  reason: "Macro stability supports subsidy payment reliability", stocks: [] },
      Cement:    { score: 1,  reason: "PSDP disbursement more likely; construction pipeline opens", stocks: [{ ticker: "LUCK", name: "Lucky Cement", score: 1, note: "Government project volume could recover" }] },
      Textiles:  { score: 0,  reason: "IMF conditionalities may limit export subsidies", stocks: [] },
      Technology:{ score: 1,  reason: "Macro confidence boosts IT investment sentiment", stocks: [{ ticker: "SYS", name: "Systems Ltd", score: 1, note: "Foreign clients more willing to commit to Pakistan-based delivery" }] },
      Power:     { score: 1,  reason: "FX reserves improve import cover for fuel", stocks: [] },
      Auto:      { score: 0,  reason: "Macro positive but financing cost the key constraint", stocks: [] },
      Pharma:    { score: 1,  reason: "Import cost of raw materials supported by PKR stability", stocks: [] },
    },
  },
  {
    id: "3",
    date: "26 May",
    category: "Sector",
    headline: "Textile exports dip 4.2% MoM",
    detail: "PBS data showed textile exports at $1.34B in April vs $1.40B in March. The decline was broad-based: yarn exports fell 6.1%, knitwear -3.8%, bed linen -2.1%. APTMA attributed the weakness to PKR appreciation of ~4% over the past 60 days making Pakistani goods less competitive vs. Bangladesh (BDT has depreciated 8% over the same period). The trend is expected to persist through Q1 FY26.",
    sectorImpacts: {
      Banking:   { score: -1, reason: "Trade finance volumes soften with export decline", stocks: [] },
      "E&P":     { score: 0,  reason: "No direct link", stocks: [] },
      Fertiliser:{ score: 0,  reason: "No direct link", stocks: [] },
      Cement:    { score: 0,  reason: "No direct link", stocks: [] },
      Textiles:  { score: -2, reason: "Core revenue miss; margin pressure from PKR appreciation", stocks: [{ ticker: "NML", name: "Nishat Mills", score: -2, note: "Largest exporter; direct revenue impact" }, { ticker: "GATM", name: "Gul Ahmed", score: -2, note: "High export mix amplifies downside" }] },
      Technology:{ score: 0,  reason: "No direct link", stocks: [] },
      Power:     { score: -1, reason: "Lower industrial load reduces captive power demand", stocks: [] },
      Auto:      { score: 0,  reason: "No direct link", stocks: [] },
      Pharma:    { score: 0,  reason: "No direct link", stocks: [] },
    },
  },
  {
    id: "4",
    date: "26 May",
    category: "Global",
    headline: "Brent crude +2.1% on supply cut signals",
    detail: "Brent settled at $83.4/bbl after OPEC+ sources indicated the June meeting may extend the 1mbpd voluntary cut through Q3. Saudi Arabia signalled willingness to act unilaterally if needed. The move came alongside a weaker dollar index (-0.4%) and stronger Chinese manufacturing PMI (51.2 vs 50.6 expected), both of which support commodity demand expectations.",
    sectorImpacts: {
      Banking:   { score: 0,  reason: "Indirect; trade balance impact minimal short-term", stocks: [] },
      "E&P":     { score: 2,  reason: "Direct uplift to realisation prices for domestic producers", stocks: [{ ticker: "OGDC", name: "OGDC", score: 2, note: "POL revenue directly linked to Brent" }, { ticker: "PPL", name: "Pakistan Petroleum", score: 2, note: "Same uplift; higher dividend visibility" }] },
      Fertiliser:{ score: -1, reason: "Gas feedstock costs may rise in next revision", stocks: [] },
      Cement:    { score: -1, reason: "Energy cost input pressure", stocks: [] },
      Textiles:  { score: -1, reason: "Fuel/energy surcharge risk on exports", stocks: [] },
      Technology:{ score: 0,  reason: "No direct link", stocks: [] },
      Power:     { score: -1, reason: "Fuel import costs rise; margin pressure on oil-based IPPs", stocks: [] },
      Auto:      { score: -1, reason: "Fuel cost increase dampens consumer spending on vehicles", stocks: [] },
      Pharma:    { score: 0,  reason: "Minimal direct impact", stocks: [] },
    },
  },
  {
    id: "5",
    date: "25 May",
    category: "Policy",
    headline: "NEPRA tariff review hearing opens",
    detail: "NEPRA initiated a public hearing on the proposed Q3 FY25 power tariff determination, with submissions open for 30 days. The regulator is weighing a blended tariff increase of PKR 1.8–2.4/kWh across consumer categories. IPPs with dollar-indexed or fuel-pass-through tariffs are largely insulated; the impact falls primarily on distribution companies and industrial consumers with fixed-rate agreements.",
    sectorImpacts: {
      Banking:   { score: 0,  reason: "No direct link", stocks: [] },
      "E&P":     { score: 0,  reason: "No direct link", stocks: [] },
      Fertiliser:{ score: -1, reason: "Gas tariff linkage creates uncertainty for input costs", stocks: [] },
      Cement:    { score: -1, reason: "Higher power tariff would raise kiln operating costs", stocks: [{ ticker: "LUCK", name: "Lucky Cement", score: -1, note: "Power is 25% of production cost" }] },
      Textiles:  { score: -1, reason: "Energy-intensive sector; tariff hike compresses margins", stocks: [] },
      Technology:{ score: 0,  reason: "Minimal power dependency in operations", stocks: [] },
      Power:     { score: 1,  reason: "Indexed IPPs benefit; tariff revision removes regulatory uncertainty", stocks: [] },
      Auto:      { score: 0,  reason: "Minimal direct impact", stocks: [] },
      Pharma:    { score: 0,  reason: "Minimal direct impact", stocks: [] },
    },
  },
];
