import type { SignalsProfile } from "@/data/signals";
import { SignalBadge } from "@/components/shared/SignalBadge";

const scoreColor = (s: number) =>
  s >= 7 ? "text-emerald-600" : s >= 4 ? "text-amber-500" : "text-red-500";

const scoreBar = (s: number) =>
  s >= 7 ? "bg-emerald-500" : s >= 4 ? "bg-amber-400" : "bg-red-400";

export function OverallPanel({ data }: { data: SignalsProfile }) {
  const pillars = [
    { label: "Technical", score: data.scores.technical, weight: 30 },
    { label: "Fundamental", score: data.scores.fundamental, weight: 45 },
    { label: "News Signal", score: data.scores.news, weight: 25 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Composite Score + Recommendation - 1 col */}
      <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
            Composite Rating
          </h2>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Blended across 3 signal layers
          </p>
        </div>
        <div className="px-5 py-5 text-center border-b border-stone-100">
          <div className="flex items-baseline justify-center gap-2">
            <span className={`text-[56px] font-semibold tabular-nums leading-none tracking-[-0.04em] ${scoreColor(data.scores.overall)}`}>
              {data.scores.overall.toFixed(1)}
            </span>
            <span className="text-[18px] text-stone-300 font-medium">/ 10</span>
          </div>
          <div className="mt-3 flex justify-center">
            <SignalBadge signal={data.recommendation} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider">Confidence</span>
            <div className="w-16 h-1 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-stone-900 rounded-full" style={{ width: `${data.confidence}%` }} />
            </div>
            <span className="text-[11px] text-stone-700 font-semibold tabular-nums">
              {data.confidence}%
            </span>
          </div>
          <p className="text-[10px] text-stone-400 mt-3">
            Horizon · <span className="text-stone-600 font-medium">{data.overall.timeHorizon}</span>
          </p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Pillar Breakdown
          </p>
          {pillars.map((p) => (
            <div key={p.label} className="mb-2 last:mb-0">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-stone-600 font-medium">{p.label}</span>
                <span className="text-stone-500 tabular-nums">
                  <span className="font-semibold text-stone-800">{p.score.toFixed(1)}</span>{" "}
                  · {p.weight}%
                </span>
              </div>
              <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${scoreBar(p.score)}`}
                  style={{ width: `${(p.score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight summary - 2 cols */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-white border border-stone-200/80 rounded-lg p-5">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Analyst Note
          </p>
          <p className="text-[14px] text-stone-800 leading-relaxed tracking-[-0.005em]">
            {data.overall.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-stone-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <h3 className="text-[12px] font-semibold text-stone-900 tracking-[-0.01em]">
                Strengths
              </h3>
            </div>
            <div className="px-5 py-3 space-y-2.5">
              {data.overall.strengths.map((s, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="text-[10px] font-bold text-emerald-700 mt-1 shrink-0">✓</span>
                  <p className="text-[12px] text-stone-700 leading-snug tracking-[-0.005em]">{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-stone-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              <h3 className="text-[12px] font-semibold text-stone-900 tracking-[-0.01em]">
                Risks
              </h3>
            </div>
            <div className="px-5 py-3 space-y-2.5">
              {data.overall.risks.map((r, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="text-[10px] font-bold text-red-500 mt-1 shrink-0">!</span>
                  <p className="text-[12px] text-stone-700 leading-snug tracking-[-0.005em]">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
