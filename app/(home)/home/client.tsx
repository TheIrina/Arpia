"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { MobileClient } from "./mobile-client";
import { DesktopClient } from "./desktop-client";
import { useFlightPlanStore } from "@/store/flight-plan-store";
import { WeatherData } from "@/lib/weather";

export default function AppHomeClient({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const setBaseConditions = useFlightPlanStore((s) => s.setBaseConditions);
  const setForecastItems = useFlightPlanStore((s) => s.setForecastItems);

  useEffect(() => {
    if (weatherData) {
      setBaseConditions(weatherData.flyConditions);
      setForecastItems(weatherData.thermalData.forecast);
    }
  }, [weatherData, setBaseConditions, setForecastItems]);

  return (
    <div className="h-screen w-screen bg-white text-black overflow-hidden font-sans selection:bg-zinc-950 selection:text-white">
      {/* Mobile View */}
      <div className="md:hidden w-full h-full">
        <MobileClient />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block w-full h-full">
        <DesktopClient weatherData={weatherData} />
      </div>
    </div>
  );
}
