"use client";

import dynamic from "next/dynamic";
import { DesktopNavbar } from "../components/desktop-navbar";
import { DesktopSidebar } from "../components/desktop-sidebar";

const MapboxMap = dynamic(() => import("../components/mapbox-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1e1e1e] animate-pulse" />,
});

export function DesktopClient() {
  return (
    <main className="h-full w-full relative overflow-hidden bg-zinc-950">
      {/* Background Map */}
      <section className="absolute inset-0 w-full h-full z-0">
        <MapboxMap logoPosition="bottom-right" />
      </section>

      {/* Top Floating Navbar */}
      <div className="absolute top-4 left-0 w-full px-4 z-30 pointer-events-auto">
        <DesktopNavbar />
      </div>

      <DesktopSidebar />
    </main>
  );
}
