"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Gauge, Unlock, Volume2, RotateCcw, BrainCircuit, Zap, Clock, ArrowRight, Eye, Search } from "lucide-react";
import Link from "next/link";
import { Slide, IntroductionToFs, TrianglesExercise, PeripheralVisionSequence, NotEveryWordSlide, PeripheralVisionPrep } from "@/components/onboarding/ConceptSlides";

export default function ConceptWizard() {
    const [step, setStep] = useState(0);

    const steps = [
        { id: "intro_primary_school", type: "slide" },
        { id: "intro_change_gears", type: "slide" },
        { id: "intro_unlock", type: "slide" },

        // BARRIER 1: SUBVOCALIZATION
        { id: "vocalization_cat", type: "slide" },
        { id: "vocalization_stats", type: "slide" },
        { id: "fs_exercise", type: "interactive_fs" },

        // BARRIER 2: REGRESSION (Predicted by Triangles)
        { id: "triangles", type: "slide" },

        // BARRIER 3: FIXATION (Not Every Word)
        { id: "not_every_word", type: "slide" },

        // NEW PREP STEP
        { id: "peripheral_prep", type: "slide" },

        // BARRIER 4: TUNNEL VISION (PERIPHERAL DEMO)
        { id: "peripheral_vision", type: "demo" },

        // SOLUTION
        { id: "re_reading", type: "slide" },
        { id: "perception_speed", type: "slide" },
        { id: "change_pattern", type: "slide" },
        { id: "lets_do_this", type: "cta" },
        { id: "cta", type: "cta" }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const currentStep = steps[step];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
            <div className="max-w-3xl w-full">
                <AnimatePresence mode="wait">

                    {/* 1. PRIMARY SCHOOL HOOK */}
                    {currentStep.id === "intro_primary_school" && (
                        <Slide key="intro_primary_school" title="The Supercomputer Paradox" icon={<Brain className="w-12 h-12 text-indigo-400" />} onNext={nextStep}>
                            <p className="text-xl text-slate-300">You have the most powerful supercomputer in the known universe sitting between your ears.</p>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 my-4 shadow-2xl">
                                <p className="text-2xl font-bold text-white mb-3">"But you are running it on reading software installed when you were between six and twelve years old."</p>
                                <p className="text-lg text-slate-400 italic">You wouldn't drive a Ferrari in first gear. So why do you read like you're still in primary school?</p>
                            </div>
                            <p className="font-bold text-emerald-400 text-xl mt-2">It's time for an upgrade.</p>
                        </Slide>
                    )}

                    {/* 1.5 CHANGE GEARS */}
                    {currentStep.id === "intro_change_gears" && (
                        <Slide key="intro_change_gears" title="Trying Harder Doesn't Work" icon={<Gauge className="w-12 h-12 text-rose-400" />} onNext={nextStep}>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 my-4">
                                <p className="text-xl italic text-slate-300">"If you try to read faster using your current method, you won't understand what you are reading."</p>
                            </div>
                            <p className="text-lg text-slate-300">It's like trying to drive 100mph in first gear. The engine screams, but you don't go faster.</p>
                            <p className="text-xl font-bold text-white mt-4">We need to <span className="text-emerald-400">Change Gears</span>.</p>
                        </Slide>
                    )}

                    {/* 1.75 UNLOCK POTENTIAL */}
                    {currentStep.id === "intro_unlock" && (
                        <Slide key="intro_unlock" title="The Abilities You Already Have" icon={<Unlock className="w-12 h-12 text-amber-400" />} onNext={nextStep}>
                            <p className="text-xl text-slate-300">
                                Reading faster is more about learning to use the dormant abilities you already have...
                            </p>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 my-4">
                                <p className="text-2xl font-bold text-white">...the abilities that you are about to unlock.</p>
                            </div>
                        </Slide>
                    )}

                    {/* 2. C-A-T VISUALIZATION */}
                    {currentStep.id === "vocalization_cat" && (
                        <Slide key="vocalization_cat" title="We Learned By 'Sounding It Out'" icon={<Volume2 className="w-12 h-12 text-rose-400" />} onNext={nextStep} onBack={prevStep}>
                            <p>We start by sounding out words: C - A - T.</p>
                            <div className="flex items-center justify-center gap-4 my-8 text-4xl font-mono font-bold">
                                <span>C</span>
                                <span className="text-slate-600">-</span>
                                <span>A</span>
                                <span className="text-slate-600">-</span>
                                <span>T</span>
                                <ArrowRight className="text-slate-600" />
                                <span className="text-indigo-400">CAT</span>
                            </div>
                            <p>This creates a habit of "subvocalization"—an inner voice that reads everything aloud in your head.</p>
                            <p>This limits your reading speed to your speaking speed.</p>
                        </Slide>
                    )}

                    {/* 3. HEARING VS SEEING */}
                    {currentStep.id === "vocalization_stats" && (
                        <Slide key="vocalization_stats" title="The Speed Limit of Your Voice" icon={<Volume2 className="w-12 h-12 text-rose-400" />} onNext={nextStep}>
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

                    {/* 5. 13 Fs Sequence */}
                    {currentStep.id === "fs_exercise" && (
                        <IntroductionToFs onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* 8. TRIANGLES Sequence */}
                    {currentStep.id === "triangles" && (
                        <TrianglesExercise onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* 9. NOT EVERY WORD */}
                    {currentStep.id === "not_every_word" && (
                        <NotEveryWordSlide onNext={nextStep} />
                    )}

                    {/* 10. PERIPHERAL PREP */}
                    {currentStep.id === "peripheral_prep" && (
                        <PeripheralVisionPrep key="peripheral_prep" onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* 11. PERIPHERAL VISION SEQUENCE */}
                    {currentStep.id === "peripheral_vision" && (
                        <PeripheralVisionSequence onNext={nextStep} onBack={prevStep} />
                    )}

                    {/* 15. RE-READING */}
                    {currentStep.id === "re_reading" && (
                        <Slide key="re_reading" title="Why Do We Re-Read?" icon={<RotateCcw className="w-12 h-12 text-orange-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">Have you ever reached the bottom of a page and realized you have no idea what you just read?</p>
                                <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6 text-lg">
                                    <p className="text-slate-300">Our brains process much faster than our current reading speed—sometimes it gets bored because you are reading so slowly and it starts day dreaming.</p>
                                    <p className="text-white italic">"In the same way that your driving speed changes according to conditions, your reading speed changes according to your goal and distractions."</p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* 16. PERCEPTION OF SPEED */}
                    {currentStep.id === "perception_speed" && (
                        <Slide key="perception_speed" title="Perception Of Speed" icon={<Gauge className="w-12 h-12 text-red-500" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200 font-medium">What is comfortable to us is what we are used to.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                        <p className="text-slate-300">Driving at 60km/h feels fast until you've been on the highway. Then it feels incredibly slow.</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                        <p className="text-slate-300">It's like a heavy backpack. You get used to the weight, and taking it off makes you feel light.</p>
                                    </div>
                                </div>
                                <p className="text-lg text-emerald-400 font-semibold">We can train your brain to change its perception of reading speed.</p>
                            </div>
                        </Slide>
                    )}

                    {/* 17. CHANGE PATTERN */}
                    {currentStep.id === "change_pattern" && (
                        <Slide key="change_pattern" title="Change Your Habitual Pattern" icon={<BrainCircuit className="w-12 h-12 text-emerald-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <div className="bg-indigo-900/20 p-8 rounded-xl border border-indigo-500/30 space-y-6">
                                    <p className="text-xl text-white font-medium">To read faster you need to change your habitual pattern of reading.</p>
                                    <p className="text-slate-300 text-lg">It is not about trying to move your eyes faster in the same old pattern.</p>
                                </div>
                                <p className="text-lg text-slate-300 leading-relaxed">Our exercises will help you change your 'normal' reading speed <span className="text-emerald-400 font-bold">without even trying to read faster.</span></p>
                            </div>
                        </Slide>
                    )}

                    {/* 18. LET'S DO THIS */}
                    {currentStep.id === "lets_do_this" && (
                        <Slide key="lets_do_this" title="Are You Ready To Upgrade Your Brain?" icon={<Zap className="w-12 h-12 text-yellow-400" />} onNext={nextStep} onBack={prevStep} customButtonText="Start Training">
                            <div className="space-y-8 max-w-2xl mx-auto">
                                <p className="text-xl text-slate-200">We are going to start with some baseline measurements to see where you are starting from.</p>

                                <div className="grid grid-cols-1 gap-4 text-left">
                                    <div className="flex items-center gap-4 p-6 bg-slate-900/50 rounded-xl border border-slate-800 transition-all hover:border-indigo-500/50 group">
                                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                                            <Clock className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Reading Speed</h3>
                                            <p className="text-slate-400">Establish your starting words-per-minute.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-6 bg-slate-900/50 rounded-xl border border-slate-800 transition-all hover:border-purple-500/50 group">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                            <Brain className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Comprehension</h3>
                                            <p className="text-slate-400">Check how much information you retain.</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-400 italic">"How much is your time worth?"</p>
                            </div>
                        </Slide>
                    )}

                    {/* 19. CTA */}
                    {currentStep.id === "cta" && (
                        <motion.div
                            key="cta"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="text-center space-y-8"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                                Ready To <span className="text-indigo-400">Unlock</span> Your Supercomputer?
                            </h2>
                            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                                Join thousands of others who have doubled their reading speed and comprehension.
                            </p>

                            <Link href="/train/sales" className="w-full block">
                                <button className="w-full bg-white text-indigo-900 px-8 py-6 rounded-full font-bold text-2xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3">
                                    Click Here To Start
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </Link>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="fixed bottom-0 left-0 w-full h-2 bg-slate-900">
                <motion.div
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
            </div>
        </div>
    );
}

