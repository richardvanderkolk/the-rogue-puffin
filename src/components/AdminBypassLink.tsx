"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

interface AdminBypassLinkProps {
    href: string;
    bypassHref?: string;
    className?: string;
    children: React.ReactNode;
}

export function AdminBypassLink({ href, bypassHref, className, children }: AdminBypassLinkProps) {
    const { user } = useAuth();
    const isAdmin = user?.email?.toLowerCase() === 'richardvanderkolk@gmail.com' || user?.name?.toLowerCase() === 'richardvanderkolk@gmail.com';

    const finalHref = (isAdmin && bypassHref) ? bypassHref : href;

    return (
        <Link href={finalHref} className={className}>
            {children}
        </Link>
    );
}
