import { holdings, cashPosition } from "@/data/portfolio";

const sectorColors: Record<string, string> = {
  Fertiliser: "bg-emerald-500",
  Banking: "bg-blue-500",
  Technology: "bg-violet-500",
  "E&P": "bg-amber-500",
  Cement: "bg-rose-400",
  Cash: "bg-stone-300",
};

export function AllocationBar() {
  const total =
    holdings.reduce((s, h) => s + h.shares * h.currentPrice, 0) + cashPosition;

  const sectorMap = new Map<string, number>();
  holdings.forEach((h) => {
    const v = h.shares * h.currentPrice;
    sectorMap.set(h.sector, (sectorMap.get(h.sector) ?? 0) + v);
  });
  sectorMap.set("Cash", cashPosition);

  const allocation = Array.from(sectorMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      pct: (value / total) * 100,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Sector Allocation
        </h2>
        <span className="text-[10px] text-stone-400 font-medium">
          {allocation.length} sectors · cash included
        </span>
      </div>
      <div className="flex w-full h-3 rounded-full overflow-hidden gap-px bg-stone-100">
        {allocation.map((a) => (
          <div
            key={a.name}
            className={sectorColors[a.name] ?? "bg-stone-400"}
            style={{ width: `${a.pct}%` }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {allocation.map((a) => (
          <div key={a.name} className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-sm shrink-0 ${
                sectorColors[a.name] ?? "bg-stone-400"
              }`}
            />
            <span className="text-[11px] text-stone-500 truncate">{a.name}</span>
            <span className="text-[11px] text-stone-800 font-semibold tabular-nums ml-auto">
              {a.pct.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
