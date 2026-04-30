"use client";

import React, { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap, { useGSAP } from "@/lib/gsap";
import { CaretLeft } from "@phosphor-icons/react";
import { StepIntro } from "./sections/StepIntro";
import { StepName } from "./sections/StepName";
import { StepRole } from "./sections/StepRole";
import { StepMapStyle } from "./sections/StepMapStyle";
import { StepInterests } from "./sections/StepInterests";
import { StepPassword } from "./sections/StepPassword";

type Role = "pilot" | "hiker" | "";
type OnboardingData = {
  email: string;
  name: string;
  role: Role;
  mapStyle: string;
  interests: string[];
  password: "";
};

type StepId = "intro" | "name" | "role" | "mapStyle" | "interests" | "password";

interface StepRendererProps {
  stepId: StepId | undefined;
  formData: OnboardingData;
  isLoading: boolean;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onFinish: (data?: { password: string }) => void;
}

function StepRenderer({
  stepId,
  formData,
  isLoading,
  onUpdate,
  onFinish,
}: StepRendererProps) {
  switch (stepId) {
    case "intro":
      return <StepIntro onNext={() => onUpdate({})} />;
    case "name":
      return (
        <StepName value={formData.name} onNext={(data) => onUpdate(data)} />
      );
    case "role":
      return (
        <StepRole
          value={formData.role}
          onNext={(data) => onUpdate(data as Partial<OnboardingData>)}
        />
      );
    case "mapStyle":
      return (
        <StepMapStyle
          value={formData.mapStyle}
          onNext={(data) => onUpdate(data)}
        />
      );
    case "interests":
      return (
        <StepInterests
          value={formData.interests}
          onNext={(data) => onUpdate(data)}
        />
      );
    case "password":
      return <StepPassword isLoading={isLoading} onFinish={onFinish} />;
    default:
      return null;
  }
}

export default function OnboardingContent({ email = "" }: { email?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Fade out the black curtain to reveal the onboarding content
      gsap.to(".entrance-curtain", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.1,
      });
    },
    { scope: containerRef },
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<OnboardingData>(() => ({
    email,
    name: "",
    role: "",
    mapStyle: "",
    interests: [],
    password: "",
  }));

  const steps = useMemo(
    () => [
      { id: "intro" as const },
      { id: "name" as const },
      { id: "role" as const },
      { id: "mapStyle" as const },
      { id: "interests" as const },
      { id: "password" as const },
    ],
    [],
  );

  const updateData = (newData: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleFinish = async (data?: { password: string }) => {
    if (data?.password) {
      setFormData((prev) => ({ ...prev, password: "" }));
    }

    // Save map style to localStorage
    if (formData.mapStyle) {
      localStorage.setItem("arpia_map_style", formData.mapStyle);
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    router.push("/home");
  };

  const currentStepId = steps[currentStep]?.id;

  return (
    <div ref={containerRef} className="flex flex-col w-full min-h-screen font-sans bg-white">
      {/* Entrance transition curtain */}
      <div className="entrance-curtain fixed inset-0 bg-[#0A0A0A] z-[100] pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center relative w-full">
        <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
          {currentStepId !== "intro" ? (
            <button
              onClick={() =>
                currentStep > 0 ? setCurrentStep((c) => c - 1) : router.back()
              }
              className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full hover:bg-zinc-900 transition-all shadow-sm"
              aria-label="Go back"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
          ) : (
            <div className="w-10" />
          )}

          {currentStepId !== "intro" && (
            <div className="flex gap-1.5">
              {steps
                .filter((s) => s.id !== "intro")
                .map((step) => {
                  const stepIndex = steps.findIndex((s) => s.id === step.id);
                  return (
                    <div
                      key={step.id}
                      className={`h-1 w-8 rounded-full transition-all duration-500 ${stepIndex <= currentStep ? "bg-zinc-950" : "bg-zinc-950/10"}`}
                    />
                  );
                })}
            </div>
          )}

          <div className="w-10" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 w-full py-12 md:py-16 text-center">
          <div className="w-full max-w-4xl flex flex-col items-center justify-center">
            <StepRenderer
              stepId={currentStepId}
              formData={formData}
              isLoading={isLoading}
              onUpdate={updateData}
              onFinish={handleFinish}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
