import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Clock, Activity, CheckCircle2 } from "lucide-react";
import { OutliersSection } from "@/components/landing/OutliersSection";
import { IsThisForYouSection } from "@/components/landing/IsThisForYouSection";
import { WallOfWinsSection } from "@/components/landing/WallOfWinsSection";
import { StorySection } from "@/components/landing/StorySection";
import { LearningMasteryPacerPreview } from "@/components/landing/LearningMasteryPacerPreview";
import { ViewTracker } from "@/components/ViewTracker";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Learning Mastery & Cognitive Performance | The Rogue Puffin",
    description: "Learn faster, retain more, and stay ahead. Apply verifiable cognitive protocols to finish your workload, read 50+ books a year, and maximize your learning speed.",
};

export default function LearningMasteryPage() {
    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            <ViewTracker path="/learning-mastery" title="Learning Mastery Landing Page" category="Marketing" />

            {/* 1. Hero Section */}
            <section className="relative px-6 pt-24 pb-12 md:pt-32 md:pb-16 min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />

                <div className="max-w-6xl mx-auto relative z-10 w-full mt-8 md:mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column (Text & Outcomes) */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left flex flex-col justify-center">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
                                    <Zap className="w-3 h-3" /> Cognitive Performance Protocol
                                </div>
                                <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[1.0] mx-auto lg:mx-0">
                                    Learn faster. <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Retain more.</span>
                                </h1>
                                
                                <div className="space-y-4 max-w-2xl mx-auto lg:mx-0 pt-2">
                                    <p className="text-2xl md:text-3xl text-indigo-300 font-bold tracking-tight">
                                        Maximize your reading and learning speed for free in 30 minutes (most people will double their speed).
                                    </p>
                                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                                        Traditional reading speeds limit your learning capacity. By training your eyes to silence your inner speaking voice, you can digest information, study materials, and books much faster than you are used to—without sacrificing comprehension.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center lg:items-start gap-5 pt-2">
                                <div className="flex flex-col items-center lg:items-start gap-4 relative w-full">
                                    <Link 
                                        href="/rogue-session/start?v2=true&mode=assessment" 
                                        className="group relative px-8 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-full font-black text-lg transition-all active:scale-95 flex items-center justify-center text-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_45px_rgba(99,102,241,0.4)] border border-indigo-400/20"
                                    >
                                        Start Free Cognitive Assessment
                                    </Link>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900/60 border border-slate-800/80 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm mt-1">
                                        <Activity className="w-3.5 h-3.5 text-indigo-400" /> Takes 30 minutes • Instant speed test included
                                    </div>
                                </div>
                                
                                {/* Learning Outcomes Grid */}
                                <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full pt-6 max-w-xl mx-auto lg:mx-0 text-left border-t border-white/5">
                                    <div className="flex items-center gap-2.5 text-sm text-slate-400">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Finish your study workload</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm text-slate-400">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Read 50+ books a year</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm text-slate-400">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Stay ahead at work</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm text-slate-400">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Learn faster than others</span>
                                    </div>
                                </div>

                                <Link href="/bootcamp" className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-2 mx-auto lg:mx-0">
                                    View the 14-Day Learning Mastery Bootcamp <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Column (Visual Focus Pacer) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-8 lg:pt-0">
                            <LearningMasteryPacerPreview />
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. Founder's Story Section */}
            <StorySection />

            {/* 3. Empirical Proof (Wall of Wins) */}
            <WallOfWinsSection />

            {/* 4. Outliers Section (Compound Learning) */}
            <OutliersSection />
            
            {/* 5. Audience Self-Selection */}
            <IsThisForYouSection />

            {/* 6. The 14-Day Bootcamp Pitch */}
            <section id="bootcamp" className="py-24 md:py-40 px-6 border-t border-white/5 bg-slate-950 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-purple-500/5 blur-[120px] -z-10" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 lg:order-1 order-2">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-2">
                                <Clock className="w-3 h-3" /> Guided Skill Acquisition
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                The 14-Day <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Learning Mastery Bootcamp.</span>
                            </h2>
                        </div>
                        
                        <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                            <p>
                                Reading theory is valuable, but changing automatic habits requires structured daily practice.
                            </p>
                            <p className="border-l-2 border-slate-800 pl-6 italic text-slate-300">
                                "A daily structured sprint to transition from raw reading speed to active concept synthesis and permanent memory recall."
                            </p>
                            <p>
                                Instead of manually figuring out how to stop subvocalizing, follow a daily roadmap designed to unlock your natural ability to synthesize entire ideas at once, helping you feel smarter and get promoted.
                            </p>
                        </div>

                        <Link 
                            href="/bootcamp" 
                            className="inline-flex px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-500 transition-all shadow-[0_0_30px_-5px_rgba(147,51,234,0.4)] active:scale-95 items-center justify-center text-center gap-3"
                        >
                            Explore the Learning Mastery Bootcamp
                        </Link>
                    </div>

                    <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl lg:order-2 order-1">
                        <Image src="/images/phase_1_lab.png" alt="The 14-Day Bootcamp" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-white" />
                            <span className="text-white font-bold tracking-widest uppercase text-sm">Guided Protocol</span>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
