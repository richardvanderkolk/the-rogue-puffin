"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminBypassLink } from "@/components/AdminBypassLink";
import { usePostHog } from 'posthog-js/react';
import { CheckCircle2, Lock, Zap, Target, Brain, BookOpen, Activity, Database, ArrowRight, ArrowDown, Search, Network, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PromoCodeSection } from "@/components/PromoCodeSection";

export function BootcampRoadmap({ isUnlocked: propIsUnlocked, symbol, initialProgress = 1 }: { isUnlocked: boolean, symbol: string, initialProgress?: number }) {
    const [isUnlocked, setIsUnlocked] = useState(propIsUnlocked);
    const [currentProgress, setCurrentProgress] = useState(initialProgress);
    const [visitorId, setVisitorId] = useState<string>('');
    const [showOnboarding, setShowOnboarding] = useState(false);
    const posthog = usePostHog();

    useEffect(() => {
        setIsUnlocked(propIsUnlocked);
    }, [propIsUnlocked]);

    useEffect(() => {
        if (!isUnlocked) {
            const locallyUnlocked = localStorage.getItem('rp_bootcamp_unlocked') === 'true';
            if (locallyUnlocked) {
                setIsUnlocked(true);
            }
        }
    }, [isUnlocked]);

    useEffect(() => {
        // If the server tells us they are further along than we thought, update.
        // Also fallback to localStorage if they are playing without logging in.
        const localProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        const resolvedProgress = localProgress > initialProgress ? localProgress : initialProgress;
        setCurrentProgress(resolvedProgress);
        
        setVisitorId(localStorage.getItem('rp_visitor_id') || '');

        // Post-Purchase Onboarding Logic
        if (isUnlocked && resolvedProgress === 1) {
            const hasSeen = localStorage.getItem('rp_has_seen_onboarding');
            if (!hasSeen) {
                setShowOnboarding(true);
            }
        }
    }, [initialProgress, isUnlocked]);

    const handleCloseOnboarding = () => {
        localStorage.setItem('rp_has_seen_onboarding', 'true');
        setShowOnboarding(false);
    };

    // Base definition of all days
    const checkoutLink = `/api/checkout?productId=bootcamp${visitorId ? `&visitor_id=${visitorId}` : ''}`;
    
    const baseDays = [
        { day: 1, title: "Discover Reading Possibilities", desc: "The Subvocalization Drill", icon: <Zap className="w-5 h-5" />, link: "/rogue-session/start?v2=true" },
        { day: 2, title: "Identify Your Learning Style", desc: "Diagnosing your learning style", icon: <Brain className="w-5 h-5" />, link: isUnlocked ? "/rogue-superpower-session/start?course=bootcamp" : checkoutLink },
        { day: 3, title: "Memory Training", desc: "The foundational memory protocols", icon: <Target className="w-5 h-5" />, link: "/rogue-memory-session/start?course=bootcamp" },
        { day: 4, title: "Know Your Why", desc: "Setting your foundation & peripheral vision", icon: <Brain className="w-5 h-5" />, link: "/rogue-day-4/start?course=bootcamp" },
        { day: 5, title: "A Learning Mindset", desc: "The psychological foundation & kinetic words", icon: <Brain className="w-5 h-5" />, link: "/rogue-day-5/start?course=bootcamp" },
        { day: 6, title: "Feel Sharp", desc: "The physical foundation & speed expansion", icon: <Activity className="w-5 h-5" />, link: "/rogue-day-6/start?course=bootcamp" },
        { day: 7, title: "The Friction of Starting", desc: "Overcoming activation energy", icon: <Activity className="w-5 h-5" />, link: "/rogue-day-7/start?course=bootcamp" },
        { day: 8, title: "Get an Overview", desc: "Building the mental scaffold", icon: <BookOpen className="w-5 h-5" />, link: "/rogue-day-8/start?course=bootcamp" },
        { day: 9, title: "Active Reading", desc: "Interrogating the text", icon: <Search className="w-5 h-5" />, link: "/rogue-day-9/start?course=bootcamp" },
        { day: 10, title: "Genius Note-Taking", desc: "Non-linear mind mapping", icon: <Network className="w-5 h-5" />, link: "/rogue-day-10/start?course=bootcamp" },
        { day: 11, title: "The Feynman Technique", desc: "The illusion of knowledge", icon: <MessageCircle className="w-5 h-5" />, link: "/rogue-day-11/start?course=bootcamp" },
        { day: 12, title: "Defeating the Forgetting Curve", desc: "Spaced repetition strategy", icon: <Database className="w-5 h-5" />, link: "/rogue-day-12/start?course=bootcamp" },
        { day: 13, title: "Time & Deadlines", desc: "Defeating Parkinson's Law", icon: <ClockIcon className="w-5 h-5" />, link: "/rogue-day-13/start?course=bootcamp" },
        { day: 14, title: "Show Me Your Friends", desc: "Your relational learning ecosystem", icon: <Target className="w-5 h-5" />, link: "/rogue-day-14/start?course=bootcamp" },
    ];

    // Evaluate dynamic status
    // If not unlocked, cap effective progress at 2 so they can't access Day 3+, but if they somehow completed Day 2 (e.g. admin bypass), let Day 2 show as completed by capping at 3.
    const effectiveProgress = isUnlocked ? currentProgress : Math.min(currentProgress, 3);

    const days = baseDays.map(day => {
        let status = "locked";
        
        // Day 1 is always completed if progress > 1, otherwise available
        if (day.day === 1) {
            status = effectiveProgress > 1 ? "completed" : "available";
        } 
        // Day 2 depends on unlock status, but if they already completed it (progress > 2), show as completed
        else if (day.day === 2) {
            if (effectiveProgress > 2) {
                status = "completed";
            } else if (!isUnlocked) {
                status = "unlocked"; // "Unlock required"
            } else {
                status = effectiveProgress === 2 ? "available" : "locked";
            }
        } 
        // Days 3-14 are locked if not unlocked, else depend on progress
        else {
            if (!isUnlocked) {
                status = "locked";
            } else {
                if (effectiveProgress > day.day) status = "completed";
                else if (effectiveProgress === day.day) status = "available";
                else status = "locked";
            }
        }

        return { ...day, status };
    });

    const completedDays = Math.min(Math.max(effectiveProgress - 1, 0), 14); // effectiveProgress - 1 represents how many days are fully completed.
    const totalDays = 14;
    const progressPercentage = (completedDays / totalDays) * 100;

    const nextDay = days.find(d => d.status === "available");

    return (
        <>
            <AnimatePresence>
                {showOnboarding && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-10 max-w-2xl w-full relative shadow-[0_0_50px_rgba(99,102,241,0.15)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
                            
                            <button 
                                onClick={handleCloseOnboarding}
                                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                <div className="p-4 bg-indigo-500/20 rounded-full">
                                    <Target className="w-10 h-10 text-indigo-400" />
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                    Welcome to the Boot Camp.
                                </h2>
                                
                                <div className="space-y-4 text-left w-full bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                                    <p className="text-slate-300">
                                        <span className="font-bold text-white">How it works:</span> You now have access to 14 daily protocols. 
                                    </p>
                                    <ul className="space-y-3 text-slate-400">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Do one protocol a day.</strong> Do not skip ahead. It takes time for new neural pathways to settle.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>It takes 15 minutes.</strong> Pick a consistent time (e.g., right after your morning coffee).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span><strong>Trust the process.</strong> You will read slower at first as you break old habits. By Day 14, you will be flying.</span>
                                        </li>
                                    </ul>
                                </div>

                                <button 
                                    onClick={handleCloseOnboarding}
                                    className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    I understand. Let's begin.
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Returning User Welcome Back Banner (For Unlocked Users) */}
            {isUnlocked && (
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        
                        <div className="relative z-10 space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                                <Activity className="w-3 h-3" /> Boot Camp Progress
                            </div>
                            
                            {completedDays === 14 ? (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                        Boot Camp Completed!
                                    </h2>
                                    <p className="text-slate-300 text-lg">
                                        You have successfully completed the 14-day cognitive reading protocol.
                                    </p>
                                </>
                            ) : nextDay ? (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                        Ready for Day {nextDay.day}?
                                    </h2>
                                    <p className="text-slate-300 text-lg">
                                        <span className="font-bold text-white">{nextDay.title}:</span> {nextDay.desc}
                                    </p>
                                </>
                            ) : null}
                        </div>
                        
                        <div className="relative z-10 shrink-0 w-full md:w-auto">
                            {completedDays === 14 ? (
                                <Link href="/rogue-graduation" className="w-full md:w-auto px-8 py-4 bg-emerald-500 text-white rounded-full font-bold text-lg hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> View Certificate
                                </Link>
                            ) : nextDay ? (
                                <Link href={nextDay.link} className="w-full md:w-auto px-8 py-5 bg-indigo-500 text-white rounded-full font-black text-xl hover:bg-indigo-400 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 flex items-center justify-center gap-3 group">
                                    Start Protocol <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </section>
            )}

            {/* The High-Authority Pitch Box (For Locked Users) */}
            {!isUnlocked && (
                <section className="mb-12">
                    <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest">
                                 <Zap className="w-3 h-3" /> 14-Day Learning Mastery Bootcamp
                             </div>
                             
                             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                 Inside the 14-Day <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Learning Mastery Bootcamp.</span>
                             </h2>
                             
                             <div className="space-y-6 text-left max-w-2xl mx-auto w-full mt-4">
                                 {/* habit Problem Statement */}
                                 <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-start gap-4 mb-4">
                                     <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0 mt-0.5">
                                         <Activity className="w-5 h-5 text-indigo-400" />
                                     </div>
                                     <p className="text-sm text-slate-300 leading-relaxed font-light">
                                         <span className="font-bold text-indigo-400">The Problem:</span> Highlighting textbooks and re-reading notes creates a temporary "illusion of competence." To build permanent recall, you need a structured daily rhythm to wire in actual cognitive habits.
                                     </p>
                                 </div>

                                 <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed text-center mb-6">
                                      Reading speed is one of the steps, but there are many more. Unlock the complete 14-day sprint to wire in systematic visual habits, conceptual synthesis, and spaced memory recall.
                                 </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 bg-slate-950/40 p-6 rounded-2xl border border-white/5">
                                    {baseDays.map((d) => (
                                        <div key={d.day} className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-xs text-purple-300 font-mono font-bold shrink-0 mt-0.5">
                                                {d.day}
                                            </span>
                                            <div className="space-y-0.5">
                                                <h4 className="text-sm font-bold text-slate-200">{d.title}</h4>
                                                <p className="text-xs text-slate-400 font-light leading-relaxed">{d.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-full max-w-md pt-4">
                                <Link 
                                    href={checkoutLink} 
                                    onClick={() => posthog?.capture('checkout_initiated', { product: 'bootcamp', location: 'lock_screen' })}
                                    className="block group w-full"
                                >
                                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 rounded-full font-black text-xl hover:from-indigo-400 hover:to-purple-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_45px_rgba(99,102,241,0.4)] flex justify-center items-center gap-3 hover:scale-105 border border-indigo-400/20">
                                        Unlock Instant Access - {symbol}29 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <p className="text-sm text-slate-500 font-medium mt-4">100% Risk-Free 14-Day Guarantee.</p>
                                <div className="mt-4">
                                    <PromoCodeSection product="bootcamp" onUnlock={() => setIsUnlocked(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Progress Section */}
            <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3" /> {completedDays > 0 ? `Day ${completedDays} Completed` : "Welcome to the Bootcamp"}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                            {completedDays === 0 ? "Begin Your 14 Day Journey." : `Day ${Math.min(effectiveProgress, 14)} of Your 14 Day Boot Camp is next.`}
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            {isUnlocked 
                                ? (completedDays === 1 ? "Congratulations! You have identified your unique cognitive learning style superpower. You now have full access to all remaining modules in the bootcamp. Dive into Memory Training next!" : "Keep up the momentum! Stick to your daily learning routine to permanently integrate visual ingestion, concept mapping, and memory recall habits.")
                                : `Congratulations on starting your journey! In this bootcamp, you will lock in visual reading speed, diagnose your unique cognitive learning style superpower, master champion-level memory recall, build visual concept maps, and establish a lifelong study routine for just ${symbol}29.`
                            }
                        </p>
                    </div>
                    
                    <div className="w-full md:w-64 bg-slate-950 border border-white/10 rounded-2xl p-6 shrink-0">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-3xl font-black text-white">{completedDays}/{totalDays}</span>
                            <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">Days</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The 14-Day Roadmap */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white tracking-tight">The Execution Plan</h3>
                    <span className="text-sm font-medium text-slate-500">14 Daily Modules</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {days.map((day) => {
                        
                        // Determine styles based on status
                        let containerStyle = "bg-slate-900 border border-white/5 opacity-50 select-none grayscale";
                        let iconBoxStyle = "bg-slate-800 text-slate-500";
                        let actionIcon = <Lock className="w-5 h-5 text-slate-600" />;
                        let badge = null;
                        let href = "#"; // Default to non-clickable

                        if (day.status === "completed") {
                            containerStyle = "bg-slate-900/60 border border-emerald-500/30 hover:bg-slate-900 transition-colors cursor-pointer";
                            iconBoxStyle = "bg-emerald-500/20 text-emerald-400";
                            actionIcon = <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
                            badge = <span className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">Completed</span>;
                            href = day.link;
                        } else if (day.status === "available") {
                            containerStyle = "bg-slate-900/60 border border-indigo-500/30 hover:bg-slate-800 transition-colors cursor-pointer transform hover:-translate-y-1 shadow-lg shadow-indigo-900/10 border-l-4 border-l-indigo-500";
                            iconBoxStyle = "bg-indigo-500/20 text-indigo-400";
                            actionIcon = <ArrowRight className="w-5 h-5 text-indigo-400" />;
                            badge = <span className="absolute top-4 right-4 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30 animate-pulse">Start Next</span>;
                            href = day.link;
                        } else if (day.status === "unlocked") {
                            containerStyle = "bg-slate-900 border border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)] hover:bg-slate-800 transition-all cursor-pointer transform hover:-translate-y-1";
                            iconBoxStyle = "bg-purple-500/20 text-purple-400";
                            actionIcon = <Lock className="w-5 h-5 text-purple-400" />;
                            badge = <span className="absolute top-4 right-4 px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-[10px] font-bold uppercase tracking-widest border border-purple-500/30 animate-pulse">Click to Unlock Full Course</span>;
                            href = checkoutLink; // This links to checkout
                        } else if (day.status === "locked" && !isUnlocked) {
                            // If they haven't unlocked the bootcamp, make ALL future days clickable to checkout
                            containerStyle = "bg-slate-900 border border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:border-purple-500/30 transition-all cursor-pointer group/lockedcard";
                            href = checkoutLink;
                        }

                        const cardContent = (
                            <>
                                {badge}
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBoxStyle} ${day.status === 'locked' && !isUnlocked ? 'group-hover/lockedcard:bg-purple-500/10 group-hover/lockedcard:text-purple-400 transition-colors' : ''}`}>
                                        {day.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Day {day.day}</div>
                                        <h4 className={`text-lg font-bold leading-tight ${day.status === "locked" ? "text-slate-400 group-hover/lockedcard:text-white transition-colors" : "text-white"}`}>{day.title}</h4>
                                    </div>
                                </div>
                                
                                <p className={`text-sm font-light leading-relaxed flex-grow mb-6 ${day.status === "locked" ? "text-slate-500" : "text-slate-400"}`}>
                                    {day.desc}
                                </p>
 
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className={`text-xs font-bold uppercase tracking-widest ${day.status === "unlocked" ? "text-purple-400" : day.status === "available" ? "text-indigo-400" : day.status === "locked" && !isUnlocked ? "text-slate-500 group-hover/lockedcard:text-purple-400 transition-colors" : "text-slate-500"}`}>
                                        {day.status === "completed" ? "Review material" : day.status === "available" ? "Start Module" : day.status === "unlocked" ? `Unlock Days 2-14 for ${symbol}29` : day.status === "locked" && !isUnlocked ? "Unlock Bootcamp" : "Locked"}
                                    </span>
                                    {day.status === "locked" && !isUnlocked ? <Lock className="w-5 h-5 text-slate-600 group-hover/lockedcard:text-purple-400 transition-colors" /> : actionIcon}
                                </div>
                            </>
                        );

                        const cardClassName = `relative rounded-3xl p-6 flex flex-col h-full ${containerStyle}`;

                        let cardElement;
                        if (day.day === 2 && day.status === "unlocked") {
                            cardElement = <AdminBypassLink href={href} bypassHref="/rogue-superpower-session/start?course=bootcamp" className={cardClassName}>{cardContent}</AdminBypassLink>;
                        } else if (href !== "#") {
                            const isCheckout = href === checkoutLink;
                            cardElement = (
                                <Link 
                                    href={href} 
                                    onClick={() => {
                                        if (isCheckout) {
                                            posthog?.capture('checkout_initiated', { 
                                                product: 'bootcamp', 
                                                location: `day_card_${day.day}` 
                                            });
                                        }
                                    }}
                                    className={cardClassName}
                                >
                                    {cardContent}
                                </Link>
                            );
                        } else {
                            cardElement = <div className={cardClassName}>{cardContent}</div>;
                        }

                        return (
                            <div key={day.day} className={`relative flex flex-col h-full ${day.day === 2 && day.status === "unlocked" ? 'mt-8 md:mt-0' : ''}`}>
                                {day.day === 2 && day.status === "unlocked" && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10 w-full pointer-events-none">
                                        <span className="text-purple-400 font-bold text-[10px] md:text-xs uppercase tracking-widest text-center mb-1 drop-shadow-md">Click here to unlock the full course</span>
                                        <ArrowDown className="w-4 h-4 text-purple-400 drop-shadow-md" />
                                    </div>
                                )}
                                {cardElement}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Zero-Risk Guarantee (For Locked Users) */}
            {!isUnlocked && (
                <section className="mt-16 pt-16 border-t border-white/5">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="w-16 h-16 mx-auto bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center">
                            <Activity className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Zero-Risk Guarantee</h3>
                        <p className="text-lg text-slate-400 leading-relaxed font-light">
                            Try the Bootcamp for 14 days. If your learning speed, memory retention, and conceptual synthesis haven't permanently transformed, simply send an email and get a 100% refund. No questions asked.
                        </p>
                    </div>
                </section>
            )}
        </>
    );
}

function ClockIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
