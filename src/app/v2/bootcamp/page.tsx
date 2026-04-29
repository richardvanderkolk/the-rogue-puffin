import Link from "next/link";
import { CheckCircle2, Lock, PlayCircle, Zap, Target, Brain, Shield, BookOpen, Clock, Activity, Database, ArrowRight } from "lucide-react";

export default function BootcampDashboard() {
    
    // Status can be: 'completed', 'unlocked', 'locked'
    const days = [
        { day: 1, title: "Break the Voice", desc: "The Subvocalization Drill", icon: <Zap className="w-5 h-5" />, status: "completed", link: "/rogue-session/results" },
        { day: 2, title: "The 'Why' Vector", desc: "Setting the cognitive target", icon: <Target className="w-5 h-5" />, status: "unlocked", link: "#" },
        { day: 3, title: "Your Superpower", desc: "Diagnosing your learning style", icon: <Brain className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 4, title: "The Laboratory", desc: "Setting a distraction-free environment", icon: <Shield className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 5, title: "Slicing the Elephant", desc: "The 80/20 Rule of Deconstruction", icon: <Activity className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 6, title: "Preview the Landscape", desc: "Structural scanning techniques", icon: <BookOpen className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 7, title: "Feynman Brain Dump", desc: "Closing the source material", icon: <Brain className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 8, title: "Active Recall", desc: "Building the spaced repetition system", icon: <Clock className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 9, title: "The Memory Palace", desc: "Spatial memory mapping drill", icon: <Database className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 10, title: "The Zeigarnik Effect", desc: "Optimizing study blocks", icon: <Activity className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 11, title: "Speed Maintenance", desc: "Peripheral vision expansion drill", icon: <Zap className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 12, title: "Memory Maintenance", desc: "Advanced peg system drill", icon: <Database className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 13, title: "AI as a Tutor", desc: "Prompting for deep learning", icon: <Brain className="w-5 h-5" />, status: "locked", link: "#" },
        { day: 14, title: "The 4 Stages", desc: "Graduation and mastery", icon: <Target className="w-5 h-5" />, status: "locked", link: "#" },
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
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">You're already on your way.</h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed">
                                Congratulations. Your reading speed has officially doubled. You have 13 days left to completely rewire your memory, focus, and retention.
                            </p>
                        </div>
                        
                        <div className="w-full md:w-64 bg-slate-950 border border-white/10 rounded-2xl p-6 shrink-0">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-3xl font-black text-white">{completedDays}<span className="text-slate-500 text-xl font-medium">/{totalDays}</span></span>
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
                                badge = <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-emerald-400">Done</span>;
                            } else if (day.status === "unlocked") {
                                containerStyle = "bg-slate-900 border border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:bg-slate-800 transition-all cursor-pointer transform hover:-translate-y-1";
                                iconBoxStyle = "bg-purple-500/20 text-purple-400";
                                actionIcon = <PlayCircle className="w-6 h-6 text-purple-400" />;
                                badge = <span className="absolute top-4 right-4 px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold uppercase tracking-widest">Up Next</span>;
                            }

                            const CardWrapper = day.status === "unlocked" || day.status === "completed" ? Link : "div";

                            return (
                                <CardWrapper 
                                    href={day.link} 
                                    key={day.day} 
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
                                        <span className={`text-xs font-medium ${day.status === "unlocked" ? "text-purple-400" : "text-slate-500"}`}>
                                            {day.status === "completed" ? "Review material" : day.status === "unlocked" ? "Start module" : "Locked"}
                                        </span>
                                        {actionIcon}
                                    </div>
                                </CardWrapper>
                            );
                        })}
                    </div>
                </section>

            </div>
        </main>
    );
}
