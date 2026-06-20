"use client";

import { useState, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Zap, BookOpen, PenTool, Share2 } from "lucide-react";
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

const LessonMindMap = () => (
    <div className="w-full bg-slate-900/40 border border-indigo-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.1)]">
        <svg viewBox="0 0 800 500" className="w-full h-auto max-h-[60vh]">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Connecting Lines */}
            <path d="M 400 250 Q 250 250 200 150" fill="none" stroke="#818cf8" strokeWidth="4" className="opacity-60" />
            <path d="M 200 150 L 100 100" fill="none" stroke="#818cf8" strokeWidth="2" className="opacity-40" />
            <path d="M 200 150 L 100 200" fill="none" stroke="#818cf8" strokeWidth="2" className="opacity-40" />
            
            <path d="M 400 250 Q 550 250 600 150" fill="none" stroke="#f43f5e" strokeWidth="4" className="opacity-60" />
            <path d="M 600 150 L 700 100" fill="none" stroke="#f43f5e" strokeWidth="2" className="opacity-40" />
            <path d="M 600 150 L 700 200" fill="none" stroke="#f43f5e" strokeWidth="2" className="opacity-40" />

            <path d="M 400 250 Q 250 250 200 350" fill="none" stroke="#10b981" strokeWidth="4" className="opacity-60" />
            <path d="M 200 350 L 100 300" fill="none" stroke="#10b981" strokeWidth="2" className="opacity-40" />
            <path d="M 200 350 L 100 400" fill="none" stroke="#10b981" strokeWidth="2" className="opacity-40" />

            <path d="M 400 250 Q 550 250 600 350" fill="none" stroke="#f59e0b" strokeWidth="4" className="opacity-60" />
            <path d="M 600 350 L 700 300" fill="none" stroke="#f59e0b" strokeWidth="2" className="opacity-40" />
            <path d="M 600 350 L 700 400" fill="none" stroke="#f59e0b" strokeWidth="2" className="opacity-40" />

            {/* Central Node */}
            <g transform="translate(400, 250)">
                <rect x="-80" y="-30" width="160" height="60" rx="30" fill="#4f46e5" stroke="#818cf8" strokeWidth="2" filter="url(#glow)"/>
                <text x="0" y="5" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle">Mind Mapping</text>
            </g>

            {/* Top Left Nodes */}
            <g transform="translate(200, 150)">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#312e81" stroke="#818cf8" strokeWidth="1.5"/>
                <text x="0" y="2" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#c7d2fe" textAnchor="middle" dominantBaseline="middle">The Brain</text>
            </g>
            <text x="90" y="100" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#a5b4fc" textAnchor="end" dominantBaseline="middle">Conversations</text>
            <text x="90" y="200" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#a5b4fc" textAnchor="end" dominantBaseline="middle">Associations</text>

            {/* Top Right Nodes */}
            <g transform="translate(600, 150)">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#881337" stroke="#fb7185" strokeWidth="1.5"/>
                <text x="0" y="2" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#fecdd3" textAnchor="middle" dominantBaseline="middle">The Problem</text>
            </g>
            <text x="710" y="100" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#fda4af" textAnchor="start" dominantBaseline="middle">Linear Lists</text>
            <text x="710" y="200" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#fda4af" textAnchor="start" dominantBaseline="middle">Lost in Fluff</text>

            {/* Bottom Left Nodes */}
            <g transform="translate(200, 350)">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="1.5"/>
                <text x="0" y="2" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#a7f3d0" textAnchor="middle" dominantBaseline="middle">The Solution</text>
            </g>
            <text x="90" y="300" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#6ee7b7" textAnchor="end" dominantBaseline="middle">Keywords Only</text>
            <text x="90" y="400" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#6ee7b7" textAnchor="end" dominantBaseline="middle">Active Recall</text>

            {/* Bottom Right Nodes */}
            <g transform="translate(600, 350)">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5"/>
                <text x="0" y="2" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#fde68a" textAnchor="middle" dominantBaseline="middle">The Process</text>
            </g>
            <text x="710" y="300" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#fcd34d" textAnchor="start" dominantBaseline="middle">Central Topic</text>
            <text x="710" y="400" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="#fcd34d" textAnchor="start" dominantBaseline="middle">Radiating Branches</text>

        </svg>
    </div>
);

