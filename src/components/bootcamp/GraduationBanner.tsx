"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export function GraduationBanner() {
    const [isGraduated, setIsGraduated] = useState(false);

    useEffect(() => {
        const currentProgress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        // The bootcamp is 14 days. If progress is 15 or higher, they have completed Day 14.
        if (currentProgress >= 15) {
            setIsGraduated(true);
        }
    }, []);

    if (!isGraduated) return null;

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-emerald-900/40 border border-emerald-500/30 rounded-3xl p-8 mb-12 shadow-[0_0_40px_rgba(16,185,129,0.15)] group">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                        <GraduationCap className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Bootcamp Completed</h3>
                        <p className="text-emerald-100/80 font-medium max-w-xl">
                            You have completed all 14 days of The Rogue Puffin Bootcamp. You are ready for the Commencement.
                        </p>
                    </div>
                </div>
                
                <Link 
                    href="/bootcamp/graduation"
                    className="shrink-0 inline-flex items-center justify-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                    Enter Graduation
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}
