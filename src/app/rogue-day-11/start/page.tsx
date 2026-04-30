"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Target, BookOpen, Search, Network, MessageCircle, Activity } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function RogueDay11SessionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const course = searchParams.get('course') || 'bootcamp';
    
    // The bootcamp URL logic
    const dashboardUrl = '/v2/bootcamp?unlocked=true';

    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const markCompleteAndReturn = () => {
        // Mock persistence
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (11 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '12'); // Unlock day 12
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Intro */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 11: The Feynman Technique" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Simplicity is Mastery.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    The ultimate test of knowledge is not how many complex words you can use, but how simply you can explain it to someone else.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Core Concept */}
                    {step === 1 && (
                        <Slide key="simplicity" title="The Illusion of Knowledge" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/simplicity.png" alt="A tangled ball of yarn being pulled into a single straight glowing thread" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        If you can't explain it simply, you don't understand it well enough.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        We often mistake recognition for understanding. When we read a textbook, the words make sense, so we assume we know the material. But when asked to explain it, we stumble. The Feynman Technique forces you to confront the tangled gaps in your knowledge by straightening the thread.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The 4 Steps */}
                    {step === 2 && (
                        <Slide key="feynman" title="The Four Steps" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/feynman.png" alt="A person confidently teaching a complex topic to a cute child using a whiteboard" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <ul className="text-slate-300 text-lg leading-relaxed space-y-4">
                                        <li><strong>1. Choose a concept:</strong> Write the name of the topic at the top of a page.</li>
                                        <li><strong>2. Teach it to a child:</strong> Explain the concept using simple, plain English. Imagine teaching it to a 12-year-old. Do not use jargon.</li>
                                        <li><strong>3. Identify gaps:</strong> Whenever you get stuck or find yourself using complex terms to hide your lack of understanding, stop.</li>
                                        <li><strong>4. Review and simplify:</strong> Go back to the source material, relearn that specific gap, and try again until the explanation is seamless.</li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Your Mission */}
                    {step === 3 && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Take the Mind Map you built yesterday. Stand up, hold it in your hands, and <strong>explain the entire concept out loud</strong> to an imaginary audience in your room.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Use only the keywords on your map as prompts. If you stumble, you have found a gap. Go back and fix it.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Transition to Drill */}
                    {step === 4 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are returning to <strong className="text-indigo-400">Your Confidence</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        As we approach the end of the bootcamp, the speeds of the drills are increasing significantly.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        It is very easy to tense up and become frustrated when you can't read every word. Today's drill is a reminder to relax, breathe, and maintain a state of confident flow. The comprehension will follow the speed in time.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Activity className="w-5 h-5" /> Learning Mindset
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: 14-Day Reading Protocol (Day 8: Your Confidence) */}
                    {step === 5 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={11}
                                sequence={COURSE_CONTENT.find(d => d.day === 8)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 8)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Stand up and explain your Mind Map out loud, using only keywords as prompts."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay11SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay11SessionContent />
        </Suspense>
    );
}
