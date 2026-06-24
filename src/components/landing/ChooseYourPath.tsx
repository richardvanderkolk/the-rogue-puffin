"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Brain, BookOpen, ArrowRight, Check, Activity, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface ChooseYourPathProps {
    symbol: string;
    currency: string;
}

export function ChooseYourPath({ symbol, currency }: ChooseYourPathProps) {
    const [showSyllabus, setShowSyllabus] = useState(false);
    const [currencyInfo, setCurrencyInfo] = useState({ symbol, currency });

    useEffect(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        fetch(`/api/currency?tz=${encodeURIComponent(tz)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.symbol) {
                    setCurrencyInfo(data);
                }
            })
            .catch(err => console.error("Failed to load currency info:", err));
    }, []);

    return (
        <section id="pricing" className="py-24 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">
                        <Activity className="w-3.5 h-3.5" /> Choose Your Path
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Verifiable Progress</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                        Start for free to test your capabilities, block out your core 14-day study habits, or subscribe for ongoing reading and study tools.
                    </p>
                </div>

                {/* 3 Core Product Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    
                    {/* Path 1: The Rogue Session */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-indigo-500/10 border border-indigo-500/25 rounded-2xl text-indigo-400">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-indigo-500/25">Surprise yourself</span>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white">The Rogue Session</h3>
                                <p className="text-xs text-slate-500 mt-1">30-Minute Speed Diagnostic</p>
                                <div className="text-3xl font-black text-white mt-4">Free</div>
                            </div>
                            
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                Measure your before and after speed to discover how much the drills increase your speed without losing comprehension.
                            </p>
                            
                            <ul className="space-y-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-light">
                                <li className="flex items-center gap-2">
                                    <span className="text-indigo-400 font-bold">✓</span> Baseline Speed Assessment
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-indigo-400 font-bold">✓</span> Subvocalization Break-in Drill
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-indigo-400 font-bold">✓</span> 100% Free, No Account Needed
                                </li>
                            </ul>
                        </div>
                        
                        <div className="pt-8">
                            <Link 
                                href="/rogue-session/start?v2=true&mode=assessment" 
                                className="block w-full py-4 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 rounded-xl font-bold text-sm text-center transition-all"
                            >
                                Start Free Session
                            </Link>
                        </div>
                    </div>

                    {/* Path 2: The Learning Bootcamp */}
                    <div className="bg-slate-905 border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] group hover:border-indigo-400/50 transition-all duration-300">
                        <div className="absolute top-0 right-0 bg-indigo-500/10 text-indigo-300 px-4 py-1 rounded-bl-2xl text-[10px] font-extrabold uppercase tracking-widest border-b border-l border-slate-800">Flagship</div>
                        
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-indigo-400">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-indigo-500/30">Training</span>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white">Learning Bootcamp</h3>
                                <p className="text-xs text-indigo-300 mt-1">14-Day Habit Integration</p>
                                <div className="text-3xl font-black text-white mt-4 flex flex-wrap items-baseline gap-2">
                                    {currencyInfo.symbol}29
                                    <span className="text-xs text-slate-400 font-normal tracking-tight normal-case">one-time payment, lifetime access</span>
                                </div>
                            </div>
                            
                            <p className="text-sm text-slate-300 font-light leading-relaxed">
                                Discover the difference it makes when you apply scientifically proven strategies to your learning while embedding your new reading speed.
                            </p>
                            
                            <ul className="space-y-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300 font-light">
                                <li className="flex items-center gap-2">
                                    <span className="text-indigo-400 font-bold">✓</span> Full 14 daily training modules
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-indigo-400 font-bold">✓</span> Personalized Learning Style Diagnosis
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-indigo-400 font-bold">✓</span> Spaced Repetition & recall habits
                                </li>
                            </ul>
                        </div>
                        
                        <div className="pt-8 space-y-3">
                            <button 
                                onClick={() => setShowSyllabus(!showSyllabus)}
                                className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-indigo-300 hover:text-indigo-200 border border-indigo-500/20 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                            >
                                {showSyllabus ? (
                                    <>Hide 14-Day Syllabus <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>View 14-Day Syllabus <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                            <Link 
                                href="/bootcamp" 
                                className="block w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-sm text-center transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                            >
                                Unlock 14-Day Bootcamp
                            </Link>
                        </div>
                    </div>

                    {/* Path 3: Rogue Mastery */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-purple-500/10 border border-purple-500/25 rounded-2xl text-purple-400">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-purple-500/25">Subscription</span>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white">Rogue Mastery</h3>
                                <p className="text-xs text-slate-500 mt-1">Ongoing Study Toolkit & Reader</p>
                                <div className="text-3xl font-black text-white mt-4">{currencyInfo.symbol}9 <span className="text-sm text-slate-400 font-medium">/ MONTH</span></div>
                            </div>
                            
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                Join the Rogue Learning Community and access a reading and learning engine that you can input your own study materials into.
                            </p>
                            
                            <ul className="space-y-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-light">
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400 font-bold">✓</span> BYOB RSVP & Highlight Pacer
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400 font-bold">✓</span> Bionic Scroll Reader Formatter
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400 font-bold">✓</span> Feynman Synthesizer & Memory Decks
                                </li>
                            </ul>
                        </div>
                        
                        <div className="pt-8">
                            <Link 
                                href="/mastery" 
                                className="block w-full py-4 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 rounded-xl font-bold text-sm text-center transition-all"
                            >
                                Explore Mastery Tools
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Interactive Expandable Syllabus Details */}
                {showSyllabus && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-10 animate-fadeIn relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
                            <div>
                                <h3 className="text-2xl font-black text-white">Syllabus Overview</h3>
                                <p className="text-sm text-slate-400 mt-1 font-light">
                                    14 daily modules designed to lock in permanent cognitive habits in 15 minutes a day.
                                </p>
                            </div>
                            <button 
                                onClick={() => setShowSyllabus(false)}
                                className="text-xs font-semibold text-slate-450 hover:text-white px-4 py-2 bg-slate-800 rounded-full border border-slate-700/60 shrink-0 self-start md:self-center transition-colors"
                            >
                                Close Syllabus
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            {/* Phase 1 */}
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-indigo-400 uppercase tracking-widest font-extrabold block">Days 01 - 04</span>
                                    <h4 className="text-lg font-bold text-white mt-1">Phase 1: Cognitive Recalibration</h4>
                                    <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                                        Diagnose your baseline limitations and disable inner voice subvocalization.
                                    </p>
                                </div>
                                <div className="space-y-4 border-t border-slate-800/60 pt-4">
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-indigo-400 font-mono font-bold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mt-0.5">Day 1</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Discover Possibilities</h5>
                                            <p className="text-slate-450 text-[11px] mt-0.5">Learn visual speed tracking and shut down subvocalization.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-indigo-400 font-mono font-bold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mt-0.5">Day 2</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Learning Style Diagnosis</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Find out if your style is Visual, Auditory, or Kinesthetic.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-indigo-400 font-mono font-bold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mt-0.5">Day 3</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Memory Baseline</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Map your short-term and working memory limits.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-indigo-400 font-mono font-bold text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mt-0.5">Day 4</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Know Your Motivation</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Uncover cognitive focus blockers and expand visual span.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2 */}
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-purple-400 uppercase tracking-widest font-extrabold block">Days 05 - 09</span>
                                    <h4 className="text-lg font-bold text-white mt-1">Phase 2: Structural Intake</h4>
                                    <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                                        Overcome physical fatigue, bypass procrastination, and map text layouts.
                                    </p>
                                </div>
                                <div className="space-y-4 border-t border-slate-800/60 pt-4">
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-purple-400 font-mono font-bold text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded mt-0.5">Day 5</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Learning Mindset</h5>
                                            <p className="text-slate-450 text-[11px] mt-0.5">Set physical environments and trigger long-duration focus.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-purple-400 font-mono font-bold text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded mt-0.5">Day 6</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Feel Sharp State</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Hydration, visual peripheral exercises, and stress regulation.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-purple-400 font-mono font-bold text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded mt-0.5">Day 7</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Friction of Starting</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Apply activation energy triggers to defeat study blockages.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-purple-400 font-mono font-bold text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded mt-0.5">Day 8</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Pre-Mapping Overview</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Read indices and section layouts before touching details.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-purple-400 font-mono font-bold text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded mt-0.5">Day 9</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Active Reading Interrogation</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Construct active text questions to lock in comprehension.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3 */}
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs text-emerald-400 uppercase tracking-widest font-extrabold block">Days 10 - 14</span>
                                    <h4 className="text-lg font-bold text-white mt-1">Phase 3: Deep Mastery</h4>
                                    <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                                        Build visual mind maps, practice Feynman notes, and program spaced recall.
                                    </p>
                                </div>
                                <div className="space-y-4 border-t border-slate-800/60 pt-4">
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-emerald-400 font-mono font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mt-0.5">Day 10</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Genius Note-Taking</h5>
                                            <p className="text-slate-450 text-[11px] mt-0.5">Apply graphical mind-maps matching neural data patterns.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-emerald-400 font-mono font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mt-0.5">Day 11</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">The Feynman Technique</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Simplify complex concepts into plain, jargon-free explanations.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-emerald-400 font-mono font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mt-0.5">Day 12</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Forgetting Curve Spacing</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Install structured retrieval lists for permanent recall.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-emerald-400 font-mono font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mt-0.5">Day 13</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Timeboxing & Parkinson's Law</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Leverage compressed target timers for high-speed focus.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start text-left">
                                        <span className="text-emerald-400 font-mono font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mt-0.5">Day 14</span>
                                        <div>
                                            <h5 className="font-bold text-white text-xs">Environment & Peer Structures</h5>
                                            <p className="text-slate-455 text-[11px] mt-0.5">Configure study settings and accountability to secure habits.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-4 border-t border-slate-800/80">
                            <Link 
                                href="/bootcamp" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                            >
                                Explore Interactive Roadmap <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