function RogueDay10SessionContent() {
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
        if (step === 7 && archetypes.length > 0 && !showVariant) {
            setShowVariant(true);
        } else {
            setShowVariant(false);
            setStep(s => s + 1);
        }
    };
    
    const prevStep = () => {
        if (showVariant) {
            setShowVariant(false);
        } else if (step === 8 && archetypes.length > 0) {
            setStep(s => Math.max(0, s - 1));
            setShowVariant(true);
        } else {
            setStep(s => Math.max(0, s - 1));
        }
    };

    const markCompleteAndReturn = async () => {
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (10 >= currentProgress) {
            localStorage.setItem('rogue_day_progress', '11');
        }
        try {
            await updateBootcampProgress(11);
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
                        <Slide key="intro" title="Day 10: The Masterclass on Mind Mapping" onNext={nextStep}>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-300 leading-relaxed font-light">
                                    Transcription is not learning.
                                </p>
                                <p className="text-xl text-indigo-300 font-medium leading-relaxed">
                                    Most people take notes by writing down sentences exactly as they are spoken or written. This forces your brain into passive recording mode, rather than active synthesis mode.
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Step 1: The Conversation Analogy */}
                    {step === 1 && (
                        <Slide key="brain-works" title="How Your Brain Actually Works" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10 text-left">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <Share2 className="w-6 h-6 text-indigo-400" /> The Tangent
                                    </h4>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Have you ever been in a conversation with someone and wondered how you got to that topic?
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Then you work your way back through the conversation... realising that one topic led to another topic, to another, until you arrived there. 
                                    </p>
                                    <p className="text-lg text-slate-300 font-medium leading-relaxed">
                                        That is exactly how our minds work. Our brains don't store information in straight, linear lists. They store information through associations and connections.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 2: Transcription vs Mapping */}
                    {step === 2 && (
                        <Slide key="mapping" title="Linear Lists vs. Mind Maps" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <Image src="/images/transcription.png" alt="A glowing mind map next to a boring notebook of text" width={384} height={384} className="w-full h-auto max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        Mind mapping is a visual way of putting information on a page that works exactly like your brain works.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        When you write bullet points or paragraphs, you are forcing a multi-dimensional idea into a one-dimensional format. Mind mapping allows you to draw the architecture of the concept exactly as your brain wants to see it.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 3: Keywords Only */}
                    {step === 3 && (
                        <Slide key="keywords" title="Keywords Only" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <Image src="/images/keywords.png" alt="A magical, glowing keyword lifting off the page" width={384} height={384} className="w-full h-auto max-w-sm rounded-2xl shadow-2xl border border-indigo-500/20" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        Sentences hide the important concepts in a sea of fluff.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Words like "the," "and," "because," "is"—these carry zero memory weight. To take genius notes, you must extract only the heavy, dense <strong>Keywords</strong>. By using single words or tiny phrases on your mind map branches, you force your brain to actively rebuild the sentence during recall. This struggle is what solidifies memory.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 4: What is a Mind Map */}
                    {step === 4 && (
                        <Slide key="what-is" title="The Architecture of a Concept" onNext={nextStep} onBack={prevStep}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto text-left items-center">
                                <div className="md:col-span-2 flex justify-center">
                                    <Image src="/mind-map-example.png" alt="An example of a Mind Map" width={384} height={384} className="w-full h-auto rounded-2xl shadow-2xl border border-indigo-500/20 bg-white" />
                                </div>
                                <div className="md:col-span-3 p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
                                        A mind map places a central idea at the centre of the page and radiates outward.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed mb-4">
                                        Unlike linear notes, a mind map mirrors how your brain actually stores information: as a network of interconnected ideas.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        This gives you an instant visual overview of the whole subject. You can see how everything relates before diving into detail — something a list of notes can never provide.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 5: How to Build It */}
                    {step === 5 && (
                        <Slide key="how-to-build" title="How to Build a Mind Map" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-2xl mx-auto text-left">
                                <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-900/10">
                                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                        <PenTool className="w-6 h-6 text-indigo-400" /> The Process
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">1</span>
                                            <p className="text-slate-300 pt-1"><strong>Central Topic:</strong> Write the main idea in the middle of a blank page (turn it sideways for maximum space).</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">2</span>
                                            <p className="text-slate-300 pt-1"><strong>Thick Branches:</strong> Draw thick branches radiating outward for each key sub-topic or category.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">3</span>
                                            <p className="text-slate-300 pt-1"><strong>Thin Branches:</strong> Add thinner branches from each sub-topic for examples, details, and questions.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center shrink-0">4</span>
                                            <p className="text-slate-300 pt-1"><strong>Keywords Only:</strong> Use single words or tiny phrases. The brain naturally fills in the context.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 6: A Mind Map of This Lesson */}
                    {step === 6 && (
                        <Slide key="map-of-lesson" title="A Mind Map of This Lesson" onNext={nextStep} onBack={prevStep}>
                            <div className="space-y-6 max-w-4xl mx-auto text-center">
                                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                                    Instead of a summary paragraph, here is a mind map summarising everything we just learned today:
                                </p>
                                <LessonMindMap />
                            </div>
                        </Slide>
                    )}

                    {/* Step 7: Your Mission */}
                    {step === 7 && !showVariant && (
                        <Slide key="mission" title="Your Mission" onNext={nextStep} onBack={prevStep} customButtonText={archetypes.length > 0 ? `See the ${INTELLIGENCE_INFO[archetypes[0]]?.title || 'Learning Style'} Translation` : 'Next'}>
                            <div className="space-y-6 max-w-2xl mx-auto text-center">
                                <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.15)] text-left">
                                    <h4 className="text-xl font-bold text-indigo-300 mb-4 tracking-tight">Put this into practice today:</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        Recall the questions you wrote down for Day 9. As you read your text today, do not write down any sentences.
                                    </p>
                                    <p className="text-lg text-slate-300 leading-relaxed mt-4">
                                        Instead, create a single-page <strong>Mind Map</strong>. Put the core topic in the center, draw branches for the main ideas, and only use <strong>keywords</strong> to answer your questions.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Step 7.5: Personalized Translation */}
                    {step === 7 && showVariant && activeArchetype && (
                        <Slide key="variant" title={`Your ${INTELLIGENCE_INFO[activeArchetype]?.title} Translation`} icon={<span className="text-4xl">{INTELLIGENCE_INFO[activeArchetype]?.icon}</span>} onNext={() => { setShowVariant(false); setStep(8); }} onBack={() => setShowVariant(false)} fullWidth>
                            <div className="w-full flex flex-col pb-8">
                                <div className="w-full relative z-0">
                                    <div
                                        className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white"
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('day-10-genius-notes', activeArchetype) }}
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

                    {/* Step 8: Transition to Drill */}
                    {step === 8 && (
                        <Slide key="transition" title="Prepare to Train" onNext={nextStep} onBack={prevStep} customButtonText="Start Drill" fullWidth>
                            <div className="space-y-8 max-w-3xl mx-auto text-center">
                                <p className="text-2xl text-slate-200 font-light">
                                    Today, we are starting <strong className="text-indigo-400">Your Eye Movement</strong>.
                                </p>
                                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-left max-w-2xl mx-auto space-y-4">
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Now that your peripheral vision is wider and your inner voice is quieter, we need to train your eyes to move smoothly and rhythmically across the page.
                                    </p>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        Most untrained readers' eyes jerk and backtrack constantly. This drill uses a bouncing pacer. Do not try to read aloud. Let your eyes jump cleanly from highlight to highlight to build a smooth physical rhythm.
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                                        <Zap className="w-5 h-5" /> Rhythmic Eye Movement
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

                    {/* Step 9: 14-Day Reading Protocol (Day 7: Your Eye Movement) */}
                    {step === 9 && (
                        <div className="w-full flex-1 flex flex-col justify-center animate-in fade-in duration-500">
                            <SessionPlayer
                                dayNumber={10}
                                sequence={COURSE_CONTENT.find(d => d.day === 7)!.sequence!}
                                dayContent={COURSE_CONTENT.find(d => d.day === 7)!.content}
                                onComplete={markCompleteAndReturn}
                                outroMessage="Your Mission: Create a keyword-only Mind Map to answer the questions from your reading."
                            />
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RogueDay10SessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading session...</div>}>
            <RogueDay10SessionContent />
        </Suspense>
    );
}
