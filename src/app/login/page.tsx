"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [name, setName] = useState("");
    const { signIn, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await signIn(name);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-100 relative">

            <div className="absolute top-8 left-8">
                <Link href="/" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
                </Link>
            </div>

            <div className="w-full max-w-md space-y-8 z-10">
                <div className="flex justify-center mb-4">
                    <img src="/assets/premium-logo.png" alt="The Rogue Puffin" className="w-56 h-56 object-contain drop-shadow-2xl" />
                </div>
                
                <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">Welcome Back</h1>
                    <p className="text-lg text-slate-400">Enter your name to access your training dashboard.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl space-y-8 shadow-2xl">
                    <div className="space-y-3">
                        <label htmlFor="name" className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your First Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Richard"
                            className="w-full bg-black border border-slate-700 rounded-2xl px-6 py-4 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || loading || name.trim() === ""}
                        className="w-full bg-white text-black py-5 rounded-2xl font-bold text-xl hover:bg-slate-200 hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        {(isSubmitting || loading) ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Accessing...
                            </>
                        ) : (
                            <>
                                Open Dashboard
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <p className="text-xs text-center text-slate-500 uppercase tracking-widest font-medium">
                        Your progress is saved locally to your device.
                    </p>
                </form>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}
