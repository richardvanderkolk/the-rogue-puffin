"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, Clock, ArrowDown } from 'lucide-react';

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
    const [status, setStatus] = useState<'idle' | 'reading' | 'quiz' | 'results'>('idle');
    const [wordCount, setWordCount] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [wpm, setWpm] = useState(0);

    // Scroll detection
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const checkScroll = () => {
        if (!contentRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        // Check if we are within 50px of the bottom or if the content is entirely visible
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 50 || clientHeight >= scrollHeight) {
            setHasScrolledToBottom(true);
        }
    };

    useEffect(() => {
        if (status === 'reading') {
            // slight delay to ensure content has rendered and layout is calculated
            setTimeout(checkScroll, 100);
        }
    }, [status, text]);

    useEffect(() => {
        // Calculate word count roughly
        setWordCount(text.split(/\s+/).length);
    }, [text]);

    const handleStart = () => {
        setStatus('reading');
        setStartTime(Date.now());
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

        // Calculate WPM
        const durationInMinutes = (endTime - startTime) / 60000;
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
        <div className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
            {status !== 'reading' && (
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-indigo-400" />
                    {title}
                </h2>
            )}

            {status === 'idle' && (
                <div className="text-center space-y-6 py-12">
                    <p className="text-slate-400">
                        Read the following text at your normal pace.<br />
                        Tap "Done" immediately when you finish.
                    </p>
                    <button
                        onClick={handleStart}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all flex items-center gap-2 mx-auto"
                    >
                        <Play className="w-5 h-5" /> Start Reading
                    </button>
                </div>
            )}

            {status === 'reading' && (
                <div className="space-y-8">
                    <div
                        ref={contentRef}
                        onScroll={checkScroll}
                        className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed text-slate-300 h-[70vh] md:h-[60vh] overflow-y-auto p-4 bg-slate-950/50 rounded-xl border border-slate-800/50 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #0f172a' }}
                    >
                        {text.split('\n').map((para, i) => (
                            <p key={i} className="mb-4">{para}</p>
                        ))}
                    </div>
                    <button
                        onClick={handleFinishReading}
                        disabled={!hasScrolledToBottom}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${hasScrolledToBottom
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                            }`}
                    >
                        {hasScrolledToBottom ? (
                            <>
                                <CheckCircle className="w-5 h-5" /> I'm Done Reading
                            </>
                        ) : (
                            <>
                                <ArrowDown className="w-5 h-5 animate-bounce" /> Scroll down to finish reading
                            </>
                        )}
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
                                        className={`p-3 rounded-lg text-left transition-all border ${answers[qIndex] === oIndex
                                            ? 'bg-indigo-600/20 border-indigo-500 text-white'
                                            : 'bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-800'
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
                        className="w-full py-3 bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 text-white rounded-xl font-bold transition-all"
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
