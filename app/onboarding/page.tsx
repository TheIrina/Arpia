import { Metadata } from "next";
import { Suspense } from "react";
import OnboardingClient from "./client";

export const metadata: Metadata = {
  title: "Onboarding - Arpia",
  description: "Personaliza tu experiencia de vuelo y exploración en Arpia.",
};

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-sans uppercase tracking-widest text-xs animate-pulse">
          Initializing Experience...
        </div>
      }
    >
      <OnboardingClient />
    </Suspense>
  );
}
