import { Target, Activity, Zap } from "lucide-react";
import { ActionCheckbox } from "./ActionCheckbox";

export default function PhaseAim() {
 return (
 <div className="print:break-before-page" id="phase-aim">
 <div className="min-h-[80vh] flex flex-col items-center justify-center text-center not-prose print:h-[1050px] print:break-after-page mb-32 border-y border-white/5 py-32 relative overflow-hidden mt-32">
 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
 <h5 className="text-indigo-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-6 relative z-10">Phase II</h5>
 <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none relative z-10 uppercase">AIM</h1>
 <p className="text-2xl md:text-3xl font-serif text-slate-400 italic max-w-2xl relative z-10">Focus & Targeting</p>
 <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-emerald-400 mt-16 mx-auto rounded-full relative z-10"></div>
 </div>

 <div className="space-y-12 not-prose mb-12 items-start mt-12">
 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
 <Target className="w-4 h-4 text-emerald-400 " />
 </div>
 The 80/20 Rule of Expertise
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>The Pareto Principle dictates that 80% of the value in any subject is derived from just 20% of the core concepts. The biggest mistake amateur learners make is treating every page of a textbook as equally important.</p>
 <p>Your goal is to become an apex predator for that 20%. Scan the material to find the structural pillars before you attempt to learn the granular details.</p>
 </div>
 </div>

 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
 <Activity className="w-4 h-4 text-emerald-400 " />
 </div>
 Slicing the Elephant
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>Complex subjects induce cognitive paralysis. You cannot learn "Organic Chemistry" in a single session. Deconstruct the subject into micro-skills.</p>
 <p>Slicing the elephant means breaking the massive, intimidating topic into small, manageable chunks that can be mastered in focused 25-minute blocks.</p>
 </div>
 </div>

 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
 <Zap className="w-4 h-4 text-emerald-400 " />
 </div>
 The Zeigarnik Effect
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>Human beings remember interrupted or incomplete tasks up to 90% better than completed ones. When you finish a chapter, your brain deletes the tension and forgets the material.</p>
 <p>Weaponize this: Always stop studying in the middle of a complex concept. Close the book. Your subconscious mind will continue to process the "unfinished" problem overnight.</p>
 </div>
 </div>

 <div className="bg-slate-900/50 p-6 rounded-2xl">
 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
 <Target className="w-4 h-4 text-emerald-400 " />
 </div>
 Setting Hard Targets
 </h3>
 <div className="text-slate-400 leading-relaxed text-sm space-y-3">
 <p>"I want to understand this" is not a goal. It is an intention.</p>
 <p>A goal is: "I will read 10 pages and be able to verbally explain the 3 core arguments without looking at the text." Clarity of target reduces friction.</p>
 </div>
 </div>
 </div>

 <div className="bg-emerald-950/40 border border-emerald-500/30 p-8 rounded-2xl my-12 not-prose break-inside-avoid">
 <h3 className="text-emerald-400 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
 <Zap className="w-4 h-4" /> Immediate Action Step
 </h3>
 <ActionCheckbox 
 id="phase2_aim" 
 steps={[
 "Identify the 20% of concepts in your current subject that will yield 80% of the results.",
 "Write down one hyper-specific, measurable study goal for your next session.",
 "Intentionally stop your next study session right in the middle of a difficult paragraph to trigger the Zeigarnik Effect."
 ]} 
 />
 </div>
 </div>
 );
}
