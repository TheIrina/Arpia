"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import { StepName } from "./sections/StepName";
import { StepRole } from "./sections/StepRole";
import { StepMapStyle } from "./sections/StepMapStyle";
import { StepInterests } from "./sections/StepInterests";
import { StepPassword } from "./sections/StepPassword";

function OnboardingManager() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email,
    name: "",
    role: "",
    mapStyle: "",
    interests: [] as string[],
    password: "",
  });

  const steps = [
    { id: "name", component: StepName },
    { id: "role", component: StepRole },
    { id: "mapStyle", component: StepMapStyle },
    { id: "interests", component: StepInterests },
    { id: "password", component: StepPassword },
  ];

  const updateData = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleFinish = async (data: { password: string }) => {
    const finalData = { ...formData, ...data };
    setIsLoading(true);
    // Simulation of saving
    console.log("Saving User Data:", finalData);
    await new Promise((r) => setTimeout(r, 2000));
    setIsLoading(false);
    router.push("/home");
  };

  const ActiveStep = steps[currentStep].component;

  // Determine side video/image based on step or role
  const getSideContent = () => {
    if (formData.role === "pilot") return "/videos/hero1.mp4";
    if (formData.role === "hiker") return "/videos/hero2.mp4";
    return "/videos/hero1.mp4";
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-sans bg-white overflow-hidden">
      {/* Multimedia Panel (Left on PC) */}
      <div className="hidden lg:flex relative w-1/2 min-h-screen p-4">
        <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-black">
          <video
            key={getSideContent()}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000"
          >
            <source src={getSideContent()} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-normal text-white uppercase tracking-tighter leading-none mb-2">
              Arpia <br /> Roldanillo
            </h2>
            <p className="text-white/60 text-sm font-light tracking-wide max-w-xs">
              Personalizing your flight and exploration experience in the best
              place in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Form Panel (Right) */}
      <div className="flex flex-col w-full lg:w-1/2 min-h-screen relative">
        {/* Header with Progress */}
        <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
          <button
            onClick={() =>
              currentStep > 0 ? setCurrentStep((c) => c - 1) : router.back()
            }
            className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full hover:bg-black transition-all shadow-sm"
            aria-label="Go back"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full transition-all duration-500 ${
                  i <= currentStep ? "bg-black" : "bg-black/10"
                }`}
              />
            ))}
          </div>
          <div className="w-10" /> {/* Spacer */}
        </header>
        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 w-full py-20 text-center">
          <div className="w-full max-w-4xl flex flex-col items-center justify-center">
            {/* @ts-ignore - Dynamic component props */}
            <ActiveStep
              onNext={updateData}
              onFinish={handleFinish}
              isLoading={isLoading}
              value={formData[steps[currentStep].id as keyof typeof formData]}
            />
          </div>
        </main>{" "}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-sans uppercase tracking-widest text-xs animate-pulse">
          Initializing Experience...
        </div>
      }
    >
      <OnboardingManager />
    </Suspense>
  );
}
