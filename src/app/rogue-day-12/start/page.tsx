"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Zap, Calendar, RefreshCw, Layers } from "lucide-react";
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

function RogueDay12SessionContent() {
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
        if (step === 4 && archetypes.length > 0 && !showVariant) {
            setShowVariant(true);
        } else {
            setShowVariant(false);
            setStep(s => s + 1);
        }
    };
    
    const prevStep = () => {
        if (showVariant) {
            setShowVariant(false);
        } else if (step === 5 && archetypes.length > 0) {
            setStep(s => Math.max(0, s - 1));
            setShowVariant(true);
        } else {
            setStep(s => Math.max(0, s - 1));
        }
    };

    const markCompleteAndReturn = async () => {
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (12 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '13');
        }
        try {
            await updateBootcampProgress(13);
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
                        <Slide key="intro" title="Day 12: The Art of Review" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Defeating the Forgetting Curve.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    Most learning is lost within 24 hours of first encountering it. Not because you didn't understand it — but because you didn't review it.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Forgetting Curve */}
                    {step === 1 && (
                        <Slide key="curve" title="The Forgetting Curve" onNext={nextStep} onBack={prevStep} fullWidth>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto text-left items-center">
                                <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(79,70,229,0.1)]">
                                    <h4 className="text-sm font-bold text-slate-300 mb-8 uppercase tracking-widest text-center">With & Without Review</h4>
                                    
                                    <svg viewBox="0 0 600 300" className="w-full h-auto drop-shadow-md">
                                        <line x1="50" y1="250" x2="550" y2="250" stroke="#334155" strokeWidth="2" />
                                        <line x1="50" y1="200" x2="550" y2="200" stroke="#334155" strokeDasharray="4,4" />
                                        <line x1="50" y1="150" x2="550" y2="150" stroke="#334155" strokeDasharray="4,4" />
                                        <line x1="50" y1="100" x2="550" y2="100" stroke="#334155" strokeDasharray="4,4" />
                                        <line x1="50" y1="50" x2="550" y2="50" stroke="#334155" strokeDasharray="4,4" />
                                        <line x1="50" y1="50" x2="50" y2="250" stroke="#334155" strokeWidth="2" />

                                        <text x="40" y="55" fill="#94a3b8" fontSize="12" textAnchor="end" fontFamily="sans-serif">100%</text>
                                        <text x="40" y="155" fill="#94a3b8" fontSize="12" textAnchor="end" fontFamily="sans-serif">50%</text>
                                        <text x="40" y="255" fill="#94a3b8" fontSize="12" textAnchor="end" fontFamily="sans-serif">0%</text>

                                        <text x="50" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Day 0</text>
                                        <text x="175" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Day 1</text>
                                        <text x="300" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Day 3</text>
                                        <text x="425" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="sans-serif">Day 6</text>

                                        <path d="M 50 50 Q 80 200 175 220 T 550 240" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                                        
                                        <path d="M 175 220 L 175 50 Q 220 140 300 160 T 550 190" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M 300 160 L 300 50 Q 360 100 425 110 T 550 130" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M 425 110 L 425 50 Q 480 60 550 70" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

                                        <line x1="175" y1="50" x2="175" y2="220" stroke="#f97316" strokeDasharray="2,2" opacity="0.5" />
                                        <line x1="300" y1="50" x2="300" y2="160" stroke="#6366f1" strokeDasharray="2,2" opacity="0.5" />
                                        <line x1="425" y1="50" x2="425" y2="110" stroke="#10b981" strokeDasharray="2,2" opacity="0.5" />

                                        <circle cx="50" cy="50" r="5" fill="#ef4444" />
                                        <circle cx="175" cy="50" r="5" fill="#f97316" stroke="#1e293b" strokeWidth="2" />
                                        <circle cx="300" cy="50" r="5" fill="#6366f1" stroke="#1e293b" strokeWidth="2" />
                                        <circle cx="425" cy="50" r="5" fill="#10b981" stroke="#1e293b" strokeWidth="2" />

                                        <g transform="translate(450, 15)">
                                            <circle cx="0" cy="0" r="4" fill="#ef4444" />
                                            <text x="10" y="4" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">No Review (Forgetting)</text>
                                            
                                            <circle cx="0" cy="20" r="4" fill="#10b981" />
                                            <text x="10" y="24" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">Spaced Review</text>
                                        </g>
                                    </svg>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-2xl font-bold text-white mb-4">You are meant to forget.</h4>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        You can read perfectly, take excellent notes, and understand everything in the moment — and still remember almost none of it a week later.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        This is not a failure of intelligence. It is a feature of how human memory works. Without reinforcement, your brain clears out new data to make room. The red line is what happens to 90% of what you learn.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: The Key Insight */}
                    {step === 2 && (
                        <Slide key="insight" title="The Key Insight" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        Review is not about re-reading. It is about retrieval.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                        The effort of retrieval itself is what strengthens memory. Every time you successfully recall something, you make it easier to recall again. 
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Passive re-reading barely engages this mechanism. But actively forcing your brain to retrieve the information before it fades permanently locks it in.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Your Review Schedule */}
                    {step === 3 && (
                        <Slide key="schedule" title="Your Review Schedule" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-3xl mx-auto text-left">
                                <p className="text-lg text-slate-300 mb-8 text-center">
                                    Ad-hoc review is significantly less effective than a deliberate schedule. The spacing matters.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-white/5 rounded-2xl space-y-4">
                                    <div className="flex items-center gap-6">
                                        <span className="text-indigo-400 font-bold text-lg w-28 shrink-0 flex items-center gap-2"><Calendar className="w-5 h-5"/> Same day</span>
                                        <p className="text-slate-300">Brief review within a few hours. Catch misunderstandings while fresh.</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-indigo-400 font-bold text-lg w-28 shrink-0 flex items-center gap-2"><Calendar className="w-5 h-5"/> Day 2</span>
                                        <p className="text-slate-300">First spaced recall. Attempt to retrieve from memory before looking.</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-indigo-400 font-bold text-lg w-28 shrink-0 flex items-center gap-2"><Calendar className="w-5 h-5"/> Day 7</span>
                                        <p className="text-slate-300">Second recall. Focus heavily on what you struggled with on Day 2.</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-indigo-400 font-bold text-lg w-28 shrink-0 flex items-center gap-2"><Calendar className="w-5 h-5"/> Day 21</span>
                                        <p className="text-slate-300">Third review. Strong items need little attention. Weak items need work.</p>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: Your Mission */}
                    {step === 4 && !showVariant && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep} customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Learning Style'} Translation` : 'Next'}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Learning without review is like filling a bath with the plug out. Review is the plug.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Today, your mission is to take the Mind Map you built on Day 10, and actively schedule a Day 2, Day 7, and Day 21 review session for it in your calendar. 
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4.5: Personalized Translation */}
                    {step === 4 && showVariant && activeArchetype && (
                        <Slide key="variant" title={`Your ${INTELLIGENCE_INFO[activeArchetype]?.title} Translation`} icon={<span className="text-4xl">{INTELLIGENCE_INFO[activeArchetype]?.icon}</span>} onNext={() => { setShowVariant(false); setStep(5); }} onBack={() => setShowVariant(false)} fullWidth>
                            <div className="w-full flex flex-col pb-8">
                                <div className="w-full relative z-0">
                                    <div
                                        className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white"
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('day-12-review', activeArchetype) }}
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

                    {/* Step 5: Transition to Drill */}
                    {step === 5 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are returning to <strong className="text-indigo-400">Your Peripheral Vision</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Your peripheral vision is getting stronger. Today we use wider blocks to test your new limits before hitting the flash pages.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Notice if the edges of the text feel slightly clearer today than they did on Day 1. Keep your eyes locked dead center and let the width of the text expand.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Zap className="w-5 h-5" /> Advanced Peripheral Processing
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

                    {/* Step 6: 14-Day Reading Protocol (Day 9: Your Peripheral Vision) */}
                    {step === 6 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={12}
                                sequence={COURSE_CONTENT.find(d => d.day === 9)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 9)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Schedule your Day 2, Day 7, and Day 21 reviews in your calendar."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay12SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay12SessionContent />
        </Suspense>
    );
}
