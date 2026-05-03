"use client";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

interface SubjectRow {
 topic: string;
 day1: string;
 day3: string;
 day7: string;
}

export function StudyPlannerMatrix() {
 const emptyRows = Array(6).fill({ topic: '', day1: '', day3: '', day7: '' });
 const [rows, setRows] = useState<SubjectRow[]>([]);
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem('study_planner');
 if (saved) {
 setRows(JSON.parse(saved));
 } else {
 setRows(emptyRows);
 }
 setIsLoaded(true);
 }, []);

 const updateRow = (index: number, field: keyof SubjectRow, value: string) => {
 const newRows = [...rows];
 newRows[index] = { ...newRows[index], [field]: value };
 setRows(newRows);
 localStorage.setItem('study_planner', JSON.stringify(newRows));
 };

 if (!isLoaded) return <div className="h-96 animate-pulse bg-slate-900/50 rounded-3xl" />;

 return (
 <div className="mt-20 print:break-before-page">
 <div className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-3xl ">
 
 <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
 <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
 <Calendar className="w-6 h-6 text-emerald-400 " />
 </div>
 <div>
 <h2 className="text-2xl font-black text-white uppercase tracking-tight">The Study Planner Matrix</h2>
 <p className="text-slate-400 text-sm">Schedule your Spaced Active Recall sessions to cement knowledge permanently.</p>
 </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-white/10 ">
 <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/3">Target Subject / Topic</th>
 <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Day 1 Review</th>
 <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Day 3 Review</th>
 <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Day 7 Review</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5 print:divide-slate-200">
 {rows.map((row, i) => (
 <tr key={i} className="group hover:bg-white/[0.02] print:hover:bg-transparent transition-colors">
 <td className="p-2">
 <input 
 type="text" 
 placeholder="e.g. Cranial Nerves" 
 value={row.topic}
 onChange={(e) => updateRow(i, 'topic', e.target.value)}
 className="w-full bg-transparent border border-transparent hover:border-white/10 focus:border-indigo-500 rounded-md px-3 py-2 text-slate-200 placeholder:text-slate-600 outline-none transition-all font-medium"
 />
 </td>
 <td className="p-2">
 <input 
 type="text" 
 placeholder="Date" 
 value={row.day1}
 onChange={(e) => updateRow(i, 'day1', e.target.value)}
 className="w-full text-center bg-transparent border border-transparent hover:border-white/10 focus:border-indigo-500 rounded-md px-3 py-2 text-slate-300 placeholder:text-slate-600 outline-none transition-all "
 />
 </td>
 <td className="p-2">
 <input 
 type="text" 
 placeholder="Date" 
 value={row.day3}
 onChange={(e) => updateRow(i, 'day3', e.target.value)}
 className="w-full text-center bg-transparent border border-transparent hover:border-white/10 focus:border-indigo-500 rounded-md px-3 py-2 text-slate-300 placeholder:text-slate-600 outline-none transition-all "
 />
 </td>
 <td className="p-2">
 <input 
 type="text" 
 placeholder="Date" 
 value={row.day7}
 onChange={(e) => updateRow(i, 'day7', e.target.value)}
 className="w-full text-center bg-transparent border border-transparent hover:border-white/10 focus:border-indigo-500 rounded-md px-3 py-2 text-slate-300 placeholder:text-slate-600 outline-none transition-all "
 />
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 </div>
 </div>
 );
}
