"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export function EmailCapture({ ctaText = "Get Updates" }: { ctaText?: string }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    if (status === "success") {
        return (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center">
                <p className="font-bold">Welcome to the inner circle.</p>
                <p className="text-sm opacity-80">Check your inbox shortly.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="relative max-w-sm w-full">
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder:text-slate-500"
                />
            </div>
            <button
                type="submit"
                disabled={status === "loading"}
                className="mt-4 w-full md:mt-0 md:absolute md:right-1.5 md:top-1.5 md:w-auto md:px-6 md:py-2.5 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {status === "loading" ? "..." : <>{ctaText} <ArrowRight className="w-4 h-4" /></>}
            </button>
        </form>
    );
}
