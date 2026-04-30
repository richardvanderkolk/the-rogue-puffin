"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Target, BookOpen, Layers } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function RogueDay8SessionContent() {
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
        if (8 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '9'); // Unlock day 9
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Intro */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 8: Get an Overview" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Never start reading at the first word.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    Most people start reading at page one. That’s the problem. If you want to learn faster and understand more, you don’t begin by reading. You begin by previewing.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Mental Scaffold */}
                    {step === 1 && (
                        <Slide key="scaffold" title="The Mental Scaffold" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/scaffold.png" alt="House framing and scaffolding on a blueprint" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        If you try to build a house without a frame, the walls collapse.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Your memory works the exact same way. If you just start reading from page 1, your brain has no structure to attach the new facts to, and you will forget them almost instantly. Previewing builds the frame.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: Let's Put It Another Way */}
                    {step === 2 && (
                        <Slide key="puzzle" title="Let's Put It Another Way" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/puzzle_box.png" alt="A child holding up a glowing jigsaw puzzle box and looking at the picture on the cover" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        It is much easier to do a jigsaw puzzle if you have the picture on the box.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Consider every bit of new information that you learn like a piece of the jigsaw puzzle. Every time you pick up a piece, you have a better idea of how it fits if you can locate it on the overall picture—but you remain quite clueless if you don't see the big picture first.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Turn It Into a Game */}
                    {step === 3 && (
                        <Slide key="game" title="Turn It Into a Game" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                    Give yourself a strict time limit.
                                </p>
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <h4 className="text-2xl font-bold text-indigo-400 mb-6 text-center italic">
                                        5–10 minutes maximum
                                    </h4>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                        Your goal in previewing is not to understand everything. Your goal is simply to answer three questions:
                                    </p>
                                    <ul className="space-y-4 my-6 text-white font-medium pl-4">
                                        <li className="flex items-center gap-3"><span className="text-indigo-500 text-2xl">•</span> What is this about?</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500 text-2xl">•</span> What are the main ideas?</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500 text-2xl">•</span> What stands out?</li>
                                    </ul>
                                    <p className="text-lg text-slate-400 leading-relaxed mt-6">
                                        This creates intense focus and removes the pressure of thinking <em className="text-slate-300">"I need to understand everything right now."</em>
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Strategic Scanning */}
                    {step === 4 && (
                        <Slide key="how-to" title="Strategic Scanning" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-xl text-slate-300">
                                    Skimming is not rushing. It is <strong className="text-white">strategic scanning</strong>.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left my-8">
                                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        <h4 className="text-indigo-400 font-bold mb-2">Look For:</h4>
                                        <ul className="text-slate-300 text-sm leading-relaxed space-y-2 list-disc pl-4">
                                            <li>Headings and subheadings</li>
                                            <li>First and last paragraphs</li>
                                            <li>Key terms and bold text</li>
                                            <li>Italics, diagrams, charts</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                                        <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4" /> The Goal</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">Well-written material is structured to help you. You just need to learn how to see it. By doing this, you tell your brain exactly what is important before you begin.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Decide What Deserves Depth */}
                    {step === 5 && (
                        <Slide key="depth" title="Decide What Deserves Depth" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <Layers className="w-6 h-6 text-indigo-400" /> Not all information is equal.
                                    </h4>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        You cannot read everything in depth. And you shouldn’t try. Your time isn’t unlimited.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Previewing helps you decide instantly what needs deep, concentrated focus, and what only needs a general, surface-level understanding.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: The 1-Minute Summary */}
                    {step === 6 && (
                        <Slide key="summary" title="The 1-Minute Summary" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/summary.png" alt="A notebook with a mind map next to a stopwatch" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        Start taking notes immediately.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Don't wait. After a quick scan, spend exactly 60 seconds drawing a simple mind map or writing a bulleted list of the core concepts you just found. 
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Messy notes are fine. Just getting it onto paper creates a physical representation of the mental structure you just built.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 7: Your Mission */}
                    {step === 7 && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Find a chapter of a textbook, or an article you intend to spend an hour learning from.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Before reading a single sentence of the main text, spend a few minutes mapping it out. Sketch the structure of the headings. Determine what needs deep focus.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Only after you have built this border should you begin to read.
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
                                    Today, we are returning to <strong className="text-indigo-400">Your Peripheral Vision</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        We are returning to the core mechanic of speed reading: seeing more words at once.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Lock your eyes onto the center of the text. Do not scan left and right. Relax your focus and let your peripheral vision catch the edges of the lines. Your visual processing is stronger today than it was on Day 1.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Zap className="w-5 h-5" /> Peripheral Expansion
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 9: 14-Day Reading Protocol (Day 5: Your Peripheral Vision) */}
                    {step === 9 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={8}
                                sequence={COURSE_CONTENT.find(d => d.day === 5)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 5)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Find a textbook chapter. Spend 1 minute mapping the headings and 1 minute writing a summary before reading."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay8SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay8SessionContent />
        </Suspense>
    );
}
