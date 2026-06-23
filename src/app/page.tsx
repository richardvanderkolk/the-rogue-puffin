import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Brain, BookOpen, Clock, Activity, CheckCircle2, X, Check, Eye, HelpCircle } from "lucide-react";
import { OutliersSection } from "@/components/landing/OutliersSection";
import { IsThisForYouSection } from "@/components/landing/IsThisForYouSection";
import { WallOfWinsSection } from "@/components/landing/WallOfWinsSection";
import { StorySection } from "@/components/landing/StorySection";
import { InteractivePacerPreview } from "@/components/landing/InteractivePacerPreview";
import { ViewTracker } from "@/components/ViewTracker";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Learning Mastery & Study Skills | The Rogue Puffin",
    description: "Master the skill behind every other skill: learning. Learn faster, understand deeper, remember longer. Start with our free 30-minute reading training.",
};

export default function V2LandingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            <ViewTracker path="/" title="Landing Page" category="Marketing" />

            {/* 1. Hero Section (Repositioned around Learning Mastery) */}
            <section className="relative px-6 pt-24 pb-12 md:pt-28 md:pb-20 min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Visual Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[850px] bg-gradient-to-b from-indigo-900/15 via-purple-950/5 to-transparent rounded-full blur-[150px] -z-10 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 w-full mt-6 md:mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        
                        {/* Left Column (Core Messaging) */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col justify-center">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0 shadow-md">
                                    <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Over 12,000+ Speed Drills Completed
                                </div>
                                
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mx-auto lg:mx-0">
                                    <span className="text-white block">
                                        School teaches you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">WHAT</span> to learn.
                                    </span>
                                    <span className="text-slate-300 block mt-2">
                                        We teach you <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">HOW</span> to master it, unlocking true learning mastery.
                                    </span>
                                </h1>
                                
                                <div className="space-y-4 max-w-2xl mx-auto lg:mx-0 pt-2">
                                    <p className="text-lg md:text-xl text-indigo-300 font-bold tracking-tight">
                                        Learn faster. &nbsp;&bull;&nbsp; Understand deeper. &nbsp;&bull;&nbsp; Remember longer.
                                    </p>
                                    <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
                                        Unlock a scientifically proven meta-learning system. By training your brain to ingest visual information at the speed of thought, actively synthesize complex concepts, and encode them into permanent memory, we help you turn coursework into lasting expertise.
                                    </p>
                                    <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
                                        Our goal is for you to deeply understand what you need to learn in the most efficient and effective way known.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Path Selection Action Card) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-8 lg:pt-0">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-3xl -z-10 opacity-30 pointer-events-none animate-pulse" />
                            
                            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col w-full max-w-md mx-auto group">
                                {/* Decorative top header glow */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
                                
                                <div className="space-y-6">
                                    <div className="border-b border-white/5 pb-4">
                                        <span className="text-xs text-indigo-400 uppercase tracking-widest font-extrabold block">Get Started</span>
                                        <h3 className="text-lg font-bold text-white mt-1">Select your starting path:</h3>
                                    </div>
                                    
                                    {/* Option 1: Free Masterclass */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-xs text-indigo-300 font-mono">1</span>
                                                Free 30-Minute Masterclass
                                            </span>
                                            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider font-mono">Free</span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-light leading-relaxed pl-8">
                                            Double your reading speed, assess your eye focus, and experience instant gains with no account or signup required.
                                        </p>
                                        <div className="pl-8">
                                            <Link 
                                                href="/rogue-session/start?v2=true&mode=assessment" 
                                                className="w-full group/btn relative py-3 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.15)] border border-indigo-400/20"
                                            >
                                                Start Free Masterclass
                                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-white/5" />
                                    
                                    {/* Option 2: The Bootcamp */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-xs text-purple-300 font-mono">2</span>
                                                14-Day Learning Mastery Bootcamp
                                            </span>
                                            <span className="text-xs text-slate-400 font-mono font-semibold">$29 Lifetime</span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-light leading-relaxed pl-8">
                                            Lock in your visual reading speed, synthesize complex concepts, and build permanent memory recall habits.
                                        </p>
                                        <div className="pl-8">
                                            <Link 
                                                href="/bootcamp" 
                                                className="w-full py-3 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2"
                                            >
                                                View 14-Day Syllabus
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. Immediate Proof */}
            <section className="py-24 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Module 1: Immediate Proof & Live Pacer Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left Side: Copy */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0 shadow-md">
                                <Brain className="w-3.5 h-3.5 text-indigo-400" /> Immediate Proof
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                Let us prove to you that your mind is <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">capable of much more.</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed">
                                We start with speed reading because it gives you immediate, tangible proof of how much you can improve in a short amount of time. Once you see that you can double your reading speed in under 30 minutes—without losing comprehension—you realize that your mind is capable of far more than you think. Because reading is the primary gateway to absorbing new knowledge, this visual acceleration upgrades the foundation of your entire learning process.
                            </p>
                            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link 
                                    href="/rogue-session/start?v2=true&mode=assessment" 
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.15)] border border-indigo-400/20"
                                >
                                    Start Free Masterclass
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <span className="text-xs text-slate-500 font-medium">Takes 30 minutes • No signup required</span>
                            </div>
                        </div>

                        {/* Right Side: Interactive RSVP Speed Drill Widget */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-8 lg:pt-0">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-3xl -z-10 opacity-30 pointer-events-none animate-pulse" />
                            <InteractivePacerPreview />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Founder's Story Section */}
            <StorySection />

            {/* 4. The 3 Learning Bottlenecks */}
            <section className="py-24 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-12">
                        <div className="text-center space-y-4 max-w-3xl mx-auto">
                            <h3 className="text-3xl font-black text-white tracking-tight">The 3 Bottlenecks Holding Your Learning Back</h3>
                            <p className="text-lg text-slate-400 font-light leading-relaxed">
                                Traditional study habits create a bottleneck in your brain's processing pipeline. To master learning, you must first break these three friction points.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {/* Bottleneck 1 */}
                            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-5 relative overflow-hidden flex flex-col group hover:border-rose-500/30 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-black text-rose-500/20 font-mono">01</span>
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <h4 className="text-xl font-bold text-white tracking-tight">The Reading Bottleneck</h4>
                                    <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">Saying words in your head</p>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light pt-2">
                                        Most people read at standard speaking speed (~200 WPM) because they pronounce every word internally. This subvocalization caps your reading velocity at the speed of speech, not the speed of thought.
                                    </p>
                                </div>
                            </div>

                            {/* Bottleneck 2 */}
                            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-5 relative overflow-hidden flex flex-col group hover:border-rose-500/30 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-black text-rose-500/20 font-mono">02</span>
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400">
                                        <X className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <h4 className="text-xl font-bold text-white tracking-tight">The Understanding Bottleneck</h4>
                                    <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">Highlighting without processing</p>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light pt-2">
                                        Running a highlighter over lines of text creates an "illusion of competence." You feel like you are studying, but passive highlighting fails to build active conceptual links or deep comprehension.
                                    </p>
                                </div>
                            </div>

                            {/* Bottleneck 3 */}
                            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-5 relative overflow-hidden flex flex-col group hover:border-rose-500/30 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-black text-rose-500/20 font-mono">03</span>
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <h4 className="text-xl font-bold text-white tracking-tight">The Memory Bottleneck</h4>
                                    <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">The "cram and forget" cycle</p>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light pt-2">
                                        Sequential cramming right before exams only loads information into your fragile short-term memory. According to the forgetting curve, up to 80% is lost within 48 hours of your test.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. The Social Proof (Wall of Wins) */}
            <WallOfWinsSection />



            {/* 6. The Mechanics (Why It Works) - Outliers Section */}
            <OutliersSection />
            
            {/* 7. Audience Self-Selection (Is this for you?) */}
            <IsThisForYouSection />
               {/* 8. The 14-Day Bootcamp (The Paid Execution Plan) */}
            <section id="bootcamp" className="py-24 md:py-40 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-purple-500/5 blur-[120px] -z-10" />
                
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 lg:order-1 order-2">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-2">
                                <Clock className="w-3.5 h-3.5" /> Permanent habit lock-in
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                The 14-Day <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Learning Mastery Bootcamp.</span>
                            </h2>
                        </div>
                        
                        <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                            <p>
                                You have all the theory for free. But knowing the theory doesn't change your reading habits.
                            </p>
                            <p className="border-l-2 border-purple-950/60 pl-6 italic text-slate-300">
                                "A daily structured protocol to transition from raw reading speed to active concept synthesis and permanent memory recall."
                            </p>
                            <p>
                                Stop wasting hours trying to figure it out yourself. We priced the Bootcamp to be highly accessible so every student can get the exact daily roadmap to rewire their brain and permanently upgrade their learning capacity.
                            </p>
                        </div>
                        
                        {/* Bootcamp Price Pitch & Comparison Card */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 max-w-lg shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-indigo-500/10 text-indigo-300 px-4 py-1 rounded-bl-2xl text-[10px] font-extrabold uppercase tracking-widest border-b border-l border-slate-800">No Subscription</div>
                            
                            <div className="flex justify-between items-center gap-4">
                                <div>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest font-extrabold block">One-Time Lifetime Access</span>
                                    <div className="text-3xl font-black text-white mt-1">$29 <span className="text-sm text-slate-400 font-medium">USD</span></div>
                                </div>
                                <Link 
                                    href="/bootcamp" 
                                    className="px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-base transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] active:scale-95 text-center shrink-0"
                                >
                                    Get Instant Access
                                </Link>
                            </div>
 
                            <div className="border-t border-slate-800/80 pt-4 space-y-3">
                                <div className="flex justify-between text-xs text-slate-500 font-medium">
                                    <span>Traditional Academic Tutoring</span>
                                    <span className="line-through font-mono">$150+/hr</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 font-medium">
                                    <span>Speed Reading Seminars</span>
                                    <span className="line-through font-mono">$1,200+</span>
                                </div>
                                <div className="flex justify-between text-xs text-indigo-400 font-bold border-t border-slate-800/40 pt-2">
                                    <span>The 14-Day Learning Mastery Bootcamp</span>
                                    <span className="font-mono">$29 (One-Time)</span>
                                </div>
                            </div>
 
                            <div className="text-[10px] text-slate-500 font-medium text-center border-t border-slate-800/40 pt-3">
                                🔒 100% Risk-Free 14-Day Learning Mastery Guarantee.
                            </div>
                        </div>
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
