"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Brain, Gauge, Unlock, Volume2, RotateCcw, BrainCircuit, Zap, Clock, TrendingUp, Search, CheckCircle, Sparkles, Target, Activity, Database, Lock } from "lucide-react";
import Link from "next/link";
import { RogueSessionEngine } from "@/components/engines/RogueSessionEngine";
import { ViewTracker } from "@/components/ViewTracker";
import { Slide, IntroductionToFs, TrianglesExercise, PeripheralVisionSequence, NotEveryWordSlide, PeripheralVisionPrep, PeripheralVisionPassive, PeripheralVisionComparison } from "@/components/onboarding/ConceptSlides";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { usePostHog } from "posthog-js/react";

import ReadingTestEngine from "@/components/engines/ReadingTestEngine";

// --- Constants ---

const BASELINE_TEXT = `Speed reading is often misunderstood as a trick or a way to skim text without truly understanding it. However, the true goal of speed reading is to improve the efficiency of the connection between your eyes and your brain.

Most people read sequentially, processing one word after another, subvocalizing each one as if speaking aloud. This limits reading speed to speaking speed, which is typically around 150 to 200 words per minute.

By expanding your peripheral vision and reducing the fixation time on each word, you can capture phrases or entire lines at a glance. This visual processing is significantly faster than auditory processing, unlocking your brain's natural ability to absorb information rapidly.`;

const BASELINE_QUESTIONS = [
    { id: 1, text: "What limits reading speed for most people?", options: ["Lack of focus", "Subvocalization (speaking words in your head)", "Small font size", "Poor lighting"], correctIndex: 1 },
    { id: 2, text: "What is the typical reading speed mentioned?", options: ["50-100 wpm", "150-200 wpm", "300-400 wpm", "600+ wpm"], correctIndex: 1 },
    { id: 3, text: "How does speed reading improve efficiency?", options: ["By skipping unimportant words", "By using a finger guide", "By using visual processing instead of auditory", "By reading aloud faster"], correctIndex: 2 }
];

