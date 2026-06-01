import type { PeerCompare } from "@/data/fundamentals";

interface Props {
  peers: PeerCompare[];
  sectorName: string;
}

const metrics = [
  { key: "pe" as const, label: "P/E", suffix: "×", betterWhen: "low" as const },
  { key: "pb" as const, label: "P/B", suffix: "×", betterWhen: "low" as const },
  { key: "divYield" as const, label: "Div Yield", suffix: "%", betterWhen: "high" as const },
  { key: "roe" as const, label: "ROE", suffix: "%", betterWhen: "high" as const },
];

export function PeerComparison({ peers, sectorName }: Props) {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Peer Comparison
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">
          {sectorName} · key valuation metrics
        </p>
      </div>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-stone-100">
            <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              Peer
            </th>
            {metrics.map((m) => (
              <th
                key={m.key}
                className="text-right px-3 py-2.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider"
              >
                {m.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {peers.map((peer) => (
            <tr
              key={peer.ticker}
              className={
                peer.current
                  ? "bg-emerald-50/40"
                  : "hover:bg-stone-50/70 transition-colors"
              }
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  {peer.current && <span className="w-1 h-3 rounded-full bg-emerald-500" />}
                  <div>
                    <p
                      className={`font-semibold tracking-[-0.005em] ${
                        peer.current ? "text-stone-900" : "text-stone-700"
                      }`}
                    >
                      {peer.ticker}
                    </p>
                    <p className="text-[10px] text-stone-400">{peer.name}</p>
                  </div>
                </div>
              </td>
              {metrics.map((m) => {
                const values = peers.map((p) => p[m.key]);
                const best = m.betterWhen === "high" ? Math.max(...values) : Math.min(...values);
                const isBest = peer[m.key] === best;
                return (
                  <td
                    key={m.key}
                    className={`px-3 py-3 text-right font-semibold tabular-nums ${
                      isBest ? "text-emerald-600" : "text-stone-700"
                    }`}
                  >
                    {peer[m.key].toFixed(1)}
                    {m.suffix}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
