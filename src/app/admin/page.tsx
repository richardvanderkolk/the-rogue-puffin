"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Users, DollarSign, TrendingUp, AlertCircle, Lock, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const [authData, setAuthData] = useState({ authenticated: false, passkey: "" });
    const [passwordInput, setPasswordInput] = useState("");
    const [metrics, setMetrics] = useState<any>(null);
    const [topContent, setTopContent] = useState<any[]>([]);
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
            const viewRes = await fetch(`/api/views?passkey=${encodeURIComponent(passkey)}`);
            if (res.status === 401 || viewRes.status === 401) {
                localStorage.removeItem("rogue_admin_key");
                setAuthData({ authenticated: false, passkey: "" });
                setLoading(false);
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setMetrics(data);
            } else {
                // Mock metrics if table doesn't exist yet
                setMetrics({ totalLeads: 0, totalRevenue: 0, rogueSessions: 0, masterclasses: 0, uniqueVisitors: 0, outcomes30Min: null, outcomes14Day: null });
            }

            if (viewRes.ok) {
                const viewsData = await viewRes.json();
                setTopContent(viewsData);
            } else {
                setTopContent([]);
            }
        } catch (e) {
            console.error(e);
            setMetrics({ totalLeads: 0, totalRevenue: 0, rogueSessions: 0, masterclasses: 0, uniqueVisitors: 0, outcomes30Min: null, outcomes14Day: null });
            setTopContent([]);
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

    const formatRevenueByCurrency = (currencyCode: string, amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode.toUpperCase() }).format(amount);
    };

    const getPercentage = (value: number, total: number) => {
        if (!total || total <= 0) return 0;
        return Math.round((value / total) * 100);
    };

    const landingViews = metrics.landingViews || 0;
    const testStarts = metrics.testStarts || 0;
    const testCompletions = metrics.testCompletions || 0;
    const totalLeads = metrics.totalLeads || 0;
    const bootcampsSold = metrics.bootcampsSold || 0;

    const rateStart = getPercentage(testStarts, landingViews);
    const rateComplete = getPercentage(testCompletions, testStarts);
    const rateLead = getPercentage(totalLeads, testCompletions);
    const rateEnrolled = getPercentage(bootcampsSold, totalLeads);
    const overallConv = getPercentage(bootcampsSold, landingViews);

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-28 pb-8 px-4 sm:px-6 md:p-8 md:pt-32">
            <header className="mb-10 border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <Users className="w-5 h-5" /> Total Leads
                    </div>
                    <div className="text-3xl font-bold">{metrics.totalLeads.toLocaleString()}</div>
                    <div className="text-xs text-emerald-400 mt-2">Verified Test Takers</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <TrendingUp className="w-5 h-5" /> Bootcamps Sold
                    </div>
                    <div className="text-3xl font-bold">{metrics.bootcampsSold?.toLocaleString() || 0}</div>
                    <div className="text-xs text-indigo-400 mt-2">$29 14-Day Bootcamp</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <DollarSign className="w-5 h-5" /> Total Revenue
                    </div>
                    {metrics.revenueByCurrency && Object.keys(metrics.revenueByCurrency).length > 0 ? (
                        <div className="space-y-1">
                            {Object.entries(metrics.revenueByCurrency).map(([currency, amount]: any) => (
                                <div key={currency} className="text-2xl font-bold text-emerald-400">
                                    {formatRevenueByCurrency(currency, amount)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-3xl font-bold text-emerald-400">
                            {formatCurrency(metrics.totalRevenue)}
                        </div>
                    )}
                    <div className="text-xs text-slate-500 mt-2">All-time volume split by currency</div>
                </div>
            </div>

            {/* Student Outcomes - 30 Min Session */}
            {metrics.outcomes30Min && metrics.outcomes30Min.count > 0 && (
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-400" /> Student Outcomes (After 30 Min Session)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Participants</div>
                            <div className="text-4xl font-bold text-white mb-2">{metrics.outcomes30Min.count}</div>
                            <div className="text-xs text-slate-400">Completed baseline & session test</div>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-4">Reading Speed (WPM)</div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Adjusted Average</span>
                                        <span className="text-xl font-bold text-emerald-400">+{Math.round(metrics.outcomes30Min.wpmAdj)}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">Excludes top & bottom 10% outliers</div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Raw Average</span>
                                        <span className="text-lg font-bold text-white">+{Math.round(metrics.outcomes30Min.wpmRaw)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-4">Comprehension Score</div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Adjusted Average</span>
                                        <span className="text-xl font-bold text-indigo-400">{Math.round(metrics.outcomes30Min.compAdj) > 0 ? '+' : ''}{Math.round(metrics.outcomes30Min.compAdj)}%</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">Excludes top & bottom 10% outliers</div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Raw Average</span>
                                        <span className="text-lg font-bold text-white">{Math.round(metrics.outcomes30Min.compRaw) > 0 ? '+' : ''}{Math.round(metrics.outcomes30Min.compRaw)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Student Outcomes - 14 Day Bootcamp */}
            {metrics.outcomes14Day && metrics.outcomes14Day.count > 0 && (
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-400" /> Student Outcomes (After 14 Day Bootcamp)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Graduates</div>
                            <div className="text-4xl font-bold text-white mb-2">{metrics.outcomes14Day.count}</div>
                            <div className="text-xs text-slate-400">Completed baseline & final tests</div>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-4">Reading Speed (WPM)</div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Adjusted Average</span>
                                        <span className="text-xl font-bold text-emerald-400">+{Math.round(metrics.outcomes14Day.wpmAdj)}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">Excludes top & bottom 10% outliers</div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Raw Average</span>
                                        <span className="text-lg font-bold text-white">+{Math.round(metrics.outcomes14Day.wpmRaw)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
                            <div className="text-sm text-slate-500 uppercase tracking-widest mb-4">Comprehension Score</div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Adjusted Average</span>
                                        <span className="text-xl font-bold text-purple-400">{Math.round(metrics.outcomes14Day.compAdj) > 0 ? '+' : ''}{Math.round(metrics.outcomes14Day.compAdj)}%</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500">Excludes top & bottom 10% outliers</div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-slate-400 text-sm">Raw Average</span>
                                        <span className="text-lg font-bold text-white">{Math.round(metrics.outcomes14Day.compRaw) > 0 ? '+' : ''}{Math.round(metrics.outcomes14Day.compRaw)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Memory Training Outcomes */}
            {metrics.memoryStats && (metrics.memoryStats.baselineAvg > 0 || metrics.memoryStats.retestAvg > 0) && (
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-amber-400" /> Memory Session Outcomes</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                            <div>
                                <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Baseline Average</div>
                                <div className="text-xs text-slate-400">Before learning techniques</div>
                            </div>
                            <div className="text-3xl font-bold text-white"><span className="text-amber-400">{Math.round(metrics.memoryStats.baselineAvg)}</span><span className="text-xl text-slate-600">/30</span></div>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                            <div>
                                <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Retest Average</div>
                                <div className="text-xs text-slate-400">After learning 3 techniques</div>
                            </div>
                            <div className="text-3xl font-bold text-white"><span className="text-emerald-400">{Math.round(metrics.memoryStats.retestAvg)}</span><span className="text-xl text-slate-600">/30</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Learning Style Distribution */}
            {metrics.styleDistribution && Object.keys(metrics.styleDistribution).length > 0 && (
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-sky-400" /> Learning Style Superpowers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(metrics.styleDistribution).sort((a: any, b: any) => b[1] - a[1]).map(([style, count]: any) => (
                            <div key={style} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">{style}</div>
                                <div className="text-2xl font-bold text-white">{count}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Funnel Visualization */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 mb-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-400" />
                            Multi-Step Conversion Funnel
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">Track customer journey from initial visit to paid bootcamp enrollment</p>
                    </div>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs px-3.5 py-2 rounded-full font-bold shadow-lg">
                        Overall Conversion: {overallConv}%
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-1">
                    {/* Step 1 */}
                    <div className="flex-1 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-all min-h-[140px]">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Step 01</span>
                                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-1">Landing Page</h4>
                            <p className="text-2xl font-black text-white">{landingViews.toLocaleString()}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2">Total unique visits</div>
                    </div>

                    {/* Connect Arrow 1 */}
                    <div className="flex flex-col lg:flex-row items-center justify-center shrink-0 py-2 lg:py-0 lg:px-1">
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                        <span className="text-xs font-bold text-indigo-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full shadow-md font-mono my-1 lg:my-0 lg:mx-1">
                            {rateStart}%
                        </span>
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-all min-h-[140px]">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Step 02</span>
                                <span className="w-2 h-2 rounded-full bg-indigo-500/50"></span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-1">Started Test</h4>
                            <p className="text-2xl font-black text-white">{testStarts.toLocaleString()}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2">Clicked to take test</div>
                    </div>

                    {/* Connect Arrow 2 */}
                    <div className="flex flex-col lg:flex-row items-center justify-center shrink-0 py-2 lg:py-0 lg:px-1">
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                        <span className="text-xs font-bold text-indigo-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full shadow-md font-mono my-1 lg:my-0 lg:mx-1">
                            {rateComplete}%
                        </span>
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-all min-h-[140px]">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Step 03</span>
                                <span className="w-2 h-2 rounded-full bg-indigo-500/50"></span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-1">Finished Test</h4>
                            <p className="text-2xl font-black text-white">{testCompletions.toLocaleString()}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2">Completed baseline test</div>
                    </div>

                    {/* Connect Arrow 3 */}
                    <div className="flex flex-col lg:flex-row items-center justify-center shrink-0 py-2 lg:py-0 lg:px-1">
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                        <span className="text-xs font-bold text-indigo-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full shadow-md font-mono my-1 lg:my-0 lg:mx-1">
                            {rateLead}%
                        </span>
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex-1 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-all min-h-[140px]">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Step 04</span>
                                <span className="w-2 h-2 rounded-full bg-indigo-500/50"></span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-1">Submitted Email</h4>
                            <p className="text-2xl font-black text-white">{totalLeads.toLocaleString()}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2">Saved results (Leads)</div>
                    </div>

                    {/* Connect Arrow 4 */}
                    <div className="flex flex-col lg:flex-row items-center justify-center shrink-0 py-2 lg:py-0 lg:px-1">
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                        <span className="text-xs font-bold text-indigo-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full shadow-md font-mono my-1 lg:my-0 lg:mx-1">
                            {rateEnrolled}%
                        </span>
                        <div className="w-px h-6 lg:w-4 lg:h-px bg-slate-800"></div>
                    </div>

                    {/* Step 5 */}
                    <div className="flex-1 bg-slate-950 p-5 rounded-xl border border-emerald-500/20 flex flex-col justify-between group hover:border-emerald-500/40 transition-all min-h-[140px] shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Step 05</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-1">Enrolled Bootcamp</h4>
                            <p className="text-2xl font-black text-emerald-400">{bootcampsSold.toLocaleString()}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-2">Paid $29 Enrollment</div>
                    </div>
                </div>
            </div>

            {/* Top Content Leaderboard */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-400" /> Top Performing Content</h3>
                
                {topContent.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 italic">No content views tracked yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="pb-4 font-medium pl-4">Rank</th>
                                    <th className="pb-4 font-medium">Title</th>
                                    <th className="pb-4 font-medium">Category</th>
                                    <th className="pb-4 font-medium text-right pr-4">Total Views</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {topContent.map((item, idx) => (
                                    <tr key={item.path} className="hover:bg-slate-800/20 transition-colors group">
                                        <td className="py-4 pl-4">
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx < 3 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]' : 'text-slate-500'}`}>
                                                {idx + 1}
                                            </span>
                                        </td>
                                        <td className="py-4 font-medium text-white group-hover:text-indigo-300 transition-colors">
                                            {item.title}
                                            <div className="text-xs text-slate-500 font-mono mt-1">{item.path}</div>
                                        </td>
                                        <td className="py-4">
                                            <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] uppercase font-bold tracking-wider">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right pr-4 font-mono font-bold text-emerald-400">
                                            {item.views.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            <div className="text-center text-slate-500 text-xs">
                To view detailed customer lists, issue refunds, or connect payouts to your bank account, log into your Stripe Dashboard. 
            </div>
        </div>
    );
}
