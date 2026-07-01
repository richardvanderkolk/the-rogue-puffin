"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Database, Map, Play, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

interface UnifiedHeroWidgetProps {
    user: any;
    hasPaid: boolean;
    symbol: string;
}

export function UnifiedHeroWidget({ user, hasPaid, symbol }: UnifiedHeroWidgetProps) {
    const [activeLayer, setActiveLayer] = useState<'input' | 'storage' | 'compression' | 'engine'>('input');
    const [flipped, setFlipped] = useState(false);
    const [visitorId, setVisitorId] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setVisitorId(localStorage.getItem('rp_visitor_id') || '');
        }
    }, []);

    const layers = [
        {
            id: 'input' as const,
            stepNum: '01',
            label: 'Input',
            title: 'Think-Reading (Visual)',
            icon: <Eye className="w-4 h-4 text-indigo-400" />,
            heading: 'Hearing Speed → Thinking Speed',
            desc: 'We train your eyes to see words like pictures, breaking subvocalization (saying words in your head). This increases reading speed to 400-800+ WPM.',
            skepticismQ: 'Is this just skimming and losing understanding?',
            skepticismA: 'No. Skimming skips words. This is visual chunking—seeing groups of words together. Because your brain processes visual images 60,000x faster than sounds, this keeps your mind fully focused and actually increases comprehension.',
            colorClass: 'text-indigo-400',
            bgGlow: 'bg-indigo-500/5',
            borderColor: 'border-indigo-500/20'
        },
        {
            id: 'storage' as const,
            stepNum: '02',
            label: 'Storage',
            title: 'The Memory Cabinet',
            icon: <Database className="w-4 h-4 text-purple-400" />,
            heading: 'Forgetting Cycle → Permanent Storage',
            desc: 'Instead of throwing facts onto a messy pile, we build mental filing systems (using memory hooks and spaced repetition) to store information permanently.',
            skepticismQ: 'What if I just have a naturally bad memory?',
            skepticismA: 'There is no such thing as a bad memory, only an unorganized one. Your brain remembers layouts and pictures naturally. We teach you how to file text away visually so you can retrieve it instantly.',
            colorClass: 'text-purple-400',
            bgGlow: 'bg-purple-500/5',
            borderColor: 'border-purple-500/20'
        },
        {
            id: 'compression' as const,
            stepNum: '03',
            label: 'Compression',
            title: 'The Treasure Map',
            icon: <Map className="w-4 h-4 text-emerald-400" />,
            heading: 'Copying Texts → Smart Synthesis',
            desc: 'Writing pages of notes is slow and useless. We teach you to compile notes like "treasure maps" (non-linear notes and the Feynman technique) that isolate core concepts in seconds.',
            skepticismQ: 'I hate note-taking, it is boring.',
            skepticismA: 'Passive note-taking is boring. Active concept mapping turns studying into a fast, creative game. You only write what matters, meaning you study 5x faster and recall it perfectly.',
            colorClass: 'text-emerald-400',
            bgGlow: 'bg-emerald-500/5',
            borderColor: 'border-emerald-500/20'
        },
        {
            id: 'engine' as const,
            stepNum: '04',
            label: 'Engine',
            title: 'Zero-Willpower Habits',
            icon: <Play className="w-4 h-4 text-amber-400" />,
            heading: 'Raw Willpower → Easy Action Triggers',
            desc: 'Lifting a boulder takes raw strength. Pushing a rolling ball is easy. We show you how to structure daily habit triggers (If-Then triggers) so learning has zero starting friction.',
            skepticismQ: 'I lack self-discipline and motivation.',
            skepticismA: 'Discipline is a myth. Successful learners don\'t have higher willpower; they have lower activation friction. We build daily triggers into your routine so you execute automatically.',
            colorClass: 'text-amber-400',
            bgGlow: 'bg-amber-500/5',
            borderColor: 'border-amber-500/20'
        }
    ];

    const activeInfo = layers.find(l => l.id === activeLayer)!;

    const checkoutLink = `/api/checkout?productId=bootcamp${visitorId ? `&visitor_id=${visitorId}` : ''}`;
    
    // Determine dynamic options links
    const option1Link = user 
        ? (hasPaid ? "/bootcamp" : "/dashboard")
        : "/rogue-session/start?v2=true&mode=assessment";
    
    const option1Text = user 
        ? (hasPaid ? "Resume My Bootcamp" : "Go to Student Dashboard")
        : "Option 1: Start Free Masterclass";

    const option2Link = hasPaid ? "/bootcamp" : checkoutLink;
    const option2Text = hasPaid ? "Enter Bootcamp" : `Option 2: 14-Day Bootcamp (${symbol}29)`;

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col w-full max-w-lg mx-auto group">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
            
            <div className="border-b border-white/5 pb-3 mb-4">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">The Cognitive OS</span>
                <h3 className="text-md font-bold text-white mt-0.5">Explore the 4 components of learning mastery:</h3>
            </div>

            {/* Horizontal Step Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                {layers.map(layer => {
                    const isSelected = activeLayer === layer.id;
                    return (
                        <button
                            key={layer.id}
                            onClick={() => {
                                setActiveLayer(layer.id);
                                setFlipped(false);
                            }}
                            className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center text-center relative ${
                                isSelected 
                                    ? 'bg-slate-950 border-white/10 shadow-lg' 
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                            }`}
                        >
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                                Step {layer.stepNum}
                            </span>
                            <span className={`text-[9px] font-medium tracking-wide mt-0.5 ${isSelected ? layer.colorClass : 'text-slate-400'}`}>
                                {layer.label}
                            </span>
                            {isSelected && (
                                <motion.div 
                                    layoutId="activeBorder"
                                    className="absolute inset-0 rounded-xl border border-indigo-500/50 pointer-events-none"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Expanded Layer Detail Box */}
            <div className="min-h-[170px] bg-slate-950/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none`} />
                
                <AnimatePresence mode="wait">
                    {!flipped ? (
                        <motion.div
                            key={`front-${activeLayer}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="space-y-2 flex-grow flex flex-col justify-between"
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                    {activeInfo.icon}
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeInfo.title}</span>
                                </div>
                                <h4 className="text-sm font-bold text-white leading-tight">{activeInfo.heading}</h4>
                                <p className="text-xs text-slate-400 font-light leading-relaxed">{activeInfo.desc}</p>
                            </div>
                            
                            <button
                                onClick={() => setFlipped(true)}
                                className="text-left text-[10px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors pt-2 flex items-center gap-1 mt-auto border-t border-white/5 w-full"
                            >
                                <AlertCircle className="w-3 h-3" />
                                <span>Common doubt: "{activeInfo.skepticismQ}"</span>
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`back-${activeLayer}`}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="space-y-2 flex-grow flex flex-col justify-between"
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-1 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>Objection Answered</span>
                                </div>
                                <p className="text-xs text-slate-300 font-light leading-relaxed bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
                                    {activeInfo.skepticismA}
                                </p>
                            </div>
                            
                            <button
                                onClick={() => setFlipped(false)}
                                className="text-left text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors pt-2 flex items-center gap-1 mt-auto border-t border-white/5 w-full"
                            >
                                <RefreshCw className="w-3 h-3" />
                                <span>Return to layer overview</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action CTAs */}
            <div className="mt-4 pt-3 border-t border-white/5 space-y-2.5">
                <Link
                    href={option1Link}
                    className="w-full relative py-3.5 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 border border-indigo-400/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                >
                    {option1Text}
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                    href={option2Link}
                    className="w-full py-3.5 bg-slate-950 hover:bg-slate-900 text-slate-200 border border-white/10 hover:border-white/20 rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2"
                >
                    {option2Text}
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="text-center text-[10px] text-slate-500 font-medium">
                    * Minimum requirement: 12-year-old reading ability. This is practice-based, not a magic pill.
                </div>
            </div>
        </div>
    );
}
