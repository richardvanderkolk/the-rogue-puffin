"use client";

import { useState, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Zap } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";

function TimerExerciseSlide({ title, instruction, duration, onNext, onBack }: { title: string, instruction: string, duration: number, onNext: () => void, onBack?: () => void }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <Slide key={title} title={title} onNext={onNext} onBack={onBack} customButtonText={timeLeft > 0 ? `Wait (${formatTime(timeLeft)})` : "Continue"} nextDisabled={timeLeft > 0}>
            <div className="space-y-8 max-w-2xl mx-auto text-center flex flex-col items-center">
                <p className="text-xl text-slate-300">
                    {instruction}
                </p>
                <div className="flex flex-col items-center">
                    <div className="text-6xl md:text-8xl font-mono font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] my-12">
                        {formatTime(timeLeft)}
                    </div>
                    
                    {/* Skip Button */}
                    {timeLeft > 0 && (
                        <button 
                            onClick={() => setTimeLeft(0)}
                            className="text-sm text-slate-500 hover:text-slate-300 font-sans tracking-normal underline transition-colors"
                        >
                            Skip Timer
                        </button>
                    )}
                </div>
                <p className="text-slate-500 text-sm mt-8">
                    {timeLeft > 0 ? "Focus on this feeling until the timer completes." : "You may now proceed."}
                </p>
            </div>
        </Slide>
    );
}

function RogueDay5SessionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const course = searchParams.get('course') || 'bootcamp';
    
    // The bootcamp URL logic
    const dashboardUrl = '/v2/bootcamp?unlocked=true';

    const [step, setStep] = useState(0);
    const [userMindset, setUserMindset] = useState("");

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    const markCompleteAndReturn = () => {
        // Mock persistence
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (5 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '6'); // Unlock day 6
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: The New Paradigm */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 5: A Learning Mindset" onNext={nextStep}>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Your learning doesn't begin with a book.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    It begins with your mind. What you believe about yourself shapes everything that follows.
                                </p>
                                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 mt-8">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Today's Protocol</h4>
                                    <ul className="text-slate-400 space-y-2 text-left w-max mx-auto">
                                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400" /> 1. Learning Mastery: The Right Mindset</li>
                                        <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-rose-400" /> 2. Physical Drill: Kinetic Words</li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: A Story About What We Believe */}
                    {step === 1 && (
                        <Slide key="mindset-1" title="A Story About What We Believe" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    In the 1960s, a study was carried out in a primary school. Teachers were told that certain students had been identified as "academic bloomers" who would show significant intellectual growth.
                                </p>
                                <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-500/30">
                                    <p className="text-slate-300 italic mb-4">
                                        The catch? The students had been chosen completely at random. There was nothing different about them.
                                    </p>
                                    <p className="text-slate-300 italic text-indigo-200 font-medium">
                                        And yet, by the end of the year, those exact students did show significantly greater progress. Not because of intelligence. Because of expectation.
                                    </p>
                                </div>
                                <p className="text-slate-400 text-sm text-center">
                                    The teachers unconsciously expected better, and the students unconsciously lived up to it.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: What This Means for You */}
                    {step === 2 && (
                        <Slide key="mindset-2" title="What This Means for You" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    You don't have that teacher standing over you. But you do have something just as powerful:
                                </p>
                                <p className="text-xl text-indigo-300 font-bold text-center my-6">
                                    The way you speak to yourself before you begin.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/30">
                                        <h4 className="text-rose-400 font-bold mb-2 flex items-center gap-2">Hesitation</h4>
                                        <ul className="text-slate-400 text-sm space-y-2">
                                            <li>"I'm not great at this."</li>
                                            <li>"This is going to be hard."</li>
                                            <li>"I probably won't understand it."</li>
                                        </ul>
                                    </div>
                                    <div className="p-5 border border-indigo-500/30 rounded-xl bg-indigo-900/10">
                                        <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">Readiness</h4>
                                        <ul className="text-slate-400 text-sm space-y-2">
                                            <li>"I can figure this out."</li>
                                            <li>"There's something here for me."</li>
                                            <li>"I'm ready to engage."</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-center font-medium text-white mt-4 text-lg">
                                    The difference is not intelligence. It's posture.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Confidence and Curiosity */}
                    {step === 3 && (
                        <Slide key="mindset-3" title="The Shift: Confidence & Curiosity" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(99,102,241,0.15)] mb-8">
                                    <img src="/images/magical_lightbulb.png" alt="Intrinsic Motivation" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                </div>
                                <p className="text-lg text-slate-300 mt-8">
                                    If you want to learn well, you don't need hype or pressure. You need two things:
                                </p>
                                
                                <div className="space-y-4 my-6">
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500">
                                        <h3 className="text-xl font-bold text-emerald-400 mb-2">Confidence</h3>
                                        <p className="text-slate-300">"I can grow into this—even if it's unfamiliar."</p>
                                        <p className="text-sm text-slate-400 mt-2">When you begin with Confidence, your brain becomes more open and less defensive.</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 border-l-4 border-l-indigo-500">
                                        <h3 className="text-xl font-bold text-indigo-400 mb-2">Curiosity</h3>
                                        <p className="text-slate-300">"There's something here worth discovering."</p>
                                        <p className="text-sm text-slate-400 mt-2">When you begin with Curiosity, your attention sharpens and engagement increases.</p>
                                    </div>
                                </div>
                                
                                <p className="text-lg text-slate-300 font-medium text-center">
                                    When those two are present, you move from resistance to exploration.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Remember Confidence (Timer) */}
                    {step === 4 && (
                        <TimerExerciseSlide
                            key="confidence-timer"
                            title="Remember Confidence"
                            instruction="Think back to a time when you felt deeply confident and certain. Let your body remember how it felt. Close your eyes if it helps."
                            duration={120}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {/* Step 5: Remember Curiosity (Timer) */}
                    {step === 5 && (
                        <TimerExerciseSlide
                            key="curiosity-timer"
                            title="Remember Curiosity"
                            instruction="Think of a time when you were genuinely curious and wanted to explore without being forced. Bring that same feeling back now."
                            duration={120}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}

                    {/* Step 6: Apply to Your Goals */}
                    {step === 6 && (
                        <Slide key="mindset-refine" title="Set Your Expectation" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    Think of a specific subject, skill, or project you are currently trying to learn. With this new posture of confidence and curiosity, what expectation are you setting for yourself?
                                </p>
                                <textarea
                                    value={userMindset}
                                    onChange={(e) => setUserMindset(e.target.value)}
                                    placeholder="I am currently learning [topic]. My expectation is that I will..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-inner shadow-slate-950/50"
                                    rows={4}
                                />
                                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 mt-4">
                                    <p className="text-sm text-slate-400 italic text-center">
                                        "Whether you think you can, or you think you can't – you're right." — Henry Ford
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 7: Transition to Drill */}
                    {step === 7 && (
                        <Slide key="transition" title="Physical Training" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Your mindset is primed.
                                </p>
                                <p className="text-xl text-slate-400">
                                    Today's drill is <strong className="text-indigo-400">Kinetic Words</strong>. We will push words onto the screen faster than your inner voice can speak them.
                                </p>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-rose-400 font-bold bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
                                        <Zap className="w-5 h-5" /> Sub-vocalization Breaking
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 8: 14-Day Reading Protocol (Day 2) */}
                    {step === 8 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={5}
                                sequence={COURSE_CONTENT.find(d => d.day === 2)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 2)!.content}
                                onComplete={markCompleteAndReturn}
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay5SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay5SessionContent />
        </Suspense>
    );
}
