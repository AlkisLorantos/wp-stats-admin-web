// DashboardLayout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`bg-gray-900 text-white w-64 p-5 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
                <h2 className="text-xl font-bold">Dashboard</h2>
                <nav className="mt-5 space-y-2">
                    <Link href="/dashboard/games" className="block px-4 py-2 rounded hover:bg-gray-700">Games</Link>
                    <Link href="/dashboard/teams" className="block px-4 py-2 rounded hover:bg-gray-700">Teams</Link>
                    <Link href="/dashboard/players" className="block px-4 py-2 rounded hover:bg-gray-700">Players</Link>
                    <Link href="/dashboard/analysis" className="block px-4 py-2 rounded hover:bg-gray-700">Analysis</Link>
                </nav>
            </aside>
            
            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-700 px-2 py-1 border rounded">
                        ☰
                    </button>
                    <div className="text-gray-700">User Profile</div>
                </header>
                <main className="p-6 flex-1 overflow-auto">{children}</main>
            </div>
            
        </div>
    );
}
