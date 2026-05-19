import type { Metadata } from "next";
import AppHomeClient from "./client";

export const metadata: Metadata = {
  title: "Dashboard | Arpia",
  description:
    "Your pilot dashboard — view flight plans, live weather, stats, and connect with the paragliding community.",
};

import { getWeatherData } from "@/lib/weather";

export default async function AppHomePage() {
  const weatherData = await getWeatherData();
  return <AppHomeClient weatherData={weatherData} />;
}
