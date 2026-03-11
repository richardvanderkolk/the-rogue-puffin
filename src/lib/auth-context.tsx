"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    isPro: boolean;
    name: string;
    beforeWpm?: number;
    afterWpm?: number;
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
        // Check local storage for "fake" session
        const storedUser = localStorage.getItem("rogue_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = async (email: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser: User = {
            id: "mock-user-" + Date.now().toString(),
            email: email,
            isPro: true,
            name: email, // In the new flow, we will just pass their chosen username into the 'email' param for simplicity
            beforeWpm: 0,
            afterWpm: 0,
        };

        setUser(mockUser);
        localStorage.setItem("rogue_user", JSON.stringify(mockUser));
        setLoading(false);
        router.push("/dashboard");
    };

    const signOut = async () => {
        setUser(null);
        localStorage.removeItem("rogue_user");
        router.push("/");
    };

    const upgradeToPro = () => {
        if (user) {
            const updatedUser = { ...user, isPro: true };
            setUser(updatedUser);
            localStorage.setItem("rogue_user", JSON.stringify(updatedUser)); // Persist pro status
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
