"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, CheckCircle, ArrowRight, Sparkles, Eye, Layers, Home, BookOpen, Star } from "lucide-react";
import Link from "next/link";
import { Slide } from "@/components/onboarding/ConceptSlides";

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
    const [step, setStep] = useState(0);
    const [baselineResult, setBaselineResult] = useState<{ matched: string[]; missed: string[] } | null>(null);
    const [retestResult, setRetestResult] = useState<{ matched: string[]; missed: string[] } | null>(null);
    const [final60Result, setFinal60Result] = useState<{ matched: string[]; missed: string[] } | null>(null);
    const [methodAttempts, setMethodAttempts] = useState<Record<string, number>>({});

    const recordAttempt = useCallback((m: string) => setMethodAttempts(p => ({ ...p, [m]: (p[m] || 0) + 1 })), []);
    const nextStep = useCallback(() => setStep(s => s + 1), []);
    const prevStep = useCallback(() => setStep(s => Math.max(0, s - 1)), []);
    const nextNextStep = useCallback(() => setStep(s => s + 2), []);
    const prevPrevStep = useCallback(() => setStep(s => Math.max(0, s - 2)), []);

    const handleBaselineSubmit = (input: string) => {
        setBaselineResult(scoreWords(input, FIRST_30));
        nextStep();
    };

    const handleRetestSubmit = (input: string) => {
        setRetestResult(scoreWords(input, SECOND_30));
        nextStep();
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col items-center p-6 bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30">
            <div className="max-w-3xl w-full h-[calc(100vh-3rem)] flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* ── STEP 0: Session Intro ── */}
                    {step === 0 && (
                        <Slide key="intro" title="The Rogue Memory Session" icon={<Brain className="w-12 h-12 text-violet-400" />} onNext={nextStep} customButtonText="Let's Begin">
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-xl text-slate-200">This session has three parts:</p>
                                <div className="space-y-4">
                                    {[
                                        { n: "1", c: "rose", t: "Measure Your Current Memory", b: "10 minutes to memorise 30 words using whatever method you normally use." },
                                        { n: "2", c: "violet", t: "Learn the Techniques", b: "We teach you three powerful memory methods — with stories, images, and a personal memory palace." },
                                        { n: "3", c: "emerald", t: "Measure Your New Memory", b: "10 minutes with a fresh 30 words using your new techniques. Then we reveal all 60." },
                                    ].map(({ n, c, t, b }) => (
                                        <div key={n} className={`flex gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-xl`}>
                                            <span className={`w-8 h-8 rounded-full bg-${c}-500/10 border border-${c}-500/30 text-${c}-400 font-bold text-sm flex items-center justify-center shrink-0`}>{n}</span>
                                            <div>
                                                <p className="font-bold text-white text-sm">{t}</p>
                                                <p className="text-slate-400 text-sm mt-1">{b}</p>
                                            </div>
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
                        <Slide key="obs-party" title="Sound Familiar?" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                    <p className="text-lg italic text-slate-200 leading-relaxed">&ldquo;At a party you want to join in telling a joke, but can&apos;t remember any — until someone says something that reminds you of one?&rdquo;</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-white font-bold text-lg">Memory works by association.</p>
                                    <p className="text-slate-300 leading-relaxed">The joke was never lost — it was <strong className="text-white">stored</strong>, waiting for the right trigger. One thought leads to another, like links in a chain.</p>
                                    <p className="text-slate-300 leading-relaxed">Connect things correctly and one cue unlocks a hundred memories. <strong className="text-violet-300">This is exactly what we will train you to do.</strong></p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 6: Why Songs Stick ── */}
                    {step === 6 && (
                        <Slide key="obs-song" title="Why Songs Stick" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                    <p className="text-lg italic text-slate-200 leading-relaxed">&ldquo;You know all the words to a song, but fail to remember a simple shopping list?&rdquo;</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-white font-bold text-lg">Rhythm and emotion encode memory.</p>
                                    <p className="text-slate-300 leading-relaxed">A song gives words <strong className="text-white">rhythm, melody, and meaning</strong>. A shopping list gives them nothing.</p>
                                    <p className="text-slate-300 leading-relaxed">When we attach emotion or story to information, we don&apos;t just remember it — we remember it <em>effortlessly</em>.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 7: A Face vs a Name ── */}
                    {step === 7 && (
                        <Slide key="obs-face" title="A Face vs a Name" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                    <p className="text-lg italic text-slate-200 leading-relaxed">&ldquo;You recognise someone&apos;s face, but can&apos;t recall their name?&rdquo;</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-white font-bold text-lg">We remember pictures better than words.</p>
                                    <p className="text-slate-300 leading-relaxed">A face is packed with <strong className="text-white">detail, texture, and expression</strong>. A name is an arbitrary sound with no inherent meaning.</p>
                                    <p className="text-slate-300 leading-relaxed">The solution? Turn abstract words into vivid pictures. That is exactly what you will learn today.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 8: And Three More ── */}
                    {step === 8 && (
                        <Slide key="obs-more" title="And Three More..." onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-3 max-w-2xl mx-auto text-left">
                                {[
                                    { obs: "Something is on the tip of your tongue — all you need is the first word to set you off?", insight: "All memories are stored. Retrieval is the skill." },
                                    { obs: "Your strongest childhood memories have a strong emotional attachment?", insight: "Emotion amplifies memory. Use it deliberately." },
                                    { obs: "Old friends remind you of things you had not thought about for years — and the memories flood back?", insight: "Context and association unlock what we thought was lost." },
                                ].map(({ obs, insight }, i) => (
                                    <div key={i} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-1.5">
                                        <p className="text-slate-300 text-sm italic leading-relaxed">&ldquo;{obs}&rdquo;</p>
                                        <p className="text-indigo-300 text-xs font-bold">→ {insight}</p>
                                    </div>
                                ))}
                                <div className="p-4 bg-violet-950/20 border border-violet-500/30 rounded-xl text-center">
                                    <p className="text-white font-bold">You have a fantastic memory.</p>
                                    <p className="text-slate-400 text-sm mt-1">It was just never properly taught to you. Until now.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 9: What Your Memory Is Telling You ── */}
                    {step === 9 && (
                        <Slide key="triggers" title="What Your Memory Is Telling You" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-3 max-w-2xl mx-auto text-left">
                                {[
                                    { icon: "🔗", bold: "Triggers", rest: "One word can unlock a memory that would not have come to mind otherwise" },
                                    { icon: "🎵", bold: "Rhythm", rest: "Music and rhyme dramatically improve retention" },
                                    { icon: "❤️", bold: "Emotion", rest: "Strong feelings — laughter, disgust, surprise — make memory stick" },
                                    { icon: "👁️", bold: "Images", rest: "Something seen is far easier to remember than a word or name" },
                                ].map(({ icon, bold, rest }) => (
                                    <div key={bold} className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                                        <span className="text-2xl shrink-0">{icon}</span>
                                        <p className="text-slate-300 text-sm"><strong className="text-white">{bold}:</strong> {rest}</p>
                                    </div>
                                ))}
                                <div className="p-4 bg-violet-950/20 border border-violet-500/30 rounded-xl text-center">
                                    <p className="text-lg font-bold text-white">We Remember Best In Pictures.</p>
                                    <p className="text-slate-400 text-sm mt-1">The techniques you are about to learn are built on this principle.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 10: Before You Start ── */}
                    {step === 10 && (
                        <Slide key="before-you-start" title="Before You Start" icon={<BookOpen className="w-12 h-12 text-violet-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-3 max-w-2xl mx-auto text-left">
                                <p className="text-slate-400 text-sm">Four things that improve memory before you even begin:</p>
                                {[
                                    { key: "Observation", val: "We must first observe before we can remember — pay attention" },
                                    { key: "Interest / Value", val: "If we don't associate interest or value to the information, we won't create any need to remember it" },
                                    { key: "Overview", val: "Get an overall picture first — like seeing the jigsaw puzzle picture before putting the pieces together" },
                                    { key: "Relax", val: "Increase your ability to absorb information by being relaxed" },
                                ].map(({ key, val }) => (
                                    <div key={key} className="flex gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                                        <span className="text-violet-400 font-bold text-xs w-28 shrink-0 pt-0.5">{key}</span>
                                        <p className="text-slate-300 text-sm leading-relaxed">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 11: The Secrets to Memory (1/4) ── */}
                    {step === 11 && (
                        <Slide key="secrets-1" title="The Secrets to Memory" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-xl text-white font-bold text-center">Secret #1: Use Your Senses</p>
                                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                                    <span className="text-6xl mb-4 block">👁️👂👃</span>
                                    <p className="text-slate-300 text-lg leading-relaxed">By combining more than one of our senses, we will observe and remember more. Don't just picture what something looks like — imagine the sound, the smell, and the physical feel of it.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 12: The Secrets to Memory (2/4) ── */}
                    {step === 12 && (
                        <Slide key="secrets-2" title="The Secrets to Memory" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto w-full text-left">
                                <div className="text-center space-y-2">
                                    <p className="text-xl text-white font-bold">Secret #2: Striking Image</p>
                                    <p className="text-slate-400 text-sm">The brain deletes the mundane but remembers the extraordinary. Apply these to every image you create:</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: "🏃", label: "MOVEMENT", desc: "Make your mental image active and dynamic, rather than just a static photograph." },
                                        { icon: "❤️", label: "EMOTION", desc: "Attach strong feelings like laughter, surprise, or disgust to make the image stick." },
                                        { icon: "🎨", label: "COLOURS", desc: "Paint the image with vivid, highly saturated, and unusual colours to make it pop." },
                                        { icon: "🔭", label: "EXAGGERATE", desc: "Blow things completely out of proportion, whether enormous or impossibly tiny." },
                                        { icon: "👃", label: "SENSES", desc: "Involve what you can hear, smell, taste, and touch, rather than relying only on sight." },
                                        { icon: "🔍", label: "DETAILS", desc: "Focus in on the intricate textures, weight, and temperature of the objects." },
                                    ].map(({ icon, label, desc }) => (
                                        <div key={label} className="flex items-start gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                                            <span className="text-xl shrink-0">{icon}</span>
                                            <div>
                                                <p className="font-black text-white text-xs">{label}</p>
                                                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 13: The Secrets to Memory (3/4) ── */}
                    {step === 13 && (
                        <Slide key="secrets-3" title="The Secrets to Memory" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-xl text-white font-bold text-center">Secret #3: Make It Ridiculous</p>
                                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                                    <span className="text-6xl mb-4 block">🤪🐘</span>
                                    <p className="text-slate-300 text-lg leading-relaxed">Logic is the enemy of memory. Make your image out of proportion, completely ridiculous, and totally illogical — and you will be sure to remember it.</p>
                                    <div className="mt-4 p-4 bg-slate-950/50 rounded-xl text-left border border-slate-800/50">
                                        <p className="text-slate-400 text-sm">
                                            <strong className="text-slate-300">Example:</strong> If you need to remember a water bottle, don't picture a normal bottle on a desk. Picture a massive, 10-foot-tall talking bottle wearing sunglasses and spraying grape juice everywhere while laughing hysterically.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 14: The Secrets to Memory (4/4) ── */}
                    {step === 14 && (
                        <Slide key="secrets-4" title="The Secrets to Memory" onNext={nextStep} onBack={prevStep} customButtonText="Ready to Apply These?">
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-center text-slate-400 mb-2">And three structural secrets for long-term retention:</p>
                                <div className="space-y-3">
                                    <div className="flex gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
                                        <span className="text-emerald-400 font-bold text-sm w-32 shrink-0 pt-0.5">Take Breaks</span>
                                        <p className="text-slate-300 text-sm leading-relaxed">You remember things best at the beginning and end of a session. Create more "beginnings" and "ends" by taking regular breaks.</p>
                                    </div>
                                    <div className="flex gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
                                        <span className="text-emerald-400 font-bold text-sm w-32 shrink-0 pt-0.5">Categorise</span>
                                        <p className="text-slate-300 text-sm leading-relaxed">By remembering groups and grouping similar items together, you cut down on the total number of individual items to recall.</p>
                                    </div>
                                    <div className="flex gap-4 p-5 bg-indigo-950/30 border border-indigo-500/30 rounded-xl">
                                        <span className="text-indigo-400 font-bold text-sm w-32 shrink-0 pt-0.5">After Learning</span>
                                        <p className="text-slate-300 text-sm leading-relaxed">Reviewing the information at regular intervals will increase memory retention by up to 500%.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}


                    {/* ── STEP 15: Method 1 Intro ── */}
                    {step === 15 && (
                        <Slide key="m1-intro" title="Method 1: The Story" onNext={nextStep} onBack={prevStep} customButtonText="See it in Practice">
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <p className="text-xl text-white font-bold leading-relaxed">The easiest way to remember a random list of words is to link them together into a vivid, ridiculous story.</p>
                                <div className="space-y-4">
                                    <p className="text-slate-300">Our brains evolved to remember narratives, not bullet points. By turning a list into a story, each word acts as a natural trigger for the next.</p>
                                    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                                        <p className="text-white font-bold text-sm">How to do it:</p>
                                        <ul className="space-y-2 text-slate-300 text-sm">
                                            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">1.</span> Picture the first word vividly.</li>
                                            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">2.</span> Have it physically interact with the second word.</li>
                                            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">3.</span> Use the Memory Secrets (Movement, Emotion, Senses) to make the interaction memorable.</li>
                                            <li className="flex gap-2"><span className="text-indigo-400 shrink-0">4.</span> Continue until all words feed into one continuous narrative.</li>
                                        </ul>
                                    </div>
                                    <p className="text-slate-400 text-sm text-center pt-2">Let's try it with the first 10 words from your test.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 16: Method 1 Practice ── */}
                    {step === 16 && (
                        <Slide key="m1-practice" title="The Story: In Practice" onNext={nextStep} onBack={prevStep} customButtonText="Got It — Test Me">
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <div className="flex flex-wrap gap-2">
                                    {FIRST_30.slice(0, 10).map(w => (
                                        <span key={w} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium">{w}</span>
                                    ))}
                                </div>
                                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 leading-relaxed text-sm space-y-3">
                                    <p>Imagine telling your child a story when he pushes you into your <strong className="text-white">Pool</strong>. At first he thinks it's hilarious, but then he picks a <strong className="text-white">Flower</strong> and gives it to you to say sorry — how could you stay mad? You dry off and jump in your <strong className="text-white">Car</strong>, closely followed by your <strong className="text-white">Dog</strong>, who leaps right through the open <strong className="text-white">Window</strong>.</p>
                                    <p>As you drive off, a <strong className="text-white">Bird</strong> smashes into your windscreen. You pull over and notice the dazed bird has a tiny <strong className="text-white">Microphone</strong> strapped to its head. As it comes around, it reaches under its wing and pulls out a <strong className="text-white">Book</strong>, furiously pointing at a page as if you've broken a law written inside. Then it pulls out a <strong className="text-white">Bottle</strong>, takes a long swig — it was drink-flying! — gets out a camera, and takes a <strong className="text-white">Picture</strong> of you before waddling away.</p>
                                </div>
                                <p className="text-indigo-300 text-sm font-bold text-center">Picture this scene as vividly as you can before continuing.</p>
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
                        <Slide key="m2-intro" title="Method 2: Linking & Association" onNext={nextStep} onBack={prevStep} customButtonText="See it in Practice">
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <p className="text-xl text-white font-bold leading-relaxed">Instead of a continuous story, just link pairs of words together in a dramatic transformation.</p>
                                <div className="space-y-4">
                                    <p className="text-slate-300">This is faster than The Story method. You only ever need to think about two words at a time: the one you are on, and what it turns into next.</p>
                                    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                                        <p className="text-white font-bold text-sm">How to do it:</p>
                                        <ul className="space-y-2 text-slate-300 text-sm">
                                            <li className="flex gap-2"><span className="text-emerald-400 shrink-0">1.</span> Take Word A and Word B.</li>
                                            <li className="flex gap-2"><span className="text-emerald-400 shrink-0">2.</span> Make them interact in a bizarre, exaggerated way.</li>
                                            <li className="flex gap-2"><span className="text-emerald-400 shrink-0">3.</span> Now forget Word A. Take Word B and make it interact with Word C.</li>
                                            <li className="flex gap-2"><span className="text-emerald-400 shrink-0">4.</span> Let each object physically change into, smash into, or combine with the next.</li>
                                        </ul>
                                    </div>
                                    <p className="text-slate-400 text-sm text-center pt-2">Let's try it with the next 10 test words.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 19: Method 2 Practice ── */}
                    {step === 19 && (
                        <Slide key="m2-practice" title="Linking: In Practice" onNext={nextStep} onBack={prevStep} customButtonText="Got It — Test Me">
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <div className="flex flex-wrap gap-2">
                                    {FIRST_30.slice(10, 20).map(w => (
                                        <span key={w} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium">{w}</span>
                                    ))}
                                </div>
                                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 leading-relaxed text-sm space-y-3">
                                    <p>Imagine a giant chain-link fence like a moat surrounding a <strong className="text-white">Farm</strong>. Then a huge shiny silver <strong className="text-white">Bullet</strong> comes screaming through, demolishing everything. The bullet transforms into a coat stand with a leather <strong className="text-white">Jacket</strong> hanging from it. The jacket begins billowing with <strong className="text-white">Smoke</strong> — but without catching fire.</p>
                                    <p>The smoke curls out of a <strong className="text-white">Helmet</strong> and turns into a towering scoop of <strong className="text-white">Ice Cream</strong> sitting right inside the helmet. Now picture a bicycle wearing that helmet, and on the side of the helmet is a giant tick-tocking <strong className="text-white">Clock</strong>. The clock grows enormous and spans the entire Sydney Harbour <strong className="text-white">Bridge</strong>. The bridge is draped from end to end in white <strong className="text-white">Lace</strong>, fluttering in the breeze — and the lace has been intricately sculpted into the unmistakable shape of a human <strong className="text-white">Ear</strong>.</p>
                                </div>
                                <p className="text-emerald-300 text-sm font-bold text-center">Visualise the transformations before moving on.</p>
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
                        <Slide key="m3-intro" title="Method 3: The House Method" onNext={nextStep} onBack={prevStep} customButtonText="See it in Practice">
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <p className="text-xl text-white font-bold leading-relaxed">Also known as a Memory Palace. Use a route you already know perfectly to store new information.</p>
                                <div className="space-y-4">
                                    <p className="text-slate-300">You already have perfect memory of thousands of locations: your house, your commute, your local supermarket. You can use these familiar locations as "folders" to store new information.</p>
                                    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                                        <p className="text-white font-bold text-sm">How to do it:</p>
                                        <ul className="space-y-2 text-slate-300 text-sm">
                                            <li className="flex gap-2"><span className="text-amber-400 shrink-0">1.</span> Think of a route you know intimately (e.g. your morning routine).</li>
                                            <li className="flex gap-2"><span className="text-amber-400 shrink-0">2.</span> Walk the route in your mind, stopping at distinct "stations".</li>
                                            <li className="flex gap-2"><span className="text-amber-400 shrink-0">3.</span> Take the item you want to remember and place it at that station.</li>
                                            <li className="flex gap-2"><span className="text-amber-400 shrink-0">4.</span> Make the item interact with the station in a striking way.</li>
                                        </ul>
                                    </div>
                                    <p className="text-slate-400 text-sm text-center pt-2">Let's try it with the final 10 test words.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* ── STEP 22: Method 3 Practice ── */}
                    {step === 22 && (
                        <Slide key="m3-practice" title="The House Method: In Practice" onNext={nextStep} onBack={prevStep} customButtonText="Got It — Test Me">
                            <div className="space-y-5 max-w-2xl mx-auto text-left">
                                <div className="flex flex-wrap gap-2">
                                    {FIRST_30.slice(20, 30).map(w => (
                                        <span key={w} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium">{w}</span>
                                    ))}
                                </div>
                                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-300 text-sm space-y-2 max-h-48 overflow-y-auto pr-2">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 sticky top-0 bg-slate-900/90 py-1">Example: Morning Routine</p>
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
                                    ].map(([word, desc]) => (
                                        <div key={word} className="flex gap-3">
                                            <span className="text-amber-400 font-bold text-xs w-20 shrink-0 pt-0.5">{word}</span>
                                            <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-amber-300 text-sm font-bold text-center">Place these items natively in YOUR house.</p>
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
                                <Link
                                    href="/dashboard"
                                    className="w-full py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 hover:scale-105"
                                >
                                    Return to Dashboard <Home className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/blog"
                                    className="w-full py-3 bg-slate-900 border border-slate-700 hover:border-violet-500/40 text-slate-300 font-medium rounded-full text-base transition-all flex items-center justify-center gap-2"
                                >
                                    Explore the Full Learning Library <ArrowRight className="w-5 h-5" />
                                </Link>
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
