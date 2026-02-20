"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface BallAnimatorProps {
    pattern: { x: number; y: number }[]; // Coordinates in % (0-100)
    speedMs: number;
}

export default function BallAnimator({ pattern, speedMs }: BallAnimatorProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % pattern.length);
        }, speedMs);
        return () => clearInterval(interval);
    }, [pattern.length, speedMs]);

    const currentPos = pattern[index];

    return (
        <div className="relative w-full h-full">
            <motion.div
                className="absolute w-8 h-8 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] border-2 border-white"
                animate={{
                    left: `${currentPos.x}%`,
                    top: `${currentPos.y}%`,
                }}
                transition={{
                    duration: speedMs / 1000,
                    ease: "linear", // or "easeInOut" for smoother turns?
                }}
                style={{ transform: "translate(-50%, -50%)" }}
            />

            {/* Optional: Show path dots? */}
            {pattern.map((p, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-slate-800 rounded-full"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
                />
            ))}
        </div>
    );
}
