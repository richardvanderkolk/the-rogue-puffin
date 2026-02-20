"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Settings, ChevronRight, Zap, BookOpen, ScanEye, ArrowUp, MonitorPlay, Timer, CheckCircle } from "lucide-react";
import Link from "next/link";
import PacerEngine from "@/components/PacerEngine";
import { COURSE_CONTENT, DrillStep } from "@/lib/course-content";
import { useAuth } from "@/lib/auth-context";

function TrainingContent() {
    const searchParams = useSearchParams();
    const dayParam = searchParams.get("day");
    const [dayTitle, setDayTitle] = useState("");
    const { user } = useAuth();

    // Core Pacer State
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(300);
    const [mode, setMode] = useState<"normal" | "inverted" | "peripheral" | "backward" | "flash">("normal");
    const [chunkSize, setChunkSize] = useState(3);
    const [highlightMode, setHighlightMode] = useState(false);
    const [acceleration, setAcceleration] = useState(0);
    const [activeTab, setActiveTab] = useState<"drills" | "custom">("drills");

    // Text Content
    const [text, setText] = useState(
        "Speed reading is not just about reading faster. It is about comprehending more in less time. By grouping words together, you reduce the strain on your eyes and allow your brain to process information more efficiently. The average person reads at about 200 words per minute. With practice, you can easily double or triple that speed. The key is consistent practice and breaking old habits. When you master the art of speed reading, you unlock a new level of productivity and learning potential that can transform your career and personal growth."
    );

    // Workout Mode State
    const [workoutSteps, setWorkoutSteps] = useState<DrillStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isWorkoutActive, setIsWorkoutActive] = useState(false);
    const [showInterstitial, setShowInterstitial] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const startDrill = (index: number) => {
        setIsPlaying(false);
        setHighlightMode(false); // Reset by default
        setAcceleration(0); // Reset acceleration
        setIsWorkoutActive(false);

        switch (index) {
            case 0: // Warm Up
                setText("Speed reading is not just about reading faster. It is about comprehending more in less time. By grouping words together, you reduce the strain on your eyes and allow your brain to process information more efficiently.");
                setMode("normal");
                setChunkSize(3);
                setWpm(300);
                break;
            case 1: // Drill 1: Flash
                setMode("normal");
                setChunkSize(50); // Full "page" logic
                setWpm(1000); // 1s per page approx
                break;
            case 2: // Drill 2: Mirror
                setMode("backward");
                setChunkSize(3);
                setWpm(300);
                break;
            case 3: // Drill 3: Guide Pacer
                setMode("normal");
                setHighlightMode(true);
                setChunkSize(5);
                setWpm(400); // Highlight moves faster
                break;
            case 4: // Speed Challenge (Video Script)
                setText("School taught you to read LIKE THIS... But your brain can actually process information MUCH FASTER THAN YOU THINK. The Rogue Puffin helps you double your speed.");
                setMode("normal");
                setChunkSize(1);
                setWpm(200); // Start slow
                setAcceleration(50); // Ramp up fast
                break;
            case 5: // Cool Down
                setMode("normal");
                setChunkSize(3);
                setWpm(250);
                break;
        }
    };

    // Auto-start drill based on day param
    useEffect(() => {
        if (dayParam) {
            const day = parseInt(dayParam);
            const dayContent = COURSE_CONTENT.find(d => d.day === day);

            if (dayContent) {
                setDayTitle(dayContent.title);

                // If sequence exists, start workout mode
                if (dayContent.sequence && dayContent.sequence.length > 0) {
                    setWorkoutSteps(dayContent.sequence);
                    setCurrentStepIndex(0);
                    setIsWorkoutActive(true);
                    setShowInterstitial(true);
                    // Use day content if available, otherwise keep default
                    if (dayContent.content) {
                        setText(dayContent.content);
                    }
                } else {
                    // Legacy single-drill map
                    const drillMap: Record<number, number> = {
                        1: 3, 2: 1, 3: 4, 4: 2, 5: 0, 6: 1, 7: 4
                    };
                    const drillIndex = drillMap[day];
                    if (drillIndex !== undefined) {
                        startDrill(drillIndex);
                        if (dayContent.content) setText(dayContent.content);
                    }
                }
            }
        }
    }, [dayParam]);

    // Timer Logic
    useEffect(() => {
        // Only run timer if playing and workout is active
        if (isPlaying && isWorkoutActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Timer finished
                        finishStep();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, isWorkoutActive, timeLeft]);

    const finishStep = () => {
        setIsPlaying(false);
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < workoutSteps.length) {
            setCurrentStepIndex(nextIndex);
            setShowInterstitial(true);
        } else {
            setShowSummary(true);
            setIsWorkoutActive(false);
        }
    };

    const startCurrentStep = () => {
        const step = workoutSteps[currentStepIndex];
        if (!step) return;

        setMode(step.mode);
        setWpm(step.wpm);
        setChunkSize(step.chunkSize || 3);
        setHighlightMode(step.highlightMode || false);
        setAcceleration(step.acceleration || 0);

        // Use step specific text if available
        if (step.text) {
            setText(step.text);
        }

        setTimeLeft(step.duration);
        setShowInterstitial(false);
        setIsPlaying(true);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">

            {/* Interstitial Overlay */}
            {showInterstitial && workoutSteps[currentStepIndex] && (
                <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                            {currentStepIndex + 1}
                        </div>
                        <h2 className="text-3xl font-bold text-white">{workoutSteps[currentStepIndex].title}</h2>
                        <p className="text-slate-400 text-lg">{workoutSteps[currentStepIndex].subtitle}</p>

                        <div className="flex justify-center gap-6 py-4 border-y border-slate-800 text-slate-300 text-sm font-mono">
                            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> {workoutSteps[currentStepIndex].wpm} WPM</div>
                            <div className="flex items-center gap-2"><Timer className="w-4 h-4 text-blue-500" /> {formatTime(workoutSteps[currentStepIndex].duration)}</div>
                        </div>

                        <button onClick={startCurrentStep} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95">
                            Start Drill <Play className="fill-white w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Summary Overlay */}
            {showSummary && (
                <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Day {dayParam} Complete!</h2>
                        <p className="text-slate-400">Great work. You've completed the full 15-minute session.</p>
                        <Link href="/dashboard" className="block w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="p-6 flex justify-between items-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white hover:bg-indigo-500 transition-colors">RP</Link>
                    <span className="font-bold font-heading text-lg">
                        {dayParam ? `Day ${dayParam}: ${dayTitle}` : "Training Session"}
                    </span>
                </div>

                {/* Auto Timer Display */}
                {isWorkoutActive && (
                    <div className="hidden md:flex items-center gap-3 bg-indigo-900/20 border border-indigo-500/20 rounded-full px-4 py-1.5">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step {currentStepIndex + 1}/{workoutSteps.length}</span>
                        <div className="w-px h-4 bg-indigo-500/20"></div>
                        <span className={`font-mono font-bold ${timeLeft < 10 ? "text-red-400" : "text-white"}`}>{formatTime(timeLeft)}</span>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Online
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-6">

                {/* Left: Controls & Stats */}
                <div className="w-full md:w-80 space-y-6">

                    {/* Controls Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
                        <div className="text-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Speed</span>
                            <div className="text-5xl font-black text-white mt-1">{wpm} <span className="text-lg text-slate-500 font-medium">wpm</span></div>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                step="50"
                                value={wpm}
                                onChange={(e) => setWpm(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 font-mono">
                                <span>100</span>
                                <span>5000</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={togglePlay}
                                className={`col-span-2 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                            >
                                {isPlaying ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
                            </button>

                            <button onClick={() => { setMode('normal'); setHighlightMode(false); }} className={`p-3 rounded-lg text-sm font-medium border transition-all ${mode === 'normal' && !highlightMode ? 'bg-slate-800 border-indigo-500 text-indigo-400' : 'border-slate-700 hover:bg-slate-800'}`}>Normal</button>
                            <button onClick={() => { setMode('inverted'); setHighlightMode(false); }} className={`p-3 rounded-lg text-sm font-medium border transition-all ${mode === 'inverted' ? 'bg-slate-800 border-indigo-500 text-indigo-400' : 'border-slate-700 hover:bg-slate-800'}`}>Upside Down</button>
                            <button onClick={() => { setMode('peripheral'); setHighlightMode(false); }} className={`p-3 rounded-lg text-sm font-medium border transition-all ${mode === 'peripheral' ? 'bg-slate-800 border-indigo-500 text-indigo-400' : 'border-slate-700 hover:bg-slate-800'}`}>Peripheral</button>
                            <button onClick={() => { setMode('normal'); setHighlightMode(true); }} className={`p-3 rounded-lg text-sm font-medium border transition-all ${highlightMode ? 'bg-slate-800 border-indigo-500 text-indigo-400' : 'border-slate-700 hover:bg-slate-800'}`}>Guide Pacer</button>
                        </div>
                    </div>

                    {/* Session Progress / Custom Text Tabs */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                        <div className="flex gap-2 border-b border-slate-800 pb-2 mb-4">
                            <button
                                onClick={() => setActiveTab("drills")}
                                className={`flex-1 text-sm font-bold pb-2 transition-colors ${activeTab === "drills" ? "text-indigo-400 border-b-2 border-indigo-400 -mb-2.5" : "text-slate-500 hover:text-slate-300"}`}
                            >
                                Drills
                            </button>
                            <button
                                onClick={() => { setActiveTab("custom"); setMode("normal"); setHighlightMode(true); setChunkSize(5); }}
                                className={`flex-1 text-sm font-bold pb-2 transition-colors ${activeTab === "custom" ? "text-indigo-400 border-b-2 border-indigo-400 -mb-2.5" : "text-slate-500 hover:text-slate-300"}`}
                            >
                                Paste Text
                            </button>
                        </div>

                        {activeTab === "drills" ? (
                            <div className="space-y-2">
                                {[
                                    { name: 'Warm Up', icon: <Zap className="w-4 h-4" /> },
                                    { name: 'Drill 1: Flash (Page)', icon: <BookOpen className="w-4 h-4" /> },
                                    { name: 'Drill 2: Mirror', icon: <ScanEye className="w-4 h-4" /> },
                                    { name: 'Drill 3: Guide Pacer', icon: <ArrowUp className="w-4 h-4" /> },
                                    { name: 'Speed Challenge', icon: <MonitorPlay className="w-4 h-4" /> },
                                    { name: 'Cool Down', icon: <RefreshCw className="w-4 h-4" /> }
                                ].map((drill, i) => (
                                    <button
                                        key={i}
                                        onClick={() => startDrill(i)}
                                        className={`w-full flex items-center gap-3 text-sm p-3 rounded-lg transition-all text-left group hover:bg-slate-800 text-slate-500`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all bg-slate-800 group-hover:bg-slate-700`}>{i + 1}</div>
                                        <span className="flex-1">{drill.name}</span>
                                        {drill.icon}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <textarea
                                    className="w-full h-40 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                                    placeholder="Paste your email, article, or notes here..."
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                />
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>{text.split(/\s+/).filter(w => w.length > 0).length} words</span>
                                    <span>~{Math.ceil(text.split(/\s+/).filter(w => w.length > 0).length / wpm)} min</span>
                                </div>
                                <div className="text-xs text-indigo-400 bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
                                    <strong>Tip:</strong> Punctuation aware! The pacer will pause slightly on periods and commas.
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Right: Pacer Engine */}
                <div className="flex-1 flex flex-col">
                    <PacerEngine
                        text={text}
                        wpm={wpm}
                        isPlaying={isPlaying}
                        mode={mode}
                        chunkSize={chunkSize}
                        highlightMode={highlightMode}
                        onComplete={() => setIsPlaying(false)}
                        acceleration={acceleration}
                    />
                    <div className="mt-6 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                        <h3 className="font-bold text-slate-300 mb-2">Instructions</h3>
                        <p className="text-slate-400 text-sm">
                            {highlightMode
                                ? "Follow the highlighted text. Try to read ahead of the highlight if you can."
                                : "Use the slider to set your target WPM. Start slow and gradually increase. If you miss a word, keep going."}
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default function TrainingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Trainer...</div>}>
            <TrainingContent />
        </Suspense>
    );
}
