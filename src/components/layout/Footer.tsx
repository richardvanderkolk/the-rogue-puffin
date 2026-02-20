"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EmailCapture } from "@/components/ui/EmailCapture";

export function Footer() {
    const pathname = usePathname();

    // Hide footer on immersive routes
    if (pathname?.includes("/rogue-session/start") || pathname?.includes("/train/app")) {
        return null;
    }

    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-8 px-6">
            <div className="max-w-6xl mx-auto text-center text-slate-600 text-sm">
                &copy; {new Date().getFullYear()} The Rogue Puffin.
            </div>
        </footer>
    );
}
