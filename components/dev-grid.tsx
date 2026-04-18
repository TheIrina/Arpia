"use client";

import { useState, useEffect } from "react";

export function DevGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only works in development mode
    if (process.env.NODE_ENV !== "development") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Shift + G
      if (e.shiftKey && e.key.toLowerCase() === "g") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Avoid hydration mismatch and don't render in production
  if (!isMounted || process.env.NODE_ENV !== "development" || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none w-full h-full flex flex-col justify-between">
      {/* 8px Baseline Grid - Horizontal lines (Framer rhythm style) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 255, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "100% 8px"
        }}
      />
      
      {/* Vertical Columns Layout Grid (12-Column Standard) */}
      <div className="relative mx-auto w-full h-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3 lg:gap-4 h-full">
          {Array.from({ length: 12 }).map((_, i) => {
            let visibilityClass = "";
            // i >= 8: only show on lg+ (items 9-12)
            if (i >= 8) visibilityClass = "hidden lg:block";
            // i >= 4: show on md+ (items 5-8)
            else if (i >= 4) visibilityClass = "hidden md:block";
            
            return (
              <div 
                key={i} 
                className={`bg-[#d62828]/10 border-x border-[#d62828]/20 h-full ${visibilityClass}`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Toast Notification indicating grid is active */}
      <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full border border-white/10 shadow-lg backdrop-blur-sm flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        Layout Grid Overlay
      </div>
    </div>
  );
}
