"use client";

import dynamic from "next/dynamic";
import { DesktopNavbar } from "../components/desktop-navbar";
import { DesktopSidebar } from "../components/desktop-sidebar";
import { ThermalForecast } from "../components/sidebar/ThermalForecast";

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

      {/* Bottom Thermal Panel */}
      <div className="absolute bottom-4 left-[28.5rem] right-4 z-20 bg-[#0a0a0a] border border-white/5 p-2 rounded-3xl shadow-2xl pointer-events-auto">
        <ThermalForecast />
      </div>
    </main>
  );
}
