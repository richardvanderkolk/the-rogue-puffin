import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getArticleVariant, getArticleExample } from '@/data/learningStyleVariants';

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPost({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const style = resolvedSearchParams.style as string;
    const example = resolvedSearchParams.example as string;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!article || article.published === false) {
        return (
            <article className="min-h-screen bg-slate-950 text-white pt-32">
                <div className="max-w-3xl mx-auto p-8 text-center">
                    <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Curriculum
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Coming Soon</h1>
                    <p className="text-slate-300">This article is currently being written.</p>
                </div>
            </article>
        );
    }

    return (
        <article className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
            <div className="max-w-3xl mx-auto p-8">
                <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Curriculum
                </Link>

                <div className="mb-8 flex items-center gap-4">
                    <span className="px-3 py-1 bg-white/5 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {article.category}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-12 leading-tight text-white">{article.title}</h1>

                <div
                    className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>

            {/* Sub-Article Variant Pop-up Modal */}
            {style && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col">
                        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-6 flex justify-between items-center z-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Your Learning Superpower</h2>
                                <p className="text-indigo-400 font-medium capitalize">{style} Edition</p>
                            </div>
                            <Link href={`/blog/${slug}`} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors" scroll={false}>
                                <X className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="p-8 md:p-12">
                            <div
                                className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-indigo-400 prose-strong:text-white"
                                dangerouslySetInnerHTML={{ __html: getArticleVariant(slug, style) }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Sub-Article Example Pop-up Modal */}
            {example && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col">
                        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-6 flex justify-between items-center z-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Learning Superpower Example</h2>
                                <p className="text-emerald-400 font-medium capitalize">{example} Style</p>
                            </div>
                            <Link href={`/blog/${slug}`} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors" scroll={false}>
                                <X className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="p-8 md:p-12">
                            <div
                                className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-emerald-400 prose-strong:text-white"
                                dangerouslySetInnerHTML={{ __html: getArticleExample(slug, example) }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
