"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Activity, BarChart2, BookOpen, BrainCircuit, Target, CheckCircle, ChevronRight, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // Mock progress data for UI demonstration
    const currentDay = 2; // In reality, fetch from localStorage or API
    const baselineWPM = 250;
    const currentWPM = 310;
    const memoryBaseline = 4; // words recalled
    const memoryCurrent = 7;
    const articlesRead = 0;
    const totalArticles = 12;

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (!loading && user) {
            setMounted(true);
        }
    }, [user, loading, router]);

    if (!mounted || loading || !user) {
        return <div className="min-h-screen bg-black" />;
    }

    return (
        <div className="flex min-h-screen bg-black text-white font-sans">
            <main className="flex-1 p-4 pt-28 md:p-8 md:pt-32 lg:p-12 lg:pt-32 overflow-y-auto w-full max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 text-indigo-400 mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">Your Progress</span>
                    </div>
                    <h1 className="text-4xl font-bold font-heading text-white flex items-center gap-3">
                        <Activity className="w-8 h-8 text-indigo-500" />
                        Performance Metrics
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Primary Tracking: Reading Speed */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/10 transition-colors" />

                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                                    <Target className="w-5 h-5 text-emerald-400" /> Reading Speed
                                </h2>
                                <p className="text-slate-400 text-sm">Words per minute progression</p>
                            </div>
                            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-500/20">
                                <TrendingUp className="w-3 h-3" /> +24% Faster
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative">
                            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/50">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Baseline (Day 0)</p>
                                <div className="text-4xl font-bold text-white font-mono">{baselineWPM}</div>
                                <p className="text-slate-600 text-sm mt-1">WPM</p>
                            </div>
                            <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 relative">
                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                    <CheckCircle className="w-4 h-4 text-slate-950" />
                                </div>
                                <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">Current Speed</p>
                                <div className="text-4xl font-bold text-emerald-400 font-mono">{currentWPM}</div>
                                <p className="text-emerald-500/50 text-sm mt-1">WPM</p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Tracking: Memory */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10 group-hover:bg-amber-500/10 transition-colors" />

                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                                    <BrainCircuit className="w-5 h-5 text-amber-400" /> Rogue Memory
                                </h2>
                                <p className="text-slate-400 text-sm">Visualization recall accuracy</p>
                            </div>
                            <div className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-amber-500/20">
                                <TrendingUp className="w-3 h-3" /> +75% Retention
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative">
                            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/50">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">First Attempt</p>
                                <div className="text-4xl font-bold text-white font-mono">{memoryBaseline}<span className="text-xl text-slate-500">/20</span></div>
                                <p className="text-slate-600 text-sm mt-1">Words Recalled</p>
                            </div>
                            <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/30 relative">
                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                                    <CheckCircle className="w-4 h-4 text-slate-950" />
                                </div>
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">High Score</p>
                                <div className="text-4xl font-bold text-amber-400 font-mono">{memoryCurrent}<span className="text-xl text-amber-500/50">/20</span></div>
                                <p className="text-amber-500/50 text-sm mt-1">Words Recalled</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Tracking: 14 Day Protocol Overall Progress */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-400" /> 14-Day Protocol
                        </h2>
                        <span className="text-indigo-400 font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">Day {currentDay} of 14</span>
                    </div>

                    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                            <span>Day 1</span>
                            <span>Day 14 Goal</span>
                        </div>
                        <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full"
                                style={{ width: `${(currentDay / 14) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Fourth Tracking: Articles */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                                <BookOpen className="w-5 h-5 text-fuchsia-400" /> Knowledge Base
                            </h2>
                            <p className="text-slate-400 text-sm">Masterclass articles completed</p>
                        </div>
                        <div className="text-xl font-bold text-white">
                            {articlesRead} <span className="text-slate-500">/ {totalArticles}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {Array.from({ length: totalArticles }).map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-xl flex items-center justify-center border transition-all ${i < articlesRead
                                    ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400'
                                    : 'bg-slate-950 border-slate-800 text-slate-700'
                                    }`}
                            >
                                <BookOpen className={`w-6 h-6 ${i < articlesRead ? 'animate-pulse' : ''}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
