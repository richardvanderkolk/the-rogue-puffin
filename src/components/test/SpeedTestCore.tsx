"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SpeedTestCoreProps {
    title: string;
    introContent: React.ReactNode;
    readingContent: React.ReactNode;
    wordCount: number;
    onComplete: (wpm: number) => void;
    onRestart?: () => void;
    confirmTitle?: string;
    confirmText?: React.ReactNode; // "Does this feel fair?"
}

export default function SpeedTestCore({
    title,
    introContent,
    readingContent,
    wordCount,
    onComplete,
    onRestart,
    confirmTitle = "Your Speed",
    confirmText
}: SpeedTestCoreProps) {
    const [step, setStep] = useState<"intro" | "reading" | "confirm" | "manual">("intro");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [readingTime, setReadingTime] = useState<number>(0);
    const [manualWpm, setManualWpm] = useState<string>("");

    const startReading = () => {
        setStep("reading");
        setStartTime(Date.now());
    };

    const finishReading = () => {
        const end = Date.now();
        setEndTime(end);
        if (startTime) {
            setReadingTime((end - startTime) / 1000); // Seconds
        }
        setStep("confirm");
    };

    const calculateWPM = () => {
        if (manualWpm) return parseInt(manualWpm) || 0;
        if (readingTime === 0) return 0;
        return Math.round((wordCount / readingTime) * 60);
    };

    const handleConfirm = () => {
        onComplete(calculateWPM());
    };

    const handleRestart = () => {
        setReadingTime(0);
        setStep("intro");
        if (onRestart) onRestart();
    };

    return (
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-8 flex-1 flex flex-col">
                <AnimatePresence mode="wait">

                    {/* STEP 1: INTRO */}
                    {step === "intro" && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col justify-center items-center text-center space-y-8"
                        >
                            <h2 className="text-3xl font-bold font-heading text-slate-800">{title}</h2>
                            <div className="space-y-4 text-lg text-slate-600 max-w-lg mx-auto">
                                {introContent}
                            </div>
                            <button
                                onClick={startReading}
                                className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                            >
                                Start Reading
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: READING TEST */}
                    {step === "reading" && (
                        <motion.div
                            key="reading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed text-justify">
                                {readingContent}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={finishReading}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-500 shadow-lg transition-all"
                                >
                                    I'm Finished
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: CONFIRM */}
                    {step === "confirm" && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col justify-center items-center text-center space-y-8"
                        >
                            <h2 className="text-3xl font-bold font-heading text-slate-800">{confirmTitle}</h2>

                            <div className="py-10">
                                <div className="text-8xl font-black text-indigo-600 tracking-tighter">
                                    {calculateWPM()}
                                    <span className="text-2xl font-medium text-slate-400 ml-2 tracking-normal">WPM</span>
                                </div>
                                <p className="text-slate-500 mt-2">Words Per Minute</p>
                            </div>

                            <div className="space-y-3 w-full max-w-lg">
                                <p className="text-lg text-slate-700">
                                    {confirmText || "Does this score feel accurate?"}
                                </p>
                                <div className="flex flex-col gap-3 mt-6">
                                    <button
                                        onClick={handleConfirm}
                                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 shadow-md"
                                    >
                                        Yes, Continue
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={handleRestart}
                                            className="bg-white text-slate-700 border border-slate-300 px-4 py-3 rounded-lg font-medium text-sm hover:bg-slate-50"
                                        >
                                            Read Again
                                        </button>
                                        <button
                                            onClick={() => setStep("manual")}
                                            className="bg-white text-slate-700 border border-slate-300 px-4 py-3 rounded-lg font-medium text-sm hover:bg-slate-50"
                                        >
                                            Enter Manually
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3.5: MANUAL ENTRY */}
                    {step === "manual" && (
                        <motion.div
                            key="manual"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col justify-center items-center text-center space-y-8"
                        >
                            <h2 className="text-3xl font-bold font-heading text-slate-800">Self-Measurement Method</h2>
                            <div className="text-slate-600 max-w-lg space-y-4 text-left">
                                <p>It's easy to measure yourself:</p>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Use your phone's timer to count down <strong>1 minute</strong>.</li>
                                    <li>Choose a novel or magazine article.</li>
                                    <li>Read at your normal speed.</li>
                                    <li>Count the words you read in that minute.</li>
                                </ol>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="wpm-input" className="block text-sm font-medium text-slate-700 mb-2">
                                    Enter your word count:
                                </label>
                                <div className="flex items-center justify-center gap-3">
                                    <input
                                        id="wpm-input"
                                        type="number"
                                        value={manualWpm}
                                        onChange={(e) => setManualWpm(e.target.value)}
                                        className="block w-32 rounded-lg border-2 border-slate-300 px-4 py-3 text-2xl font-bold text-center focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="0"
                                    />
                                    <span className="text-xl font-bold text-slate-400">WPM</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => setStep("confirm")}
                                    className="px-6 py-3 text-slate-600 hover:text-slate-900"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep("confirm")}
                                    disabled={!manualWpm}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Use This Score
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Progress Footer */}
            <div className="bg-slate-100 p-4 flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>The Rogue Puffin</span>
                <div className="flex gap-2">
                    <div className={`h-2 w-2 rounded-full ${step === 'intro' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                    <div className={`h-2 w-2 rounded-full ${['reading', 'manual'].includes(step) ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                    <div className={`h-2 w-2 rounded-full ${step === 'confirm' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                </div>
            </div>
        </div>
    );
}
