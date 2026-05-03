import React from 'react';
import { motion } from 'framer-motion';

export default function FourStagesDiagram() {
 const stages = [
 { title: "Unconscious Incompetence", desc: "You don't know what you don't know.", color: "bg-slate-800 border-slate-700", text: "text-slate-400" },
 { title: "Conscious Incompetence", desc: "You know what you don't know.", color: "bg-indigo-900 border-indigo-700", text: "text-indigo-300" },
 { title: "Conscious Competence", desc: "You can do it, but it requires extreme focus.", color: "bg-purple-900 border-purple-700", text: "text-purple-300" },
 { title: "Unconscious Competence", desc: "It happens automatically. Flow state.", color: "bg-emerald-900 border-emerald-500", text: "text-emerald-400" }
 ];

 return (
 <div className="my-12 break-inside-avoid-page w-full max-w-2xl mx-auto font-sans">
 <h3 className="text-xl font-bold mb-8 text-center uppercase tracking-widest text-indigo-400 ">The 4 Stages of Learning</h3>
 <div className="flex flex-col gap-2">
 {stages.map((stage, idx) => (
 <div 
 key={idx} 
 className={`relative flex flex-col justify-center p-6 rounded-xl border ${stage.color} shadow-xl`}
 style={{ marginLeft: `${idx * 15}%`, width: `${100 - (idx * 15)}%` }}
 >
 <div className="flex items-center gap-4">
 <span className={`text-4xl font-black opacity-20 ${stage.text} `}>0{idx + 1}</span>
 <div>
 <h4 className={`text-lg font-bold m-0 ${stage.text} `}>{stage.title}</h4>
 <p className="text-sm m-0 mt-1 text-slate-300 leading-tight">{stage.desc}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 <p className="text-center text-xs text-slate-500 mt-6 uppercase tracking-wider font-bold">Goal: Push skills up the staircase</p>
 </div>
 );
}
