"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface User {
    id: string;
    email?: string | null;
    isPro: boolean;
    name?: string | null;
    beforeWpm?: number;
    afterWpm?: number;
    subscription_status?: string;
    subscription_tier?: string;
    bootcamp_progress_day?: number;
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

export function AuthProvider({ children, serverUser }: { children: ReactNode; serverUser?: User | null }) {
    const [user, setUser] = useState<User | null>(serverUser || null);
    const [loading, setLoading] = useState(!serverUser);
    const router = useRouter();

    useEffect(() => {
        let subscription: any = null;

        // Sync with Supabase Auth state dynamically
        const syncSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    let profile = null;
                    try {
                        const { data } = await supabase
                            .from('profiles')
                            .select('full_name, has_paid_bootcamp, subscription_status, subscription_tier, bootcamp_progress_day')
                            .eq('id', session.user.id)
                            .maybeSingle();
                        profile = data;
                    } catch (profileErr) {
                        console.error("Failed to fetch profile in syncSession:", profileErr);
                    }

                    setUser({
                        id: session.user.id,
                        email: session.user.email || "",
                        isPro: profile?.has_paid_bootcamp || false,
                        name: profile?.full_name || session.user.email || "Student",
                        subscription_status: profile?.subscription_status || undefined,
                        subscription_tier: profile?.subscription_tier || undefined,
                        bootcamp_progress_day: profile?.bootcamp_progress_day || undefined,
                    });
                } else {
                    const isDev = process.env.NODE_ENV === 'development';
                    const storedUser = isDev ? localStorage.getItem("rogue_user") : null;
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        // Keep serverUser as fallback rather than clearing it if client client auth is blocked
                        if (!serverUser) {
                            setUser(null);
                        }
                    }
                }
            } catch (e) {
                console.error("Auth sync error:", e);
            } finally {
                setLoading(false);
            }
        };

        const initAuth = async () => {
            try {
                await syncSession();
            } catch (err) {
                console.error("syncSession initialization failed:", err);
                setLoading(false);
            }

            try {
                // Listen for authentication changes (login, logout, token refresh)
                const res = supabase.auth.onAuthStateChange(async (event, session) => {
                    try {
                        if (session?.user) {
                            let profile = null;
                            try {
                                const { data } = await supabase
                                    .from('profiles')
                                    .select('full_name, has_paid_bootcamp, subscription_status, subscription_tier, bootcamp_progress_day')
                                    .eq('id', session.user.id)
                                    .maybeSingle();
                                profile = data;
                            } catch (profileErr) {
                                console.error("Failed to fetch profile in onAuthStateChange:", profileErr);
                            }

                            setUser({
                                id: session.user.id,
                                email: session.user.email || "",
                                isPro: profile?.has_paid_bootcamp || false,
                                name: profile?.full_name || session.user.email || "Student",
                                subscription_status: profile?.subscription_status || undefined,
                                subscription_tier: profile?.subscription_tier || undefined,
                                bootcamp_progress_day: profile?.bootcamp_progress_day || undefined,
                            });
                        } else {
                            const isDev = process.env.NODE_ENV === 'development';
                            const storedUser = isDev ? localStorage.getItem("rogue_user") : null;
                            if (storedUser) {
                                setUser(JSON.parse(storedUser));
                            } else {
                                if (!serverUser) {
                                    setUser(null);
                                }
                            }
                        }
                    } catch (e) {
                        console.error("onAuthStateChange callback error:", e);
                    } finally {
                        setLoading(false);
                    }
                });

                if (res && res.data) {
                    subscription = res.data.subscription;
                }
            } catch (listenerErr) {
                console.error("Failed to register onAuthStateChange listener:", listenerErr);
                setLoading(false);
            }
        };

        initAuth();

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [serverUser]);

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
        try {
            await supabase.auth.signOut();
        } catch (e) {
            console.error("SignOut error:", e);
        }
        setUser(null);
        localStorage.removeItem("rogue_user");
        window.location.href = "/";
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
