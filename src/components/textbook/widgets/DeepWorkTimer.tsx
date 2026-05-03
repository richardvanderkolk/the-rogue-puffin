'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function DeepWorkTimer() {
 const [timeLeft, setTimeLeft] = useState(25 * 60);
 const [isRunning, setIsRunning] = useState(false);

 useEffect(() => {
 let interval: NodeJS.Timeout;
 if (isRunning && timeLeft > 0) {
 interval = setInterval(() => {
 setTimeLeft((prev) => prev - 1);
 }, 1000);
 } else if (timeLeft === 0) {
 setIsRunning(false);
 // Could play a completion sound here
 }
 return () => clearInterval(interval);
 }, [isRunning, timeLeft]);

 const toggleTimer = () => setIsRunning(!isRunning);
 const resetTimer = () => {
 setIsRunning(false);
 setTimeLeft(25 * 60);
 };

 const minutes = Math.floor(timeLeft / 60);
 const seconds = timeLeft % 60;

 return (
 <div className="my-8 bg-slate-900 rounded-3xl p-8 shadow-xl text-center break-inside-avoid">
 <h3 className="text-xl font-bold text-slate-300 mb-2 mt-0">Deep Work Session</h3>
 <p className="text-slate-500 text-sm mb-8">Commit to 25 minutes of absolute, unbroken focus.</p>
 
 <div className="text-6xl font-black text-white font-mono tracking-tighter mb-8">
 {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
 </div>

 <div className="flex items-center justify-center gap-4">
 <button 
 onClick={toggleTimer}
 className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
 >
 {isRunning ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start Focus</>}
 </button>
 <button 
 onClick={resetTimer}
 className="p-4 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
 >
 <RotateCcw className="w-5 h-5" />
 </button>
 </div>
 </div>
 );
}
