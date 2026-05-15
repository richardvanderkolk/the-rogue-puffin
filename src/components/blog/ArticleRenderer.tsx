"use client";

import { useAuth } from "@/lib/auth-context";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getArticleVariant } from "@/data/learningStyleVariants";

interface ArticleRendererProps {
    content: string;
    isPremium: boolean;
    articleSlug: string;
}

export function ArticleRenderer({ content, isPremium, articleSlug }: ArticleRendererProps) {
    const { user, loading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [superpower, setSuperpower] = useState<string | null>(null);
    const [hasVariant, setHasVariant] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Fetch superpower from local storage (works for both anon who took quiz, and logged in users synced to local)
        try {
            const stored = localStorage.getItem('rogue_superpowers');
            if (stored) {
                let parsedSp = null;
                if (stored.startsWith('[')) {
                    const parsed = JSON.parse(stored);
                    if (parsed && parsed.length > 0) parsedSp = parsed[0];
                } else {
                    parsedSp = stored;
                }
                
                if (parsedSp) {
                    setSuperpower(parsedSp);
                    // Check if this article actually has a variant for this superpower
                    const variantHtml = getArticleVariant(articleSlug, parsedSp);
                    if (variantHtml) {
                        setHasVariant(true);
                    }
                }
            }
        } catch (e) {
            console.error('Failed to parse superpower', e);
        }

        // Always free for logged in users or non-premium articles (like 'know-your-why')
        if (!isPremium || user) {
            setHasAccess(true);
            return;
        }

        // Metered Paywall Logic: 1 Free Premium Article per browser
        try {
            const freeArticle = localStorage.getItem('rogue_free_article_viewed');
            
            if (!freeArticle) {
                // First premium article they've discovered! Grant access.
                localStorage.setItem('rogue_free_article_viewed', articleSlug);
                setHasAccess(true);
            } else if (freeArticle === articleSlug) {
                // They are revisiting their 1 free article
                setHasAccess(true);
            } else {
                // They have already used their free article on a different slug
                setHasAccess(false);
            }
        } catch (e) {
            // Fallback in case localStorage is disabled (assume no access to be safe)
            setHasAccess(false);
        }

    }, [user, isPremium, articleSlug]);

    // We render the HTML. We want to always render the full HTML for SEO.
    // But if they don't have access, we apply a CSS class to visually hide the rest and fade it out.

    return (
        <div className="relative">
            {/* The Personalized Superpower Banner */}
            {mounted && hasVariant && superpower && (
                <div className="mb-12 bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(99,102,241,0.1)] flex flex-col sm:flex-row items-center gap-6 justify-between print:hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1 text-lg">We found your Learning Translation.</h3>
                            <p className="text-slate-400 text-sm">Because your primary superpower is <span className="text-indigo-400 font-bold capitalize">{superpower}</span>, we have a custom version of this theory just for you.</p>
                        </div>
                    </div>
                    <Link href={`?style=${superpower}`} scroll={false} className="shrink-0 px-6 py-3 bg-indigo-500/10 text-indigo-400 font-bold rounded-xl border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-2 group-hover:scale-105">
                        Read Translation <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}

            <div
                className={`prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white print:prose-headings:text-black print:prose-p:text-slate-800 print:text-slate-800 print:prose-strong:text-black print:prose-li:text-slate-800 print:prose-a:text-indigo-600 print:max-w-none print:prose-blockquote:border-slate-300 print:prose-blockquote:text-slate-600 ${
                    mounted && !hasAccess ? "max-h-[800px] overflow-hidden" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* The Fade Out and Paywall CTA */}
            {mounted && !hasAccess && (
                <div className="absolute bottom-0 left-0 right-0 h-[600px] flex flex-col items-center justify-end bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pb-8">
                    <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[2rem] max-w-2xl mx-auto text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <Lock className="w-64 h-64" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-8 h-8 text-indigo-400" />
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Premium Masterclass Content
                            </h3>
                            
                            <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">
                                This article is part of the premium curriculum. Unlock the full library, the interactive reading software, and the memory protocols.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link 
                                    href="/bootcamp" 
                                    className="w-full sm:w-auto px-8 py-4 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-400 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Unlock The Bootcamp
                                </Link>
                                <Link 
                                    href="/rogue-session/start" 
                                    className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-all"
                                >
                                    Take Free Diagnostic
                                </Link>
                            </div>
                            <div className="mt-6">
                                <Link href="/login" className="text-sm text-slate-500 hover:text-slate-300 transition-colors font-medium">
                                    Already have an account? Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic Post-Article CTA for Anonymous Users who consumed their free article */}
            {mounted && hasAccess && !user && (
                <div className="mt-16 pt-16 border-t border-slate-800 print:hidden relative z-10 bg-slate-950">
                    <h3 className="text-2xl font-bold text-white mb-6">Your Next Step:</h3>
                    <Link href="/rogue-session/start" className="block p-8 rounded-2xl bg-indigo-900/30 border border-indigo-500/30 hover:border-indigo-500/50 hover:bg-indigo-900/40 transition-all group shadow-lg shadow-indigo-500/10">
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Apply These Concepts</p>
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">Free Interactive Training to Double Your Reading Speed <span className="text-indigo-500 ml-2">→</span></h4>
                        <p className="text-slate-400 font-light text-lg">Experience the exact visual pacing protocol used by top performers. This free 15-minute session forces your brain out of subvocalization and permanently increases your reading speed.</p>
                    </Link>
                </div>
            )}
        </div>
    );
}
