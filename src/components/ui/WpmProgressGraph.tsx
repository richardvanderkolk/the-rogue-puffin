"use client";

import { motion } from 'framer-motion';

interface WpmDataPoint {
    day: number;
    wpm: number;
}

interface WpmProgressGraphProps {
    data: WpmDataPoint[];
    height?: number;
}

export default function WpmProgressGraph({ data, height = 250 }: WpmProgressGraphProps) {
    if (!data || data.length === 0) {
        return (
            <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-center" style={{ height }}>
                <p className="text-slate-500 font-medium">No reading data available yet.</p>
            </div>
        );
    }

    // SVG coordinate system
    const padding = { top: 40, right: 20, bottom: 40, left: 50 };
    // Fixed width for scalable SVG viewbox
    const width = 800; 
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    // Find min and max for scaling
    // Add 10% padding to max Y, and floor min Y at 150 (unless they read slower than 150)
    const dataMinY = Math.min(...data.map(d => d.wpm));
    const dataMaxY = Math.max(...data.map(d => d.wpm));
    const minY = Math.max(0, Math.min(150, dataMinY - 50));
    const maxY = Math.max(300, dataMaxY + 50);

    // X scale: map day 1-14 to pixels
    const maxDay = Math.max(14, ...data.map(d => d.day));
    const xScale = (day: number) => padding.left + ((day - 1) / Math.max(1, (maxDay - 1))) * innerWidth;
    
    // Y scale: map WPM to pixels (inverted because SVG y=0 is at top)
    const yScale = (wpm: number) => padding.top + innerHeight - ((wpm - minY) / (maxY - minY)) * innerHeight;

    // Generate path
    const pathData = data.length > 0
        ? data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.day)} ${yScale(d.wpm)}`).join(' ')
        : '';

    // Generate area path for the gradient fill
    const areaPathData = data.length > 0
        ? `${pathData} L ${xScale(data[data.length - 1].day)} ${padding.top + innerHeight} L ${xScale(data[0].day)} ${padding.top + innerHeight} Z`
        : '';

    return (
        <div className="w-full relative" style={{ height }}>
            <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Y Axis Grid Lines */}
                {[minY, (minY + maxY) / 2, maxY].map((val, i) => {
                    const y = yScale(val);
                    return (
                        <g key={`grid-y-${i}`}>
                            <line 
                                x1={padding.left} 
                                y1={y} 
                                x2={width - padding.right} 
                                y2={y} 
                                stroke="#334155" 
                                strokeWidth="1" 
                                strokeDasharray="4 4" 
                            />
                            <text 
                                x={padding.left - 10} 
                                y={y + 4} 
                                fill="#64748b" 
                                fontSize="12" 
                                textAnchor="end"
                                fontWeight="bold"
                            >
                                {Math.round(val)}
                            </text>
                        </g>
                    );
                })}

                {/* X Axis Grid Lines */}
                {[1, 4, 7, 10, 14].map((day) => {
                    if (day > maxDay && day !== 14) return null;
                    const x = xScale(day);
                    return (
                        <g key={`grid-x-${day}`}>
                            <text 
                                x={x} 
                                y={height - 10} 
                                fill="#64748b" 
                                fontSize="12" 
                                textAnchor="middle"
                                fontWeight="bold"
                            >
                                D{day}
                            </text>
                        </g>
                    );
                })}

                {/* Data Area Fill */}
                <motion.path
                    d={areaPathData}
                    fill="url(#areaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Data Line */}
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {data.map((d, i) => (
                    <motion.circle
                        key={`point-${i}`}
                        cx={xScale(d.day)}
                        cy={yScale(d.wpm)}
                        r="5"
                        fill="#0f172a"
                        stroke={i === data.length - 1 ? "#34d399" : "#818cf8"}
                        strokeWidth="3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1 + (i * 0.1) }}
                    />
                ))}

                {/* Latest WPM Label */}
                {data.length > 0 && (
                    <motion.text
                        x={xScale(data[data.length - 1].day)}
                        y={yScale(data[data.length - 1].wpm) - 15}
                        fill="#34d399"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                    >
                        {data[data.length - 1].wpm}
                    </motion.text>
                )}
            </svg>
        </div>
    );
}
