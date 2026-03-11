"use client";

import Link from "next/link";
import { ArrowRight, Brain, Clock, Zap, CheckCircle } from "lucide-react";

export default function RogueMemoryPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30">

            {/* Hero */}
            <section className="relative px-6 py-24 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -z-10" />
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 border border-violet-500/20">
                        The Rogue Memory Session
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
                        You don't have a bad memory.<br />You just lack the algorithm.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The average human can recall about 7 items in a single sitting. In just 30 minutes, we will install a mental framework that allows you to perfectly memorize 30 disconnected words on your first try.
                        The average "after" score is <strong className="text-white font-medium">28/30</strong>. This isn't theory. For the price of a coffee, we will prove your own mind's capability to you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link
                            href="/rogue-memory-session/start"
                            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
                        >
                            Unlock Your Memory (€5) <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    <p className="text-sm text-slate-500">Instant access. 100% money-back guarantee if your score doesn't double.</p>
                </div>
            </section>

            {/* What You Get */}
            <section className="py-20 px-6 bg-slate-900/30 border-y border-slate-900">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-violet-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Immediate Proof</h3>
                            <p className="text-slate-400 leading-relaxed">
                                You self-test before and after. The difference in those two scores is the proof that the techniques work.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <Brain className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">No Special Talent</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Memory champions don't have better memories. They have better techniques — and those techniques are learnable.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Just 30 Minutes</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Three powerful techniques. Three groups of ten words. One session that changes how you think about memory forever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">How The Session Works</h2>
                        <p className="text-slate-400">Three phases, designed to show — not tell.</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            { n: "1", color: "rose", title: "Measure Your Current Memory", body: "You get 10 minutes to memorise a list of 30 words the way you normally would. Write down everything you can recall. This is your baseline." },
                            { n: "2", color: "indigo", title: "Learn the Techniques", body: "We teach you three proven memory methods — the Story method, Linking & Association, and the House Method. You discover why we remember pictures better than words." },
                            { n: "3", color: "emerald", title: "Measure Your New Memory", body: "You get 10 minutes with a fresh list of 30 words, but this time you use your new techniques. Then we reveal all 60 words — and invite you to see just how many you now know." },
                        ].map(({ n, color, title, body }) => (
                            <div key={n} className={`flex gap-6 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl`}>
                                <div className={`w-10 h-10 rounded-full bg-${color}-500/10 border border-${color}-500/30 flex items-center justify-center text-${color}-400 font-bold text-lg shrink-0 mt-1`}>{n}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Why */}
            <section className="py-16 px-6 bg-slate-900/20 border-y border-slate-900">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-bold">You already have a fantastic memory.</h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        The problem isn't your brain — it's that nobody taught you how to use it.
                        <br /><br />
                        Your strongest memories are vivid, emotional, and connected to images and stories.
                        This session shows you how to apply those same principles to <em className="text-white">anything</em> you want to remember.
                    </p>
                    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl">
                        <p className="text-2xl font-bold text-white italic">"We Remember Best in Pictures."</p>
                    </div>
                </div>
            </section>

            {/* What you'll be able to remember */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">By the end of this session</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            "You'll understand exactly why your memory works the way it does",
                            "You'll know three practical techniques for memorising any list",
                            "You'll have proof — in your own scores — that these techniques work",
                            "You'll have a foundation for applying these skills to studying, languages, names, and more",
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <p className="text-slate-300">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 border-t border-slate-900 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/20 relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-[80px]" />
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-6">Ready to prove your memory?</h2>
                            <p className="text-xl text-slate-400 mb-8">
                                For €5, you secure a framework that you will use for the rest of your life. <br className="hidden md:block" />It takes 30 minutes, and the results are permanent.
                            </p>
                            <Link
                                href="/rogue-memory-session/start"
                                className="inline-flex px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-slate-200 transition-all items-center gap-3 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                Unlock Your Memory Now <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
