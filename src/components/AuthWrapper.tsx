"use client";

import { AuthProvider, useAuth } from "@/components/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/login" && pathname !== "/signup") {
      router.push("/"); // redirect to public landing page
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) return <p>Loading session...</p>;

  return <>{children}</>;
}