const RETEST_TEXT = `The concept of neuroplasticity suggests that the brain is not a static organ, but rather a dynamic web of connections that can be rewired continuously throughout life. For decades, scientists believed that the brain stopped developing after childhood. We now know that this is fundamentally incorrect.

In fact, focused attention and deliberate practice can physically alter the structure of your neural pathways. When you push your reading speed beyond comfortable limits, you are essentially forcing your brain to recruit new neurons to handle the increased data load.

This adaptation mechanism is what allows speed readers to process information at rates that seem impossible to the untrained eye. It is not magic; it is simply biological adaptation to environmental demand for your busy life.`;

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
    const [isV2, setIsV2] = useState(false);
    const [hasSkippedExercises, setHasSkippedExercises] = useState(false);
    const [visitorId, setVisitorId] = useState<string>('');
    const [hasCapturedLead, setHasCapturedLead] = useState(false);
    const [leadEmail, setLeadEmail] = useState('');
    const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [assessmentMode, setAssessmentMode] = useState(false);
    
    const posthog = usePostHog();

    useEffect(() => {
        if (hasCapturedLead) {
            if (step === 0) {
                posthog?.capture('diagnostic_started');
            } else if (step === 23) {
                posthog?.capture('diagnostic_completed', { baseline_wpm: baselineStats?.wpm, final_wpm: finalStats?.wpm });
            } else {
                posthog?.capture('diagnostic_step_completed', { step_number: step });
            }
        }
    }, [step, hasCapturedLead, posthog, baselineStats, finalStats]);

    useEffect(() => {
        let id = localStorage.getItem('rp_visitor_id');
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('rp_visitor_id', id);
        }
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('restart')) {
            localStorage.removeItem('rp_baseline_stats');
            localStorage.removeItem('rp_final_stats');
            localStorage.removeItem('rp_skipped_exercises');
        } else {
            // Load saved baseline if they refreshed the page
            const savedBaseline = localStorage.getItem('rp_baseline_stats');
            const savedFinal = localStorage.getItem('rp_final_stats');
            const savedSkipped = localStorage.getItem('rp_skipped_exercises');
            
            let hasBaseline = false;
            let hasFinal = false;

            if (savedBaseline) {
                try {
                    setBaselineStats(JSON.parse(savedBaseline));
                    hasBaseline = true;
                } catch (e) {
                    console.error("Failed to parse saved baseline");
                }
            }
            
            if (savedFinal) {
                try {
                    setFinalStats(JSON.parse(savedFinal));
                    hasFinal = true;
                } catch (e) {
                    console.error("Failed to parse saved final stats");
                }
            }
            
            if (savedSkipped) {
                setHasSkippedExercises(savedSkipped === 'true');
            }
            
            if (localStorage.getItem('rp_captured_email')) {
                setHasCapturedLead(true);
            }
            
            if (hasBaseline && hasFinal) {
                setStep(23); // Jump to Results
            } else if (hasBaseline) {
                setStep(3); // Jump to Theory/Paradox since baseline is established
            }
        }
        
        setIsV2(urlParams.get('v2') === 'true');
        setAssessmentMode(urlParams.get('mode') === 'assessment');
    }, []);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const handleBaselineComplete = async (results: { wpm: number; comprehension: number }) => {
        setBaselineStats(results);
        localStorage.setItem('rp_baseline_stats', JSON.stringify(results));
        posthog?.capture('test_completed', {
            test_flow: 'precision_reading_drill',
            wpm: results.wpm,
            comprehension: results.comprehension
        });
        nextStep(); // Advance UI immediately
        
        if (visitorId) {
            try {
                fetch('/api/anonymous-tests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        visitor_id: visitorId,
                        wpm: results.wpm,
                        comprehension_score: results.comprehension,
                        test_type: 'baseline'
                    })
                });
            } catch (err) {
                console.error("Failed to log baseline", err);
            }
        }
    };

    const handleRetestComplete = async (results: { wpm: number; comprehension: number }) => {
        setFinalStats(results);
        localStorage.setItem('rp_final_stats', JSON.stringify(results));
        nextStep(); // Advance UI immediately
        
        if (visitorId) {
            try {
                fetch('/api/anonymous-tests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        visitor_id: visitorId,
                        wpm: results.wpm,
                        comprehension_score: results.comprehension,
                        test_type: 'rogue_session'
                    })
                });
            } catch (err) {
                console.error("Failed to log retest", err);
            }
        }
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

    const totalSteps = 25;

    const handleLeadSubmitDirect = async (emailToSubmit: string, wpmVal: number, compVal: number) => {
        if (!emailToSubmit) return false;
        setLeadStatus('loading');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailToSubmit, wpm: wpmVal, comprehension: compVal }),
            });
            if (res.ok) {
                localStorage.setItem('rp_captured_email', emailToSubmit);
                posthog?.capture('lead_submitted', {
                    email_source: 'precision_reading_drill',
                    wpm: wpmVal,
                    comprehension: compVal
                });
                setHasCapturedLead(true);
                setLeadStatus('idle');
                return true;
            } else {
                setLeadStatus('error');
                return false;
            }
        } catch {
            setLeadStatus('error');
            return false;
        }
    };

    const handleStartBaseline = () => {
        posthog?.capture('test_started', { test_flow: 'precision_reading_drill' });
        nextStep();
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-32 pb-12 px-6 bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
            <ViewTracker path="/rogue-session/start" title="Speed Reading Protocol" category="Course" />

            <div className="max-w-3xl w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* --- BASELINE SECTION --- */}
                    {step === 0 && (
                        <Slide 
                            key="lets_do_this" 
                            title={assessmentMode ? "Reading Speed Assessment" : "Step 1: The Baseline"} 
                            icon={<Clock className="w-12 h-12 text-indigo-400" />} 
                            onNext={handleStartBaseline} 
                            customButtonText={assessmentMode ? "Start Assessment" : "Start Baseline"}
                        >
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">
                                    {assessmentMode 
                                        ? "Discover your current reading speed and comprehension rate in 60 seconds."
                                        : "Before we begin the training, we need to know exactly where you are starting from."}
                                </p>
                                <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-xl text-left mt-6">
                                    <p className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><Brain className="w-5 h-5" /> Comprehension Test</p>
                                    <p className="text-slate-300 leading-relaxed mb-3">Read the following text at your <strong>normal, comfortable pace</strong>. Do not rush. Immediately after reading, you will be asked to answer a series of questions to test your recall.</p>
                                    <p className="text-xs text-indigo-300 border-t border-indigo-500/10 pt-3 font-medium">
                                        * Note: This protocol trains your eyes and brain to absorb whole phrases at once. It is not skimming—your comprehension is just as important as your speed.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {step === 1 && (
                        <ReadingTest onComplete={handleBaselineComplete} isRetest={false} />
                    )}

                    {step === 2 && baselineStats && (
                        <Slide 
                            key="baseline_result" 
                            title="Baseline Established" 
                            icon={<CheckCircle className="w-12 h-12 text-emerald-400" />} 
                            onNext={async () => {
                                if (!hasCapturedLead) {
                                    const success = await handleLeadSubmitDirect(leadEmail, baselineStats.wpm, baselineStats.comprehension);
                                    if (success) nextStep();
                                } else {
                                    nextStep();
                                }
                            }}
                            customButtonText={leadStatus === 'loading' ? "Saving..." : (hasCapturedLead ? "Analyze My Reading" : "Save & Unlock Training")}
                            nextDisabled={leadStatus === 'loading' || (!hasCapturedLead && !leadEmail)}
                        >
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

                                {!hasCapturedLead ? (
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden mt-6">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                                        <div className="relative z-10 flex flex-col items-center">
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                                Save Your Score & Unlock Training
                                            </h3>
                                            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed mb-6">
                                                Enter your email to save your baseline score of <strong className="text-white font-bold">{baselineStats.wpm} WPM</strong> and instantly unlock the 10-minute visual training exercises.
                                            </p>
                                            <form 
                                                onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    if (leadStatus === 'loading' || !leadEmail) return;
                                                    const success = await handleLeadSubmitDirect(leadEmail, baselineStats.wpm, baselineStats.comprehension);
                                                    if (success) nextStep();
                                                }}
                                                className="w-full space-y-3"
                                            >
                                                <input
                                                    type="email"
                                                    required
                                                    value={leadEmail}
                                                    onChange={(e) => setLeadEmail(e.target.value)}
                                                    placeholder="Enter your email address..."
                                                    disabled={leadStatus === 'loading'}
                                                    className="w-full bg-slate-950 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-base disabled:opacity-50"
                                                />
                                                {leadStatus === 'error' && (
                                                    <p className="text-red-400 text-sm font-medium mt-1">Something went wrong. Please try again.</p>
                                                )}
                                                <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 text-left bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                                                    <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
                                                    <p>We respect your privacy. No spam, ever.</p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-lg text-slate-300">
                                        This is your starting point. Most people read between 150-250 WPM. <br />
                                        <span className="text-indigo-400 font-bold">Now let's see why you are stuck at this speed.</span>
                                    </p>
                                )}
                            </div>
                        </Slide>
                    )}

                    {/* --- THEORY SECTION --- */}

                    {step === 3 && (
                        <Slide key="intro_primary_school" title="The Supercomputer Paradox" icon={<Brain className="w-12 h-12 text-indigo-400" />} onNext={nextStep} onBack={prevStep}>
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
                        <Slide key="intro_unlock" title="The Abilities You Already Have" icon={<Unlock className="w-12 h-12 text-indigo-400" />} onNext={nextStep} onBack={prevStep}>
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
                                            If you drive a lot you will know the experience of how slow it feels when you need to drive at 50km/hr after driving at a fast highway speed for a long time. It feels like you could get out and walk faster! Yet if you drove that same speed through central city traffic it would feel very fast.
                                        </p>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                                        <h3 className="text-rose-400 font-bold text-lg flex items-center gap-2">
                                            <BrainCircuit className="w-5 h-5" /> The Brain's Adaptation
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            If you didn't have a speedometer and you had to estimate 50km/hr after driving at a fast highway speed for a long time, you would probably drive much faster without even realising it. Your perception of speed changes.
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




                    {/* --- FLASH DRILL SECTION --- */}
                    {step === 19 && (
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

                    {step === 20 && (
                        <RogueSessionEngine onComplete={(skipped) => {
                            if (skipped) {
                                setHasSkippedExercises(true);
                                localStorage.setItem('rp_skipped_exercises', 'true');
                            }
                            nextStep();
                        }} />
                    )}

                    {/* --- RETEST SECTION --- */}
                    {step === 21 && (
                        <Slide key="retest_intro" title="Step 3: The After Test" icon={<BrainCircuit className="w-12 h-12 text-emerald-400" />} onNext={nextStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">Check out how much your reading speed has increased by doing these exercises.</p>
                                <p className="text-slate-400">Read the next text at a pace that feels <strong>comfortable</strong> to you now.</p>
                            </div>
                        </Slide>
                    )}

                    {step === 22 && (
                        <ReadingTest onComplete={handleRetestComplete} isRetest={true} />
                    )}

                    {/* --- RESULTS / UPSELL --- */}
                    {step === 23 && baselineStats && finalStats && (
                        <ResultsOverview baseline={baselineStats} final={finalStats} isV2={isV2} hasSkippedExercises={hasSkippedExercises} />
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

function ReadingTest({ onComplete, isRetest = false }: { onComplete: (results: { wpm: number; comprehension: number }) => void, isRetest?: boolean }) {
    return (
        <div className="min-h-screen flex flex-col items-center pt-32 pb-12 px-6 bg-slate-950">
            <div className="w-full max-w-3xl flex-1 flex flex-col justify-center">
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



function ResultsOverview({ baseline, final, isV2, hasSkippedExercises }: { baseline: { wpm: number }, final: { wpm: number }, isV2?: boolean, hasSkippedExercises?: boolean }) {
    const increase = Math.round(((final.wpm - baseline.wpm) / baseline.wpm) * 100);
    const { user, signIn } = useAuth();
    const [capturedEmail, setCapturedEmail] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('rp_captured_email');
        if (email) {
            setCapturedEmail(email);
        }
    }, []);

    const handleSaveProgress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !capturedEmail) return;

        setIsSaving(true);
        setSaveError('');

        try {
            const { data, error } = await supabase.auth.signUp({
                email: capturedEmail,
                password: password,
            });

            if (error) {
                // If already registered, try signing in
                if (error.message.includes('already registered')) {
                    const { error: signInError } = await supabase.auth.signInWithPassword({
                        email: capturedEmail,
                        password: password
                    });
                    if (signInError) {
                        setSaveError(signInError.message);
                        setIsSaving(false);
                        return;
                    }
                } else {
                    setSaveError(error.message);
                    setIsSaving(false);
                    return;
                }
            }

            await signIn(capturedEmail);
            setSaveSuccess(true);
        } catch (err: any) {
            setSaveError(err.message || 'Something went wrong');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center py-12 px-4 md:px-6 bg-gradient-to-br from-slate-950 to-indigo-950/20">
            
            <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-[0_0_50px_rgba(79,70,229,0.15)] overflow-hidden flex flex-col relative">
                
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Top Section: The Win */}
                <div className="p-8 md:p-10 border-b border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white">
                            You unlocked <span className="text-emerald-400">permanent reading mastery.</span>
                        </h2>
                        <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Your reading speed increased by +{increase}% in just 30 minutes.</p>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="text-center md:text-right">
                            <p className="text-slate-500 uppercase tracking-wider text-xs font-bold mb-1">Baseline</p>
                            <p className="text-2xl md:text-3xl text-white font-mono font-bold">{baseline.wpm}</p>
                        </div>
                        <div className="h-12 w-px bg-slate-800"></div>
                        <div className="text-center md:text-left">
                            <p className="text-indigo-400 uppercase tracking-wider text-xs font-bold mb-1">Current</p>
                            <p className="text-3xl md:text-4xl text-white font-mono font-bold">{final.wpm}</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section: The Pitch */}
                <div className="p-8 md:p-10 md:pt-12 relative z-10 flex-1">
                    <div className="text-center space-y-3 mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            If you can achieve this in 30 minutes...
                        </h3>
                        <h3 className="text-2xl md:text-3xl font-bold text-indigo-400 tracking-tight">
                            imagine what happens when you build knowledge like compound interest over 14 days.
                        </h3>
                    </div>

                    {/* Fear of Loss Warning */}
                    <div className="max-w-3xl mx-auto mb-10 bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 flex items-start gap-4">
                        <div className="p-2 bg-rose-500/10 rounded-lg shrink-0 mt-0.5">
                            <Activity className="w-5 h-5 text-rose-400" />
                        </div>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
                            <span className="font-bold text-rose-400">Warning:</span> Without structured daily practice to lock in your new neural pathways, your reading speed will slow significantly from its true potential instead of continuing to increase. Don't lose your momentum.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="space-y-3 text-center md:text-left">
                            <div className="w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                <Brain className="w-7 h-7 text-purple-400" />
                            </div>
                            <h4 className="text-white font-bold text-lg">Day 2: Effortless Understanding</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Increase understanding by identifying your unique learning style.</p>
                        </div>
                        <div className="space-y-3 text-center md:text-left">
                            <div className="w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                <Database className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h4 className="text-white font-bold text-lg">Day 3: Unbreakable Memory</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Unlock the memory you thought you didn't have.</p>
                        </div>
                        <div className="space-y-3 text-center md:text-left">
                            <div className="w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                <Activity className="w-7 h-7 text-indigo-400" />
                            </div>
                            <h4 className="text-white font-bold text-lg">Days 4-14: Permanent Mastery</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">Make your new reading speed permanent and discover learning secrets uncovered in scientific studies.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <Link href="/bootcamp" className="block group w-full max-w-lg">
                            <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 rounded-full font-black text-xl hover:from-indigo-400 hover:to-purple-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_45px_rgba(99,102,241,0.4)] flex justify-center items-center gap-3 hover:scale-105 border border-indigo-400/20">
                                Secure Your 14-Day Bootcamp Access <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <p className="text-sm text-slate-500 font-medium mt-5">14-Day Guided Execution Plan. Only $29.</p>
                    </div>
                </div>

                {/* Bottom Section: The Fallback */}
                <div className="bg-slate-950/50 p-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/80 relative z-10 min-h-[100px]">
                    {user || saveSuccess ? (
                        <div className="w-full flex flex-col items-center justify-center gap-4">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-bold">Your progress is safely stored.</span>
                            </div>
                            <Link href="/bootcamp">
                                <button className="text-sm px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors border border-slate-700 hover:border-slate-600 flex items-center gap-2 group">
                                    Explore the Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-center md:text-left shrink-0">
                                <p className="text-slate-300 text-sm font-medium">Not ready for the Bootcamp yet?</p>
                                <p className="text-slate-500 text-xs mt-1">Save your <span className="text-emerald-400 font-medium">+{increase}% speed record</span> before you leave.</p>
                            </div>
                            
                            <div className="w-full md:w-auto flex-1 flex justify-end">
                                {!showPasswordInput ? (
                                    <button 
                                        onClick={() => setShowPasswordInput(true)}
                                        className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-6 py-3 rounded-lg font-bold transition-colors border border-slate-700 flex items-center justify-center gap-2"
                                    >
                                        Create Free Account <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <form onSubmit={handleSaveProgress} className="w-full md:max-w-md flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1">
                                            <input 
                                                type="password" 
                                                required
                                                placeholder="Choose a password..." 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-black border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            />
                                            {saveError && <p className="text-red-400 text-xs mt-2 absolute">{saveError}</p>}
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={isSaving}
                                            className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
                                        >
                                            {isSaving ? "Saving..." : "Save Now"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                </div>

            </div>

        </motion.div>
    );
}
