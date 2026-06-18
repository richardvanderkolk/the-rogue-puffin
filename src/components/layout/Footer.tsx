"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { EmailCapture } from "@/components/ui/EmailCapture";

export function Footer() {
    const pathname = usePathname();

    // Hide footer on immersive routes
    if (pathname?.includes("/rogue-session/start") || pathname?.includes("/rogue-memory-session/start") || pathname?.includes("/train/app")) {
        return null;
    }
    return (
        <footer className="bg-slate-950 border-t border-white/5 py-20 px-6">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
                
                <div className="w-full max-w-sm hover:scale-105 transition-transform duration-700">
                    <Image src="/assets/premium-logo.png" alt="The Rogue Puffin Logo" width={384} height={384} className="w-full h-auto drop-shadow-2xl" />
                </div>
                
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left border-t border-white/5 pt-16">
                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold tracking-widest text-sm uppercase">Products</h4>
                        <Link href="/bootcamp" className="text-slate-400 hover:text-indigo-300 transition-colors">The 14-Day Bootcamp</Link>
                    </div>
                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold tracking-widest text-sm uppercase">Free Resources</h4>
                        <Link href="/blog" className="text-slate-400 hover:text-emerald-300 transition-colors">The Archive (Articles)</Link>
                        <Link href="/free-test" className="text-slate-400 hover:text-emerald-300 transition-colors">Free Speed Test</Link>
                        <Link href="/rogue-session/start" className="text-slate-400 hover:text-emerald-300 transition-colors">Free Reading Diagnostic</Link>
                    </div>
                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold tracking-widest text-sm uppercase">Legal</h4>
                        <Link href="/legal/privacy" className="text-slate-400 hover:text-slate-200 transition-colors">Privacy Policy</Link>
                        <Link href="/legal/terms" className="text-slate-400 hover:text-slate-200 transition-colors">Terms of Service</Link>
                        <Link href="/legal/imprint" className="text-slate-400 hover:text-slate-200 transition-colors">Imprint</Link>
                    </div>
                </div>

                <div className="w-full text-center text-slate-600 text-sm border-t border-white/5 pt-8">
                    &copy; {new Date().getFullYear()} Authoring Life (KvK 99977516). All rights reserved.
                </div>
            </div>
        </footer>
    );
}
