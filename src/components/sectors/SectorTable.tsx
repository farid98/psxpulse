import { sectorsData } from "@/data/sectors";
import { SignalBadge } from "@/components/shared/SignalBadge";

export function SectorTable() {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Full Sector Breakdown
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">All KSE-100 sectors · 1D and 1W changes</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Sector
              </th>
              <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Index Pts
              </th>
              <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                1D
              </th>
              <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                1W
              </th>
              <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                P/E
              </th>
              <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Signal
              </th>
              <th className="text-left px-6 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Key Driver
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sectorsData.map((sector) => {
              const isUp1d = sector.change1d > 0;
              const isUp1w = sector.change1w > 0;
              return (
                <tr
                  key={sector.name}
                  className="hover:bg-stone-50/70 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <span className="font-semibold text-stone-800 tracking-[-0.005em]">
                      {sector.name}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-stone-500 tabular-nums font-medium">
                    {sector.indexPts.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3.5 text-right font-semibold tabular-nums ${
                      isUp1d ? "text-emerald-600" : sector.change1d < 0 ? "text-red-500" : "text-stone-400"
                    }`}
                  >
                    {isUp1d ? "+" : ""}
                    {sector.change1d.toFixed(1)}%
                  </td>
                  <td
                    className={`px-4 py-3.5 text-right font-medium tabular-nums text-[12px] ${
                      isUp1w ? "text-emerald-600" : sector.change1w < 0 ? "text-red-500" : "text-stone-400"
                    }`}
                  >
                    {isUp1w ? "+" : ""}
                    {sector.change1w.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3.5 text-right text-stone-500 font-medium tabular-nums">
                    {sector.pe}×
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <SignalBadge signal={sector.signal} />
                  </td>
                  <td className="px-6 py-3.5 text-stone-500 text-[12px]">{sector.keyDriver}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
