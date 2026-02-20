"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PyramidDrill from "./PyramidDrill";
import ExpandingColumnsDrill from "./ExpandingColumnsDrill";
import ThreeColumnsDrill from "./ThreeColumnsDrill";
import ParagraphDrill from "./ParagraphDrill";
import BookReaderDrill from "./BookReaderDrill";

// Drill Stages
// Drill Stages
type DrillStage = "INTRO" | "COUNTDOWN_1" | "COUNTDOWN_2" | "GET_STARTED" | "RELAX" | "FLASH" | "PYRAMID" | "EXPANDING_COLUMNS" | "THREE_COLUMNS" | "PARAGRAPH_PACE" | "FINAL_BREATH" | "POST_BREATH_PARAGRAPH" | "PYRAMID_REPEATED" | "THREE_COLUMNS_REPEATED" | "FASTER_DESCRIPTION" | "FIFTH_BREATH" | "SUPER_FAST_PYRAMID" | "SUPER_FAST_THREE_COLUMNS" | "SOMETHING_DIFFERENT" | "LOOK_LIKE_THIS" | "BOOK_INTRO" | "BOOK_BLOCK_1" | "BOOK_INTERVENTION_1" | "BOOK_BLOCK_2" | "BOOK_INTERVENTION_2" | "BOOK_BLOCK_3" | "BOOK_INTERVENTION_3" | "BOOK_BLOCK_4" | "COMPLETE";

const DRILL_SEQUENCE: DrillStage[] = [
    "INTRO", "COUNTDOWN_1", "COUNTDOWN_2", "GET_STARTED", "RELAX", "FLASH", "PYRAMID", "EXPANDING_COLUMNS", "THREE_COLUMNS", "PARAGRAPH_PACE", "FINAL_BREATH", "POST_BREATH_PARAGRAPH", "PYRAMID_REPEATED", "THREE_COLUMNS_REPEATED", "FASTER_DESCRIPTION", "FIFTH_BREATH", "SUPER_FAST_PYRAMID", "SUPER_FAST_THREE_COLUMNS", "SOMETHING_DIFFERENT", "LOOK_LIKE_THIS", "BOOK_INTRO", "BOOK_BLOCK_1", "BOOK_INTERVENTION_1", "BOOK_BLOCK_2", "BOOK_INTERVENTION_2", "BOOK_BLOCK_3", "BOOK_INTERVENTION_3", "BOOK_BLOCK_4", "COMPLETE"
];

interface DrillContainerProps {
    title: string;
    introText: string[]; // Lines for the initial screen
    countdownText1: string; // Text for first 15s countdown
    countdownText2?: string; // Optional text for second 15s countdown
    getStartedText?: string; // Text before oval (e.g. "OK, let's get started")
    relaxText: string;
    relaxInstruction?: string; // Text above the oval
    relaxDurationSec?: number; // Duration of Relax stage (default 15)
    flashWords: string[]; // The words to flash
    flashSpeedMs?: number; // Speed in ms per word

    // Pyramid Stage Props
    pyramidContent?: string[]; // Rows for the pyramid (asterisks or text)
    pyramidDurationSec?: number;

    // Expanding Columns Props
    expandingText?: string[]; // Words/Lines for expanding columns

    // Three Columns Props
    threeColScreens?: { left: string[]; center: string[]; right: string[] }[];
    threeColScreensRepeated?: { left: string[]; center: string[]; right: string[] }[];

    // Paragraph Pace Props
    paragraphScreens?: string[][]; // Array of screens, each containing chunks
    paragraphScreensRepeated?: string[][];

    // Final Breath Props
    finalBreathText?: string;
    finalBreathDurationSec?: number;
    finalBreathRepeatedDurationSec?: number;

    // Faster Description & Fifth Breath Props
    fasterDescriptionText?: string[];
    fifthBreathText?: string;

    // Something Different & Look Like This Props
    somethingDifferentContent?: { left: string[]; center: string[]; right: string[] };
    lookLikeThisText?: string;

    // Book Drill Props
    bookPages?: string[];

    // Post Breath Paragraph Props
    postBreathScreens?: string[][];

    // Debug / Dev Props
    initialStage?: DrillStage;
}

