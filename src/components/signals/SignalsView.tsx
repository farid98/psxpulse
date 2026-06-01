"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signalsByTicker, type SignalsProfile } from "@/data/signals";
import { SignalBadge } from "@/components/shared/SignalBadge";
import { TechnicalPanel } from "./TechnicalPanel";
import { FundamentalPanel } from "./FundamentalPanel";
import { NewsPanel } from "./NewsPanel";
import { OverallPanel } from "./OverallPanel";
import { Search, ChevronDown } from "lucide-react";

type Tab = "technical" | "fundamental" | "news" | "overall";

const scoreColor = (s: number) =>
  s >= 7 ? "text-emerald-600" : s >= 4 ? "text-amber-500" : "text-red-500";

const scoreBg = (s: number) =>
  s >= 7 ? "bg-emerald-500" : s >= 4 ? "bg-amber-400" : "bg-red-400";

const tabMeta: Record<
  Tab,
  { label: string; key: keyof SignalsProfile["scores"]; getSub: (d: SignalsProfile) => string }
> = {
  technical: {
    label: "Technical",
    key: "technical",
    getSub: (d) => d.technical.patterns[0]?.name ?? "—",
  },
  fundamental: {
    label: "Fundamental",
    key: "fundamental",
    getSub: (d) => {
      const goods = d.fundamental.metrics.filter((m) => m.status === "good").length;
      return `${goods}/${d.fundamental.metrics.length} metrics above sector`;
    },
  },
  news: {
    label: "News Signals",
    key: "news",
    getSub: (d) => d.news.label,
  },
  overall: {
    label: "Overall Rating",
    key: "overall",
    getSub: (d) => `${d.recommendation} · ${d.confidence}% confidence`,
  },
};

const allStocks = Object.values(signalsByTicker);

export function SignalsView() {
  const params = useSearchParams();
  const initialTicker = params.get("ticker");

  const [ticker, setTicker] = useState<string>(
    initialTicker && initialTicker in signalsByTicker ? initialTicker : allStocks[0].ticker
  );
  const [tab, setTab] = useState<Tab>("overall");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    if (!query.trim()) return allStocks;
    const q = query.toLowerCase();
    return allStocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
    );
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function pick(t: string) {
    setTicker(t);
    setOpen(false);
    setQuery("");
  }

  const data = signalsByTicker[ticker];
  const isUp = data.change >= 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Combined ticker hero + picker */}
      <div ref={wrapperRef} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full bg-white border border-stone-200/80 rounded-lg px-4 pt-3 pb-2.5 text-left hover:border-stone-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-emerald-500 shrink-0" strokeWidth={2.5} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-semibold text-stone-900 tracking-[-0.02em] leading-none">{data.ticker}</span>
                <SignalBadge signal={data.recommendation} />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[12px] text-stone-400 truncate">{data.name}</span>
                <span className="text-stone-200">·</span>
                <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider shrink-0">{data.sector}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className="text-[18px] font-semibold text-stone-900 tabular-nums leading-none tracking-[-0.02em]">{data.price.toFixed(2)}</span>
              <span className={`text-[13px] font-semibold tabular-nums ${isUp ? "text-emerald-600" : "text-red-500"}`}>
                {isUp ? "▲ +" : "▼ "}{Math.abs(data.change).toFixed(1)}%
              </span>
              <ChevronDown className={`w-4 h-4 text-stone-400 ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
            </div>
          </div>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-lg shadow-lg z-10 overflow-hidden">
            <div className="p-2 border-b border-stone-100">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ticker, company, sector…"
                  className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-stone-50 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-300 placeholder:text-stone-400"
                />
              </div>
            </div>
            <ul className="max-h-64 overflow-y-auto">
              {matches.length === 0 ? (
                <li className="px-4 py-3 text-[12px] text-stone-400">No matches</li>
              ) : (
                matches.map((s) => {
                  const up = s.change >= 0;
                  return (
                    <li key={s.ticker}>
                      <button
                        onClick={() => pick(s.ticker)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-stone-50 transition-colors text-left ${
                          s.ticker === ticker ? "bg-stone-50" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-[13px] font-semibold text-stone-900">{s.ticker}</span>
                          <span className="text-[12px] text-stone-400 ml-2 truncate">{s.name}</span>
                        </div>
                        <span className="text-[10px] text-stone-400 shrink-0">{s.sector}</span>
                        <span className={`text-[12px] font-semibold tabular-nums shrink-0 ${up ? "text-emerald-600" : "text-red-500"}`}>
                          {up ? "+" : ""}{s.change.toFixed(1)}%
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 4 score tabs — always 4 across */}
      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(tabMeta) as Tab[]).map((key) => {
          const meta = tabMeta[key];
          const score = data.scores[meta.key];
          const isActive = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-lg px-2 py-2.5 border transition-all duration-150 text-center relative ${
                isActive
                  ? "bg-stone-900 border-stone-900"
                  : "bg-white border-stone-200/80 hover:border-stone-300"
              }`}
            >
              <p className={`text-[9px] font-semibold uppercase tracking-wider truncate mb-1 ${isActive ? "text-stone-400" : "text-stone-400"}`}>
                {meta.label}
              </p>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className={`text-[20px] font-semibold tabular-nums leading-none tracking-tight ${isActive ? "text-white" : scoreColor(score)}`}>
                  {score.toFixed(1)}
                </span>
                <span className={`text-[10px] font-medium ${isActive ? "text-stone-500" : "text-stone-300"}`}>/10</span>
              </div>
              <div className={`mt-1.5 h-0.5 rounded-full overflow-hidden ${isActive ? "bg-stone-700" : "bg-stone-100"}`}>
                <div
                  className={`h-full rounded-full ${isActive ? "bg-stone-400" : scoreBg(score)}`}
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>
              {isActive && (
                <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {tab === "technical" && <TechnicalPanel data={data} />}
      {tab === "fundamental" && <FundamentalPanel data={data} />}
      {tab === "news" && <NewsPanel data={data} />}
      {tab === "overall" && <OverallPanel data={data} />}
    </div>
  );
}
