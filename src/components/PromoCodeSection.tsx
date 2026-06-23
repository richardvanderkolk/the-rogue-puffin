"use client";

import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { applyPromoCode } from "@/app/actions/progress";

export function PromoCodeSection({ 
    product, 
    onUnlock 
}: { 
    product: 'bootcamp' | 'mastery'; 
    onUnlock: () => void; 
}) {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setStatus('loading');
        try {
            const response = await applyPromoCode(code, product);
            if (response.success) {
                setStatus('success');
                setMessage("Promo code applied successfully! Unlocking access...");
                
                // Fallback unlock to local storage for instant preview/anonymous users
                if (product === 'bootcamp') {
                    localStorage.setItem('rp_bootcamp_unlocked', 'true');
                } else if (product === 'mastery') {
                    localStorage.setItem('rp_mastery_unlocked', 'true');
                }
                
                setTimeout(() => {
                    onUnlock();
                }, 1500);
            } else {
                setStatus('error');
                setMessage(response.message || "Invalid promo code.");
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage("Failed to apply promo code. Please try again.");
        }
    };

    if (!showInput) {
        return (
            <button 
                onClick={() => setShowInput(true)} 
                className="text-xs text-slate-500 hover:text-indigo-400 transition-colors underline font-medium focus-visible:outline-none"
            >
                Have a promo code?
            </button>
        );
    }

    return (
        <div className="w-full max-w-sm mx-auto bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mt-2 text-left animate-in fade-in duration-300">
            <h4 className="text-xs font-bold text-slate-400 mb-2">Apply Promo Code</h4>
            <form onSubmit={handleApply} className="flex gap-2">
                <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code (e.g. educator)" 
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-grow bg-slate-900 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                />
                <button 
                    type="submit" 
                    disabled={status === 'loading' || status === 'success' || !code.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                >
                    {status === 'loading' ? 'Applying...' : 'Apply'}
                </button>
            </form>

            {status === 'error' && (
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{message}</span>
                </div>
            )}

            {status === 'success' && (
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
}
