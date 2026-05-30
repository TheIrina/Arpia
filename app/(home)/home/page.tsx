import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getWeatherData } from "@/lib/weather";
import AppHomeClient from "./client";

export const metadata: Metadata = {
  title: "Dashboard | Arpia",
  description:
    "Your pilot dashboard — view flight plans, live weather, stats, and connect with the paragliding community.",
};

export default async function AppHomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  if (!session.user.role) {
    redirect("/onboarding");
  }

  const weatherData = await getWeatherData();
  return <AppHomeClient weatherData={weatherData} />;
}
