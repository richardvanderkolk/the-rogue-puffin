import { Activity } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { getCurrencyInfo } from "@/lib/currency";
import { GraduationBanner } from "@/components/bootcamp/GraduationBanner";
import { BootcampRoadmap } from "@/components/bootcamp/BootcampRoadmap";
import { createClient } from "@/lib/supabase/server";

export default async function BootcampDashboard(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country');
    const { symbol } = getCurrencyInfo(country);
    
    // Auth & DB Check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let isUnlocked = false;
    let initialProgress = 1;
    
    const searchParams = await props.searchParams;
    const forceUnlock = searchParams.unlocked === 'true';

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('has_paid_bootcamp, bootcamp_progress_day')
            .eq('id', user.id)
            .single();
            
        if (profile) {
            // Unlock everything automatically in local development, or via the ?unlocked=true flag
            const isLocal = process.env.NODE_ENV === 'development';
            const isAdmin = user.email?.toLowerCase().includes('richard');
            isUnlocked = profile.has_paid_bootcamp || forceUnlock || isLocal || isAdmin;
            const dbProgress = profile.bootcamp_progress_day;
            initialProgress = searchParams.progress ? parseInt(searchParams.progress as string) : dbProgress;
        }
    } else {
        // Fallback or preview logic if not logged in
        const isLocal = process.env.NODE_ENV === 'development';
        isUnlocked = forceUnlock || isLocal;
        initialProgress = searchParams.progress ? parseInt(searchParams.progress as string) : 1;
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32">
            
            {/* Header / Navbar area */}
            <div className="w-full bg-slate-900 border-b border-white/5 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                            <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white tracking-tight">Bootcamp Dashboard</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12 space-y-16">
                <GraduationBanner />
                <BootcampRoadmap isUnlocked={isUnlocked} symbol={symbol} initialProgress={initialProgress} />
            </div>
        </main>
    );
}
