"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

interface ParagraphDrillProps {
    chunks: string[];
    intervalMs: number;
    onComplete?: () => void;
    isPaused?: boolean;
}

export default function ParagraphDrill({ chunks, intervalMs, onComplete, isPaused = false }: ParagraphDrillProps) {
    // Map logical steps (0, 1, 2...) to actual chunks indices (ignoring newlines)
    const playableIndices = chunks
        .map((c, i) => (c === "\n" ? -1 : i))
        .filter((i) => i !== -1);

    const [activeStep, setActiveStep] = useState(0);
    const stepRef = useRef(0);

    useEffect(() => {
        // Reset on mount/data change
        stepRef.current = 0;
        setActiveStep(0);

        if (isPaused) return;

        const interval = setInterval(() => {
            const currentStep = stepRef.current;
            const nextStep = currentStep + 1;

            if (nextStep >= playableIndices.length) {
                if (onComplete) onComplete();
                clearInterval(interval);
            } else {
                stepRef.current = nextStep;
                setActiveStep(nextStep);
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [playableIndices.length, intervalMs, onComplete, isPaused]);

    const activeIndex = playableIndices[activeStep];

    return (
        <div className="max-w-4xl mx-auto px-8 text-center leading-relaxed">
            <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 text-3xl text-slate-600">
                {chunks.map((chunk, i) => {
                    if (chunk === "\n") {
                        return <div key={i} className="basis-full h-4" />;
                    }

                    const isActive = i === activeIndex;
                    return (
                        <div key={i} className="relative inline-block">
                            {/* Invisible bold text to reserve space */}
                            <span className="opacity-0 font-bold select-none pointer-events-none">
                                {chunk}
                            </span>
                            {/* Visible Text */}
                            <span
                                className={clsx(
                                    "absolute inset-0 transition-all duration-200",
                                    isActive ? "text-indigo-500 font-bold scale-105" : "text-slate-500"
                                )}
                            >
                                {chunk}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
