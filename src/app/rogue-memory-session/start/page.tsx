"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, CheckCircle, ArrowRight, Sparkles, Eye, Layers, Home, BookOpen, Star } from "lucide-react";
import Link from "next/link";
import { Slide } from "@/components/onboarding/ConceptSlides";
import { useSearchParams, useRouter } from "next/navigation";
import { updateBootcampProgress } from "@/app/actions/progress";

// ─── Word Lists ────────────────────────────────────────────────────────────────

const FIRST_30 = [
    "Pool", "Flower", "Car", "Dog", "Window",
    "Bird", "Microphone", "Book", "Bottle", "Picture",
    "Farm", "Bullet", "Jacket", "Smoke", "Ice Cream",
    "Helmet", "Clock", "Bridge", "Lace", "Ear",
    "Light", "Ball", "Shed", "Hand", "Door",
    "Banana", "Briefcase", "Rock", "Lightning", "Grass",
];

const SECOND_30 = [
    "Poster", "Keys", "Shirt", "Scissors", "Plate",
    "Horse", "Magazine", "Shoes", "Hammer", "Guitar",
    "Toilet", "Belt", "Computer", "Fire", "Fish",
    "Carpet", "Tree", "Plane", "Road", "Finger",
    "Paint", "Bell", "Garden", "Hat", "Electrician",
    "Table", "Pig", "Fan", "Pin", "Lion",
];

// ─── Fuzzy Matching ────────────────────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    const dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [i];
        for (let j = 1; j <= n; j++) {
            dp[i][j] = i === 0 ? j : Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0)
            );
        }
    }
    return dp[m][n];
}

function isMatch(input: string, word: string): boolean {
    const a = input.toLowerCase().trim().replace(/\s+/g, " ");
    const b = word.toLowerCase();
    if (a === b) return true;
    const aNS = a.replace(/\s/g, "");
    const bNS = b.replace(/\s/g, "");
    if (aNS === bNS) return true;
    const maxDist = b.length <= 4 ? 1 : 2;
    return levenshtein(a, b) <= maxDist || levenshtein(aNS, bNS) <= maxDist;
}

function scoreWords(input: string, wordList: string[]): { matched: string[]; missed: string[] } {
    const lines = input.split(/[\n,;]+/).map(w => w.trim()).filter(Boolean);
    const matched: string[] = [];
    const used = new Set<string>();
    for (const line of lines) {
        for (const word of wordList) {
            if (used.has(word)) continue;
            if (isMatch(line, word)) {
                matched.push(word);
                used.add(word);
                break;
            }
        }
    }
    const missed = wordList.filter(w => !matched.includes(w));
    return { matched, missed };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function CountdownTimer({ seconds, onComplete }: { seconds: number; onComplete?: () => void }) {
    const [remaining, setRemaining] = useState(seconds);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (remaining <= 0) {
            if (!done) { setDone(true); onComplete?.(); }
            return;
        }
        const t = setInterval(() => setRemaining(r => r - 1), 1000);
        return () => clearInterval(t);
    }, [remaining, done, onComplete]);

    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    const progress = (seconds - remaining) / seconds;
    const urgent = remaining <= 60;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke={urgent ? "#ef4444" : "#8b5cf6"}
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - progress)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-mono font-bold ${urgent ? "text-red-400" : "text-white"}`}>
                        {mins}:{secs.toString().padStart(2, "0")}
                    </span>
                </div>
            </div>
            {urgent && remaining > 0 && (
                <p className="text-red-400 text-xs font-bold animate-pulse">Last minute!</p>
            )}
        </div>
    );
}

function WordGrid({ words, highlighted = [] }: { words: string[]; highlighted?: string[] }) {
    const cols = [words.slice(0, 10), words.slice(10, 20), words.slice(20, 30)];
    return (
        <div className="grid grid-cols-3 gap-x-6 gap-y-1.5 w-full max-w-2xl mx-auto">
            {cols.map((col, ci) =>
                col.map((word, i) => {
                    const isHighlighted = highlighted.map(h => h.toLowerCase()).includes(word.toLowerCase());
                    return (
                        <div key={word} className="flex items-center gap-2.5">
                            <span className="text-xs text-slate-600 font-mono w-5 text-right">{ci * 10 + i + 1}.</span>
                            <span className={`font-medium text-sm transition-colors ${isHighlighted ? "text-emerald-400" : "text-white"}`}>
                                {word}
                                {isHighlighted && <span className="ml-1 text-emerald-500 text-xs">✓</span>}
                            </span>
                        </div>
                    );
                })
            )}
        </div>
    );
}

function WordInputStep({
    onSubmit,
    label,
}: {
    onSubmit: (input: string) => void;
    label: string;
}) {
    const [input, setInput] = useState("");

    return (
        <motion.div
            key="word-input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8 max-w-2xl mx-auto"
        >
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Brain className="w-8 h-8 text-violet-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">{label}</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <span className="text-amber-400 text-base">⚠️</span> PRESS ENTER AFTER EVERY WORD
                </div>
                <p className="text-slate-400 text-sm">Type every word you remember. Don't worry about perfect spelling.</p>
            </div>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Word 1\nWord 2\nWord 3\n...`}
                className="w-full h-64 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-colors"
                autoFocus
            />
            <button
                onClick={() => onSubmit(input)}
                disabled={input.trim().length === 0}
                className="w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 text-lg"
            >
                Score My Answers <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-slate-600 text-xs">Your answers are scored locally — nothing is stored or sent anywhere.</p>
        </motion.div>
    );
}

