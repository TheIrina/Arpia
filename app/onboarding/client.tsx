"use client";

import OnboardingContent from "./content";

export default function OnboardingClient({ email }: { email: string }) {
  return <OnboardingContent email={email} />;
}
