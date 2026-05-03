import React from 'react';
import { BookOpen, User, Search, Zap, ArrowDown } from 'lucide-react';

export default function FeynmanFlowchart() {
 const steps = [
 { id: 1, title: "Choose a Concept", icon: <BookOpen className="w-6 h-6 text-indigo-400" />, desc: "Write the name of the concept at the top of a blank page." },
 { id: 2, title: "Teach a Child", icon: <User className="w-6 h-6 text-emerald-400" />, desc: "Explain the idea in plain English. Avoid jargon. Use simple analogies." },
 { id: 3, title: "Identify Gaps", icon: <Search className="w-6 h-6 text-amber-400" />, desc: "Whenever you get stuck or resort to complex words, go back to the source material." },
 { id: 4, title: "Simplify & Review", icon: <Zap className="w-6 h-6 text-purple-400" />, desc: "Read it out loud. If it sounds confusing, simplify it further." }
 ];

 return (
 <div className="my-16 break-inside-avoid-page bg-[#0f172a]/50 border border-slate-800 rounded-3xl p-8 shadow-2xl font-sans">
 <h3 className="text-xl font-bold mb-10 text-center uppercase tracking-widest text-emerald-400 ">The Feynman Technique</h3>
 
 <div className="flex flex-col items-center max-w-md mx-auto">
 {steps.map((step, idx) => (
 <React.Fragment key={step.id}>
 <div className="w-full bg-[#020617] border border-slate-800 rounded-2xl p-6 flex gap-6 items-center shadow-lg relative group transition-transform hover:-translate-y-1">
 <div className="w-12 h-12 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
 {step.icon}
 </div>
 <div>
 <h4 className="text-white font-bold m-0 mb-1">{step.id}. {step.title}</h4>
 <p className="text-slate-400 text-sm m-0 leading-snug">{step.desc}</p>
 </div>
 </div>
 
 {idx < steps.length - 1 && (
 <div className="h-8 w-1 bg-gradient-to-b from-slate-800 to-slate-800/0 relative flex justify-center items-center my-1">
 <ArrowDown className="absolute text-slate-700 w-4 h-4" />
 </div>
 )}
 </React.Fragment>
 ))}
 </div>
 </div>
 );
}
