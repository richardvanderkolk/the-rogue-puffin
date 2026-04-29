import Link from "next/link";
import { AdminBypassLink } from "@/components/AdminBypassLink";
import { CheckCircle2, Lock, PlayCircle, Zap, Target, Brain, Shield, BookOpen, Clock, Activity, Database, ArrowRight, ArrowDown } from "lucide-react";
import { headers } from "next/headers";
import { getCurrencyInfo } from "@/lib/currency";

export default async function BootcampDashboard(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country');
    const { symbol } = getCurrencyInfo(country);
    const searchParams = await props.searchParams;
    const isUnlocked = searchParams.unlocked === 'true';
    
    // Status can be: 'completed', 'unlocked', 'locked', 'available'
    const days = [
        { day: 1, title: "Discover Reading Possibilities", desc: "The Subvocalization Drill", icon: <Zap className="w-5 h-5" />, status: "completed", link: "/rogue-session/start?v2=true" },
        { day: 2, title: "Discover Your Personal Superpower", desc: "Diagnosing your learning style", icon: <Brain className="w-5 h-5" />, status: isUnlocked ? "completed" : "unlocked", link: isUnlocked ? "/rogue-superpower-session/start?course=bootcamp" : "/api/checkout?productId=bootcamp" },
        { day: 3, title: "Memory Training", desc: "The foundational memory protocols", icon: <Target className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/rogue-memory-session/start?course=bootcamp" },
        { day: 4, title: "Know Your Why", desc: "Setting your foundation & peripheral vision", icon: <Brain className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/rogue-day-4/start?course=bootcamp" },
        { day: 5, title: "A Learning Mindset", desc: "The psychological foundation & kinetic words", icon: <Brain className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/rogue-day-5/start?course=bootcamp" },
        { day: 6, title: "Feel Sharp", desc: "The physical foundation & speed expansion", icon: <Activity className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/rogue-day-6/start?course=bootcamp" },
        { day: 7, title: "Feynman Brain Dump", desc: "Closing the source material", icon: <Brain className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/feynman-technique?course=bootcamp" },
        { day: 8, title: "Active Recall", desc: "Building the spaced repetition system", icon: <Clock className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/active-recall?course=bootcamp" },
        { day: 9, title: "The Memory Palace", desc: "Spatial memory mapping drill", icon: <Database className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/engaging-your-imagination?course=bootcamp" },
        { day: 10, title: "The Zeigarnik Effect", desc: "Optimizing study blocks", icon: <Activity className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/the-zeigarnik-effect?course=bootcamp" },
        { day: 11, title: "Speed Maintenance", desc: "Peripheral vision expansion drill", icon: <Zap className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/how-to-read-faster?course=bootcamp" },
        { day: 12, title: "Memory Maintenance", desc: "Advanced peg system drill", icon: <Database className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/the-art-of-review?course=bootcamp" },
        { day: 13, title: "AI as a Tutor", desc: "Prompting for deep learning", icon: <Brain className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/how-to-use-ai-to-learn?course=bootcamp" },
        { day: 14, title: "The 4 Stages", desc: "Graduation and mastery", icon: <Target className="w-5 h-5" />, status: isUnlocked ? "available" : "locked", link: "/blog/the-4-stages-of-learning?course=bootcamp" },
    ];

    const completedDays = days.filter(d => d.status === "completed").length;
    const totalDays = days.length;
    const progressPercentage = (completedDays / totalDays) * 100;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32">
            
            {/* Header / Navbar area */}
            <div className="w-full bg-slate-900 border-b border-white/5 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                            <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white tracking-tight">Bootcamp Dashboard</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/v2" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12 space-y-16">
                
                {/* Progress Section */}
                <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                <CheckCircle2 className="w-3 h-3" /> Day 1 Completed
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Day {isUnlocked ? "2" : "1"} of Your 14 Day Boot Camp is completed.</h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed">
                                Congratulations! You have discovered {isUnlocked ? "your unique learning superpower. You now have full access to all remaining modules in the bootcamp. Dive into Memory Training next!" : `that you are able to read faster. During the rest of this bootcamp you will embed this new speed as your new habit, discover your personal learning superpower, memory skills that will blow your mind and much more for just ${symbol}29.`}
                            </p>
                        </div>
                        
                        <div className="w-full md:w-64 bg-slate-950 border border-white/10 rounded-2xl p-6 shrink-0">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-3xl font-black text-white">{completedDays}/{totalDays}</span>
                                <span className="text-sm font-bold text-purple-400 tracking-widest uppercase">Days</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* The 14-Day Roadmap */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white tracking-tight">The Execution Plan</h3>
                        <span className="text-sm font-medium text-slate-500">14 Daily Modules</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {days.map((day) => {
                            
                            // Determine styles based on status
                            let containerStyle = "bg-slate-900 border border-white/5 opacity-50 select-none grayscale";
                            let iconBoxStyle = "bg-slate-800 text-slate-500";
                            let actionIcon = <Lock className="w-5 h-5 text-slate-600" />;
                            let badge = null;

                            if (day.status === "completed") {
                                containerStyle = "bg-slate-900/60 border border-emerald-500/30 hover:bg-slate-900 transition-colors";
                                iconBoxStyle = "bg-emerald-500/20 text-emerald-400";
                                actionIcon = <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
                                badge = <span className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">Completed</span>;
                            } else if (day.status === "available") {
                                containerStyle = "bg-slate-900/60 border border-indigo-500/30 hover:bg-slate-800 transition-colors cursor-pointer transform hover:-translate-y-1 shadow-lg shadow-indigo-900/10";
                                iconBoxStyle = "bg-indigo-500/20 text-indigo-400";
                                actionIcon = <ArrowRight className="w-5 h-5 text-indigo-400" />;
                                badge = <span className="absolute top-4 right-4 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30">Available</span>;
                            } else if (day.status === "unlocked") {
                                containerStyle = "bg-slate-900 border border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:bg-slate-800 transition-all cursor-pointer transform hover:-translate-y-1";
                                iconBoxStyle = "bg-purple-500/20 text-purple-400";
                                actionIcon = <Lock className="w-5 h-5 text-purple-400" />;
                                badge = <span className="absolute top-4 right-4 px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold uppercase tracking-widest border border-purple-500/30">Unlock Required</span>;
                            }

                            const CardWrapper = day.day === 2 ? AdminBypassLink : Link;

                            return (
                                <div key={day.day} className={`relative flex flex-col h-full ${day.day === 2 ? 'mt-8 md:mt-0' : ''}`}>
                                    {day.day === 2 && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10 w-full pointer-events-none">
                                            <span className="text-purple-400 font-bold text-[10px] md:text-xs uppercase tracking-widest text-center mb-1 drop-shadow-md">Click here to continue your 14 day boot camp</span>
                                            <ArrowDown className="w-4 h-4 text-purple-400 drop-shadow-md" />
                                        </div>
                                    )}
                                    <CardWrapper 
                                        href={day.link} 
                                        bypassHref={day.day === 2 ? "/rogue-superpower-session/start?course=bootcamp" : undefined}
                                        className={`relative rounded-3xl p-6 flex flex-col h-full ${containerStyle}`}
                                    >
                                        {badge}
                                        
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBoxStyle}`}>
                                                {day.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Day {day.day}</div>
                                                <h4 className={`text-lg font-bold leading-tight ${day.status === "locked" ? "text-slate-400" : "text-white"}`}>{day.title}</h4>
                                            </div>
                                        </div>
                                        
                                        <p className={`text-sm font-light leading-relaxed flex-grow mb-6 ${day.status === "locked" ? "text-slate-500" : "text-slate-400"}`}>
                                            {day.desc}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className={`text-xs font-bold uppercase tracking-widest ${day.status === "unlocked" ? "text-purple-400" : day.status === "available" ? "text-indigo-400" : "text-slate-500"}`}>
                                                {day.status === "completed" ? "Review material" : day.status === "available" ? "Start Module" : day.status === "unlocked" ? `Unlock Days 2-14 for ${symbol}29` : "Locked"}
                                            </span>
                                            {actionIcon}
                                        </div>
                                    </CardWrapper>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </div>
        </main>
    );
}
