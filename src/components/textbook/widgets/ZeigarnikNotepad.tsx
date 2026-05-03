'use client';

import { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export default function ZeigarnikNotepad() {
 const [notes, setNotes] = useState('');
 const [saved, setSaved] = useState(false);

 useEffect(() => {
 const stored = localStorage.getItem('zeigarnik_notes');
 if (stored) setNotes(stored);
 }, []);

 const handleSave = () => {
 localStorage.setItem('zeigarnik_notes', notes);
 setSaved(true);
 setTimeout(() => setSaved(false), 2000);
 };

 return (
 <div className="my-8 bg-[#fffdf8] border border-stone-200 rounded-xl p-8 shadow-inner break-inside-avoid relative">
 {/* Ruled lines background effect */}
 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #000 28px)' }}></div>
 
 <h3 className="text-xl font-bold text-stone-800 mb-2 mt-0 font-serif">The Zeigarnik Scratchpad</h3>
 <p className="text-stone-500 text-sm mb-6 italic">Write down any open loops or unfinished thoughts to clear your working memory.</p>
 
 <textarea 
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
 placeholder="What's still on your mind?"
 className="w-full bg-transparent border-none outline-none resize-none text-stone-700 leading-[28px] font-serif min-h-[150px] relative z-10 placeholder-stone-300"
 />

 <div className="flex justify-end mt-4 relative z-10">
 <button 
 onClick={handleSave}
 className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-md text-sm font-bold transition-colors"
 >
 {saved ? <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved</> : <><Save className="w-4 h-4" /> Secure Thoughts</>}
 </button>
 </div>
 </div>
 );
}
