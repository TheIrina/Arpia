"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

interface StepProps {
  onNext: (data: { interests: string[] }) => void;
  value: string[];
}

export function StepInterests({ onNext, value }: StepProps) {
  const [selected, setSelected] = useState<string[]>(value || []);

  const interests = [
    { id: "takeoffs", label: "Takeoffs" },
    { id: "landings", label: "Landings" },
    { id: "events", label: "Events" },
    { id: "hiking", label: "Hiking" },
    { id: "food", label: "Gastronomy" },
    { id: "hotels", label: "Accommodation" },
    { id: "transport", label: "Transport" },
    { id: "shops", label: "Local Shops" },
  ];

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
          Your Interests
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {interests.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all text-sm font-medium border ${
              selected.includes(item.id)
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                : "border-black/3 bg-zinc-50 text-[#1A1A1A] hover:border-black/10"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 lg:mt-12">
        <button
          onClick={() => onNext({ interests: selected })}
          className="w-full lg:w-fit lg:px-12 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white py-4 text-sm md:text-base hover:bg-zinc-950 transition-all font-medium shadow-xl lg:shadow-none"
        >
          Continue
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
