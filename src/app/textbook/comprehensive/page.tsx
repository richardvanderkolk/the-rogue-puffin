import Link from "next/link";
import { PrintButton } from "@/components/ui/PrintButton";
import { BookOpen, Target, Activity, Zap } from "lucide-react";
import { ViewToggle } from "@/components/textbook/ViewToggle";
import { articles } from "@/data/articles";
import { redirect } from "next/navigation";

export const metadata = {
    title: "The Comprehensive Textbook | The Rogue Puffin",
    description: "The full, deep-dive articles for the Ready/Aim/Learn framework.",
};

const phase1Slugs = [
    "initiate-a-learning-mindset",
    "know-your-why",
    "set-your-goals",
    "the-science-of-goal-achievement",
    "raise-your-standards",
    "know-your-learning-superpower",
    "create-your-learning-lab",
    "sleep-the-ultimate-nootropic"
];

const phase2Slugs = [
    "the-80-20-rule-of-expertise",
    "slicing-the-elephant",
    "garbage-in-garbage-out",
    "the-zeigarnik-effect"
];

const phase3Slugs = [
    "feynman-technique",
    "active-recall",
    "how-to-read-faster",
    "why-re-reading-is-not-as-helpful",
    "how-to-use-ai-to-learn"
];

function getArticles(slugs: string[]) {
    return slugs.map(slug => articles.find(a => a.slug === slug)).filter(Boolean) as typeof articles;
}

