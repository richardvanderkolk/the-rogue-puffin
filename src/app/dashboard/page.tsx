"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatCard from './components/StatCard';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useAuth } from '@/lib/auth-context';
import { Activity, Clock, Zap, Target, Play, BookOpen, Lock, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [currentDay, setCurrentDay] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const savedDay = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        setCurrentDay(savedDay);
        setMounted(true);
    }, []);

    const dayData = COURSE_CONTENT.find(d => d.day === currentDay) || COURSE_CONTENT[0];

    // Prevent hydration mismatch and hide content until auth check clears
    if (!mounted || loading || !user) {
        return <div className="min-h-screen bg-black" />;
    }

    return (
        <div className="flex min-h-screen bg-black text-white font-sans">
            <main className="flex-1 p-4 pt-28 md:p-8 md:pt-32 lg:p-12 lg:pt-32 overflow-y-auto w-full max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-white">Dashboard</h1>
                        <p className="text-slate-400 text-lg">Good to see you, {user.name}.</p>
                    </div>
                    {/* Dynamic Start Button for Current Progress */}
                    <Link href={`/train/day/${currentDay}`} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        <Play className="w-5 h-5 fill-current" /> Resume Day {currentDay}
                    </Link>
                </header>



                {/* Main Content Layout: Timeline (Center/Left) + Programs (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">

                    {/* Left/Center: Training Programs List */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
                                <Target className="w-6 h-6 text-emerald-400" />
                                Training Programs
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/rogue-session/start" className="block bg-gradient-to-br from-violet-950/80 to-indigo-950/80 border border-violet-500/30 p-6 rounded-2xl hover:bg-violet-900/60 hover:border-violet-400/50 transition-all hover:-translate-y-1 group relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                                </div>
                                <h4 className="font-bold text-white text-xl mb-2 group-hover:text-indigo-300 transition-colors pr-6">The Rogue Reading Session</h4>
                                <p className="text-sm text-violet-300/70">Masterclass & Baseline Test</p>
                            </Link>
                            <Link href="/dashboard/protocol" className="block bg-indigo-950/40 border border-indigo-500/20 p-6 rounded-2xl hover:bg-indigo-900/50 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group relative overflow-hidden h-full">
                                <h4 className="font-bold text-white text-xl mb-2 group-hover:text-indigo-300 transition-colors pr-6">14-Day Reading Protocol</h4>
                                <p className="text-sm text-indigo-300/70">Daily speed & peripheral drills</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-xs font-bold px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">Day {currentDay}</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest">{Math.round(((currentDay - 1) / 14) * 100)}% Complete</span>
                                </div>
                            </Link>
                            <Link href="/rogue-memory-session/start" className="block bg-violet-950/40 border border-violet-500/20 p-6 rounded-2xl hover:bg-violet-900/50 hover:border-violet-500/40 transition-all hover:-translate-y-1 group h-full">
                                <h4 className="font-bold text-white text-xl mb-2 group-hover:text-amber-300 transition-colors">The Rogue Memory Session</h4>
                                <p className="text-sm text-violet-300/70">Visualization & Recall Training</p>
                            </Link>

                            <Link href="/blog" className="block bg-fuchsia-950/30 border border-fuchsia-500/20 p-6 rounded-2xl hover:bg-fuchsia-900/40 hover:border-fuchsia-500/40 transition-all hover:-translate-y-1 group h-full">
                                <h4 className="font-bold text-white text-xl mb-2 group-hover:text-rose-300 transition-colors">Learning Like a Genius</h4>
                                <p className="text-sm text-fuchsia-300/70">Masterclass Articles</p>
                            </Link>
                        </div>

                        {/* Recommendation Callout */}
                        <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap className="w-32 h-32 text-indigo-400" />
                            </div>
                            <h4 className="text-indigo-400 font-bold text-lg mb-2 flex items-center gap-2 relative z-10">
                                <Zap className="w-5 h-5" /> Recommended Path
                            </h4>
                            <p className="text-sm text-slate-300 leading-relaxed relative z-10 max-w-xl">
                                Complete <strong>The Rogue Reading Session</strong> before starting Day 1 of the 14-Day Protocol to establish your baseline and learn the core techniques.
                            </p>
                        </div>
                    </div>

                    {/* Right: Progress Snapshot */}
                    <div className="xl:col-span-1 space-y-6">
                        <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-3 mb-6">
                            <Activity className="w-6 h-6 text-indigo-400" />
                            Your Progress
                        </h2>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -z-10" />

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Current Protocol</h3>
                                    <div className="text-3xl font-bold text-white mb-2">Day {currentDay} <span className="text-slate-500 text-lg">/ 14</span></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${((currentDay - 1) / 14) * 100}%` }} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/50">
                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Baseline Speed</div>
                                        <div className="text-xl font-bold text-emerald-400">250 <span className="text-xs text-emerald-600">WPM</span></div>
                                    </div>
                                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/50">
                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Articles Read</div>
                                        <div className="text-xl font-bold text-fuchsia-400">0 <span className="text-xs text-fuchsia-600">/ 12</span></div>
                                    </div>
                                </div>

                                <Link href="/dashboard/progress" className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all">
                                    View Full Progress Report
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
