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
    if (pathname?.includes("/rogue-session/start") || pathname?.includes("/rogue-memory-session/start") || pathname?.includes("/train/app")) {
        return null;
    }

    const commonLinks = [
        { name: "Articles", href: "/blog" },
    ];

    const authenticatedLinks = [
        ...commonLinks,
        { name: "Dashboard", href: "/dashboard" },
    ];

    const navLinks = user ? authenticatedLinks : commonLinks;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                <Mascot size={80} variant="standard" className="w-12 h-12 md:w-20 md:h-20 p-1.5 md:p-2 group-hover:scale-105 transition-transform duration-300" />
                <span className="text-xl md:text-3xl font-bold font-heading text-white tracking-tight">The Rogue Puffin</span>
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
                        <Link href="/rogue-session/start" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-base lg:text-lg font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25">
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

                {/* Theme Toggle */}
                <div className="ml-2 lg:ml-4 pl-4 border-l border-white/10 dark:border-white/10">
                    <ThemeToggle />
                </div>
            </nav>

            {/* Mobile Menu Toggle & Theme */}
            <div className="flex items-center gap-4 md:hidden">
                <ThemeToggle />
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
                                href="/rogue-session/start" 
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
