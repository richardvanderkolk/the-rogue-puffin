import { Brain, Clock, BookOpen, Zap } from "lucide-react";
import Image from "next/image";
import { ActionCheckbox } from "./ActionCheckbox";

export default function PhaseRecall() {
 return (
 <div className="print:break-before-page" id="phase-recall">
 <div className="min-h-[80vh] flex flex-col items-center justify-center text-center not-prose print:h-[1050px] print:break-after-page mb-32 border-y border-white/5 py-32 relative overflow-hidden mt-32">
 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
 <h5 className="text-indigo-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-6 relative z-10">Phase IV</h5>
 <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none relative z-10 uppercase">RECALL</h1>
 <p className="text-2xl md:text-3xl font-serif text-slate-400 italic max-w-2xl relative z-10">Memory & Permanence</p>
 <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-emerald-400 mt-16 mx-auto rounded-full relative z-10"></div>
 </div>

 <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 not-prose mb-12 items-start mt-10">
 <div className="space-y-8">
 <div>
 <h1 className="text-4xl font-bold text-white mb-6">Active Recall vs Rereading</h1>
 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
 <Brain className="w-4 h-4 text-amber-400 " />
 </div>
 The Illusion of Competence
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>Rereading and highlighting create the "Illusion of Competence." Because the text is in front of you, your brain feels familiar with it, tricking you into thinking it's stored in long-term memory. It isn't.</p>
 <p>True memory formation requires biological struggle. You must close the book and force your brain to pull the answer from nothing. This physical struggle builds the neural pathway.</p>
 </div>
 </div>
 </div>
 
 <div>
 <h1 className="text-4xl font-bold text-white mb-6">Advanced Note-Taking</h1>
 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
 <BookOpen className="w-4 h-4 text-amber-400 " />
 </div>
 The Zettelkasten Method
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>Linear notes are dead ends. The Zettelkasten (Slip-box) method treats notes like a networked web, mirroring how your brain actually thinks.</p>
 <p>Instead of summarizing a book in one long document, create one note per concept. Then, actively link that concept to other notes you've taken in the past. This forces your brain to synthesize new ideas rather than just regurgitating old ones.</p>
 </div>
 </div>
 </div>

 <div>
 <h1 className="text-4xl font-bold text-white mb-6">Spaced Repetition</h1>
 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
 <Clock className="w-4 h-4 text-amber-400 " />
 </div>
 Beating the Forgetting Curve
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>Because memories decay exponentially over time (The Ebbinghaus Forgetting Curve), cramming is neurologically useless. You must space recall sessions out: 1 day later, 3 days later, 7 days later.</p>
 </div>
 </div>
 </div>
 </div>
 
 <div className="self-start">
 <Image src="/images/phase_3_feynman.png" alt="The Feynman Matrix" width={800} height={800} className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 " />
 </div>
 </div>

 <div className="bg-amber-950/40 border border-amber-500/30 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
 <h3 className="text-amber-400 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
 <Zap className="w-4 h-4" /> Immediate Action Step
 </h3>
 <ActionCheckbox 
 id="phase4_recall" 
 steps={[
 "Close your textbook right now and try to explain the last chapter you read out loud to an imaginary 12-year-old.",
 "Take one concept you learned today and write a 'Zettel' note linking it to something you learned last week.",
 "Schedule your next 3 Active Recall review sessions on your calendar."
 ]} 
 />
 </div>
 </div>
 );
}
