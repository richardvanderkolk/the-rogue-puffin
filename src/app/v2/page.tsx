import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Brain, BookOpen, Clock, Activity, ArrowDown } from "lucide-react";
import { OutliersSection } from "@/components/landing/OutliersSection";

export default function V2LandingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            


            {/* 1. The "Aha!" Hero Section */}
            <section className="relative px-6 min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12 mt-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                            <Zap className="w-3 h-3" /> The Speed Reading Masterclass
                        </div>
                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[1.0]">
                            Read 2x faster <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">right now.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                            It takes 30 minutes. It's completely free. Experience the biological shift in your brain immediately.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <Link 
                            href="/rogue-session/start?v2=true" 
                            className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                        >
                            Start the Free Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <a href="#bootcamp" className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2">
                            Skip the demo. View the 14-Day Bootcamp <ArrowDown className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. The Mechanics (Why It Works) - Replaced with Outliers Section */}
            <OutliersSection />

            {/* 3. The Playbook (The Free Theory Hub) */}
            <section className="py-24 md:py-32 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-indigo-500/5 blur-[120px] -z-10" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                        <Image src="/images/phase_3_feynman.png" alt="The Free Playbook" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-white" />
                            <span className="text-white font-bold tracking-widest uppercase text-sm">The Living Playbook</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Radical Generosity.</h2>
                            <p className="text-xl text-indigo-300 font-light leading-relaxed">
                                Don't want to do the interactive session? We give the theory away for free.
                            </p>
                        </div>
                        
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            Information shouldn't be locked behind a paywall. We have compiled all of our cognitive science, study frameworks, and deep-dive articles into a beautiful, printable Comprehensive Textbook. Read the science yourself, no credit card required.
                        </p>

                        <Link 
                            href="/textbook/comprehensive" 
                            className="inline-flex px-8 py-4 bg-slate-900 border border-slate-700 text-white rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95 items-center gap-3"
                        >
                            <BookOpen className="w-5 h-5" /> Read The Free Playbook
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. The 14-Day Bootcamp (The Paid Execution Plan) */}
            <section id="bootcamp" className="py-24 md:py-40 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-purple-500/5 blur-[120px] -z-10" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 lg:order-1 order-2">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-2">
                                <Clock className="w-3 h-3" /> The Execution Plan
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                The 14-Day <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Bootcamp.</span>
                            </h2>
                        </div>
                        
                        <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                            <p>
                                You have all the theory for free. But knowing the theory doesn't change your habits.
                            </p>
                            <p className="border-l-2 border-slate-800 pl-6 italic text-slate-300">
                                "If you want a structured, day-by-day guided protocol that forces you to implement these techniques over 14 days, get the Bootcamp."
                            </p>
                            <p>
                                Stop wasting time trying to piece the puzzle together yourself. Get the exact daily roadmap to rewire your brain and permanently upgrade your intelligence.
                            </p>
                        </div>

                        <Link 
                            href="/v2/bootcamp" 
                            className="inline-flex px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-500 transition-all shadow-[0_0_30px_-5px_rgba(147,51,234,0.4)] active:scale-95 items-center gap-3"
                        >
                            View The Bootcamp <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl lg:order-2 order-1">
                        <Image src="/images/phase_1_lab.png" alt="The 14-Day Bootcamp" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-white" />
                            <span className="text-white font-bold tracking-widest uppercase text-sm">Guided Execution</span>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
