"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Render an empty button that reserves the exact same space
    // to prevent any layout shift, even before hydration.
    if (!mounted) {
        return (
            <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors" aria-label="Loading Theme">
                <span className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-white animate-spin"></span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg"
            title="Toggle Reading Mode"
            aria-label="Toggle Reading Mode"
        >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}
