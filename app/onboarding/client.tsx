"use client";

import { Suspense } from "react";
import OnboardingContent from "./content";

export default function OnboardingClient() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-white flex items-center justify-center"></div>}>
      <OnboardingContent />
    </Suspense>
  );
}
