"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Users, DollarSign, TrendingUp, AlertCircle, Lock } from 'lucide-react';

export default function AdminDashboard() {
    const [authData, setAuthData] = useState({ authenticated: false, passkey: "" });
    const [passwordInput, setPasswordInput] = useState("");
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedKey = localStorage.getItem("rogue_admin_key");
        if (savedKey) {
            setAuthData({ authenticated: true, passkey: savedKey });
            fetchMetrics(savedKey);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchMetrics = async (passkey: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/analytics?passkey=${encodeURIComponent(passkey)}`);
            if (res.ok) {
                const data = await res.json();
                setMetrics(data);
            } else {
                localStorage.removeItem("rogue_admin_key");
                setAuthData({ authenticated: false, passkey: "" });
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === "thepuffin2024!") {
            localStorage.setItem("rogue_admin_key", passwordInput);
            setAuthData({ authenticated: true, passkey: passwordInput });
            fetchMetrics(passwordInput);
        } else {
            alert("Incorrect passkey");
        }
    };

    if (loading && !metrics) {
        return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Analytics...</div>;
    }

    if (!authData.authenticated || !metrics) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-sans">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-indigo-400" />
                </div>
                <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6 w-full max-w-sm shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
                        <p className="text-slate-400 text-sm">Enter the secret passkey</p>
                    </div>
                    <input 
                        type="password" 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-center tracking-widest"
                    />
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold py-4 rounded-xl">Unlock Dashboard</button>
                    <Link href="/" className="text-sm text-slate-500 hover:text-white block text-center pt-2">Back to Homepage</Link>
                </form>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const leadConv = metrics.totalLeads > 0 && metrics.uniqueVisitors > 0 ? Math.round((metrics.totalLeads / metrics.uniqueVisitors) * 100) : 0;
    const sessionConv = metrics.rogueSessions > 0 && metrics.totalLeads > 0 ? Math.round((metrics.rogueSessions / metrics.totalLeads) * 100) : 0;
    const upgradeConv = metrics.masterclasses > 0 && metrics.totalLeads > 0 ? Math.round((metrics.masterclasses / metrics.totalLeads) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Admin Analytics</h1>
                    <p className="text-slate-500">Live Growth & Funnel Metrics</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/articles" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-bold rounded-lg shadow-lg">
                        Manage Articles
                    </Link>
                    <button onClick={() => { localStorage.removeItem("rogue_admin_key"); window.location.reload(); }} className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400 text-xs font-bold rounded uppercase border border-red-500/20">
                        Lock Hub
                    </button>
                </div>
            </header>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <Users className="w-5 h-5" /> Total Leads
                    </div>
                    <div className="text-3xl font-bold">{metrics.totalLeads.toLocaleString()}</div>
                    <div className="text-xs text-emerald-400 mt-2">Verified test takers</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <DollarSign className="w-5 h-5" /> Revenue
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">{formatCurrency(metrics.totalRevenue)}</div>
                    <div className="text-xs text-slate-500 mt-2">All-time specific volume</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <TrendingUp className="w-5 h-5" /> Avg Improvement
                    </div>
                    <div className="text-3xl font-bold">84%</div>
                    <div className="text-xs text-slate-500 mt-2">Baseline to Day 14 (Simulated)</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <AlertCircle className="w-5 h-5" /> Refunds
                    </div>
                    <div className="text-3xl font-bold">0.0%</div>
                    <div className="text-xs text-emerald-400 mt-2">Below 5% target</div>
                </div>
            </div>

            {/* Funnel Visualization */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10">
                <h3 className="text-lg font-bold mb-6">Live Conversion Funnel</h3>
                <div className="flex items-center justify-between text-center relative">
                    {/* Step 1 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Unique Visitors</div>
                        <div className="text-4xl font-bold text-white mb-2">{metrics.uniqueVisitors.toLocaleString()}</div>
                        <div className="text-xs text-slate-600 mb-2">Estimated Web Traffic</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-indigo-600"></div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="px-4 text-slate-600">→</div>

                    {/* Step 2 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Free Test Taken</div>
                        <div className="text-4xl font-bold text-white mb-2">{metrics.totalLeads.toLocaleString()}</div>
                        <div className="text-xs text-indigo-400 mb-2">{leadConv}% Conv.</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-indigo-600`} style={{ width: `${Math.max(leadConv, 2)}%` }}></div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="px-4 text-slate-600">→</div>

                    {/* Step 3 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Rogue Session ($5)</div>
                        <div className="text-4xl font-bold text-white mb-2">{metrics.rogueSessions.toLocaleString()}</div>
                        <div className="text-xs text-indigo-400 mb-2">{sessionConv}% Conv.</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-indigo-600`} style={{ width: `${Math.max(sessionConv, 2)}%` }}></div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="px-4 text-slate-600">→</div>

                    {/* Step 4 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Masterclass ($10)</div>
                        <div className="text-4xl font-bold text-white mb-2">{metrics.masterclasses.toLocaleString()}</div>
                        <div className="text-xs text-indigo-400 mb-2">{upgradeConv}% Conv.</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-indigo-600`} style={{ width: `${Math.max(upgradeConv, 2)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center text-slate-500 text-xs">
                To view detailed customer lists, issue refunds, or connect payouts to your bank account, log into your Stripe Dashboard. 
            </div>
        </div>
    );
}
