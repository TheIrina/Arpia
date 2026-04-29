"use client";

import dynamic from "next/dynamic";
import { MapAttribution } from "../components/map-attribution";
import { DesktopNavbar } from "../components/desktop-navbar";

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
      <section className="absolute left-4 top-18 bottom-4 w-105 z-20 flex flex-col rounded-3xl bg-[#0a0a0a] border border-white/5 text-white/90 p-1 overflow-y-auto overflow-x-hidden scrollbar-none shadow-2xl">
        {/* Unified Bento Grid Layout */}
        <div className="flex-1 grid grid-cols-4 gap-1 font-light auto-rows-max">
          {/* Top Stats Row (4 items, 1 col each) */}
          <div className="col-span-1 bg-white/5 rounded-3xl py-3 px-2 flex flex-row justify-center items-center gap-1.5">
            <span className="font-normal text-white text-[11px]">15km/h</span>
            <span className="text-white text-[11px]">Viento</span>
          </div>
          <div className="col-span-1 bg-white/5 rounded-3xl py-3 px-2 flex flex-row justify-center items-center gap-1.5">
            <span className="font-normal text-white text-[11px]">SE</span>
            <span className="text-white text-[11px]">Dir</span>
          </div>
          <div className="col-span-1 bg-white/5 rounded-3xl py-3 px-2 flex flex-row justify-center items-center gap-1.5">
            <span className="font-normal text-white text-[11px]">1.8k</span>
            <span className="text-white text-[11px]">Nubes</span>
          </div>
          <div className="col-span-1 bg-white/5 rounded-3xl py-3 px-2 flex flex-row justify-center items-center gap-1.5">
            <span className="font-normal text-white text-[11px]">28°C</span>
            <span className="text-white text-[11px]">Temp</span>
          </div>

          {/* Online / Offline Status (2 items, 2 cols each) */}
          <div className="col-span-2 bg-white/5 rounded-3xl p-5 relative">
            <div className="w-2 h-2 rounded-full bg-green-500 absolute top-5 left-5 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <div className="text-[11px] text-white mb-1">Aguaclara</div>
                <div className="text-2xl font-light text-white">Abierto</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white/5 rounded-3xl p-5 relative">
            <div className="w-2 h-2 rounded-full bg-yellow-500 absolute top-5 left-5 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <div className="text-[11px] text-white mb-1">Los Tanques</div>
                <div className="text-2xl font-light text-white">Lleno</div>
              </div>
            </div>
          </div>

          {/* Operational Efficiency (1 item, 4 cols) */}
          <div className="col-span-4 bg-white/5 rounded-3xl p-5 relative group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-white">Calidad Térmica (XC)</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-5xl font-light text-white">85</span>
              <span className="text-sm text-white pb-1">%</span>
            </div>
            {/* Dummy Chart Placeholder */}
            <div className="h-20 w-full relative border-b border-white/10 flex items-end mt-4">
              {/* Decorative zig-zag line */}
              <svg
                className="w-full h-full absolute inset-0 text-white/30"
                preserveAspectRatio="none"
                viewBox="0 0 100 40"
              >
                <path
                  d="M0,30 L10,20 L20,25 L30,10 L40,15 L50,30 L60,20 L70,5 L80,10 L90,20 L100,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                {/* Points */}
                <circle
                  cx="30"
                  cy="10"
                  r="1.5"
                  fill="currentColor"
                  className="text-white"
                />
                <circle
                  cx="70"
                  cy="5"
                  r="1.5"
                  fill="currentColor"
                  className="text-white"
                />
              </svg>
              {/* X Axis Labels */}
              <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[9px] text-white px-1">
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>
            <div className="h-5"></div>
          </div>

          {/* Individual Vehicle Cards (2 items, 2 cols each) */}
          <div className="col-span-2 bg-white/5 rounded-3xl p-4 relative group cursor-pointer hover:bg-white/10 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white">Jeeps al Despegue</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <div className="text-[9px] text-white/60 mb-4">
                Desde el Parque Principal
              </div>
            </div>

            <div className="h-12 w-full bg-zinc-950/20 rounded-md mb-4 flex items-center justify-center relative">
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="text-sm font-medium text-white">08:30 AM</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[9px] text-white">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                <span>Operando</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <span>Cupos: 4</span>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-white/5 rounded-3xl p-4 relative group cursor-pointer hover:bg-white/10 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white">Radio & Rescate</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <div className="text-[9px] text-white/60 mb-4">
                Frecuencia Local VHF
              </div>
            </div>

            <div className="h-12 w-full bg-zinc-950/20 rounded-md mb-4 flex items-center justify-center relative">
              <span className="text-lg text-white font-medium tracking-wider">
                147.400 <span className="text-[10px] text-white/60">MHz</span>
              </span>
            </div>

            <div className="flex justify-between items-center text-[9px] text-white">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                <span>SOS</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <span>+57 320 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
