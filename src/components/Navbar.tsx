"use client";

import { useAuth } from "./AuthContext";

export default function Navbar() {
    const { logout, isAuthenticated } = useAuth();

    return (
        <nav className="w-full p-4 bg-gray-900 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">Water Polo Stats</h1>
            {isAuthenticated && (
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            )}
        </nav>
    );
}
