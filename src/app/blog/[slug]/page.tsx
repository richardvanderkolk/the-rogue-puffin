import { ViewTracker } from '@/components/ViewTracker';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getArticleVariant, getArticleExample } from '@/data/learningStyleVariants';
import { LeadCapture } from '@/components/LeadCapture';
import { PrintButton } from '@/components/ui/PrintButton';
import { SuperpowerQuiz } from '@/components/blog/SuperpowerQuiz';
import { ArticleRenderer } from '@/components/blog/ArticleRenderer';
import type { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: article } = await supabase
        .from('articles')
        .select('title, excerpt')
        .eq('slug', slug)
        .single();
    
    if (!article) {
        return {
            title: 'Article Not Found | The Rogue Puffin'
        };
    }

    return {
        title: `${article.title} | The Rogue Puffin`,
        description: article.excerpt,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: `${article.title} | The Rogue Puffin`,
            description: article.excerpt,
            siteName: 'The Rogue Puffin',
            type: 'article',
        }
    }
}

export const revalidate = 3600;

export async function generateStaticParams() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: articles } = await supabase
        .from('articles')
        .select('slug')
        .eq('published', true);

    return (articles || []).map((article) => ({
        slug: article.slug,
    }));
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
        
    const course = resolvedSearchParams.course as string;
    const isBootcamp = course === 'bootcamp';

    let finalContent = article?.content || '';

    if (isBootcamp && article) {
        // Strip out the hardcoded 'Continue Your Journey' HTML from the database
        finalContent = finalContent.replace(/<hr class="border-slate-800 my-16" \/>[\s\S]*$/, '');
    }

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
        <article className="min-h-screen bg-slate-950 text-white pt-24 pb-20 print:bg-white print:text-black print:pt-0 print:pb-0">
            {/* SEO JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: article.title,
                        description: article.description || "Learn faster, think clearer, and retain more with The Rogue Puffin.",
                        datePublished: article.created_at,
                        dateModified: article.updated_at || article.created_at,
                        author: {
                            "@type": "Organization",
                            name: "The Rogue Puffin",
                            url: process.env.NEXT_PUBLIC_SITE_URL || "https://theroguepuffin.vercel.app"
                        }
                    })
                }}
            />
            <ViewTracker path={`/blog/${slug}`} title={article.title} category="Article" />
            
            {/* --- PRINT ONLY HEADER --- */}
            <div className="hidden print:block text-center border-b border-slate-200 pb-8 mb-8 pt-8">
                <div className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-4">The Rogue Puffin • Learning Mastery</div>
                <h1 className="text-4xl font-black text-black leading-tight max-w-2xl mx-auto">{article.title}</h1>
            </div>

            <div className="max-w-3xl mx-auto p-8 print:p-0">
                <div className="flex justify-between items-start mb-12 print:hidden">
                    <Link href={isBootcamp ? "/bootcamp" : "/blog"} className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Course
                    </Link>
                    <PrintButton />
                </div>

                <div className="mb-8 flex items-center gap-4 print:hidden">
                    <span className="px-3 py-1 bg-white/5 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {article.category}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-12 leading-tight text-white print:hidden">{article.title}</h1>

                <ArticleRenderer 
                    content={finalContent} 
                    isPremium={slug !== 'know-your-why'}
                    articleSlug={slug}
                />

                {slug === 'know-your-learning-superpower' && (
                    <div className="mt-16 print:hidden">
                        <SuperpowerQuiz />
                    </div>
                )}

                {/* DYNAMIC BOOTCAMP NAVIGATION */}
                {isBootcamp && (
                    <div className="mt-16 pt-16 border-t border-slate-800 print:hidden">
                        <h3 className="text-xl font-bold text-white mb-6">Continue Your Boot Camp</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href="/bootcamp" className="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900 transition-all group">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Next Step</p>
                                <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Return to Dashboard <span className="text-purple-500 ml-1">→</span></h4>
                            </Link>
                        </div>
                    </div>
                )}

                {/* EMAIL LEAD CAPTURE SECTION */}
                <div className="print:hidden mt-20">
                    <LeadCapture />
                </div>
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
