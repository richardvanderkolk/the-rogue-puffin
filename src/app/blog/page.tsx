import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Archive | The Rogue Puffin",
    description: "Strategies to learn faster, think clearer, and retain more.",
    alternates: {
        canonical: "/blog",
    },
};

export const revalidate = 3600;

export default async function BlogPage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (!articles) return <div className="text-white text-center pt-32 min-h-screen bg-slate-950">Preparing content...</div>;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto min-h-screen">

                <div className="mb-12 border-b-2 border-slate-800/50 pb-8 pt-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">The Archive</h1>
                    <p className="text-slate-400 text-lg">Every strategy, framework, and mental model for extreme cognitive performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {articles
                        .filter((article) => article.published !== false)
                        .map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className="group flex flex-col p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)]"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
                                    {article.title}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow font-light line-clamp-4">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-indigo-400 text-xs font-bold uppercase tracking-wider gap-2 mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                </div>

            </div>
        </main>
    );
}
