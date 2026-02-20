"use client";

import { useState, useEffect } from "react";

interface PyramidDrillProps {
    content: string[]; // The rows of the pyramid (e.g. ["*", "**", "***"])
    intervalMs: number;
    onComplete?: () => void;
    isPaused?: boolean;
}

export default function PyramidDrill({ content, intervalMs, onComplete, isPaused = false }: PyramidDrillProps) {
    // We have 3 columns of pyramids.
    // The 'eye' moves Left -> Center -> Right for each Row, then moves down to next Row.
    const [cursor, setCursor] = useState({ row: 0, col: 0 });

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCursor((prev) => {
                const { row, col } = prev;

                // Move Column: 0 -> 1 -> 2
                if (col < 2) {
                    return { row, col: col + 1 };
                }

                // End of Row: Move to next Row, Col 0
                const nextRow = row + 1;

                if (nextRow >= content.length) {
                    // Finished entire pyramid
                    if (onComplete) onComplete();
                    return { row: 0, col: 0 }; // Reset or stay?
                }

                return { row: nextRow, col: 0 };
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [content.length, intervalMs, onComplete, isPaused]);

    return (
        <div className="w-fit mx-auto grid grid-cols-3 gap-0">
            {[0, 1, 2].map((col) => (
                <div key={col} className="flex flex-col items-center gap-2 font-mono text-slate-400 text-lg md:text-xl tracking-widest leading-none select-none">
                    {content.map((rowText, r) => {
                        const isActive = r === cursor.row && col === cursor.col;
                        // Dim logic: Maybe keep all visible but dim non-active rows? 
                        // Or keep all fully visible and just move the ball.
                        // Screenshot shows all asterisks visible.

                        return (
                            <div key={r} className="relative px-2 py-1 flex justify-center">
                                {/* The Text Line */}
                                <span
                                    className={`transition-colors duration-200 ${isActive ? "text-indigo-500 scale-110 font-bold" : "text-slate-600"
                                        }`}
                                >
                                    {rowText}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