export default function ComprehensiveTextbookPage() {
    const phase1Articles = getArticles(phase1Slugs);
    const phase2Articles = getArticles(phase2Slugs);
    const phase3Articles = getArticles(phase3Slugs);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans mt-20 md:mt-0 pb-32">
            {/* WEB NAVBAR */}
            <div className="print:hidden w-full bg-slate-900 border-b border-white/10 sticky top-16 md:top-0 z-40 shadow-xl">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white tracking-tight">The Comprehensive Textbook</h1>
                            <p className="text-xs text-slate-400">The Rogue Puffin Masterclass</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <Link href="/masterclass" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Back to Course
                        </Link>
                        <PrintButton />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 print:px-0 print:mx-0 print:max-w-none">
                
                <ViewToggle />

                {/* --- COVER PAGE --- */}
                <div className="print:h-[297mm] print:w-full print:flex print:flex-col print:justify-center relative bg-slate-900/40 print:bg-white rounded-3xl print:rounded-none border border-white/10 print:border-none p-12 md:p-24 mt-12 print:mt-0 overflow-hidden print:break-after-page">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 print:bg-indigo-50 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-center">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span className="text-sm font-bold text-indigo-400 uppercase tracking-[0.2em]">Comprehensive Edition</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black text-white print:text-slate-950 tracking-tighter leading-[1.1] mb-6">
                            The Deep<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 print:text-indigo-600">Mastery Text.</span>
                        </h1>
                        
                        <p className="text-xl text-slate-400 print:text-slate-600 max-w-2xl leading-relaxed mb-12 font-light">
                            The complete, unabridged compilation of all Masterclass articles, theories, and scientific deep-dives behind the Ready/Aim/Learn framework.
                        </p>
                        
                        <div className="mt-auto pt-16 border-t border-white/10 print:border-slate-200 flex justify-between items-end">
                            <div>
                                <p className="text-sm font-bold text-white print:text-slate-900 tracking-widest uppercase mb-1">The Rogue Puffin</p>
                                <p className="text-xs text-slate-500">Learning Mastery</p>
                            </div>
                            <BookOpen className="w-12 h-12 text-slate-800 print:text-slate-200" />
                        </div>
                    </div>
                </div>

                {/* Content Rendering */}
                <div className="mt-20 print:mt-0 space-y-32">
                    
                    {/* PHASE I */}
                    <div className="print:break-before-page">
                        <div className="mb-16 print:mt-16">
                            <h5 className="text-indigo-400 print:text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Phase I: Ready</h5>
                            <h1 className="text-4xl md:text-5xl font-black text-white print:text-slate-900 mt-0 mb-6">Preparing the Machine</h1>
                            <div className="w-full h-px bg-white/10 print:bg-slate-200 mb-12"></div>
                        </div>
                        <div className="space-y-32">
                            {phase1Articles.map((article) => (
                                <article key={article.slug} className="print:break-inside-avoid-page">
                                    <h2 className="text-3xl font-bold text-white print:text-slate-900 mb-8">{article.title}</h2>
                                    <div 
                                        className="prose prose-invert prose-indigo max-w-none print:prose-p:text-slate-800 print:prose-h2:text-slate-900 print:prose-h3:text-slate-900 print:prose-a:text-indigo-700 print:prose-blockquote:border-slate-300 print:prose-blockquote:text-slate-700 print:prose-strong:text-slate-900 print:prose-li:text-slate-800"
                                        dangerouslySetInnerHTML={{ __html: article.content }} 
                                    />
                                    <div className="w-16 h-1 bg-indigo-500/30 print:bg-slate-200 rounded-full mt-16"></div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* PHASE II */}
                    <div className="print:break-before-page">
                        <div className="mb-16 print:mt-16">
                            <h5 className="text-emerald-400 print:text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Phase II: Aim</h5>
                            <h1 className="text-4xl md:text-5xl font-black text-white print:text-slate-900 mt-0 mb-6">Targeting the 80/20</h1>
                            <div className="w-full h-px bg-white/10 print:bg-slate-200 mb-12"></div>
                        </div>
                        <div className="space-y-32">
                            {phase2Articles.map((article) => (
                                <article key={article.slug} className="print:break-inside-avoid-page">
                                    <h2 className="text-3xl font-bold text-white print:text-slate-900 mb-8">{article.title}</h2>
                                    <div 
                                        className="prose prose-invert prose-emerald max-w-none print:prose-p:text-slate-800 print:prose-h2:text-slate-900 print:prose-h3:text-slate-900 print:prose-a:text-emerald-700 print:prose-blockquote:border-slate-300 print:prose-blockquote:text-slate-700 print:prose-strong:text-slate-900 print:prose-li:text-slate-800"
                                        dangerouslySetInnerHTML={{ __html: article.content }} 
                                    />
                                    <div className="w-16 h-1 bg-emerald-500/30 print:bg-slate-200 rounded-full mt-16"></div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* PHASE III */}
                    <div className="print:break-before-page">
                        <div className="mb-16 print:mt-16">
                            <h5 className="text-purple-400 print:text-purple-600 font-bold tracking-widest uppercase text-sm mb-2 not-prose">Phase III: Learn</h5>
                            <h1 className="text-4xl md:text-5xl font-black text-white print:text-slate-900 mt-0 mb-6">Bypassing the Speed Limit</h1>
                            <div className="w-full h-px bg-white/10 print:bg-slate-200 mb-12"></div>
                        </div>
                        <div className="space-y-32">
                            {phase3Articles.map((article) => (
                                <article key={article.slug} className="print:break-inside-avoid-page">
                                    <h2 className="text-3xl font-bold text-white print:text-slate-900 mb-8">{article.title}</h2>
                                    <div 
                                        className="prose prose-invert prose-purple max-w-none print:prose-p:text-slate-800 print:prose-h2:text-slate-900 print:prose-h3:text-slate-900 print:prose-a:text-purple-700 print:prose-blockquote:border-slate-300 print:prose-blockquote:text-slate-700 print:prose-strong:text-slate-900 print:prose-li:text-slate-800"
                                        dangerouslySetInnerHTML={{ __html: article.content }} 
                                    />
                                    <div className="w-16 h-1 bg-purple-500/30 print:bg-slate-200 rounded-full mt-16"></div>
                                </article>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
