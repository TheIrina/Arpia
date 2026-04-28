import type { Metadata } from "next";
import AppHomeClient from "./client";

export const metadata: Metadata = {
  title: "Dashboard | Arpia",
  description:
    "Your pilot dashboard — view flight plans, live weather, stats, and connect with the paragliding community.",
};

export default function AppHomePage() {
  return <AppHomeClient />;
}
