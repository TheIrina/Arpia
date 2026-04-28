import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "./(landing)/components/lenis-provider";
import { ArpiaCookieBanner } from "./(landing)/components/legal/client-banner";
import { DevGrid } from "@/components/dev-grid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arpia | Elevating the paragliding experience",
  description: "A dedicated platform for paragliding enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-300 selection:bg-cyan-500/30">
        <LenisProvider>{children}</LenisProvider>
        <ArpiaCookieBanner />
        <DevGrid />{" "}
      </body>
    </html>
  );
}
