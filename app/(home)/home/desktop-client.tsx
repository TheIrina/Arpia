"use client";

import dynamic from "next/dynamic";
import { MapAttribution } from "../components/map-attribution";
import { DesktopNavbar } from "../components/desktop-navbar";
import { FlyDecision } from "../components/sidebar/FlyDecision";
import { LaunchSites } from "../components/sidebar/LaunchSites";
import { ThermalForecast } from "../components/sidebar/ThermalForecast";
import { Logistics } from "../components/sidebar/Logistics";
import { PilotReports } from "../components/sidebar/PilotReports";

const MapboxMap = dynamic(() => import("../components/mapbox-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1e1e1e] animate-pulse" />
});

export function DesktopClient() {
  return (
    <main className="h-full w-full relative overflow-hidden bg-zinc-950">
      {/* Background Map */}
      <section className="absolute inset-0 w-full h-full z-0">
        <MapAttribution />
        <MapboxMap logoPosition="bottom-right" />
      </section>

      {/* Top Floating Navbar */}
      <div className="absolute top-4 left-4 z-30 pointer-events-auto">
        <DesktopNavbar />
      </div>

      {/* Solid Dark Sidebar (Floating Below Navbar) */}
      <section className="absolute left-4 top-18 bottom-4 w-105 z-20 flex flex-col gap-2.5 rounded-3xl bg-[#0a0a0a] border border-white/5 text-white/90 p-3 overflow-y-auto overflow-x-hidden scrollbar-none shadow-2xl">
        {/* Zone 1: Fly/No-Fly Decision */}
        <FlyDecision />

        {/* Zone 2: Launch Sites */}
        <LaunchSites />

        {/* Zone 3: Thermal Forecast */}
        <ThermalForecast />

        {/* Zone 4: Logistics (Jeeps + Radio + Emergency) */}
        <Logistics />

        {/* Zone 5: Community Reports */}
        <PilotReports />
      </section>
    </main>
  );
}