function ScoreStep({
    matched,
    missed,
    wordList,
    isBaseline,
    onNext,
    buttonText,
}: {
    matched: string[];
    missed: string[];
    wordList: string[];
    isBaseline: boolean;
    onNext: () => void;
    buttonText?: string;
}) {
    const pct = Math.round((matched.length / wordList.length) * 100);
    const color = pct >= 70 ? "text-emerald-400" : pct >= 40 ? "text-amber-400" : "text-rose-400";

    return (
        <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full space-y-8 max-w-2xl mx-auto text-center"
        >
            <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {isBaseline ? "Your Baseline" : "Your New Score"}
                </p>
                <p className={`text-8xl font-black font-mono ${color}`}>
                    {matched.length}<span className="text-3xl text-slate-600">/{wordList.length}</span>
                </p>
                <p className="text-slate-400 text-lg">words recalled</p>
            </div>

            {matched.length > 0 && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl text-left">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">You got these ✓</p>
                    <div className="flex flex-wrap gap-2">
                        {matched.map(w => (
                            <span key={w} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm">{w}</span>
                        ))}
                    </div>
                </div>
            )}

            {missed.length > 0 && !isBaseline && (
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl text-left">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">You missed</p>
                    <div className="flex flex-wrap gap-2">
                        {missed.map(w => (
                            <span key={w} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-400 text-sm">{w}</span>
                        ))}
                    </div>
                </div>
            )}

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                {isBaseline ? (
                    <p className="text-slate-300 leading-relaxed">
                        {matched.length <= 10
                            ? `${matched.length} out of 30 using your current method. This is perfectly normal — most people get between 5 and 18. Now let's change that.`
                            : matched.length <= 18
                                ? `${matched.length} out of 30 — a solid baseline. By the end of this session, you'll know exactly how to do significantly better.`
                                : `${matched.length} out of 30 — impressive! You already have a head start. Let's see what techniques can add on top.`}
                    </p>
                ) : (
                    <p className="text-slate-300 leading-relaxed">
                        {matched.length > 20
                            ? "Outstanding! The techniques are clearly working. Scroll down to see the full 60-word reveal."
                            : matched.length > 10
                                ? "A clear improvement. Keep using these techniques and the results will compound quickly."
                                : "Even a small improvement is proof the techniques work. They get easier with practice — keep going."}
                    </p>
                )}
            </div>

            <button
                onClick={onNext}
                className="w-full py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
                {buttonText || (isBaseline ? "Now Let's Change That →" : "See the Full 60-Word Reveal →")}
            </button>
        </motion.div>
    );
}

