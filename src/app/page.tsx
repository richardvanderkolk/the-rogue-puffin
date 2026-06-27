import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Brain, BookOpen, Clock, Activity, CheckCircle2, X, Check, Eye, HelpCircle } from "lucide-react";
import { OutliersSection } from "@/components/landing/OutliersSection";
import { IsThisForYouSection } from "@/components/landing/IsThisForYouSection";
import { WallOfWinsSection } from "@/components/landing/WallOfWinsSection";
import { StorySection } from "@/components/landing/StorySection";
import { InteractivePacerPreview } from "@/components/landing/InteractivePacerPreview";
import { ChooseYourPath } from "@/components/landing/ChooseYourPath";
import { ViewTracker } from "@/components/ViewTracker";

import { Metadata } from "next";
import { headers } from "next/headers";
import { getCurrencyInfo } from "@/lib/currency";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Learning Mastery & Study Skills | The Rogue Puffin",
    description: "Master the skill behind every other skill: learning. Learn faster, understand deeper, remember longer. Start with our free 30-minute reading training.",
};

export default async function V2LandingPage() {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country');
    const { symbol, currency } = getCurrencyInfo(country);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let hasPaid = false;
    let userName = "";

    if (user) {
        try {
            const { data: profile } = await supabase
                .from('profiles')
                .select('has_paid_bootcamp, full_name')
                .eq('id', user.id)
                .single();
            hasPaid = profile?.has_paid_bootcamp || false;
            userName = profile?.full_name || user.email?.split('@')[0] || "there";
        } catch (err) {
            console.error("Failed to fetch user profile in landing page:", err);
        }
    }

    return (
        <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            <ViewTracker path="/" title="Landing Page" category="Marketing" />

            {/* 1. Hero Section (Repositioned around Learning Mastery) */}
            <section className="relative px-6 pt-24 pb-12 md:pt-28 md:pb-20 min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Visual Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[850px] bg-gradient-to-b from-indigo-900/15 via-purple-950/5 to-transparent rounded-full blur-[150px] -z-10 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 w-full mt-6 md:mt-8">
                    {user && (
                        <div className="mb-8 p-4 bg-indigo-950/40 border border-indigo-500/25 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-500/5">
                            <div className="text-center sm:text-left">
                                <p className="text-slate-200 font-medium">
                                    Welcome back, <span className="font-bold text-white">{userName}</span>!
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {hasPaid 
                                        ? "Your 14-Day Learning Mastery Bootcamp is fully unlocked." 
                                        : "Unlock your cognitive potential with our memory and speed reading training."
                                    }
                                </p>
                            </div>
                            <Link 
                                href={hasPaid ? "/bootcamp" : "/dashboard"} 
                                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white text-xs font-bold rounded-xl transition-all active:scale-[0.98] text-center flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 border border-indigo-400/20"
                            >
                                {hasPaid ? "Resume My Bootcamp" : "Go to Dashboard"}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        
                        {/* Left Column (Core Messaging) */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col justify-center">
                            <div className="space-y-5">
                                
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mx-auto lg:mx-0">
                                    <span className="text-white block">
                                        School teaches you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">what</span> to learn.
                                    </span>
                                    <span className="text-slate-300 block mt-2">
                                        We teach you <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">learning mastery.</span>
                                    </span>
                                </h1>
                                
                                <div className="space-y-4 max-w-2xl mx-auto lg:mx-0 pt-2">
                                    <p className="text-lg md:text-xl text-indigo-300 font-bold tracking-tight">
                                        Learn faster. &nbsp;&bull;&nbsp; Understand deeper. &nbsp;&bull;&nbsp; Remember longer.
                                    </p>
                                    <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
                                        Our goal is to empower you to master deep comprehension in the most efficient way. Using scientifically proven meta-learning protocols we will help you to double your reading speed, master memory retention, and turn study material into lasting expertise.
                                    </p>
                                </div>
                                
                                {/* Hero CTA button to make starting the test immediately visible above-the-fold */}
                                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                    <Link 
                                        href={user ? (hasPaid ? "/bootcamp" : "/dashboard") : "/rogue-session/start?v2=true&mode=assessment"} 
                                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.2)] border border-indigo-400/20"
                                    >
                                        {user ? (hasPaid ? "Go to My Bootcamp" : "Go to Student Dashboard") : "Start Free Masterclass"}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <div className="text-left">
                                        <span className="text-xs text-slate-500 font-medium block">
                                            {user ? "Access all your courses and tools" : "Takes 30 minutes • No signup required"}
                                        </span>
                                    </div>
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
                                        <span className="text-xs text-indigo-400 uppercase tracking-widest font-extrabold block">The Roadmap</span>
                                        <h3 className="text-lg font-bold text-white mt-1">Discover the ultimate in learning mastery in just 15-30 mins a day for 2 weeks:</h3>
                                    </div>
                                    
                                    <ul className="space-y-2 text-sm font-light text-left">
                                        <li className="flex items-start gap-2.5">
                                            <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
                                            <span className="text-slate-300">Doubling your reading speed</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
                                            <span className="text-slate-300">Discovering your personal learning style</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
                                            <span className="text-slate-300">Memory hacks of the memory champions</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
                                            <span className="text-slate-300">Scientifically proven protocols to turn you into a genius learner!</span>
                                        </li>
                                    </ul>
                                    
                                    <div className="border-t border-white/5 pt-4 space-y-4">
                                        {user ? (
                                            <div className="space-y-5 py-2">
                                                <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-3">
                                                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Logged In Account</span>
                                                    <div className="text-sm font-semibold text-white truncate">{user.email}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${hasPaid ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-purple-500 animate-pulse"}`} />
                                                        <span className="text-xs text-slate-400">
                                                            Bootcamp Status: <span className="font-bold text-slate-200">{hasPaid ? "Active / Unlocked" : "Free Preview Mode"}</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    {hasPaid ? (
                                                        <Link 
                                                            href="/bootcamp" 
                                                            className="w-full group/btn relative py-3 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 border border-indigo-400/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                                                        >
                                                            Resume 14-Day Bootcamp
                                                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <Link 
                                                                href="/bootcamp" 
                                                                className="w-full group/btn relative py-3 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 border border-indigo-400/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                                                            >
                                                                Unlock 14-Day Bootcamp ({symbol}29)
                                                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                            </Link>
                                                            <Link 
                                                                href="/dashboard" 
                                                                className="w-full group/btn relative py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 border border-white/10"
                                                            >
                                                                Go to Student Dashboard
                                                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                            </Link>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Option 1: Start For Free */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Option 1: Start For Free</span>
                                                        <span className="text-[10px] bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase">No Signup</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                                                        Start Day 1 for free by improving your reading speed in 30mins … our way of proving to you that it works.
                                                    </p>
                                                    <Link 
                                                        href="/rogue-session/start?v2=true&mode=assessment" 
                                                        className="w-full group/btn relative py-3 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 border border-indigo-400/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                                                    >
                                                        Start Free Masterclass
                                                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>

                                                {/* Option 2: Explore the 14-Day Bootcamp */}
                                                <div className="space-y-2 pt-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Option 2: 14-Day Bootcamp</span>
                                                        <span className="text-[10px] bg-purple-500/15 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase">{symbol}29</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                                                        Check out what the 14 days cover (15-30mins per day).
                                                    </p>
                                                    <Link 
                                                        href="/bootcamp" 
                                                        className="w-full group/btn relative py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center text-center gap-2 border border-white/10"
                                                    >
                                                        Explore 14-Day Bootcamp
                                                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="text-center pt-2 border-t border-white/5">
                                        <span className="text-sm font-semibold text-indigo-300 italic block">If you never try, you'll never know.</span>
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
                                We start with increasing your comfortable reading speed because it gives you immediate, tangible proof of how much you can improve in a short amount of time. Once you see that you can double your reading speed in under 30 minutes—without losing comprehension—you realize that your mind is capable of far more than you think. Because reading is the primary gateway to absorbing new knowledge, this visual acceleration upgrades the foundation of your entire learning process.
                            </p>
                            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link 
                                    href="/rogue-session/start?v2=true&mode=assessment" 
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-450 hover:to-purple-550 text-white rounded-xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.15)] border border-indigo-400/20"
                                >
                                    Start Free Masterclass
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <div className="text-left">
                                    <span className="text-xs text-slate-500 font-medium block">Takes 30 minutes • No signup required</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Interactive RSVP Speed Drill Widget */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full pt-8 lg:pt-0">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-[80px] -z-10 opacity-60 pointer-events-none animate-pulse" />
                            <InteractivePacerPreview />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Founder's Story Section */}
            <StorySection />

            {/* 4. Choose Your Path Section (Consolidated Detailed Showcase with Interactive Syllabus Drawer) */}
            <ChooseYourPath symbol={symbol} currency={currency} />

            {/* 5. Audience Self-Selection (Is this for you?) */}
            <IsThisForYouSection />

            {/* 6. The 3 Learning Bottlenecks */}
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

            {/* 7. Testimonials (Wall of Wins) */}
            <WallOfWinsSection />

            {/* 8. Famous People / High Performers (Outliers Section) */}
            <OutliersSection />
        </main>
    );
}
