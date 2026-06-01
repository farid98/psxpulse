import { rotationText } from "@/data/sectors";

export function RotationSignal() {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Sector Rotation Signal
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">Macro-driven positioning view</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-[13px] text-stone-600 leading-relaxed tracking-[-0.005em]">
          {rotationText}
        </p>
        <div className="mt-4 pt-4 border-t border-stone-100">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Positioning bias
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Banking", dir: "up" },
              { label: "E&P", dir: "up" },
              { label: "Technology", dir: "up" },
              { label: "Pharma", dir: "up" },
              { label: "Textiles", dir: "down" },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded ${
                  tag.dir === "up"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {tag.label}
                <span className="text-[9px]">{tag.dir === "up" ? "↑" : "↓"}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
