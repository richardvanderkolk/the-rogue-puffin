import { Rocket, Calendar, CheckCircle } from "lucide-react";

export default function StudyPlanSection() {
 return (
 <div className="print:break-after-page mb-32" id="study-plan">
 <h5 className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-2 not-prose">The Execution</h5>
 <h1 className="mt-0 mb-12">The Master Study Plan</h1>

 <p className="lead text-xl text-slate-300 mb-8 leading-relaxed">
 Knowledge without execution is just entertainment. To guarantee incredible results, you cannot rely on motivation. You must rely on a systemic study protocol.
 </p>

 <div className="space-y-12 not-prose mt-12">
 {/* 7-Day Protocol */}
 <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
 <div className="absolute top-0 right-0 p-8 opacity-5">
 <Calendar className="w-32 h-32 text-sky-400" />
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
 <span className="font-black text-xl text-sky-400">7</span>
 </div>
 <div>
 <h3 className="text-2xl font-bold text-white">The 7-Day Blitz</h3>
 <p className="text-slate-400">For passing an imminent exam or learning a micro-skill quickly.</p>
 </div>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
 <h4 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Phase 1: Ingestion (Days 1-2)</h4>
 <ul className="space-y-3 text-sm text-slate-400">
 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Aim:</strong> Find the 20% high-yield concepts.</li>
 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Learn:</strong> Use a pacer to read source material at 2x speed. Do not take notes yet.</li>
 </ul>
 </div>
 <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
 <h4 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Phase 2: Extraction (Days 3-4)</h4>
 <ul className="space-y-3 text-sm text-slate-400">
 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Dual-Code:</strong> Draw diagrams of the core concepts.</li>
 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Feynman:</strong> Explain the diagrams out loud.</li>
 </ul>
 </div>
 <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 md:col-span-2">
 <h4 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Phase 3: Consolidation (Days 5-7)</h4>
 <ul className="space-y-3 text-sm text-slate-400">
 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Recall:</strong> Build flashcards with AI and test yourself brutally.</li>
 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" /> <strong>Sleep:</strong> 8 hours minimum to lock the short-term data into the neocortex.</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* 30-Day Protocol */}
 <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
 <div className="absolute top-0 right-0 p-8 opacity-5">
 <Rocket className="w-32 h-32 text-indigo-400" />
 </div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
 <span className="font-black text-xl text-indigo-400">30</span>
 </div>
 <div>
 <h3 className="text-2xl font-bold text-white">The 30-Day Foundation</h3>
 <p className="text-slate-400">For mastering a completely new subject or software tool.</p>
 </div>
 </div>
 <ul className="space-y-4 text-slate-300">
 <li className="flex gap-4 items-start">
 <div className="bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded">Week 1</div>
 <div><strong>The Ugly First Draft:</strong> Expose yourself to the terminology. Watch overview videos, use AI analogies. Make your necessary mistakes without judging yourself.</div>
 </li>
 <li className="flex gap-4 items-start">
 <div className="bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded">Week 2</div>
 <div><strong>Deconstruction:</strong> Slice the elephant. Focus entirely on the 20% foundational pillars. Use the Zeigarnik effect to maintain momentum.</div>
 </li>
 <li className="flex gap-4 items-start">
 <div className="bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded">Week 3</div>
 <div><strong>Zettelkasten Synthesis:</strong> Begin linking ideas. Write notes that connect Week 2's pillars to new, granular concepts.</div>
 </li>
 <li className="flex gap-4 items-start">
 <div className="bg-indigo-500/10 text-indigo-400 font-bold px-3 py-1 rounded">Week 4</div>
 <div><strong>Socratic Testing:</strong> Use AI to grill you on the subject. Identify weak points and apply the Feynman technique to patch them.</div>
 </li>
 </ul>
 </div>
 </div>

 </div>
 </div>
 );
}
