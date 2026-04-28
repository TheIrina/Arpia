"use client";

import React, { useRef } from "react";
import { RoldanilloMapBg } from "./map-bg";
import { useGSAP, gsap } from "../../../../lib/gsap";

export function WeatherCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create wind particles dynamically
  const particleCount = 30;
  const particles = Array.from({ length: particleCount }).map((_, i) => i);

  useGSAP(
    () => {
      const windElements = gsap.utils.toArray<HTMLElement>(".wind-particle");
      
      windElements.forEach((el) => {
        // Randomize initial position
        const setInitialState = () => {
          gsap.set(el, {
            // Distribute across a wider area to allow for continuous flow
            x: gsap.utils.random(-200, 1200),
            y: gsap.utils.random(-200, 800),
            rotation: -35, // Angle pointing towards top-right
            opacity: 0,
            scaleX: gsap.utils.random(0.4, 1.8),
          });
        };

        setInitialState();

        const duration = gsap.utils.random(3, 7);
        const delay = gsap.utils.random(0, 5);

        const tl = gsap.timeline({ 
          repeat: -1, 
          delay,
          onRepeat: () => {
            // Optional: add slight variation on repeat if desired
          } 
        });
        
        // Move diagonally (top-right)
        tl.to(el, {
          x: "+=600",
          y: "-=420", // Matches the -35deg angle roughly (tan(35) ~= 0.7)
          duration: duration,
          ease: "none",
        })
        // Fade in
        .to(el, {
          opacity: gsap.utils.random(0.3, 0.7),
          duration: duration * 0.2,
          ease: "power1.inOut",
        }, 0)
        // Fade out
        .to(el, {
          opacity: 0,
          duration: duration * 0.3,
          ease: "power1.inOut",
        }, duration * 0.7);
      });
    },
    { scope: containerRef }
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-100 md:h-125 lg:h-150 rounded-2xl bg-[#fbfbfb] overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm"
    >
      {/* Background Map Layer */}
      <RoldanilloMapBg />

      {/* Wind Particles Container */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((id) => (
          <div
            key={id}
            className="wind-particle absolute top-0 left-0 h-[1.5px] w-[80px] md:w-[120px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-[0.5px] rounded-full origin-left"
          />
        ))}
      </div>

      {/* Overlay gradient to add depth to the map */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 pointer-events-none" />

      {/* Weather Info Widget */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-1 backdrop-blur-md bg-white/60 p-5 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Live Wind Info</span>
        <div className="flex items-end gap-2 text-slate-800">
          <span className="text-4xl font-extrabold leading-none tracking-tight">16</span>
          <span className="text-sm font-semibold pb-1 text-slate-600">km/h</span>
        </div>
        <span className="text-sm text-cyan-700 font-semibold mt-1 flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          NE Flow
        </span>
      </div>
    </div>
  );
}
