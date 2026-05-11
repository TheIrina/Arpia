"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { MapAttribution } from "../components/map-attribution";
import { DesktopNavbar } from "../components/desktop-navbar";
import { FlyDecision } from "../components/sidebar/FlyDecision";
import { LaunchSites } from "../components/sidebar/LaunchSites";
import { JeepBento } from "../components/sidebar/JeepBento";
import { ThermalForecast } from "../components/sidebar/ThermalForecast";
import { Logistics } from "../components/sidebar/Logistics";
import { PilotReports } from "../components/sidebar/PilotReports";

const MapboxMap = dynamic(() => import("../components/mapbox-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1e1e1e] animate-pulse" />
});

const PANEL_LEFT = "calc(1rem + 26.25rem + 0.75rem)";

export function DesktopClient() {
  const [servicesOpen, setServicesOpen] = useState(false);

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

      {/* Sidebar */}
      <section className="absolute left-4 top-18 bottom-4 w-105 z-20 flex flex-col gap-2.5 rounded-3xl bg-[#0a0a0a] border border-white/5 text-white/90 p-3 overflow-y-auto overflow-x-hidden shadow-2xl">
        <FlyDecision />
        <LaunchSites />
        <ThermalForecast />
        <JeepBento />
      </section>

      {/* Services: Toggle + Panel */}
      <div
        className="absolute top-18 z-20 flex flex-col gap-2.5"
        style={{ left: PANEL_LEFT }}
      >
        <button
          onClick={() => setServicesOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0a0a0a] border border-white/5 hover:bg-white/[0.03] transition-colors text-[11px] text-white/30 hover:text-white/50 cursor-pointer shadow-lg shrink-0 w-fit"
        >
          {servicesOpen ? (
            <CaretUp weight="regular" className="w-3 h-3" />
          ) : (
            <CaretDown weight="regular" className="w-3 h-3" />
          )}
          <span className="tracking-wide">Servicios</span>
        </button>

        {servicesOpen && (
          <div className="flex flex-col gap-2.5 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none w-72 rounded-3xl bg-[#0a0a0a] border border-white/5 p-3 shadow-2xl">
            <Logistics />
            <PilotReports />
          </div>
        )}
      </div>
    </main>
  );
}
