"use client";

import { Check, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SalesPage() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productMode: 'masterclass' })
            });
            const data = await res.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Checkout failed:", data.error);
                alert("Unable to open checkout right now. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Stripe error:", err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">

            {/* Header / Hero */}
            <header className="relative overflow-hidden pt-16 pb-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Limited Time Offer
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold font-heading tracking-tight text-white leading-tight"
                    >
                        Eliminate Subvocalization <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">In 30 Minutes</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto"
                    >
                        Stop reading textbooks the same way you read novels. Use our specialized visual pacer to instantly boost your WPM by ~30% today.
                    </motion.p>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left: Value Props & Objections */}
                <div className="space-y-12 pt-4">
                    
                    {/* What You'll Learn Section */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold font-heading text-white">In the next 30 minutes, you will learn:</h2>
                        <ul className="space-y-5">
                            {[
                                { text: "The Visual Pacer Hook", detail: "Forces your eyes to glide across sentences without pausing for inner monologues." },
                                { text: "Peripheral Expansion Drills", detail: "Read 3 words at a time instead of 1 by utilizing your existing eye span." },
                                { text: "Comprehension Scaling", detail: "How to retain dense textbook material even when scrolling at literally 500wpm." }
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 bg-indigo-500/20 p-1.5 rounded-full shrink-0">
                                        <Check className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg text-slate-200">{item.text}</div>
                                        <div className="text-slate-400 text-sm mt-1 leading-relaxed">{item.detail}</div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Objection Handling */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">"Is this just speed-reading nonsense?"</h3>
                        <p className="text-slate-400 leading-relaxed">
                            No. Traditional "speed reading" teaches you to skim pages and guess the missing words. It ruins comprehension.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            Instead, this Masterclass trains the actual physical muscle memory of your eyes. By using our digital pacer line, we force your brain to process written information visually rather than audibly (the voice in your head). Faster input, identical retention.
                        </p>
                    </div>

                </div>

                {/* Right: Checkout Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        One-time payment
                    </div>

                    <div className="mb-8">
                        <h3 className="text-slate-500 font-medium uppercase tracking-wider text-sm">Total Access</h3>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-6xl font-black tracking-tight text-slate-900">$10</span>
                            <span className="text-xl text-slate-400 line-through">$49</span>
                        </div>
                        <p className="text-slate-600 mt-2 text-sm">Less than the price of a book.</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? "Processing..." : (
                            <>
                                Get Instant Access
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <Lock className="w-3 h-3" />
                        Secure Payment via Stripe
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500 mb-2">100% Money-Back Guarantee</p>
                        <p className="text-xs text-slate-400">If you don't read faster, you don't pay.</p>
                    </div>
                </motion.div>

            </main>

        </div>
    );
}
