"use client";

import { useState, useMemo, useEffect } from "react";
import { Brain, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Intelligence = 'linguistic' | 'logical' | 'visual' | 'kinesthetic' | 'musical' | 'interpersonal' | 'intrapersonal' | 'naturalist';

const INTELLIGENCE_INFO: Record<Intelligence, { title: string; desc: string; icon: string }> = {
    linguistic: { title: "Word Smart (Linguistic)", desc: "You think in words and stories. You learn best by reading, writing, and explaining things out loud.", icon: "📚" },
    logical: { title: "Logic Smart (Logical-Mathematical)", desc: "You think like a puzzle master. You love finding patterns, solving problems, and organizing ideas.", icon: "🧩" },
    visual: { title: "Picture Smart (Visual-Spatial)", desc: "You think in images and colors. You learn best when there are diagrams, maps, or pictures.", icon: "🖼️" },
    kinesthetic: { title: "Body Smart (Bodily-Kinesthetic)", desc: "You think through movement. You understand things best by doing, building, acting, and hands-on experiences.", icon: "🏃" },
    musical: { title: "Music Smart (Musical)", desc: "You think in rhythms and beats. You are sensitive to rhythm, tone, and sound.", icon: "🎵" },
    interpersonal: { title: "People Smart (Interpersonal)", desc: "You think by bouncing ideas off others. You learn best when discussing or working in a team.", icon: "💬" },
    intrapersonal: { title: "Self Smart (Intrapersonal)", desc: "You think deeply inside yourself. You learn best when you have quiet time to reflect and work independently.", icon: "🧘" },
    naturalist: { title: "Nature Smart (Naturalist)", desc: "You think in classifications and categories. You learn best when you can connect concepts to the real world or nature.", icon: "🌿" }
};

interface Part1Question {
    id: string;
    text: string;
    options: { text: string; type: Intelligence }[];
}

const PART1_QUESTIONS: Part1Question[] = [
    {
        id: "q1",
        text: "When I need to remember a phone number or a new password, I usually:",
        options: [
            { text: "Repeat it out loud a few times or make up a rhythm for it.", type: "musical" },
            { text: "Write it down on a piece of paper or type it out.", type: "kinesthetic" },
            { text: "Visualize the pattern my fingers make on the keypad.", type: "visual" },
            { text: "Link the numbers to dates or mathematical patterns I know.", type: "logical" }
        ]
    },
    {
        id: "q2",
        text: "When I am trying to understand a completely new concept, I prefer it when:",
        options: [
            { text: "The teacher provides a clear, step-by-step logical breakdown.", type: "logical" },
            { text: "There is a chart, graph, or a highly visual mind-map explaining it.", type: "visual" },
            { text: "I can discuss it with a group of peers to bounce ideas around.", type: "interpersonal" },
            { text: "I am given the materials to build, test, or physically experiment.", type: "kinesthetic" }
        ]
    },
    {
        id: "q3",
        text: "If I am feeling stressed or need to clear my head, my instinct is to:",
        options: [
            { text: "Go for a walk outdoors or spend time with an animal.", type: "naturalist" },
            { text: "Retreat to a quiet room to be completely alone with my thoughts.", type: "intrapersonal" },
            { text: "Call a close friend to talk through exactly how I'm feeling.", type: "interpersonal" },
            { text: "Put on my favorite playlist or play an instrument.", type: "musical" }
        ]
    }
];

interface Part2Statement {
    id: string;
    text: string;
    type: Intelligence;
}

const PART2_STATEMENTS: Part2Statement[] = [
    { id: "s1", text: "I love reading books, articles, or stories in my free time.", type: "linguistic" },
    { id: "s2", text: "I often notice grammatical mistakes or enjoy playing word games.", type: "linguistic" },
    { id: "s3", text: "I find it easy to explain complex ideas to others using just my words.", type: "linguistic" },
    { id: "s4", text: "I enjoy solving brain teasers, logic puzzles, or strategy games.", type: "logical" },
    { id: "s5", text: "I like things to be organized, categorized, and have a clear order.", type: "logical" },
    { id: "s6", text: "I often ask 'why' and want to understand the underlying principles.", type: "logical" },
    { id: "s7", text: "I can easily picture vivid images, faces, or places in my mind's eye.", type: "visual" },
    { id: "s8", text: "I have a good sense of direction and rarely get lost using a map.", type: "visual" },
    { id: "s9", text: "I am drawn to art, photography, design, or architecture.", type: "visual" },
    { id: "s10", text: "I find it very difficult to sit completely still for long periods of time.", type: "kinesthetic" },
    { id: "s11", text: "I have good physical coordination and enjoy hands-on activities.", type: "kinesthetic" },
    { id: "s12", text: "I use a lot of hand gestures and body language when I talk.", type: "kinesthetic" },
    { id: "s13", text: "I frequently find myself tapping my foot, humming, or singing.", type: "musical" },
    { id: "s14", text: "I can easily tell when a note is out of tune or off-beat.", type: "musical" },
    { id: "s15", text: "I focus and study much better when there is background music.", type: "musical" },
    { id: "s16", text: "People often come to me for advice or to mediate conflicts.", type: "interpersonal" },
    { id: "s17", text: "I prefer working in a team environment rather than alone.", type: "interpersonal" },
    { id: "s18", text: "I can usually tell what other people are feeling without them saying it.", type: "interpersonal" },
    { id: "s19", text: "I keep a journal or regularly spend time reflecting on my goals.", type: "intrapersonal" },
    { id: "s20", text: "I am very aware of my own strengths, weaknesses, and triggers.", type: "intrapersonal" },
    { id: "s21", text: "I prefer to work alone on projects that are highly meaningful to me.", type: "intrapersonal" },
    { id: "s22", text: "I feel a deep connection to the outdoors, animals, or plants.", type: "naturalist" },
    { id: "s23", text: "I naturally notice different species or formations when outside.", type: "naturalist" },
    { id: "s24", text: "I care deeply about environmental issues and the natural world.", type: "naturalist" }
];

export function SuperpowerQuiz() {
    const [step, setStep] = useState<'intro' | 'part1' | 'part2' | 'results'>('intro');
    const [part1Index, setPart1Index] = useState(0);
    const [part1Answers, setPart1Answers] = useState<Record<string, Intelligence>>({});
    const [part2Answers, setPart2Answers] = useState<Record<string, number>>({});
    const [isCalculating, setIsCalculating] = useState(false);

    // Shuffle statements once on mount
    const shuffledStatements = useMemo(() => {
        return [...PART2_STATEMENTS].sort(() => Math.random() - 0.5);
    }, []);

    const handlePart1Select = (questionId: string, type: Intelligence) => {
        setPart1Answers(prev => ({ ...prev, [questionId]: type }));
        if (part1Index < PART1_QUESTIONS.length - 1) {
            setTimeout(() => setPart1Index(p => p + 1), 300);
        } else {
            setTimeout(() => setStep('part2'), 300);
        }
    };

    const handlePart2Select = (statementId: string, rating: number) => {
        setPart2Answers(prev => ({ ...prev, [statementId]: rating }));
    };

    const getTopSuperpowers = () => {
        const scores: Record<Intelligence, number> = {
            linguistic: 0, logical: 0, visual: 0, kinesthetic: 0,
            musical: 0, interpersonal: 0, intrapersonal: 0, naturalist: 0
        };

        // Part 1 answers are worth 3 points each to balance with Part 2 (3 questions * 5 max points)
        Object.values(part1Answers).forEach(type => {
            scores[type] += 3;
        });

        // Part 2 ratings (1-5 points)
        Object.entries(part2Answers).forEach(([id, rating]) => {
            const statement = PART2_STATEMENTS.find(s => s.id === id);
            if (statement) {
                scores[statement.type] += rating;
            }
        });

        // Sort by score descending
        return Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([type]) => type as Intelligence);
    };

    const showResults = () => {
        setIsCalculating(true);
        
        const topPowers = getTopSuperpowers();
        
        // Save anonymous
        try {
            const visitorId = localStorage.getItem('rp_visitor_id');
            if (visitorId) {
                fetch('/api/learning-styles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ visitor_id: visitorId, learning_style: topPowers[0] })
                });
            }
        } catch (e) {
            console.error(e);
        }
        
        setTimeout(() => {
            setIsCalculating(false);
            setStep('results');
        }, 1500);
    };

    const resetQuiz = () => {
        setPart1Answers({});
        setPart2Answers({});
        setPart1Index(0);
        setStep('intro');
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-12">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <AnimatePresence mode="wait">
                    {/* INTRO */}
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-6 relative z-10"
                        >
                            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
                                <Brain className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black text-white">Identify Your Learning Style</h3>
                            <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                                Ready to find out how your brain works best? Take this quick 3-minute interactive assessment to uncover your primary Multiple Intelligences.
                            </p>
                            <button
                                onClick={() => setStep('part1')}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-colors inline-flex items-center gap-2"
                            >
                                Start Assessment <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* PART 1 */}
                    {step === 'part1' && (
                        <motion.div
                            key={`p1-${part1Index}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 relative z-10"
                        >
                            <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                                <div>
                                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Part 1: Real-Life Scenarios</p>
                                    <p className="text-slate-400 text-sm">Choose the option that feels most natural to you.</p>
                                </div>
                                <span className="text-slate-500 text-sm font-mono">{part1Index + 1} / {PART1_QUESTIONS.length}</span>
                            </div>

                            <h4 className="text-xl md:text-2xl font-bold text-white mb-6">
                                {PART1_QUESTIONS[part1Index].text}
                            </h4>

                            <div className="space-y-3">
                                {PART1_QUESTIONS[part1Index].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePart1Select(PART1_QUESTIONS[part1Index].id, opt.type)}
                                        className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-indigo-900/30 hover:border-indigo-500/50 transition-all flex items-start gap-4 group"
                                    >
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-indigo-400 shrink-0 mt-0.5" />
                                        <span className="text-slate-200">{opt.text}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* PART 2 */}
                    {step === 'part2' && (
                        <motion.div
                            key="part2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8 relative z-10"
                        >
                            <div className="border-b border-slate-800 pb-4">
                                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Part 2: Self-Assessment</p>
                                <p className="text-slate-400 text-sm">Rate each statement on how well it describes you.</p>
                            </div>

                            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                {shuffledStatements.map((stmt, index) => (
                                    <div key={stmt.id} className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800">
                                        <p className="text-white mb-4"><span className="text-slate-500 mr-2">{index + 1}.</span>{stmt.text}</p>
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-xs text-slate-500 hidden sm:block w-20">Not me</span>
                                            <div className="flex flex-1 justify-between gap-1 sm:gap-2">
                                                {[1, 2, 3, 4, 5].map(rating => (
                                                    <button
                                                        key={rating}
                                                        onClick={() => handlePart2Select(stmt.id, rating)}
                                                        className={`flex-1 py-2 sm:py-3 rounded-lg text-sm font-bold transition-all ${
                                                            part2Answers[stmt.id] === rating
                                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                                : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                                                        }`}
                                                    >
                                                        {rating}
                                                    </button>
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-500 text-right hidden sm:block w-20">Exactly me</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={showResults}
                                    disabled={Object.keys(part2Answers).length < shuffledStatements.length || isCalculating}
                                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all flex items-center gap-2"
                                >
                                    {isCalculating ? (
                                        <><RefreshCw className="w-5 h-5 animate-spin" /> Calculating...</>
                                    ) : (
                                        <>Reveal My Learning Profile <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* RESULTS */}
                    {step === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8 relative z-10"
                        >
                            <div className="text-center space-y-2 mb-10">
                                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Assessment Complete</p>
                                <h3 className="text-3xl font-black text-white">Your Dominant Learning Styles</h3>
                            </div>

                            <div className="grid gap-4">
                                {getTopSuperpowers().map((type, i) => {
                                    const info = INTELLIGENCE_INFO[type];
                                    return (
                                        <div key={type} className={`p-6 rounded-2xl border ${i === 0 ? 'bg-indigo-900/30 border-indigo-500/50' : 'bg-slate-800/50 border-slate-700'}`}>
                                            <div className="flex items-start gap-4">
                                                <div className="text-4xl">{info.icon}</div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {i === 0 && <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] uppercase font-bold tracking-widest rounded">Primary</span>}
                                                        {i === 1 && <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-[10px] uppercase font-bold tracking-widest rounded">Secondary</span>}
                                                        {i === 2 && <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] uppercase font-bold tracking-widest rounded">Tertiary</span>}
                                                    </div>
                                                    <h4 className="text-xl font-bold text-white mb-2">{info.title}</h4>
                                                    <p className="text-slate-300 text-sm leading-relaxed">{info.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-6 border-t border-slate-800 text-center">
                                <button
                                    onClick={resetQuiz}
                                    className="text-slate-400 hover:text-white text-sm transition-colors"
                                >
                                    Retake Assessment
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
