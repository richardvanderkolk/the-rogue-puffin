"use client";

interface TooltipProps {
    x: number;
    y: number;
    value: number;
    label: string;
}

export default function SimpleProgressChart({ data }: { data: { day: string; wpm: number }[] }) {
    const maxWpm = Math.max(...data.map(d => d.wpm), 500); // Scale based on max or at least 500
    const height = 200;
    const width = 600;
    const padding = 20;

    // Helper to map values to coordinates
    const getY = (wpm: number) => height - padding - ((wpm / maxWpm) * (height - padding * 2));
    const getX = (index: number) => padding + (index * ((width - padding * 2) / (data.length - 1)));

    // Generate path
    const points = data.map((d, i) => `${getX(i)},${getY(d.wpm)}`).join(' ');

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-indigo-500 overflow-visible">
                {/* Grid Lines */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#334155" strokeWidth="1" />

                {/* Area Gradient */}
                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d={`M ${getX(0)},${height - padding} L ${points} L ${getX(data.length - 1)},${height - padding} Z`}
                    fill="url(#gradient)"
                />

                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Dots */}
                {data.map((d, i) => (
                    <circle
                        key={i}
                        cx={getX(i)}
                        cy={getY(d.wpm)}
                        r="4"
                        fill="white"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="hover:r-6 transition-all cursor-pointer"
                    >
                        <title>{d.day}: {d.wpm} WPM</title>
                    </circle>
                ))}
            </svg>
        </div>
    );
}
