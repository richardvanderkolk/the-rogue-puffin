"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Home, BookOpen, Bot, Star, Layers, CheckCircle, Eye, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Slide } from "@/components/onboarding/ConceptSlides";
import { getArticleVariant } from "@/data/learningStyleVariants";
import { saveSuperpower } from "@/app/actions/superpower";
import { updateBootcampProgress } from "@/app/actions/progress";

type Intelligence = 'linguistic' | 'logical' | 'visual' | 'kinesthetic' | 'musical' | 'interpersonal' | 'intrapersonal' | 'naturalistic';

const INTELLIGENCE_INFO: Record<Intelligence, { title: string; desc: string; icon: string }> = {
    linguistic: { title: "Word Smart (Linguistic)", desc: "You think in words and stories. You learn best by reading, writing, and explaining things out loud.", icon: "📚" },
    logical: { title: "Logic Smart (Logical-Mathematical)", desc: "You think like a puzzle master. You love finding patterns, solving problems, and organizing ideas.", icon: "🧩" },
    visual: { title: "Picture Smart (Visual-Spatial)", desc: "You think in images and colors. You learn best when there are diagrams, maps, or pictures.", icon: "🖼️" },
    kinesthetic: { title: "Body Smart (Bodily-Kinesthetic)", desc: "You think through movement. You understand things best by doing, building, acting, and hands-on experiences.", icon: "🏃" },
    musical: { title: "Music Smart (Musical)", desc: "You think in rhythms and beats. You are sensitive to rhythm, tone, and sound.", icon: "🎵" },
    interpersonal: { title: "People Smart (Interpersonal)", desc: "You think by bouncing ideas off others. You learn best when discussing or working in a team.", icon: "💬" },
    intrapersonal: { title: "Self Smart (Intrapersonal)", desc: "You think deeply inside yourself. You learn best when you have quiet time to reflect and work independently.", icon: "🧘" },
    naturalistic: { title: "Nature Smart (Naturalistic)", desc: "You think in classifications and categories. You learn best when you can connect concepts to the real world or nature.", icon: "🌿" }
};

const PART1_QUESTIONS = [
    {
        id: "q1",
        text: "When I need to remember a phone number or a new password, I usually:",
        options: [
            { text: "Repeat it out loud a few times or make up a rhythm for it.", type: "musical" as Intelligence },
            { text: "Write it down on a piece of paper or type it out.", type: "kinesthetic" as Intelligence },
            { text: "Visualize the pattern my fingers make on the keypad.", type: "visual" as Intelligence },
            { text: "Link the numbers to dates or mathematical patterns I know.", type: "logical" as Intelligence }
        ]
    },
    {
        id: "q2",
        text: "When I am trying to understand a completely new concept, I prefer it when:",
        options: [
            { text: "The teacher provides a clear, step-by-step logical breakdown.", type: "logical" as Intelligence },
            { text: "There is a chart, graph, or a highly visual mind-map explaining it.", type: "visual" as Intelligence },
            { text: "I can discuss it with a group of peers to bounce ideas around.", type: "interpersonal" as Intelligence },
            { text: "I am given the materials to build, test, or physically experiment.", type: "kinesthetic" as Intelligence }
        ]
    },
    {
        id: "q3",
        text: "If I am feeling stressed or need to clear my head, my instinct is to:",
        options: [
            { text: "Go for a walk outdoors or spend time with an animal.", type: "naturalistic" as Intelligence },
            { text: "Retreat to a quiet room to be completely alone with my thoughts.", type: "intrapersonal" as Intelligence },
            { text: "Call a close friend to talk through exactly how I'm feeling.", type: "interpersonal" as Intelligence },
            { text: "Put on my favorite playlist or play an instrument.", type: "musical" as Intelligence }
        ]
    }
];

