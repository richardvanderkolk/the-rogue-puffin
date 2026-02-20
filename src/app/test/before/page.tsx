"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import SpeedTestCore from "@/components/test/SpeedTestCore";
import { ArrowRight } from "lucide-react";

export default function SpeedTestWizard() {
    const { updateStats } = useAuth();
    const [step, setStep] = useState<"test" | "results">("test");
    const [wpm, setWpm] = useState(0);

    const WORD_COUNT = 99;

    const handleTestComplete = (resultWpm: number) => {
        setWpm(resultWpm);
        updateStats({ beforeWpm: resultWpm });
        setStep("results");
    };

    const introContent = (
        <>
            <p>
                We're starting by measuring your <strong className="text-indigo-600">current normal reading speed</strong>.
            </p>
            <p>
                This is <span className="underline decoration-indigo-300 decoration-2 underline-offset-2">not</span> a test to see how fast you CAN read, but how fast you <strong>DO</strong> read.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-left text-base text-amber-800 rounded-r">
                <strong>Important:</strong> If you try to speed read now, you will rob yourself of discovering how much your NORMAL reading speed improves in the next 30 minutes.
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-sm text-indigo-900 font-medium">
                Instruction: Once you start, click the <strong>"I'm Finished"</strong> button immediately after reading the very last word.
            </div>
        </>
    );

    const readingContent = (
        <>
            <p>
                The reading patterns that we learned at school were helpful to learn to read, but now they slow us down. We often focus on and vocalise every word in our mind, or move our eyes across the page in an ineffective way.
            </p>
            <p>
                These habits also increase the likelihood of re-reading passages because our minds wander, or we are uncertain about what we read.
            </p>
            <p>
                Learning to read faster is about learning how to take off the training wheels... breaking the limiting patterns that were helpful to get you started, but stop you from doing what you are already capable of.
            </p>
        </>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
            {step === "test" ? (
                <SpeedTestCore
                    title="Measuring Your Current Reading Speed"
                    introContent={introContent}
                    readingContent={readingContent}
                    wordCount={WORD_COUNT}
                    onComplete={handleTestComplete}
                    confirmTitle="Your Initial Speed"
                    confirmText="Does this feel like a fair representation of your normal reading speed?"
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 flex flex-col justify-center items-center text-center space-y-8 min-h-[600px]"
                >
                    <div className="bg-indigo-50 p-6 rounded-2xl w-full max-w-md">
                        <h3 className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">Baseline Established</h3>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl font-black text-slate-900">{wpm}</span>
                            <span className="text-slate-500 font-bold">WPM</span>
                        </div>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h2 className="text-3xl font-bold font-heading text-slate-900">
                            Now, let's double it.
                        </h2>
                        <p className="text-lg text-slate-600">
                            We're excited about seeing your reading speed increase by at least <strong>50-100%</strong> in the next 20 minutes!
                        </p>
                        <p className="text-slate-600">
                            Most people read at around 200-250 wpm because of habits like sub-vocalization. You are about to break those habits.
                        </p>
                    </div>

                    <Link href="/train/concepts" className="w-full text-center">
                        <button
                            className="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 mx-auto"
                        >
                            Start The Training
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
