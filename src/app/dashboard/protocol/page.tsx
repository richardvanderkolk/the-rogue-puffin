"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COURSE_CONTENT } from '@/lib/course-content';
import { useAuth } from '@/lib/auth-context';
import { BookOpen, CheckCircle, ChevronRight, Play } from 'lucide-react';

export default function ProtocolPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [currentDay, setCurrentDay] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (!loading && user) {
            setMounted(true);
        }
    }, [user, loading, router]);

    useEffect(() => {
        const savedDay = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        setCurrentDay(savedDay);
    }, []);

    if (!mounted || loading || !user) {
        return <div className="min-h-screen bg-black" />;
    }

    return (
        <div className="flex min-h-screen bg-black text-white font-sans">
            <main className="flex-1 p-4 pt-28 md:p-8 md:pt-32 lg:p-12 lg:pt-32 overflow-y-auto w-full max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 text-indigo-400 mb-2">
                            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                            <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">Training Programs</span>
                        </div>
                        <h1 className="text-4xl font-bold font-heading text-white flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-indigo-500" />
                            14-Day Reading Protocol
                        </h1>
                        <p className="text-slate-400 text-lg mt-2">Your daily progression of speed and peripheral drills.</p>
                    </div>

                    <Link href={`/train/day/${currentDay}`} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        <Play className="w-5 h-5 fill-current" /> Resume Day {currentDay}
                    </Link>
                </header>

                {/* 14-Day Timeline Index */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold font-heading text-white">Course Timeline</h2>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                            Progress: {Math.round(((currentDay - 1) / 14) * 100)}%
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {COURSE_CONTENT.map((day) => {
                            const isCompleted = day.day < currentDay;
                            const isCurrent = day.day === currentDay;

                            return (
                                <Link
                                    key={day.day}
                                    href={`/train/day/${day.day}`}
                                    className={`relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 block group ${isCurrent
                                        ? 'bg-indigo-900/30 border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500'
                                        : isCompleted
                                            ? 'bg-slate-900 border border-slate-800/80 opacity-70 hover:opacity-100'
                                            : 'bg-slate-900/40 border border-slate-800/50 hover:border-slate-600 hover:bg-slate-900'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${isCurrent ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400'
                                            }`}>
                                            Day {day.day}
                                        </span>
                                        {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                    </div>
                                    <h4 className="font-bold text-slate-200 mb-1 line-clamp-1 text-lg">{day.title}</h4>

                                    {isCurrent && (
                                        <div className="absolute -right-2 -top-2 w-4 h-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-slate-950"></span>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </main>
        </div>
    );
}
