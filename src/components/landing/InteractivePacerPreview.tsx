"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Zap } from "lucide-react";

const DEMO_WORDS = [
  "Most", "people", "read", "by", "speaking", "each", "word", "in", "their", "head.",
  "This", "is", "called", "subvocalization,", "and", "it", "limits", "your", "reading",
  "speed", "to", "just", "200", "words", "per", "minute.", "But", "your", "eyes", "can",
  "process", "information", "much", "faster.", "By", "flashing", "words", "directly",
  "in", "place,", "you", "silence", "that", "inner", "voice", "completely.", "This",
  "drills", "your", "brain", "to", "absorb", "ideas", "at", "the", "speed", "of", "sight."
];

export function InteractivePacerPreview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [wpm, setWpm] = useState(350);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const delay = (60 / wpm) * 1000;
      intervalRef.current = setInterval(() => {
        setWordIndex((prev) => {
          if (prev >= DEMO_WORDS.length - 1) {
            return 0; // loop back
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, wpm]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetDemo = () => {
    setWordIndex(0);
    setIsPlaying(false);
  };

  const handleWpmChange = (newWpm: number) => {
    setWpm(newWpm);
  };

  // Extract current word
  const currentWord = DEMO_WORDS[wordIndex];

  // Helper to split word for optimal fixation point styling
  const getStyledWord = (word: string) => {
    if (!word) return { start: "", middle: "", end: "" };
    const len = word.length;
    let midIndex = 0;
    if (len <= 4) midIndex = 1;
    else if (len <= 8) midIndex = 2;
    else midIndex = 3;

    return {
      start: word.substring(0, midIndex),
      middle: word.charAt(midIndex),
      end: word.substring(midIndex + 1)
    };
  };

  const { start, middle, end } = getStyledWord(currentWord);

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between w-full h-80 max-w-md mx-auto group">
      {/* Decorative top header glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500" />
      
      {/* Small Header */}
      <div className="flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-slate-500">
        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-400" /> Speed Drill Preview</span>
        <span className="font-mono text-indigo-400">{wpm} WPM</span>
      </div>

      {/* Pacer Word Window */}
      <div className="flex-1 flex items-center justify-center relative my-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-hidden min-h-[120px]">
        {/* Horizontal alignment guides */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-slate-800/40 pointer-events-none" />
        <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 border-l border-dashed border-slate-800/40 pointer-events-none" />
        
        {/* Render Word with colored fixation point */}
        <div className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tight select-none">
          <span className="text-slate-400">{start}</span>
          <span className="text-indigo-400 font-black relative">
            {middle}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full" />
          </span>
          <span className="text-slate-100">{end}</span>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="space-y-4">
        {/* Speed presets */}
        <div className="flex justify-between items-center gap-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Set Speed:</span>
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-lg p-1">
            {[250, 350, 500].map((preset) => (
              <button
                key={preset}
                onClick={() => handleWpmChange(preset)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  wpm === preset
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Play/Pause controls */}
        <div className="flex gap-2">
          <button
            onClick={togglePlay}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-98 transition-all text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-700/60"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Pause Demo
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Resume Demo
              </>
            )}
          </button>
          
          <button
            onClick={resetDemo}
            className="p-3 bg-slate-800 hover:bg-slate-700 active:scale-98 transition-all text-slate-300 hover:text-white rounded-xl border border-slate-700/60"
            title="Reset demo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
