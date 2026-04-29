"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface AdminBypassLinkProps {
    href: string;
    bypassHref?: string;
    className?: string;
    children: React.ReactNode;
}

export function AdminBypassLink({ href, bypassHref, className, children }: AdminBypassLinkProps) {
    const { user } = useAuth();
    const router = useRouter();
    
    // Use trim() to handle any accidental spaces during login
    const isAdmin = user?.email?.trim().toLowerCase() === 'richardvanderkolk@gmail.com' || 
                    user?.name?.trim().toLowerCase() === 'richardvanderkolk@gmail.com';

    const handleClick = (e: React.MouseEvent) => {
        if (isAdmin && bypassHref) {
            e.preventDefault();
            router.push(bypassHref);
        }
    };

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
