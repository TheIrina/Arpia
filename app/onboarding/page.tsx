import { Metadata } from "next";
import { Suspense } from "react";
import OnboardingClient from "./client";

export const metadata: Metadata = {
  title: "Onboarding - Arpia",
  description: "Personaliza tu experiencia de vuelo y exploración en Arpia.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OnboardingPage({ searchParams }: Props) {
  const params = await searchParams;
  const email = typeof params?.email === "string" ? params.email : "";

  return <OnboardingClient email={email} />;
}
