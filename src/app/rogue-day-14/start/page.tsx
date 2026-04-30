"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Zap, Activity, Users, Split, Eye } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function RogueDay14SessionContent() {
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
        if (14 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '15'); // Mark bootcamp as complete
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Intro */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 14: Show Me Your Friends" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Learning is not a solo activity.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    Most people think learning is just you and the material. But the people in your life — the ones you speak with, learn alongside, or even just observe — quietly shape how well you grow.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Roommate Effect */}
                    {step === 1 && (
                        <Slide key="roommate" title="The Roommate Effect" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <div className="w-full max-w-sm rounded-2xl p-8 bg-slate-900/80 border border-slate-800 shadow-[0_0_30px_rgba(79,70,229,0.1)] flex flex-col items-center justify-center space-y-4">
                                        <Users className="w-24 h-24 text-indigo-500/80" />
                                        <p className="text-sm font-bold tracking-widest uppercase text-slate-400">Contagious Posture</p>
                                    </div>
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6 italic">
                                        Does simply being in the same room as someone driven change your performance?
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        In 2001, researchers studied students randomly assigned to dorm rooms. They found that peer effects were startlingly real: your roommate's dedication significantly impacted your own performance.
                                    </p>
                                    <ul className="space-y-3 text-slate-300 mt-6 pl-4 border-l-2 border-indigo-500">
                                        <li>Expectations are contagious.</li>
                                        <li>Standards are contagious.</li>
                                        <li>Posture is contagious.</li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Medical Student Insight */}
                    {step === 2 && (
                        <Slide key="medical" title="The Medical Student Insight" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                    Research with medical students facing high cognitive demand found that the strongest performers did not simply study in groups, nor did they only study alone. They followed a specific pattern:
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white font-medium my-8 bg-slate-900/40 p-8 rounded-2xl border border-white/5 shadow-xl">
                                    <div className="px-6 py-4 bg-slate-800 rounded-xl text-center w-full sm:w-auto flex flex-col items-center">
                                        <span className="text-sm text-slate-400 font-bold mb-2 uppercase tracking-widest">Step 1</span>
                                        <span className="text-lg">Study independently first</span>
                                    </div>
                                    <span className="text-indigo-500 rotate-90 sm:rotate-0 text-3xl">→</span> 
                                    <div className="px-6 py-4 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-center w-full sm:w-auto flex flex-col items-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                        <span className="text-sm text-indigo-300 font-bold mb-2 uppercase tracking-widest">Step 2</span>
                                        <span className="text-lg">Then explain it to others</span>
                                    </div>
                                </div>

                                <p className="text-lg text-slate-400 leading-relaxed">
                                    This reflects the <strong className="text-indigo-400">“Protégé Effect”</strong>. Preparing to teach material significantly strengthens understanding and retention, because you are forced to engage deeply and identify your own gaps.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: A Powerful Rhythm */}
                    {step === 3 && (
                        <Slide key="rhythm" title="A Powerful Rhythm" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
                                <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-700 shadow-lg">
                                    <h4 className="text-2xl font-bold text-white mb-4">Solitude for Depth</h4>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        Alone, you concentrate. Alone, you wrestle with the material.
                                    </p>
                                </div>
                                <div className="bg-indigo-900/20 p-8 rounded-2xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                                    <h4 className="text-2xl font-bold text-indigo-300 mb-4">Community for Reinforcement</h4>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        Together, you clarify. Together, you refine and strengthen what you’ve grasped.
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-2xl mx-auto text-center mt-10">
                                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                                    Both matter. If you isolate completely, your understanding remains untested. If you rely only on groups, you never build internal clarity. The most powerful growth happens in the combination.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Your Mission */}
                    {step === 4 && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                        Think about the people in your life. Who raises the level of conversation? Who asks thoughtful questions? 
                                    </p>
                                    <p className="text-lg text-white font-medium bg-slate-900/60 p-6 rounded-xl border-l-4 border-indigo-500 shadow-md">
                                        Reach out to one of them today and intentionally share something you learned this week. Explain it to them.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Transition to Drill */}
                    {step === 5 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are returning to <strong className="text-indigo-400">Your Eye Movement</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        This is the most demanding pacing drill in the program. You must lock into the rhythm.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        The highlight will be blinking fast. Your goal is simply to keep your eyes locked on the dot. Do not try to read aloud. Let your eyes bounce with the rhythm.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Eye className="w-5 h-5" /> Maximum Pacing Rhythm
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: 14-Day Reading Protocol (Day 11: Your Eye Movement) */}
                    {step === 6 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={14}
                                sequence={COURSE_CONTENT.find(d => d.day === 11)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 11)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Find someone who raises the level of conversation and share something you've learned."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay14SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay14SessionContent />
        </Suspense>
    );
}
