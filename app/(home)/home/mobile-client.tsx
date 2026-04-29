"use client";

import dynamic from "next/dynamic";
import { MobileNavbar } from "../components/mobile-navbar";
import { MapAttribution } from "../components/map-attribution";

const MapboxMap = dynamic(() => import("../components/mapbox-map"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1e1e1e] animate-pulse" />
});

export function MobileClient() {
  return (
    <main className="h-full w-full relative">
      <MobileNavbar />
      <section className="absolute inset-0 w-full h-full z-0">
        <MapAttribution />
        <MapboxMap logoPosition="bottom-left" />
      </section>
    </main>
  );
}
