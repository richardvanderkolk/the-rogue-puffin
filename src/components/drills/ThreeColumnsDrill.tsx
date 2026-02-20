"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

interface ThreeColumnsDrillProps {
    data: { left: string[]; center: string[]; right: string[] };
    intervalMs: number;
    onComplete?: () => void;
    isPaused?: boolean;
}

export default function ThreeColumnsDrill({ data, intervalMs, onComplete, isPaused = false }: ThreeColumnsDrillProps) {
    if (!data || !data.left || !data.center || !data.right) {
        console.error("ThreeColumnsDrill: Missing data", data);
        return <div className="text-red-500">Error: Missing Drill Data</div>;
    }

    // State: cursor position within the current screen
    const [cursor, setCursor] = useState({ row: 0, col: 0 });
    // Ref to track cursor for interval logic without closure staleness
    const cursorRef = useRef({ row: 0, col: 0 });

    // Determine max rows for current screen
    const rowCount = Math.max(data.left.length, data.center.length, data.right.length);

    useEffect(() => {
        // Reset ref on mount/data change
        cursorRef.current = { row: 0, col: 0 };
        setCursor({ row: 0, col: 0 });

        if (isPaused) return;

        const interval = setInterval(() => {
            const current = cursorRef.current;
            let next = { ...current };

            // Move Column: 0 -> 1 -> 2
            if (current.col < 2) {
                next.col += 1;
            } else {
                // End of Row: Move to next Row, Col 0
                next.col = 0;
                next.row += 1;
            }

            // Check boundaries
            if (next.row >= rowCount) {
                // End of current screen
                if (onComplete) onComplete();
                // Reset Logic (local only, component likely unmounts)
                next = { row: 0, col: 0 };
            }

            // Update State (triggers render) & Ref (tracks logic)
            cursorRef.current = next;
            setCursor(next);

        }, intervalMs);

        return () => clearInterval(interval);
    }, [rowCount, intervalMs, onComplete, isPaused]);

    const columns = [data.left, data.center, data.right];

    return (
        <div className="w-fit mx-auto grid grid-cols-3 gap-0">
            {[0, 1, 2].map((colIndex) => (
                <div key={colIndex} className="flex flex-col items-center space-y-6 text-center px-4">
                    {/* Render the column's rows */}
                    {columns[colIndex].map((text, rowIndex) => {
                        const isActive = cursor.row === rowIndex && cursor.col === colIndex;

                        return (
                            <div key={rowIndex} className="h-12 flex items-center justify-center relative">
                                {/* Invisible bold text to reserve space prevents layout shift */}
                                <span className="opacity-0 font-bold text-2xl px-1 select-none pointer-events-none">
                                    {text}
                                </span>
                                {/* Actual Visible Text */}
                                <span
                                    className={clsx(
                                        "absolute inset-0 flex items-center justify-center text-2xl transition-all duration-200 px-1",
                                        isActive
                                            ? "text-indigo-500 font-bold scale-110"
                                            : "text-slate-600"
                                    )}
                                >
                                    {text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
