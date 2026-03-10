"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "reader" | "seller" | "library" | "admin";

interface User {
    id: string;
    username: string;
    role: Role;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string, role: Role) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for saved session in localStorage
        const savedUser = localStorage.getItem("liba_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string, role: Role): Promise<boolean> => {
        // Admin Check
        if (role === "admin") {
            if (username === "liba" && password === "1220") {
                const adminUser: User = { id: "admin-1", username, role: "admin", name: "Liba Administrator" };
                setUser(adminUser);
                localStorage.setItem("liba_user", JSON.stringify(adminUser));
                return true;
            }
            return false;
        }

        // Mock Login for other roles (accepts any for demo)
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            username,
            role,
            name: username.charAt(0).toUpperCase() + username.slice(1)
        };
        setUser(newUser);
        localStorage.setItem("liba_user", JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("liba_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
