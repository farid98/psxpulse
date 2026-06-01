interface SentimentBarProps {
  bull: number;
  neutral: number;
  bear: number;
}

export function SentimentBar({ bull, neutral, bear }: SentimentBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex w-full h-1.5 rounded-full overflow-hidden gap-px bg-stone-100">
        <div className="bg-emerald-500" style={{ width: `${bull}%` }} />
        <div className="bg-stone-300" style={{ width: `${neutral}%` }} />
        <div className="bg-red-400" style={{ width: `${bear}%` }} />
      </div>
      <div className="flex justify-between text-[9px] text-stone-400 font-medium tabular-nums">
        <span>{bull}% bull</span>
        <span>{neutral}% neutral</span>
        <span>{bear}% bear</span>
      </div>
    </div>
  );
}
