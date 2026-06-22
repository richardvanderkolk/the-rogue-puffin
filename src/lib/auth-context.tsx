"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface User {
    id: string;
    email: string;
    isPro: boolean;
    name: string;
    beforeWpm?: number;
    afterWpm?: number;
    subscription_status?: string;
    subscription_tier?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    upgradeToPro: () => void;
    updateStats: (stats: { beforeWpm?: number; afterWpm?: number }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Sync with Supabase Auth state dynamically
        const syncSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('full_name, has_paid_bootcamp')
                        .eq('id', session.user.id)
                        .maybeSingle();

                    setUser({
                        id: session.user.id,
                        email: session.user.email || "",
                        isPro: profile?.has_paid_bootcamp || false,
                        name: profile?.full_name || session.user.email || "Student",
                    });
                } else {
                    const storedUser = localStorage.getItem("rogue_user");
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        setUser(null);
                    }
                }
            } catch (e) {
                console.error("Auth sync error:", e);
            } finally {
                setLoading(false);
            }
        };

        syncSession();

        // Listen for authentication changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, has_paid_bootcamp')
                    .eq('id', session.user.id)
                    .maybeSingle();

                setUser({
                    id: session.user.id,
                    email: session.user.email || "",
                    isPro: profile?.has_paid_bootcamp || false,
                    name: profile?.full_name || session.user.email || "Student",
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser: User = {
            id: "mock-user-" + Date.now().toString(),
            email: email,
            isPro: true,
            name: email,
            beforeWpm: 0,
            afterWpm: 0,
        };

        setUser(mockUser);
        localStorage.setItem("rogue_user", JSON.stringify(mockUser));
        setLoading(false);
        router.push("/dashboard");
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem("rogue_user");
        router.push("/");
    };

    const upgradeToPro = () => {
        if (user) {
            const updatedUser = { ...user, isPro: true };
            setUser(updatedUser);
            localStorage.setItem("rogue_user", JSON.stringify(updatedUser));
        }
    };

    const updateStats = (stats: { beforeWpm?: number; afterWpm?: number }) => {
        if (user) {
            const updatedUser = { ...user, ...stats };
            setUser(updatedUser);
            localStorage.setItem("rogue_user", JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, upgradeToPro, updateStats }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
