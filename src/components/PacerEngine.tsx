"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smartChunkText, calculateInterval, SmartChunk } from "@/lib/pacer";

interface PacerEngineProps {
    text: string;
    wpm: number;
    isPlaying: boolean;
    mode: "normal" | "inverted" | "peripheral" | "backward" | "flash";
    chunkSize?: number;
    onComplete?: () => void;
    highlightMode?: boolean;
    acceleration?: number; // WPM increase per second
    customInterval?: number; // Override WPM with fixed ms per chunk
}

export default function PacerEngine({ text, wpm, isPlaying, mode, chunkSize = 3, onComplete, highlightMode = false, acceleration = 0, customInterval }: PacerEngineProps) {
    const [chunks, setChunks] = useState<SmartChunk[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    // Acceleration Logic
    const [currentWpm, setCurrentWpm] = useState(wpm);

    // Reset WPM when base WPM changes or on stop
    useEffect(() => {
        if (!isPlaying) {
            setCurrentWpm(wpm);
        }
    }, [wpm, isPlaying]);

    // Acceleration Effect
    useEffect(() => {
        if (!isPlaying || !acceleration || acceleration <= 0) return;

        const accelTimer = setInterval(() => {
            setCurrentWpm((prev) => prev + acceleration);
        }, 1000);

        return () => clearInterval(accelTimer);
    }, [isPlaying, acceleration]);

    // Chunk text on mount or text/chunkSize change
    useEffect(() => {
        setChunks(smartChunkText(text, chunkSize));
        setCurrentIndex(0);
    }, [text, chunkSize]);

    // Pacer Interval Logic (Recursive Timeout for Variable Delays)
    useEffect(() => {
        if (!isPlaying) return;

        let timer: NodeJS.Timeout;

        // Calculate base interval
        // If customInterval is provided, use it. Otherwise calculate based on WPM.
        const baseInterval = customInterval || calculateInterval(currentWpm, highlightMode ? Math.max(chunkSize, 10) : chunkSize);

        // Get current chunk's delay bonus (only if NOT using customInterval, usually)
        // But for page flashes, we probably want exact timing, so ignore bonus if customInterval is set.
        const currentChunk = chunks[currentIndex];
        const delayBonus = customInterval ? 0 : (currentChunk?.delayBonus || 0);

        const totalDelay = baseInterval + delayBonus;

        timer = setTimeout(() => {
            if (currentIndex < chunks.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete && onComplete();
            }
        }, totalDelay);

        return () => clearTimeout(timer);
    }, [isPlaying, currentWpm, currentIndex, chunks, onComplete, chunkSize, highlightMode, customInterval]);

    // Auto-scroll for Highlight Mode
    useEffect(() => {
        if (highlightMode && textContainerRef.current) {
            const currentElement = textContainerRef.current.children[currentIndex] as HTMLElement;
            if (currentElement) {
                currentElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            }
        }
    }, [currentIndex, highlightMode]);

    // Styles for different modes
    const getModeStyles = () => {
        switch (mode) {
            case "inverted":
                return "rotate-180";
            case "backward":
                return "scale-x-[-1]"; // Mirror image
            case "peripheral":
                return "blur-[0.5px] tracking-widest scale-110"; // Simulate peripheral focus need
            default:
                return "";
        }
    };

    const currentChunk = chunks[currentIndex];
    const currentText = currentChunk ? currentChunk.text : "";

    // Check if we are in "Full Page Flash" mode (very large chunk)
    const isFullPage = chunkSize > 20;

    return (
        <div
            ref={containerRef}
            className="w-full h-[60vh] flex items-center justify-center bg-slate-50 rounded-3xl shadow-inner border border-slate-200 overflow-hidden relative p-8"
        >
            {/* progress bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-200 z-10">
                <motion.div
                    className="h-full bg-indigo-500"
                    animate={{ width: `${((currentIndex + 1) / chunks.length) * 100}%` }}
                />
            </div>

            {/* Guide Pacer Mode (Highlighting) */}
            {highlightMode ? (
                <div ref={textContainerRef} className={`w-full h-full overflow-y-auto p-4 space-y-4 ${getModeStyles()}`}>
                    <div className="flex flex-wrap gap-1 md:gap-2 text-lg md:text-2xl leading-relaxed text-slate-400 select-none">
                        {chunks.map((chunk, index) => (
                            <span
                                key={index}
                                className={`transition-all duration-200 rounded px-1 ${index === currentIndex
                                    ? "bg-yellow-300 text-slate-900 font-bold scale-110 shadow-sm"
                                    : "opacity-60"
                                    }`}
                            >
                                {chunk.text}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                /* Flash Mode (RSVP / Standard) */
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0.5, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className={`font-bold text-slate-900 text-center leading-tight ${isFullPage
                            ? 'text-lg md:text-xl max-w-4xl text-left whitespace-pre-wrap' // Full Page style
                            : 'text-5xl md:text-7xl px-12' // Standard RSVP style
                            } ${getModeStyles()}`}
                    >
                        {currentText}
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Focus Point for Peripheral Mode */}
            {mode === "peripheral" && !highlightMode && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500/20 rounded-full blur-sm pointer-events-none" />
            )}
        </div>
    );
}