function MethodTestStep({ wordList, onNext, onBack, onRetry, attempts, methodName }: {
    wordList: string[];
    onNext: () => void;
    onBack: () => void;
    onRetry: () => void;
    attempts: number;
    methodName: string;
}) {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<{ matched: string[]; missed: string[] } | null>(null);

    if (result) {
        const score = result.matched.length;
        const perfect = score === wordList.length;
        return (
            <motion.div key="method-recall-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full space-y-5 max-w-2xl mx-auto text-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{methodName}</p>
                <p className={`text-7xl font-black font-mono ${perfect ? 'text-emerald-400' : score >= 7 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {score}<span className="text-3xl text-slate-600">/{wordList.length}</span>
                </p>
                {result.matched.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                        {result.matched.map(w => <span key={w} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm">{w}</span>)}
                    </div>
                )}
                {!perfect && (
                    <div className="w-full text-left space-y-6">
                        <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">You Missed These Words</p>
                            <div className="flex flex-wrap gap-2">
                                {result.missed.map(w => (
                                    <span key={w} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-400 text-sm">
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-violet-950/20 border border-violet-500/20 rounded-xl space-y-3">
                            <p className="text-white font-bold text-sm">
                                {attempts === 1
                                    ? "You are on your way! You can get 10/10 by strengthening the image for the words you missed. Remember to:"
                                    : "You are almost there... You can get 10/10 by strengthening the image for the words you missed. Remember to:"}
                            </p>
                            <ul className="space-y-1 text-slate-400 text-sm pl-2">
                                {['Make each image more striking — bigger, brighter, more ridiculous', 'Add movement: make the word DO something dramatic', 'Include emotion: disgust, laughter, or shock are the most memorable', 'Use more senses: smell, sound, touch — not just sight'].map(tip => (
                                    <li key={tip} className="flex gap-2 items-start"><span className="text-violet-400 shrink-0">→</span>{tip}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-3 pt-2">
                            <button onClick={() => { setInput(''); setResult(null); onRetry(); }} className="w-full py-4 bg-violet-600 border border-violet-500 text-white font-bold rounded-full hover:bg-violet-500 transition-all flex items-center justify-center gap-2">
                                ← Let's Review & Try Again
                            </button>
                            <button onClick={onNext} className="w-full py-3 text-slate-500 text-sm pt-4 hover:text-slate-300 transition-all underline decoration-slate-700 underline-offset-4">
                                I want to skip ahead to the next method
                            </button>
                        </div>
                    </div>
                )}
                {perfect && (
                    <div className="space-y-3 pt-4">
                        <button onClick={onNext} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 transition-all">
                            Perfect Mastery — Continue →
                        </button>
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <motion.div key="method-recall-test" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-5 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{methodName}</p>
                <h2 className="text-3xl font-bold text-white">Can You Recall the Words?</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <span className="text-amber-400 text-base">⚠️</span> PRESS ENTER AFTER EVERY WORD
                </div>
                <p className="text-slate-400 text-sm">Cover the previous slide and type every word you remember.</p>
            </div>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Word 1\nWord 2\nWord 3\n...`}
                className="w-full h-36 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-violet-500"
                autoFocus
            />
            <div className="space-y-3">
                <button onClick={() => setResult(scoreWords(input, wordList))} disabled={!input.trim()}
                    className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold rounded-full transition-colors">
                    Score My Words
                </button>
                <button onClick={onBack} className="w-full py-2 text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    ← Back to review the method
                </button>
            </div>
        </motion.div>
    );
}

function TimerStudyStep({
    words,
    onComplete,
    heading,
    subheading,
}: {
    words: string[];
    onComplete: () => void;
    heading: string;
    subheading: string;
}) {
    return (
        <motion.div
            key={heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">{heading}</h2>
                    <p className="text-slate-400 text-sm mt-1">{subheading}</p>
                </div>
                <CountdownTimer seconds={600} onComplete={onComplete} />
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <WordGrid words={words} />
            </div>

            <div className="text-center space-y-3">
                <p className="text-slate-500 text-sm">The timer will advance automatically at 0:00, or click below when you feel ready.</p>
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-full transition-colors inline-flex items-center gap-2"
                >
                    I'm Ready — Cover the Words
                </button>
            </div>
        </motion.div>
    );
}

function InterferenceStep({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (count >= 10) return;
        const t = setTimeout(() => setCount(c => c + 1), 1000);
        return () => clearTimeout(t);
    }, [count]);

    return (
        <motion.div key="interference" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Count Out Loud</h2>
                <p className="text-slate-400">Before you write anything down, count out loud with the numbers below to clear your short-term memory.</p>
            </div>
            <div className="text-9xl font-black font-mono text-violet-400 py-8 tabular-nums tracking-tighter">
                {count}
            </div>
            <div className="h-16 flex items-center justify-center">
                {count >= 10 && (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={onComplete} className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                        Now Write Your Words →
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

// ─── Main Session Page ─────────────────────────────────────────────────────────

const TOTAL_STEPS = 33;

export default function RogueMemorySessionPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading session...</div>}>
            <RogueMemorySessionContent />
        </Suspense>
    );
}

function RogueMemorySessionContent() {
    const searchParams = useSearchParams();
    const course = searchParams.get('course') || 'bootcamp';
    
    const dashboardUrl = '/bootcamp';
    const dashboardText = 'Return to Bootcamp';

    const [step, setStep] = useState(0);
    const [baselineResult, setBaselineResult] = useState<{ matched: string[]; missed: string[] } | null>(null);
    const [retestResult, setRetestResult] = useState<{ matched: string[]; missed: string[] } | null>(null);
    const [final60Result, setFinal60Result] = useState<{ matched: string[]; missed: string[] } | null>(null);
    const [methodAttempts, setMethodAttempts] = useState<Record<string, number>>({});
    const router = useRouter();

    const recordAttempt = useCallback((m: string) => setMethodAttempts(p => ({ ...p, [m]: (p[m] || 0) + 1 })), []);
    const nextStep = useCallback(() => setStep(s => s + 1), []);
    const prevStep = useCallback(() => setStep(s => Math.max(0, s - 1)), []);
    const nextNextStep = useCallback(() => setStep(s => s + 2), []);
    const prevPrevStep = useCallback(() => setStep(s => Math.max(0, s - 2)), []);

    const handleBaselineSubmit = (input: string) => {
        const result = scoreWords(input, FIRST_30);
        setBaselineResult(result);
        try {
            localStorage.setItem('rogue_memory_baseline', result.matched.length.toString());
        } catch (e) {}
        nextStep();
    };

    const handleRetestSubmit = (input: string) => {
        const result = scoreWords(input, SECOND_30);
        setRetestResult(result);
        try {
            localStorage.setItem('rogue_memory_current', result.matched.length.toString());
        } catch (e) {}
        
        // Save anonymous
        try {
            const visitorId = localStorage.getItem('rp_visitor_id');
            if (visitorId && baselineResult) {
                fetch('/api/memory-tests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        visitor_id: visitorId, 
                        baseline_score: baselineResult.matched.length,
                        retest_score: result.matched.length
                    })
                });
            }
        } catch (e) {
            console.error(e);
        }
        
        nextStep();
    };

    const handleComplete = async () => {
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (currentProgress < 4) {
            localStorage.setItem('rogue_day_progress', '4');
        }
        if (course === 'bootcamp') {
            await updateBootcampProgress(4);
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-32 pb-12 px-6 bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30">
            <div className="max-w-3xl w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* ── STEP 0: Session Intro ── */}
                    {step === 0 && (
                        <Slide key="intro" title="The Rogue Memory Session" icon={<Brain className="w-12 h-12 text-violet-400" />} onNext={nextStep} customButtonText="Let's Begin" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full text-center">
                                <p className="text-xl text-slate-200">This session has three parts:</p>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-4">
                                    {[
                                        { n: "1", colorClass: "text-rose-400 bg-rose-500/10 border-rose-500/30", t: "Measure Baseline", b: "10 min to memorise 30 words using your current method." },
                                        { n: "2", colorClass: "text-violet-400 bg-violet-500/10 border-violet-500/30", t: "Learn Techniques", b: "Master three powerful new memory methods." },
                                        { n: "3", colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", t: "Measure New Memory", b: "10 min with 30 fresh words. Then we reveal all 60." },
                                    ].map(({ n, colorClass, t, b }, i) => (
                                        <div key={n} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 flex-1 max-w-[280px]">
                                            <div className="flex flex-col items-center gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl w-full h-auto min-h-[14rem] text-center justify-start hover:border-slate-700 transition-colors shadow-lg">
                                                <span className={`w-12 h-12 rounded-full border ${colorClass} font-bold text-xl flex items-center justify-center shrink-0`}>{n}</span>
                                                <div>
                                                    <p className="font-bold text-white text-base mb-2">{t}</p>
                                                    <p className="text-slate-400 text-sm leading-relaxed">{b}</p>
                                                </div>
                                            </div>
                                            {i < 2 && <ArrowRight className="hidden md:block w-8 h-8 text-slate-700 shrink-0" />}
                                            {i < 2 && <ArrowRight className="md:hidden w-8 h-8 text-slate-700 rotate-90 shrink-0" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 1: Baseline Study (10 min timer + 30 words) ── */}
                    {step === 1 && (
                        <TimerStudyStep
                            key="study-1"
                            words={FIRST_30}
                            onComplete={nextStep}
                            heading="Step 1: Measure Your Current Memory"
                            subheading="Study these 30 words using whatever method you normally use. You have 10 minutes."
                        />
                    )}

                    {/* ── STEP 2: Baseline Interference ── */}
                    {step === 2 && (
                        <InterferenceStep
                            key="interfere-baseline"
                            onComplete={nextStep}
                        />
                    )}

                    {/* ── STEP 3: Baseline Word Input ── */}
                    {step === 3 && (
                        <WordInputStep
                            key="input-1"
                            label="What do you remember?"
                            onSubmit={handleBaselineSubmit}
                        />
                    )}

                    {/* ── STEP 4: Baseline Results ── */}
                    {step === 4 && baselineResult && (
                        <ScoreStep
                            key="score-1"
                            matched={baselineResult.matched}
                            missed={baselineResult.missed}
                            wordList={FIRST_30}
                            isBaseline={true}
                            onNext={nextStep}
                        />
                    )}

                    {/* ── STEP 5: Sound Familiar? ── */}
                    {step === 5 && (
                        <Slide key="obs-party" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Sound Familiar?</h2>
                                
                                <div className="relative p-6 md:p-8 bg-slate-900/60 border border-slate-800 rounded-3xl shadow-xl max-w-3xl mx-auto overflow-hidden">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-violet-500/10 rounded-br-full" />
                                    <span className="absolute top-4 left-6 text-6xl text-slate-800 font-serif leading-none opacity-50">"</span>
                                    <p className="relative z-10 text-xl md:text-2xl italic text-slate-300 font-serif leading-relaxed px-8">
                                        At a party you want to join in telling a joke, but can't remember any — until someone says something that reminds you of one?
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 max-w-2xl mx-auto">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-bold tracking-widest uppercase">
                                        The Insight
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">Memory works by association.</h3>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        The joke was never lost — it was <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">stored</span>, waiting for the right trigger. One thought leads to another, like links in a chain.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 6: Why Songs Stick ── */}
                    {step === 6 && (
                        <Slide key="obs-song" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Why Songs Stick</h2>
                                
                                <div className="relative p-6 md:p-8 bg-slate-900/60 border border-slate-800 rounded-3xl shadow-xl max-w-3xl mx-auto overflow-hidden">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-br-full" />
                                    <span className="absolute top-4 left-6 text-6xl text-slate-800 font-serif leading-none opacity-50">"</span>
                                    <p className="relative z-10 text-xl md:text-2xl italic text-slate-300 font-serif leading-relaxed px-8">
                                        You know all the words to a song, but fail to remember a simple shopping list?
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 max-w-2xl mx-auto">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold tracking-widest uppercase">
                                        The Insight
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">Rhythm and emotion encode memory.</h3>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        A song gives words <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">rhythm, melody, and meaning</span>. A shopping list gives them nothing. When we attach emotion to information, we remember it effortlessly.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 7: A Face vs a Name ── */}
                    {step === 7 && (
                        <Slide key="obs-face" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">A Face vs a Name</h2>
                                
                                <div className="relative p-6 md:p-8 bg-slate-900/60 border border-slate-800 rounded-3xl shadow-xl max-w-3xl mx-auto overflow-hidden">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-br-full" />
                                    <span className="absolute top-4 left-6 text-6xl text-slate-800 font-serif leading-none opacity-50">"</span>
                                    <p className="relative z-10 text-xl md:text-2xl italic text-slate-300 font-serif leading-relaxed px-8">
                                        You recognise someone's face perfectly, but simply can't recall their name?
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 max-w-2xl mx-auto">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-bold tracking-widest uppercase">
                                        The Insight
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">We remember pictures better than words.</h3>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        A face is packed with <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">detail, texture, and expression</span>. A name is an arbitrary sound with no inherent meaning.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 8: And Three More ── */}
                    {step === 8 && (
                        <Slide key="obs-more" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">And Three More...</h2>
                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">More proof that your memory is already incredibly powerful.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2 max-w-5xl mx-auto">
                                    {[
                                        { obs: "Something is on the tip of your tongue — all you need is the first word to set you off?", insight: "All memories are stored. Retrieval is the skill.", icon: "👅", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                                        { obs: "Your strongest childhood memories have a strong emotional attachment?", insight: "Emotion amplifies memory. Use it deliberately.", icon: "❤️", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                                        { obs: "Old friends remind you of things you had not thought about for years?", insight: "Context and association unlock what we thought was lost.", icon: "🤝", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                                    ].map(({ obs, insight, icon, color, bg, border }, i) => (
                                        <div key={i} className={`p-6 bg-slate-900/60 border ${border} rounded-3xl flex flex-col gap-4 relative overflow-hidden group hover:bg-slate-800 transition-colors`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${bg}`}>{icon}</div>
                                            </div>
                                            <p className="text-slate-300 text-sm italic leading-relaxed z-10">"{obs}"</p>
                                            <div className="mt-auto pt-4 border-t border-slate-800/50">
                                                <p className={`${color} text-sm font-bold`}>→ {insight}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 9: What Your Memory Is Telling You ── */}
                    {step === 9 && (
                        <Slide key="triggers" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">The Core Principles</h2>
                                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">What do all these everyday experiences tell us?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left pt-2">
                                    {[
                                        { icon: "🔗", bold: "Triggers", rest: "One word can unlock a memory that would not have come to mind otherwise.", bg: "bg-slate-800", color: "text-slate-200" },
                                        { icon: "🎵", bold: "Rhythm", rest: "Music and rhyme dramatically improve retention and recall speed.", bg: "bg-indigo-500/10", color: "text-indigo-400" },
                                        { icon: "❤️", bold: "Emotion", rest: "Strong feelings — laughter, disgust, surprise — make memory stick.", bg: "bg-rose-500/10", color: "text-rose-400" },
                                        { icon: "👁️", bold: "Images", rest: "Something seen is far easier to remember than a word or name.", bg: "bg-emerald-500/10", color: "text-emerald-400" },
                                    ].map(({ icon, bold, rest, bg, color }) => (
                                        <div key={bold} className="flex gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:bg-slate-800/80 transition-colors">
                                            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl ${bg}`}>{icon}</div>
                                            <div>
                                                <h4 className={`font-bold ${color} mb-1`}>{bold}</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">{rest}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 bg-gradient-to-r from-violet-900/40 via-fuchsia-900/40 to-violet-900/40 border border-violet-500/30 rounded-3xl max-w-3xl mx-auto mt-4 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">We Remember Best In Pictures.</h3>
                                    <p className="text-violet-200 text-sm">The techniques you are about to learn are built on exactly this principle.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 10: Before You Start ── */}
                    {step === 10 && (
                        <Slide key="before-you-start" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Before You Start</h2>
                                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Four habits that improve memory before you even begin.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left pt-2">
                                    {[
                                        { icon: "👁️", bold: "Observation", rest: "We must first observe before we can remember — pay attention.", bg: "bg-slate-800", color: "text-slate-200" },
                                        { icon: "💡", bold: "Interest", rest: "If we don't associate interest or value to the information, we won't create any need to remember it.", bg: "bg-amber-500/10", color: "text-amber-400" },
                                        { icon: "🧩", bold: "Overview", rest: "Get an overall picture first — like seeing the jigsaw puzzle picture before putting the pieces together.", bg: "bg-emerald-500/10", color: "text-emerald-400" },
                                        { icon: "🧘‍♂️", bold: "Relax", rest: "Increase your ability to absorb information by being physically and mentally relaxed.", bg: "bg-violet-500/10", color: "text-violet-400" },
                                    ].map(({ icon, bold, rest, bg, color }) => (
                                        <div key={bold} className="flex gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:bg-slate-800/80 transition-colors">
                                            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl ${bg}`}>{icon}</div>
                                            <div>
                                                <h4 className={`font-bold ${color} mb-1`}>{bold}</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">{rest}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 11: The Secrets to Memory (1/4) ── */}
                    {step === 11 && (
                        <Slide key="secrets-1" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full">
                                <div className="text-center space-y-3">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-bold uppercase tracking-widest">
                                        Secret #1
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Use Your Senses</h2>
                                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">By combining more than one of our senses, we observe and remember exponentially more.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 hover:border-violet-500/50 hover:bg-slate-800/80 transition-all group">
                                        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform">👁️</div>
                                        <h3 className="text-lg font-bold text-white">Visualise</h3>
                                        <p className="text-slate-400 text-xs">Don't just picture it. See the vivid colours, textures, and lighting.</p>
                                    </div>
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 hover:border-violet-500/50 hover:bg-slate-800/80 transition-all group">
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">👂</div>
                                        <h3 className="text-lg font-bold text-white">Hear It</h3>
                                        <p className="text-slate-400 text-xs">Attach a specific sound. Is it loud, soft, screeching, or musical?</p>
                                    </div>
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 hover:border-violet-500/50 hover:bg-slate-800/80 transition-all group">
                                        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform">👃</div>
                                        <h3 className="text-xl font-bold text-white">Smell & Touch</h3>
                                        <p className="text-slate-400 text-sm">Imagine the temperature, the weight, and the distinct smell.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 12: The Secrets to Memory (2/4) ── */}
                    {step === 12 && (
                        <Slide key="secrets-2" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-4xl mx-auto w-full">
                                <div className="text-center space-y-3">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-bold uppercase tracking-widest">
                                        Secret #2
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Create a Striking Image</h2>
                                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">The brain deletes the mundane but remembers the extraordinary. Apply these modifiers to every image.</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                                    {[
                                        { icon: "🏃", label: "MOVEMENT", desc: "Make your mental image active and dynamic.", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                                        { icon: "❤️", label: "EMOTION", desc: "Attach strong feelings like laughter or disgust.", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                                        { icon: "🎨", label: "COLOURS", desc: "Paint the image with vivid, highly saturated colours.", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                                        { icon: "🔭", label: "EXAGGERATE", desc: "Blow things completely out of proportion.", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
                                        { icon: "👃", label: "SENSES", desc: "Involve what you can hear, smell, taste, and touch.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                                        { icon: "🔍", label: "DETAILS", desc: "Focus in on intricate textures and temperature.", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                                    ].map(({ icon, label, desc, color, bg, border }) => (
                                        <div key={label} className={`flex flex-col items-start gap-2 p-4 bg-slate-900/60 border ${border} rounded-3xl hover:bg-slate-800 transition-colors`}>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${bg}`}>{icon}</div>
                                            <div>
                                                <p className={`font-black ${color} text-xs tracking-widest`}>{label}</p>
                                                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 13: The Secrets to Memory (3/4) ── */}
                    {step === 13 && (
                        <Slide key="secrets-3" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-8 max-w-4xl mx-auto w-full text-center">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-bold uppercase tracking-widest">
                                        Secret #3
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Make It Ridiculous</h2>
                                </div>
                                
                                <div className="py-12 px-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-8 relative overflow-hidden">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
                                    <p className="text-3xl md:text-4xl text-slate-300 font-bold leading-tight relative z-10">
                                        Logic is the <span className="text-rose-400">enemy</span> of memory.
                                    </p>
                                    <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
                                        Make your image out of proportion, completely ridiculous, and totally illogical — and you will be sure to remember it.
                                    </p>
                                    
                                    <div className="max-w-2xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left relative z-10 shadow-xl">
                                        <div className="flex gap-4">
                                            <div className="text-5xl shrink-0 mt-1">🍾🕶️</div>
                                            <div>
                                                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Example: "Bottle"</p>
                                                <p className="text-slate-300 text-lg leading-relaxed">
                                                    Don't picture a normal bottle on a desk. Picture a <strong className="text-white">massive, 10-foot-tall talking bottle</strong> wearing sunglasses and spraying grape juice everywhere while laughing hysterically.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 14: The Secrets to Memory (4/4) ── */}
                    {step === 14 && (
                        <Slide key="secrets-4" onNext={nextStep} onBack={prevStep} customButtonText="Ready to Apply These?" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full">
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Structural Retention</h2>
                                    <p className="text-lg text-slate-400">Three habits for long-term memory storage.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                                        <div className="relative z-10 space-y-3">
                                            <span className="text-3xl block">⏱️</span>
                                            <h3 className="text-xl font-bold text-white">Take Breaks</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">You remember things best at the beginning and end of a session. Create more "beginnings" and "ends" by taking regular, short breaks.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-violet-500/50 transition-colors">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                                        <div className="relative z-10 space-y-3">
                                            <span className="text-3xl block">🗂️</span>
                                            <h3 className="text-xl font-bold text-white">Categorise</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">By grouping similar items together, you dramatically cut down on the total number of individual "files" your brain needs to retrieve.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 md:p-6 relative overflow-hidden group hover:border-rose-500/50 transition-colors">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                                        <div className="relative z-10 space-y-3">
                                            <span className="text-3xl block">🔄</span>
                                            <h3 className="text-xl font-bold text-white">After Learning</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">Reviewing the information at spaced, regular intervals will increase your long-term memory retention by up to 500%.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}


                    {/* ── STEP 15: Method 1 Intro ── */}
                    {step === 15 && (
                        <Slide key="m1-intro" onNext={nextStep} onBack={prevStep} customButtonText="See it in Practice" fullWidth>
                            <div className="space-y-8 max-w-5xl mx-auto w-full text-center">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold uppercase tracking-widest">
                                        Method 1
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">The Story</h2>
                                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">Link a random list of words together into a vivid, continuous narrative.</p>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8">
                                    {["Word 1", "Word 2", "Word 3", "Word 4"].map((w, i) => (
                                        <div key={w} className="flex flex-col md:flex-row items-center gap-4">
                                            <div className="p-6 bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.1)] text-white font-bold tracking-widest">
                                                {w}
                                            </div>
                                            {i < 3 && <div className="text-indigo-400">→</div>}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                                    <div className="flex gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                        <span className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center shrink-0">1</span>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Picture it Vividly</h4>
                                            <p className="text-slate-400 text-sm">Visualize the first word using the sensory modifiers.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                        <span className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center shrink-0">2</span>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Make it Interact</h4>
                                            <p className="text-slate-400 text-sm">Have the first object physically interact with the second.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 16: Method 1 Practice ── */}
                    {step === 16 && (
                        <Slide key="m1-practice" onNext={nextStep} onBack={prevStep} customButtonText="Got It — Test Me" fullWidth>
                            <div className="space-y-8 max-w-5xl mx-auto w-full">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-white mb-6">Visualise This Scene</h2>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-3xl mx-auto">
                                    {FIRST_30.slice(0, 10).map((w, i) => (
                                        <div key={w} className="flex items-center gap-2">
                                            <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 text-sm font-bold shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                                                {w}
                                            </span>
                                            {i < 9 && <ArrowRight className="w-4 h-4 text-indigo-500/50" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 md:p-12 bg-slate-900/80 border border-indigo-500/20 rounded-3xl text-slate-300 text-lg md:text-xl leading-relaxed space-y-6 relative overflow-hidden max-w-4xl mx-auto shadow-2xl">
                                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                                    
                                    <p className="relative z-10">Imagine telling your child a story when he pushes you into your <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Pool</span>. At first he thinks it's hilarious, but then he picks a <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Flower</span> and gives it to you to say sorry — how could you stay mad? You dry off and jump in your <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Car</span>, closely followed by your <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Dog</span>, who leaps right through the open <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Window</span>.</p>
                                    
                                    <p className="relative z-10">As you drive off, a <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Bird</span> smashes into your windscreen. You pull over and notice the dazed bird has a tiny <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Microphone</span> strapped to its head. As it comes around, it reaches under its wing and pulls out a <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Book</span>, furiously pointing at a page as if you've broken a law written inside. Then it pulls out a <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Bottle</span>, takes a long swig — it was drink-flying! — gets out a camera, and takes a <span className="bg-indigo-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">Picture</span> of you before waddling away.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 17: Method 1 Test ── */}
                    {step === 17 && (
                        <MethodTestStep
                            key="m1-test"
                            wordList={FIRST_30.slice(0, 10)}
                            methodName="The Story"
                            attempts={(methodAttempts["The Story"] || 0) + 1}
                            onRetry={() => { recordAttempt("The Story"); prevStep(); }}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {/* ── STEP 18: Method 2 Intro ── */}
                    {step === 18 && (
                        <Slide key="m2-intro" onNext={nextStep} onBack={prevStep} customButtonText="See it in Practice" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full text-center">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold uppercase tracking-widest">
                                        Method 2
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Linking & Association</h2>
                                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Instead of a continuous story, just link pairs of words together in a dramatic transformation.</p>
                                </div>

                                <div className="flex justify-center items-center gap-6 py-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-900 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.1)] mb-2">
                                            A
                                        </div>
                                        <span className="text-slate-400 text-xs font-bold">Word 1</span>
                                    </div>
                                    
                                    <div className="flex flex-col items-center gap-2">
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1] }} 
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="text-emerald-400 text-xl"
                                        >
                                            💥
                                        </motion.div>
                                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0" />
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-900 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.1)] mb-2">
                                            B
                                        </div>
                                        <span className="text-slate-400 text-xs font-bold">Word 2</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
                                    <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
                                        <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center mb-3 text-sm">1</span>
                                        <h4 className="text-white font-bold mb-1">Take Two Words</h4>
                                        <p className="text-slate-400 text-xs">Focus only on Word A and Word B.</p>
                                    </div>
                                    <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
                                        <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center mb-3 text-sm">2</span>
                                        <h4 className="text-white font-bold mb-1">Transform Them</h4>
                                        <p className="text-slate-400 text-xs">Make them interact in a bizarre, exaggerated way.</p>
                                    </div>
                                    <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-rose-500/10 rounded-bl-full" />
                                        <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center mb-3 relative z-10 text-sm">3</span>
                                        <h4 className="text-white font-bold mb-1 relative z-10">Forget Word A</h4>
                                        <p className="text-slate-400 text-xs relative z-10">Drop A. Take B, and link it to C.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 19: Method 2 Practice ── */}
                    {step === 19 && (
                        <Slide key="m2-practice" onNext={nextStep} onBack={prevStep} customButtonText="Got It — Test Me" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-white mb-4">Visualise The Chain</h2>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 justify-center mb-4 max-w-3xl mx-auto">
                                    {FIRST_30.slice(10, 20).map((w, i) => (
                                        <div key={w} className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                                {w}
                                            </span>
                                            {i < 9 && <div className="w-3 h-1 bg-emerald-500/30 rounded-full" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 md:p-8 bg-slate-900/80 border border-emerald-500/20 rounded-3xl text-slate-300 text-base md:text-lg leading-relaxed space-y-4 relative overflow-hidden max-w-4xl mx-auto shadow-2xl">
                                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                                    
                                    <p className="relative z-10">Imagine a giant chain-link fence like a moat surrounding a <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Farm</span>. Then a huge shiny silver <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Bullet</span> comes screaming through, demolishing everything. The bullet transforms into a coat stand with a leather <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Jacket</span> hanging from it. The jacket begins billowing with <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Smoke</span> — but without catching fire.</p>
                                    <p className="relative z-10">The smoke curls out of a <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Helmet</span> and turns into a towering scoop of <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Ice Cream</span> sitting right inside the helmet. Now picture a bicycle wearing that helmet, and on the side of the helmet is a giant tick-tocking <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Clock</span>. The clock grows enormous and spans the entire Sydney Harbour <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Bridge</span>. The bridge is draped from end to end in white <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Lace</span>, fluttering in the breeze — and the lace has been intricately sculpted into the unmistakable shape of a human <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]">Ear</span>.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 20: Method 2 Test ── */}
                    {step === 20 && (
                        <MethodTestStep
                            key="m2-test"
                            wordList={FIRST_30.slice(10, 20)}
                            methodName="Linking & Association"
                            attempts={(methodAttempts["Linking & Association"] || 0) + 1}
                            onRetry={() => { recordAttempt("Linking & Association"); prevStep(); }}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {/* ── STEP 21: Method 3 Intro ── */}
                    {step === 21 && (
                        <Slide key="m3-intro" onNext={nextStep} onBack={prevStep} customButtonText="See it in Practice" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full text-center">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-bold uppercase tracking-widest">
                                        Method 3
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">The House Method</h2>
                                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Also known as a Memory Palace. Use a route you already know perfectly to store new information.</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 max-w-4xl mx-auto">
                                    {["Bedroom", "Bathroom", "Kitchen", "Front Door"].map((room, i) => (
                                        <div key={room} className="p-3 bg-slate-900 border border-amber-500/30 rounded-2xl flex flex-col items-center gap-2 relative shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                            <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">{i + 1}</span>
                                            <span className="text-white font-bold text-xs tracking-widest uppercase">{room}</span>
                                            {i < 3 && <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-amber-500/50 w-5 h-5" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
                                    <div className="flex gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                        <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center shrink-0 text-sm">1</span>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Pick a Route</h4>
                                            <p className="text-slate-400 text-xs">Choose a route you know intimately (e.g. your morning routine).</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                        <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center shrink-0 text-sm">2</span>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Place the Items</h4>
                                            <p className="text-slate-400 text-xs">Walk the route in your mind, placing one item at each distinct "station" along the way.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 22: Method 3 Practice ── */}
                    {step === 22 && (
                        <Slide key="m3-practice" onNext={nextStep} onBack={prevStep} customButtonText="Got It — Test Me" fullWidth>
                            <div className="space-y-6 max-w-6xl mx-auto w-full">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-white mb-2">Example: Your Morning Routine</h2>
                                    <p className="text-amber-400 text-sm font-medium">Place the final 10 items natively in your house.</p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 justify-center mb-2 max-w-3xl mx-auto">
                                    {FIRST_30.slice(20, 30).map(w => (
                                        <span key={w} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">{w}</span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto p-4 bg-slate-900/30 rounded-3xl border border-slate-800/50 custom-scrollbar">
                                    {[
                                        ["Light", "Your alarm clock has a light bulb on it. It goes off and you smash the bulb turning it off, cutting your hand on the glass."],
                                        ["Ball", "As you step out of bed, you land on a tennis ball and fall over."],
                                        ["Shed", "Your bedroom door has been replaced by a tiny shed you have to crawl through."],
                                        ["Hand", "The bathroom tap is replaced by a giant helping hand."],
                                        ["Door", "A huge revolving door blocks the bathroom exit."],
                                        ["Banana", "You open the fridge. It's packed entirely with bananas."],
                                        ["Briefcase", "Your kettle has a tiny briefcase chained to its handle."],
                                        ["Rock", "Your front door is blocked by a enormous boulder."],
                                        ["Lightning", "Lightning strikes the path as you step outside."],
                                        ["Grass", "Your car is covered entirely in thick green grass."],
                                    ].map(([word, desc], i) => (
                                        <div key={word} className="p-4 bg-slate-900 border border-amber-500/20 rounded-2xl flex flex-col gap-2 relative shadow-lg hover:border-amber-500/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center">#{i+1}</span>
                                                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-xs font-bold rounded shadow-[0_0_10px_rgba(245,158,11,0.5)]">{word}</span>
                                            </div>
                                            <p className="text-slate-300 text-xs leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 23: Method 3 Test ── */}
                    {step === 23 && (
                        <MethodTestStep
                            key="m3-test"
                            wordList={FIRST_30.slice(20, 30)}
                            methodName="The House Method"
                            attempts={(methodAttempts["The House Method"] || 0) + 1}
                            onRetry={() => { recordAttempt("The House Method"); prevStep(); }}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {/* ── STEP 24: Retest Summary & Transition ── */}
                    {step === 24 && (
                        <Slide key="retest-intro" title="Step 2: Test Your New Memory" onNext={nextStep} onBack={prevStep} customButtonText="I'm Ready — Show Me the Words">
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">You now have three powerful techniques. Time to put them to work.</p>
                                <div className="space-y-4">
                                    <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        <p className="font-bold text-white mb-2">Here's what to do:</p>
                                        <ul className="space-y-2 text-slate-300 text-sm">
                                            <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">→</span>You'll see 30 new words.</li>
                                            <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">→</span>Use the Story method for the first 10.</li>
                                            <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">→</span>Use Linking & Association for the next 10.</li>
                                            <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">→</span>Use the House Method for the last 10.</li>
                                        </ul>
                                    </div>
                                    <p className="text-slate-400 text-sm text-center">You have 10 minutes. Apply the techniques as you go.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 25: Retest Study (10 min + 30 new words) ── */}
                    {step === 25 && (
                        <TimerStudyStep
                            key="study-2"
                            words={SECOND_30}
                            onComplete={nextStep}
                            heading="Step 2: Memorise Using Your New Techniques"
                            subheading="Use the Story, Linking and House methods as you work through these 30 words."
                        />
                    )}

                    {/* ── STEP 26: Retest Interference ── */}
                    {step === 26 && (
                        <InterferenceStep
                            key="interfere-retest"
                            onComplete={nextStep}
                        />
                    )}


                    {/* ── STEP 27: Retest Word Input ── */}
                    {step === 27 && (
                        <WordInputStep
                            key="input-2"
                            label="What do you remember?"
                            onSubmit={handleRetestSubmit}
                        />
                    )}

                    {/* ── STEP 28: Retest Results ── */}
                    {step === 28 && retestResult && (
                        <ScoreStep
                            key="score-2"
                            matched={retestResult.matched}
                            missed={retestResult.missed}
                            wordList={SECOND_30}
                            isBaseline={false}
                            onNext={nextStep}
                            buttonText="View My Improvement →"
                        />
                    )}

                    {/* ── STEP 29: Improvement Highlight ── */}
                    {step === 29 && baselineResult && retestResult && (() => {
                        const before = baselineResult.matched.length;
                        const after = retestResult.matched.length;
                        const diff = after - before;
                        const pctImprovement = before > 0 ? Math.round((diff / before) * 100) : null;
                        return (
                            <motion.div
                                key="highlight"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full space-y-6 text-center max-w-2xl mx-auto overflow-y-auto flex-1 pr-1"
                            >
                                <h2 className="text-3xl font-bold text-white mb-2">Notice the Difference?</h2>
                                <p className="text-slate-400 mb-8">Remember, these were 30 completely new words.</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                        <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Before</p>
                                        <p className="text-4xl text-white font-mono font-bold">{before}<span className="text-slate-600 text-xl">/30</span></p>
                                    </div>
                                    <div className="p-5 bg-slate-900/50 border border-violet-500/40 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                                        <p className="text-violet-400 uppercase tracking-widest text-xs font-bold mb-2">After</p>
                                        <p className="text-4xl text-white font-mono font-bold">{after}<span className="text-slate-600 text-xl">/30</span></p>
                                    </div>
                                </div>

                                <div className="p-6 bg-violet-950/20 border border-violet-500/30 rounded-2xl space-y-2 my-6">
                                    {diff > 0 ? (
                                        <>
                                            <p className="text-5xl font-black text-violet-300 font-mono">+{diff} words</p>
                                            {pctImprovement !== null && (
                                                <p className="text-slate-400 text-lg">a <strong className="text-white">{pctImprovement}% improvement</strong> in a single session</p>
                                            )}
                                        </>
                                    ) : after > 0 ? (
                                        <p className="text-slate-300 text-lg">You recalled <strong className="text-white">{after} words</strong> using your new techniques.</p>
                                    ) : (
                                        <p className="text-slate-300">The techniques take a little practice. Even one more word is proof they're working.</p>
                                    )}
                                </div>

                                <div className="mt-12 text-center pt-8 border-t border-slate-800/50">
                                    <p className="text-xl text-slate-300 mb-6 font-bold">Now for the ultimate test.</p>
                                    <button onClick={nextStep} className="w-full py-4 bg-violet-600 border border-violet-500 text-white font-bold rounded-full text-lg hover:bg-violet-500 transition-all flex items-center justify-center gap-2">
                                        Take the 60-Word Challenge →
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })()}

                    {/* ── STEP 30: 60-Word Input ── */}
                    {step === 30 && (
                        <WordInputStep
                            key="input-60"
                            label="The 60-Word Challenge"
                            onSubmit={(input) => {
                                setFinal60Result(scoreWords(input, [...FIRST_30, ...SECOND_30]));
                                nextStep();
                            }}
                        />
                    )}

                    {/* ── STEP 31: 60-Word Score ── */}
                    {step === 31 && final60Result && (
                        <ScoreStep
                            key="score-final-60"
                            matched={final60Result.matched}
                            missed={final60Result.missed}
                            wordList={[...FIRST_30, ...SECOND_30]}
                            isBaseline={false}
                            onNext={nextStep}
                            buttonText="View Final Review →"
                        />
                    )}

                    {/* ── STEP 32: Final Reveal & CTA ── */}
                    {step === 32 && final60Result && (
                        <motion.div
                            key="final-cta"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full space-y-6 overflow-y-auto flex-1 pr-1"
                        >
                            <div className="text-center space-y-3">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-medium">
                                    <Star className="w-4 h-4" /> Final Review
                                </div>
                                <h2 className="text-4xl font-bold text-white">All 60 Words</h2>
                                <p className="text-slate-400 max-w-xl mx-auto">Everything you've worked with today — all 60 words in one place. Green means you hit it.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 pt-4">
                                {/* First 30 */}
                                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">First 30 — Story / Linking / House</p>
                                    </div>
                                    <WordGrid words={FIRST_30} highlighted={final60Result.matched} />
                                </div>

                                {/* Second 30 */}
                                <div className="p-6 bg-slate-900/40 border border-violet-500/10 rounded-2xl space-y-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Second 30 — Your New Techniques</p>
                                    <WordGrid words={SECOND_30} highlighted={final60Result.matched} />
                                </div>
                            </div>

                            {/* Applies everywhere */}
                            <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl text-left space-y-3">
                                <p className="text-white font-bold text-sm">What you just learned applies everywhere:</p>
                                <ul className="space-y-1.5">
                                    {[
                                        "Names and faces — use the linking technique",
                                        "Vocabulary in a new language — build vivid image-pairs",
                                        "Exam facts and dates — construct a memory palace for each topic",
                                        "Speeches and presentations — use a familiar route as your script",
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                                            <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3 pb-4 pt-4">
                                <button
                                    onClick={handleComplete}
                                    className="w-full py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 hover:scale-105"
                                >
                                    {dashboardText} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="fixed bottom-0 left-0 w-full h-1.5 bg-slate-900 z-50">
                <motion.div
                    className="h-full bg-violet-500"
                    animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.4 }}
                />
            </div>
        </div>
    );
}
