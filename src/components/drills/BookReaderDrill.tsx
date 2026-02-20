"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface BookReaderDrillProps {
    pages: string[];
    intervalMs: number;
    isUpsideDown?: boolean;
    onComplete?: () => void;
    isPaused?: boolean;
}

export default function BookReaderDrill({
    pages,
    intervalMs,
    isUpsideDown = false,
    onComplete,
    isPaused = false
}: BookReaderDrillProps) {
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setPageIndex((prev) => {
                const next = prev + 1;
                if (next >= pages.length) {
                    if (onComplete) onComplete();
                    return 0; // Or stay at last page? Let's loop for now or reset.
                }
                return next;
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [pages.length, intervalMs, onComplete, isPaused]);

    // Ensure we don't crash if empty
    if (!pages || pages.length === 0) {
        return <div className="text-red-500">No book content provided.</div>;
    }

    const currentPageText = pages[pageIndex] || "";

    return (
        <div className={clsx(
            "w-full max-w-4xl mx-auto p-8 bg-white text-slate-900 rounded-sm shadow-xl min-h-[60vh] flex items-start justify-start overflow-hidden relative transition-transform duration-500 perspective-1000",
            isUpsideDown && "rotate-180"
        )}>
            <div className="absolute top-2 right-4 text-xs text-slate-400 font-mono">
                Scan {pageIndex + 1} / {pages.length}
            </div>

            <div
                key={pageIndex}
                className="text-lg md:text-xl leading-relaxed font-serif text-justify w-full h-full"
            >
                {currentPageText.split("\n").map((line, i) => (
                    <p key={i} className="mb-4">
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}
