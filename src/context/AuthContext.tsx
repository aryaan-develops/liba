"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";

type Role = "user" | "librarian" | "seller" | "admin";

interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

interface AuthContextType {
    user: User | null;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                id: (session.user as any).id || "",
                email: session.user.email || "",
                name: session.user.name || "",
                role: (session.user as any).role || "user",
            });
        } else {
            setUser(null);
        }
    }, [session]);

    const logout = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            logout, 
            isLoading: status === "loading" 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

