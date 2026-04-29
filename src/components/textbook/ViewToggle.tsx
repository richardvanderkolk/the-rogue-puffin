"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, BookOpen } from "lucide-react";

export function ViewToggle() {
    const pathname = usePathname();
    const isComprehensive = pathname === "/textbook/comprehensive";

    return (
        <div className="print:hidden w-full flex justify-center mb-16 mt-8">
            <div className="bg-slate-900 border border-white/10 rounded-xl p-1.5 flex gap-1 shadow-2xl backdrop-blur-sm">
                <Link 
                    href="/textbook" 
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${!isComprehensive ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Zap className="w-4 h-4" />
                    Playbook (Cheat Sheet)
                </Link>
                <Link 
                    href="/textbook/comprehensive" 
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${isComprehensive ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <BookOpen className="w-4 h-4" />
                    Comprehensive (Full Text)
                </Link>
            </div>
        </div>
    );
}
