"use client";

import { ArrowRight } from "@phosphor-icons/react";

interface StepProps {
  onNext: () => void;
}

export function StepIntro({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-4 text-center max-w-lg">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[#1A1A1A]">
          Welcome to Arpia
        </h1>
        <p className="text-base md:text-lg text-black/60 font-light tracking-wide">
          Personalize your flight and exploration experience in the best place in the world. Let&apos;s get started.
        </p>
      </div>

      <button
        onClick={onNext}
        className="flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white px-10 py-3.5 text-sm md:text-base hover:bg-zinc-950 transition-all"
      >
        Begin Experience
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}
