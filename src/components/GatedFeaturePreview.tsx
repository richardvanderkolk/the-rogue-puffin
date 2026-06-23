"use client";

import Link from "next/link";
import { Lock, Zap, BookOpen, Compass, Share2, Play, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface GatedFeaturePreviewProps {
    featureType: 'reading-engine' | 'mastery-hub';
    currentDay: number;
}

export default function GatedFeaturePreview({ featureType, currentDay }: GatedFeaturePreviewProps) {
    const [progressPercentage, setProgressPercentage] = useState(0);

    const totalDays = 14;
    const completedDays = Math.min(Math.max(currentDay - 1, 0), 14);

    useEffect(() => {
        // Smoothly animate progress bar entry
        const percentage = Math.round((completedDays / totalDays) * 100);
        const timer = setTimeout(() => setProgressPercentage(percentage), 300);
        return () => clearTimeout(timer);
    }, [completedDays]);

    const isReadingEngine = featureType === 'reading-engine';

    const title = isReadingEngine 
        ? "Train at 500+ WPM with the Reading Engine" 
        : "Expand Your Cognitive Capacity in the Mastery Hub";

    const subtitle = isReadingEngine
        ? "Complete the 14-Day Bootcamp first to unlock custom pacing drills."
        : "Complete the 14-Day Bootcamp first to unlock your advanced toolkit.";

    // Features list to motivate the user
    const features = isReadingEngine ? [
        {
            title: "Bring Your Own Book (BYOB) Player",
            desc: "Paste any article, textbook chapter, or work email and ingest it instantly at high WPM.",
            icon: <BookOpen className="w-5 h-5 text-indigo-400" />
        },
        {
            title: "Multi-Drill Kinetic Modes",
            desc: "Train visual span and tracking agility using custom Flash, Inverted, and Peripheral pacing.",
            icon: <Zap className="w-5 h-5 text-yellow-400" />
        },
        {
            title: "Smart Pacing Highlights",
            desc: "Auto-calibrated highlighting guides your peripheral vision without causing eye strain.",
            icon: <Sparkles className="w-5 h-5 text-emerald-400" />
        }
    ] : [
        {
            title: "Bionic RSVP & Scroll Reader",
            desc: "Read using bolded word-prefix formatters that anchor eye saccades and suppress subvocalization.",
            icon: <BookOpen className="w-5 h-5 text-indigo-400" />
        },
        {
            title: "Cognitive Synthesis Toolkit",
            desc: "Access the Resource Pathfinder, Feynman Jargon Simplifier, 3D Recall Deck, and Pomodoro timer.",
            icon: <Compass className="w-5 h-5 text-purple-400" />
        },
        {
            title: "Community Discoveries Hub",
            desc: "Share high-value internet resources, upvoting and segmenting value by student learning styles.",
            icon: <Share2 className="w-5 h-5 text-pink-400" />
        }
    ];

    // SVG Progress Circle math
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-500">
            <div className="max-w-4xl w-full bg-slate-900/90 border border-indigo-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.1)] relative">
                {/* Visual Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

                <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch relative z-10">
                    {/* Left Column: Motivational Info & Features */}
                    <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                <Lock className="w-3.5 h-3.5" /> Gated Feature Preview
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                                    {title}
                                </h2>
                                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                                    {subtitle}
                                </p>
                            </div>

                            <div className="space-y-5 pt-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-base mb-0.5">{feature.title}</h4>
                                            <p className="text-slate-400 text-sm font-light leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Progress Tracking & Call-To-Action */}
                    <div className="lg:col-span-2 p-8 md:p-10 bg-slate-950/40 flex flex-col justify-center items-center text-center space-y-8">
                        {/* Circular Progress Ring */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                {/* Track Circle */}
                                <circle
                                    cx="80"
                                    cy="80"
                                    r={radius}
                                    className="stroke-slate-800 fill-transparent"
                                    strokeWidth="10"
                                />
                                {/* Progress Circle */}
                                <circle
                                    cx="80"
                                    cy="80"
                                    r={radius}
                                    className="stroke-indigo-500 fill-transparent transition-all duration-1000 ease-out"
                                    strokeWidth="10"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            {/* Centered Lock & Text */}
                            <div className="absolute flex flex-col items-center justify-center space-y-1">
                                <Lock className="w-5 h-5 text-slate-500" />
                                <span className="text-2xl font-black text-white font-mono">{completedDays}/14</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Days Done</span>
                            </div>
                        </div>

                        {/* Progress Description */}
                        <div className="space-y-2 max-w-xs">
                            <h4 className="text-lg font-bold text-white">Your Brain is Rewiring</h4>
                            <p className="text-slate-400 text-xs font-light leading-relaxed">
                                You are <span className="font-bold text-indigo-400">{progressPercentage}%</span> of the way through the Bootcamp. Complete your daily training sessions to unlock access permanently.
                            </p>
                        </div>

                        {/* Call To Action Button */}
                        <Link 
                            href={currentDay >= 15 ? "/bootcamp" : `/train/day/${Math.min(14, Math.max(1, currentDay))}`}
                            className="w-full"
                        >
                            <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(99,102,241,0.2)] hover:shadow-[0_0_35px_rgba(99,102,241,0.45)] hover:scale-[1.02] flex items-center justify-center gap-2 group text-base">
                                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> 
                                Resume Bootcamp: Day {Math.min(14, Math.max(1, currentDay))}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
