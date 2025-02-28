"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const userData = await loginUser(username, password);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("apiKey", userData.apiKey);
            setUser(userData);
            setIsAuthenticated(true);
            router.push("/dashboard"); // Redirect after login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("apiKey");
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth():AuthContextType {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}