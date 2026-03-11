"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smartChunkText, calculateInterval, SmartChunk } from "@/lib/pacer";

interface BouncePoint {
    x: number;
    y: number;
    words: number;
    lineBottom: number;
}

interface PacerEngineProps {
    text: string;
    wpm: number;
    isPlaying: boolean;
    mode: "normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message" | "recall";
    chunkSize?: number;
    onComplete?: () => void;
    highlightMode?: boolean;
    acceleration?: number; // WPM increase per second
    customInterval?: number; // Override WPM with fixed ms per chunk
    smallFont?: boolean; // Dynamically reduces font size when true
    reduceFontSizeAfter?: number; // Optional timestamp to adjust chunk sizing
    extraSmallFont?: boolean; // Dynamically reduces font size by another 25% when true
    reduceFontSizeAgainAfter?: number; // Optional timestamp to adjust chunk sizing further
    increaseChunkSizeAfter?: number; // Timestamp in seconds to increase chunk size
    increaseChunkSizeTo?: number; // Target chunk size
}

export default function PacerEngine({ text, wpm, isPlaying, mode, chunkSize = 3, onComplete, highlightMode = false, acceleration = 0, customInterval, smallFont = false, reduceFontSizeAfter, extraSmallFont = false, reduceFontSizeAgainAfter, increaseChunkSizeAfter, increaseChunkSizeTo }: PacerEngineProps) {
    const [chunks, setChunks] = useState<SmartChunk[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    // Bouncing Ball State
    const [bouncePoints, setBouncePoints] = useState<BouncePoint[]>([]);
    const [currentBounceIndex, setCurrentBounceIndex] = useState(0);
    const [pageOffset, setPageOffset] = useState(0);
    const words = useMemo(() => text.split(/\s+/).filter(w => w.length > 0), [text]);

    // Stable ref for onComplete callback
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

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
        if (mode === "peripheral") {
            const currentWpm = wpm;
            const baseInterval = customInterval || calculateInterval(currentWpm, highlightMode ? Math.max(chunkSize, 10) : chunkSize);

            // Re-chunk the text dynamically based on the expanding length logic
            const allWords = text.split(/\s+/).filter(word => word.length > 0);
            const newChunks: SmartChunk[] = [];
            let currentWordIndex = 0;
            let currentProgressIndex = 0;

            // We don't know the exact length of chunks since it depends on the number of chunks,
            // but we can approximate the progress based on character count processed vs total.
            const totalChars = text.length;
            let processedChars = 0;

            while (currentWordIndex < allWords.length) {
                const progress = totalChars > 0 ? processedChars / totalChars : 0;
                let maxLength = Math.floor(15 + (45 * progress));

                const elapsedSeconds = (currentProgressIndex * baseInterval / 1000);
                if (reduceFontSizeAgainAfter && elapsedSeconds >= reduceFontSizeAgainAfter) {
                    maxLength = Math.floor(maxLength * 2.25);
                } else if (reduceFontSizeAfter && elapsedSeconds >= reduceFontSizeAfter) {
                    maxLength = Math.floor(maxLength * 1.5);
                }

                let currentChunkWords: string[] = [];
                let currentLength = 0;

                while (currentWordIndex < allWords.length) {
                    const word = allWords[currentWordIndex];
                    if (currentLength + word.length + (currentChunkWords.length > 0 ? 1 : 0) <= maxLength) {
                        currentChunkWords.push(word);
                        currentLength += word.length + (currentChunkWords.length > 0 ? 1 : 0);
                        processedChars += word.length + 1;
                        currentWordIndex++;
                    } else if (currentChunkWords.length === 0) {
                        // Fallback: word is longer than max length, add it anyway
                        currentChunkWords.push(word);
                        processedChars += word.length + 1;
                        currentWordIndex++;
                        break; // End chunk
                    } else {
                        break; // Step to next chunk
                    }
                }

                newChunks.push({ text: currentChunkWords.join(" "), delayBonus: 0 });
                currentProgressIndex++;
            }
            setChunks(newChunks);
        } else {
            // Normal chunking with potential dynamic chunk sizing based on time
            if (increaseChunkSizeAfter && increaseChunkSizeTo) {
                const baseInterval = customInterval || calculateInterval(wpm, chunkSize);
                const secondInterval = customInterval || calculateInterval(wpm, increaseChunkSizeTo);

                const allWords = text.split(/\s+/).filter(word => word.length > 0);
                const newChunks: SmartChunk[] = [];
                let currentWordIndex = 0;
                let elapsedMs = 0;

                while (currentWordIndex < allWords.length) {
                    const currentChunkSize = (elapsedMs / 1000) >= increaseChunkSizeAfter ? increaseChunkSizeTo : chunkSize;
                    const chunkWords = allWords.slice(currentWordIndex, currentWordIndex + currentChunkSize);

                    newChunks.push({ text: chunkWords.join(" "), delayBonus: 0 });

                    currentWordIndex += currentChunkSize;
                    elapsedMs += ((elapsedMs / 1000) >= increaseChunkSizeAfter ? secondInterval : baseInterval);
                }
                setChunks(newChunks);
            } else {
                setChunks(smartChunkText(text, chunkSize));
            }
        }
        setCurrentIndex(0);
    }, [text, chunkSize, mode, wpm, customInterval, highlightMode, reduceFontSizeAfter, reduceFontSizeAgainAfter, increaseChunkSizeAfter, increaseChunkSizeTo]);

    // Pacer Interval Logic (Recursive Timeout for Variable Delays)
    useEffect(() => {
        if (!isPlaying || highlightMode || mode === 'read' || mode === 'message') return;

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
                onCompleteRef.current && onCompleteRef.current();
            }
        }, totalDelay);

        return () => clearTimeout(timer);
    }, [isPlaying, currentWpm, currentIndex, chunks, chunkSize, highlightMode, customInterval]);

    // Measure words for Bouncing Ball (highlightMode)
    useEffect(() => {
        if (!highlightMode || !textContainerRef.current) return;

        let timeout: NodeJS.Timeout;
        const measure = () => {
            if (!textContainerRef.current) return;
            setPageOffset(0);

            const wordSpans = textContainerRef.current.querySelectorAll('.bounce-word');
            if (wordSpans.length === 0) return;

            const lines: HTMLElement[][] = [];
            let currentLine: HTMLElement[] = [];
            let currentY = -1;

            wordSpans.forEach(span => {
                const el = span as HTMLElement;
                const y = el.offsetTop;
                if (currentY === -1 || Math.abs(y - currentY) > 8) {
                    if (currentLine.length > 0) lines.push([...currentLine]);
                    currentLine = [el];
                    currentY = y;
                } else {
                    currentLine.push(el);
                }
            });
            if (currentLine.length > 0) lines.push(currentLine);

            const newPoints: BouncePoint[] = [];
            lines.forEach(line => {
                if (!line || line.length === 0) return;
                const first = line[0];
                const last = line[line.length - 1];
                const left = first.offsetLeft;
                const right = last.offsetLeft + last.offsetWidth;
                const y = first.offsetTop;
                const height = first.offsetHeight;
                const width = right - left;

                const wordsInLine = line.length;

                // Move exactly 1/3 of a line at a time (3 bounces per line)
                const segmentWidth = width / 3;
                const segmentWords = wordsInLine / 3; // Fractional words naturally divide the timer perfectly

                // Ball is 16px wide, subtract 8 to center. Y slightly above line.
                // Placed at 1/6, 1/2, and 5/6 of the width to be at the center of each segment.
                newPoints.push({ x: left + segmentWidth * 0.5 - 8, y: y - 12, words: segmentWords, lineBottom: y + height });
                newPoints.push({ x: left + segmentWidth * 1.5 - 8, y: y - 12, words: segmentWords, lineBottom: y + height });
                newPoints.push({ x: left + segmentWidth * 2.5 - 8, y: y - 12, words: segmentWords, lineBottom: y + height });
            });
            setBouncePoints(newPoints);
            setCurrentBounceIndex(0);
        };

        const observer = new ResizeObserver(() => {
            clearTimeout(timeout);
            timeout = setTimeout(measure, 100);
        });

        observer.observe(textContainerRef.current);

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        }
    }, [words, highlightMode]);

    // Bouncing Ball Interval Logic
    useEffect(() => {
        if (!isPlaying || !highlightMode || mode === 'read' || mode === 'message' || bouncePoints.length === 0) return;

        const currentPoint = bouncePoints[currentBounceIndex];
        if (!currentPoint) return;

        const wordsPerSecond = currentWpm / 60;
        const intervalMs = customInterval || ((currentPoint.words / wordsPerSecond) * 1000);

        const timer = setTimeout(() => {
            if (currentBounceIndex < bouncePoints.length - 1) {
                setCurrentBounceIndex(prev => prev + 1);
            } else {
                onCompleteRef.current && onCompleteRef.current();
            }
        }, intervalMs);

        return () => clearTimeout(timer);
    }, [isPlaying, currentWpm, currentBounceIndex, bouncePoints, highlightMode, customInterval]);

    // Bouncing Ball Page Turn Logic
    useEffect(() => {
        if (!highlightMode || bouncePoints.length === 0 || !containerRef.current) return;
        const point = bouncePoints[currentBounceIndex];
        if (!point) return;

        const containerHeight = containerRef.current.clientHeight;
        if (point.lineBottom > pageOffset + containerHeight - 60) {
            // Turn the page: set the current Y to be near the top
            setPageOffset(Math.max(0, point.y - 40));
        }
    }, [currentBounceIndex, bouncePoints, highlightMode, pageOffset]);

    // Styles for different modes
    const getModeStyles = () => {
        switch (mode) {
            case "inverted":
                return "rotate-180";
            case "backward":
                return "scale-x-[-1]"; // Mirror image
            default:
                return "";
        }
    };

    const currentChunk = chunks[currentIndex];
    const currentText = currentChunk ? currentChunk.text : "";

    const renderPeripheral = () => {
        return (
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.8 }}
                    transition={{ duration: 0 }}
                    className="absolute inset-0 flex items-center justify-center w-full h-full"
                >
                    {/* Center Fixation Dot */}
                    {/* Mix-blend-mode or opacity ensures we can see text behind/over it */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full z-10 shadow-[0_0_15px_rgba(239,68,68,0.8)] opacity-50" />

                    {/* Centered Text OVER the dot */}
                    <div
                        className={`z-20 font-bold text-slate-900 whitespace-nowrap px-4 tracking-wide text-center drop-shadow-md transition-all duration-1000 ${extraSmallFont ? 'text-base md:text-xl' :
                            smallFont ? 'text-xl md:text-3xl' :
                                'text-3xl md:text-5xl'
                            }`}
                    >
                        {currentText}
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    };

    const renderReadMode = () => {
        return (
            <div className="w-full h-full overflow-y-auto p-4 md:p-8 bg-white text-slate-800 text-xl md:text-2xl font-serif leading-normal whitespace-pre-wrap relative z-20 pointer-events-auto text-justify shadow-inner rounded-3xl">
                {text}
            </div>
        );
    };

    const renderMessageMode = () => {
        return (
            <div className="w-full h-full flex flex-col items-center p-6 md:p-8 text-slate-300 text-lg md:text-xl font-medium leading-relaxed whitespace-pre-wrap relative z-20 text-center overflow-y-auto">
                <div className="max-w-full md:max-w-2xl my-auto py-4">
                    {text}
                </div>
            </div>
        );
    };

    // Check if we are in "Full Page Flash" mode (very large chunk)
    const isFullPage = chunkSize > 20 && mode !== "read";

    const isScrollingMode = highlightMode || mode === "read" || mode === "message";

    return (
        <div
            ref={containerRef}
            className={`w-full h-[60vh] flex rounded-3xl overflow-hidden relative ${mode === 'message'
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-slate-50 shadow-inner border border-slate-200 p-4 md:p-8'
                } ${isScrollingMode && mode !== 'message' ? 'items-start justify-start' : 'items-center justify-center'}`}
        >
            {/* Progress bar */}
            {mode !== "read" && (
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-200 z-10">
                    <motion.div
                        className="h-full bg-indigo-500"
                        animate={{
                            width: highlightMode && bouncePoints.length > 0
                                ? `${((currentBounceIndex + 1) / bouncePoints.length) * 100}%`
                                : `${((currentIndex + 1) / chunks.length) * 100}%`
                        }}
                    />
                </div>
            )}

            {/* Guide Pacer Mode (Bouncing Ball) */}
            {highlightMode ? (
                <div
                    className="absolute top-0 left-0 w-full p-6 md:p-10"
                    style={{ transform: `translateY(-${pageOffset}px)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                    <div ref={textContainerRef} className={`relative w-full max-w-4xl mx-auto text-lg md:text-xl leading-relaxed font-bold text-slate-900 tracking-tight select-none ${getModeStyles()}`}>
                        {words.map((word, index) => (
                            <span key={index} className="bounce-word mr-1.5 md:mr-2 inline-block">
                                {word}
                            </span>
                        ))}

                        {/* The Bouncing Ball */}
                        {bouncePoints.length > 0 && (
                            <motion.div
                                className="absolute top-0 left-0 w-4 h-4 bg-rose-500 rounded-full shadow-[0_4px_15px_rgba(244,63,94,0.6)] z-50 origin-bottom"
                                initial={false}
                                animate={{
                                    x: bouncePoints[currentBounceIndex]?.x || 0,
                                    y: bouncePoints[currentBounceIndex]?.y || 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    mass: 0.8
                                }}
                            />
                        )}
                    </div>
                </div>
            ) : mode === "peripheral" ? (
                renderPeripheral()
            ) : mode === "message" ? (
                renderMessageMode()
            ) : mode === "read" ? (
                renderReadMode()
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
                            : 'text-5xl md:text-7xl px-12 whitespace-nowrap' // Standard RSVP style
                            } ${getModeStyles()}`}
                    >
                        {currentText}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
