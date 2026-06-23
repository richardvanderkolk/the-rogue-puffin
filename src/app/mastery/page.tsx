"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Zap, Shield, BookOpen, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { PromoCodeSection } from "@/components/PromoCodeSection";

export default function MasteryLandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [currencyInfo, setCurrencyInfo] = useState({ currency: 'usd', symbol: '$' });
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        fetch('/api/currency')
            .then(res => res.json())
            .then(data => {
                if (data && data.symbol) {
                    setCurrencyInfo(data);
                }
            })
            .catch(err => console.error("Failed to load currency info:", err));
    }, []);

    const handleSubscribe = async () => {
        if (!user) {
            router.push('/login?redirectTo=/mastery');
            return;
        }

        setIsProcessing(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    productMode: 'mastery_subscription',
                    email: user.email,
                    user_id: user.id
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Checkout failed: " + (data.error || "Unknown error"));
                setIsProcessing(false);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    const isAdmin = 
        user?.email?.toLowerCase().includes('richard') || 
        user?.name?.toLowerCase().includes('richard') || 
        false;

    useEffect(() => {
        const dbAuthorized = user && (user?.subscription_status === 'active' || isAdmin);
        const locallyUnlocked = typeof window !== 'undefined' && localStorage.getItem('rp_mastery_unlocked') === 'true';
        setIsAuthorized(!!dbAuthorized || !!locallyUnlocked);
    }, [user, isAdmin]);

    useEffect(() => {
        if (!loading && isAuthorized) {
            router.push('/mastery/dashboard');
        }
    }, [isAuthorized, loading, router]);

    if (loading || isAuthorized) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl w-full z-10">
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">
                        <Lock className="w-4 h-4" /> Rogue Mastery Tier
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                        The gym membership for <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">your brain.</span>
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                        Unlock the Bring Your Own Book (BYOB) Engine and daily cognitive micro-drills to maintain your reading speed permanently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Features Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-8">What's included in Mastery?</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Bring Your Own Book Engine</h4>
                                    <p className="text-slate-400">Paste any article, email, or textbook chapter and read it instantly at 500+ WPM using our custom engine.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Daily Micro-Drills</h4>
                                    <p className="text-slate-400">Randomized 3-minute drills designed to keep your peripheral vision and subvocalization suppression sharp.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                 <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                     <Shield className="w-5 h-5 text-purple-400" />
                                 </div>
                                 <div>
                                     <h4 className="text-white font-bold text-lg">Advanced Tracking & Analytics</h4>
                                     <p className="text-slate-400">Log your daily training sessions, visualize your WPM growth curve, and track retention metrics over time.</p>
                                 </div>
                             </li>
                        </ul>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="mb-8 relative z-10">
                            <h3 className="text-2xl font-bold text-indigo-300 mb-2">Mastery Subscription</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white">{currencyInfo.symbol}9</span>
                                <span className="text-slate-400 font-medium text-lg">/ month</span>
                            </div>
                            <p className="text-slate-400 mt-4">Cancel anytime. Maintain your edge permanently.</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1 relative z-10">
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                                <span>Unlimited BYOB Engine usage</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                                <span>Advanced tracking dashboard</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                                <span>Priority support</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubscribe}
                            disabled={isProcessing}
                            className="w-full py-5 bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] disabled:shadow-none flex items-center justify-center relative z-10 text-lg"
                        >
                            {isProcessing ? "Redirecting to secure checkout..." : "Subscribe Now"}
                        </button>
                        <p className="text-center text-xs text-slate-500 mt-4">Secure payment processed by Stripe</p>
                        <div className="mt-4 text-center">
                            <PromoCodeSection product="mastery" onUnlock={() => setIsAuthorized(true)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
