"use client";

import { useState } from "react";
import CustomPlayer from "@/components/engines/CustomPlayer";
import { Zap, Eye, Play, FileText, Settings, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function MasteryDashboardPage() {
    const { user, loading } = useAuth();
    
    // Config state
    const [text, setText] = useState("");
    const [wpm, setWpm] = useState(400);
    const [mode, setMode] = useState<'flash' | 'peripheral'>('flash');
    
    // UI state
    const [isPlaying, setIsPlaying] = useState(false);

    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const estimatedMinutes = Math.max(1, Math.ceil(wordCount / wpm));

    // Access control handled mostly by middleware, but we can double check here
    if (loading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    }

    if (!user || user?.subscription_status !== 'active') {
        return (
            <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-6 flex flex-col items-center justify-center">
                <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Mastery Subscription Required</h2>
                    <p className="text-slate-400 mb-8">You need an active Rogue Mastery subscription to access the Bring Your Own Book engine.</p>
                    <Link href="/mastery" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full font-bold transition-all inline-block">
                        View Subscription Plans
                    </Link>
                </div>
            </div>
        );
    }

    if (isPlaying && text.length > 0) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-6 flex flex-col items-center justify-center">
                <button 
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-24 left-6 px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    &larr; Back to Editor
                </button>
                <CustomPlayer text={text} wpm={wpm} mode={mode} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Mastery Dashboard</h1>
                    <p className="text-slate-400 text-lg">Bring Your Own Book Engine</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Editor */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[60vh]">
                            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-300 font-medium">
                                    <FileText className="w-5 h-5 text-indigo-400" /> Source Text
                                </div>
                                <div className="text-sm font-mono text-slate-500">
                                    {wordCount} words
                                </div>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your article, email, or chapter here..."
                                className="w-full flex-1 bg-transparent p-6 text-slate-300 text-lg md:text-xl leading-relaxed resize-none focus:outline-none focus:ring-0 placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    {/* Right Column: Config */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                            <div className="flex items-center gap-2 text-white font-bold mb-6">
                                <Settings className="w-5 h-5 text-indigo-400" /> Configuration
                            </div>

                            {/* Speed Control */}
                            <div className="mb-8">
                                <label className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    <span>Target Speed</span>
                                    <span className="text-indigo-400">{wpm} WPM</span>
                                </label>
                                <input
                                    type="range"
                                    min="200"
                                    max="1200"
                                    step="50"
                                    value={wpm}
                                    onChange={(e) => setWpm(parseInt(e.target.value))}
                                    className="w-full accent-indigo-500"
                                />
                                <div className="flex justify-between text-xs font-mono text-slate-500 mt-2">
                                    <span>200</span>
                                    <span>1200</span>
                                </div>
                            </div>

                            {/* Mode Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    Drill Mode
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setMode('flash')}
                                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                                            mode === 'flash' 
                                                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                                                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                                        }`}
                                    >
                                        <Zap className="w-6 h-6" />
                                        <span className="text-sm font-bold">Kinetic</span>
                                    </button>
                                    <button
                                        onClick={() => setMode('peripheral')}
                                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                                            mode === 'peripheral' 
                                                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                                                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                                        }`}
                                    >
                                        <Eye className="w-6 h-6" />
                                        <span className="text-sm font-bold">Peripheral</span>
                                    </button>
                                </div>
                            </div>

                            {/* Est Time & Start */}
                            <div className="pt-6 border-t border-slate-800">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-400 text-sm">Estimated Time</span>
                                    <span className="text-white font-mono font-bold">~{estimatedMinutes} min</span>
                                </div>
                                
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    disabled={wordCount === 0}
                                    className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:shadow-none"
                                >
                                    <Play className="w-5 h-5 fill-current" /> 
                                    Start Session
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
