"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, PauseCircle, PlayCircle, Eye, RefreshCw, Zap, CheckCircle, Brain, Target, RotateCcw, Clock } from "lucide-react";
import { DRILL_TEXT_FULL, WORD_STREAM_DEMO } from "@/lib/drill-content";

// --- Types ---
type DrillPhase =
    | 'intro'
    | 'demo_rsvp'
    | 'demo_flash'
    | 'demo_highlight'
    | 'drill_cycle_1_a' // 1.5m Page Flash (First half)
    | 'drill_cycle_1_b' // 1.5m Page Flash (Second half)
    | 'drill_cycle_2'   // 1m Highlight
    | 'drill_cycle_3'   // 3m Accel
    | 'drill_cycle_4'   // 1m Highlight (Fast)
    | 'drill_cycle_5'   // 3m Upside Down
    | 'drill_cycle_6'   // 3m Fast Upside Down
    | 'drill_cycle_7'   // 1m Highlight
    | 'recall_pause'    // 5s Recall
    | 'complete';

// Helper to chunk text into Pages (approx 150 words to fit vertically)
const CHUNK_SIZE = 150;
const textChunks = DRILL_TEXT_FULL.split(/\s+/).reduce((acc: string[], word: string, index: number) => {
    const chunkIndex = Math.floor(index / CHUNK_SIZE);
    if (!acc[chunkIndex]) acc[chunkIndex] = "";
    acc[chunkIndex] += word + " ";
    return acc;
}, []);

// --- Components ---

// 1. RSVP (Rapid Serial Visual Presentation) Display
const RSVPDisplay = ({ words, speedMs, onComplete }: { words: string[], speedMs: number, onComplete: () => void }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index >= words.length) {
            onComplete();
            return;
        }

        // Kinetic acceleration logic: speed up over time (min 100ms)
        const currentSpeed = Math.max(100, speedMs - (index * 5)); // Reduce delay by 5ms per word

        const timer = setTimeout(() => {
            setIndex(prev => prev + 1);
        }, currentSpeed);

        return () => clearTimeout(timer);
    }, [index, words.length, speedMs, onComplete]);

    return (
        <div className="flex items-center justify-center h-full w-full">
            <span className="text-6xl md:text-8xl font-black text-white">{words[index]}</span>
        </div>
    );
};


