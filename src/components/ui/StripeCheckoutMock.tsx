"use client";

import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";

export function StripeCheckoutMock({ price = "$5.00", onSuccess }: { price?: string, onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (onSuccess) {
                onSuccess();
            } else {
                alert("Redirecting to Stripe Checkout...");
            }
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                    <CreditCard className="w-5 h-5" /> Secure Checkout
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Encrypted
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email Address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900"
                    />
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full py-4 bg-black text-white font-bold text-lg rounded-lg hover:bg-slate-800 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Processing..." : `Pay ${price}`}
                </button>

                <p className="text-center text-sm font-medium text-slate-600 px-2 pt-2">
                    For the cost of a coffee at your favorite cafe, you can discover a skill that will help you for the rest of your life.
                </p>

                <p className="text-center text-xs text-slate-400">
                    Powered by Stripe. 30-day money-back guarantee.
                </p>
            </div>
        </div>
    );
}
