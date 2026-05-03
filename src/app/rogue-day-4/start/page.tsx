"use client";

import { useState, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Target, Search, ArrowRight, Zap, CheckCircle, Eye, Sparkles } from "lucide-react";
import { Slide } from "@/components/onboarding/ConceptSlides";
import SessionPlayer from '@/components/train/SessionPlayer';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useSearchParams } from "next/navigation";
import { getArticleVariant } from "@/data/learningStyleVariants";
import { createClient } from "@/lib/supabase/client-ssr";
import { updateBootcampProgress } from "@/app/actions/progress";

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

function RogueDay4SessionContent() {
    const searchParams = useSearchParams();
    const course = searchParams.get('course') || 'bootcamp';
    
    // The bootcamp URL logic
    const dashboardUrl = '/bootcamp?unlocked=true';
    const dashboardText = 'Return to Bootcamp';

    const [step, setStep] = useState(0);
    const [userWhy, setUserWhy] = useState("");
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
        if (step === 8 && archetypes.length > 0 && !showVariant) {
            setShowVariant(true);
        } else {
            setShowVariant(false);
            setStep(s => s + 1);
        }
    };
    
    const prevStep = () => {
        if (showVariant) {
            setShowVariant(false);
        } else if (step === 9 && archetypes.length > 0) {
            setStep(s => Math.max(0, s - 1));
            setShowVariant(true);
        } else {
            setStep(s => Math.max(0, s - 1));
        }
    };

    const markCompleteAndReturn = async () => {
        localStorage.setItem('rogue_day_progress', '5');
        try {
            await updateBootcampProgress(5);
        } catch (error) {
            console.error('Failed to update progress:', error);
        }
        window.location.href = dashboardUrl;
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-32 pb-12 px-6 bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
            <div className="max-w-3xl w-full flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* Step 0: Welcome to the new paradigm */}
                    {step === 0 && (
                        <Slide key="intro" title="Phase 2 Begins" onNext={nextStep} customButtonText="Continue" fullWidth>
                            <div className="space-y-6 max-w-5xl mx-auto w-full text-center">
                                <p className="text-xl text-slate-200">
                                    For the next 11 days, your training shifts into a new rhythm.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-left space-y-4">
                                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">1. Learning Mastery Lesson</h3>
                                        <p className="text-slate-400">First, we will build your cognitive frameworks. You will learn the psychology and strategy behind becoming a genius-level learner.</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-left space-y-4">
                                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">2. Speed Reading Exercise</h3>
                                        <p className="text-slate-400">Second, we will expand your physical capability. Daily drills will push your visual processing speed so the changes become permanent.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: Know Your Why (Concept) */}
                    {step === 1 && (
                        <Slide key="why-1" title="Know Your Why" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
                                <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(99,102,241,0.15)] shrink-0">
                                    <img src="/images/compass_anchor.png" alt="Know Your Why" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-slate-950 via-slate-950/20 to-transparent" />
                                </div>
                                <div className="w-full md:w-1/2 space-y-8">
                                    <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 space-y-6 text-left shadow-xl backdrop-filter backdrop-blur-md">
                                        <p className="text-2xl font-serif italic text-slate-300">
                                            "He who has a why to live for can bear almost any how."
                                        </p>
                                        <p className="text-indigo-400 font-bold">— Friedrich Nietzsche</p>
                                    </div>
                                    <p className="text-lg text-slate-300 leading-relaxed text-left">
                                        Before we build complex learning systems, we must find your True North. Why are you learning the subject in front of you?
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Medical School Study */}
                    {step === 2 && (
                        <Slide key="why-study" title="The Difference Between Success & Burnout" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="space-y-8 max-w-5xl mx-auto w-full">
                                <p className="text-xl text-slate-300 leading-relaxed text-center max-w-3xl mx-auto">
                                    A 2020 study of undergraduate medical students investigated why some thrive in grueling environments while others burn out.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-rose-500/30 text-left relative overflow-hidden group hover:bg-slate-800 transition-colors shadow-lg">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none" />
                                        <div className="flex items-center gap-4 mb-6 relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shrink-0">
                                                <Target className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white">The Path to Exhaustion</h4>
                                        </div>
                                        <p className="text-lg text-slate-300 italic leading-relaxed relative z-10">
                                            "Students who were trying to pass exams or meet family expectations were significantly more likely to experience exhaustion."
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden group hover:bg-slate-800 transition-colors shadow-lg">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none" />
                                        <div className="flex items-center gap-4 mb-6 relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white">The Path to Success</h4>
                                        </div>
                                        <p className="text-lg text-slate-300 italic leading-relaxed relative z-10">
                                            "Those with a deep, internal fascination with healing achieved higher sustained performance."
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="pt-8 max-w-2xl mx-auto">
                                    <div className="p-6 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl">
                                        <p className="text-xl text-indigo-300 font-bold text-center">
                                            When your reason is strong enough, effort feels purposeful.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: The Two Motivators */}
                    {step === 3 && (
                        <Slide key="why-2" title="The Two Motivators" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-4 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">There are two types of motivation that drive learning:</p>
                                
                                <div className="grid gap-4">
                                    <div className="bg-slate-900/50 p-5 rounded-xl border border-rose-500/30 border-l-4 border-l-rose-500">
                                        <h3 className="text-xl font-bold text-rose-400 mb-2">Extrinsic (External)</h3>
                                        <p className="text-slate-300 mb-2">"I have to pass this exam." "My boss told me to."</p>
                                        <p className="text-sm text-slate-400">This creates friction. You are relying on willpower, which depletes over time.</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-5 rounded-xl border border-emerald-500/30 border-l-4 border-l-emerald-500">
                                        <h3 className="text-xl font-bold text-emerald-400 mb-2">Intrinsic (Internal)</h3>
                                        <p className="text-slate-300 mb-2">"I am genuinely curious how this works." "This solves a problem I care about."</p>
                                        <p className="text-sm text-slate-400">This creates flow. Curiosity outlasts obligation every single time.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: A Simple Exercise */}
                    {step === 4 && (
                        <Slide key="why-exercise" title="A Simple Exercise" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300 mb-6">
                                    Take a blank page and follow these steps. Don't rush it.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-indigo-300 font-bold shrink-0">1</span>
                                        <p className="text-white font-medium pt-1">Ask: <em className="text-indigo-300">Why am I learning this?</em> and write it down.</p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-indigo-300 font-bold shrink-0">2</span>
                                        <p className="text-white font-medium pt-1">Then ask: <em className="text-indigo-300">Why does that matter?</em></p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-indigo-300 font-bold shrink-0">3</span>
                                        <p className="text-white font-medium pt-1">Repeat this process 4–5 times.</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <textarea
                                        value={userWhy}
                                        onChange={(e) => setUserWhy(e.target.value)}
                                        placeholder="Type your why here..."
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-inner shadow-slate-950/50"
                                        rows={4}
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
                                <div className="mt-4 p-5 bg-slate-900/50 rounded-xl border border-indigo-500/30">
                                    <p className="font-bold text-indigo-300 text-center">
                                        At some point you will reach something real or you will realize you don't yet have a strong reason. Both are useful.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: Your Why Brings Order */}
                    {step === 5 && (
                        <Slide key="why-order" title="Your Why Brings Order" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    A clear "why" does something quietly powerful: it simplifies decisions.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="p-5 border border-slate-800 rounded-xl bg-slate-900/30">
                                        <h4 className="text-rose-400 font-bold mb-2">Without a Why</h4>
                                        <p className="text-slate-400 text-sm">Everything feels equally important. You drift between tasks and react instead of choose.</p>
                                    </div>
                                    <div className="p-5 border border-indigo-500/30 rounded-xl bg-indigo-900/10">
                                        <h4 className="text-indigo-400 font-bold mb-2">With a Why</h4>
                                        <p className="text-slate-400 text-sm">You know what matters. You filter distractions and stay consistent.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: When The Why Isn't There */}
                    {step === 6 && (
                        <Slide key="why-not-there" title="When The Why Isn't There" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    Sometimes the honest answer is: <em>"I don't know why this matters to me."</em>
                                </p>
                                <p className="text-slate-400">
                                    That's not a failure. It's clarity. It gives you two options:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-indigo-300">
                                    <li>Find a better reason.</li>
                                    <li>Reconsider whether this is worth pursuing.</li>
                                </ul>
                                <div className="mt-8 p-5 border border-slate-800 rounded-xl bg-slate-900/50 flex items-center gap-4">
                                    <BookOpen className="w-8 h-8 text-slate-500 shrink-0" />
                                    <div>
                                        <h4 className="text-white font-bold">Recommended Reading</h4>
                                        <p className="text-sm text-slate-400">Viktor Frankl's <em>Man's Search for Meaning</em> doesn't give a quick answer, but it sharpens the question.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 7: Using AI to Clarify Your Why */}
                    {step === 7 && (
                        <Slide key="why-ai" title="Using AI to Clarify Your Why" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    Most people use AI to summarize information. But it can also help you think more clearly.
                                </p>
                                <div className="rounded-xl overflow-hidden border border-slate-800">
                                    <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Try These AI Prompts</p>
                                    </div>
                                    <div className="p-6 bg-slate-950/50 space-y-6">
                                        <div>
                                            <p className="text-indigo-300 font-bold mb-1">For deep probing:</p>
                                            <p className="text-slate-300 italic">"Help me identify a deeper reason for learning this by asking me a series of 'why' questions."</p>
                                        </div>
                                        <div>
                                            <p className="text-indigo-300 font-bold mb-1">For discovering long-term value:</p>
                                            <p className="text-slate-300 italic">"Based on this subject, what are meaningful long-term reasons someone might care about understanding it?"</p>
                                        </div>
                                        <div>
                                            <p className="text-indigo-300 font-bold mb-1">If you think better through conversation:</p>
                                            <p className="text-slate-300 italic">"Walk me through a dialogue that helps me discover my real motivation for learning this."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 8: Refine Your Why */}
                    {step === 8 && !showVariant && (
                        <Slide key="why-refine" title="Refine Your Why" onNext={nextStep} onBack={prevStep} customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Superpower'} Translation` : 'Next'}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <p className="text-lg text-slate-300">
                                    Before we move to physical training, take a moment to review and refine your reason based on everything we just covered. 
                                </p>
                                <textarea
                                    value={userWhy}
                                    onChange={(e) => setUserWhy(e.target.value)}
                                    placeholder="I am learning this because..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none shadow-inner shadow-slate-950/50"
                                    rows={5}
                                />
                                <p className="text-sm text-slate-500 text-center">
                                    When this feels true to you, click Next.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 8.5: Personalized Translation */}
                    {step === 8 && showVariant && activeArchetype && (
                        <Slide key="variant" title={`Your ${INTELLIGENCE_INFO[activeArchetype]?.title} Translation`} icon={<Sparkles className="w-12 h-12 text-indigo-400" />} onNext={() => { setShowVariant(false); setStep(9); }} onBack={() => setShowVariant(false)} fullWidth>
                            <div className="w-full flex flex-col pb-8">
                                <div className="w-full relative z-0">
                                    <div
                                        className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white"
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('day-4-know-your-why', activeArchetype) }}
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

                    {/* Step 9: Transition to Drill */}
                    {step === 9 && (
                        <Slide key="transition" title="Reading Drill" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-6 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Your cognitive compass is set.
                                </p>
                                <p className="text-xl text-slate-400">
                                    Now, it is time to expand your physical capacity with today's speed reading drill.
                                </p>
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

                    {/* Step 10: 14-Day Reading Protocol (Day 1) */}
                    {step === 10 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={4}
                                sequence={COURSE_CONTENT.find(d => d.day === 1)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 1)!.content}
                                onComplete={markCompleteAndReturn}
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay4SessionPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading session...</div>}>
            <RogueDay4SessionContent />
        </Suspense>
    );
}
