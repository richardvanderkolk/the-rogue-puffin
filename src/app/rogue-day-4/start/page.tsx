"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Target, Search, ArrowRight, Zap, CheckCircle, Eye } from "lucide-react";
import { Slide, PeripheralVisionPrep, PeripheralVisionSequence } from "@/components/onboarding/ConceptSlides";
import { useSearchParams } from "next/navigation";

function RogueDay4SessionContent() {
    const searchParams = useSearchParams();
    const course = searchParams.get('course') || 'bootcamp';
    
    // The bootcamp URL logic
    const dashboardUrl = '/v2/bootcamp?unlocked=true';
    const dashboardText = 'Return to Bootcamp';

    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const markCompleteAndReturn = () => {
        // Here we could add a DB call or local storage update to mark Day 4 complete
        window.location.href = dashboardUrl;
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-32 pb-12 px-6 bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
            <div className="max-w-3xl w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* Step 0: Welcome to the new paradigm */}
                    {step === 0 && (
                        <Slide key="intro" title="Phase 2 Begins" onNext={nextStep} customButtonText="Continue" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full text-center">
                                <p className="text-xl text-slate-200">
                                    For the next 11 days, your training shifts into a new rhythm.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-left space-y-4">
                                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">1. Learning Mastery Lesson</h3>
                                        <p className="text-slate-400">First, we will build your cognitive frameworks. You will learn the psychology and strategy behind becoming a genius-level learner.</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-left space-y-4">
                                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">2. Speed Reading Exercise</h3>
                                        <p className="text-slate-400">Second, we will expand your physical capability. Daily drills will push your visual processing speed so the changes become permanent.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: Know Your Why (Concept) */}
                    {step === 1 && (
                        <Slide key="why-1" title="Know Your Why" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6 text-center">
                                    <p className="text-2xl font-serif italic text-slate-300">
                                        "He who has a why to live for can bear almost any how."
                                    </p>
                                    <p className="text-indigo-400 font-bold">— Friedrich Nietzsche</p>
                                </div>
                                <p className="text-lg text-slate-300 leading-relaxed text-center">
                                    Before we build complex learning systems, we must establish your anchor. Why are you learning the subject in front of you?
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Two Motivators */}
                    {step === 2 && (
                        <Slide key="why-2" title="The Two Motivators" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-4 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">There are two types of motivation that drive learning:</p>
                                
                                <div className="grid gap-4">
                                    <div className="bg-slate-900/50 p-5 rounded-xl border border-rose-500/30 border-l-4 border-l-rose-500">
                                        <h3 className="text-xl font-bold text-rose-400 mb-2">Extrinsic (External)</h3>
                                        <p className="text-slate-300 mb-2">"I have to pass this exam." "My boss told me to."</p>
                                        <p className="text-sm text-slate-400">This creates friction. You are relying on willpower, which depletes over time.</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-5 rounded-xl border border-emerald-500/30 border-l-4 border-l-emerald-500">
                                        <h3 className="text-xl font-bold text-emerald-400 mb-2">Intrinsic (Internal)</h3>
                                        <p className="text-slate-300 mb-2">"I am genuinely curious how this works." "This solves a problem I care about."</p>
                                        <p className="text-sm text-slate-400">This creates flow. Curiosity outlasts obligation every single time.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: The 5 Whys */}
                    {step === 3 && (
                        <Slide key="why-3" title="The 5 Whys" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    To find your intrinsic motivation, ask yourself "Why?" five times to drill down to the root.
                                </p>
                                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                                    <p className="text-slate-400"><span className="text-indigo-400 font-bold mr-2">Goal:</span> I need to learn Python.</p>
                                    <p className="text-slate-400 pl-4"><span className="text-rose-400 font-bold mr-2">Why?</span> Because I want a new job.</p>
                                    <p className="text-slate-400 pl-8"><span className="text-rose-400 font-bold mr-2">Why?</span> Because I want to build things myself.</p>
                                    <p className="text-slate-400 pl-12"><span className="text-emerald-400 font-bold mr-2">Why?</span> Because I have an idea for an app that helps my community.</p>
                                </div>
                                <p className="text-lg text-slate-300 font-bold text-center mt-6">
                                    You aren't learning Python. You are building something for your community.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Transition to Drill */}
                    {step === 4 && (
                        <Slide key="transition" title="Physical Training" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Your cognitive anchor is set.
                                </p>
                                <p className="text-xl text-slate-400">
                                    Now, it is time to expand your physical capacity with today's speed reading drill.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Peripheral Vision Prep */}
                    {step === 5 && (
                        <PeripheralVisionPrep onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* Step 6: Peripheral Vision Drill */}
                    {step === 6 && (
                        <PeripheralVisionSequence onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* Step 7: Completion */}
                    {step === 7 && (
                        <Slide key="completion" title="Day 4 Complete" onNext={markCompleteAndReturn} customButtonText={dashboardText} onBack={prevStep} fullWidth>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <h3 className="text-3xl font-bold text-white mb-4">Excellent Work</h3>
                                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                    You have established the foundation of your learning motivation and pushed the boundaries of your peripheral vision. Tomorrow, we focus on environment and focus.
                                </p>
                            </div>
                        </Slide>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay4SessionPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading session...</div>}>
            <RogueDay4SessionContent />
        </Suspense>
    );
}
