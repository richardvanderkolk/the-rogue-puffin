"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Target } from "lucide-react";
import Image from "next/image";
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

function RogueDay7SessionContent() {
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
        if (7 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '8');
        }
        try {
            await updateBootcampProgress(8);
        } catch (error) {
            console.error('Failed to update progress:', error);
        }
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-32 pb-12 px-6">
            <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    
                    {/* Step 0: The Friction of Starting */}
                    {step === 0 && (
                        <Slide key="intro" title="Day 7: The Friction of Starting" onNext={nextStep}>
                            <div className="max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
                                        <Image src="/images/activation_energy.png" alt="Activation Energy" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/50 to-transparent pointer-events-none" />
                                    </div>
                                    <div className="space-y-6 text-left">
                                        <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                            The hardest part of any learning session is the first five minutes.
                                        </p>
                                        <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                            This is called 'Activation Energy'. Your brain naturally resists transitioning from a low-effort state (like scrolling or resting) to a high-effort state (like reading or studying).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Illusion of Procrastination */}
                    {step === 1 && (
                        <Slide key="illusion" title="The Illusion of Procrastination" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        We often mistake this initial friction for a lack of motivation or ability.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        You might think <span className="text-rose-300 italic">"I'm just not focused today"</span> or <span className="text-rose-300 italic">"This is too hard,"</span> when in reality, your brain is just experiencing the chemical resistance of shifting gears.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The 5-Minute Rule */}
                    {step === 2 && (
                        <Slide key="5-minute-rule" title="The 5-Minute Rule" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-xl text-slate-300">
                                    The secret to overcoming activation energy is to <strong className="text-white">lower the barrier to entry</strong>.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left my-8">
                                    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        <h4 className="text-rose-400 font-bold mb-2">The Mistake</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">Committing to a brutal 2-hour study session. Your brain perceives this as a massive threat to its energy reserves and creates intense resistance.</p>
                                    </div>
                                    <div className="p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                                        <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> The Solution</h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">Commit to focusing for exactly five minutes. Give yourself full permission to quit after five minutes if it's truly unbearable.</p>
                                    </div>
                                </div>

                                <p className="text-lg text-emerald-400 font-medium">
                                    90% of the time, once you cross that 5-minute threshold, momentum takes over and the friction disappears.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Your Mission */}
                    {step === 3 && !showVariant && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep} customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Superpower'} Translation` : 'Next'}>
                            <div className="space-y-8 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Right after you complete the reading exercise, commit to just <strong>5 minutes</strong> of studying your own material to test the '5-Minute Rule'.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        See how you feel once you cross that 5-minute threshold. Do not commit to more. Just start.
                                    </p>
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
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('day-7-activation-energy', activeArchetype) }}
                                    />
                                </div>
                                {archetypes.length > 1 && (
                                    <div className="mt-12 pt-8 border-t border-slate-800">
                                        <p className="text-sm text-slate-500 font-medium mb-4 text-center uppercase tracking-widest">Also highly compatible with your secondary superpowers:</p>
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
                                    Today, we are focusing on <strong className="text-indigo-400">Your Confidence</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        We are returning to the psychological foundation of your reading.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        You are going to read faster today than you ever have before. The only way to maintain your flow state at these speeds is through a relaxed, absolute confidence. Do not second-guess yourself. Trust your visual cortex to capture the text as you move forward.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Zap className="w-5 h-5" /> Confidence Expansion
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

                    {/* Step 5: 14-Day Reading Protocol (Day 4: Your Confidence) */}
                    {step === 5 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={7}
                                sequence={COURSE_CONTENT.find(d => d.day === 4)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 4)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Right now, go spend 5 minutes studying your own material to test the '5-Minute Rule'. You've got this!"
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay7SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay7SessionContent />
        </Suspense>
    );
}
