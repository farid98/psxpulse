import { catalysts } from "@/data/sectors";

export function CatalystCalendar() {
  return (
    <div className="bg-white border border-stone-200/80 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100">
        <h2 className="text-[13px] font-semibold text-stone-900 tracking-[-0.01em]">
          Upcoming Catalysts
        </h2>
        <p className="text-[11px] text-stone-400 mt-0.5">Macro and earnings events to watch</p>
      </div>
      <div className="px-5 py-3">
        {catalysts.map((item, i) => (
          <div
            key={item.date}
            className="flex items-start gap-4 py-2.5 relative"
          >
            {i !== catalysts.length - 1 && (
              <div className="absolute left-[7px] top-7 bottom-0 w-px bg-stone-200" />
            )}
            <div className="relative w-3.5 h-3.5 mt-1 shrink-0">
              <div className="absolute inset-0 rounded-full bg-stone-100" />
              <div className="absolute inset-[3px] rounded-full bg-stone-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-stone-900 tabular-nums tracking-tight">
                {item.date}
              </p>
              <p className="text-[13px] text-stone-600 mt-0.5 tracking-[-0.005em]">
                {item.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
