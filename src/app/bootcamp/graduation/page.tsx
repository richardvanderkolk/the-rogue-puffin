"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight, Brain, FastForward, Zap, Target, BookOpen } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function GraduationSessionContent() {
    const router = useRouter();
    const { width, height } = useWindowSize();

    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const finishGraduation = () => {
        router.push('/bootcamp');
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6 overflow-hidden relative">
            {step === 0 && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.1} />}
            {step === 4 && <Confetti width={width} height={height} recycle={true} numberOfPieces={200} opacity={0.5} />}

            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center z-10 relative">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: The Commencement */}
                    {step === 0 && (
                        <Slide key="intro" title="The Commencement" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <div className="flex justify-center mb-8">
                                    <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                                        <GraduationCap className="w-12 h-12 text-emerald-400" />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">Congratulations.</h2>
                                <p className="text-2xl text-slate-300 leading-relaxed font-light mt-4">
                                    You have fundamentally transformed the way you process information.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: Look How Far You've Come */}
                    {step === 1 && (
                        <Slide key="progress" title="Look How Far You've Come" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="max-w-5xl mx-auto">
                                <p className="text-xl text-slate-300 text-center mb-12 max-w-2xl mx-auto">
                                    People quickly adapt to their new baseline and forget how much they struggled initially. Let's look at the gap between who you were on Day 1, and who you are right now.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 mb-6">
                                            <FastForward className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4">The Speed</h4>
                                        <p className="text-slate-400 mb-4">On Day 1, 300 WPM felt uncomfortably fast. You sub-vocalized everything.</p>
                                        <p className="text-purple-300 font-medium">Today, your visual cortex casually processes blocks of text at 1000+ WPM without hearing a single word.</p>
                                    </div>
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mb-6">
                                            <Brain className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4">The Comprehension</h4>
                                        <p className="text-slate-400 mb-4">You used to blindly highlight textbooks and mistake recognition for understanding.</p>
                                        <p className="text-indigo-300 font-medium">Today, you extract the "Picture on the Box", build visual Mind Maps, and use the Feynman Technique to expose your own ignorance.</p>
                                    </div>
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-6">
                                            <Target className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-4">The Strategy</h4>
                                        <p className="text-slate-400 mb-4">You used to cram for exams at the last minute and forget everything a week later.</p>
                                        <p className="text-emerald-300 font-medium">Today, you defeat Parkinson's Law with artificial deadlines and conquer the Forgetting Curve with spaced active recall.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Shift */}
                    {step === 2 && (
                        <Slide key="shift" title="The Final Shift" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <h3 className="text-3xl font-bold text-indigo-400 mb-6">From Cramming to Compounding</h3>
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        The bootcamp is over. Your timeframe has permanently changed.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                        You are no longer studying for tomorrow's test. Cramming will get you focused, but it destroys long-term retention. To build true expertise, you must shift from a mindset of survival to a mindset of compounding growth.
                                    </p>
                                    <p className="text-lg text-white font-medium bg-slate-900/60 p-6 rounded-xl border-l-4 border-indigo-500 shadow-md">
                                        Consistency beats intensity every time. Studying 30 minutes a day for a month will yield immensely better retention than studying for 15 hours straight the day before.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Your Final Mission */}
                    {step === 3 && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-slate-900/40 border border-slate-700 rounded-2xl shadow-lg text-left">
                                    <h4 className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                                        <Zap className="w-6 h-6 text-amber-400" /> Apply the Engine
                                    </h4>
                                    <ul className="space-y-4 text-lg text-slate-300 pl-2">
                                        <li className="flex items-start gap-3">
                                            <span className="text-indigo-500 font-bold mt-1">•</span> 
                                            <span><strong>Choose your first target.</strong> Pick a non-fiction book or a course module you need to master.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-indigo-500 font-bold mt-1">•</span> 
                                            <span><strong>Use the system.</strong> Preview it for 5 minutes. Formulate questions. Read dynamically. Create a Mind Map from memory. Explain it aloud.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-indigo-500 font-bold mt-1">•</span> 
                                            <span><strong>Schedule your review.</strong> Put your Day 2, Day 7, and Day 21 reviews in your calendar right now.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Continue Your Journey */}
                    {step === 4 && (
                        <div className="w-full flex flex-col justify-center animate-in fade-in duration-500 py-12">
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30 mb-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                                    <BookOpen className="w-10 h-10 text-indigo-400" />
                                </div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">Continue Your Journey</h2>
                                <p className="text-xl text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
                                    You have built the engine. You understand the mechanics of elite learning. Now, it is time to take it to the track.
                                </p>
                                
                                <div className="mt-12 flex justify-center">
                                    <button 
                                        onClick={finishGraduation}
                                        className="group relative inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                    >
                                        Return to Bootcamp Dashboard
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function GraduationSessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading graduation...</div>}>
            <GraduationSessionContent />
        </Suspense>
    );
}
