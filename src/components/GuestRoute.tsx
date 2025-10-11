"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/authUtils";

interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * GuestRoute - Redirects authenticated users to dashboard
 * Use this for login/signup pages
 */
export default function GuestRoute({
  children,
  redirectTo = "/admin/dashboard",
}: GuestRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authed = isAuthenticated();

      if (authed) {
        // Already logged in, redirect to dashboard
        window.location.href = redirectTo;
      } else {
        setIsGuest(true);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [redirectTo]);

  if (isChecking || !isGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
