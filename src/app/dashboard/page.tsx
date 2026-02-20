"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { COURSE_CONTENT } from '@/lib/course-content';
import { Activity, Clock, Zap, Target, Play } from 'lucide-react';

export default function DashboardPage() {
    const [currentDay, setCurrentDay] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedDay = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        setCurrentDay(savedDay);
        setMounted(true);
    }, []);

    const dayData = COURSE_CONTENT.find(d => d.day === currentDay) || COURSE_CONTENT[0];

    // Prevent hydration mismatch
    if (!mounted) {
        return <div className="min-h-screen bg-black" />; // Or loading skeleton
    }

    return (
        <div className="flex min-h-screen bg-black text-white font-sans">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                        <p className="text-slate-400">Welcome back, Rogue.</p>
                    </div>
                    {/* Dynamic Start Button */}
                    <Link href={`/train/day/${currentDay}`} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current" /> Start Day {currentDay}
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Sustainable Speed"
                        value="320 WPM"
                        subtext="Top 15% of readers"
                        trend="up"
                        trendValue="+12%"
                    />
                    <StatCard
                        title="Comprehension"
                        value="85%"
                        subtext="Solid retention"
                        trend="neutral"
                        trendValue="0%"
                    />
                    <StatCard
                        title="Session Streak"
                        value={`${currentDay > 1 ? currentDay - 1 : 0} Days`}
                        subtext="Keep it up"
                        trend="up"
                        trendValue="+1"
                    />
                    <StatCard
                        title="Focus Level"
                        value="High"
                        subtext="Optimal state"
                        trend="up"
                        trendValue="Peak"
                    />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Progress Graph Placeholder */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px]">
                        <h3 className="text-lg font-bold text-white mb-4">Speed Trajectory</h3>
                        <div className="flex items-center justify-center h-full text-slate-500">
                            [ Graph Component Here ]
                        </div>
                    </div>

                    {/* Next Session Preview */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Up Next: Day {dayData.day}</h3>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-indigo-400">{dayData.title}</h4>
                            <p className="text-slate-400 text-sm mb-4">{dayData.description}</p>

                            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <Target className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm text-slate-300">Focus: {dayData.focus}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <Clock className="w-5 h-5 text-blue-400" />
                                <span className="text-sm text-slate-300">Duration: {dayData.duration}</span>
                            </div>

                            <Link href={`/train/day/${currentDay}`} className="block w-full py-3 mt-4 bg-white text-black text-center font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                <Play className="w-4 h-4 fill-current" /> Start Session
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
