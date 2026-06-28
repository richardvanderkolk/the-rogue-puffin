import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, Zap, BookOpen, Shield, Check, Eye } from "lucide-react";
import { OutliersSection } from "@/components/landing/OutliersSection";
import { InteractivePacerPreview } from "@/components/landing/InteractivePacerPreview";
import { ViewTracker } from "@/components/ViewTracker";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Increase Your Reading Speed | The Rogue Puffin",
    description: "Unlock your biological reading capacity. Stop subvocalizing, eliminate regression, and read at the speed of thought. 100% Free.",
    alternates: {
        canonical: "/speed-reading",
    },
};

export default function SpeedReadingLandingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            <ViewTracker path="/speed-reading" title="Speed Reading Landing Page" category="Marketing" />

            {/* Hero Section */}
            <section className="relative px-6 pt-24 pb-12 md:pt-32 md:pb-24 min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Visual Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[850px] bg-gradient-to-b from-indigo-900/15 via-purple-950/5 to-transparent rounded-full blur-[150px] -z-10 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 w-full mt-6 md:mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column: Core Messaging */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col justify-center">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0 shadow-md">
                                    <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Increase Your Reading Speed
                                </div>
                                
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mx-auto lg:mx-0">
                                    <span className="text-white block">
                                        They taught you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">WHAT</span> to study.
                                    </span>
                                    <span className="text-slate-300 block mt-2">
                                        They never taught you <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">HOW</span> to read.
                                    </span>
                                </h1>
                                
                                <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Increase your reading speed in the next 10 minutes (most people will double their speed). Stop cramming, stop re-reading textbooks, and unlock the <strong className="text-white font-semibold">Rogue Puffin</strong> method to process complex information at the speed of sight. 100% Free.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link 
                                    href="/rogue-session/start" 
                                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-200 text-black rounded-full font-extrabold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
                                >
                                    Start Free Reading Session
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link 
                                    href="/free-test" 
                                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-full font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    Take 3-Minute Speed Test
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Interactive Pacer Preview */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-8 lg:pt-0">
                            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[2.5rem] blur-3xl -z-10 opacity-30 pointer-events-none animate-pulse" />
                            <InteractivePacerPreview />
                        </div>

                    </div>
                </div>
            </section>

            {/* Before & After / Dial-up Connection Section */}
            <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-slate-900/10">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Your brain is a supercomputer.</h2>
                        <h3 className="text-xl md:text-2xl text-indigo-400 font-bold">Why feed it data through a dial-up connection?</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div className="space-y-6 text-slate-300 font-light text-base md:text-lg leading-relaxed">
                            <p>
                                The average person reads at <strong className="text-white font-semibold">150 to 250 words per minute (WPM)</strong>. That is the exact same speed at which you speak.
                            </p>
                            <p>
                                Because you were taught to read by pronouncing words aloud in class, you created an inner voice (subvocalization) that acts as a physical speed limit on your reading.
                            </p>
                            <p className="border-l-2 border-indigo-500 pl-6 italic text-slate-400">
                                Your eyes can capture whole phrases at a glance, and your brain can process visual data thousands of times faster. By removing vocalization, you unlock visual reading speed instantly.
                            </p>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
                            <h4 className="text-xl font-bold text-white">The Reading Transformation</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-rose-500/20">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-500">The Vocalization Limit</p>
                                        <p className="text-lg font-bold text-slate-200 mt-1">Eye → Mouth → Ear → Brain</p>
                                    </div>
                                    <span className="text-2xl font-bold text-rose-400">200 WPM</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-emerald-500/20">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-500">Visual Reading</p>
                                        <p className="text-lg font-bold text-white mt-1">Eye → Brain (Direct Ingestion)</p>
                                    </div>
                                    <span className="text-2xl font-bold text-emerald-400">500+ WPM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The 3 Core Obstacles of Slow Reading */}
            <section className="py-24 px-6 border-t border-slate-900">
                <div className="max-w-5xl mx-auto space-y-16">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Three Habits Capping Your Reading Speed</h2>
                        <p className="text-slate-400 text-lg">We don't need to teach you to read faster. We just need to stop the mechanical habits holding you back.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">1. Subvocalization</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Pronouncing every word in your head limit-locks your reading speed to how fast you can speak. Visual reading lets you absorb concept groupings directly.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">2. Regression</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Backtracking over sentences you've already read due to lack of visual focus. Setting a rhythmic pace trains your eyes to confidently move forward.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">3. Fixation Scope</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Staring at individual words rather than taking in phrases. Widening your peripheral visual focus allows you to process multiple words at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <OutliersSection />

            {/* Simple FAQ Section */}
            <section className="py-24 px-6 border-t border-slate-900 bg-slate-950">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-3xl md:text-5xl font-black text-center text-white tracking-tight">Common Questions</h2>

                    <div className="space-y-8 text-left">
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white">Q: If I read faster, won't my comprehension drop?</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Actually, no. Reading slowly lets your mind wander and daydream. By matching reading pace to your visual thinking capacity, your brain is forced to focus intensely, which often increases comprehension.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white">Q: Does this apply to technical textbooks, math, or law?</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Yes. The key is dynamic pacing. We teach you how to scan structural concepts rapidly, then slow down and surgically read dense formulas or complex clauses, cutting overall study time in half.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white">Q: Why is Day 1 of the Bootcamp free?</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We want to prove the methodology works before asking for anything. You do the 30-minute speed diagnostic for free. If you want to wire it in as a permanent daily habit, you can upgrade to the full 14-Day Bootcamp.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action Grid */}
            <section className="py-24 px-6 bg-slate-900/40 border-t border-white/5">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* CTA 1: Free Speed Test */}
                    <div className="relative group flex flex-col h-full bg-slate-950/80 border border-slate-800 p-8 rounded-3xl space-y-6">
                        <div className="space-y-2 flex-grow">
                            <span className="inline-block px-3 py-1 bg-white/5 text-indigo-300 text-[10px] font-bold uppercase tracking-widest rounded-full">Option 1</span>
                            <h3 className="text-2xl font-bold text-white">The 3-Minute Speed Test</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                Quickly measure your starting reading speed and baseline comprehension. Ideal if you want a fast diagnostic report before starting.
                            </p>
                        </div>
                        <Link 
                            href="/free-test"
                            className="w-full text-center py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-full font-bold text-sm transition-all"
                        >
                            Take Speed Test (Free)
                        </Link>
                    </div>

                    {/* CTA 2: Free Rogue Session */}
                    <div className="relative group flex flex-col h-full bg-indigo-950/20 border border-indigo-500/20 p-8 rounded-3xl space-y-6">
                        <div className="space-y-2 flex-grow">
                            <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Option 2</span>
                            <h3 className="text-2xl font-bold text-white">The 30-Min Rogue Session</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                Dive directly into the full eye-drill training protocol. Train your eyes to sweep phrases, remove subvocalization, and establish a new baseline speed.
                            </p>
                        </div>
                        <Link 
                            href="/rogue-session/start"
                            className="w-full text-center py-4 bg-white text-black hover:bg-slate-200 rounded-full font-extrabold text-sm transition-all flex items-center justify-center gap-2"
                        >
                            Start Rogue Session (Free) <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>
        </main>
    );
}
