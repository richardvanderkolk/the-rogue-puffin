import { ViewTracker } from '@/components/ViewTracker';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getArticleVariant, getArticleExample } from '@/data/learningStyleVariants';
import { LeadCapture } from '@/components/LeadCapture';
import { PrintButton } from '@/components/ui/PrintButton';
import { SuperpowerQuiz } from '@/components/blog/SuperpowerQuiz';
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
        openGraph: {
            title: `${article.title} | The Rogue Puffin`,
            description: article.excerpt,
            siteName: 'The Rogue Puffin',
            type: 'article',
        }
    }
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
    const isAbridged = course === 'abridged';
    const isBootcamp = course === 'bootcamp';

    let finalContent = article?.content || '';
    let nextAbridgedLink = null;
    let nextAbridgedTitle = null;
    let nextBootcampLink = null;
    let nextBootcampTitle = null;

    if (isAbridged && article) {
        // Strip out the hardcoded 'Continue Your Journey' HTML from the database
        finalContent = finalContent.replace(/<hr class="border-slate-800 my-16" \/>[\s\S]*$/, '');
        
        const abridgedSequence = [
            "/blog/know-your-why",
            "/blog/know-your-learning-superpower",
            "/blog/preview-the-material",
            "/rogue-session/start",
            "/blog/feynman-technique",
            "/blog/active-recall"
        ];
        
        const titles = [
            "Define the 'Why' Vector",
            "Know Your \"Superpower\"",
            "Preview the Landscape",
            "Rapid Ingestion",
            "The Feynman Brain Dump",
            "Spaced Active Recall"
        ];

        const currentPath = `/blog/${slug}`;
        const currentIndex = abridgedSequence.indexOf(currentPath);
        
        if (currentIndex !== -1 && currentIndex < abridgedSequence.length - 1) {
            nextAbridgedLink = abridgedSequence[currentIndex + 1] + "?course=abridged";
            nextAbridgedTitle = titles[currentIndex + 1];
        }
    }

    if (isBootcamp && article) {
        // Strip out the hardcoded 'Continue Your Journey' HTML from the database
        finalContent = finalContent.replace(/<hr class="border-slate-800 my-16" \/>[\s\S]*$/, '');

        const bootcampSequence = [
            "/rogue-session/start",
            "/blog/know-your-learning-superpower",
            "/rogue-memory-session",
            "/blog/create-your-learning-lab",
            "/blog/slicing-the-elephant",
            "/blog/preview-the-material",
            "/blog/feynman-technique",
            "/blog/active-recall",
            "/blog/engaging-your-imagination",
            "/blog/the-zeigarnik-effect",
            "/blog/how-to-read-faster",
            "/blog/the-art-of-review",
            "/blog/how-to-use-ai-to-learn",
            "/blog/the-4-stages-of-learning"
        ];

        const bootcampTitles = [
            "Discover Reading Possibilities",
            "Discover Your Personal Superpower",
            "Memory Training",
            "The Laboratory",
            "Slicing the Elephant",
            "Preview the Landscape",
            "Feynman Brain Dump",
            "Active Recall",
            "The Memory Palace",
            "The Zeigarnik Effect",
            "Speed Maintenance",
            "Memory Maintenance",
            "AI as a Tutor",
            "The 4 Stages"
        ];

        const currentPath = `/blog/${slug}`;
        const currentIndex = bootcampSequence.indexOf(currentPath);
        
        if (currentIndex !== -1 && currentIndex < bootcampSequence.length - 1) {
            nextBootcampLink = bootcampSequence[currentIndex + 1] + "?course=bootcamp";
            nextBootcampTitle = bootcampTitles[currentIndex + 1];
        }
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
            <ViewTracker path={`/blog/${slug}`} title={article.title} category="Article" />
            
            {/* --- PRINT ONLY HEADER --- */}
            <div className="hidden print:block text-center border-b border-slate-200 pb-8 mb-8 pt-8">
                <div className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-4">The Rogue Puffin • Learning Mastery</div>
                <h1 className="text-4xl font-black text-black leading-tight max-w-2xl mx-auto">{article.title}</h1>
            </div>

            <div className="max-w-3xl mx-auto p-8 print:p-0">
                <div className="flex justify-between items-start mb-12 print:hidden">
                    <Link href={isAbridged ? "/abridged" : "/blog"} className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
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

                <div
                    className="prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white print:prose-headings:text-black print:prose-p:text-slate-800 print:text-slate-800 print:prose-strong:text-black print:prose-li:text-slate-800 print:prose-a:text-indigo-600 print:max-w-none print:prose-blockquote:border-slate-300 print:prose-blockquote:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: finalContent }}
                />

                {slug === 'know-your-learning-superpower' && (
                    <div className="mt-16 print:hidden">
                        <SuperpowerQuiz />
                    </div>
                )}

                {/* DYNAMIC ABRIDGED NAVIGATION */}
                {isAbridged && nextAbridgedLink && (
                    <div className="mt-16 pt-16 border-t border-slate-800 print:hidden">
                        <h3 className="text-xl font-bold text-white mb-6">Continue Your Abridged Course</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href={nextAbridgedLink} className="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900 transition-all group">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Next Step</p>
                                <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{nextAbridgedTitle} <span className="text-indigo-500 ml-1">→</span></h4>
                            </Link>
                        </div>
                    </div>
                )}

                {/* DYNAMIC BOOTCAMP NAVIGATION */}
                {isBootcamp && nextBootcampLink && (
                    <div className="mt-16 pt-16 border-t border-slate-800 print:hidden">
                        <h3 className="text-xl font-bold text-white mb-6">Continue Your 14-Day Boot Camp</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href={nextBootcampLink} className="block p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900 transition-all group">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Next Module</p>
                                <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{nextBootcampTitle} <span className="text-purple-500 ml-1">→</span></h4>
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
