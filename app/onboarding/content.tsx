"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
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

type StepId = "name" | "role" | "mapStyle" | "interests" | "password";

interface StepRendererProps {
  stepId: StepId | undefined;
  formData: OnboardingData;
  isLoading: boolean;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onFinish: (data?: { password: string }) => void;
}

function StepRenderer({ stepId, formData, isLoading, onUpdate, onFinish }: StepRendererProps) {
  switch (stepId) {
    case "name":
      return <StepName value={formData.name} onNext={(data) => onUpdate(data)} />;
    case "role":
      return <StepRole value={formData.role} onNext={(data) => onUpdate(data as Partial<OnboardingData>)} />;
    case "mapStyle":
      return <StepMapStyle value={formData.mapStyle} onNext={(data) => onUpdate(data)} />;
    case "interests":
      return <StepInterests value={formData.interests} onNext={(data) => onUpdate(data)} />;
    case "password":
      return <StepPassword isLoading={isLoading} onFinish={onFinish} />;
    default:
      return null;
  }
}

export default function OnboardingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

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

  const steps = useMemo(() => [
    { id: "name" as const },
    { id: "role" as const },
    { id: "mapStyle" as const },
    { id: "interests" as const },
    { id: "password" as const },
  ], []);

  const updateData = (newData: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleFinish = async (data?: { password: string }) => {
    if (data?.password) {
      setFormData(prev => ({ ...prev, password: "" }));
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    router.push("/home");
  };

  const sideContent = formData.role === "hiker" ? "/videos/hero2.mp4" : "/videos/hero1.mp4";

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-sans bg-white overflow-hidden">
      <div className="hidden lg:flex relative w-1/2 min-h-screen p-4">
        <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-zinc-950">
          <video key={sideContent} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000">
            <source src={sideContent} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-normal text-white uppercase tracking-tighter leading-none mb-2">Arpia <br /> Roldanillo</h2>
            <p className="text-white/60 text-sm font-light tracking-wide max-w-xs">Personalizing your flight and exploration experience in the best place in the world.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 min-h-screen relative">
        <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
          <button onClick={() => currentStep > 0 ? setCurrentStep((c) => c - 1) : router.back()} className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full hover:bg-zinc-950 transition-all shadow-sm" aria-label="Go back">
            <CaretLeft size={20} weight="bold" />
          </button>
          <div className="flex gap-1.5">
            {steps.map((step, i) => (
              <div key={step.id} className={`h-1 w-8 rounded-full transition-all duration-500 ${i <= currentStep ? "bg-zinc-950" : "bg-zinc-950/10"}`} />
            ))}
          </div>
          <div className="w-10" />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 w-full py-20 text-center">
          <div className="w-full max-w-4xl flex flex-col items-center justify-center">
            <StepRenderer
              stepId={steps[currentStep]?.id}
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
