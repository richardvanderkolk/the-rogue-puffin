"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, Brain, Rocket, ChevronRight, Menu, X, Download } from 'lucide-react';
import PhaseReady from '@/components/textbook/PhaseReady';
import PhaseAim from '@/components/textbook/PhaseAim';
import PhaseLearn from '@/components/textbook/PhaseLearn';
import PhasePartTwo from '@/components/textbook/PhasePartTwo';
import StudyPlanSection from '@/components/textbook/StudyPlanSection';
import Appendix from '@/components/textbook/Appendix';
import BookViewer from '@/components/textbook/BookViewer';
import { articles } from '@/data/articles';
import Link from 'next/link';

// Interactive Widgets
import FlashcardWidget from '@/components/textbook/widgets/FlashcardWidget';
import DeepWorkTimer from '@/components/textbook/widgets/DeepWorkTimer';
import ZeigarnikNotepad from '@/components/textbook/widgets/ZeigarnikNotepad';
import FourStagesDiagram from '@/components/textbook/widgets/FourStagesDiagram';
import FeynmanFlowchart from '@/components/textbook/widgets/FeynmanFlowchart';

const CHAPTERS = [
    { id: 'intro', title: 'Introduction', icon: BookOpen },
    { id: 'phase-ready', title: 'Phase I: Ready', icon: Target },
    { id: 'phase-aim', title: 'Phase II: Aim', icon: Zap },
    { id: 'phase-learn', title: 'Phase III: Learn', icon: Brain },
    { id: 'study-plan', title: 'The Master Study Plan', icon: Rocket }
];

