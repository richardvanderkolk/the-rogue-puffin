"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Zap, Moon, Droplets, Apple, Activity } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function RogueDay6SessionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const course = searchParams.get('course') || 'bootcamp';
    
    // The bootcamp URL logic
    const dashboardUrl = '/v2/bootcamp?unlocked=true';

    const [step, setStep] = useState(0);
    const [userCommitment, setUserCommitment] = useState("");

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const markCompleteAndReturn = () => {
        // Mock persistence
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (6 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '7'); // Unlock day 7
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Feel Sharp */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 6: Feel Sharp" onNext={nextStep}>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    If you are not feeling sharp, learning becomes unnecessarily difficult.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    It’s like trying to ride a bike with a flat tyre. You can still move—but it takes far more effort than it should.
                                </p>
                                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 mt-8">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Today's Protocol</h4>
                                    <ul className="text-slate-400 space-y-2 text-left w-max mx-auto">
                                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400" /> 1. Learning Mastery: Physical State</li>
                                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-rose-400" /> 2. Eye Movement Exercises</li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: Your Body Affects Your Mind */}
                    {step === 1 && (
                        <Slide key="body-mind" title="Your Body Affects Your Mind" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    Most people focus entirely on techniques. But your state matters just as much as your strategy.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                                    <div className="p-5 border border-indigo-500/30 rounded-xl bg-indigo-900/10">
                                        <h4 className="text-indigo-300 font-bold mb-4">Try this right now:</h4>
                                        <ul className="text-slate-300 text-sm space-y-2">
                                            <li>• Stand up straight</li>
                                            <li>• Shoulders back</li>
                                            <li>• Take a deep breath</li>
                                            <li>• Smile big, even with your eyes</li>
                                        </ul>
                                        <p className="mt-4 text-sm text-slate-400">Now try to feel genuinely low or discouraged. It's not easy.</p>
                                    </div>
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/30">
                                        <h4 className="text-slate-400 font-bold mb-4">Now reverse it:</h4>
                                        <ul className="text-slate-400 text-sm space-y-2">
                                            <li>• Slouch over</li>
                                            <li>• Breathe shallowly</li>
                                            <li>• Look down at the floor</li>
                                            <li>• Frown</li>
                                        </ul>
                                        <p className="mt-4 text-sm text-slate-500">Now try to feel genuinely happy and notice how difficult that feels.</p>
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-white font-bold text-lg">
                                        And all three affect your ability to learn.
                                    </p>
                                    <p className="text-slate-400 text-sm max-w-lg mx-auto">
                                        Focus determines what data enters your brain, energy sustains the reading session, and positive emotion chemically signals to your brain that the information is important to remember.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Foundations */}
                    {step === 2 && (
                        <Slide key="foundations" title="The 4 Foundations" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-4xl mx-auto text-left">
                                <p className="text-lg text-slate-300 mb-6 text-center">
                                    You don’t need bio-hacking or complex optimisations. You just need consistency in four areas.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/50 flex items-start gap-4">
                                        <div className="p-3 bg-slate-800 rounded-lg text-indigo-400"><Moon className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Enough High-Quality Sleep</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">Focus drops and memory weakens without sufficient rest. Sleep is when your brain physically consolidates what you've learned into long-term memory.</p>
                                        </div>
                                    </div>
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/50 flex items-start gap-4">
                                        <div className="p-3 bg-slate-800 rounded-lg text-indigo-400"><Droplets className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Hydration</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">Even mild dehydration causes fatigue and brain fog. Many try to push through when they just need water.</p>
                                        </div>
                                    </div>
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/50 flex items-start gap-4">
                                        <div className="p-3 bg-slate-800 rounded-lg text-indigo-400"><Apple className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Nutrition</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">Food is fuel. Sugary snacks create spikes and crashes. Whole foods provide sustained energy for long sessions.</p>
                                        </div>
                                    </div>
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/50 flex items-start gap-4">
                                        <div className="p-3 bg-slate-800 rounded-lg text-indigo-400"><Activity className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Movement</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">You don't need intense fitness. Regular movement improves blood flow, increases focus, and supports memory.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: The 9-Day Challenge */}
                    {step === 3 && (
                        <Slide key="challenge" title="The 9-Day Challenge" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <p className="text-xl text-slate-300 font-medium">
                                    We have 9 days left in this bootcamp.
                                </p>
                                <p className="text-lg text-slate-400">
                                    Improving your state doesn’t just help a little—it completely changes how learning feels. If your baseline is low, everything is harder.
                                </p>
                                
                                <div className="my-8 p-6 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl text-left inline-block">
                                    <h4 className="text-indigo-300 font-bold mb-4 uppercase tracking-wider text-sm">Pick At Least One Focus:</h4>
                                    <ul className="space-y-4 font-medium text-white">
                                        <li className="flex items-center gap-3"><span className="text-indigo-500">✓</span> Protect 8 hours of sleep</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500">✓</span> Drink 2 litres of water</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500">✓</span> Add 15 minutes of movement</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500">✓</span> Cut out sugary crashes before studying</li>
                                    </ul>
                                </div>
                                <p className="text-slate-300 italic">
                                    Not extreme. Just consistent. Then observe the difference.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Refine Your Mindset */}
                    {step === 4 && (
                        <Slide key="commit" title="Make Your Commitment" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    Which of the four foundations will you commit to improving for the remaining 9 days of this bootcamp?
                                </p>
                                <textarea
                                    value={userCommitment}
                                    onChange={(e) => setUserCommitment(e.target.value)}
                                    placeholder="For the next 9 days, I commit to improving my [sleep/hydration/nutrition/movement] by..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-inner shadow-slate-950/50"
                                    rows={4}
                                />
                                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 mt-4">
                                    <p className="text-sm text-slate-400 italic text-center">
                                        "You don't need perfect conditions to learn. But you do need to remove unnecessary friction."
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Transition to Drill */}
                    {step === 5 && (
                        <Slide key="transition" title="Physical Training" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Time to train.
                                </p>
                                <p className="text-xl text-slate-400">
                                    Today we are doing <strong className="text-indigo-400">Eye Movement Exercises</strong>.
                                    <br/><br/>
                                    By training your eye muscles to move smoothly and accurately across the page, we eliminate the micro-pauses and regressions that slow down your reading speed and break your focus. Make sure you are sitting upright and breathing properly.
                                </p>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-rose-400 font-bold bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
                                        <Zap className="w-5 h-5" /> Speed Expansion
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: 14-Day Reading Protocol (Day 3) */}
                    {step === 6 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={6}
                                sequence={COURSE_CONTENT.find(d => d.day === 3)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 3)!.content}
                                onComplete={markCompleteAndReturn}
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay6SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay6SessionContent />
        </Suspense>
    );
}
