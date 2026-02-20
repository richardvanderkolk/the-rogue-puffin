import { Brain, School, Zap, Rocket } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "About | The Rogue Puffin",
    description: "The missing subject in school: learning how to learn.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">

            {/* Hero Section - Magazine Style */}
            <section className="pt-40 pb-24 px-6 md:pt-52 md:pb-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                        <Brain className="w-3 h-3" /> The Philosophy
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
                        The Missing <br /> Subject<span className="text-indigo-500">.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        How to Learn Like A Genius Does.
                    </p>
                </div>
            </section>

            {/* Content Section - Asymmetric Grid */}
            <section className="px-6 pb-40">
                <div className="max-w-5xl mx-auto space-y-32">

                    {/* Block 1: The Problem */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <span className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 text-indigo-400">
                                <School className="w-6 h-6" />
                            </span>
                            <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">The Gap in <br /> the System</h2>
                            <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                        </div>
                        <div className="md:col-span-8 md:pl-8 space-y-8 text-lg font-light leading-relaxed text-slate-300">
                            <p>
                                We spent 12-16 years in school. We were taught history, mathematics, biology, and literature. We were taught <strong className="text-white font-medium">what</strong> to learn.
                            </p>
                            <p>
                                But remarkably, in all those years, we were never explicitly taught <strong className="text-white font-medium">how</strong> to learn.
                            </p>
                            <p className="text-slate-400 border-l-2 border-slate-800 pl-6 italic">
                                We were taught to read by reading aloud in class. And once we could recognize words, the instruction stopped. We are adults walking around with 6-year-old reading habits.
                            </p>
                        </div>
                    </div>

                    {/* Block 2: The Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
                        <div className="md:col-span-4 sticky top-32">
                            <span className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 text-indigo-400">
                                <Zap className="w-6 h-6" />
                            </span>
                            <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">The Biological <br /> Truth</h2>
                            <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                        </div>
                        <div className="md:col-span-8 md:pl-8 space-y-8 text-lg font-light leading-relaxed text-slate-300">
                            <p>
                                Speed reading isn't magic. It's biology. It's about optimizing the intake mechanism of your brain—your eyes and your visual cortex.
                            </p>
                            <p>
                                The human brain is a pattern-matching supercomputer. It is capable of processing visual information thousands of times faster than auditory information. Yet, by reading with an "inner voice" (subvocalization), we throttle this supercomputer down to the speed of speech.
                            </p>
                            <p>
                                By removing the inefficiencies of subvocalization and regression, you don't just read faster. You enter a state of flow. Comprehension increases because your brain is finally receiving information at the speed it was designed to process it.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action Box */}
                    <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border border-indigo-500/20 rounded-3xl p-12 text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

                        <Rocket className="w-12 h-12 text-indigo-400 mx-auto" />

                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Upgrade Your O.S.</h2>
                            <p className="text-slate-400 max-w-xl mx-auto font-light text-lg">
                                Stop running modern software on legacy hardware. Experience the upgrade for yourself.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link href="/rogue-session" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all duration-200 bg-white rounded-full hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 ring-offset-slate-900">
                                Start The Session
                            </Link>
                            <p className="mt-4 text-xs font-medium tracking-widest text-slate-500 uppercase">
                                30 Minutes • Immediate Results
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer (Simplified as per Design Polish) */}
            <footer className="py-12 px-6 border-t border-slate-900 text-center text-slate-600 text-sm">
                <p>&copy; {new Date().getFullYear()} The Rogue Puffin.</p>
            </footer>
        </main>
    );
}