const PART2_STATEMENTS = [
    { id: "s1", text: "I love reading books, articles, or stories in my free time.", type: "linguistic" as Intelligence },
    { id: "s2", text: "I often notice grammatical mistakes or enjoy playing word games.", type: "linguistic" as Intelligence },
    { id: "s3", text: "I find it easy to explain complex ideas to others using just my words.", type: "linguistic" as Intelligence },
    { id: "s4", text: "I enjoy solving brain teasers, logic puzzles, or strategy games.", type: "logical" as Intelligence },
    { id: "s5", text: "I like things to be organized, categorized, and have a clear order.", type: "logical" as Intelligence },
    { id: "s6", text: "I often ask 'why' and want to understand the underlying principles.", type: "logical" as Intelligence },
    { id: "s7", text: "I can easily picture vivid images, faces, or places in my mind's eye.", type: "visual" as Intelligence },
    { id: "s8", text: "I have a good sense of direction and rarely get lost using a map.", type: "visual" as Intelligence },
    { id: "s9", text: "I am drawn to art, photography, design, or architecture.", type: "visual" as Intelligence },
    { id: "s10", text: "I find it very difficult to sit completely still for long periods of time.", type: "kinesthetic" as Intelligence },
    { id: "s11", text: "I have good physical coordination and enjoy hands-on activities.", type: "kinesthetic" as Intelligence },
    { id: "s12", text: "I use a lot of hand gestures and body language when I talk.", type: "kinesthetic" as Intelligence },
    { id: "s13", text: "I frequently find myself tapping my foot, humming, or singing.", type: "musical" as Intelligence },
    { id: "s14", text: "I can easily tell when a note is out of tune or off-beat.", type: "musical" as Intelligence },
    { id: "s15", text: "I focus and study much better when there is background music.", type: "musical" as Intelligence },
    { id: "s16", text: "People often come to me for advice or to mediate conflicts.", type: "interpersonal" as Intelligence },
    { id: "s17", text: "I prefer working in a team environment rather than alone.", type: "interpersonal" as Intelligence },
    { id: "s18", text: "I can usually tell what other people are feeling without them saying it.", type: "interpersonal" as Intelligence },
    { id: "s19", text: "I keep a journal or regularly spend time reflecting on my goals.", type: "intrapersonal" as Intelligence },
    { id: "s20", text: "I am very aware of my own strengths, weaknesses, and triggers.", type: "intrapersonal" as Intelligence },
    { id: "s21", text: "I prefer to work alone on projects that are highly meaningful to me.", type: "intrapersonal" as Intelligence },
    { id: "s22", text: "I feel a deep connection to the outdoors, animals, or plants.", type: "naturalistic" as Intelligence },
    { id: "s23", text: "I naturally notice different species or formations when outside.", type: "naturalistic" as Intelligence },
    { id: "s24", text: "I care deeply about environmental issues and the natural world.", type: "naturalistic" as Intelligence }
];

const SUBJECT_EXAMPLES = [
    {
        title: "Learning a New Language",
        applications: {
            linguistic: "Immerse yourself in foreign books, write translated essays, and focus on written grammar rules.",
            logical: "Study the structural rules of the language and look for logical patterns in verb conjugations.",
            visual: "Use flashcards with images and color-code different grammar structures or vocabulary groups.",
            kinesthetic: "Roleplay conversations, use physical gestures for new words, and practice while walking.",
            musical: "Listen to foreign music, focus on the rhythm of the language, and learn phrases like song lyrics.",
            interpersonal: "Practice speaking directly with native speakers or join conversational study groups.",
            intrapersonal: "Keep a personal journal in the new language and relate vocabulary to your own emotions.",
            naturalistic: "Start by learning vocabulary related to nature and the environment, or practice outside."
        }
    },
    {
        title: "Understanding History",
        applications: {
            linguistic: "Read primary source documents, diaries, and write narrative summaries of historical events.",
            logical: "Create strict timelines, analyze the cause-and-effect, and study the economic factors.",
            visual: "Look at historical maps, watch documentaries, and draw out the sequence of events visually.",
            kinesthetic: "Visit museums, handle historical artifacts, or build physical models of historical sites.",
            musical: "Listen to the music of that specific era to deeply understand the cultural context and mood.",
            interpersonal: "Debate the events with peers, focusing on the psychological motivations of the historical figures.",
            intrapersonal: "Reflect on how the event would have felt to live through and relate it to your core values.",
            naturalistic: "Study how geography, weather, and the natural environment influenced the historical event."
        }
    },
    {
        title: "Grasping Complex Science",
        applications: {
            linguistic: "Read detailed textbooks, write out summaries of the concepts, and explain them out loud.",
            logical: "Break the concept down into logical formulas and analyze the raw data and statistics.",
            visual: "Draw detailed diagrams, watch 3D animations, and use color-coded mind maps.",
            kinesthetic: "Perform physical experiments and build 3D models of the abstract concepts.",
            musical: "Create mnemonic devices or rhythmic songs to remember complex steps or chemical formulas.",
            interpersonal: "Teach the concept to someone else or study in a group to discuss the details.",
            intrapersonal: "Take quiet time to deeply ponder the concept and connect it to your personal experiences.",
            naturalistic: "Observe the concept in nature and use biological or environmental analogies to understand it."
        }
    }
];

