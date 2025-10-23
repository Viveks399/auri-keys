import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { CarouselLoadingProvider } from "@/contexts/CarouselLoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Auri Keys",
  description: "Real Estate Properties - Website Under Maintenance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${manrope.variable} antialiased`} suppressHydrationWarning={true}>
        <CarouselLoadingProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </CarouselLoadingProvider>
      </body>
    </html>
  );
}
