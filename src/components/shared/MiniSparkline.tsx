interface MiniSparklineProps {
  data: number[];
  positive?: boolean;
  height?: number;
  period?: string;
  showScale?: boolean;
}

export function MiniSparkline({
  data,
  positive = true,
  height = 56,
  period = "5D",
  showScale = false,
}: MiniSparklineProps) {
  const color = positive ? "#10b981" : "#ef4444";
  const gradientId = `spark-${positive ? "u" : "d"}-${data.join("_")}`;

  const W = 200;
  const H = height;
  const padX = 2;
  const padY = 4;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const stepX = (W - padX * 2) / (data.length - 1);

  const points = data.map((v, i) => {
    const x = padX + i * stepX;
    const y = padY + (1 - (v - min) / range) * (H - padY * 2);
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`))
    .join(" ");

  const areaPath = `${linePath} L${W - padX},${H} L${padX},${H} Z`;

  const lastPoint = points[points.length - 1];

  // For scale annotations
  const fmt = (n: number) =>
    n >= 100 ? n.toFixed(0) : n.toFixed(2);

  if (!showScale) {
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height={H}
        className="block"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={lastPoint[0]} cy={lastPoint[1]} r={2.5} fill={color} />
      </svg>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
          {period}
        </span>
        <div className="flex items-baseline gap-2 text-[10px] font-medium tabular-nums">
          <span className="text-stone-400">
            <span className="text-stone-300">H</span>{" "}
            <span className="text-stone-600">{fmt(max)}</span>
          </span>
          <span className="text-stone-200">·</span>
          <span className="text-stone-400">
            <span className="text-stone-300">L</span>{" "}
            <span className="text-stone-600">{fmt(min)}</span>
          </span>
        </div>
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          width="100%"
          height={H}
          className="block"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          <line
            x1={padX}
            y1={padY}
            x2={W - padX}
            y2={padY}
            stroke="#e7e5e4"
            strokeWidth="1"
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={padX}
            y1={H - padY}
            x2={W - padX}
            y2={H - padY}
            stroke="#e7e5e4"
            strokeWidth="1"
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
          />

          {/* Area + line */}
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={lastPoint[0]} cy={lastPoint[1]} r={2.5} fill={color} />

          {/* Tick marks for data points */}
          {points.map(([x], i) => (
            <line
              key={i}
              x1={x}
              y1={H - 1}
              x2={x}
              y2={H - 3}
              stroke="#d6d3d1"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      <div className="flex justify-between mt-1 text-[9px] font-medium text-stone-300 tabular-nums">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
      </div>
    </div>
  );
}
