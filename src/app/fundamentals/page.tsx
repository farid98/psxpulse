import { FundamentalsView } from "@/components/fundamentals/FundamentalsView";

export default function FundamentalsPage() {
  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-[22px] font-semibold text-stone-900 tracking-[-0.02em]">
            Fundamentals
          </h1>
          <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
            Preview
          </span>
        </div>
        <p className="text-[12px] text-stone-500">
          Financial deep-dive with valuation, profitability, growth and balance-sheet metrics
        </p>
      </div>

      <FundamentalsView />
    </div>
  );
}
