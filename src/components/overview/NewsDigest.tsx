"use client";

import { useState } from "react";
import { newsItems } from "@/data/news";
import type { Sentiment } from "@/types";
import { ChevronDown } from "lucide-react";

const sentimentConfig: Record<Sentiment, { stripe: string; label: string; sourceDot: string }> = {
  Bullish: { stripe: "bg-emerald-500", label: "text-emerald-700", sourceDot: "bg-emerald-400" },
  Bearish: { stripe: "bg-red-500", label: "text-red-600", sourceDot: "bg-red-400" },
  Neutral: { stripe: "bg-stone-300", label: "text-stone-500", sourceDot: "bg-stone-300" },
};

export function NewsDigest() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="bg-slate-800 px-5 py-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-[13px] font-semibold text-white tracking-[-0.01em]">News Digest</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Tap any story for sources</p>
        </div>
        <span className="text-[10px] font-medium text-slate-400 tabular-nums">{newsItems.length} items</span>
      </div>
      <div className="divide-y divide-stone-100">
        {newsItems.map((item) => {
          const cfg = sentimentConfig[item.sentiment];
          const expanded = open === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => setOpen(expanded ? null : item.id)}
                className="w-full px-5 py-3.5 hover:bg-stone-50 transition-colors text-left flex gap-3"
              >
                <div className={`w-[3px] rounded-full shrink-0 mt-0.5 ${cfg.stripe}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${cfg.label}`}>
                      {item.sentiment}
                    </span>
                    <span className="text-[10px] text-stone-300">·</span>
                    <span className="text-[11px] text-stone-400 font-medium">{item.source}</span>
                    <span className="text-[10px] text-stone-300">·</span>
                    <span className="text-[11px] text-stone-400 tabular-nums">{item.time}</span>
                  </div>
                  <p className="text-[13px] text-stone-800 leading-snug tracking-[-0.005em] mb-1.5">
                    {item.headline}
                  </p>
                  <div className="flex gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-stone-300 shrink-0 mt-1 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  strokeWidth={2}
                />
              </button>

              {expanded && (
                <div className="px-5 pb-4 bg-stone-50/60 border-t border-stone-100">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider pt-3 mb-2.5">
                    {item.sources.length} sources covering this story
                  </p>
                  <div className="flex flex-col gap-3">
                    {item.sources.map((s) => (
                      <div key={s.name} className="flex gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${cfg.sourceDot}`} />
                        <div>
                          <span className="text-[11px] font-semibold text-stone-700">{s.name} </span>
                          <span className="text-[12px] text-stone-500 leading-snug">{s.snippet}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
