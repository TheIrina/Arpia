import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
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

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role) {
    redirect("/home");
  }

  return <OnboardingClient email={email} />;
}
