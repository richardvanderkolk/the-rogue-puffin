"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Target, BookOpen, Search, Pause, Coffee } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function RogueDay9SessionContent() {
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
        if (9 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '10'); // Unlock day 10
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Intro */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 9: Active Reading" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    The more questions you ask when coming to the text, the more questions you answer as you read it.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    And therefore, the more you will understand. Reading is not a passive activity. It is an active conversation between you and the author.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Sponge vs The Detective */}
                    {step === 1 && (
                        <Slide key="sponge-detective" title="The Sponge vs. The Detective" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/detective.png" alt="A cute detective character examining a glowing book with a magnifying glass" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        A sponge passively absorbs whatever liquid it sits in. A detective actively interrogates the scene.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        When you read passively (like a sponge), your mind wanders and you forget what you read by the time you reach the bottom of the page. To comprehend information at high speeds, you must become the detective.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Curiosity Mindset */}
                    {step === 2 && (
                        <Slide key="curiosity" title="The Curiosity Mindset" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/curiosity.png" alt="Golden question marks and lightbulbs floating out of a magical book" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        There is no such thing as a boring text.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        There is only a lack of curiosity. After all, the author must have found the topic interesting enough to dedicate months or years of their life to write about it! Your job is to uncover what they found so fascinating.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: How to be a Detective */}
                    {step === 3 && (
                        <Slide key="how-to" title="How to Interrogate the Text" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-xl text-slate-300">
                                    As you read, you should be constantly asking questions in the back of your mind.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left my-8">
                                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        <h4 className="text-indigo-400 font-bold mb-2">The Questions:</h4>
                                        <ul className="text-slate-300 text-sm leading-relaxed space-y-2 list-disc pl-4">
                                            <li>Why is the author telling me this?</li>
                                            <li>Do I agree with this premise?</li>
                                            <li>How does this connect to what I already know?</li>
                                            <li>What is the core argument here?</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                                        <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><Search className="w-4 h-4" /> The Result</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">By actively asking these questions, you force your brain to stay engaged. This active engagement is the foundational step required for "Genius Note-Taking," which we will cover tomorrow.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Hunt for the Main Ideas */}
                    {step === 4 && (
                        <Slide key="spine" title="Hunt for the Main Ideas" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <Target className="w-6 h-6 text-indigo-400" /> Find the Spine
                                    </h4>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Every good piece of writing has a spine: the central ideas that everything else supports. Identifying this spine is your primary job as a reader.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Pay attention to topic sentences (typically the first sentence of each paragraph) and summarizing statements. Understand the argument. The details will follow.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Pause, Summarise, Continue */}
                    {step === 5 && (
                        <Slide key="pause" title="Pause, Summarise, Continue" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <Pause className="w-6 h-6 text-indigo-400 fill-indigo-400" /> The Proof of Understanding
                                    </h4>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        At the end of each section, stop. Close the material. Write or say the main points in your own words.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        This is active recall applied to comprehension. If you can summarise it clearly, you understood it. If you cannot, that is valuable feedback — go back and re-read with more intention.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: Protect Your Mental Energy */}
                    {step === 6 && (
                        <Slide key="energy" title="Protect Your Mental Energy" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <Coffee className="w-6 h-6 text-indigo-400" /> Rest is part of the process
                                    </h4>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Reading for extended periods without breaks leads to cognitive fatigue, and a tired brain does not comprehend. It merely scans.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Take short breaks every 25–45 minutes. Step away from the desk. Let your mind process what it has just absorbed. You will return sharper.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 7: Your Mission */}
                    {step === 7 && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Find a text that you need to learn from today. <strong>Before you begin reading it,</strong> write down a physical list of 3 to 5 good questions that you want the text to answer.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Then, keep those questions next to you. Pause at the end of each section, summarise what you read, and see if you can answer them. Let your curiosity drive your focus.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 8: Transition to Drill */}
                    {step === 8 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are returning to <strong className="text-indigo-400">Kinetic Words</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        We are going to push your kinetic limits to completely bypass your inner reading voice.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        The words will appear much faster today. Do not try to speak them in your head. Do not panic if you miss them. Just let your eyes process the shapes of the words as they flash on the screen.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Zap className="w-5 h-5" /> Sub-vocalization Breaking
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 9: 14-Day Reading Protocol (Day 6: Kinetic Words) */}
                    {step === 9 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={9}
                                sequence={COURSE_CONTENT.find(d => d.day === 6)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 6)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Write down a list of 3-5 good questions before your next reading session."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay9SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay9SessionContent />
        </Suspense>
    );
}
