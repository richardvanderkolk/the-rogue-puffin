import Link from "next/link";
import { ArrowRight, Zap, Database, Brain, Rocket, ShieldCheck, CheckCircle2, BookOpen, Target, Clock, Activity } from "lucide-react";
import { headers } from "next/headers";
import { getCurrencyInfo } from "@/lib/currency";
import { articles } from "@/data/articles";

export const metadata = {
    title: "The Complete Masterclass | The Rogue Puffin",
    description: "Read 2x Faster. Remember Everything. The ultimate learning bundle.",
};

export default async function MasterclassPage() {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country');
    const { symbol } = getCurrencyInfo(country);

    const articleMap = Object.fromEntries(articles.map(a => [a.slug, a]));

    const curatedGroups = [
        {
            title: "Phase I: Ready",
            description: "Prepare your mind, environment, and biology for extreme focus.",
            color: "indigo",
            icon: <Target className="w-6 h-6 text-indigo-400" />,
            subsections: [
                {
                    subtitle: "Foundations",
                    slugs: ["know-your-why", "set-your-goals", "feel-sharp"]
                },
                {
                    subtitle: "Creating The Best Environment",
                    slugs: ["create-your-learning-lab", "your-social-circle"]
                },
                {
                    subtitle: "Know Yourself",
                    slugs: ["know-your-learning-superpower"]
                }
            ]
        },
        {
            title: "Phase II: Aim",
            description: "Deconstruct the subject matter and define your exact target.",
            color: "emerald",
            icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
            subsections: [
                {
                    subtitle: "Focus",
                    slugs: ["the-80-20-rule-of-expertise", "52-books-a-year"]
                },
                {
                    subtitle: "Curate Your Inputs",
                    slugs: ["garbage-in-garbage-out"]
                },
                {
                    subtitle: "Build Your Strategy",
                    slugs: ["psychology-of-time-and-deadlines", "cramming-to-compounding", "slicing-the-elephant"]
                }
            ]
        },
        {
            title: "Phase III: Learn",
            description: "Ingest, comprehend, and permanently memorize the information.",
            color: "purple",
            icon: <Zap className="w-6 h-6 text-purple-400" />,
            subsections: [
                {
                    subtitle: "Get Started",
                    slugs: ["friction-of-starting"]
                },
                {
                    subtitle: "Prime Your Mind",
                    slugs: ["initiate-a-learning-mindset", "preview-the-material"]
                },
                {
                    subtitle: "Faster Reading",
                    items: [
                        { title: "The Rogue Reading Session", href: "/rogue-session/start?course=masterclass" }
                    ]
                },
                {
                    subtitle: "Increased Comprehension",
                    slugs: ["genius-comprehension", "genius-note-taking", "active-recall", "feynman-technique"]
                },
                {
                    subtitle: "Memory Training",
                    items: [
                        { title: "The Rogue Memory Session", href: "/rogue-memory-session?course=masterclass" }
                    ]
                }
            ]
        }
    ];

    const curatedSlugs = new Set(
        curatedGroups.flatMap(g => g.subsections.flatMap(s => s.slugs || []))
    );

    const bonusArticles = articles.filter(a => !curatedSlugs.has(a.slug) && a.published !== false);
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-32 px-4 md:px-8">
            <div className="max-w-[80rem] mx-auto min-h-[calc(100vh-10rem)] flex flex-col justify-center">

                {/* THE $75 FLAGSHIP BUNDLE */}
                <div className="flex flex-col xl:flex-row bg-slate-900/40 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-indigo-500/30 shadow-[0_0_80px_rgba(99,102,241,0.15)] relative">
                    
                    {/* Fused Image Left Panel */}
                    <div className="w-full xl:w-5/12 relative min-h-[450px] xl:min-h-full overflow-hidden group flex flex-col items-center justify-center p-8">
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-40 mix-blend-overlay"
                            style={{ backgroundImage: "url('/images/masterclass-hero.png')" }}
                        />
                        
                        {/* Top Badge */}
                        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 pointer-events-none">
                            <span className="px-5 py-2 text-[10px] font-black tracking-widest text-indigo-300 uppercase bg-indigo-950/40 backdrop-blur-md rounded-full border border-indigo-500/30 flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                                <Rocket className="w-3.5 h-3.5" /> Premium Bundle
                            </span>
                        </div>

                        {/* Visual Bundle Representation */}
                        <div className="relative z-20 w-full max-w-sm mt-12 grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-2xl bg-indigo-900/50 border border-indigo-500/30 flex flex-col items-center justify-center text-center p-4 shadow-xl backdrop-blur-md">
                                <Zap className="w-8 h-8 text-indigo-400 mb-2" />
                                <span className="text-xs font-bold text-white leading-tight">14-Day Reading Engine</span>
                            </div>
                            <div className="aspect-square rounded-2xl bg-purple-900/50 border border-purple-500/30 flex flex-col items-center justify-center text-center p-4 shadow-xl backdrop-blur-md translate-y-6">
                                <Database className="w-8 h-8 text-purple-400 mb-2" />
                                <span className="text-xs font-bold text-white leading-tight">Advanced Memory Protocol</span>
                            </div>
                            <div className="aspect-square rounded-2xl bg-emerald-900/50 border border-emerald-500/30 flex flex-col items-center justify-center text-center p-4 shadow-xl backdrop-blur-md col-span-2 mt-2 w-3/4 mx-auto">
                                <BookOpen className="w-8 h-8 text-emerald-400 mb-2" />
                                <span className="text-xs font-bold text-white leading-tight">Digital Masterclass Textbook</span>
                            </div>
                        </div>
                    </div>

                    {/* Fused Content Right Panel */}
                    <div className="w-full xl:w-7/12 p-8 md:p-12 xl:p-16 flex flex-col justify-center bg-slate-900 border-l border-white/5 relative z-10">
                        
                        <div className="space-y-4 mb-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                The Complete <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Masterclass Bundle</span>
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed max-w-xl font-light">
                                Unlock the entire Rogue Puffin ecosystem. Combines our premium interactive tracking software with the complete digital framework textbook.
                            </p>
                        </div>

                        {/* Features Checklist */}
                        <ul className="space-y-4 mb-10">
                            {[
                                "Full 14-Day Fast Reading Bootcamp Software",
                                "The Complete Memory Simulator Suite",
                                "Digital Textbook: The Ready/Aim/Learn Syllabus",
                                "Lifetime Access & Future Updates"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <span className="text-slate-200 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Action Area */}
                        <div className="bg-slate-950 p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-inner">
                            <div className="flex flex-col">
                                <span className="text-slate-500 font-medium line-through text-sm">{symbol}147.00 value</span>
                                <span className="text-4xl font-black text-white">{symbol}75.00</span>
                            </div>
                            <Link 
                                href="/api/checkout?productId=complete_masterclass_bundle" 
                                className="w-full sm:w-auto px-8 py-4 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-400 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
                            >
                                Unlock The Ecosystem <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* CURRICULUM OVERVIEW */}
                <div className="mt-32 pt-20 border-t border-white/5">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">The Complete Ready/Aim/Learn Curriculum</h2>
                        <p className="text-slate-400">The curated, step-by-step masterclass framework.</p>
                    </div>

                    <div className="space-y-16 relative max-w-5xl mx-auto">
                        {curatedGroups.map((group, i) => {
                            const colorMap: Record<string, { bg: string, text: string, border: string }> = {
                                indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
                                emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
                                purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
                            };
                            const c = colorMap[group.color];

                            return (
                                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.2)]">
                                    {/* Background glow */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 ${c.bg} blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none`} />
                                    
                                    <div className="flex items-center gap-4 mb-4 relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
                                            {group.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white tracking-tight">{group.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-lg mb-10 relative z-10 border-b border-white/5 pb-8">{group.description}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
                                        {group.subsections.map((sub, j) => (
                                            <div key={j}>
                                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 border-l-2 border-indigo-500/30 pl-3">
                                                    {sub.subtitle}
                                                </h4>
                                                <div className="space-y-2">
                                                    {(sub.slugs || []).map(slug => {
                                                        const article = articleMap[slug];
                                                        if (!article) return null;
                                                        return (
                                                            <Link href={`/blog/${article.slug}?course=masterclass`} key={slug} className="flex items-start gap-3 group p-2 -ml-2 rounded-lg hover:bg-white/5 transition-all">
                                                                <div className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                                                                    <CheckCircle2 className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                                                </div>
                                                                <span className="text-slate-300 font-medium group-hover:text-white transition-colors leading-snug">
                                                                    {article.title}
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                    {(sub.items || []).map(item => (
                                                        <Link href={item.href} key={item.title} className="flex items-start gap-3 group p-2 -ml-2 rounded-lg hover:bg-white/5 transition-all">
                                                            <div className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                                                                <CheckCircle2 className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                                            </div>
                                                            <span className="text-slate-300 font-medium group-hover:text-white transition-colors leading-snug">
                                                                {item.title}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* BONUS LIBRARY */}
                <div className="mt-32 pt-20 border-t border-white/5">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">The Bonus Library</h2>
                        <p className="text-slate-400">Additional advanced models and continuous learning materials.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                        {bonusArticles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}?course=masterclass`}
                                className="group flex flex-col p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)]"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow font-light line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-indigo-400 text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ALA CARTE TRIPWIRES */}
                <div className="mt-32 pt-20 border-t border-white/5">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Prefer to test the waters?</h2>
                        <p className="text-slate-400">Try our introductory 30-minute interactive simulators a la carte.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        
                        {/* Reading Tripwire */}
                        <div className="group bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-indigo-500/30 hover:bg-slate-900 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-all">
                                <Zap className="w-7 h-7 text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The Setup: Reading Drill</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                A 30-minute interactive diagnostic mechanism guaranteed to break your physical reading plateau.
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-lg font-bold text-indigo-300">{symbol}5.00</span>
                                <Link href="/rogue-session/start" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white text-indigo-400 transition-all">
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Memory Tripwire */}
                        <div className="group bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/30 hover:bg-slate-900 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-all">
                                <Database className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">The Setup: Memory Drill</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Experience the exact visualization routines used by memory champions in this 30-minute simulator.
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-lg font-bold text-purple-300">{symbol}5.00</span>
                                <Link href="/rogue-memory-session" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white text-purple-400 transition-all">
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* CALL TO ACTION FOR ABRIDGED */}
                <div className="mt-32 pt-20 border-t border-white/5 text-center">
                    <p className="text-slate-400 mb-6 font-medium">Not ready to invest yet?</p>
                    <Link href="/abridged" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all active:scale-95">
                        <Brain className="w-5 h-5 text-indigo-400" />
                        Take the Free Abridged Masterclass
                    </Link>
                </div>

            </div>
        </main>
    );
}
