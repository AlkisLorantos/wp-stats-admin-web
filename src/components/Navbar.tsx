"use client";

import Link from "next/link";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="w-full px-6 py-4 bg-gray-900 text-white flex items-center justify-between shadow">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-white">
          WP Stats
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/analytics" className="hover:text-blue-300">
            Analytics
            </Link>
            <Link href="/roster" className="hover:text-blue-300">
              Roster
            </Link>
            <Link href="/games" className="hover:text-blue-300">
              Games
            </Link>
            <Link href="/presets" className="hover:text-blue-300">
              Roster Presets
            </Link>
          </>
        )}
      </div>

      {isAuthenticated && (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}