"use client";

import { useEffect, useRef } from "react";

interface ViewTrackerProps {
    path: string;
    title: string;
    category: string;
}

export function ViewTracker({ path, title, category }: ViewTrackerProps) {
    const hasTracked = useRef(false);

    useEffect(() => {
        // We use a ref to prevent React StrictMode from firing tracking twice in development seamlessly
        if (!hasTracked.current) {
            hasTracked.current = true;
            fetch('/api/views', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path, title, category })
            }).catch(() => {
                // We deliberately swallow catching errors to ensure this zero-impact tracker 
                // never disrupts the core user experience or triggers boundary failures.
            }); 
        }
    }, [path, title, category]);

    return null; 
}
