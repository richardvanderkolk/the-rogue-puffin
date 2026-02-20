"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/Mascot";

export function Header() {
    const pathname = usePathname();

    // Hide header on immersive routes if needed, or keep it consistent. 
    // For now, we'll keep it visible everywhere unless specified otherwise.
    if (pathname?.includes("/rogue-session/start") || pathname?.includes("/train/app")) {
        return null;
    }

    const navLinks = [
        { name: "About", href: "/about" },
        { name: "Articles", href: "/blog" },
        { name: "Training", href: "/rogue-session" }, // Linking to the sales page part of the "Training" funnel
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="flex items-center gap-4 group">
                <Mascot size={80} variant="standard" className="group-hover:scale-105 transition-transform duration-300" />
                <span className="text-2xl md:text-3xl font-bold font-heading text-white tracking-tight">The Rogue Puffin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-lg font-medium transition-colors duration-200",
                            pathname === link.href
                                ? "text-white"
                                : "text-slate-300 hover:text-white"
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Placeholder - can be expanded later if needed */}
            <div className="md:hidden">
                {/* Simple mobile menu trigger could go here */}
            </div>
        </header>
    );
}
