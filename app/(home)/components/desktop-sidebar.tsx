"use client";

import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { FlyDecision } from "./sidebar/FlyDecision";
import { LaunchSites } from "./sidebar/LaunchSites";
import { JeepBento } from "./sidebar/JeepBento";
import { ThermalForecast } from "./sidebar/ThermalForecast";
import { Logistics } from "./sidebar/Logistics";
import { PilotReports } from "./sidebar/PilotReports";

const PANEL_LEFT = "calc(1rem + 26.25rem + 0.75rem)";

export function DesktopSidebar() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <section data-lenis-prevent className="absolute left-4 top-18 bottom-4 w-105 z-20 rounded-3xl bg-[#0a0a0a] border border-white/5 text-white/90 p-3 overflow-y-auto overflow-x-hidden shadow-2xl">
        <div className="flex flex-col gap-2.5 h-max">
          <FlyDecision />
          <LaunchSites />
          <ThermalForecast />
          <JeepBento />
        </div>
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
          <div data-lenis-prevent className="max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none w-72 rounded-3xl bg-[#0a0a0a] border border-white/5 p-3 shadow-2xl">
            <div className="flex flex-col gap-2.5 h-max">
              <Logistics />
              <PilotReports />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
