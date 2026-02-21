import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Zap, Target, Sparkles, Map, Database, Brain } from "lucide-react";

export const metadata = {
    title: "Articles | The Rogue Puffin",
    description: "Strategies to learn faster, think clearer, and retain more.",
};

export default async function BlogPage() {
    const { articles } = await import('@/data/articles');

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 pt-48 pb-20 px-6">
            <div className="max-w-7xl mx-auto">



                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT COLUMN: Learning Like A Genius Syllabus */}
                    <div className="space-y-16 lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
                        <div className="mb-8 border-b-2 border-indigo-500 pb-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Learning Like A Genius <br /><span className="text-indigo-400">Curriculum</span></h2>
                        </div>

                        <div className="space-y-16">

                            {/* 1. READY */}
                            <div className="space-y-6">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-5xl font-bold text-slate-800 font-heading">01</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white tracking-wide">READY</h4>
                                        <p className="text-xs text-indigo-300 uppercase tracking-widest font-medium mt-1">Your Best You: Set up to Succeed</p>
                                    </div>
                                </div>

                                <div className="pl-4 md:pl-16 space-y-8 border-l border-slate-800/50 ml-5 md:ml-6">

                                    {/* YOU: THE GENIUS LEARNER */}
                                    <div className="space-y-6">
                                        <h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-indigo-400" /> You: The Genius Learner
                                        </h5>

                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Motivated</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/know-your-why">• Know Your Why</Link> <span className="text-slate-600 text-xs ml-1">(Growth / Wisdom)</span>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/set-your-goals">• Set Your Goals</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Empowered</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/know-your-learning-superpower">• Know Your Learning ‘Superpower’</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/feel-sharp">• Feel Sharp</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/create-your-learning-lab">• Create Your Learning Lab</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Encouraged</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/your-social-circle">• Who You Study With Shapes How You Learn</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">• Celebrate Your Successes</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* 2. AIM */}
                            <div className="space-y-6">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-5xl font-bold text-slate-800 font-heading">02</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white tracking-wide">AIM</h4>
                                        <p className="text-xs text-indigo-300 uppercase tracking-widest font-medium mt-1">Genius Preparation</p>
                                    </div>
                                </div>

                                <div className="pl-4 md:pl-16 space-y-8 border-l border-slate-800/50 ml-5 md:ml-6">
                                    {/* GENIUS PREPARATION */}
                                    <div className="space-y-6">
                                        <h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            <Target className="w-4 h-4 text-indigo-400" /> “I’ve Got This!”
                                        </h5>

                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Curate Your Inputs</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/garbage-in-garbage-out">• Choose Your Resources Wisely</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Build Your Strategy</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/psychology-of-time-and-deadlines">• The Psychology of Time & Deadlines</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/cramming-to-compounding">• From Cramming to Compounding</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/slicing-the-elephant">• Slicing the Elephant: Deconstruct the Skill</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* 3. LEARN */}
                            <div className="space-y-6">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-5xl font-bold text-slate-800 font-heading">03</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-white tracking-wide">LEARN</h4>
                                        <p className="text-xs text-indigo-300 uppercase tracking-widest font-medium mt-1">Let's Go!</p>
                                    </div>
                                </div>

                                <div className="pl-4 md:pl-16 space-y-8 border-l border-slate-800/50 ml-5 md:ml-6">
                                    <div className="space-y-6">
                                        <h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-indigo-400" /> Genius Execution
                                        </h5>

                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Prime Your Mind</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/initiate-a-learning-mindset">• A Learning Mindset</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/preview-the-material">• Preview the Material</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-white mb-2 hover:text-indigo-300 cursor-pointer flex items-center gap-2">Faster Reading</p>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Get Started</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/friction-of-starting">• The Friction of Starting</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Increased Comprehension</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/genius-comprehension">• Genius Comprehension</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/genius-note-taking">• Genius Note Taking</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/using-your-learning-superpower">• Using Your Learning ‘Superpower’</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/engaging-your-imagination">• Engaging Your Imagination</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/active-recall">• Active Recall vs. The Illusion of Competence</Link>
                                                    </li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">
                                                        <Link href="/blog/feynman-technique">• The Feynman Technique</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-slate-400 mb-2">Incredible Retention</p>
                                                <ul className="space-y-2">
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">• Memory Training</li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">• Optimal Reviewing</li>
                                                    <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer block py-1">• Spaced Repetition: Defeating the Forgetting Curve</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* RIGHT COLUMN: Articles Feed */}
                    <div className="space-y-8 lg:border-l lg:border-white/5 lg:pl-16 min-h-screen">
                        <div className="mb-10 border-b-2 border-slate-800 pb-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">All Articles</h2>
                        </div>

                        <div className="grid gap-6">
                            {articles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/blog/${article.slug}`}
                                    className="group block p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-900 transition-all"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-white/5 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors leading-tight">
                                        {article.title}
                                    </h2>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-indigo-400 text-xs font-bold uppercase tracking-wider gap-2">
                                        Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Empty State / More content placeholder */}
                        <div className="p-12 text-center border border-dashed border-white/5 rounded-3xl mt-12">
                            <p className="text-slate-500 text-sm">More genius insights coming soon.</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
