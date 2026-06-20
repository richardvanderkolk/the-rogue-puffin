"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Zap, Clock, Target, Rocket } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams, useRouter } from "next/navigation";
import { getArticleVariant } from "@/data/learningStyleVariants";
import { createClient } from "@/lib/supabase/client-ssr";
import { updateBootcampProgress } from "@/app/actions/progress";
import { useEffect } from "react";

const INTELLIGENCE_INFO: Record<string, { title: string; icon: string; color: string }> = {
    linguistic: { title: "Word Smart", icon: "📚", color: "indigo" },
    logical: { title: "Logic Smart", icon: "🧩", color: "teal" },
    visual: { title: "Picture Smart", icon: "🖼️", color: "amber" },
    kinesthetic: { title: "Body Smart", icon: "🏃", color: "orange" },
    musical: { title: "Music Smart", icon: "🎵", color: "pink" },
    interpersonal: { title: "People Smart", icon: "💬", color: "blue" },
    intrapersonal: { title: "Self Smart", icon: "🧘", color: "purple" },
    naturalistic: { title: "Nature Smart", icon: "🌿", color: "emerald" }
};

function RogueDay13SessionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const course = searchParams.get('course') || 'bootcamp';
    
    // The bootcamp URL logic
    const dashboardUrl = '/bootcamp?unlocked=true';

    const [step, setStep] = useState(0);
    const [showVariant, setShowVariant] = useState(false);
    const [archetypes, setArchetypes] = useState<string[]>([]);
    const [activeArchetype, setActiveArchetype] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchArchetype = async () => {
            const local = localStorage.getItem('rogue_superpowers');
            if (local) {
                try {
                    const parsed = JSON.parse(local);
                    if (parsed && parsed.length > 0) {
                        setArchetypes(parsed);
                        setActiveArchetype(parsed[0]);
                    }
                } catch (e) {}
            }

            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('learning_archetype').eq('id', user.id).single();
                if (data && data.learning_archetype) {
                    setArchetypes([data.learning_archetype]);
                    setActiveArchetype(data.learning_archetype);
                }
            }
        };
        fetchArchetype();
    }, []);

    const nextStep = () => {
        if (step === 3 && archetypes.length > 0 && !showVariant) {
            setShowVariant(true);
        } else {
            setShowVariant(false);
            setStep(s => s + 1);
        }
    };
    
    const prevStep = () => {
        if (showVariant) {
            setShowVariant(false);
        } else if (step === 4 && archetypes.length > 0) {
            setStep(s => Math.max(0, s - 1));
            setShowVariant(true);
        } else {
            setStep(s => Math.max(0, s - 1));
        }
    };

    const markCompleteAndReturn = async () => {
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (13 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '14');
        }
        try {
            await updateBootcampProgress(14);
        } catch (error) {
            console.error('Failed to update progress:', error);
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: Intro */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 13: Time & Deadlines" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    You cannot manage time.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    You can save and stockpile money, but you can’t save time. We all have the exact same amount. We can only manage ourselves in the time we have.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: Parkinson's Law */}
                    {step === 1 && (
                        <Slide key="parkinson" title="The Parkinson's Trap" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <div className="w-full max-w-sm rounded-2xl p-8 bg-slate-900/80 border border-slate-800 shadow-[0_0_30px_rgba(79,70,229,0.1)] flex items-center justify-center">
                                        <Clock className="w-32 h-32 text-rose-500/80" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6 italic">
                                        "Work expands so as to fill the time which is available for its completion."
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        If you have a week to write an essay, it takes a week. If you have a month, it takes a month. And almost always, the actual work is done the day before the deadline.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        This is Parkinson's Law. Without strict limits, your time and attention will be consumed by procrastination and trivial details.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Antidote */}
                    {step === 2 && (
                        <Slide key="antidote" title="The Antidote" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-emerald-500/30 rounded-2xl bg-emerald-900/10 text-left">
                                    <h4 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                                        <Target className="w-6 h-6" /> Artificial Deadlines
                                    </h4>
                                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                        To defeat Parkinson's Law, you must change how you set constraints.
                                    </p>
                                    <div className="p-6 bg-slate-900/60 border-l-4 border-emerald-500 rounded-r-xl my-6">
                                        <p className="text-lg text-white font-medium">
                                            Give yourself a deadline that is not determined by how much time you <em>have</em>, but by how long it <em>should take</em>.
                                        </p>
                                    </div>
                                    <p className="text-lg text-slate-400 leading-relaxed mt-6">
                                        This changes the entire psychological game. You move from dragging your effort out to fit a bloated timeline, to executing efficiently against a strict, self-imposed constraint.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Your Mission */}
                    {step === 3 && !showVariant && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep} customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Learning Style'} Translation` : 'Next'}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                                        Pick one learning task you need to accomplish today.
                                    </p>
                                    <ul className="space-y-4 my-6 text-white font-medium pl-4">
                                        <li className="flex items-center gap-3"><span className="text-indigo-500 text-2xl">•</span> Decide exactly how long it <em>should</em> take.</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500 text-2xl">•</span> Cut that time by 20%.</li>
                                        <li className="flex items-center gap-3"><span className="text-indigo-500 text-2xl">•</span> Set a timer, and race the clock.</li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3.5: Personalized Translation */}
                    {step === 3 && showVariant && activeArchetype && (
                        <Slide key="variant" title={`Your ${INTELLIGENCE_INFO[activeArchetype]?.title} Translation`} icon={<span className="text-4xl">{INTELLIGENCE_INFO[activeArchetype]?.icon}</span>} onNext={() => { setShowVariant(false); setStep(4); }} onBack={() => setShowVariant(false)} fullWidth>
                            <div className="w-full flex flex-col pb-8">
                                <div className="w-full relative z-0">
                                    <div
                                        className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white"
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('day-13-parkinsons', activeArchetype) }}
                                    />
                                </div>
                                {archetypes.length > 1 && (
                                    <div className="mt-12 pt-8 border-t border-slate-800">
                                        <p className="text-sm text-slate-500 font-medium mb-4 text-center uppercase tracking-widest">Also highly compatible with your secondary learning styles:</p>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {archetypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setActiveArchetype(type)}
                                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                                                        activeArchetype === type
                                                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                                                            : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
                                                    }`}
                                                >
                                                    <span>{INTELLIGENCE_INFO[type]?.icon}</span>
                                                    {INTELLIGENCE_INFO[type]?.title.split(' (')[0]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Transition to Drill */}
                    {step === 4 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are returning to <strong className="text-indigo-400">Kinetic Words</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Just 2 days left. We are throwing extreme kinetic speeds at you today to completely bypass auditory processing.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Do not try to read the words in your head. The text will flash so fast that if you try to speak it, you will fail. Just let your eyes process the shapes of the words.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Rocket className="w-5 h-5" /> Extreme Kinetic Speed
                                    </div>
                                </div>
                            
                                <div className="mt-12 pt-8">
                                    <button 
                                        onClick={markCompleteAndReturn} 
                                        className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 underline underline-offset-4 transition-colors"
                                    >
                                        Skip today's drill and return to dashboard
                                    </button>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: 14-Day Reading Protocol (Day 10: Kinetic Words) */}
                    {step === 5 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={13}
                                sequence={COURSE_CONTENT.find(d => d.day === 10)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 10)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Pick one task, decide how long it should take, cut the time by 20%, and race the clock."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay13SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay13SessionContent />
        </Suspense>
    );
}
