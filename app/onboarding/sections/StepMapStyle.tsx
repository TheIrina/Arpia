"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

interface StepProps {
  onNext: (data: { mapStyle: string }) => void;
  value: string;
}

export function StepMapStyle({ onNext, value }: StepProps) {
  const [selectedStyle, setSelectedStyle] = useState(value || "");

  const styles = [
    { id: "light", label: "Light", img: "/videos/hero1-poster.avif" },
    { id: "dark", label: "Dark", img: "/videos/hero2-poster.avif" },
    {
      id: "satellite",
      label: "Satellite Streets",
      img: "/videos/hero1-poster.avif",
    },
    { id: "outdoors", label: "Outdoors", img: "/logo/para.avif" },
  ];

  return (
    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
          Choose your map style
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {styles.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => setSelectedStyle(style.id)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl transition-all outline-none shadow-sm"
          >
            <img
              src={style.img}
              alt={style.label}
              className="h-full w-full object-cover"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Selection Ring (Always on top) */}
            <div
              className={`absolute inset-0 transition-all rounded-2xl ${
                selectedStyle === style.id
                  ? "ring-4 ring-inset ring-[#1A1A1A] bg-black/5"
                  : "group-hover:ring-2 group-hover:ring-inset group-hover:ring-black/10"
              }`}
            />

            <span className="absolute bottom-6 left-6 text-base md:text-lg font-medium text-white tracking-tight z-20">
              {style.label}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => selectedStyle && onNext({ mapStyle: selectedStyle })}
        disabled={!selectedStyle}
        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white px-10 py-3.5 text-sm md:text-base hover:bg-black transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Continue
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}
