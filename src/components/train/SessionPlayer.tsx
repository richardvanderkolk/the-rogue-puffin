"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrillStep } from '@/lib/course-content';
import PacerEngine from '@/components/PacerEngine';
import { Play, Pause, FastForward, CheckCircle, RotateCcw } from 'lucide-react';

interface SessionPlayerProps {
    sequence: DrillStep[];
    onComplete: () => void;
}

export default function SessionPlayer({ sequence, onComplete }: SessionPlayerProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const currentStep = sequence[currentStepIndex];

    // Reset timer when step changes
    useEffect(() => {
        setIsPlaying(false);
        setTimeLeft(currentStep.duration);
    }, [currentStepIndex, currentStep]);

    // Timer Logic
    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsPlaying(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const handleNext = () => {
        if (currentStepIndex < sequence.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const isComplete = timeLeft === 0;

    // determine drill text
    const drillText = currentStep.text || "The quick brown fox jumps over the lazy dog. Speed reading requires focus. Keep your eyes moving. Do not look back. Trust your brain to capture words.";

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header / HUD */}
            <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800 sticky top-4 z-50">
                <div>
                    <h2 className="text-xl font-bold text-white">{currentStep.title}</h2>
                    <p className="text-sm text-slate-400">{currentStep.subtitle}</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-indigo-400">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest text-right">Time Left</div>
                    </div>
                    {isComplete ? (
                        <button
                            onClick={handleNext}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white p-4 rounded-full transition-all animate-pulse"
                        >
                            <CheckCircle className="w-6 h-6" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`p-4 rounded-full transition-all ${isPlaying
                                    ? 'bg-slate-700 hover:bg-slate-600'
                                    : 'bg-white text-black hover:bg-slate-200'
                                }`}
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Pacer Viewport */}
            <div className="relative">
                <PacerEngine
                    text={drillText.repeat(20)} // Repeat text to fill time if needed 
                    wpm={currentStep.wpm}
                    isPlaying={isPlaying}
                    mode={currentStep.mode}
                    chunkSize={currentStep.chunkSize || 3}
                    highlightMode={currentStep.highlightMode}
                    acceleration={currentStep.acceleration}
                />

                {/* Overlay when paused */}
                {!isPlaying && !isComplete && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-3xl backdrop-blur-sm z-20">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Ready?</h3>
                            <p className="text-slate-300">Target Speed: <span className="text-indigo-400 font-bold">{currentStep.wpm} WPM</span></p>
                            <p className="text-sm text-slate-500 mt-4">Click Play to start drill</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex) / sequence.length) * 100}%` }}
                />
            </div>
            <div className="flex justify-between text-xs text-slate-500 uppercase tracking-widest">
                <span>Step {currentStepIndex + 1} of {sequence.length}</span>
                <span>{Math.round((currentStepIndex / sequence.length) * 100)}% Complete</span>
            </div>
        </div>
    );
}
