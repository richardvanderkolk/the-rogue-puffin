"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Target, BookOpen, Search, Network, PenTool } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function RogueDay10SessionContent() {
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
        if (10 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '11'); // Unlock day 11
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Intro */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 10: Genius Note-Taking" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Transcription is not learning.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    Most people take notes by writing down sentences exactly as they are spoken or written. This forces your brain into passive recording mode, rather than active synthesis mode.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: Transcription vs Mapping */}
                    {step === 1 && (
                        <Slide key="mapping" title="Linear Lists vs. Mind Maps" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/transcription.png" alt="A glowing mind map next to a boring notebook of text" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        Your brain does not store information in straight lines.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        It stores data in highly interconnected webs of associations. When you write bullet points or paragraphs, you are forcing a multi-dimensional idea into a one-dimensional format. Mind mapping allows you to draw the architecture of the concept exactly as your brain wants to see it.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: Keywords Only */}
                    {step === 2 && (
                        <Slide key="keywords" title="Keywords Only" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/images/keywords.png" alt="A magical, glowing keyword lifting off the page" className="w-full max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        Sentences hide the important concepts in a sea of fluff.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Words like "the," "and," "because," "is"—these carry zero memory weight. To take genius notes, you must extract only the heavy, dense <strong>Keywords</strong>. By using single words or tiny phrases on your mind map branches, you force your brain to actively rebuild the sentence during recall. This struggle is what solidifies memory.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: What is a Mind Map */}
                    {step === 3 && (
                        <Slide key="what-is" title="What is a Mind Map?" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <img src="/mind-map-example.png" alt="An example of a Mind Map" className="w-full rounded-2xl shadow-2xl border border-indigo-500/20 bg-white" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        A mind map places a central idea at the centre of the page and radiates outward.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Unlike linear notes, a mind map mirrors how your brain actually stores information: as a network of interconnected ideas.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        This gives you an instant visual overview of the whole subject. You can see how everything relates before diving into detail — something a list of notes can never provide.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: How to Build It */}
                    {step === 4 && (
                        <Slide key="how-to-build" title="How to Build a Mind Map" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <PenTool className="w-6 h-6 text-indigo-400" /> The Process
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">1</span>
                                            <p className="text-slate-300 pt-1"><strong>Central Topic:</strong> Write the main idea in the middle of a blank page (turn it sideways for maximum space).</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">2</span>
                                            <p className="text-slate-300 pt-1"><strong>Thick Branches:</strong> Draw thick branches radiating outward for each key sub-topic or category.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">3</span>
                                            <p className="text-slate-300 pt-1"><strong>Thin Branches:</strong> Add thinner branches from each sub-topic for examples, details, and questions.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">4</span>
                                            <p className="text-slate-300 pt-1"><strong>Keywords Only:</strong> Use single words or tiny phrases. The brain naturally fills in the context.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Your Mission */}
                    {step === 5 && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Recall the questions you wrote down for Day 9. As you read your text today, do not write down any sentences.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Instead, create a single-page <strong>Mind Map</strong>. Put the core topic in the center, draw branches for the main ideas, and only use <strong>keywords</strong> to answer your questions.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: Transition to Drill */}
                    {step === 6 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are starting <strong className="text-indigo-400">Your Eye Movement</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Now that your peripheral vision is wider and your inner voice is quieter, we need to train your eyes to move smoothly and rhythmically across the page.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Most untrained readers' eyes jerk and backtrack constantly. This drill uses a bouncing pacer. Do not try to read aloud. Let your eyes jump cleanly from highlight to highlight to build a smooth physical rhythm.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Zap className="w-5 h-5" /> Rhythmic Eye Movement
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 7: 14-Day Reading Protocol (Day 7: Your Eye Movement) */}
                    {step === 7 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={10}
                                sequence={COURSE_CONTENT.find(d => d.day === 7)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 7)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Create a keyword-only Mind Map to answer the questions from your reading."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay10SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay10SessionContent />
        </Suspense>
    );
}
