"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Brain, Gauge, Unlock, Volume2, RotateCcw, BrainCircuit, Zap, Clock, TrendingUp, Search, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { RogueSessionEngine } from "@/components/engines/RogueSessionEngine";
import { Slide, IntroductionToFs, TrianglesExercise, PeripheralVisionSequence, NotEveryWordSlide, PeripheralVisionPrep, PeripheralVisionPassive, PeripheralVisionComparison } from "@/components/onboarding/ConceptSlides";

import ReadingTestEngine from "@/components/engines/ReadingTestEngine";

// --- Constants ---

const BASELINE_TEXT = `Speed reading is often misunderstood as a trick or a way to skim text without truly understanding it. However, the true goal of speed reading is to improve the efficiency of the connection between your eyes and your brain. Most people read sequentially, processing one word after another, subvocalizing each one as if speaking aloud. This limits reading speed to speaking speed, which is typically around 150 to 200 words per minute. By expanding your peripheral vision and reducing the fixation time on each word, you can capture phrases or entire lines at a glance. This visual processing is significantly faster than auditory processing, unlocking your brain's natural ability to absorb information rapidly.`;

const BASELINE_QUESTIONS = [
    { id: 1, text: "What limits reading speed for most people?", options: ["Lack of focus", "Subvocalization (speaking words in your head)", "Small font size", "Poor lighting"], correctIndex: 1 },
    { id: 2, text: "What is the typical reading speed mentioned?", options: ["50-100 wpm", "150-200 wpm", "300-400 wpm", "600+ wpm"], correctIndex: 1 },
    { id: 3, text: "How does speed reading improve efficiency?", options: ["By skipping unimportant words", "By using a finger guide", "By using visual processing instead of auditory", "By reading aloud faster"], correctIndex: 2 }
];

const RETEST_TEXT = `The concept of neuroplasticity suggests that the brain is not a static organ, but rather a dynamic web of connections that can be rewired continuously throughout life. For decades, scientists believed that the brain stopped developing after childhood. We now know that this is fundamentally incorrect. In fact, focused attention and deliberate practice can physically alter the structure of your neural pathways. When you push your reading speed beyond comfortable limits, you are essentially forcing your brain to recruit new neurons to handle the increased data load. This adaptation mechanism is what allows speed readers to process information at rates that seem impossible to the untrained eye. It is not magic; it is simply biological adaptation to environmental demand.`;

const RETEST_QUESTIONS = [
    { id: 1, text: "What is neuroplasticity?", options: ["The brain's ability to rewire itself", "A type of brain surgery", "The hardening of neural pathways", "Static brain development"], correctIndex: 0 },
    { id: 2, text: "What triggers the brain to recruit new neurons?", options: ["Relaxation", "Pushing beyond comfortable limits", "Sleep", "Reading slowly"], correctIndex: 1 },
    { id: 3, text: "Speed reading is described as:", options: ["Magic", "Biological adaptation", "A visual trick", "Impossible"], correctIndex: 1 }
];


