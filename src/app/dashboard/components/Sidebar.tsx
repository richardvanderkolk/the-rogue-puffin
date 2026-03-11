"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Award, Settings, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { name: 'Today', href: '/dashboard', icon: Home },
    { name: 'Drills', href: '/dashboard/drills', icon: Zap },
    { name: 'Progress', href: '/dashboard/progress', icon: BarChart2 },
    { name: 'Certifications', href: '/dashboard/certifications', icon: Award },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 h-screen bg-black border-r border-slate-900 sticky top-0 flex-col p-6 pt-32">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white text-xl">R</span>
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Rogue Puffin
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                }`}>
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Current Level</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Rogue 250</span>
                    <span className="text-xs text-indigo-400 px-2 py-1 bg-indigo-900/30 rounded">Novice</span>
                </div>
                <div className="w-full h-1 bg-slate-800 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[60%]" />
                </div>
            </div>
        </aside>
    );
}
