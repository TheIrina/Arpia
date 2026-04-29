"use client";

import { Suspense } from "react";
import OnboardingContent from "./content";

export default function OnboardingClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans uppercase tracking-widest text-xs animate-pulse">Initializing Experience...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
