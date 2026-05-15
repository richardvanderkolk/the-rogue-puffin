"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Zap, Brain, Anchor, ArrowRight, Star, TrendingUp, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WpmProgressGraph from '@/components/ui/WpmProgressGraph';
import { supabase } from '@/lib/supabase/client';

const INTELLIGENCE_INFO: Record<string, { title: string; icon: string }> = {
    linguistic: { title: "Word Smart", icon: "📚" },
    logical: { title: "Logic Smart", icon: "🧩" },
    visual: { title: "Picture Smart", icon: "🖼️" },
    kinesthetic: { title: "Body Smart", icon: "🏃" },
    musical: { title: "Music Smart", icon: "🎵" },
    interpersonal: { title: "People Smart", icon: "💬" },
    intrapersonal: { title: "Self Smart", icon: "🧘" },
    naturalistic: { title: "Nature Smart", icon: "🌿" }
};

function RogueGraduationContent() {
    const searchParams = useSearchParams();

    const [mounted, setMounted] = useState(false);
    
    // User Metrics State
    const [superpowers, setSuperpowers] = useState<string[]>([]);
    const [wpmBaseline, setWpmBaseline] = useState<number>(250);
    const [wpmFinal, setWpmFinal] = useState<number>(420);
    const [wpmHistory, setWpmHistory] = useState<{day: number, wpm: number}[]>([]);
    const [memoryBaseline, setMemoryBaseline] = useState<number>(6);
    const [memoryScore, setMemoryScore] = useState<number>(28);
    const [anchor, setAnchor] = useState<string>("To learn faster and reclaim my time.");

    useEffect(() => {
        setMounted(true);
        
        const fetchGraduationData = async () => {
            // 1. Fetch WPM History from Supabase (Primary)
            let dbHistory: {day: number, wpm: number}[] = [];
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data, error } = await supabase
                        .from('training_sessions')
                        .select('day_id, average_wpm')
                        .eq('user_id', user.id)
                        .order('day_id', { ascending: true });
                    
                    if (!error && data) {
                        const map = new Map<number, number>();
                        data.forEach(d => {
                            if (d.average_wpm) map.set(d.day_id, d.average_wpm);
                        });
                        dbHistory = Array.from(map.entries()).map(([day, wpm]) => ({ day, wpm })).sort((a, b) => a.day - b.day);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch history from Supabase", e);
            }

            if (dbHistory.length > 0) {
                setWpmHistory(dbHistory);
                setWpmBaseline(dbHistory[0].wpm);
                setWpmFinal(dbHistory[dbHistory.length - 1].wpm);
            } else {
                // Fallback to local storage if DB is empty
                const localWpmHistory = localStorage.getItem('rogue_daily_wpm_history');
                if (localWpmHistory) {
                    try {
                        const parsedHistory = JSON.parse(localWpmHistory);
                        if (parsedHistory && parsedHistory.length > 0) {
                            setWpmHistory(parsedHistory);
                            setWpmBaseline(parsedHistory[0].wpm);
                            setWpmFinal(parsedHistory[parsedHistory.length - 1].wpm);
                        }
                    } catch (e) {}
                }
            }

            // 2. Fetch other non-critical data from local storage
            try {
                const localSuper = localStorage.getItem('rogue_superpowers');
                if (localSuper) {
                    const parsed = JSON.parse(localSuper);
                    if (parsed && parsed.length > 0) setSuperpowers(parsed);
                } else {
                    setSuperpowers(['logical', 'visual', 'kinesthetic']); // Fallback
                }
            } catch (error) {
                setSuperpowers(['logical', 'visual', 'kinesthetic']);
            }
        };

        fetchGraduationData();
    }, []);

    if (!mounted) return <div className="min-h-screen bg-black" />;

    const primaryPower = superpowers[0];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-x-hidden">
            {/* Celebration Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <main className="flex-1 relative z-10 flex flex-col items-center justify-center pt-24 pb-12 px-6">
                <div className="w-full max-w-5xl space-y-12">
                    
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/20 rounded-full border border-indigo-500/30 mb-4 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                            <Award className="w-16 h-16 text-indigo-400" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                            Bootcamp <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Complete</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                            Fourteen days ago, you started a journey to rewire how your brain acquires knowledge. Look at what you've achieved.
                        </p>
                    </motion.div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        
                        {/* Reading Speed Metric */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -z-10 transition-colors" />
                            <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                                <Zap className="w-6 h-6 text-emerald-400" /> 
                                Processing Speed
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Before</p>
                                    <p className="text-3xl font-mono font-bold text-slate-300">{wpmBaseline} <span className="text-sm text-slate-600">WPM</span></p>
                                </div>
                                <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/30 relative">
                                    <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-1">After</p>
                                    <p className="text-4xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{wpmFinal} <span className="text-sm text-emerald-600">WPM</span></p>
                                    <div className="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                                        <TrendingUp className="w-3 h-3" /> +{Math.round(((wpmFinal - wpmBaseline) / wpmBaseline) * 100)}%
                                    </div>
                                </div>
                            </div>
                            
                            {/* NEW GRAPH SECTION */}
                            {wpmHistory.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-slate-800">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">14-Day Trajectory</div>
                                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
                                        <WpmProgressGraph data={wpmHistory} height={180} />
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Memory Metric */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -z-10 transition-colors" />
                            <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                                <Brain className="w-6 h-6 text-amber-400" /> 
                                Memory Retention
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Before</p>
                                    <p className="text-3xl font-mono font-bold text-slate-300">
                                        {memoryBaseline}<span className="text-sm text-slate-600">/30</span>
                                    </p>
                                </div>
                                <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-500/30 relative">
                                    <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">After</p>
                                    <p className="text-4xl font-mono font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                        {memoryScore}<span className="text-sm text-amber-600/50">/30</span>
                                    </p>
                                    <div className="absolute -top-3 -right-3 bg-amber-500 text-slate-950 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-amber-500/20">
                                        <TrendingUp className="w-3 h-3" /> +{Math.round(((memoryScore - memoryBaseline) / memoryBaseline) * 100)}%
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Learning Superpowers */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-8"
                        >
                            <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                                <Star className="w-6 h-6 text-fuchsia-400" /> 
                                Your Learning Superpowers
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                {superpowers.map((power, idx) => (
                                    <div key={power} className={`flex-1 p-6 rounded-2xl border ${idx === 0 ? 'bg-indigo-900/30 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'bg-slate-950 border-slate-800'}`}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl">{INTELLIGENCE_INFO[power]?.icon}</span>
                                            {idx === 0 && <span className="bg-indigo-500/20 text-indigo-300 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">Primary</span>}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{INTELLIGENCE_INFO[power]?.title}</h3>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-400 text-sm mt-6 text-center">
                                You no longer learn "the normal way." You now translate difficult concepts into your native cognitive language.
                            </p>
                        </motion.div>

                        {/* The Anchor */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="md:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-950/30 border border-slate-800 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
                        >
                            <Anchor className="absolute -right-10 -bottom-10 w-64 h-64 text-indigo-500/5 rotate-12" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-6">Your Anchor</h2>
                            <blockquote className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                                "{anchor}"
                            </blockquote>
                            <p className="text-slate-400 mt-8 font-medium">Never forget why you started.</p>
                        </motion.div>
                    </div>

                    {/* Early Adopter / Final CTA */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col items-center pt-8 max-w-2xl mx-auto text-center space-y-8"
                    >
                        <div className="bg-indigo-900/30 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl -z-10" />
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                                <Sparkles className="w-6 h-6 text-indigo-400" /> Early Adopter Perks
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                                Congratulations on completing the protocol! Because you joined us early, you have secured <strong>free lifetime access</strong> to the Digital Textbook and the Rogue Community. We are putting the finishing touches on them right now, and we will email you the moment they go live.
                            </p>
                        </div>

                        <Link href="/bootcamp" className="group relative inline-flex items-center justify-center px-10 py-6 text-xl font-bold text-white bg-slate-800 rounded-2xl overflow-hidden transition-all hover:scale-105 hover:bg-slate-700">
                            <span className="relative flex items-center gap-3">
                                Return to Dashboard
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}

export default function RogueGraduationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <RogueGraduationContent />
        </Suspense>
    );
}
