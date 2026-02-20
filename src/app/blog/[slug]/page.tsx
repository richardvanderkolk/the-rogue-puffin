import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/data/articles';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
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
        </article>
    );
}