// 2. Page Flash Display
const PageDisplay = ({
    text,
    speedMs,
    onPageComplete,
    inverted = false,
    highlightMode = false,
    highlightSpeedMs = 1000,
    className = "h-[70vh] shadow-2xl"
}: {
    text: string,
    speedMs: number,
    onPageComplete: () => void,
    inverted?: boolean,
    highlightMode?: boolean,
    highlightSpeedMs?: number,
    className?: string
}) => {
    const [highlightGroupIndex, setHighlightGroupIndex] = useState(0);

    // Timer for Page Flip (Only if not in highlight mode, or as fallback)
    useEffect(() => {
        if (highlightMode) return; // Let highlighting drive the page turn
        const timer = setTimeout(() => {
            onPageComplete();
        }, speedMs);
        return () => clearTimeout(timer);
    }, [text, speedMs, onPageComplete, highlightMode]);

    // Format text into fixed-width lines (predictable wrapping)
    const CHARS_PER_LINE = 65; // Reverted to 65 for classic book width with standard font

    const createFixedWidthLines = (rawText: string) => {
        const words = rawText.split(/\s+/);
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;

            if (testLine.length <= CHARS_PER_LINE) {
                currentLine = testLine;
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                }
                currentLine = word;
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    };

    // Create word groups: exactly 3 groups per line (balanced distribution)
    const createLineBasedWordGroups = () => {
        const lines = createFixedWidthLines(text);
        const groups: { lineIndex: number; groupIndex: number; words: string[] }[] = [];

        lines.forEach((line, lineIndex) => {
            const lineWords = line.split(/\s+/);
            const totalWords = lineWords.length;
            const baseSize = Math.floor(totalWords / 3);
            const remainder = totalWords % 3;

            let currentIndex = 0;
            // Create exactly 3 groups
            for (let i = 0; i < 3; i++) {
                // Distribute remainder one by one to first groups (e.g. 10 words -> 4, 3, 3)
                const groupSize = baseSize + (i < remainder ? 1 : 0);

                if (groupSize > 0) {
                    const groupWords = lineWords.slice(currentIndex, currentIndex + groupSize);
                    groups.push({
                        lineIndex,
                        groupIndex: i,
                        words: groupWords
                    });
                    currentIndex += groupSize;
                }
            }
        });

        return { lines, groups };
    };

    const { lines, groups } = createLineBasedWordGroups();

    // Highlight animation - move through word groups sequentially
    useEffect(() => {
        if (!highlightMode) return;
        const interval = setInterval(() => {
            setHighlightGroupIndex(prev => {
                const next = prev + 1;
                if (next >= groups.length) {
                    // Finished page, trigger completion
                    clearInterval(interval);
                    onPageComplete();
                    return 0; // Reset for safety, though component unmounts usually
                }
                return next;
            });
        }, highlightSpeedMs);
        return () => clearInterval(interval);
    }, [highlightMode, highlightSpeedMs, groups.length, onPageComplete]);

    const renderText = (highlighting: boolean) => {
        const currentGroup = groups[highlightGroupIndex];

        return (
            <div className="space-y-2 font-serif">
                {lines.map((line, lineIndex) => {
                    const lineWords = line.split(/\s+/);
                    const totalWords = lineWords.length;
                    const baseSize = Math.floor(totalWords / 3);
                    const remainder = totalWords % 3;
                    const isFullLine = line.length > 55;

                    // chunk logical same as createLineBasedWordGroups
                    const chunks = [];
                    let currentIndex = 0;
                    for (let i = 0; i < 3; i++) {
                        const groupSize = baseSize + (i < remainder ? 1 : 0);
                        if (groupSize > 0) {
                            chunks.push(lineWords.slice(currentIndex, currentIndex + groupSize));
                            currentIndex += groupSize;
                        }
                    }

                    return (
                        <div
                            key={lineIndex}
                            className={`leading-snug w-full ${isFullLine ? 'text-justify [text-align-last:justify]' : 'text-left'}`}
                        >
                            {chunks.map((chunkWords, chunkIndex) => {
                                if (chunkWords.length === 0) return null;

                                const isHighlighted = highlighting &&
                                    currentGroup &&
                                    currentGroup.lineIndex === lineIndex &&
                                    currentGroup.groupIndex === chunkIndex;

                                return (
                                    <span
                                        key={chunkIndex}
                                        className={`inline transition-colors duration-150 rounded px-0 ${isHighlighted ? 'bg-yellow-300/60' : ''}`}
                                    >
                                        {chunkWords.join(' ')}
                                        {/* Add space after chunk inside span for consistent highlighting flow */}
                                        {chunkIndex < chunks.length - 1 ? ' ' : ''}
                                    </span>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };



    return (
        <div className={`relative w-full max-w-4xl mx-auto p-12 md:p-20 bg-slate-100 text-slate-900 rounded-sm text-base md:text-lg leading-relaxed overflow-y-auto transition-transform duration-500 ${inverted ? 'rotate-180' : ''} ${className}`}>
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {renderText(highlightMode)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};


// --- Engine Component ---
export function RogueSessionEngine({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<DrillPhase>('intro');
    const [pageIndex, setPageIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [nextPhase, setNextPhase] = useState<DrillPhase | null>(null);

    // Refs for timer management
    const timeInPhase = useRef(0);
    const startTime = useRef<number | null>(null);

    // Timer Logic
    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            if (startTime.current !== null) {
                timeInPhase.current += 100; // crude increment, better use date diff
            }
        }, 100);

        return () => clearInterval(interval);
    }, [paused]);

    // --- Phase Management Logic ---
    const startPhase = (newPhase: DrillPhase) => {
        setPhase(newPhase);
        startTime.current = Date.now();
        timeInPhase.current = 0;
        setPageIndex(0);
        setPaused(false);
        setNextPhase(null);
    };

    // --- Main Logic Loop ---
    useEffect(() => {
        if (paused || phase === 'intro' || phase === 'demo_rsvp' || phase === 'demo_flash') return;

        const tick = setInterval(() => {
            if (startTime.current === null) return;
            const elapsed = Date.now() - startTime.current;
            timeInPhase.current = elapsed;

            // Phase Transitions
            switch (phase) {
                // Intro Demos handled manually

                // --- CYCLE 1A: 0 - 1.5 Min ---
                case 'drill_cycle_1_a':
                    if (elapsed > 90000) { // 1.5 mins
                        setNextPhase('drill_cycle_1_b');
                        setPaused(true);
                    }
                    break;

                // --- CYCLE 1B: 1.5 - 3.0 Min ---
                case 'drill_cycle_1_b':
                    if (elapsed > 90000) { // 1.5 mins (total 3m)
                        setNextPhase('drill_cycle_2');
                        setPaused(true);
                    }
                    break;

                case 'drill_cycle_2': // 1 min Highlight
                    if (elapsed > 60000) {
                        setNextPhase('drill_cycle_3');
                        setPaused(true);
                    }
                    break;

                case 'drill_cycle_3': // 3 min Accel
                    if (elapsed > 180000) {
                        setNextPhase('drill_cycle_4');
                        setPaused(true);
                    }
                    break;

                case 'drill_cycle_4': // 1 min Highlight Fast
                    if (elapsed > 60000) {
                        setNextPhase('drill_cycle_5');
                        setPaused(true);
                    }
                    break;

                case 'drill_cycle_5': // 3 min Upside Down
                    if (elapsed > 180000) {
                        setNextPhase('drill_cycle_6');
                        setPaused(true);
                    }
                    break;

                case 'drill_cycle_6': // 3 min Fast Upside Down
                    if (elapsed > 180000) {
                        setNextPhase('drill_cycle_7');
                        setPaused(true);
                    }
                    break;

                case 'drill_cycle_7': // 1 min Highlight
                    if (elapsed > 60000) {
                        setPhase('complete');
                        setPaused(true);
                    }
                    break;
            }

        }, 100);

        return () => clearInterval(tick);
    }, [phase, paused, onComplete]);

    // --- Render Logic ---
    const renderContent = () => {
        switch (phase) {
            case 'intro':
                return (
                    <div className="text-center space-y-8 max-w-3xl">
                        <h2 className="text-4xl font-bold text-white">Step 2: The Rogue Session</h2>
                        <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 text-left space-y-4 text-slate-300">
                            <p>These exercises are designed to break your old reading habits:</p>
                            <ul className="list-disc pl-5 space-y-2 text-white">
                                <li><strong>Sub-vocalization:</strong> Reading with your inner voice.</li>
                                <li><strong>Eye Movement:</strong> Stopping on every word.</li>
                                <li><strong>Perception:</strong> Thinking 300wpm is "fast".</li>
                            </ul>
                            <p>We are going to push you past your limit. <br />You will not be able to "read" everything. <strong>That is the goal.</strong></p>
                        </div>
                        <button onClick={() => setPhase('demo_rsvp')} className="bg-indigo-600 px-8 py-4 rounded-full font-bold text-white hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 mx-auto">
                            Start Warmup <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                );

            case 'demo_rsvp':
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                        <RSVPDisplay
                            words={WORD_STREAM_DEMO}
                            speedMs={400}
                            onComplete={() => setPhase('demo_flash')}
                        />
                    </div>
                );

            case 'demo_flash':
                return (
                    <div className="w-full h-full flex flex-col relative overflow-hidden">
                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-6xl mx-auto px-4">

                            <div className="flex flex-col items-center gap-4 w-full">
                                {/* Compact preview - larger scaled version in constrained landscape box */}
                                <div className="flex items-center justify-center bg-slate-900/30 p-2 rounded-lg w-full max-w-4xl border border-slate-800/50 h-[260px] overflow-hidden relative">
                                    <div className="scale-[0.45] origin-center w-[1200px] h-[500px] flex items-center justify-center absolute">
                                        <PageDisplay
                                            text={textChunks[pageIndex % textChunks.length]}
                                            speedMs={1000}
                                            inverted={false}
                                            highlightMode={false}
                                            className="h-full shadow-none"
                                            onPageComplete={() => setPageIndex(p => p + 1)}
                                        />
                                    </div>
                                </div>
                                <p className="text-xl md:text-2xl text-white font-medium text-center max-w-2xl leading-relaxed">
                                    We will start by showing you pages at <span className="text-emerald-400 font-bold">1 page per second</span>.  How many words can you see on each page?
                                </p>
                                <p className="text-slate-400 text-lg text-center">
                                    Just soften your gaze, relax your eyes and take the words in.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Control Bar - Consistent with Drill Pages */}
                        <div className="pb-6 px-4">
                            <div className="max-w-4xl mx-auto bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex items-center justify-center">
                                <button onClick={() => startPhase('drill_cycle_1_a')} className="bg-indigo-600 px-8 py-3 rounded-full font-bold text-white hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20">
                                    Begin The Session <Zap className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            // --- THE DRILL ---
            case 'drill_cycle_1_a':
            case 'drill_cycle_1_b':
            case 'drill_cycle_2':
            case 'drill_cycle_3':
            case 'drill_cycle_4':
            case 'drill_cycle_5':
            case 'drill_cycle_6':
            case 'drill_cycle_7':
                // Determination of props based on phase
                let speed = 1000;
                let inverted = false;
                let highlight = false;
                let highlightSpeed = 1000;

                if (phase === 'drill_cycle_1_a' || phase === 'drill_cycle_1_b') { speed = 1000; } // 3m Normal
                if (phase === 'drill_cycle_2') { highlight = true; speed = 2000; highlightSpeed = 1000; }

                if (phase === 'drill_cycle_3') { speed = (timeInPhase.current < 30000) ? 1000 : 500; } // Accel
                if (phase === 'drill_cycle_4') { highlight = true; speed = 1000; highlightSpeed = 500; }

                if (phase === 'drill_cycle_5') { inverted = true; speed = 500; }
                if (phase === 'drill_cycle_6') { inverted = true; speed = 300; }
                if (phase === 'drill_cycle_7') { highlight = true; speed = 600; highlightSpeed = 300; }

                // Helper to format elapsed time
                const formatTime = (ms: number) => {
                    const totalSeconds = Math.floor(ms / 1000);
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                };

                // Get cycle name
                const getCycleName = () => {
                    switch (phase) {
                        case 'drill_cycle_1_a': return 'Cycle 1A: Page Flash';
                        case 'drill_cycle_1_b': return 'Cycle 1B: Page Flash';
                        case 'drill_cycle_2': return 'Cycle 2: Highlight';
                        case 'drill_cycle_3': return 'Cycle 3: Acceleration';
                        case 'drill_cycle_4': return 'Cycle 4: Fast Highlight';
                        case 'drill_cycle_5': return 'Cycle 5: Upside Down';
                        case 'drill_cycle_6': return 'Cycle 6: Fast Upside Down';
                        case 'drill_cycle_7': return 'Cycle 7: Final Highlight';
                        default: return 'Drill';
                    }
                };

                const cycleOrder: DrillPhase[] = ['drill_cycle_1_a', 'drill_cycle_1_b', 'drill_cycle_2', 'drill_cycle_3', 'drill_cycle_4', 'drill_cycle_5', 'drill_cycle_6', 'drill_cycle_7'];
                const currentCycleIndex = cycleOrder.indexOf(phase);
                const canGoPrev = currentCycleIndex > 0;
                const canGoNext = currentCycleIndex < cycleOrder.length - 1;

                return (
                    <div className="w-full h-full flex flex-col relative">


                        {/* Main Content Area */}
                        <div className="flex-1 flex justify-center items-center relative px-4">
                            {paused ? (
                                <RecallOverlay onResume={() => {
                                    if (nextPhase) {
                                        startPhase(nextPhase);
                                    } else {
                                        setPaused(false);
                                    }
                                }} />
                            ) : (
                                <PageDisplay
                                    text={textChunks[pageIndex % textChunks.length]}
                                    speedMs={highlight ? speed * 5 : speed}
                                    inverted={inverted}
                                    highlightMode={highlight}
                                    highlightSpeedMs={highlightSpeed}
                                    onPageComplete={() => setPageIndex(p => p + 1)}
                                />
                            )}
                        </div>

                        {/* Controls - Bottom */}
                        <div className="pb-6 px-4">
                            <div className="max-w-4xl mx-auto bg-slate-900/50 rounded-xl border border-slate-800 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    {/* Cycle Info */}
                                    <div className="flex-1 text-left">
                                        <p className="text-sm text-slate-400">{getCycleName()}</p>
                                    </div>

                                    {/* Center Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => canGoPrev && startPhase(cycleOrder[currentCycleIndex - 1])}
                                            disabled={!canGoPrev}
                                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-white" />
                                        </button>

                                        <button
                                            onClick={() => setPaused(!paused)}
                                            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all"
                                        >
                                            {paused ? <PlayCircle className="w-5 h-5 text-white" /> : <PauseCircle className="w-5 h-5 text-white" />}
                                        </button>

                                        <button
                                            onClick={() => canGoNext && startPhase(cycleOrder[currentCycleIndex + 1])}
                                            disabled={!canGoNext}
                                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </button>
                                    </div>

                                    {/* Cycle Progress and Timer */}
                                    <div className="flex-1 text-right flex items-center justify-end gap-6 text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-mono">{formatTime(timeInPhase.current)}</span>
                                        </div>
                                        <div className="pl-6 border-l border-slate-700">
                                            <p className="text-sm">{currentCycleIndex + 1} / {cycleOrder.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress / Timer Debug */}
                        {/* <div className="absolute top-[-50px] text-slate-500 text-xs">
                           Phase: {phase} | Time: {(timeInPhase.current/1000).toFixed(1)}s
                        </div> */}
                    </div>
                );
            case 'complete':
                return (
                    <div className="text-center space-y-6">
                        <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto" />
                        <h2 className="text-4xl font-bold text-white">Rogue Session Complete</h2>
                        <p className="text-xl text-slate-300">Your old patterns have been shattered.</p>
                        <p className="text-slate-400">Now, let's see what you can really do.</p>
                        <button onClick={onComplete} className="bg-emerald-600 px-8 py-4 rounded-full font-bold text-white hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 mx-auto">
                            Take The Final Test <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={phase}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="w-full flex items-center justify-center"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// 3. Recall Overlay
const RecallOverlay = ({ onResume }: { onResume: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(10);
    useEffect(() => {
        if (timeLeft <= 0) {
            onResume();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onResume]);

    return (
        <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 rounded-xl border border-slate-800">
            <Brain className="w-16 h-16 text-indigo-400 mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-4">RECALL CHECK</h3>
            <p className="text-xl text-slate-300 mb-8">What words did you just see?</p>
            <div className="text-6xl font-black text-rose-500 font-mono">
                0:{timeLeft < 10 ? '0' : ''}{timeLeft}
            </div>
        </div>
    );
};
