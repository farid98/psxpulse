import type { FinancialYear } from "@/data/fundamentals";

interface Props {
  fiveYear: FinancialYear[];
}

interface Row {
  label: string;
  unit: string;
  key: "revenue" | "opProfit" | "netIncome" | "eps";
}

const rows: Row[] = [
  { label: "Revenue", unit: "PKR Bn", key: "revenue" },
  { label: "Operating Profit", unit: "PKR Bn", key: "opProfit" },
  { label: "Net Income", unit: "PKR Bn", key: "netIncome" },
  { label: "EPS", unit: "PKR", key: "eps" },
];

export function FinancialTrend({ fiveYear }: Props) {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          5-Year Financial Trend
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">
          Annual figures · {fiveYear[0].fy} through {fiveYear[fiveYear.length - 1].fy}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Metric
              </th>
              {fiveYear.map((y) => (
                <th
                  key={y.fy}
                  className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider tabular-nums"
                >
                  {y.fy}
                </th>
              ))}
              <th className="text-right px-6 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                5Y Trend
              </th>
              <th className="text-right px-6 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                CAGR
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {rows.map((row) => {
              const values = fiveYear.map((y) => y[row.key]);
              const max = Math.max(...values);
              const min = Math.min(...values);
              const range = max - min || 1;
              const first = values[0];
              const last = values[values.length - 1];
              const cagr = (Math.pow(last / first, 1 / (values.length - 1)) - 1) * 100;
              return (
                <tr key={row.label} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-3.5">
                    <div>
                      <p className="font-semibold text-stone-800 tracking-[-0.005em]">
                        {row.label}
                      </p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                        {row.unit}
                      </p>
                    </div>
                  </td>
                  {values.map((v, i) => (
                    <td
                      key={i}
                      className="px-4 py-3.5 text-right text-stone-700 tabular-nums font-medium"
                    >
                      {row.key === "eps" || v < 100 ? v.toFixed(1) : v.toFixed(0)}
                    </td>
                  ))}
                  <td className="px-6 py-3.5">
                    <div className="flex items-end gap-0.5 h-8 justify-end">
                      {values.map((v, i) => {
                        const h = ((v - min) / range) * 100;
                        return (
                          <div
                            key={i}
                            className="bg-emerald-500/80 rounded-sm"
                            style={{
                              width: 6,
                              height: `${Math.max(h, 12)}%`,
                              minHeight: 4,
                            }}
                          />
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <span
                      className={`text-[12px] font-semibold tabular-nums ${
                        cagr > 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {cagr > 0 ? "+" : ""}
                      {cagr.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
