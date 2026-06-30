"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, Clock, ArrowDown, Brain } from 'lucide-react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
}

interface ReadingTestProps {
    text: string;
    questions: Question[];
    onComplete: (results: { wpm: number; comprehension: number }) => void;
    title?: string;
}

export default function ReadingTestEngine({ text, questions, onComplete, title = "Reading Speed Test" }: ReadingTestProps) {
    const [status, setStatus] = useState<'idle' | 'countdown' | 'reading' | 'quiz' | 'results'>('idle');
    const [wordCount, setWordCount] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [wpm, setWpm] = useState(0);
    
    // Countdown states
    const [countdown, setCountdown] = useState(3);
    const [tipText, setTipText] = useState("Calibrating tracker...");

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Calculate word count roughly
        setWordCount(text.split(/\s+/).length);
    }, [text]);

    useEffect(() => {
        if (status === 'countdown') {
            const tips = [
                "Calibrating neural tracker...",
                "Tip: Read for understanding, not speed.",
                "Tip: Avoid subvocalizing words in your head.",
                "Ready..."
            ];
            
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setStatus('reading');
                        setStartTime(Date.now());
                        return 3;
                    }
                    const nextVal = prev - 1;
                    setTipText(tips[3 - nextVal] || "Get ready...");
                    return nextVal;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status]);

    const handleStart = () => {
        setStatus('countdown');
        setCountdown(3);
        setTipText("Calibrating neural tracker...");
    };

    const handleFinishReading = () => {
        setEndTime(Date.now());
        setStatus('quiz');
    };

    const handleAnswer = (questionIndex: number, optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const submitResults = () => {
        if (!startTime || !endTime) return;

        // Calculate WPM with a minimum time threshold of 5 seconds to prevent accidental misclick spike values (e.g. 10,000 WPM)
        const rawDurationMs = Math.max(endTime - startTime, 5000);
        const durationInMinutes = rawDurationMs / 60000;
        const calculatedWpm = Math.round(wordCount / durationInMinutes);
        setWpm(calculatedWpm);

        // Calculate Comprehension
        let score = 0;
        answers.forEach((ans, i) => {
            if (ans === questions[i].correctIndex) score++;
        });
        const percentage = Math.round((score / questions.length) * 100);

        setStatus('results');
        onComplete({ wpm: calculatedWpm, comprehension: percentage });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Step Progress Timeline */}
            <div className="flex items-center justify-between mb-8 px-2 border-b border-slate-800/60 pb-5">
                {[
                    { key: 'idle', label: 'Welcome', active: status === 'idle' },
                    { key: 'countdown', label: 'Prepare', active: status === 'countdown' },
                    { key: 'reading', label: 'Read Passage', active: status === 'reading' },
                    { key: 'quiz', label: 'Comprehend', active: status === 'quiz' || status === 'results' }
                ].map((step, idx, arr) => {
                    const isActive = step.active;
                    const isCompleted = arr.findIndex(s => s.active) > idx;
                    return (
                        <div key={step.key} className="flex items-center flex-1 last:flex-none">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/20' 
                                        : isCompleted 
                                            ? 'bg-emerald-600 text-white' 
                                            : 'bg-slate-800 text-slate-500'
                                }`}>
                                    {isCompleted ? '✓' : idx + 1}
                                </div>
                                <span className={`text-xs font-bold hidden sm:inline ${
                                    isActive ? 'text-white font-extrabold' : isCompleted ? 'text-emerald-500' : 'text-slate-500'
                                }`}>
                                    {step.label}
                                </span>
                            </div>
                            {idx < arr.length - 1 && (
                                <div className={`h-0.5 flex-1 mx-2 sm:mx-4 rounded-full transition-all duration-500 ${
                                    isCompleted ? 'bg-emerald-600' : 'bg-slate-800'
                                }`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {status !== 'reading' && status !== 'countdown' && (
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-indigo-400" />
                    {title}
                </h2>
            )}

            {status === 'idle' && (
                <div className="text-center space-y-6 py-8">
                    <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
                        Read the next passage at your normal, comfortable pace. We will test your comprehension immediately afterwards.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">
                        <Brain className="w-4 h-4 text-indigo-400" /> Comprehension is as important as speed.
                    </div>
                    <button
                        onClick={handleStart}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all flex items-center gap-2 mx-auto shadow-lg shadow-indigo-600/15 hover:scale-105"
                    >
                        <Play className="w-5 h-5 fill-current" /> Start Reading
                    </button>
                </div>
            )}

            {status === 'countdown' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-8">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Outer rotating/pulsing glow */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30"
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute inset-2 rounded-full bg-indigo-500/5 filter blur-lg"
                        />
                        {/* Circle ring */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="54"
                                stroke="rgba(99, 102, 241, 0.1)"
                                strokeWidth="4"
                                fill="transparent"
                            />
                            <motion.circle
                                cx="64"
                                cy="64"
                                r="54"
                                stroke="#6366f1"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray="339.29"
                                initial={{ strokeDashoffset: 0 }}
                                animate={{ strokeDashoffset: (339.29 * (3 - countdown)) / 3 }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </svg>
                        {/* Countdown number */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={countdown}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute text-5xl font-black text-white font-mono"
                            >
                                {countdown}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="text-center space-y-2 max-w-sm">
                        <h4 className="text-slate-500 text-xs font-bold tracking-widest uppercase">Preparation</h4>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tipText}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-white text-base font-semibold leading-relaxed min-h-[48px] flex items-center justify-center px-4"
                            >
                                {tipText}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {status === 'reading' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-950 px-4 py-3 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><Brain className="w-4 h-4 text-indigo-400 animate-pulse" /> Read comfortably. Tap done as soon as you finish.</span>
                        <span className="font-mono font-bold text-slate-300 shrink-0">{wordCount} words</span>
                    </div>
                    <div
                        ref={contentRef}
                        className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed text-slate-300 h-[70vh] md:h-[50vh] overflow-y-auto p-5 bg-slate-950/50 rounded-xl border border-slate-800/50 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #0f172a' }}
                    >
                        {text.split('\n').map((para, i) => (
                            <p key={i} className="mb-4">{para}</p>
                        ))}
                    </div>
                    <button
                        onClick={handleFinishReading}
                        className="w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.01]"
                    >
                        <CheckCircle className="w-5 h-5" /> I'm Done Reading
                    </button>
                </div>
            )}

            {status === 'quiz' && (
                <div className="space-y-8">
                    {questions.map((q, qIndex) => (
                        <div key={q.id} className="space-y-4 border-b border-slate-800 pb-6 last:border-0">
                            <h3 className="text-white font-medium text-lg">{qIndex + 1}. {q.text}</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {q.options.map((opt, oIndex) => (
                                    <button
                                        key={oIndex}
                                        onClick={() => handleAnswer(qIndex, oIndex)}
                                        className={`p-3.5 rounded-xl text-left transition-all border text-sm font-medium ${answers[qIndex] === oIndex
                                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg'
                                            : 'bg-slate-800/40 border-transparent text-slate-400 hover:bg-slate-800'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={submitResults}
                        disabled={answers.includes(-1)}
                        className="w-full py-4 bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg"
                    >
                        Complete Test
                    </button>
                </div>
            )}

            {status === 'results' && (
                <div className="text-center py-12 space-y-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white">Test Complete</h3>
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div className="bg-slate-800 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-white">{wpm}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">WPM</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-white">
                                {Math.round((answers.filter((a, i) => a === questions[i].correctIndex).length / questions.length) * 100)}%
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Recall</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
