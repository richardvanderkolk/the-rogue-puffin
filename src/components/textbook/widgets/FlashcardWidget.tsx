'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardWidgetProps {
 question: string;
 answer: string;
}

export default function FlashcardWidget({ question, answer }: FlashcardWidgetProps) {
 const [isFlipped, setIsFlipped] = useState(false);

 return (
 <div className="my-8 flex justify-center perspective-[1000px] break-inside-avoid">
 <motion.div
 className="relative w-full max-w-sm h-64 cursor-pointer transform-style-3d"
 onClick={() => setIsFlipped(!isFlipped)}
 animate={{ rotateY: isFlipped ? 180 : 0 }}
 transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
 style={{ transformStyle: 'preserve-3d' }}
 >
 {/* Front */}
 <div 
 className="absolute inset-0 backface-hidden bg-white border-2 border-indigo-100 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center"
 style={{ backfaceVisibility: 'hidden' }}
 >
 <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Active Recall Check</p>
 <h3 className="text-xl font-bold text-slate-800 m-0">{question}</h3>
 <p className="text-sm text-slate-400 mt-6 mt-auto">Click to reveal answer</p>
 </div>

 {/* Back */}
 <div 
 className="absolute inset-0 backface-hidden bg-indigo-50 border-2 border-indigo-200 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center"
 style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
 >
 <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">Answer</p>
 <p className="text-lg text-slate-700 m-0 leading-relaxed">{answer}</p>
 </div>
 </motion.div>
 </div>
 );
}
