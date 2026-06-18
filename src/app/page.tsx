import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Brain, BookOpen, Clock, Activity, ArrowDown } from "lucide-react";
import { OutliersSection } from "@/components/landing/OutliersSection";
import { IsThisForYouSection } from "@/components/landing/IsThisForYouSection";
import { WallOfWinsSection } from "@/components/landing/WallOfWinsSection";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speed Reading & Cognitive Performance | The Rogue Puffin",
    description: "Read 2x faster right now. Apply verifiable cognitive science to instantly increase your understanding, reading speed, and recall in 30 minutes.",
};

export default function V2LandingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            


            {/* 1. The "Aha!" Hero Section */}
            <section className="relative px-6 min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 mt-4 md:mt-8">
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                            <Zap className="w-3 h-3" /> Over 12,000+ Speed Drills Completed
                        </div>
                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[1.0]">
                            Read 2x faster <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">right now.</span>
                        </h1>
                        
                        <div className="space-y-4 max-w-2xl mx-auto pt-2">
                            <p className="text-2xl md:text-3xl text-amber-400 font-bold tracking-tight">
                                The One Advantage Bill Gates and Warren Buffett Both Wished They Had.
                            </p>
                            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                                Skeptical? You should be. Most speed-reading apps teach you to skim, which ruins recall. Instead, this free 30-minute training uses biological eye-movement drills to silence your inner speaking voice, helping you absorb information at the speed of sight.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-5 pt-2">
                        <div className="flex flex-col items-center gap-4 relative">
                            {/* The Post-it Note (Now anchored to the CTA) */}
                            <div className="hidden md:block absolute -right-[320px] -top-2 rotate-[6deg] hover:rotate-[2deg] transition-transform cursor-default z-30 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700 fill-mode-both">
                                <div className="bg-gradient-to-br from-[#fdf5cc] to-[#f4e087] text-slate-800 p-6 w-64 rounded-sm shadow-[4px_12px_24px_rgba(0,0,0,0.6)] border border-yellow-300/60 relative transform origin-top-left hover:scale-105 transition-all before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-full before:h-2 before:bg-gradient-to-t before:from-black/5 before:to-transparent">
                                   {/* Tape */}
                                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-16 h-5 bg-white/50 shadow-sm rotate-[-3deg] backdrop-blur-sm border border-white/20" /> 
                                   <p className="font-handwriting text-2xl leading-tight font-medium opacity-90 mix-blend-multiply">
                                     P.S. When asked how he learned to build rockets, Elon Musk famously said:<br/>
                                     <span className="font-bold block mt-2 text-3xl">"I read books."</span>
                                   </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm font-medium text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                                <Activity className="w-4 h-4" /> 100% Free Assessment & Drill • No Sign-up/Card Needed to Start
                            </div>
                            <Link 
                                href="/rogue-session/start?v2=true" 
                                className="group relative px-8 py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full font-black text-lg hover:from-amber-300 hover:to-amber-400 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] border border-amber-300/50"
                            >
                                Double My Reading Speed (Free Drill) <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        
                        <Link href="/bootcamp" className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2">
                            Skip the free session. View the 14-Day Bootcamp <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. The Mechanics (Why It Works) - Replaced with Outliers Section */}
            <OutliersSection />
            
            {/* 3. The Social Proof (Wall of Wins) */}
            <WallOfWinsSection />
            
            {/* 4. Audience Self-Selection (Is this for you?) */}
            <IsThisForYouSection />

            {/* 5. The 14-Day Bootcamp (The Paid Execution Plan) */}
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
                            href="/bootcamp" 
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