export default function TextbookPage() {
    const [activeSection, setActiveSection] = useState('intro');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBookView, setIsBookView] = useState(false);

    useEffect(() => {
        if (isBookView) return; // Don't track scroll in book view
        
        const handleScroll = () => {
            const sections = CHAPTERS.map(c => document.getElementById(c.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isBookView]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        setIsSidebarOpen(false);
    };

    const renderBookContent = (inBook: boolean) => (
        <>
            {/* Table of Contents */}
            
            <section id="toc" className={`mb-32 ${inBook ? '' : 'min-h-screen'} print:min-h-0 print:break-after-page`}>
                <p className="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-4 print:text-indigo-700">Navigation</p>
                <h1 className={`break-inside-avoid-column text-5xl sm:text-6xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-none mb-16 tracking-tighter`}>
                    Table of Contents
                </h1>

                <div className={`space-y-16 ${inBook ? '' : 'max-w-2xl'}`}>
                    
                    {/* PART 1 */}
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-400 print:text-emerald-700 uppercase mb-8 border-b border-emerald-500/20 print:border-slate-300 pb-4">Part I: The Blueprint</h2>
                        
                        <div className="space-y-8">
                            <div className="break-inside-avoid-column">
                                <a href="#phase-ready" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Phase I: Ready</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART1_READY').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="break-inside-avoid-column">
                                <a href="#phase-aim" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Phase II: Aim</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART1_AIM').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>

                            <div className="break-inside-avoid-column">
                                <a href="#phase-learn" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Phase III: Learn</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART1_LEARN').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PART 2 */}
                    <div className="pt-8">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-400 print:text-emerald-700 uppercase mb-8 border-b border-emerald-500/20 print:border-slate-300 pb-4">Part II: The Arsenal</h2>
                        
                        <div className="space-y-8">
                            <div className="break-inside-avoid-column">
                                <a href="#module-part2-focus" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Module A: Focus & Flow</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART2_FOCUS').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>

                            <div className="break-inside-avoid-column">
                                <a href="#module-part2-speed" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Module B: Speed & Comprehension</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART2_SPEED').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>

                            <div className="break-inside-avoid-column">
                                <a href="#module-part2-env" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Module C: Environment & Psychology</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART2_ENV').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>

                            <div className="break-inside-avoid-column">
                                <a href="#module-part2-tools" className={`block text-lg font-bold ${inBook ? "text-stone-900" : "text-white"} hover:text-indigo-400 no-underline mb-3`}>Module D: Advanced Tools</a>
                                <div className="space-y-2 pl-4 border-l border-slate-800 print:border-slate-300">
                                    {articles.filter(a => a.category === 'PART2_TOOLS').map(article => (
                                        <a key={article.slug} href={`#${article.slug}`} className={`block text-sm ${inBook ? "text-stone-600 font-serif" : "text-slate-400"} hover:text-indigo-400 no-underline transition-colors`}>{article.title}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section id="intro" className={`mb-32 ${inBook ? '' : 'min-h-screen'} print:min-h-0 print:break-after-page`}>
                {inBook ? (
                    <div>
                        <p className="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-4 print:text-indigo-700">Introduction</p>
                        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-none mb-8 tracking-tighter`}>
                            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 print:text-indigo-600">1%.</span>
                        </h1>
                        <p className={`text-xl sm:text-2xl ${inBook ? "text-stone-700 font-serif" : "text-slate-400"} print:text-slate-600 leading-relaxed mb-12 max-w-2xl font-light`}>
                            You are not lazy. You do not lack discipline. You are simply trying to operate a biological supercomputer without the user manual. You have likely spent over 15,000 hours in a classroom where you were taught <em>what</em> to learn, but you were never taught <strong>how your brain actually works</strong>. This masterclass is the user manual.
                        </p>
                        
                        <hr className="border-slate-800 print:border-slate-300 my-16" />

                        <h2>The Illusion of Learning</h2>
                        <p>Walk into any library and you will see the exact same thing: students hunched over textbooks, dragging neon yellow highlighters across the page, endlessly rereading the same paragraphs.</p>
                        <p>It feels incredibly productive. Your brain feels busy. Your notes look colourful and important.</p>
                        <p>But decades of cognitive science have delivered a brutal verdict: <strong>Rereading and highlighting are the two least effective learning strategies ever invented.</strong></p>
                        <p>They create a psychological trap called the <mark>Illusion of Fluency</mark>—you confuse <em>recognising</em> the text on the page with actually <em>knowing</em> the information in your brain. The moment you are tested, the knowledge vanishes.</p>
                        
                        <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 border-l-4 border-emerald-500 p-8 rounded-r-2xl my-12 break-inside-avoid">
                            <h3 className="text-emerald-400 print:text-emerald-700 m-0 mb-4 text-xl">The Goal of This Masterclass</h3>
                            <p className="m-0 text-slate-300 print:text-slate-700">
                                We are going to replace passive recognition with active neurological friction. We will deconstruct exactly how the world's fastest learners absorb, process, and permanently store complex information. By the end of this book, you will have an unfair advantage in any academic or professional environment.
                            </p>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-4 print:text-indigo-700">Introduction</p>
                        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-none mb-8 tracking-tighter`}>
                            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 print:text-indigo-600">1%.</span>
                        </h1>
                        <p className={`text-xl sm:text-2xl ${inBook ? "text-stone-700 font-serif" : "text-slate-400"} print:text-slate-600 leading-relaxed mb-12 max-w-2xl font-light`}>
                            You are not lazy. You do not lack discipline. You are simply trying to operate a biological supercomputer without the user manual. You have likely spent over 15,000 hours in a classroom where you were taught <em>what</em> to learn, but you were never taught <strong>how your brain actually works</strong>. This masterclass is the user manual.
                        </p>
                        
                        <hr className="border-slate-800 print:border-slate-300 my-16" />

                        <h2>The Illusion of Learning</h2>
                        <p>Walk into any library and you will see the exact same thing: students hunched over textbooks, dragging neon yellow highlighters across the page, endlessly rereading the same paragraphs.</p>
                        <p>It feels incredibly productive. Your brain feels busy. Your notes look colourful and important.</p>
                        <p>But decades of cognitive science have delivered a brutal verdict: <strong>Rereading and highlighting are the two least effective learning strategies ever invented.</strong></p>
                        <p>They create a psychological trap called the <mark>Illusion of Fluency</mark>—you confuse <em>recognising</em> the text on the page with actually <em>knowing</em> the information in your brain. The moment you are tested, the knowledge vanishes.</p>
                        
                        <div className="bg-slate-900/50 print:bg-white print:border print:border-slate-200 border-l-4 border-emerald-500 p-8 rounded-r-2xl my-12 break-inside-avoid">
                            <h3 className="text-emerald-400 print:text-emerald-700 m-0 mb-4 text-xl">The Goal of This Masterclass</h3>
                            <p className="m-0 text-slate-300 print:text-slate-700">
                                We are going to replace passive recognition with active neurological friction. We will deconstruct exactly how the world's fastest learners absorb, process, and permanently store complex information. By the end of this book, you will have an unfair advantage in any academic or professional environment.
                            </p>
                        </div>
                    </motion.div>
                )}
            </section>

            <PhaseReady />
            <div className={`${inBook ? 'space-y-0 pb-0' : 'space-y-16 pb-32'}`}>
                {articles.filter(a => a.category === 'PART1_READY').map((article) => {
                    const articleInner = (
                        <>
                            {article.slug !== 'know-your-why' && (
                                <div className="break-inside-avoid mb-8">
                                    <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mt-0 tracking-tight`}>
                                        {article.title}
                                    </h2>
                                </div>
                            )}
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-3xl print:mx-auto print:prose-lg print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif print:prose-p:leading-[1.8] print:prose-p:mb-6 print:text-slate-800 prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}

                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page ${inBook ? 'pt-0' : 'pt-8 min-h-screen'} print:min-h-0`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>

            <PhaseAim />
            <div className={`${inBook ? 'space-y-0 pb-0 pt-0' : 'space-y-16 pt-16 pb-32'}`}>
                {articles.filter(a => a.category === 'PART1_AIM').map((article) => {
                    const articleInner = (
                        <>
                            {article.slug !== 'know-your-why' && (
                                <div className="break-inside-avoid mb-8">
                                    <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mt-0 tracking-tight`}>
                                        {article.title}
                                    </h2>
                                </div>
                            )}
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-2xl print:mx-auto print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}

                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page ${inBook ? 'pt-0' : 'pt-8 min-h-screen'} print:min-h-0`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>

            <PhaseLearn />
            <div className={`${inBook ? 'space-y-0 pb-0 pt-0' : 'space-y-16 pt-16 pb-32'}`}>
                {articles.filter(a => a.category === 'PART1_LEARN').map((article) => {
                    const articleInner = (
                        <>
                            {article.slug !== 'know-your-why' && (
                                <div className="break-inside-avoid mb-8">
                                    <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mt-0 tracking-tight`}>
                                        {article.title}
                                    </h2>
                                </div>
                            )}
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-2xl print:mx-auto print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}
                            {article.slug === 'feynman-technique' && <FeynmanFlowchart />}

                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page ${inBook ? 'pt-0' : 'pt-8 min-h-screen'} print:min-h-0`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>

            <PhasePartTwo />
            
            <div className="print:break-before-page pt-16 pb-8" id="module-part2-focus">
                <h3 className="text-3xl font-black text-emerald-400 print:text-emerald-700 uppercase tracking-widest mb-2">Module A: Focus & Flow</h3>
                <p className="text-xl text-slate-400 print:text-slate-600 mb-16 italic">Techniques for managing attention and eliminating cognitive drag.</p>
            </div>
            <div className="space-y-16 pb-32">
                {articles.filter(a => a.category === 'PART2_FOCUS').map((article) => {
                    const articleInner = (
                        <>
                            <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mb-8 mt-0 tracking-tight break-inside-avoid`}>
                                {article.title}
                            </h2>
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-2xl print:mx-auto print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}
                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page pt-8 ${inBook ? '' : 'min-h-screen'} print:min-h-0 print:py-24 print:px-16`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>
            <div className="print:break-before-page pt-16 pb-8" id="module-part2-speed">
                <h3 className="text-3xl font-black text-emerald-400 print:text-emerald-700 uppercase tracking-widest mb-2">Module B: Speed & Comprehension</h3>
                <p className="text-xl text-slate-400 print:text-slate-600 mb-16 italic">Strategies to dramatically increase reading speed and retention.</p>
            </div>
            <div className="space-y-16 pb-32">
                {articles.filter(a => a.category === 'PART2_SPEED').map((article) => {
                    const articleInner = (
                        <>
                            <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mb-8 mt-0 tracking-tight break-inside-avoid`}>
                                {article.title}
                            </h2>
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-2xl print:mx-auto print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}
                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page pt-8 ${inBook ? '' : 'min-h-screen'} print:min-h-0 print:py-24 print:px-16`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>
            <div className="print:break-before-page pt-16 pb-8" id="module-part2-env">
                <h3 className="text-3xl font-black text-emerald-400 print:text-emerald-700 uppercase tracking-widest mb-2">Module C: Environment & Psychology</h3>
                <p className="text-xl text-slate-400 print:text-slate-600 mb-16 italic">Optimizing your physical space and mental frameworks.</p>
            </div>
            <div className="space-y-16 pb-32">
                {articles.filter(a => a.category === 'PART2_ENV').map((article) => {
                    const articleInner = (
                        <>
                            <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mb-8 mt-0 tracking-tight break-inside-avoid`}>
                                {article.title}
                            </h2>
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-2xl print:mx-auto print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}
                            {article.slug === 'the-4-stages-of-learning' && <FourStagesDiagram />}
                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page pt-8 ${inBook ? '' : 'min-h-screen'} print:min-h-0 print:py-24 print:px-16`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>
            <div className="print:break-before-page pt-16 pb-8" id="module-part2-tools">
                <h3 className="text-3xl font-black text-emerald-400 print:text-emerald-700 uppercase tracking-widest mb-2">Module D: Advanced Tools</h3>
                <p className="text-xl text-slate-400 print:text-slate-600 mb-16 italic">Modern tactics including AI, mind maps, and group study.</p>
            </div>
            <div className="space-y-16 pb-32">
                {articles.filter(a => a.category === 'PART2_TOOLS').map((article) => {
                    const articleInner = (
                        <>
                            <h2 className={`text-4xl sm:text-5xl font-black ${inBook ? "text-stone-900" : "text-white"} print:text-slate-950 leading-tight mb-8 mt-0 tracking-tight break-inside-avoid`}>
                                {article.title}
                            </h2>
                            <div 
                                className={`prose ${inBook ? "prose-stone" : "prose-invert"} prose-sm md:prose-base max-w-none print:max-w-2xl print:mx-auto print:prose-p:font-serif print:prose-blockquote:font-serif print:prose-li:font-serif prose-headings:font-bold prose-a:text-indigo-500 prose-img:rounded-2xl break-inside-avoid-page`}
                                dangerouslySetInnerHTML={{ __html: article.content }} 
                            />
                            {/* In-Book Widget Injection */}
                            {article.slug === 'active-recall' && <FlashcardWidget question="What is Active Recall?" answer="Testing your memory to extract information from your brain, rather than passively re-reading it." />}
                            {article.slug === 'how-your-phone-destroys-deep-work' && <DeepWorkTimer />}
                            {article.slug === 'the-zeigarnik-effect' && <ZeigarnikNotepad />}
                            <hr className="border-slate-800 print:border-slate-300 my-16" />
                        </>
                    );
                    return (
                        <section key={article.slug} id={article.slug} className={`print:break-after-page pt-8 ${inBook ? '' : 'min-h-screen'} print:min-h-0 print:py-24 print:px-16`}>
                            {inBook ? (
                                <div>{articleInner}</div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="print:!opacity-100 print:!transform-none"
                                >
                                    {articleInner}
                                </motion.div>
                            )}
                        </section>
                    );
                })}
            </div>

            <StudyPlanSection />
            <Appendix />
        </>
    );

    return (
        <div className="min-h-screen bg-slate-950 print:bg-white text-slate-300 print:text-black flex font-sans selection:bg-indigo-500/30 print:block">

            {/* Premium Print Headers & Footers */}
            <div className="hidden print:flex fixed top-0 inset-x-0 pt-8 px-16 border-b border-slate-300 pb-4 justify-between items-end z-50 h-24 bg-transparent">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">The 1% Learner Blueprint</span>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-500 font-serif italic">Chapter 1</span>
            </div>
            <div className="hidden print:flex fixed bottom-0 inset-x-0 pb-8 pt-4 justify-center items-center z-50 h-24 bg-transparent">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">The Rogue Puffin</span>
            </div>

            {isBookView && <BookViewer onClose={() => setIsBookView(false)}>{renderBookContent(true)}</BookViewer>}
            
            {/* Top Bar for Mobile */}
            <div className="lg:hidden fixed top-0 w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 z-50 p-4 flex justify-between items-center print:hidden">
                <div className="font-bold text-white">The 1% Learner's Blueprint</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-40 h-screen w-80 shrink-0
                bg-slate-900/80 backdrop-blur-2xl border-r border-slate-800/50 
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col pt-24 pb-8 px-6 overflow-y-auto print:hidden
            `}>
                <div className="mb-12">
                    <Link href="/masterclass" className="text-xs font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest mb-4 inline-flex items-center gap-1">
                        ← Back to Course
                    </Link>
                    <h1 className="text-2xl font-black text-white leading-tight mt-2">
                        The 1% Learner's Blueprint
                    </h1>
                </div>

                <nav className="space-y-2 flex-1">
                    {CHAPTERS.map((chapter) => (
                        <button
                            key={chapter.id}
                            onClick={() => scrollToSection(chapter.id)}
                            className={`
                                w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 group text-left
                                ${activeSection === chapter.id 
                                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]' 
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <chapter.icon className={`w-5 h-5 ${activeSection === chapter.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <span className="font-medium text-sm">{chapter.title}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === chapter.id ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </button>
                    ))}
                </nav>

                <div className="mt-8 p-6 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-3">
                    <button onClick={() => setIsBookView(true)} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        <BookOpen className="w-4 h-4" /> Open 3D Book View
                    </button>
                    <button onClick={() => window.print()} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-colors text-sm flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full lg:max-w-4xl mx-auto pt-32 pb-32 px-6 sm:px-12 lg:px-24 print:p-0 print:m-0 print:max-w-none print:w-full">
                
                {/* PDF Cover Page (Visible only in print) */}
                <div className="hidden print:flex print:h-[297mm] print:w-full print:flex-col print:justify-center relative bg-white p-24 break-after-page">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]">Official Playbook</span>
                    </div>
                    <h1 className="text-7xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-6">
                        The 1% Learner's Blueprint
                    </h1>
                    <p className="text-2xl text-slate-600 max-w-2xl leading-relaxed mb-12 font-light">
                        A Masterclass in Speed, Memory, and Mastery.
                    </p>
                    <div className="mt-auto pt-16 border-t border-slate-200 flex justify-between items-end">
                        <div>
                            <p className="text-sm font-bold text-slate-900 tracking-widest uppercase mb-1">The Rogue Puffin</p>
                        </div>
                    </div>
                </div>

                
                <table className="w-full block print:table">
                    <thead className="hidden print:table-header-group">
                        <tr><td><div className="h-32"></div></td></tr>
                    </thead>
                    <tbody className="block print:table-row-group">
                        <tr className="block print:table-row"><td className="block print:table-cell">
<article className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-img:rounded-3xl prose-img:shadow-2xl print:prose-slate print:prose-headings:text-slate-900 print:prose-headings:break-after-avoid print:prose-p:text-slate-800 print:prose-strong:text-slate-900">
                    {renderBookContent(false)}
                </article>
                        </td></tr>
                    </tbody>
                    <tfoot className="hidden print:table-footer-group">
                        <tr><td><div className="h-32"></div></td></tr>
                    </tfoot>
                </table>

            </main>
        </div>
    );
}