const PROMPT_INSTRUCTIONS = {
    linguistic: 'Select the most effective linguistic format for this specific topic—such as a compelling narrative, an engaging editorial, or a rich allegorical story. Focus heavily on vocabulary, storytelling, and elegant linguistic analogies.',
    logical: 'Select the most effective logical format for this specific topic—such as a step-by-step algorithm, a logical flowchart, or a systematic breakdown. Use if-then logic and clearly define the cause-and-effect variables.',
    visual: 'Select the most effective visual format for this specific topic—such as a descriptive mind map, a spatial diagram, or a strong visual metaphor. Rely on descriptive imagery and structural text blocks so I can "see" how the parts connect.',
    kinesthetic: 'Select the most effective physical format for this specific topic—such as a step-by-step action protocol, a hands-on experiment, or a physical simulation. Use tactile metaphors and give me a concrete action I can take right now to "feel" how this works.',
    musical: 'Select the most effective auditory format for this specific topic—such as a rhythmic poem, a musical metaphor, or an analysis of cadence and tempo. Explain the concept using analogies related to sound, harmony, or rhythm.',
    interpersonal: 'Select the most effective interpersonal format for this specific topic—such as a conversational dialogue, an interview transcript, or a group debate. Focus on how this concept affects human relationships, society, and social dynamics.',
    intrapersonal: 'Select the most effective introspective format for this specific topic—such as a personal journal entry, a philosophical reflection, or an internal monologue. Ask me deep, introspective questions that force me to relate the topic to my own life experiences.',
    naturalistic: "Select the most effective environmental format for this specific topic—such as a biologist's field notes, an ecological case study, or a natural classification system. Use analogies involving ecosystems, biology, weather patterns, or animal behavior."
};

export default function SuperpowerSessionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><RefreshCw className="animate-spin w-8 h-8 text-indigo-500" /></div>}>
            <SuperpowerSessionContent />
        </Suspense>
    );
}

