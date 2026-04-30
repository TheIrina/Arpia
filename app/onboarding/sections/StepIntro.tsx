"use client";

import { useState } from "react";
import { ArrowRight, Sparkle, Wind, MapTrifold } from "@phosphor-icons/react";

interface StepProps {
  onNext: () => void;
}

export function StepIntro({ onNext }: StepProps) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Discover Roldanillo",
      desc: "Fly and explore the world's best paragliding spot with real-time thermal tracking.",
      icon: <Wind size={48} weight="light" className="text-black/20" />,
      color: "bg-zinc-50",
    },
    {
      title: "Master the Skies",
      desc: "Hyper-local weather data and airspace safety tools at your fingertips.",
      icon: <Sparkle size={48} weight="light" className="text-black/20" />,
      color: "bg-zinc-50",
    },
    {
      title: "Join the Community",
      desc: "Connect with pilots and hikers, share routes, and conquer yourself.",
      icon: <MapTrifold size={48} weight="light" className="text-black/20" />,
      color: "bg-zinc-50",
    },
  ];

  const nextSlide = () => {
    if (slide < slides.length - 1) {
      setSlide((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const currentSlide = slides[slide]!;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto h-full lg:gap-20">
      {/* Visual Concept Area - Fixed height on mobile, flexible on desktop */}
      <div
        className={`w-full lg:w-1/2 aspect-square max-h-[35vh] lg:max-h-[500px] rounded-[2.5rem] ${currentSlide.color} flex items-center justify-center transition-colors duration-500 overflow-hidden relative shadow-sm border border-black/[0.03] mb-8 lg:mb-0`}
      >
        <div
          key={slide}
          className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center gap-6"
        >
          {currentSlide.icon}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-8 w-full lg:w-1/2 text-center lg:text-left h-full">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div
            key={`text-${slide}`}
            className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]">
              {currentSlide.title}
            </h1>
            <p className="text-base md:text-lg text-black/60 font-light tracking-wide leading-relaxed max-w-md mx-auto lg:mx-0">
              {currentSlide.desc}
            </p>
          </div>

          {/* Dots - Positioned above button on mobile, below text on desktop */}
          <div className="flex gap-2 justify-center lg:justify-start">
            {slides.map((slideItem, i) => (
              <div
                key={slideItem.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-black" : "w-1.5 bg-black/10"}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Area - Fixed/Floating bottom on mobile, inline on desktop */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent lg:relative lg:p-0 lg:bg-none lg:mt-12">
          <button
            onClick={nextSlide}
            className="w-full lg:w-fit lg:px-12 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white py-4 text-sm md:text-base hover:bg-zinc-900 transition-all font-medium shadow-xl lg:shadow-none"
          >
            {slide === slides.length - 1 ? "Get Started" : "Continue"}
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