export default function DrillContainer({
    title,
    introText,
    countdownText1,
    countdownText2,
    getStartedText,
    relaxText,
    relaxInstruction,
    relaxDurationSec = 15,
    flashWords,
    flashSpeedMs = 1000,
    pyramidContent = [],
    pyramidDurationSec = 15,
    expandingText = [],
    threeColScreens = [],
    threeColScreensRepeated = [],
    paragraphScreens = [],
    paragraphScreensRepeated = [],
    finalBreathText = "Take a deep breath...",
    finalBreathDurationSec = 10,
    finalBreathRepeatedDurationSec = 5,
    fasterDescriptionText = [],
    fifthBreathText = "Take a deep breath...",
    somethingDifferentContent = { left: [], center: [], right: [] },
    lookLikeThisText = "",
    bookPages = [],
    postBreathScreens = [],
    initialStage = "INTRO",
}: DrillContainerProps) {
    const [stage, setStage] = useState<DrillStage>(initialStage);
    const [timeLeft, setTimeLeft] = useState(15);
    const [wordIndex, setWordIndex] = useState(0);
    const [threeColScreenIndex, setThreeColScreenIndex] = useState(0);
    const [paragraphScreenIndex, setParagraphScreenIndex] = useState(0);
    const [postBreathScreenIndex, setPostBreathScreenIndex] = useState(0);

    // Control State
    const [isPaused, setIsPaused] = useState(false);
    const [speedMultiplier, setSpeedMultiplier] = useState(1);

    const togglePause = () => setIsPaused(!isPaused);
    const changeSpeed = () => {
        setSpeedMultiplier((prev) => (prev >= 2 ? 0.5 : prev + 0.5)); // Loop 0.5 -> 1 -> 1.5 -> 2 -> 0.5
    };

    // Sync state with prop change (for Hot Reloading & Debugging)
    useEffect(() => {
        setStage(initialStage);
        setThreeColScreenIndex(0);
        setParagraphScreenIndex(0);
        setPostBreathScreenIndex(0);
    }, [initialStage]);

    // Countdown Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (
            stage === "COUNTDOWN_1" ||
            stage === "COUNTDOWN_2" ||
            stage === "GET_STARTED" ||
            stage === "RELAX" ||
            stage === "EXPANDING_COLUMNS" ||
            stage === "FINAL_BREATH" ||
            stage === "FIFTH_BREATH" ||
            stage === "BOOK_INTERVENTION_1" ||
            stage === "BOOK_INTERVENTION_2" ||
            stage === "BOOK_INTERVENTION_3"
        ) {
            if (isPaused) return; // Pause Timer

            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Transition Logic
                        if (stage === "COUNTDOWN_1") {
                            if (countdownText2) {
                                setStage("COUNTDOWN_2");
                                return 15;
                            } else {
                                setStage("RELAX");
                                return relaxDurationSec;
                            }
                        }
                        // ... (existing logic)
                        if (stage === "BOOK_INTERVENTION_1") {
                            setStage("BOOK_BLOCK_2");
                            return 0;
                        }
                        if (stage === "BOOK_INTERVENTION_2") {
                            setStage("BOOK_BLOCK_3");
                            return 0;
                        }
                        if (stage === "BOOK_INTERVENTION_3") {
                            setStage("BOOK_BLOCK_4");
                            return 0;
                        }
                        if (stage === "COUNTDOWN_2") {
                            if (getStartedText) {
                                setStage("GET_STARTED");
                                return 1; // 1 second flash
                            }
                            setStage("RELAX");
                            return relaxDurationSec;
                        }
                        if (stage === "GET_STARTED") {
                            setStage("RELAX");
                            return relaxDurationSec;
                        }
                        if (stage === "RELAX") {
                            setStage("FLASH");
                            return 0;
                        }
                        // PYRAMID stage removed from timer loop (manual completion)

                        if (stage === "EXPANDING_COLUMNS") {
                            setStage("THREE_COLUMNS");
                            return 15; // Duration for Three Columns
                        }
                        if (stage === "FINAL_BREATH") {
                            setStage("POST_BREATH_PARAGRAPH"); // Transition to new stage
                            return 0;
                        }
                        if (stage === "FIFTH_BREATH") {
                            setStage("SUPER_FAST_PYRAMID");
                            return 0;
                        }
                        // EXPANDING_REPEATED removed
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [stage, countdownText2, relaxDurationSec, isPaused]);

    // Flash Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (stage === "FLASH") {
            if (isPaused) return;

            interval = setInterval(() => {
                setWordIndex((prev) => {
                    if (prev >= flashWords.length - 1) {
                        setStage("PYRAMID");
                        return 0;
                    }
                    return prev + 1;
                });
            }, flashSpeedMs);
        }

        return () => clearInterval(interval);
        return () => clearInterval(interval);
    }, [stage, flashWords.length, flashSpeedMs, isPaused]);

    // Fix Transition: Skip Expanding Repeated
    const handlePyramidComplete = useCallback(() => {
        setStage("THREE_COLUMNS");
    }, []);

    const handlePyramidRepeatedComplete = useCallback(() => {
        setStage("THREE_COLUMNS_REPEATED");
    }, []);

    const handleSuperFastPyramidComplete = useCallback(() => {
        setStage("SUPER_FAST_THREE_COLUMNS");
        setThreeColScreenIndex(0);
    }, []);

    // Three Columns Pagination Logic
    const handleThreeColumnsComplete = useCallback(() => {
        if (threeColScreenIndex < threeColScreens.length - 1) {
            setThreeColScreenIndex((prev) => prev + 1);
        } else {
            // Transition to Paragraph Pace
            setStage("PARAGRAPH_PACE");
            setThreeColScreenIndex(0);
        }
    }, [threeColScreenIndex, threeColScreens.length]);

    const handleThreeColumnsRepeatedComplete = useCallback(() => {
        if (threeColScreenIndex < threeColScreensRepeated.length - 1) {
            setThreeColScreenIndex((prev) => prev + 1);
        } else {
            setStage("FASTER_DESCRIPTION");
            setThreeColScreenIndex(0);
        }
    }, [threeColScreenIndex, threeColScreensRepeated.length]);

    const handleSuperFastThreeColumnsComplete = useCallback(() => {
        if (threeColScreenIndex < threeColScreensRepeated.length - 1) {
            setThreeColScreenIndex((prev) => prev + 1);
        } else {
            setStage("SOMETHING_DIFFERENT");
            setThreeColScreenIndex(0);
        }
    }, [threeColScreenIndex, threeColScreensRepeated.length]);

    const handleSomethingDifferentComplete = useCallback(() => {
        setStage("LOOK_LIKE_THIS");
        // Auto-advance after 3s
        setTimeout(() => setStage("BOOK_INTRO"), 3000);
    }, []);

    // Book Drill Logic
    const handleBookIntroStart = useCallback(() => {
        setStage("BOOK_BLOCK_1");
    }, []);

    // Duration-based completion for book blocks handled by useEffect/Timer? 
    // Wait, the plan says 2 mins, 3 mins etc. 
    // And standard BookReaderDrill advances pages.
    // I should wrap BookReaderDrill in a timer that forces next stage.
    // Or pass `onComplete` that triggers after X pages?
    // Let's use a useEffect timer in DrillContainer to switch stages for Blocks 1-4.

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPaused) return;

        const handleBlockComplete = (nextStage: DrillStage, interventionDuration: number = 15) => {
            setStage(nextStage);
            setTimeLeft(interventionDuration);
        };

        if (stage === "BOOK_BLOCK_1") {
            // 2 Minutes
            timer = setTimeout(() => handleBlockComplete("BOOK_INTERVENTION_1"), 120000 / speedMultiplier);
        }
        if (stage === "BOOK_BLOCK_2") {
            // 3 Minutes
            timer = setTimeout(() => handleBlockComplete("BOOK_INTERVENTION_2"), 180000 / speedMultiplier);
        }
        if (stage === "BOOK_BLOCK_3") {
            // 3 Minutes
            timer = setTimeout(() => handleBlockComplete("BOOK_INTERVENTION_3"), 180000 / speedMultiplier);
        }
        if (stage === "BOOK_BLOCK_4") {
            // 3 Minutes
            timer = setTimeout(() => setStage("COMPLETE"), 180000 / speedMultiplier);
        }

        return () => clearTimeout(timer);
    }, [stage, isPaused, speedMultiplier]);

    const handleFasterDescriptionComplete = useCallback(() => {
        setStage("FIFTH_BREATH");
        setTimeLeft(5);
    }, []);

    // Paragraph Pagination Logic
    const handleParagraphComplete = useCallback(() => {
        if (paragraphScreenIndex < paragraphScreens.length - 1) {
            setParagraphScreenIndex((prev) => prev + 1);
        } else {
            setStage("FINAL_BREATH");
            setTimeLeft(finalBreathDurationSec);
        }
    }, [paragraphScreenIndex, paragraphScreens.length, finalBreathDurationSec]);

    // Post Breath Paragraph Logic
    const handlePostBreathComplete = useCallback(() => {
        if (postBreathScreenIndex < postBreathScreens.length - 1) {
            setPostBreathScreenIndex((prev) => prev + 1);
        } else {
            // Transition directly to Pyramid Repeated (Skipping Second Breath)
            setStage("PYRAMID_REPEATED");

            // Reset Three Cols Index for repeated phase
            setThreeColScreenIndex(0);
        }
    }, [postBreathScreenIndex, postBreathScreens.length, finalBreathRepeatedDurationSec]);

    const startDrill = () => {
        setStage("COUNTDOWN_1");
        setTimeLeft(15);
    };

    const restart = () => {
        setStage(initialStage);
        setWordIndex(0);
        setTimeLeft(15);
        setThreeColScreenIndex(0);
        setParagraphScreenIndex(0);
        setPostBreathScreenIndex(0);
    };

    const handleSkip = (direction: -1 | 1) => {
        const currentIndex = DRILL_SEQUENCE.indexOf(stage);
        if (currentIndex === -1) return;

        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < DRILL_SEQUENCE.length) {
            const nextStage = DRILL_SEQUENCE[nextIndex];
            setStage(nextStage);
            // Reset timers/indexes based on nextStage type (basic reset)
            setWordIndex(0);
            setThreeColScreenIndex(0);
            setParagraphScreenIndex(0);
            setPostBreathScreenIndex(0);
            // TimeLeft specific logic handled by useEffect on [stage] change or below
            if (nextStage === "RELAX") setTimeLeft(relaxDurationSec);
            else if (nextStage.startsWith("COUNTDOWN")) setTimeLeft(15);
            else if (nextStage === "FINAL_BREATH") setTimeLeft(finalBreathDurationSec);
            else if (nextStage === "FIFTH_BREATH") setTimeLeft(5);
            else if (nextStage.startsWith("BOOK_INTERVENTION")) setTimeLeft(15);
            else if (nextStage.startsWith("BOOK_BLOCK")) setTimeLeft(0); // Managed by internal Timer
            else setTimeLeft(0);
        }
    };

    // If skipping ahead via props (e.g. Part 2), initialize timer correctly
    useEffect(() => {
        if (initialStage === "RELAX") {
            setTimeLeft(relaxDurationSec);
        }
        if (initialStage === "EXPANDING_COLUMNS") {
            setTimeLeft(15);
        }
        if (initialStage === "FINAL_BREATH") {
            setTimeLeft(finalBreathDurationSec);
        }
    }, [initialStage, relaxDurationSec, finalBreathDurationSec]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Header / Title */}
            <div className="absolute top-8 left-0 right-0 text-center opacity-30 pointer-events-none">
                <h2 className="text-xl font-heading tracking-widest uppercase text-slate-500">{title}</h2>
            </div>

            <AnimatePresence mode="wait">

                {/* INTRO STAGE */}
                {stage === "INTRO" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-2xl text-center space-y-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
                            {introText.map((line, i) => (
                                <span key={i} className="block mb-2">{line}</span>
                            ))}
                        </h1>
                        <button
                            onClick={startDrill}
                            className="bg-indigo-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                        >
                            Start Exercise
                        </button>
                    </motion.div>
                )}

                {/* COUNTDOWN STAGES & GET STARTED */}
                {(stage === "COUNTDOWN_1" || stage === "COUNTDOWN_2" || stage === "GET_STARTED") && (
                    <motion.div
                        key="countdown"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-3xl text-center space-y-12"
                    >
                        <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-light">
                            {stage === "COUNTDOWN_1" ? countdownText1 :
                                stage === "COUNTDOWN_2" ? countdownText2 :
                                    getStartedText}
                        </p>

                        {stage !== "GET_STARTED" && (
                            <div className="text-[10rem] font-black text-slate-800 tabular-nums leading-none select-none">
                                {timeLeft}
                            </div>
                        )}

                    </motion.div>
                )}



                {/* OVAL & FLASH STAGES (Combined to prevent layout shift) */}
                {(stage === "RELAX" || stage === "FLASH") && (
                    <motion.div
                        key="oval-stage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center w-full h-full relative"
                    >
                        {/* Fixed Height Top Section for Instructions */}
                        <div className="h-48 flex items-end justify-center pb-12 w-full px-4 text-center">
                            <AnimatePresence mode="wait">
                                {stage === "RELAX" && relaxInstruction && (
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xl md:text-2xl font-medium text-slate-300 max-w-2xl leading-relaxed"
                                    >
                                        {relaxInstruction}
                                    </motion.h3>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* The Oval (Fixed Size & Position) */}
                        <div className="relative w-[300px] h-[100px] border-4 border-white rounded-[100%] flex items-center justify-center bg-black shrink-0 z-10">
                            <AnimatePresence mode="wait">
                                {stage === "RELAX" ? (
                                    <motion.p
                                        key="relax-text"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="text-lg font-bold text-white uppercase tracking-wider"
                                    >
                                        {relaxText}
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        key={wordIndex} // Unique key for each word
                                        initial={{ opacity: 0, scale: 0.9, filter: "blur(2px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, position: "absolute" }} // Abs position during exit prevents layout jumpos
                                        transition={{ duration: 0.15 }}
                                        className="text-2xl font-bold text-white text-center px-4 leading-none"
                                    >
                                        {flashWords[wordIndex]}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            {/* Timer for RELAX stage */}
                            <AnimatePresence>
                                {stage === "RELAX" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -bottom-24 text-5xl font-black text-slate-800 tabular-nums"
                                    >
                                        {timeLeft}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Spacer to balance top section if needed */}
                        <div className="h-48 w-full" />
                    </motion.div>
                )}

                {/* PYRAMID STAGE */}
                {(stage === "PYRAMID" || stage === "PYRAMID_REPEATED" || stage === "SUPER_FAST_PYRAMID") && (
                    <motion.div
                        key="pyramid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex flex-col items-center justify-center p-8"
                    >
                        <h3 className="text-xl text-slate-500 mb-8 font-heading uppercase tracking-widest hidden">
                            Scan the Pyramid
                        </h3>
                        <PyramidDrill
                            content={pyramidContent}
                            intervalMs={(stage === "PYRAMID_REPEATED" ? 500 : stage === "SUPER_FAST_PYRAMID" ? 300 : flashSpeedMs) / speedMultiplier}
                            onComplete={stage === "PYRAMID_REPEATED" ? handlePyramidRepeatedComplete : stage === "SUPER_FAST_PYRAMID" ? handleSuperFastPyramidComplete : handlePyramidComplete}
                            isPaused={isPaused}
                        />
                    </motion.div>
                )}

                {/* EXPANDING COLUMNS STAGE */}
                {stage === "EXPANDING_COLUMNS" && (
                    <motion.div
                        key="expanding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center space-y-12 w-full h-full"
                    >
                        <h3 className="text-3xl font-heading text-indigo-400 mb-8">Expanding Columns</h3>

                        <ExpandingColumnsDrill
                            leftText={expandingText.slice(0, 3)}
                            rightText={expandingText.slice(3, 6)}
                            durationSec={15}
                        />
                    </motion.div>
                )}

                {/* THREE COLUMNS STAGE (Including SUPER FAST & SOMETHING DIFFERENT) */}
                {(stage === "THREE_COLUMNS" || stage === "THREE_COLUMNS_REPEATED" || stage === "SUPER_FAST_THREE_COLUMNS" || stage === "SOMETHING_DIFFERENT") && (
                    <motion.div
                        key="three-cols"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center space-y-12 w-full max-w-6xl pb-24" // Added padding-bottom for controls
                    >
                        {(stage === "SOMETHING_DIFFERENT" ? somethingDifferentContent : (stage === "THREE_COLUMNS" ? threeColScreens : threeColScreensRepeated)[threeColScreenIndex]) && (
                            <ThreeColumnsDrill
                                key={stage === "SOMETHING_DIFFERENT" ? "sd" : threeColScreenIndex}
                                data={stage === "SOMETHING_DIFFERENT" ? somethingDifferentContent : (stage === "THREE_COLUMNS" ? threeColScreens : threeColScreensRepeated)[threeColScreenIndex]}
                                intervalMs={
                                    (stage === "THREE_COLUMNS_REPEATED" ? 500 :
                                        stage === "SUPER_FAST_THREE_COLUMNS" ? 300 :
                                            stage === "SOMETHING_DIFFERENT" ? 500 :
                                                ((threeColScreens[threeColScreenIndex] as any)?.intervalMs || 1000)) / speedMultiplier
                                }
                                onComplete={
                                    stage === "THREE_COLUMNS_REPEATED" ? handleThreeColumnsRepeatedComplete :
                                        stage === "SUPER_FAST_THREE_COLUMNS" ? handleSuperFastThreeColumnsComplete :
                                            stage === "SOMETHING_DIFFERENT" ? handleSomethingDifferentComplete :
                                                handleThreeColumnsComplete
                                }
                                isPaused={isPaused}
                            />
                        )}
                    </motion.div>
                )}

                {/* PARAGRAPH PACE STAGE */}
                {(stage === "PARAGRAPH_PACE") && (
                    <motion.div
                        key="paragraph-pace"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center space-y-12 w-full max-w-6xl pb-24"
                    >
                        {paragraphScreens[paragraphScreenIndex] && (
                            <ParagraphDrill
                                key={paragraphScreenIndex}
                                chunks={paragraphScreens[paragraphScreenIndex]}
                                intervalMs={1000 / speedMultiplier}
                                onComplete={handleParagraphComplete}
                                isPaused={isPaused}
                            />
                        )}
                    </motion.div>
                )}

                {/* FASTER DESCRIPTION STAGE */}
                {stage === "FASTER_DESCRIPTION" && (
                    <motion.div
                        key="faster-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center space-y-12 w-full max-w-6xl pb-24"
                    >
                        <ParagraphDrill
                            chunks={fasterDescriptionText}
                            intervalMs={1000 / speedMultiplier}
                            onComplete={handleFasterDescriptionComplete}
                            isPaused={isPaused}
                        />
                    </motion.div>
                )}

                {/* FINAL BREATH & FIFTH BREATH STAGE */}
                {(stage === "FINAL_BREATH" || stage === "FIFTH_BREATH") && (
                    <motion.div
                        key="final-breath"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-3xl text-center space-y-12"
                    >
                        <h3 className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-light">
                            {stage === "FINAL_BREATH" ? finalBreathText : fifthBreathText}
                        </h3>
                        <div className="text-[10rem] font-black text-slate-800 tabular-nums leading-none select-none">
                            {timeLeft}
                        </div>
                    </motion.div>
                )}

                {/* POST BREATH PARAGRAPH STAGE */}
                {stage === "POST_BREATH_PARAGRAPH" && (
                    <motion.div
                        key="post-breath-paragraph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center space-y-12 w-full max-w-6xl"
                    >
                        {postBreathScreens[postBreathScreenIndex] && (
                            <ParagraphDrill
                                key={postBreathScreenIndex}
                                chunks={postBreathScreens[postBreathScreenIndex]}
                                intervalMs={1000 / speedMultiplier}
                                onComplete={handlePostBreathComplete}
                                isPaused={isPaused}
                            />
                        )}
                    </motion.div>
                )}

                {/* LOOK LIKE THIS STAGE */}
                {stage === "LOOK_LIKE_THIS" && (
                    <motion.div
                        key="look-like-this"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-4xl text-center space-y-12"
                    >
                        <h3 className="text-3xl md:text-4xl text-white leading-relaxed font-bold">
                            {lookLikeThisText}
                        </h3>
                    </motion.div>
                )}

                {/* BOOK INTRO & INTERVENTIONS */}
                {(stage === "BOOK_INTRO" || stage.startsWith("BOOK_INTERVENTION")) && (
                    <motion.div
                        key="book-intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-4xl text-center space-y-12"
                    >
                        <h3 className="text-3xl md:text-4xl text-white leading-relaxed font-bold">
                            {stage === "BOOK_INTRO" && (
                                <>
                                    We are using <span className="italic">Alice in Wonderland</span>.
                                    <br /><br />
                                    We are NOT reading. We are training your eyes to soft-focus and recognize words.
                                    <br /><br />
                                    Keep your eyes relaxed.
                                </>
                            )}
                            {stage === "BOOK_INTERVENTION_1" && (
                                <>
                                    Relax your eyes.
                                    <br /><br />
                                    What words can you recall?
                                    <br /><br />
                                    Now we will scan faster (0.5s / page).
                                </>
                            )}
                            {stage === "BOOK_INTERVENTION_2" && (
                                <>
                                    Relax your eyes.
                                    <br /><br />
                                    What words can you recall?
                                    <br /><br />
                                    Now we will turn the book upside down.
                                </>
                            )}
                            {stage === "BOOK_INTERVENTION_3" && (
                                <>
                                    Relax your eyes.
                                    <br /><br />
                                    What words can you recall?
                                    <br /><br />
                                    Now back to normal orientation.
                                </>
                            )}
                        </h3>
                        {stage !== "BOOK_INTRO" && (
                            <div className="text-[10rem] font-black text-slate-800 tabular-nums leading-none select-none">
                                {timeLeft}
                            </div>
                        )}
                        {stage === "BOOK_INTRO" && (
                            <button
                                onClick={handleBookIntroStart}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xl transition-all"
                            >
                                Start Scanning
                            </button>
                        )}
                    </motion.div>
                )}

                {/* BOOK READING BLOCKS */}
                {(stage === "BOOK_BLOCK_1" || stage === "BOOK_BLOCK_2" || stage === "BOOK_BLOCK_3" || stage === "BOOK_BLOCK_4") && (
                    <motion.div
                        key="book-reading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center pb-24"
                    >
                        <BookReaderDrill
                            pages={bookPages}
                            // Block 1: 1s, Blocks 2-4: 0.5s
                            intervalMs={(stage === "BOOK_BLOCK_1" ? 1000 : 500) / speedMultiplier}
                            isUpsideDown={stage === "BOOK_BLOCK_3"}
                            isPaused={isPaused}
                        />
                    </motion.div>
                )}

                {/* COMPLETE STAGE */}
                {stage === "COMPLETE" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8"
                    >
                        <h2 className="text-4xl font-bold text-white">Exercise Complete</h2>

                        <div className="flex flex-col items-center gap-4">
                            <Link href="/test/after">
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full text-xl font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center gap-2">
                                    Continue to Final Test
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </Link>

                            <button
                                onClick={restart}
                                className="text-slate-500 hover:text-white underline underline-offset-4 text-sm"
                            >
                                Repeat Exercise
                            </button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Controls Bar */}
            {stage !== "INTRO" && stage !== "COMPLETE" && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700 z-50 transition-opacity hover:opacity-100 opacity-50 hover:opacity-100">
                    <button
                        onClick={() => handleSkip(-1)}
                        className="text-white hover:text-indigo-400 transition-colors"
                        title="Previous Block"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button
                        onClick={togglePause}
                        className="text-white hover:text-indigo-400 transition-colors"
                        title={isPaused ? "Resume" : "Pause"}
                    >
                        {isPaused ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={restart}
                        className="text-white hover:text-red-400 transition-colors"
                        title="Restart Drill"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleSkip(1)}
                        className="text-white hover:text-indigo-400 transition-colors"
                        title="Next Block"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <div className="h-6 w-px bg-slate-600 mx-2" />

                    <button
                        onClick={changeSpeed}
                        className="text-slate-300 hover:text-white font-mono font-bold w-12 text-center select-none"
                        title="Change Speed"
                    >
                        {speedMultiplier}x
                    </button>
                </div>
            )}
        </div>
    );
}
