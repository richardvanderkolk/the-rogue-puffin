"use client";

import { useState } from 'react';
import PacerEngine from '@/components/PacerEngine';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface CustomPlayerProps {
    text: string;
    wpm: number;
    mode: 'flash' | 'peripheral';
}

export default function CustomPlayer({ text, wpm, mode }: CustomPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0); // Used to force re-render PacerEngine on reset

    // When text is extremely long, we might want to ensure performance, but for V1 we'll pass it directly
    // PacerEngine handles chunking internally. For 'flash' mode (Kinetic), it uses a default chunkSize = 3.
    // For 'peripheral', it dynamically expands the chunks.

    const handleReset = () => {
        setIsPlaying(false);
        setKey(prev => prev + 1);
    };

    const handleComplete = () => {
        setIsPlaying(false);
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-8 shadow-2xl relative">
                {/* HUD Overlay */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-indigo-400">{wpm} WPM</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Speed</div>
                    </div>
                </div>

                <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-4">
                     <div className="text-left">
                        <div className="text-sm font-mono font-bold text-slate-300">{mode === 'flash' ? 'Kinetic' : 'Peripheral'}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Mode</div>
                    </div>
                </div>

                <div className="mt-12 md:mt-0">
                    <PacerEngine
                        key={key}
                        text={text}
                        wpm={wpm}
                        isPlaying={isPlaying}
                        mode={mode}
                        chunkSize={mode === 'flash' ? 3 : 5}
                        onComplete={handleComplete}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
                <button
                    onClick={handleReset}
                    className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shadow-lg"
                    title="Restart"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`p-6 rounded-full transition-all flex items-center justify-center hover:scale-105 shadow-xl ${
                        isPlaying
                            ? 'bg-slate-800 text-white hover:bg-slate-700'
                            : 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-indigo-500/25'
                    }`}
                >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
            </div>
        </div>
    );
}
