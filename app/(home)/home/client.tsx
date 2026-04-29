"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { MobileClient } from "./mobile-client";
import { DesktopClient } from "./desktop-client";

export default function AppHomeClient() {
  return (
    <div className="h-screen w-screen bg-white text-black overflow-hidden font-sans selection:bg-black selection:text-white">
      {/* Mobile View */}
      <div className="md:hidden w-full h-full">
        <MobileClient />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full h-full">
        <DesktopClient />
      </div>
    </div>
  );
}
