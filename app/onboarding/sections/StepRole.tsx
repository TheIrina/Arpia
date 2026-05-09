"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";

interface StepProps {
  onNext: (data: { role: string }) => void;
  value: string;
}

export function StepRole({ onNext, value }: StepProps) {
  const [selectedRole, setSelectedRole] = useState(value || "");

  const roles = [
    {
      id: "pilot",
      label: "Pilot",
      desc: "I'm here to fly in Roldanillo",
      img: "/logo/paraglider-backpack.png",
    },
    {
      id: "tourist",
      label: "Tourist",
      desc: "I want to know the town and its people",
      img: "/logo/hat.png",
    },
    {
      id: "hiker",
      label: "Hiker",
      desc: "I'm looking for the best hiking routes",
      img: "/logo/hiking-boots.png",
    },
    {
      id: "beginner",
      label: "Beginner",
      desc: "I want to try paragliding for the first time",
      img: "/logo/baby-pacifier.png",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
          What is your plan?
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-4xl px-2 md:px-0">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className={`flex flex-col items-center justify-center gap-3 md:gap-4 p-5 md:p-6 min-h-45 md:min-h-55 rounded-2xl transition-all text-center outline-none border ${
              selectedRole === role.id
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                : "border-black/3 bg-zinc-50 text-[#1A1A1A] hover:border-black/10"
            }`}
          >
            <Image
              src={role.img}
              alt={role.label}
              width={64}
              height={64}
              className="object-contain w-16 h-16 md:w-20 md:h-20"
              quality={100}
              priority
            />
            <div className="flex flex-col">
              <span
                className={`text-base md:text-lg font-medium ${selectedRole === role.id ? "text-white" : "text-[#1A1A1A]"}`}
              >
                {role.label}
              </span>
              <span
                className={`text-xs md:text-sm mt-1 ${selectedRole === role.id ? "text-white/70" : "text-[#5f666d]"}`}
              >
                {role.desc}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent lg:relative lg:p-0 lg:bg-none lg:mt-12">
        <button
          type="button"
          onClick={() => selectedRole && onNext({ role: selectedRole })}
          disabled={!selectedRole}
          className="w-full lg:w-fit lg:px-12 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white py-4 text-sm md:text-base hover:bg-zinc-950 transition-all disabled:opacity-20 disabled:cursor-not-allowed font-medium shadow-xl lg:shadow-none"
        >
          Continue
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
