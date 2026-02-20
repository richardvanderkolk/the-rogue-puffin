"use client";

import { motion } from "framer-motion";

interface ExpandingColumnsDrillProps {
    leftText: string[];
    rightText: string[];
    durationSec: number;
}

export default function ExpandingColumnsDrill({
    leftText,
    rightText,
    durationSec,
}: ExpandingColumnsDrillProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            {/* 
              Container animates width from narrow (300px) to wide (100% / max-w-6xl).
              We use `layout` prop for smooth resizing if needed, but direct width animation is better here.
            */}
            <motion.div
                initial={{ width: "300px" }}
                animate={{ width: "100%" }}
                transition={{
                    duration: durationSec,
                    ease: "linear"
                }}
                className="flex justify-between items-start max-w-6xl mx-auto"
            >
                {/* Left Column - Aligned Right (towards center) */}
                <div className="text-right w-1/2 pr-8 space-y-8 border-r-2 border-slate-800/50">
                    {leftText.map((t, i) => (
                        <div key={i} className="text-2xl text-slate-300 whitespace-nowrap">
                            {t}
                        </div>
                    ))}
                </div>

                {/* Right Column - Aligned Left (towards center) */}
                <div className="text-left w-1/2 pl-8 space-y-8 border-l-2 border-slate-800/50">
                    {rightText.map((t, i) => (
                        <div key={i} className="text-2xl text-slate-300 whitespace-nowrap">
                            {t}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
