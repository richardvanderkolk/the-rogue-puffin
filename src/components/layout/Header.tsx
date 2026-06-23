"use client";

import Link from "next/link";
import Image from "next/image";
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

    // Header is now visible on all routes globally to provide consistent navigation.

    const commonLinks: { name: string, href: string }[] = [
        { name: "Free Speed Test", href: "/free-test" },
        { name: "Articles", href: "/blog" },
        { name: "14-Day Bootcamp", href: "/bootcamp" }
    ];

    const authenticatedLinks = [
        { name: "Free Speed Test", href: "/free-test" },
        { name: "Reading Engine", href: "/train/app" },
        { name: "My Bootcamp", href: "/bootcamp" },
        { name: "Mastery Hub", href: "/mastery/dashboard" },
        { name: "Articles", href: "/blog" }
    ];

    const navLinks = user ? authenticatedLinks : commonLinks;

    return (
        <header className="print:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <Link href="/" className="flex items-center gap-2.5 md:gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -ml-1">
                <Mascot size={60} variant="headshot" className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-indigo-500/20" />
                <div className="relative pt-1 flex items-center">
                    <Image src="/assets/text-only.png" alt="The Rogue Puffin Learning Mastery" width={200} height={46} className="h-8 md:h-11 w-auto object-contain object-left opacity-95 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg" />
                </div>
            </Link>

            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-4 lg:gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                            "text-sm xl:text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1",
                            pathname === link.href
                                ? "text-white"
                                : "text-slate-300 hover:text-white"
                        )}
                    >
                        {link.name}
                    </Link>
                ))}

                {!user ? (
                    <div className="flex items-center gap-3 lg:gap-4 ml-2">
                        <Link href="/login" className="text-sm xl:text-base font-medium text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1">
                            Log In
                        </Link>
                        <Link href="/rogue-session/start" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm xl:text-base font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                            Start Free Training
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 lg:gap-4 ml-2">
                        <button onClick={signOut} className="text-sm xl:text-base font-medium text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-2 py-1">
                            Log Out
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
                    aria-label="Toggle mobile menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="absolute top-full left-0 right-0 py-6 px-6 bg-slate-900 border-b border-white/10 md:hidden flex flex-col items-center gap-6 shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-xl font-medium transition-colors duration-200 w-full text-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md",
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
                                className="text-xl font-medium text-slate-300 hover:text-white transition-colors duration-200 w-full text-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
                            >
                                Log In
                            </Link>
                            <Link 
                                href="/rogue-session/start"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white text-xl font-medium rounded-full transition-all active:scale-95 shadow-lg shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                Start Free Training
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <button 
                                onClick={() => {
                                    signOut();
                                    setIsMobileMenuOpen(false);
                                }} 
                                className="text-xl font-medium text-slate-300 hover:text-white transition-colors duration-200 w-full text-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
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
