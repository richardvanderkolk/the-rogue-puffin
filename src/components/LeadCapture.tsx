'use client';

import { useState } from 'react';
import { CheckCircle, FileText, Download, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

export function LeadCapture() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const posthog = usePostHog();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) return;
        
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Use a default score so we pass validation if the API demands it
                body: JSON.stringify({ email, wpm: 0, comprehension: 0 }),
            });

            if (!res.ok) {
                throw new Error('Failed to submit email');
            }

            posthog?.capture('lead_submitted', { 
                email_source: 'pdf_protocol_checklist' 
            });

            setStatus('success');
        } catch (error: any) {
            console.error('Lead Capture Error:', error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="my-16 p-8 md:p-12 relative rounded-[2.5rem] bg-indigo-950/20 border border-indigo-500/20 text-center shadow-2xl flex flex-col items-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />
                
                <CheckCircle className="w-16 h-16 text-emerald-400 mb-6 relative z-10" />
                <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Checklist Secured.</h3>
                <p className="text-slate-300 text-lg max-w-md mx-auto mb-6 relative z-10">
                    Your 1-Page PDF Protocol is ready. Click below to view and save it immediately.
                </p>
                <div className="relative z-10 mb-8">
                    <Link href="/protocol-checklist" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
                        <FileText className="w-4 h-4" /> View & Download Checklist
                    </Link>
                </div>
                
                <div className="w-full h-px bg-white/10 my-8 relative z-10 max-w-lg mx-auto" />
                
                <div className="relative z-10 w-full max-w-lg">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Your Next Step</p>
                    <h4 className="text-2xl font-bold text-white mb-4">The Fast Reading Engine</h4>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                        Your brain processes information faster than you currently read. Break your plateau with our 30-minute interactive diagnostic drill.
                    </p>
                    <Link
                        href="/rogue-session/start"
                        className="group flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mx-auto px-8 py-4 bg-white text-indigo-950 rounded-full font-bold transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-indigo-500" /> Unlock the Engine
                        </div>
                        <span className="bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full text-xs opacity-80">$5</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="my-16 relative rounded-[2.5rem] bg-slate-900/40 border border-white/5 overflow-hidden shadow-2xl">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">
                
                {/* Left Side: Mockup or Icon */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="relative w-40 h-52 bg-slate-950 border border-slate-800 rounded-lg shadow-[0_0_50px_rgba(99,102,241,0.2)] flex flex-col p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3 shrink-0">
                            <FileText className="w-3 h-3 text-indigo-400" />
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight mb-2">The 6-Step Protocol</h4>
                        <div className="flex-1 space-y-2 mt-2">
                            <div className="w-full h-1.5 bg-slate-800 rounded-full" />
                            <div className="w-5/6 h-1.5 bg-slate-800 rounded-full" />
                            <div className="w-full h-1.5 bg-slate-800 rounded-full" />
                            <div className="w-4/6 h-1.5 bg-slate-800 rounded-full" />
                        </div>
                        <div className="mt-auto pt-3 border-t border-slate-800 flex justify-between items-center">
                            <div className="w-8 h-1.5 bg-indigo-500/50 rounded-full" />
                            <span className="text-[8px] text-slate-500 font-bold tracking-wider">PDF</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Copy & Form */}
                <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
                    <div className="space-y-3">
                        <span className="inline-block px-3 py-1 bg-white/5 text-indigo-300 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">
                            Free Protocol Checklist
                        </span>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Don't forget the framework.</h3>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                            Get the beautifully formatted, printable 1-page PDF checklist of the entire 6-Step Cognitive Protocol to reference during your next study session.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto md:mx-0">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your best email..."
                                disabled={status === 'loading'}
                                className="flex-1 bg-slate-950/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-400 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 min-w-[160px]"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send PDF <Download className="w-4 h-4 ml-1" />
                                    </>
                                )}
                            </button>
                        </div>
                        {errorMessage && (
                            <p className="text-red-400 text-sm mt-3 font-medium text-left bg-red-400/10 p-3 rounded-lg border border-red-400/20">{errorMessage}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-4 text-center md:text-left">
                            We respect your privacy. You can unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