function SuperpowerSessionContent() {
    const searchParams = useSearchParams();
    const course = searchParams.get('course') || 'bootcamp';
    
    const dashboardUrl = course === 'abridged' ? '/abridged' : '/bootcamp?unlocked=true';
    const dashboardText = course === 'abridged' ? 'Course' : 'Bootcamp';
    
    const nextLessonUrl = course === 'abridged' ? '/blog/preview-the-material?course=abridged' : dashboardUrl;
    const nextLessonText = course === 'abridged' ? 'Continue to Next Lesson' : `Return to ${dashboardText}`;

    const [step, setStep] = useState(0);
    const [part1Index, setPart1Index] = useState(0);
    const [part1Answers, setPart1Answers] = useState<Record<string, Intelligence>>({});
    const [part2Answers, setPart2Answers] = useState<Record<string, number>>({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [selectedExample, setSelectedExample] = useState<Intelligence | null>(null);
    
    const [savedPowers, setSavedPowers] = useState<Intelligence[] | null>(null);
    const [useSaved, setUseSaved] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [hasUpdatedProgress, setHasUpdatedProgress] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('rogue_superpowers');
        if (saved) {
            try {
                setSavedPowers(JSON.parse(saved));
            } catch (e) {}
        }
    }, []);
    
    // Shuffle statements once on mount
    const shuffledStatements = useMemo(() => {
        return [...PART2_STATEMENTS].sort(() => Math.random() - 0.5);
    }, []);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handlePart1Select = (questionId: string, type: Intelligence) => {
        setPart1Answers(prev => ({ ...prev, [questionId]: type }));
        if (part1Index < PART1_QUESTIONS.length - 1) {
            setTimeout(() => setPart1Index(p => p + 1), 300);
        } else {
            setTimeout(() => nextStep(), 300);
        }
    };

    const handlePart2Select = (statementId: string, rating: number) => {
        setPart2Answers(prev => ({ ...prev, [statementId]: rating }));
    };

    const getTopSuperpowers = () => {
        const scores: Record<Intelligence, number> = {
            linguistic: 0, logical: 0, visual: 0, kinesthetic: 0,
            musical: 0, interpersonal: 0, intrapersonal: 0, naturalistic: 0
        };

        Object.values(part1Answers).forEach(type => {
            scores[type] += 3;
        });

        Object.entries(part2Answers).forEach(([id, rating]) => {
            const statement = PART2_STATEMENTS.find(s => s.id === id);
            if (statement) {
                scores[statement.type] += rating;
            }
        });

        return Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([type]) => type as Intelligence);
    };

    const triggerCalculation = async () => {
        nextStep(); // Advance immediately to Slide 5 (Analyzing)
        
        // Save the calculated powers to local storage so they don't have to retake it
        const calculatedPowers = getTopSuperpowers();
        localStorage.setItem('rogue_superpowers', JSON.stringify(calculatedPowers));
        
        // Attempt to save to DB (will fail silently if not logged in)
        await saveSuperpower(calculatedPowers[0]);
        
        // Save anonymous
        try {
            const visitorId = localStorage.getItem('rp_visitor_id');
            if (visitorId) {
                fetch('/api/learning-styles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ visitor_id: visitorId, learning_style: calculatedPowers[0] })
                });
            }
        } catch (e) {
            console.error(e);
        }

        setTimeout(() => {
            nextStep(); // Advance to Slide 6 (Results) after 2 seconds
        }, 2500);
    };

    // Derived states
    const topPowers = useSaved && savedPowers ? savedPowers : getTopSuperpowers();
    const primaryPower = topPowers[0] || 'linguistic';

    const generateAIPrompt = () => {
        return `Act as an expert pedagogical tutor. I need to deeply understand the following topic: [INSERT TOPIC HERE]

To help me understand this effectively, you must tailor your explanation to my specific cognitive profile. My top three learning styles, in order of dominance, are:
1. ${INTELLIGENCE_INFO[topPowers[0]].title}
2. ${INTELLIGENCE_INFO[topPowers[1]].title}
3. ${INTELLIGENCE_INFO[topPowers[2]].title}

Please structure your entire response using the following pedagogical framework:

- Primary Lens: ${PROMPT_INSTRUCTIONS[topPowers[0]]}
- Secondary Reinforcement: ${PROMPT_INSTRUCTIONS[topPowers[1]]}
- Tertiary Context: ${PROMPT_INSTRUCTIONS[topPowers[2]]}

Do not just give me a standard textbook definition. Completely format your explanation, analogies, and exercises to embody these specific learning styles.`;
    };

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(generateAIPrompt());
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleComplete = async () => {
        if (!hasUpdatedProgress) {
            localStorage.setItem('rogue_day_progress', '3');
            if (course === 'bootcamp') {
                await updateBootcampProgress(3);
            }
            setHasUpdatedProgress(true);
        }
        window.location.href = nextLessonUrl;
    };

    return (
        <div className="min-h-screen pt-32 pb-12 bg-slate-950 text-white flex flex-col font-sans relative overflow-hidden">
            {/* Main Content Area */}
            <main className="flex-1 relative z-10 flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    {/* Slide 0: The Setup (Quote) */}
                    {step === 0 && (
                        <Slide 
                            key="step-0" 
                            title={savedPowers ? "Welcome Back" : "The Setup"} 
                            icon={<Brain className="w-12 h-12 text-indigo-400" />} 
                            customButtonText={savedPowers ? "Retake the Quiz" : "Next"}
                            onNext={() => {
                                // If they click "Retake", we make sure useSaved is false so it calculates from scratch
                                setUseSaved(false);
                                nextStep();
                            }}
                        >
                            {savedPowers ? (
                                <div className="space-y-8 w-full max-w-2xl mx-auto">
                                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                                        <p className="text-xl text-slate-300 mb-6">
                                            We noticed you have already discovered your top learning superpowers:
                                        </p>
                                        <div className="flex justify-center gap-4 flex-wrap mb-8">
                                            {savedPowers.map((p, i) => (
                                                <div key={p} className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center flex-1 min-w-[100px]">
                                                    <span className="text-3xl mb-2">{INTELLIGENCE_INFO[p].icon}</span>
                                                    <span className="font-bold text-xs text-indigo-300 text-center">{INTELLIGENCE_INFO[p].title.split(' (')[0]}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setUseSaved(true);
                                                setStep(6); // Jump straight to results
                                            }}
                                            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-teal-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/50"
                                        >
                                            Review My Custom Toolkit
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                        <p className="text-sm text-slate-500 mt-4 text-center">Or click "Retake the Quiz" below to start over.</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <blockquote className="my-10 pl-6 border-l-4 border-indigo-500 bg-slate-900/40 p-8 rounded-r-3xl relative">
                                        <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-indigo-500 opacity-50" />
                                        <p className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed">
                                            "Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid."
                                        </p>
                                        <footer className="mt-6 text-base font-bold text-indigo-300 uppercase tracking-widest">— Often attributed to Albert Einstein</footer>
                                    </blockquote>
                                    <p className="text-xl text-slate-300">
                                        Most people think they are either "good at learning" or not. But that's simply not true.
                                    </p>
                                </>
                            )}
                        </Slide>
                    )}

                    {/* Slide 1: Old vs New Way */}
                    {step === 1 && (
                        <Slide key="step-1" title="A Better Question" icon={<Sparkles className="w-12 h-12 text-emerald-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 space-y-6">
                                <p className="text-xl text-slate-300">
                                    For a long time, school tended to assume that intelligence looked like: reading well, writing clearly, and solving math problems.
                                </p>
                                <p className="text-xl text-slate-300">
                                    But psychologist Howard Gardner proposed something revolutionary. He suggested that the real question is not: <br/>
                                    <strong className="text-rose-400 mt-2 inline-block">"How smart are you?"</strong>
                                </p>
                                <div className="h-px bg-slate-800 w-full my-6"></div>
                                <p className="text-2xl font-bold text-white">
                                    Instead, the better question is:<br/>
                                    <span className="text-emerald-400 text-3xl mt-2 inline-block">"How are you smart?"</span>
                                </p>
                            </div>
                        </Slide>
                    )}

                    {/* Slide 2: The 8 Intelligences */}
                    {step === 2 && (
                        <Slide key="step-2" title="Multiple Intelligences" icon={<Layers className="w-12 h-12 text-amber-400" />} onNext={nextStep} onBack={prevStep}>
                            <p className="text-xl text-slate-300 mb-8">
                                Gardner identified 8 main kinds of intelligence. Think of them like <strong className="text-white">learning superpowers</strong>. None is better than the others—they are simply different ways our minds engage with the world.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                                {Object.values(INTELLIGENCE_INFO).map((info, i) => (
                                    <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                                        <div className="text-3xl mb-2">{info.icon}</div>
                                        <div className="text-sm font-bold text-white leading-tight">{info.title.split(' (')[0]}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xl font-bold text-indigo-400 mt-8">
                                Let's discover which one is yours.
                            </p>
                        </Slide>
                    )}

                    {/* Slide 3: Part 1 Scenarios */}
                    {step === 3 && (
                        <Slide key={`step-3-${part1Index}`} title="Discover Your Superpower Quiz" customButtonText="Skip to Part 2" onNext={nextStep} onBack={part1Index === 0 ? prevStep : () => setPart1Index(p => p - 1)}>
                            <div className="w-full max-w-2xl mx-auto text-left">
                                <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                                    <div>
                                        <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-1">Part 1: Quick Reactions</p>
                                        <p className="text-slate-400 text-base">Choose the option that feels most natural to you.</p>
                                    </div>
                                    <span className="text-slate-500 text-sm font-mono bg-slate-900 px-3 py-1 rounded-full">{part1Index + 1} / {PART1_QUESTIONS.length}</span>
                                </div>

                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                                    {PART1_QUESTIONS[part1Index].text}
                                </h4>

                                <div className="space-y-4">
                                    {PART1_QUESTIONS[part1Index].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePart1Select(PART1_QUESTIONS[part1Index].id, opt.type)}
                                            className="w-full text-left p-6 rounded-2xl border border-slate-700 bg-slate-800/50 hover:bg-indigo-900/30 hover:border-indigo-500/50 transition-all flex items-start gap-4 group"
                                        >
                                            <div className="w-6 h-6 rounded-full border-2 border-slate-500 group-hover:border-indigo-400 shrink-0 mt-1 flex items-center justify-center">
                                                {part1Answers[PART1_QUESTIONS[part1Index].id] === opt.type && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                                            </div>
                                            <span className="text-slate-200 text-lg leading-relaxed">{opt.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Slide 4: Part 2 Statements */}
                    {step === 4 && (
                        <Slide key="step-4" title="Discover Your Superpower Quiz" customButtonText="Calculate My Superpowers" onNext={triggerCalculation} onBack={prevStep}>
                            <div className="w-full text-left flex flex-col h-full max-h-[60vh]">
                                <div className="border-b border-slate-800 pb-4 mb-6 flex-shrink-0">
                                    <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-1">Part 2: Deep Dive</p>
                                    <p className="text-slate-400 text-base">Rate each statement. <span className="text-white font-medium">(Scroll down to see all 24)</span></p>
                                </div>

                                <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar flex-1 pb-10">
                                    {shuffledStatements.map((stmt, index) => (
                                        <div key={stmt.id} className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 shadow-sm">
                                            <p className="text-white text-lg mb-6 leading-relaxed"><span className="text-slate-500 font-mono mr-3 text-sm">{index + 1}.</span>{stmt.text}</p>
                                            <div className="flex justify-between items-center gap-4">
                                                <span className="text-sm font-medium text-slate-500 hidden sm:block w-20">Not me</span>
                                                <div className="flex flex-1 justify-between gap-2 sm:gap-3">
                                                    {[1, 2, 3, 4, 5].map(rating => (
                                                        <button
                                                            key={rating}
                                                            onClick={() => handlePart2Select(stmt.id, rating)}
                                                            className={`flex-1 py-3 sm:py-4 rounded-xl text-lg font-bold transition-all ${
                                                                part2Answers[stmt.id] === rating
                                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 scale-105 border border-indigo-400'
                                                                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-700 border border-slate-800 hover:border-slate-600'
                                                            }`}
                                                        >
                                                            {rating}
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="text-sm font-medium text-slate-500 text-right hidden sm:block w-20">Exactly me</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Slide 5: Calculating */}
                    {step === 5 && (
                        <motion.div
                            key="step-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto h-full"
                        >
                            <RefreshCw className="w-16 h-16 text-indigo-500 animate-spin mb-8" />
                            <h2 className="text-3xl font-bold text-white mb-4">Analysing Your Answers...</h2>
                            <p className="text-slate-400 text-lg">Calculating your learning profile across all 8 dimensions.</p>
                            {/* Hidden trigger is handled in the triggerCalculation function */}
                        </motion.div>
                    )}

                    {/* Slide 6: Results */}
                    {step === 6 && (
                        <Slide key="step-6" title="Your Dominant Superpowers" icon={<Star className="w-12 h-12 text-emerald-400" />} onNext={nextStep} onBack={() => {
                            if (useSaved) {
                                setStep(0); // If they used saved powers, go back to welcome screen
                            } else {
                                setStep(4); // Otherwise go back to part 2
                            }
                        }}>
                            <div className="grid gap-6 text-left w-full max-w-2xl mx-auto">
                                {topPowers.map((type, i) => {
                                    const info = INTELLIGENCE_INFO[type];
                                    return (
                                        <div key={type} className={`p-8 rounded-3xl border ${i === 0 ? 'bg-indigo-900/30 border-indigo-500/50 shadow-2xl shadow-indigo-900/20' : 'bg-slate-800/50 border-slate-700'}`}>
                                            <div className="flex items-start gap-6">
                                                <div className={`text-5xl ${i === 0 ? 'drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]' : ''}`}>{info.icon}</div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        {i === 0 && <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs uppercase font-bold tracking-widest rounded-md border border-indigo-500/30">Primary</span>}
                                                        {i === 1 && <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs uppercase font-bold tracking-widest rounded-md">Secondary</span>}
                                                        {i === 2 && <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs uppercase font-bold tracking-widest rounded-md">Tertiary</span>}
                                                    </div>
                                                    <h4 className="text-2xl font-bold text-white mb-3">{info.title}</h4>
                                                    <p className="text-slate-300 text-lg leading-relaxed">{info.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Slide>
                    )}

                    {/* Slide 7: Toolkit */}
                    {step === 7 && (
                        <Slide key="step-7" title="Your Custom Toolkit" icon={<BookOpen className="w-12 h-12 text-sky-400" />} customButtonText="How to use AI" onNext={nextStep} onBack={prevStep}>
                            <div className="text-left max-w-4xl mx-auto w-full">
                                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                    Instead of relying on just one style, your strongest learning potential comes from combining your top 3 superpowers. Here is how you can apply your unique profile to different subjects:
                                </p>
                                
                                <div className="space-y-6">
                                    {SUBJECT_EXAMPLES.map((subject, idx) => (
                                        <div key={idx} className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 shadow-xl">
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/30">{idx + 1}</div>
                                                {subject.title}
                                            </h3>
                                            <ul className="space-y-3 pl-11">
                                                {topPowers.map(power => (
                                                    <li key={power} className="text-slate-300 text-lg">
                                                        <strong className="text-indigo-300">{INTELLIGENCE_INFO[power].title.split(' (')[0]}:</strong> {subject.applications[power]}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Slide 8: AI Tutor Prompt */}
                    {step === 8 && (
                        <Slide key="step-8" title="Your AI Tutor" icon={<Bot className="w-12 h-12 text-fuchsia-400" />} onNext={nextStep} onBack={prevStep}>
                            <div className="text-left max-w-3xl mx-auto w-full space-y-6">
                                <p className="text-xl text-slate-300 leading-relaxed">
                                    The easiest way to leverage your unique profile is to instruct AI to teach you using a pedagogical mix of your top 3 styles.
                                </p>
                                
                                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 relative shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-fuchsia-500/20 text-fuchsia-300 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest border-b border-l border-slate-700">Prompt</div>
                                    <p className="text-lg text-slate-200 font-medium mb-4">Copy and paste this into ChatGPT or Claude when you need to learn something new:</p>
                                    
                                    <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-sm md:text-base text-fuchsia-300 leading-relaxed whitespace-pre-wrap mb-6">
                                        {generateAIPrompt()}
                                    </div>
                                    
                                    <button 
                                        onClick={handleCopyPrompt}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                                            isCopied 
                                                ? 'bg-emerald-600 text-white' 
                                                : 'bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-900/50'
                                        }`}
                                    >
                                        {isCopied ? <><Check className="w-5 h-5" /> Copied to Clipboard!</> : <><Copy className="w-5 h-5" /> Copy Prompt</>}
                                    </button>
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Slide 9: Explore Examples */}
                    {step === 9 && (
                        <Slide key="step-9" title="See It In Action" icon={null} onNext={nextStep} customButtonText="Your Mission" onBack={prevStep} fullWidth>
                            <div className="text-left w-full flex flex-col pb-8">
                                <p className="text-lg md:text-xl text-slate-300 mb-8 text-center max-w-3xl mx-auto flex-shrink-0">
                                    See how the exact same introductory lesson transforms when taught through the lens of different learning styles.
                                </p>
                                
                                <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 mb-10 flex-shrink-0 bg-slate-900/60 p-3 md:p-4 rounded-3xl border border-slate-800 shadow-xl">
                                    {Object.keys(INTELLIGENCE_INFO).map((type) => {
                                        const isSelected = (selectedExample || primaryPower) === type;
                                        return (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedExample(type as Intelligence)}
                                                className={`p-2 md:p-3 rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-2 border shadow-sm ${
                                                    isSelected
                                                        ? 'bg-teal-900/50 border-teal-500/50 text-teal-300 shadow-teal-900/40 scale-105 ring-2 ring-teal-500/20'
                                                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                                }`}
                                            >
                                                <span className={`text-2xl md:text-3xl transition-transform ${isSelected ? 'scale-110' : 'grayscale opacity-50'}`}>
                                                    {INTELLIGENCE_INFO[type as Intelligence].icon}
                                                </span>
                                                <span className="hidden md:block text-[10px] md:text-xs uppercase tracking-widest text-center mt-1">{INTELLIGENCE_INFO[type as Intelligence].title.split(' (')[0].replace(' Smart', '')}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                
                                <div className="w-full relative z-0">
                                    <div
                                        className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-strong:text-white"
                                        dangerouslySetInnerHTML={{ __html: getArticleVariant('know-your-learning-superpower', selectedExample || primaryPower) }}
                                    />
                                </div>
                            </div>
                        </Slide>
                    )}

                    {/* Slide 10: Conclusion & Call to Action */}
                    {step === 10 && (
                        <Slide key="step-10" title="Your Mission" icon={<CheckCircle className="w-12 h-12 text-emerald-400" />} onNext={handleComplete} customButtonText={nextLessonText} onBack={prevStep} fullWidth>
                            <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center text-left shadow-2xl">
                                
                                {/* Left Side: The Mission */}
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-3xl font-bold text-white leading-tight">You Have The Code</h3>
                                    <p className="text-xl text-slate-300 leading-relaxed">
                                        You now know that intelligence isn't a single number—it's a vibrant ecosystem. You've discovered your top learning superpowers: <strong className="text-indigo-400">{INTELLIGENCE_INFO[topPowers[0]].title.split(' (')[0]}, {INTELLIGENCE_INFO[topPowers[1]].title.split(' (')[0]}, and {INTELLIGENCE_INFO[topPowers[2]].title.split(' (')[0]}</strong>.
                                    </p>
                                    
                                    <div className="h-px bg-slate-800 w-full my-8"></div>
                                    
                                    <h3 className="text-2xl font-bold text-emerald-400">Your Next Step</h3>
                                    <p className="text-xl text-slate-300 leading-relaxed">
                                        Don't just read this and move on. Copy your custom AI Tutor Prompt and go use it <strong className="text-white">right now</strong> on a concept you've been struggling to understand.
                                    </p>
                                    <p className="text-lg text-slate-400 italic mt-4">
                                        Stop forcing yourself to learn in a language you don't speak. Start learning in your native tongue.
                                    </p>
                                </div>
                                
                                {/* Right Side: The Prompt Action Box */}
                                <div className="w-full md:w-[400px] bg-slate-950 border border-slate-700 rounded-2xl p-6 relative shadow-xl shrink-0">
                                    <div className="absolute top-0 right-0 bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-widest border-b border-l border-slate-700">Your Prompt</div>
                                    
                                    <p className="text-sm text-slate-400 mb-4 font-medium pr-16">Ready to copy and paste:</p>
                                    
                                    <div className="font-mono text-xs text-fuchsia-300/80 leading-relaxed whitespace-pre-wrap max-h-[250px] overflow-y-auto custom-scrollbar pr-2 mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
                                        {generateAIPrompt()}
                                    </div>
                                    
                                    <button 
                                        onClick={handleCopyPrompt}
                                        className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                                            isCopied 
                                                ? 'bg-emerald-600 text-white' 
                                                : 'bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-900/30'
                                        }`}
                                    >
                                        {isCopied ? <><Check className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy AI Prompt</>}
                                    </button>
                                </div>

                            </div>
                        </Slide>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
