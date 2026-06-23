"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useState, useEffect } from "react";

interface AdminBypassLinkProps {
    href: string;
    bypassHref?: string;
    className?: string;
    children: React.ReactNode;
}

export function AdminBypassLink({ href, bypassHref, className, children }: AdminBypassLinkProps) {
    const { user } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const isAdmin = isMounted && (
        user?.email?.toLowerCase()?.includes('richard') || 
        user?.name?.toLowerCase()?.includes('richard')
    );

    const finalHref = (isAdmin && bypassHref) ? bypassHref : href;

    return (
        <Link href={finalHref} className={className}>
            {children}
        </Link>
    );
}