// --- Rogue Session Page ---
export default function RogueSessionPage() {
    const [step, setStep] = useState(0);

    // Baseline & Retest State
    const [baselineStats, setBaselineStats] = useState<{ wpm: number; comprehension: number } | null>(null);
    const [finalStats, setFinalStats] = useState<{ wpm: number; comprehension: number } | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false); // Track if $5 paid

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const handleBaselineComplete = (results: { wpm: number; comprehension: number }) => {
        setBaselineStats(results);
        nextStep();
    };

    const handleRetestComplete = (results: { wpm: number; comprehension: number }) => {
        setFinalStats(results);
        nextStep();
    };

    const handleUnlock = () => {
        // Mock payment processing
        setIsUnlocked(true);
        nextStep();
    }

    // --- Steps Configuration ---
    // 0: Baseline Intro
    // 1: Baseline Test
    // 2: Baseline Results

    // THEORY (Matched to ConceptWizard)
    // 3: Paradox (Supercomputer)
    // 4: Change Gears
    // 5: Unlock Potential 

    // BARRIER 1: SUBVOCALIZATION
    // 6: Vocalization (CAT)
    // 7: Vocalization Stats 
    // 8: Fs Exercise

    // BARRIER 2: REGRESSION
    // 9: Triangles

    // BARRIER 3: FIXATION
    // 10: Not Every Word

    // BARRIER 4: TUNNEL VISION (PERIPHERAL DEMO)
    // 11: Peripheral Vision Sequence (Replaces Wiggle/Spotlight/Race)

    // SOLUTION
    // 12: Re-reading (Was 14)
    // 13: Perception of Speed (Was 15)
    // 14: Change Pattern (Was 16)

    // PAYWALL
    // 15: Paywall (Was 17)

    // DRILL
    // 16: Drill Intro (Was 18)
    // 17: Flash Drill (Was 19)

    // RETEST
    // 18: Retest Intro (Was 20)
    // 19: Retest (Was 21)
    // 20: Results (Was 22)

    const totalSteps = 26;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">

            <div className="max-w-3xl w-full">
                <AnimatePresence mode="wait">

                    {/* --- BASELINE SECTION --- */}
                    {step === 0 && (
                        <Slide key="lets_do_this" title="Step 1: The Baseline" icon={<Clock className="w-12 h-12 text-indigo-400" />} onNext={nextStep} customButtonText="Start Baseline">
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">Before we begin the training, we need to know exactly where you are starting from.</p>
                                <p className="text-slate-400">Read the next text at your <strong>normal, comfortable pace</strong>. Do not rush. We will test your comprehension.</p>
                            </div>
                        </Slide>
                    )}

                    {step === 1 && (
                        <ReadingTest onComplete={handleBaselineComplete} isRetest={false} />
                    )}

                    {step === 2 && baselineStats && (
                        <Slide key="baseline_result" title="Baseline Established" icon={<CheckCircle className="w-12 h-12 text-emerald-400" />} onNext={nextStep} customButtonText="Analyze My Reading">
                            <div className="space-y-8 max-w-xl mx-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
                                        <p className="text-4xl font-bold text-white font-mono">{baselineStats.wpm}</p>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mt-2">WPM</p>
                                    </div>
                                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
                                        <p className="text-4xl font-bold text-emerald-400 font-mono">{baselineStats.comprehension}%</p>
                                        <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mt-2">Recall</p>
                                    </div>
                                </div>
                                <p className="text-lg text-slate-300">
                                    This is your starting point. Most people read between 150-250 WPM. <br />
                                    <span className="text-indigo-400 font-bold">Now let's see why you are stuck at this speed.</span>
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* --- THEORY SECTION --- */}

                    {step === 3 && (
                        <Slide key="intro_primary_school" title="The Supercomputer Paradox" icon={<Brain className="w-12 h-12 text-indigo-400" />} onNext={nextStep}>
                            <p className="text-xl text-slate-300">You have the most powerful supercomputer in the known universe sitting between your ears.</p>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 my-4 shadow-2xl">
                                <p className="text-2xl font-bold text-white mb-3">"But you are running it on reading software installed when you were between six and twelve years old."</p>
                                <p className="text-lg text-slate-400 italic">You wouldn't drive a Ferrari in first gear. So why do you read like you're still in primary school?</p>
                            </div>
                            <p className="font-bold text-emerald-400 text-xl mt-2">It's time for an upgrade.</p>
                        </Slide>
                    )}

                    {step === 4 && (
                        <Slide key="intro_change_gears" title="Trying Harder Doesn't Work" icon={<Gauge className="w-12 h-12 text-rose-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 my-4">
                                <p className="text-xl italic text-slate-300">"If you try to read faster using your current method, you won't understand what you are reading."</p>
                            </div>
                            <p className="text-lg text-slate-300">It's like trying to drive 100mph in first gear. The engine screams, but you don't go faster.</p>
                            <p className="text-xl font-bold text-white mt-4">We need to <span className="text-emerald-400">Change Gears</span>.</p>
                        </Slide>
                    )}

                    {step === 5 && (
                        <Slide key="intro_unlock" title="The Abilities You Already Have" icon={<Unlock className="w-12 h-12 text-amber-400" />} onNext={nextStep} onBack={prevStep}>
                            <p className="text-xl text-slate-300">
                                Reading faster is more about learning to use the dormant abilities you already have...
                            </p>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 my-4">
                                <p className="text-2xl font-bold text-white">...the abilities that you are about to unlock.</p>
                            </div>
                        </Slide>
                    )}

                    {step === 6 && (
                        <Slide key="vocalization_cat" title="We Learned By 'Sounding It Out'" icon={<Volume2 className="w-12 h-12 text-rose-400" />} onNext={nextStep} onBack={prevStep}>
                            <p>We start by sounding out words: C - A - T.</p>
                            <div className="flex items-center justify-center gap-4 my-8 text-4xl font-mono font-bold">
                                <span>C</span><span className="text-slate-600">-</span><span>A</span><span className="text-slate-600">-</span><span>T</span>
                                <ArrowRight className="text-slate-600" />
                                <span className="text-indigo-400">CAT</span>
                            </div>
                            <p>This creates a habit of "subvocalization"—an inner voice that reads everything aloud in your head.</p>
                        </Slide>
                    )}

                    {step === 7 && (
                        <Slide key="vocalization_stats" title="The Speed Limit of Your Voice" icon={<Volume2 className="w-12 h-12 text-rose-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-4 text-2xl font-light text-center">
                                <div className="p-5 bg-slate-900 rounded-xl border border-slate-800">
                                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Speaking Speed</p>
                                    <p>We can <strong className="font-bold text-rose-400">HEAR</strong> about <strong className="font-bold text-rose-400">150</strong> words per minute.</p>
                                </div>
                                <div className="p-5 bg-slate-900 rounded-xl border border-slate-800">
                                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Thinking Speed</p>
                                    <p>We can <strong className="font-bold text-emerald-400">SEE</strong> about <strong className="font-bold text-emerald-400">5000+</strong> words per minute.</p>
                                </div>
                                <p className="text-xl font-bold text-white max-w-2xl mx-auto leading-relaxed pt-2">
                                    You actually already do this "Visual Reading" to some extent. <span className="text-indigo-400">Let's prove it.</span>
                                </p>
                            </div>
                        </Slide>
                    )}

                    {step === 8 && (
                        <IntroductionToFs onNext={nextStep} onBack={prevStep} />
                    )}

                    {step === 9 && (
                        <TrianglesExercise onNext={nextStep} onBack={prevStep} />
                    )}

                    {step === 10 && (
                        <NotEveryWordSlide onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* --- NEW PASSIVE PERIPHERAL DEMO --- */}
                    {step === 11 && (
                        <PeripheralVisionPassive onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* --- NEW PERIPHERAL PREP --- */}
                    {step === 12 && (
                        <PeripheralVisionPrep onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* --- NEW PERIPHERAL SECTION (REVERTED) --- */}
                    {step === 13 && (
                        <PeripheralVisionSequence onNext={nextStep} onBack={prevStep} />
                    )}

                    {step === 14 && (
                        <PeripheralVisionComparison onNext={nextStep} onBack={prevStep} />
                    )}


                    {step === 15 && (
                        <Slide key="regression_intro" title="Regression" icon={<RotateCcw className="w-12 h-12 text-orange-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">Have you ever noticed that there are times when you finish a passage or a page and you realise that you have no idea what you just read and so you re-read it?</p>
                                <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6 text-lg text-left">
                                    <p className="text-slate-300">This is another major reason that our reading slows down.</p>
                                    <p className="text-slate-300">But this can be reduced significantly if you remove the reasons that it happens.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {step === 16 && (
                        <Slide key="why_regression_happens" title="Why Regression Happens" icon={<Brain className="w-12 h-12 text-rose-500" />} onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto text-left py-2 w-full">
                                <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3 hover:bg-slate-900/80 transition-colors h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-6xl font-black text-rose-500">1</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-rose-400 font-bold border border-slate-700 shadow-lg mb-1">1</div>
                                    <div>
                                        <p className="font-bold text-white text-lg mb-2">Lack of confidence</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">You assume you missed something, even when you didn't. Trust your brain.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3 hover:bg-slate-900/80 transition-colors h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-6xl font-black text-rose-500">2</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-rose-400 font-bold border border-slate-700 shadow-lg mb-1">2</div>
                                    <div>
                                        <p className="font-bold text-white text-lg mb-2">Slight Distraction</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">Your attention drifts for a split second. You panic. You rewind. Stay present.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3 hover:bg-slate-900/80 transition-colors h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-6xl font-black text-rose-500">3</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-rose-400 font-bold border border-slate-700 shadow-lg mb-1">3</div>
                                    <div>
                                        <p className="font-bold text-white text-lg mb-2">Boredom</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">Our brains process much faster than we read. Reading slowly causes day dreaming.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {step === 17 && (
                        <Slide key="one_last_thing" title="One Last Thing..." icon={<Gauge className="w-12 h-12 text-emerald-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-4xl mx-auto">
                                <p className="text-xl text-white font-medium">Your perception of speed also impacts your reading speed.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                                        <h3 className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                                            <Gauge className="w-5 h-5" /> The Highway Effect
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            If you drive a lot you will know the experience of how slow it feels when you need to drive at 50km/hr after driving at a fast highway speed for a long time.
                                        </p>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                                        <h3 className="text-rose-400 font-bold text-lg flex items-center gap-2">
                                            <BrainCircuit className="w-5 h-5" /> The Brain's Adaptation
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            If you didn't have a speedometer and you had to estimate the 50km/hr you would probably drive much faster without even realising it. Your perception of speed changes.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/30">
                                    <p className="text-lg text-white font-semibold">We can do the same with your reading speed.</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* --- DESIRE / REALITY SECTION --- */}
                    {step === 18 && (
                        <Slide key="the_reality" title="From Theory To Reality" icon={<Sparkles className="w-12 h-12 text-yellow-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-2xl text-white font-heading font-bold leading-tight">
                                    Imagine reading <span className="text-emerald-400">50-150% faster</span> than you do right now.
                                </p>
                                <div className="space-y-4 text-left bg-slate-900/50 p-8 rounded-2xl border border-slate-700">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                        <p className="text-slate-300">Finishing books in days, not months.</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                        <p className="text-slate-300">Absorbing information instantly without "hearing" it.</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                        <p className="text-slate-300">Having the confidence that you won't miss anything.</p>
                                    </div>
                                </div>
                                <p className="text-xl text-slate-200">
                                    We have developed a program that helps you do exactly that.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* --- PAYWALL SECTION --- */}
                    {step === 19 && (
                        <PaywallSlide onUnlock={handleUnlock} />
                    )}


                    {/* --- FLASH DRILL SECTION --- */}
                    {step === 20 && (
                        <Slide key="drill_intro" title="Step 2: The Rogue Session" icon={<Zap className="w-12 h-12 text-yellow-400" />} onNext={nextStep}>
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <p className="text-2xl text-white font-bold">We are about to force your brain to process visual information faster.</p>
                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 text-left space-y-4">
                                    <p className="text-slate-300">You will see pages of text flashing on the screen.</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-3 text-lg"><span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">1</span> <span>1 Page per second</span></li>
                                        <li className="flex items-center gap-3 text-lg"><span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">2</span> <span>2 Pages per second (0.5s)</span></li>
                                        <li className="flex items-center gap-3 text-lg"><span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">3</span> <span>3 Pages per second (0.3s)</span></li>
                                    </ul>
                                </div>
                                <p className="text-rose-400 font-bold text-xl uppercase tracking-widest">DO NOT TRY TO READ THEM.</p>
                                <p className="text-slate-400">Just soften your gaze and let your brain "photograph" the pages. <br />It will feel too fast. <strong>That is the point.</strong></p>
                            </div>
                        </Slide>
                    )}

                    {step === 21 && (
                        <RogueSessionEngine onComplete={nextStep} />
                    )}

                    {/* --- RETEST SECTION --- */}
                    {step === 22 && (
                        <Slide key="retest_intro" title="Step 3: The After Test" icon={<BrainCircuit className="w-12 h-12 text-emerald-400" />} onNext={nextStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">Check out how much your reading speed has increased by doing these exercises.</p>
                                <p className="text-slate-400">Read the next text at a pace that feels <strong>comfortable</strong> to you now.</p>
                            </div>
                        </Slide>
                    )}

                    {step === 23 && (
                        <ReadingTest onComplete={handleRetestComplete} isRetest={true} />
                    )}

                    {/* --- RESULTS / UPSELL --- */}
                    {step === 24 && baselineStats && finalStats && (
                        <ResultsOverview baseline={baselineStats} final={finalStats} />
                    )}

                </AnimatePresence>
            </div>
            {/* Progress Bar (Global - Moved to Bottom) */}
            <div className="fixed bottom-0 left-0 w-full h-2 bg-slate-900 z-50">
                <motion.div
                    className="h-full bg-indigo-500"
                    animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                />
            </div>
        </div>
    );
}

// --- Sub-Components ---

import { StripeCheckoutMock } from "@/components/ui/StripeCheckoutMock";

function PaywallSlide({ onUnlock }: { onUnlock: () => void }) {
    const [showCheckout, setShowCheckout] = useState(false);

    return (
        <>
            <Slide title="See The Results For Yourself" icon={<Unlock className="w-12 h-12 text-yellow-500" />} customButtonText={showCheckout ? "" : "Experience Change - $5"} onNext={() => setShowCheckout(true)}>
                <div className="space-y-6 max-w-3xl mx-auto">
                    <div className="bg-slate-950/80 p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4 text-left">
                                <h3 className="text-2xl font-bold text-white leading-tight">
                                    Make the change permanent.
                                </h3>
                                <p className="text-slate-300 leading-relaxed">
                                    We have a complete <span className="text-white font-bold">14-Day Protocol</span> and ongoing training platform designed to permanently rewire your brain for speed reading.
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Full access costs <span className="line-through opacity-50">$99</span> <span className="text-white font-bold">$49</span>.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px md:w-px md:h-32 bg-slate-800" />

                            <div className="flex-1 space-y-4 text-left">
                                <h3 className="text-2xl font-bold text-emerald-400 leading-tight">
                                    But first, prove it works.
                                </h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Experience the change for yourself right now. Read 50-150% faster in just 30 minutes.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-4xl font-bold text-white">$5</span>
                                    <span className="text-slate-500 text-sm">One-time entry</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-slate-400 text-sm">We will prove it by testing your new speed against your baseline immediately after.</p>
                        <p className="text-slate-500 text-xs">If it doesn't work, we'll refund your $5. No questions asked.</p>
                    </div>
                </div>
            </Slide>

            {showCheckout && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md relative">
                        <button
                            onClick={() => setShowCheckout(false)}
                            className="absolute -top-12 right-0 text-white/50 hover:text-white"
                        >
                            Cancel
                        </button>
                        <StripeCheckoutMock onSuccess={onUnlock} />
                    </div>
                </div>
            )}
        </>
    );
}

function ReadingTest({ onComplete, isRetest = false }: { onComplete: (results: { wpm: number; comprehension: number }) => void, isRetest?: boolean }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
            <div className="w-full max-w-3xl">
                <ReadingTestEngine
                    title={isRetest ? "Retest: The After Test" : "Baseline Assessment"}
                    text={isRetest ? RETEST_TEXT : BASELINE_TEXT}
                    questions={isRetest ? RETEST_QUESTIONS : BASELINE_QUESTIONS}
                    onComplete={onComplete}
                />
            </div>
        </div>
    );
}



function ResultsOverview({ baseline, final }: { baseline: { wpm: number }, final: { wpm: number } }) {
    const increase = Math.round(((final.wpm - baseline.wpm) / baseline.wpm) * 100);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-center flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 to-indigo-950/20">
            <div className="max-w-4xl w-full space-y-12 text-center">
                <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-bold font-heading text-white">
                        <span className="text-emerald-400">+{increase}%</span> Speed Increase
                    </h2>
                    <p className="text-xl text-slate-300">In just one session.</p>
                </div>

                <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <p className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-2">Baseline</p>
                        <p className="text-4xl text-white font-mono font-bold">{baseline.wpm} <span className="text-lg text-slate-500">WPM</span></p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                        <p className="text-indigo-400 uppercase tracking-widest text-sm font-bold mb-2">Current</p>
                        <p className="text-4xl text-white font-mono font-bold">{final.wpm} <span className="text-lg text-slate-500">WPM</span></p>
                    </div>
                </div>

                <div className="pt-8 space-y-4">
                    <p className="text-lg text-slate-300">This was just a glimpse of what your brain can do.</p>
                    <Link href="/train/sales" className="inline-block">
                        <button className="bg-white text-indigo-900 px-10 py-5 rounded-full font-bold text-2xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] flex items-center gap-3">
                            Unlock The Full Protocol
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </Link>
                    <p className="text-sm text-slate-500 pt-4">14-Day Guarantee. Keep the book regardless.</p>
                </div>
            </div>
        </motion.div>
    );
}
