import { Users, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Admin Analytics</h1>
                    <p className="text-slate-500">Growth & Funnel Metrics</p>
                </div>
                <div className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded uppercase border border-red-500/20">
                    Private Access
                </div>
            </header>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <Users className="w-5 h-5" /> Total Leads
                    </div>
                    <div className="text-3xl font-bold">1,245</div>
                    <div className="text-xs text-emerald-400 mt-2">+12% this week</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <DollarSign className="w-5 h-5" /> Revenue
                    </div>
                    <div className="text-3xl font-bold">$12,450</div>
                    <div className="text-xs text-emerald-400 mt-2">MRR: $2,100</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <TrendingUp className="w-5 h-5" /> Avg Improvement
                    </div>
                    <div className="text-3xl font-bold">84%</div>
                    <div className="text-xs text-slate-500 mt-2">Baseline to Day 14</div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <AlertCircle className="w-5 h-5" /> Refunds
                    </div>
                    <div className="text-3xl font-bold">1.2%</div>
                    <div className="text-xs text-emerald-400 mt-2">Below 5% target</div>
                </div>
            </div>

            {/* Funnel Visualization */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10">
                <h3 className="text-lg font-bold mb-6">Conversion Funnel</h3>
                <div className="flex items-center justify-between text-center relative">
                    {/* Step 1 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Unique Visitors</div>
                        <div className="text-4xl font-bold text-white mb-2">15,000</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-indigo-600"></div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="px-4 text-slate-600">→</div>

                    {/* Step 2 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Free Test Taken</div>
                        <div className="text-4xl font-bold text-white mb-2">3,500</div>
                        <div className="text-xs text-indigo-400 mb-2">23% Conv.</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[23%] h-full bg-indigo-600"></div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="px-4 text-slate-600">→</div>

                    {/* Step 3 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Rogue Session ($5)</div>
                        <div className="text-4xl font-bold text-white mb-2">420</div>
                        <div className="text-xs text-indigo-400 mb-2">12% Conv.</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[12%] h-full bg-indigo-600"></div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="px-4 text-slate-600">→</div>

                    {/* Step 4 */}
                    <div className="flex-1">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Protocol Upgrade ($49)</div>
                        <div className="text-4xl font-bold text-white mb-2">180</div>
                        <div className="text-xs text-indigo-400 mb-2">42% Conv.</div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-[42%] h-full bg-indigo-600"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cohort List (Institutional) */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Institutional Cohorts</h3>
                    <button className="text-sm text-indigo-400 hover:text-white">View All</button>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-500 text-sm">
                            <th className="pb-4 font-medium">Organization</th>
                            <th className="pb-4 font-medium">Seats</th>
                            <th className="pb-4 font-medium">Active Users</th>
                            <th className="pb-4 font-medium">Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-300">
                        <tr className="border-b border-slate-800/50">
                            <td className="py-4">Acme Corp.</td>
                            <td className="py-4">50</td>
                            <td className="py-4">42</td>
                            <td className="py-4">$2,450</td>
                        </tr>
                        <tr>
                            <td className="py-4">University of Tech</td>
                            <td className="py-4">200</td>
                            <td className="py-4">120</td>
                            <td className="py-4">$9,800</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
