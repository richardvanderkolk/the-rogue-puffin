"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { COURSE_CONTENT, DayContent } from '@/lib/course-content';
import { ArrowLeft, Clock, Target, Wind, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SessionPlayer from '@/components/train/SessionPlayer';

interface DayPageProps {
    params: Promise<{ id: string }>;
}

export default function DayPage({ params }: DayPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [selectedSequence, setSelectedSequence] = useState<any>(null);

    const dayNumber = parseInt(id);
    const dayData = COURSE_CONTENT.find(d => d.day === dayNumber);

    if (!dayData) {
        return <div className="text-white text-center pt-20">Day not found</div>;
    }

    const handleSessionComplete = () => {
        setSessionComplete(true);
        setSessionStarted(false);

        // Save progress (mock for MVP)
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        if (dayNumber >= currentProgress) {
            localStorage.setItem('rogue_day_progress', (dayNumber + 1).toString());
        }
    };

    if (sessionComplete) {
        return (
            <div className="h-full w-full overflow-y-auto bg-black text-white p-6 flex items-center justify-center">
                <div className="max-w-md text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold">Day {dayNumber} Complete</h1>
                    <p className="text-slate-400">Great work. Your brain is adapting.</p>
                    <Link href="/dashboard" className="block w-full py-4 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    if (sessionStarted && (dayData.sequence || selectedSequence)) {
        return (
            <div className="h-full w-full overflow-y-auto bg-black text-white p-6 pt-28">
                <SessionPlayer dayNumber={dayNumber} sequence={selectedSequence || dayData.sequence!} onComplete={handleSessionComplete} dayContent={dayData.content} />
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-black text-white p-6 pt-12 md:pt-16 pb-12">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-4">
                <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full border border-indigo-500/20">
                        Day {dayData.day}
                    </span>
                    <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {dayData.duration}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{dayData.title}</h1>
                <p className="text-lg md:text-xl text-slate-400">{dayData.description}</p>
            </div>

            {/* Content Cards */}
            <div className="max-w-3xl mx-auto grid gap-4">

                {/* Drift (Concept) */}
                <div className="p-5 md:p-6 bg-gradient-to-br from-indigo-900/20 to-slate-900 rounded-2xl border border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <Wind className="w-24 h-24 text-indigo-500/20" />
                    </div>
                    <h3 className="text-base font-bold text-indigo-400 mb-2 flex items-center gap-2">
                        <Wind className="w-5 h-5" /> The Drift
                    </h3>
                    <p className="text-base md:text-lg text-slate-200 leading-relaxed relative z-10">
                        "{dayData.drift}"
                    </p>
                </div>

                {/* Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-center">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Primary Focus
                        </h3>
                        <div className="text-xl font-bold text-white">{dayData.focus}</div>
                    </div>
                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-center">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                            Skills Unlocked
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {dayData.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-lg border border-slate-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Start Button */}
                <div className="pt-4">
                    {dayData.choices ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-center mb-6 mt-4">Choose Your Warmup</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {dayData.choices.map((choice: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedSequence(choice.sequence);
                                            setSessionStarted(true);
                                        }}
                                        className="p-6 bg-slate-900 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800 rounded-xl transition-all text-center flex flex-col justify-center items-center group"
                                    >
                                        <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">{choice.title}</h4>
                                        <p className="text-sm text-slate-400">{choice.subtitle}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setSelectedSequence(dayData.sequence);
                                setSessionStarted(true);
                            }}
                            className="w-full py-4 bg-white text-black text-xl font-bold rounded-xl hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl shadow-white/10"
                        >
                            Begin Session
                        </button>
                    )}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Ensure you are in a quiet environment. Headphones recommended.
                    </p>
                </div>

            </div>
        </div>
    );
}
