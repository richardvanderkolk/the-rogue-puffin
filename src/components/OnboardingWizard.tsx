"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, ArrowRight, Brain, Eye, Zap, Repeat } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
    {
        id: "trap",
        title: "The Trap",
        subtitle: "School taught you to read like you speak.",
        text: "You likely 'say' every word in your head as you read. This is called **Sub-vocalization**.\n\nIt limits your reading speed to your talking speed (approx. 150-200 wpm).",
        icon: <Brain className="w-12 h-12 text-pink-500" />,
        mascotVariant: "standard", // Placeholder for specific emotion
        color: "from-pink-500/20 to-purple-500/5",
    },
    {
        id: "drift",
        title: "The Drift",
        subtitle: "Your eyes wander and look back.",
        text: "Unsure of what you just read, your eyes dart back to check. This is **Regression**.\n\nIt breaks your flow and kills your momentum.",
        icon: <Repeat className="w-12 h-12 text-amber-500" />,
        mascotVariant: "standard",
        color: "from-amber-500/20 to-orange-500/5",
    },
    {
        id: "fixation",
        title: "The Fixation",
        subtitle: "You stare at one word at a time.",
        text: "Your eyes stop on every single word. This is inefficient.\n\nYour brain can snap a picture of 3-5 words at once using **Peripheral Vision**.",
        icon: <Eye className="w-12 h-12 text-cyan-500" />,
        mascotVariant: "headshot",
        color: "from-cyan-500/20 to-blue-500/5",
    },
    {
        id: "unlock",
        title: "The Unlock",
        subtitle: "The Rogue Puffin breaks the rules.",
        text: "We are going to force your eyes to move faster than your inner voice.\n\nIt will feel fast. It will feel chaotic. **That means it's working.**",
        icon: <Zap className="w-12 h-12 text-yellow-400" />,
        mascotVariant: "standard",
        color: "from-yellow-500/20 to-amber-500/5",
    },
];

export function OnboardingWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep((prev) => prev + 1);
        } else {
            router.push("/train/concepts");
        }
    };

    const isLastSlide = currentStep === STEPS.length;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-6">

            {/* Progress Indicators */}
            <div className="absolute top-8 flex gap-2 z-20">
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            i === currentStep ? "bg-indigo-500 w-8" : "bg-slate-800"
                        )}
                    />
                ))}
                <div
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        isLastSlide ? "bg-indigo-500 w-8" : "bg-slate-800"
                    )}
                />
            </div>

            <AnimatePresence mode="wait">
                {isLastSlide ? (
                    /* Final Call to Action Slide */
                    <motion.div
                        key="final"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex flex-col items-center text-center max-w-2xl z-10 space-y-8"
                    >
                        <Mascot size={300} className="drop-shadow-2xl" />

                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold font-heading text-white">
                                Ready to Fly?
                            </h1>
                            <p className="text-xl text-slate-400">
                                Your first session takes just 15 minutes. <br />
                                Let's silence that inner voice.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/train/concepts")}
                            className="group relative px-10 py-5 bg-white text-slate-950 font-bold text-xl rounded-full hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                        >
                            Start Concepts <Play className="w-6 h-6 fill-slate-950 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                ) : (
                    /* Educational Slides */
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl w-full z-10"
                    >
                        {/* Visual Side */}
                        <div className="flex-1 flex justify-center order-1 md:order-none">
                            <div className={cn(
                                "relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center bg-gradient-to-br backdrop-blur-3xl",
                                STEPS[currentStep].color
                            )}>
                                <Mascot size={250} variant={STEPS[currentStep].mascotVariant === "headshot" ? "headshot" : "standard"} />

                                {/* Floating Icon Badge */}
                                <div className="absolute -top-4 -right-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl animate-bounce duration-[3000ms]">
                                    {STEPS[currentStep].icon}
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase">
                                    Barrier #{currentStep + 1}
                                </h2>
                                <h1 className="text-4xl md:text-6xl font-bold font-heading text-white">
                                    {STEPS[currentStep].title}
                                </h1>
                                <p className="text-xl md:text-2xl text-indigo-400 font-medium">
                                    {STEPS[currentStep].subtitle}
                                </p>
                            </div>

                            <div className="prose prose-lg prose-invert text-slate-400 leading-relaxed md:pr-12">
                                {/* Quick markdown-like parser for bold text */}
                                {STEPS[currentStep].text.split("\n\n").map((paragraph, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{
                                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>')
                                    }} />
                                ))}
                            </div>

                            <div className="pt-4 flex justify-center md:justify-start">
                                <button
                                    onClick={handleNext}
                                    className="group flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
                                >
                                    {currentStep === STEPS.length - 1 ? "How it works" : "Next"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
