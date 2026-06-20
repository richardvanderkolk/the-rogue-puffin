"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Zap, Activity, MessageCircle, AlertTriangle, Lightbulb } from "lucide-react";
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

function RogueDay11SessionContent() {
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
        if (step === 5 && archetypes.length > 0 && !showVariant) {
            setShowVariant(true);
        } else {
            setShowVariant(false);
            setStep(s => s + 1);
        }
    };
    
    const prevStep = () => {
        if (showVariant) {
            setShowVariant(false);
        } else if (step === 6 && archetypes.length > 0) {
            setStep(s => Math.max(0, s - 1));
            setShowVariant(true);
        } else {
            setStep(s => Math.max(0, s - 1));
        }
    };

    const markCompleteAndReturn = async () => {
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (11 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '12');
        }
        try {
            await updateBootcampProgress(12);
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
                        <Slide key="intro" title="Day 11: The Feynman Technique" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Simplicity is Mastery.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    Richard Feynman was a Nobel Prize-winning physicist who believed that the ultimate test of understanding was being able to explain something simply — so simply that a child could follow it.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Core Concept */}
                    {step === 1 && (
                        <Slide key="simplicity" title="The Illusion of Knowledge" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <Image src="/images/simplicity.png" alt="A tangled ball of yarn being pulled into a single straight glowing thread" width={384} height={384} className="w-full h-auto max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6 italic">
                                        "If you can't explain it simply, you don't understand it well enough."
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        We often mistake recognition for understanding. When we read a textbook, the words make sense, so we assume we know the material. But when asked to explain it, we stumble.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        The Feynman Technique isn't a memorization hack. It is a ruthless test of genuine comprehension.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The 4 Steps */}
                    {step === 2 && (
                        <Slide key="feynman" title="The Four Steps" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <MessageCircle className="w-6 h-6 text-indigo-400" /> The Process
                                    </h4>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl font-bold text-indigo-500 font-heading shrink-0 pt-1">01</span>
                                            <div>
                                                <strong className="text-slate-200 text-lg block mb-1">Choose the concept</strong>
                                                <p className="text-slate-400">Write the name of the topic at the top of a blank page.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl font-bold text-indigo-500 font-heading shrink-0 pt-1">02</span>
                                            <div>
                                                <strong className="text-slate-200 text-lg block mb-1">Explain it to a child</strong>
                                                <p className="text-slate-400">Write out the concept as if teaching a 12-year-old. No jargon. Plain language only. This is the hard part.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl font-bold text-indigo-500 font-heading shrink-0 pt-1">03</span>
                                            <div>
                                                <strong className="text-slate-200 text-lg block mb-1">Identify the gaps</strong>
                                                <p className="text-slate-400">Wherever you hesitate or reach for technical language, your understanding is weak. Go back to the source material.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl font-bold text-indigo-500 font-heading shrink-0 pt-1">04</span>
                                            <div>
                                                <strong className="text-slate-200 text-lg block mb-1">Simplify and use analogies</strong>
                                                <p className="text-slate-400">Rewrite your explanation. Use stories. Connect the new concept to something the "child" already knows.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: The Danger of Jargon */}
                    {step === 3 && (
                        <Slide key="jargon" title="The Danger of Jargon" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-4xl mx-auto text-center">
                                <p className="text-xl text-slate-300 leading-relaxed font-light max-w-2xl mx-auto mb-8">
                                    Jargon is useful for experts, but when you are learning, over-reliance on technical language signals that you have memorized the vocabulary <strong className="text-white">without internalising the idea.</strong>
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                    <div className="p-6 bg-slate-900/40 border-l-4 border-rose-500 rounded-r-2xl">
                                        <h4 className="font-bold text-white mb-3 text-lg">Without Feynman</h4>
                                        <p className="text-slate-300 italic leading-relaxed">
                                            "Photosynthesis is the process by which photoautotrophs convert light energy into chemical energy stored in glucose via the Calvin cycle."
                                        </p>
                                        <p className="text-sm text-rose-400 mt-4 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" /> 
                                            Can you explain why that matters? What it looks like?
                                        </p>
                                    </div>
                                    <div className="p-6 bg-slate-900/40 border-l-4 border-emerald-500 rounded-r-2xl shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                        <h4 className="font-bold text-white mb-3 text-lg">With Feynman</h4>
                                        <p className="text-slate-300 italic leading-relaxed">
                                            "Plants are like solar panels that make their own food. They use sunlight to turn water and air into the sugars that power every cell in their body."
                                        </p>
                                        <p className="text-sm text-emerald-400 mt-4 flex items-center gap-2">
                                            <Lightbulb className="w-4 h-4" />
                                            Now you understand it, and could explain it to anyone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Facts vs Concepts */}
                    {step === 4 && (
                        <Slide key="active-recall" title="Facts vs Concepts" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        The Feynman Technique is Active Recall at its highest level.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                        Earlier in this bootcamp, we discussed Active Recall (testing yourself). But there are different depths of testing:
                                    </p>
                                    <ul className="space-y-4 my-6 text-white pl-4">
                                        <li className="flex items-start gap-3">
                                            <span className="text-indigo-500 font-bold w-24 shrink-0">Flashcards</span> 
                                            <span className="text-slate-300">Test whether you remember a specific <strong className="text-indigo-300">fact</strong>.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-indigo-500 font-bold w-24 shrink-0">Feynman</span> 
                                            <span className="text-slate-300">Tests whether you have truly understood a <strong className="text-indigo-300">concept</strong> deeply enough to rebuild it from scratch.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Your Mission */}
                    {step === 5 && !showVariant && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep} customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Learning Style'} Translation` : 'Next'}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Take the Mind Map you built yesterday. Stand up, hold it in your hands, and <strong>explain the entire concept out loud</strong> to an imaginary audience in your room.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Use only the keywords on your map as prompts. Speak entirely in simple, plain English. If you stumble or resort to jargon, you have found a gap. Go back and fix it.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5.5: Personalized Translation */}
                    {step === 5 && showVariant && activeArchetype && (
                        <Slide key="variant" title={`Your ${INTELLIGENCE_INFO[activeArchetype]?.title} Translation`} icon={<span className="text-4xl">{INTELLIGENCE_INFO[activeArchetype]?.icon}</span>} onNext={() => { setShowVariant(false); setStep(6); }} onBack={() => setShowVariant(false)} fullWidth>
                            <div className="w-full flex flex-col pb-8">
                                <div className="w-full relative z-0">
                                    <div
                                        className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white"
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('day-11-feynman', activeArchetype) }}
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

                    {/* Step 6: Transition to Drill */}
                    {step === 6 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are returning to <strong className="text-indigo-400">Your Confidence</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        As we approach the end of the bootcamp, the speeds of the drills are increasing significantly.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        It is very easy to tense up and become frustrated when you can't read every word. Today's drill is a reminder to relax, breathe, and maintain a state of confident flow. The comprehension will follow the speed in time.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Activity className="w-5 h-5" /> Learning Mindset
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

                    {/* Step 7: 14-Day Reading Protocol (Day 8: Your Confidence) */}
                    {step === 7 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={11}
                                sequence={COURSE_CONTENT.find(d => d.day === 8)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 8)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Stand up and explain your Mind Map out loud using simple, plain English."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay11SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay11SessionContent />
        </Suspense>
    );
}
