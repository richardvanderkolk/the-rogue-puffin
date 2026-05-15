import { Target, BookOpen, Briefcase, CheckCircle2, X } from "lucide-react";

export function IsThisForYouSection() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-slate-950 border-t border-white/5">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-indigo-500/5 blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">
                        <Target className="w-3 h-3" /> Who is this for?
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                        Are you running on <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">outdated software?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                        The Rogue Puffin is not for casual readers. It is a rigorous cognitive protocol designed for ambitious individuals who treat learning as a competitive advantage.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Persona 1: The Entrepreneur / Professional */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
                        
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                                <Briefcase className="w-8 h-8 text-indigo-400" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-white tracking-tight">The Ambitious Professional</h3>
                            <p className="text-slate-400 leading-relaxed min-h-[80px]">
                                You know that your earning potential is directly tied to your learning potential. You have a stack of non-fiction books on your nightstand that you never have time to finish.
                            </p>
                            
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-red-500/10 p-0.5 rounded-full"><X className="w-4 h-4 text-red-400" /></div>
                                    <p className="text-slate-300 text-sm">Drowning in newsletters, industry reports, and self-improvement books.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-emerald-500/10 p-0.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></div>
                                    <p className="text-slate-300 text-sm"><strong className="text-white">With The Rogue Puffin:</strong> Devour a 300-page business book in a single 2-hour flight, retaining the 3 actionable frameworks that actually matter.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Persona 2: The Overwhelmed Student */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
                        
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                                <BookOpen className="w-8 h-8 text-purple-400" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-white tracking-tight">The Overwhelmed Student</h3>
                            <p className="text-slate-400 leading-relaxed min-h-[80px]">
                                You are buried under dense academic textbooks, research papers, and case studies. You re-read paragraphs three times just to understand what they mean.
                            </p>
                            
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-red-500/10 p-0.5 rounded-full"><X className="w-4 h-4 text-red-400" /></div>
                                    <p className="text-slate-300 text-sm">Spending 6 hours in the library but only covering 20 pages of material.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-emerald-500/10 p-0.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></div>
                                    <p className="text-slate-300 text-sm"><strong className="text-white">With The Rogue Puffin:</strong> Slice through academic journals in a fraction of the time, mapping concepts perfectly for exams and essays.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
