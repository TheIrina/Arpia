"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowRight, CaretLeft, Sparkle, Wind, MapTrifold } from "@phosphor-icons/react";
import gsap, { useGSAP } from "@/lib/gsap";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepIntro({ onNext, onBack }: StepProps) {
  const [slide, setSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isAnimating = useRef(false);

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

  const goToSlide = useCallback(
    (index: number, direction: "left" | "right" = "right") => {
      if (isAnimating.current || index < 0 || index >= slides.length) return;
      isAnimating.current = true;

      const xOffset = direction === "right" ? -20 : 20;

      // Animate out current content
      gsap.to(".slide-content", {
        opacity: 0,
        x: -xOffset,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setSlide(index);
          // Animate in new content
          gsap.fromTo(
            ".slide-content",
            { opacity: 0, x: xOffset },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                isAnimating.current = false;
              },
            },
          );
        },
      });
    },
    [slides.length],
  );

  const nextSlide = useCallback(() => {
    if (slide < slides.length - 1) {
      goToSlide(slide + 1, "right");
    } else {
      onNext();
    }
  }, [slide, slides.length, goToSlide, onNext]);

  const prevSlide = useCallback(() => {
    if (slide > 0) {
      goToSlide(slide - 1, "left");
    }
  }, [slide, goToSlide]);

  // Touch event handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]?.clientX ?? 0;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left -> next slide
        nextSlide();
      } else {
        // Swipe right -> prev slide
        prevSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[slide]!;

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto h-full lg:gap-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button - only on first slide */}
      {slide === 0 && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full hover:bg-zinc-900 transition-all shadow-sm"
          aria-label="Go back"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
      )}

      {/* Visual Concept Area */}
      <div
        className={`w-full lg:w-1/2 aspect-square max-h-[35vh] lg:max-h-[500px] rounded-[2.5rem] ${currentSlide.color} flex items-center justify-center overflow-hidden relative shadow-sm border border-black/[0.03] mb-8 lg:mb-0`}
      >
        <div className="slide-content flex flex-col items-center gap-6">
          {currentSlide.icon}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-8 w-full lg:w-1/2 text-center lg:text-left h-full">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="slide-content flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#1A1A1A]">
              {currentSlide.title}
            </h1>
            <p className="text-base md:text-lg text-black/60 font-light tracking-wide leading-relaxed max-w-md mx-auto lg:mx-0">
              {currentSlide.desc}
            </p>
          </div>

          {/* Dots */}
          <div className="flex gap-2 justify-center lg:justify-start">
            {slides.map((slideItem, i) => (
              <button
                key={slideItem.title}
                onClick={() => goToSlide(i, i > slide ? "right" : "left")}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-black" : "w-1.5 bg-black/10"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Area */}
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
