"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import SpeedTestCore from "@/components/test/SpeedTestCore";
import { ArrowRight } from "lucide-react";

export default function AfterTestPage() {
    const { user, updateStats } = useAuth();
    const [step, setStep] = useState<"test" | "results">("test");
    const [afterWpm, setAfterWpm] = useState(0);

    const WORD_COUNT = 153;

    const handleTestComplete = (resultWpm: number) => {
        setAfterWpm(resultWpm);
        updateStats({ afterWpm: resultWpm });
        setStep("results");
    };

    const introContent = (
        <>
            <p>
                You've completed the initial training. Now it's time to measure your <strong className="text-indigo-600">new reading speed</strong>.
            </p>
            <p>
                Remember the techniques:
                <br />
                - Soften your gaze (don't stare at individual words).
                <br />
                - Trust your peripheral vision.
                <br />
                - Break the habit of sub-vocalization (don't say the words in your head).
            </p>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-sm text-indigo-900 font-medium">
                Instruction: Read the text normally, but apply your new skills. Click <strong>"I'm Finished"</strong> immediately at the end.
            </div>
        </>
    );

    const readingContent = (
        <>
            <p>
                Flow state, often known as being 'in the zone', is a mental state of operation in which a person performing an activity is fully immersed in a feeling of energized focus, full involvement, and enjoyment in the process of the activity. In essence, flow is characterized by complete absorption in what one does, and a resulting loss in one's sense of space and time.
            </p>
            <p>
                Jeanne Nakamura and Csíkszentmihályi identify the following six factors as encompassing an experience of flow: intense and focused concentration on the present moment; merging of action and awareness; a loss of reflective self-consciousness; a sense of personal control or agency over the situation or activity; a distortion of temporal experience, one's subjective experience of time is altered; and experience of the activity as intrinsically rewarding, also referred to as autotelic experience.
            </p>
            <p>
                To achieve flow, a balance must be struck between the challenge of the task and the skill of the performer. If the task is too easy or too difficult, flow cannot occur.
            </p>
        </>
    );

    const beforeWpm = user?.beforeWpm || 0;
    const improvement = beforeWpm > 0 ? Math.round(((afterWpm - beforeWpm) / beforeWpm) * 100) : 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
            {step === "test" ? (
                <SpeedTestCore
                    title="Final Speed Test"
                    introContent={introContent}
                    readingContent={readingContent}
                    wordCount={WORD_COUNT}
                    onComplete={handleTestComplete}
                    confirmTitle="Your New Speed"
                    confirmText="Does this feel accurate?"
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-12 flex flex-col justify-center items-center text-center space-y-12 min-h-[600px]"
                >
                    <h2 className="text-4xl font-bold font-heading text-slate-800">Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {/* Before */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">Before Training</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-black text-slate-400">{beforeWpm}</span>
                                <span className="text-slate-400 font-bold text-sm">WPM</span>
                            </div>
                        </div>

                        {/* After */}
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 ring-4 ring-indigo-50 transform scale-110 shadow-lg relative z-10">
                            <h3 className="text-indigo-500 font-medium uppercase tracking-wider text-xs mb-2">After Training</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-6xl font-black text-indigo-600">{afterWpm}</span>
                                <span className="text-indigo-600 font-bold text-lg">WPM</span>
                            </div>
                        </div>

                        {/* Improvement */}
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex flex-col justify-center">
                            <h3 className="text-green-600 font-medium uppercase tracking-wider text-xs mb-2">Improvement</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-black text-green-600">+{improvement}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-xl space-y-6">
                        <p className="text-xl text-slate-700 leading-relaxed">
                            {improvement > 0
                                ? "Incredible work! You've successfully broken your old reading habits."
                                : "Good effort! It takes time to fully integrate these new habits. Keep practicing!"}
                        </p>
                        <p className="text-slate-500">
                            You can continue to improve by visiting the Gym for daily exercises.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/dashboard">
                            <button
                                className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                            >
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
