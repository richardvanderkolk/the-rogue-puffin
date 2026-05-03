"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminBypassLink } from "@/components/AdminBypassLink";
import { CheckCircle2, Lock, Zap, Target, Brain, BookOpen, Activity, Database, ArrowRight, ArrowDown, Search, Network, MessageCircle } from "lucide-react";

export function BootcampRoadmap({ isUnlocked, symbol, initialProgress = 1 }: { isUnlocked: boolean, symbol: string, initialProgress?: number }) {
    const [currentProgress, setCurrentProgress] = useState(initialProgress);

    useEffect(() => {
        // If the server tells us they are further along than we thought, update.
        // Also fallback to localStorage if they are playing without logging in.
        const localProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (localProgress > initialProgress) {
            setCurrentProgress(localProgress);
        } else {
            setCurrentProgress(initialProgress);
        }
    }, [initialProgress]);

    // Base definition of all days
    const baseDays = [
        { day: 1, title: "Discover Reading Possibilities", desc: "The Subvocalization Drill", icon: <Zap className="w-5 h-5" />, link: "/rogue-session/start?v2=true" },
        { day: 2, title: "Discover Your Personal Superpower", desc: "Diagnosing your learning style", icon: <Brain className="w-5 h-5" />, link: isUnlocked ? "/rogue-superpower-session/start?course=bootcamp" : "/api/checkout?productId=bootcamp" },
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
    const effectiveProgress = isUnlocked ? currentProgress : Math.min(currentProgress, 2);

    const days = baseDays.map(day => {
        let status = "locked";
        
        // Day 1 is always completed if progress > 1, otherwise available
        if (day.day === 1) {
            status = effectiveProgress > 1 ? "completed" : "available";
        } 
        // Day 2 depends on unlock status
        else if (day.day === 2) {
            if (!isUnlocked) {
                status = "unlocked"; // "Unlock required"
            } else {
                status = effectiveProgress > 2 ? "completed" : (effectiveProgress === 2 ? "available" : "locked");
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

    return (
        <>
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
                                ? (completedDays === 1 ? "Congratulations! You have discovered your unique learning superpower. You now have full access to all remaining modules in the bootcamp. Dive into Memory Training next!" : "Keep up the momentum. Stick to the daily rhythm to ensure your new speed and comprehension habits become permanent.")
                                : `Congratulations! You have discovered that you are able to read faster. During the rest of this bootcamp you will embed this new speed as your new habit, discover your personal learning superpower, memory skills that will blow your mind and much more for just ${symbol}29.`
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
                            containerStyle = "bg-slate-900 border border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:bg-slate-800 transition-all cursor-pointer transform hover:-translate-y-1";
                            iconBoxStyle = "bg-purple-500/20 text-purple-400";
                            actionIcon = <Lock className="w-5 h-5 text-purple-400" />;
                            badge = <span className="absolute top-4 right-4 px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold uppercase tracking-widest border border-purple-500/30">Unlock Required</span>;
                            href = day.link; // This links to checkout
                        }

                        const cardContent = (
                            <>
                                {badge}
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBoxStyle}`}>
                                        {day.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Day {day.day}</div>
                                        <h4 className={`text-lg font-bold leading-tight ${day.status === "locked" ? "text-slate-400" : "text-white"}`}>{day.title}</h4>
                                    </div>
                                </div>
                                
                                <p className={`text-sm font-light leading-relaxed flex-grow mb-6 ${day.status === "locked" ? "text-slate-500" : "text-slate-400"}`}>
                                    {day.desc}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className={`text-xs font-bold uppercase tracking-widest ${day.status === "unlocked" ? "text-purple-400" : day.status === "available" ? "text-indigo-400" : "text-slate-500"}`}>
                                        {day.status === "completed" ? "Review material" : day.status === "available" ? "Start Module" : day.status === "unlocked" ? `Unlock Days 2-14 for ${symbol}29` : "Locked"}
                                    </span>
                                    {actionIcon}
                                </div>
                            </>
                        );

                        const cardClassName = `relative rounded-3xl p-6 flex flex-col h-full ${containerStyle}`;

                        let cardElement;
                        if (day.day === 2 && day.status === "unlocked") {
                            cardElement = <AdminBypassLink href={href} bypassHref="/rogue-superpower-session/start?course=bootcamp" className={cardClassName}>{cardContent}</AdminBypassLink>;
                        } else if (href !== "#") {
                            cardElement = <Link href={href} className={cardClassName}>{cardContent}</Link>;
                        } else {
                            cardElement = <div className={cardClassName}>{cardContent}</div>;
                        }

                        return (
                            <div key={day.day} className={`relative flex flex-col h-full ${day.day === 2 && day.status === "unlocked" ? 'mt-8 md:mt-0' : ''}`}>
                                {day.day === 2 && day.status === "unlocked" && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10 w-full pointer-events-none">
                                        <span className="text-purple-400 font-bold text-[10px] md:text-xs uppercase tracking-widest text-center mb-1 drop-shadow-md">Click here to continue your 14 day boot camp</span>
                                        <ArrowDown className="w-4 h-4 text-purple-400 drop-shadow-md" />
                                    </div>
                                )}
                                {cardElement}
                            </div>
                        );
                    })}
                </div>
            </section>
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
