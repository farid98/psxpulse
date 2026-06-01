export function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 bg-white border-b border-stone-200/80 flex items-center px-6">
      <div className="flex items-center w-[220px] shrink-0 gap-2.5">
        <div className="relative w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 10L4 6L7 8L13 2"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[16px] font-semibold tracking-[-0.02em] text-stone-900">
          PSX<span className="text-emerald-600 font-semibold">Pulse</span>
        </span>
      </div>

      <div className="flex items-center gap-3 lg:gap-5 shrink-0 ml-auto">
        <div className="flex items-baseline gap-1.5 lg:gap-2 whitespace-nowrap">
          <span className="hidden sm:inline text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
            KSE-100
          </span>
          <span className="text-[13px] lg:text-[14px] font-semibold text-stone-900 tabular-nums tracking-tight">
            114,280
          </span>
          <span className="text-[12px] text-emerald-600 font-semibold tabular-nums">
            +0.68%
          </span>
        </div>
        <div className="hidden sm:block text-right whitespace-nowrap">
          <p className="text-[11px] text-stone-500 font-medium leading-tight">Tue 27 May</p>
          <p className="text-[10px] text-stone-400 leading-tight tabular-nums">11:04 AM PKT</p>
        </div>
      </div>
    </header>
  );
}
