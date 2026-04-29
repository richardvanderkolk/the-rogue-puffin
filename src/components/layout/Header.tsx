"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/Mascot";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();

    // Hide header on immersive routes if needed, or keep it consistent. 
    // For now, we'll keep it visible everywhere unless specified otherwise.
    if (pathname?.includes("/rogue-") && pathname?.includes("/start") || pathname?.includes("/train/app")) {
        return null;
    }

    const commonLinks = [
        { name: "Abridged Course", href: "/abridged" },
        { name: "Masterclass Bundle", href: "/masterclass" },
        { name: "Articles", href: "/blog" },
    ];

    const authenticatedLinks = [
        ...commonLinks,
        { name: "Training Dashboard", href: "/dashboard" },
    ];

    const navLinks = user ? authenticatedLinks : commonLinks;

    return (
        <header className="print:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                <Mascot size={80} variant="headshot" className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-indigo-500/20" />
                <div className="flex flex-col justify-center translate-y-px mt-1">
                  <span className="text-xl md:text-2xl font-bold text-white tracking-[0.15em] uppercase leading-none md:leading-none group-hover:text-indigo-400 transition-colors">THE ROGUE PUFFIN</span>
                  <span className="text-[9px] md:text-[11px] text-slate-400 font-bold tracking-[0.4em] uppercase mt-1.5 md:mt-2">LEARNING MASTERY</span>
                </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-base lg:text-lg font-medium transition-colors duration-200",
                            pathname === link.href
                                ? "text-white"
                                : "text-slate-300 hover:text-white"
                        )}
                    >
                        {link.name}
                    </Link>
                ))}

                {!user ? (
                    <div className="flex items-center gap-4 lg:gap-6 ml-2">
                        <Link href="/login" className="text-base lg:text-lg font-medium text-slate-300 hover:text-white transition-colors duration-200">
                            Log In
                        </Link>
                        <Link href="/masterclass" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-base lg:text-lg font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25">
                            Start Masterclass
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 lg:gap-6 ml-2">
                        <button onClick={signOut} className="text-base lg:text-lg font-medium text-slate-300 hover:text-white transition-colors duration-200">
                            Log Out
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-300 hover:text-white transition-colors"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 py-6 px-6 bg-slate-900 border-b border-white/10 md:hidden flex flex-col items-center gap-6 shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-xl font-medium transition-colors duration-200 w-full text-center py-2",
                                pathname === link.href
                                    ? "text-white"
                                    : "text-slate-300 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="w-full h-px bg-white/10 my-2" />

                    {!user ? (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <Link 
                                href="/login" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-medium text-slate-300 hover:text-white transition-colors duration-200 w-full text-center py-2"
                            >
                                Log In
                            </Link>
                            <Link 
                                href="/masterclass" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white text-xl font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25"
                            >
                                Start Masterclass
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <button 
                                onClick={() => {
                                    signOut();
                                    setIsMobileMenuOpen(false);
                                }} 
                                className="text-xl font-medium text-slate-300 hover:text-white transition-colors duration-200 w-full text-center py-2"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
