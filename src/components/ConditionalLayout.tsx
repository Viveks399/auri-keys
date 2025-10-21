"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuriLoader from "@/components/AuriLoader";
import { useInitialLoader } from "@/hooks/useInitialLoader";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { showLoader, isLoading } = useInitialLoader();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith("/admin");

  // If it's an admin page, don't show Header and Footer
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Show loader and prevent main content from rendering
  if (showLoader) {
    return <AuriLoader isLoading={isLoading} />;
  }

  // For all other pages, show Header and Footer
  return (
    <>
      <Header />
      <div className="relative">
        <main className="main-content">{children}</main>
        <Footer />
      </div>
    </>
  );
}
