import { ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

export default function StatCard({ title, value, subtext, trend, trendValue }: StatCardProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-50">
                {trend === 'up' && <ArrowUp className="w-5 h-5 text-emerald-500" />}
                {trend === 'down' && <ArrowDown className="w-5 h-5 text-red-500" />}
                {trend === 'neutral' && <Activity className="w-5 h-5 text-slate-500" />}
            </div>

            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>

            {subtext && <p className="text-slate-400 text-sm">{subtext}</p>}

            {trendValue && (
                <div className={`text-xs mt-3 flex items-center gap-1 ${trend === 'up' ? 'text-emerald-400' :
                        trend === 'down' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                    {trendValue} vs last session
                </div>
            )}
        </div>
    );
}
