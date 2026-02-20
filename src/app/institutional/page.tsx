"use client";

import { Building2, Users, FileSpreadsheet, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function InstitutionalPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="max-w-6xl mx-auto mb-16 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
                        Institutional Access
                    </h1>
                    <p className="text-slate-400">Manage cohorts, licenses, and team performance.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-900 transition-colors">
                        <FileSpreadsheet className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
                        <PlusCircle className="w-4 h-4" /> New Cohort
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cohort Card 1 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-indigo-500/10 p-3 rounded-lg">
                            <Building2 className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">Active</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Acme Corp - Q1</h3>
                    <p className="text-sm text-slate-500 mb-6">Created Jan 15, 2026</p>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Seats Used</span>
                            <span className="text-white font-medium">42 / 50</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[84%] h-full bg-indigo-500"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Avg Improvement</span>
                            <span className="text-emerald-400 font-medium">+124 WPM</span>
                        </div>
                    </div>

                    <button className="w-full py-3 border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
                        Manage Users
                    </button>
                </div>

                {/* Cohort Card 2 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 opacity-75">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-slate-800 p-3 rounded-lg">
                            <Users className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="px-3 py-1 bg-slate-500/10 text-slate-400 text-xs font-bold rounded-full border border-slate-500/20">Pending</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Acme Corp - Q2</h3>
                    <p className="text-sm text-slate-500 mb-6">Starts Apr 1, 2026</p>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Seats Reserved</span>
                            <span className="text-white font-medium">100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-indigo-500"></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Est. Revenue</span>
                            <span className="text-slate-300 font-medium">$4,900</span>
                        </div>
                    </div>

                    <button className="w-full py-3 border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
                        Configure
                    </button>
                </div>

                {/* New Plan Upsell */}
                <div className="border border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-900/50 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <PlusCircle className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">New Organization</h3>
                    <p className="text-sm text-slate-400 max-w-xs">
                        Onboard a new client or university department.
                    </p>
                </div>
            </div>
        </div>
    );
}
