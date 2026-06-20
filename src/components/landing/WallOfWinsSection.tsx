import { Quote, TrendingUp } from "lucide-react";
import Image from "next/image";

export function WallOfWinsSection() {
    return (
        <section className="py-24 px-6 relative bg-slate-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-16">
                
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">
                        <TrendingUp className="w-3 h-3" /> Proof of Concept
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                        Don't take our word for it.
                    </h2>
                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                        Results from early adopters who installed the learning operating system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative flex flex-col group hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                        <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-800 opacity-50 group-hover:text-indigo-500/20 transition-colors" />
                        <div className="flex-1 space-y-4 relative z-10">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 text-emerald-400">
                                    ★★★★★
                                </div>
                                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 uppercase tracking-widest">
                                    +128% Speed Boost
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed italic text-lg pt-2">
                                "I was reading at 210 WPM. By day 4 of the boot camp, I was hitting 480 WPM with better comprehension than when I started. It feels like my brain is finally in the right gear."
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm border border-white/10 shadow-lg shrink-0">
                                MS
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Michael S.</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Software Engineer</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative flex flex-col group hover:-translate-y-2 transition-transform duration-300 shadow-xl lg:-translate-y-4">
                        <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-800 opacity-50 group-hover:text-purple-500/20 transition-colors" />
                        <div className="flex-1 space-y-4 relative z-10">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 text-emerald-400">
                                    ★★★★★
                                </div>
                                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 uppercase tracking-widest">
                                    Subvocalization Broken
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed italic text-lg pt-2">
                                "The subvocalization drill completely broke a habit I've had since 2nd grade. I read my first complete non-fiction book in a single Sunday afternoon."
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-sm border border-white/10 shadow-lg shrink-0">
                                JL
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Jessica L.</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Law Student</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative flex flex-col group hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                        <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-800 opacity-50 group-hover:text-emerald-500/20 transition-colors" />
                        <div className="flex-1 space-y-4 relative z-10">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1 text-emerald-400">
                                    ★★★★★
                                </div>
                                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 uppercase tracking-widest">
                                    2.5x Reading Velocity
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed italic text-lg pt-2">
                                "As a founder, my reading pile was causing me anxiety. The Rogue Puffin didn't just teach me to read faster, it taught me how to extract value efficiently. Game changer."
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center text-white font-black text-sm border border-white/10 shadow-lg shrink-0">
                                DT
                            </div>
                            <div>
                                <h4 className="text-white font-bold">David T.</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Startup Founder</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
