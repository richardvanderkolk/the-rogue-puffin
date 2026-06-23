"use client";

import { useState, useEffect } from "react";
import CustomPlayer from "@/components/engines/CustomPlayer";
import { Zap, Eye, Play, FileText, Settings, Lock, BookOpen, Compass, Share2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase/client";
import CognitiveToolkit from "@/components/dashboard/CognitiveToolkit";
import DiscoveriesHub from "@/components/dashboard/DiscoveriesHub";
import GatedFeaturePreview from "@/components/GatedFeaturePreview";

export default function MasteryDashboardPage() {
    const { user, loading } = useAuth();
    
    // Hub state
    const [activeHubTab, setActiveHubTab] = useState<'byob' | 'toolkit' | 'discoveries'>('byob');

    // User Profile state
    const [userStyle, setUserStyle] = useState<string>("visual");

    // BYOB Config state
    const [text, setText] = useState("");
    const [wpm, setWpm] = useState(400);
    const [mode, setMode] = useState<'flash' | 'peripheral' | 'bionic'>('flash');
    const [bionicContinuous, setBionicContinuous] = useState(false);
    
    // UI state
    const [isPlaying, setIsPlaying] = useState(false);
    const [localProgress, setLocalProgress] = useState(1);

    // Fetch local progress day
    useEffect(() => {
        const progress = parseInt(localStorage.getItem('rogue_day_progress') || '1');
        setLocalProgress(progress);
    }, []);

    // Fetch user style archetype
    useEffect(() => {
        if (user?.id) {
            const fetchProfile = async () => {
                try {
                    const { data } = await supabase
                        .from('profiles')
                        .select('learning_archetype')
                        .eq('id', user.id)
                        .maybeSingle();
                    if (data?.learning_archetype) {
                        setUserStyle(data.learning_archetype);
                    }
                } catch (e) {
                    console.error("Failed to fetch learning archetype:", e);
                }
            };
            fetchProfile();
        }
    }, [user?.id]);

    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const estimatedMinutes = Math.max(1, Math.ceil(wordCount / wpm));

    // Access control handled mostly by middleware, but we can double check here
    if (loading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    }

    const progressDay = Math.max(user?.bootcamp_progress_day || 1, localProgress);
    const isAdmin = 
        user?.email?.toLowerCase().includes('richard') || 
        user?.name?.toLowerCase().includes('richard') || 
        false;

    if (!user || (user?.subscription_status !== 'active' && !isAdmin)) {
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

    if (progressDay < 15 && !isAdmin) {
        return (
            <div className="min-h-screen bg-slate-950 pt-28">
                <GatedFeaturePreview featureType="mastery-hub" currentDay={progressDay} />
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
                <CustomPlayer text={text} wpm={wpm} mode={mode} bionicContinuous={bionicContinuous} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">Mastery Hub</h1>
                        <p className="text-slate-400 text-sm">Expand your visual processing and memory retention capacity</p>
                    </div>
                </div>

                {/* Hub Navigation Tab Bar */}
                <div className="flex gap-6 mb-8 border-b border-slate-800/80 pb-3 overflow-x-auto whitespace-nowrap">
                    <button
                        onClick={() => setActiveHubTab('byob')}
                        className={`flex items-center gap-2 pb-2 text-base font-bold transition-all relative ${
                            activeHubTab === 'byob' 
                                ? 'text-white' 
                                : 'text-slate-500 hover:text-slate-350'
                        }`}
                    >
                        <BookOpen className="w-4 h-4 text-indigo-400" /> Bring Your Own Book Engine
                        {activeHubTab === 'byob' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveHubTab('toolkit')}
                        className={`flex items-center gap-2 pb-2 text-base font-bold transition-all relative ${
                            activeHubTab === 'toolkit' 
                                ? 'text-white' 
                                : 'text-slate-500 hover:text-slate-350'
                        }`}
                    >
                        <Compass className="w-4 h-4 text-indigo-400" /> Cognitive Toolkit Workspace
                        {activeHubTab === 'toolkit' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveHubTab('discoveries')}
                        className={`flex items-center gap-2 pb-2 text-base font-bold transition-all relative ${
                            activeHubTab === 'discoveries' 
                                ? 'text-white' 
                                : 'text-slate-500 hover:text-slate-350'
                        }`}
                    >
                        <Share2 className="w-4 h-4 text-indigo-400" /> Learning Community Discoveries
                        {activeHubTab === 'discoveries' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded" />
                        )}
                    </button>
                </div>

                {activeHubTab === 'byob' ? (
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
                                    <div className="grid grid-cols-3 gap-2.5">
                                        <button
                                            onClick={() => setMode('flash')}
                                            className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                                                mode === 'flash' 
                                                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                                                    : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Zap className="w-5 h-5" />
                                            <span className="text-xs font-bold">Kinetic</span>
                                        </button>
                                        <button
                                            onClick={() => setMode('peripheral')}
                                            className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                                                mode === 'peripheral' 
                                                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                                                    : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Eye className="w-5 h-5" />
                                            <span className="text-xs font-bold">Peripheral</span>
                                        </button>
                                        <button
                                            onClick={() => setMode('bionic')}
                                            className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                                                mode === 'bionic' 
                                                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
                                                    : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <BookOpen className="w-5 h-5" />
                                            <span className="text-xs font-bold">Bionic</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Bionic Format Toggle */}
                                {mode === 'bionic' && (
                                    <div className="mb-8 animate-in fade-in duration-200">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                            Display Format
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/60">
                                            <button
                                                onClick={() => setBionicContinuous(false)}
                                                className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${
                                                    !bionicContinuous 
                                                        ? 'bg-indigo-500 text-white shadow shadow-indigo-500/25' 
                                                        : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                RSVP Chunking
                                            </button>
                                            <button
                                                onClick={() => setBionicContinuous(true)}
                                                className={`py-2 rounded-lg text-xs font-bold text-center transition-all ${
                                                    bionicContinuous 
                                                        ? 'bg-indigo-500 text-white shadow shadow-indigo-500/25' 
                                                        : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                Full text scroll
                                            </button>
                                        </div>
                                    </div>
                                )}

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
                ) : activeHubTab === 'toolkit' ? (
                    <CognitiveToolkit userId={user.id} />
                ) : (
                    <DiscoveriesHub userId={user.id} userStyle={userStyle} userName={user.name} />
                )}
            </div>
        </div>
    );
}
