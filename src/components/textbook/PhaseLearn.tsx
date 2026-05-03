import { Brain, Zap, X } from "lucide-react";
import { ActionCheckbox } from "./ActionCheckbox";

export default function PhaseLearn() {
 return (
 <div className="print:break-before-page" id="phase-learn">
 <div className="min-h-[80vh] flex flex-col items-center justify-center text-center not-prose print:h-[1050px] print:break-after-page mb-32 border-y border-white/5 py-32 relative overflow-hidden mt-32">
 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
 <h5 className="text-indigo-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-6 relative z-10">Phase III</h5>
 <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none relative z-10 uppercase">LEARN</h1>
 <p className="text-2xl md:text-3xl font-serif text-slate-400 italic max-w-2xl relative z-10">The Core Ingestion Strategy</p>
 <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-emerald-400 mt-16 mx-auto rounded-full relative z-10"></div>
 </div>

 <div className="bg-slate-900 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-12 not-prose">
 <p className="text-sm text-slate-300 mb-2 font-bold uppercase tracking-widest">The Objective</p>
 <p className="text-lg text-white ">Destroy your internal reading voice to unlock raw visual ingestion speeds.</p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 not-prose mb-16 items-center">
 <div className="order-2 lg:order-1">
 <img src="/images/subvocalization.png" alt="Subvocalization vs Visual Processing" className="w-full rounded-3xl shadow-2xl border border-white/10 " />
 </div>
 <div className="space-y-10 order-1 lg:order-2">
 <div>
 <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
 <X className="w-5 h-5 text-rose-400 " />
 </div>
 The Myth: Subvocalization
 </h3>
 <div className="text-slate-400 leading-relaxed space-y-4 text-sm sm:text-base">
 <p>You were taught to read by sounding out words aloud. As you grew older, the teacher told you to "read silently." But your brain is still acting like you are speaking. Because you can only <em>speak</em> at about 200 to 250 words per minute, your reading speed is permanently capped.</p>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
 <Brain className="w-5 h-5 text-emerald-400 " />
 </div>
 The Science: Visual Processing
 </h3>
 <div className="text-slate-400 leading-relaxed space-y-4 text-sm sm:text-base">
 <p>Your eyes and brain process visual information instantly. When you look at a stop sign, you don't sound out "S-T-O-P" in your head. By bypassing the vocal mechanism and routing words directly to your visual cortex, you can ingest entire sentences instantly.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="space-y-12 not-prose mb-12 items-start mt-12">
 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
 <Brain className="w-4 h-4 text-purple-400 " />
 </div>
 Dual Coding
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>The "Visual Learner" is a myth. Sticking to one learning style stunts neuroplasticity. The most efficient way to learn is Dual Coding: combining verbal materials with visual materials.</p>
 <p>When you read a text, draw a terrible stick-figure diagram representing the concept. When you look at a chart, write a two-sentence summary. The friction of translating formats forces long-term retention.</p>
 </div>
 </div>

 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
 <Zap className="w-4 h-4 text-purple-400 " />
 </div>
 AI As a Socratic Tutor
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>Most people use AI as an answer key. This bypasses the friction required for learning. Instead, prompt AI to be your Socratic Tutor.</p>
 <p>Tell it: <em>"Do not give me answers. Ask me one question at a time to test my understanding, wait for my response, and evaluate it."</em> Use it to generate analogies for complex topics.</p>
 </div>
 </div>
 </div>

 <div className="bg-purple-950/40 border border-purple-500/30 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
 <h3 className="text-purple-400 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
 <Zap className="w-4 h-4" /> Immediate Action Step
 </h3>
 <ActionCheckbox 
 id="phase3_learn" 
 steps={[
 "Use your finger as a physical pacer and drag it under text twice as fast as you can read for 2 minutes to break the inner voice.",
 "Take a difficult paragraph and Dual-Code it by drawing a rough diagram of its meaning.",
 "Open an AI tool and prompt it to act as a Socratic tutor to test you on a recent topic."
 ]} 
 />
 </div>
 </div>
 );
}
