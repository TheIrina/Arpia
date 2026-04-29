"use client";

import { useState } from "react";
import { Cloud, Tree, MapTrifold, ArrowRight } from "@phosphor-icons/react";

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
      icon: <Cloud size={32} weight="light" />,
    },
    {
      id: "tourist",
      label: "Tourist",
      desc: "I want to know the town and its people",
      icon: <Tree size={32} weight="light" />,
    },
    {
      id: "hiker",
      label: "Hiker",
      desc: "I'm looking for the best hiking routes",
      icon: <MapTrifold size={32} weight="light" />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
          What is your plan?
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left outline-none ${
              selectedRole === role.id
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg"
                : "border-black/5 bg-[#FDFDFD] text-[#1A1A1A] hover:border-black/10"
            }`}
          >
            <div
              className={`${selectedRole === role.id ? "text-white" : "text-black/40"}`}
            >
              {role.icon}
            </div>
            <div className="flex flex-col">
              <span
                className={`text-sm md:text-base font-medium ${selectedRole === role.id ? "text-white" : "text-[#1A1A1A]"}`}
              >
                {role.label}
              </span>
              <span
                className={`text-[10px] md:text-xs ${selectedRole === role.id ? "text-white/70" : "text-[#5f666d]"}`}
              >
                {role.desc}
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => selectedRole && onNext({ role: selectedRole })}
        disabled={!selectedRole}
        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white px-10 py-3.5 text-sm md:text-base hover:bg-black transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Continue
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}
