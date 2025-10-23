"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuriLoader from "@/components/AuriLoader";
import { useCarouselLoading } from "@/contexts/CarouselLoadingContext";
import { useState, useEffect } from "react";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [minDurationReached, setMinDurationReached] = useState(false);
  const { carouselImagesLoaded } = useCarouselLoading();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith("/admin");

  // Ensure minimum duration for loading screen (1.5 seconds)
  useEffect(() => {
    const minDurationTimer = setTimeout(() => {
      setMinDurationReached(true);
    }, 3500); // 1.5 seconds minimum

    return () => clearTimeout(minDurationTimer);
  }, []);

  // Hide loading screen when both conditions are met
  useEffect(() => {
    if (carouselImagesLoaded && minDurationReached) {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setShowLoadingScreen(false);
      }, 300);
    }
  }, [carouselImagesLoaded, minDurationReached]);

  // Fallback timer to ensure loading screen doesn't stay forever
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 5000); // 5 second fallback

    return () => clearTimeout(fallbackTimer);
  }, []);

  // If it's an admin page, don't show Header and Footer
  if (isAdminPage) {
    return <>{children}</>;
  }

  // For all other pages, show Header and Footer
  return (
    <>
      {/* Full page loading screen */}
      {showLoadingScreen && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <AuriLoader isLoading={true} />
        </div>
      )}
      
      <Header />
      <div className="relative">
        <main className="main-content">{children}</main>
        <Footer />
      </div>
    </>
  );
}
