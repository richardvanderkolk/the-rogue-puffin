"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EmailCapture } from "@/components/ui/EmailCapture";

export function Footer() {
    const pathname = usePathname();

    // Hide footer on immersive routes
    if (pathname?.includes("/rogue-session/start") || pathname?.includes("/rogue-memory-session/start") || pathname?.includes("/train/app")) {
        return null;
    }
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
                <div>
                    &copy; {new Date().getFullYear()} Authoring Life (KvK 99977516). All rights reserved.
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0">
                    <Link href="/legal/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                    <Link href="/legal/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    <Link href="/legal/imprint" className="hover:text-slate-300 transition-colors">Imprint</Link>
                </div>
            </div>
        </footer>
    );
}
