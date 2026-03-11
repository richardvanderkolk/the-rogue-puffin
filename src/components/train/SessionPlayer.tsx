"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrillStep } from '@/lib/course-content';
import PacerEngine from '@/components/PacerEngine';
import Link from 'next/link';
import { Play, Pause, FastForward, CheckCircle, RotateCcw } from 'lucide-react';

interface SessionPlayerProps {
    dayNumber: number;
    sequence: DrillStep[];
    onComplete: () => void;
    dayContent?: string;
}

export default function SessionPlayer({ dayNumber, sequence, onComplete, dayContent }: SessionPlayerProps) {
    const [phase, setPhase] = useState<'playing' | 'outro'>('playing');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState(
        (sequence[0]?.mode === 'read' || sequence[0]?.mode === 'message') ? 0 : (sequence[0]?.duration || 0)
    );
    const [elapsedTime, setElapsedTime] = useState(0);
    const [activeInterruption, setActiveInterruption] = useState<{ text: string; resumeAt: number } | null>(null);

    const currentStep = sequence[currentStepIndex];


    const handleNext = () => {
        if (currentStepIndex < sequence.length - 1) {
            const nextStep = sequence[currentStepIndex + 1];
            setCurrentStepIndex(prev => prev + 1);
            setIsPlaying(true);
            setActiveInterruption(null);

            // Set timeLeft synchronously to prevent 1-frame glitch
            if (nextStep.mode === 'read' || nextStep.mode === 'message') {
                setTimeLeft(0);
                setElapsedTime(0);
            } else {
                setTimeLeft(nextStep.duration || 0);
                setElapsedTime(0);
            }
        } else {
            setPhase('outro');
        }
    };

    // Timer Logic
    useEffect(() => {
        if (!isPlaying || phase !== 'playing') return;

        // For non-read modes, handle time expiration
        if (currentStep?.mode !== 'read' && currentStep?.mode !== 'message' && timeLeft <= 0) {
            const nextStep = sequence[currentStepIndex + 1];
            if (nextStep?.autoStart || currentStep?.autoAdvance) {
                // Queue the next step
                handleNext();
            } else {
                // Stop the player and wait
                setIsPlaying(false);
            }
            return;
        }

        const timer = setInterval(() => {
            if (activeInterruption) return; // Pause timer if an interruption is showing

            if (currentStep?.mode === 'read' || currentStep?.mode === 'message') {
                // Count UP for reading or messages
                setElapsedTime(prev => prev + 1);
            } else {
                // Count DOWN for drills
                setTimeLeft(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) return 0;

                    // Check for interruptions exactly at the new remaining time
                    const interruption = currentStep?.interruptions?.find(i => i.triggerAtRemaining === newTime);
                    if (interruption) {
                        setIsPlaying(false);
                        setActiveInterruption({ text: interruption.text, resumeAt: newTime });
                    }

                    return newTime;
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, phase, currentStep?.mode, currentStep?.autoAdvance, currentStep?.interruptions, currentStepIndex, sequence, activeInterruption]);



    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const isComplete = (currentStep?.mode === 'read' || currentStep?.mode === 'message' || currentStep?.mode === 'recall') ? false : timeLeft === 0;

    // determine drill text
    // The user requested an out-of-copyright book, which is supplied in course-content.ts as COMMON_DRILL_TEXT
    const drillText = currentStep?.text || dayContent || "The quick brown fox jumps over the lazy dog. Speed reading requires focus. Keep your eyes moving. Do not look back. Trust your brain to capture words.";



    if (phase === 'outro') {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key="outro"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-8"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto"
                    >
                        <CheckCircle className="w-12 h-12 text-emerald-400" />
                    </motion.div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Well done!
                        </h1>
                        <p className="text-xl text-slate-300">
                            You have completed Day {dayNumber} of your training. Your brain is adapting nicely to the new speeds.
                        </p>
                    </div>

                    <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-3xl mt-8">
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Course Progress</div>
                        <div className="text-3xl font-bold text-white mb-4">{Math.round((dayNumber / 14) * 100)}%</div>
                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
                            <motion.div
                                className="h-full bg-emerald-500 rounded-full"
                                initial={{ width: `${((dayNumber - 1) / 14) * 100}%` }}
                                animate={{ width: `${(dayNumber / 14) * 100}%` }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                        </div>
                        <p className="text-sm text-slate-400">Day {dayNumber} of 14</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full max-w-lg mx-auto">
                        <Link
                            href="/test/after"
                            className="w-full py-4 px-8 bg-indigo-500 hover:bg-indigo-400 text-white text-base md:text-lg font-bold rounded-full transition-all flex items-center justify-center hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                        >
                            Test your new reading speed <FastForward className="w-5 h-5 ml-2" />
                        </Link>
                        <button
                            onClick={onComplete}
                            className="w-full py-4 px-8 bg-slate-800 hover:bg-slate-700 text-slate-300 text-base md:text-lg font-bold rounded-full transition-all hover:scale-105 border border-slate-700 hover:border-slate-500"
                        >
                            No thanks, see you tomorrow
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header / HUD */}
            {currentStep?.mode !== 'message' && (
                <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 sticky top-4 z-50 shadow-2xl">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded border border-indigo-500/20">
                                Day {dayNumber}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white">{currentStep.title}</h2>
                        <p className="text-sm text-slate-400 mt-1">{currentStep.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-8">
                        {currentStep.duration > 0 && (
                            <div className="text-right">
                                <div className="text-4xl font-mono font-bold text-indigo-400 tracking-tight">
                                    {(currentStep?.mode === 'read') ? formatTime(elapsedTime) : formatTime(timeLeft)}
                                </div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest text-right mt-1 font-bold">
                                    {currentStep?.mode === 'read' ? "Time Elapsed" : (currentStep?.mode === 'recall' ? "Recall Timer" : "Time Left")}
                                </div>
                            </div>
                        )}
                        {isComplete ? (
                            <button
                                onClick={handleNext}
                                className="bg-emerald-500 hover:bg-emerald-400 text-white p-5 rounded-full transition-all flex items-center justify-center hover:scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse"
                            >
                                <CheckCircle className="w-6 h-6" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                {(currentStep.mode === 'read' || (currentStep.mode as string) === 'message') && (
                                    <button
                                        onClick={handleNext}
                                        title="Ready"
                                        className="px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full transition-all flex items-center justify-center hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Click here when you are ready <FastForward className="w-5 h-5 ml-2" />
                                    </button>
                                )}
                                {currentStep.mode !== 'read' && (currentStep.mode as string) !== 'message' && (
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className={`p-5 rounded-full transition-all flex items-center justify-center hover:scale-105 ${isPlaying
                                            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                            : 'bg-white text-black hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                            }`}
                                    >
                                        {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Pacer Viewport */}
            <div className="relative">
                {activeInterruption ? (
                    <div className="w-full h-[60vh] flex flex-col bg-slate-900 border border-slate-800 text-slate-300 text-lg md:text-xl font-medium leading-relaxed relative z-20 text-center shadow-inner rounded-3xl overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center whitespace-pre-wrap">
                            <div className="max-w-2xl my-auto py-4">
                                {activeInterruption.text}
                            </div>
                        </div>
                        <div className="p-6 bg-slate-900 border-t border-slate-800 shrink-0 flex justify-center">
                            <button
                                onClick={() => {
                                    setIsPlaying(true);
                                    setActiveInterruption(null);
                                }}
                                className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full transition-all flex items-center justify-center hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                Continue Session <FastForward className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                ) : (
                    currentStep?.mode === 'message' ? (
                        <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 md:p-12 bg-slate-950 text-center shadow-2xl rounded-3xl overflow-hidden relative border border-slate-800">
                            {/* Decorative background circle */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_60%)]" />

                            <div className="z-10 flex-col flex items-center justify-center max-w-xl space-y-8">
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg text-center">
                                    {currentStep.title}
                                </h2>

                                <div className="p-8 md:p-10 bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl shadow-xl w-full">
                                    {currentStep.subtitle && (
                                        <p className="text-xl md:text-2xl font-bold text-indigo-400 mb-6 font-serif italic">
                                            {currentStep.subtitle}
                                        </p>
                                    )}
                                    <div className="text-slate-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-medium">
                                        {drillText}
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="px-10 py-4 mb-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all flex items-center justify-center hover:scale-105 shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] mt-8"
                                >
                                    Next <FastForward className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </div>
                    ) : currentStep?.mode === 'recall' ? (
                        <div className="w-full h-[60vh] flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 text-center shadow-inner rounded-3xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />

                            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 z-10 drop-shadow-lg">
                                {currentStep.text}
                            </h3>

                            <div className="relative w-48 h-48 flex items-center justify-center z-10 mb-8">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                    <motion.circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        fill="none"
                                        stroke="#818CF8"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        initial={{ strokeDasharray: "553 553", strokeDashoffset: 0 }}
                                        animate={{ strokeDashoffset: 553 * (1 - (timeLeft / currentStep.duration)) }}
                                        transition={{ duration: 0.5, ease: "linear" }}
                                    />
                                </svg>
                                <span className="text-7xl font-mono font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                                    {timeLeft}
                                </span>
                            </div>

                            <p className="text-slate-400 text-lg z-10 max-w-md mx-auto">
                                You may not remember any words and that is fine.
                            </p>
                        </div>
                    ) : (
                        <PacerEngine
                            key={currentStepIndex}
                            text={(currentStep.mode === 'read') ? drillText : drillText.repeat(20)}
                            wpm={currentStep.wpm}
                            isPlaying={isPlaying}
                            mode={currentStep.mode}
                            chunkSize={currentStep.chunkSize || 3}
                            highlightMode={currentStep.highlightMode}
                            acceleration={currentStep.acceleration}
                            customInterval={currentStep.customInterval}
                            smallFont={!!(currentStep.reduceFontSizeAfter && (currentStep.duration - timeLeft) >= currentStep.reduceFontSizeAfter)}
                            reduceFontSizeAfter={currentStep.reduceFontSizeAfter}
                            extraSmallFont={!!(currentStep.reduceFontSizeAgainAfter && (currentStep.duration - timeLeft) >= currentStep.reduceFontSizeAgainAfter)}
                            reduceFontSizeAgainAfter={currentStep.reduceFontSizeAgainAfter}
                            increaseChunkSizeAfter={currentStep.increaseChunkSizeAfter}
                            increaseChunkSizeTo={currentStep.increaseChunkSizeTo}
                        />
                    )
                )}

            </div>

            {/* Step Progress Bar within the session */}
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-8 border border-slate-800">
                <motion.div
                    className="h-full bg-slate-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex) / sequence.length) * 100}%` }}
                />
            </div>

            {/* Global Course Progress Bar */}
            <div className="pt-8 mt-8 border-t border-slate-800/50">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest mb-3">
                    <span className="text-slate-500">Global Course Progress</span>
                    <span className="text-indigo-500/80">Day {dayNumber} of 14</span>
                </div>
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500/30 rounded-full relative"
                        style={{ width: `${(dayNumber / 14) * 100}%` }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent to-indigo-500/50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
