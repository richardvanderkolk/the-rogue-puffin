import Link from "next/link";
import { ArrowRight, Brain, Zap, Target, BookOpen, Clock, Activity } from "lucide-react";
import { headers } from "next/headers";
import { getCurrencyInfo } from "@/lib/currency";

export const metadata = {
    title: "Abridged Masterclass | The Rogue Puffin",
    description: "The 6-Step Foundation to Learning Like a Genius.",
};

export default async function AbridgedMasterclassPage() {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country');
    const { symbol } = getCurrencyInfo(country);

    const steps = [
        {
            title: "Define the 'Why' Vector",
            description: "Reading for deep expertise requires drastically different ingestion than reading for broad familiarity. You must define this before opening the book.",
            icon: <Target className="w-6 h-6 text-indigo-400" />,
            phase: "PHASE I: READY",
            color: "indigo",
            href: "/blog/know-your-why?course=abridged"
        },
        {
            title: "Know Your \"Superpower\"",
            description: "Do not force a visual method if your brain favors spatial logic or debate. Aligning your study inputs with your strongest sensory pathway reduces friction.",
            icon: <Brain className="w-6 h-6 text-indigo-400" />,
            phase: "PHASE I: READY",
            color: "indigo",
            href: "/blog/know-your-learning-superpower?course=abridged"
        },
        {
            title: "Preview the Landscape",
            description: "You do not build a puzzle by picking up piece #1 and staring at it. Look at the box. Scan headings, indexes, and bold terms to find the structural 80/20.",
            icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
            phase: "PHASE II: AIM",
            color: "emerald",
            href: "/blog/preview-the-material?course=abridged"
        },
        {
            title: "Rapid Ingestion",
            description: "Consume visually. Subvocalization artificially caps your speed at ~250 WPM. Use a visual pacer to force the brain into intake-mode.",
            icon: <Zap className="w-6 h-6 text-purple-400" />,
            phase: "PHASE III: LEARN",
            color: "purple",
            href: "/rogue-session/start?course=abridged"
        },
        {
            title: "The Feynman Brain Dump",
            description: "Close the source material. Attempt to verbally explain what you just ingested as if teaching a child. Where you stumble is exactly where your gap exists.",
            icon: <Activity className="w-6 h-6 text-purple-400" />,
            phase: "PHASE III: LEARN",
            color: "purple",
            href: "/blog/feynman-technique?course=abridged"
        },
        {
            title: "Spaced Active Recall",
            description: "Rereading creates the 'Illusion of Competence.' True memory formation requires the physical struggle of pulling the answer from memory 1, 3, and 7 days later.",
            icon: <Clock className="w-6 h-6 text-purple-400" />,
            phase: "PHASE III: LEARN",
            color: "purple",
            href: "/blog/active-recall?course=abridged"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-20">
                
                {/* Header */}
                <div className="text-center space-y-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                        Free Foundation
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                        The Abridged <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Masterclass</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        The 6 core mechanics of neuroplasticity. Master these steps before attempting the advanced reading and memory drills.
                    </p>
                </div>

                {/* The 6 Steps */}
                <div className="space-y-6 relative">
                    {/* Visual Timeline Line */}
                    <div className="absolute left-6 md:left-[3.25rem] top-8 bottom-8 w-px bg-white/10 hidden md:block" />

                    {steps.map((step, i) => {
                        const colorMap: Record<string, { bgText: string, bg: string, text: string, border: string, shadow: string }> = {
                            indigo: { bgText: 'bg-indigo-500/10 text-indigo-400', bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', shadow: 'shadow-indigo-500/10' },
                            emerald: { bgText: 'bg-emerald-500/10 text-emerald-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', shadow: 'shadow-emerald-500/10' },
                            purple: { bgText: 'bg-purple-500/10 text-purple-400', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', shadow: 'shadow-purple-500/10' },
                        };
                        const c = colorMap[step.color] || colorMap.indigo;

                        return (
                        <Link href={step.href} key={i} className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-slate-900 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 group outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
                            
                            {/* Number & Icon Badge */}
                            <div className="relative z-10 flex shrink-0 items-center justify-between md:flex-col md:w-20 gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-lg ${c.shadow}`}>
                                    <span className="text-white font-black text-xl">{i + 1}</span>
                                </div>
                                <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-950 border border-white/10 items-center justify-center text-slate-500">
                                    {step.icon}
                                </div>
                                <span className={`md:hidden px-3 py-1 rounded-full ${c.bgText} text-[10px] font-bold uppercase tracking-widest border ${c.border}`}>
                                    {step.phase}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <span className={`hidden md:inline-block px-3 py-1 rounded-full ${c.bgText} text-[10px] font-bold uppercase tracking-widest border ${c.border} mb-2`}>
                                    {step.phase}
                                </span>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">{step.title}</h3>
                                    <ArrowRight className="w-5 h-5 text-slate-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-indigo-400 transition-all duration-300" />
                                </div>
                                <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">
                                    {step.description}
                                </p>
                            </div>

                        </Link>
                    )})}
                </div>

                {/* Upsell to interactive engines (The "Next Step") */}
                <div className="pt-16 border-t border-white/5">
                    <div className="bg-gradient-to-br from-slate-900 mx-auto rounded-[3rem] p-8 md:p-12 border border-white/10 relative overflow-hidden shadow-2xl text-center">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Theory is not enough.</h2>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto font-light leading-relaxed">
                                You now understand the mechanics. But to actually read 2x faster, you must physically break your biological plateau. It takes exactly 30 minutes in our interactive simulator.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Link href="/rogue-session/start" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                                    Start The Fast Reading Drill <ArrowRight className="w-4 h-4" />
                                </Link>
                                <span className="text-slate-500 font-bold text-sm">Just {symbol}5.00</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
