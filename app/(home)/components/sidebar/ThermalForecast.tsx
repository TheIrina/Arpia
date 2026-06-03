"use client";

import { useState, useEffect } from "react";
import { ThermalData } from "@/lib/weather";
import { useFlightPlanStore } from "@/store/flight-plan-store";

export function ThermalForecast({ data }: { data: ThermalData }) {
  const { maxClimbRate, forecast } = data;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Determine default active index:
  // Show the current hour if we are inside the 10h-17h window,
  // otherwise default to the peak thermal hour (highest rate) for optimal planning
  const currentHour = new Date().getHours();
  const currentHourStr = `${currentHour}h`;
  const defaultIndex = (() => {
    const matchedIdx = forecast.findIndex((f) => f.time === currentHourStr);
    if (matchedIdx !== -1) return matchedIdx;
    
    // Default to the peak thermal hour
    let peakIdx = 0;
    let maxRate = -1;
    forecast.forEach((f, idx) => {
      if (f.rate > maxRate) {
        maxRate = f.rate;
        peakIdx = idx;
      }
    });
    return peakIdx;
  })();

  const activeIndex = hoveredIndex !== null ? hoveredIndex : defaultIndex;
  const activeItem = forecast[activeIndex] ?? forecast[0] ?? { time: "", rate: 0, cloudbase: 0, temp: 0, cloudcover: 0, windSpeed: 0, windDirection: "" };
  const isHovered = hoveredIndex !== null;

  const setSelectedHour = useFlightPlanStore((s) => s.setSelectedHour);

  useEffect(() => {
    const item = forecast[activeIndex];
    if (item) {
      const hr = parseInt(item.time.replace("h", ""), 10);
      if (!isNaN(hr)) {
        setSelectedHour(hr);
      }
    }
  }, [activeIndex, forecast, setSelectedHour]);

  const rates = forecast.map((f) => f.rate);
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);
  const rateRange = maxRate - minRate || 1.0;

  // Calculate SVG coordinates for the 8 points (from 10h to 17h)
  // Clamped nicely between [12, 50] inside viewBox 100x65 for premium amplitude
  const points = forecast.map((f, i) => {
    const x = (i / (forecast.length - 1)) * 100;
    const y = 50 - ((f.rate - minRate) / rateRange) * 38; // Dynamic vertical range in [12, 50]
    return { x, y };
  });

  // Calculate tangents/slopes using Fritsch-Butland Monotone Cubic Spline
  const n = points.length;
  const secants: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const p1 = points[i + 1]!;
    const p0 = points[i]!;
    const dx = p1.x - p0.x;
    secants.push((p1.y - p0.y) / (dx || 1));
  }

  const m: number[] = new Array(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    const s0 = secants[i - 1]!;
    const s1 = secants[i]!;
    if (s0 * s1 > 0) {
      m[i] = (2 * s0 * s1) / (s0 + s1); // Harmonic mean for monotone interpolation
    } else {
      m[i] = 0; // Local extremum
    }
  }

  if (n > 1) {
    // Start endpoint
    const s0 = secants[0]!;
    m[0] = (3 * s0 - m[1]!) / 2;
    if (m[0] * s0 < 0) {
      m[0] = 0;
    } else if (Math.abs(m[0]) > 3 * Math.abs(s0)) {
      m[0] = 3 * s0;
    }

    // End endpoint
    const sN = secants[n - 2]!;
    m[n - 1] = (3 * sN - m[n - 2]!) / 2;
    if (m[n - 1]! * sN < 0) {
      m[n - 1] = 0;
    } else if (Math.abs(m[n - 1]!) > 3 * Math.abs(sN)) {
      m[n - 1] = 3 * sN;
    }
  }

  // Smooth Bezier Curve Path generator via Hermite-to-Bezier conversion
  // Generates a gorgeous, mathematically natural monotone spline curve (Shadcn style)
  const strokePath = (() => {
    if (points.length === 0) return "";
    let d = `M ${points[0]!.x} ${points[0]!.y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]!;
      const p1 = points[i + 1]!;
      const dx = p1.x - p0.x;
      
      const cp1x = p0.x + dx / 3;
      const cp1y = p0.y + (m[i]! * dx) / 3;
      
      const cp2x = p1.x - dx / 3;
      const cp2y = p1.y - (m[i + 1]! * dx) / 3;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return d;
  })();

  const areaPath = `${strokePath} L 100 65 L 0 65 Z`;

  const activePoint = points[activeIndex] ?? points[0] ?? { x: 0, y: 0 };

  return (
    <div className="w-full flex items-stretch gap-6 h-[115px] px-6 py-2">
      {/* Left/Center: Premium Custom SVG Area Chart */}
      <div className="flex-1 flex flex-col justify-end h-full px-6 border-b border-white/10 pb-1 relative group/chart">
        {/* SVG Canvas */}
        <div className="w-full h-[65px] relative mb-1.5">
          {/* Crisp 1px Vertical Guideline (Non-distorted CSS) */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none transition-all duration-300 ease-out -translate-x-1/2"
            style={{ left: `${activePoint.x}%` }}
          />
          <svg
            className="w-full h-full overflow-hidden"
            viewBox="0 0 100 65"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
              </linearGradient>
            </defs>

            {/* Baseline */}
            <line
              x1="0"
              y1="63"
              x2="100"
              y2="63"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="0.75"
            />

            {/* Area under curve */}
            <path
              d={areaPath}
              fill="url(#area-gradient)"
              className="transition-all duration-300 ease-out"
            />

            {/* Stroke path */}
            <path
              d={strokePath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>

        {/* Timeline Hour Labels */}
        <div className="w-full flex justify-between h-4">
          {forecast.map((f, i) => {
            const isActive = i === activeIndex;
            const isBaseCurrent = i === defaultIndex;

            return (
              <span
                key={f.time}
                className={[
                  "text-[10px] tabular-nums tracking-widest font-medium transition-colors duration-300",
                  isActive
                    ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
                    : isBaseCurrent
                      ? "text-white/70"
                      : "text-white/40",
                ].join(" ")}
              >
                {f.time}
              </span>
            );
          })}
        </div>

        {/* High-Accuracy Hover Overlay Touch Targets */}
        <div className="absolute inset-0 flex items-stretch px-6 pb-6 z-10">
          {forecast.map((f, i) => (
            <div
              key={f.time}
              className="flex-1 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Stacked Telemetry Data */}
      <div className="w-56 border-l border-white/10 pl-6 flex flex-col justify-between py-0.5 shrink-0 text-left">
        {/* Top half: Ascenso */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 justify-start w-full">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Ascenso
            </span>
            <span className="text-[9px] tracking-wide uppercase text-white/30 font-semibold transition-all duration-300">
              {isHovered
                ? `${activeItem.temp}°C · ${activeItem.cloudcover}% Nub`
                : `Máx ${data.maxClimbRate} M/S`}
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-light text-white tracking-tighter leading-none transition-all duration-200">
              {activeItem.rate.toFixed(1)}
            </span>
            <span className="text-[10px] text-white/60 font-semibold tracking-wider leading-none">
              M/S
            </span>
          </div>
        </div>

        {/* Subtle Horizontal Sep */}
        <div className="w-full border-t border-white/5 my-1" />

        {/* Bottom half: Base Nubes */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 justify-start w-full">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Base Nubes
            </span>
            <span className="text-[9px] tracking-wide uppercase text-white/30 font-semibold transition-all duration-300">
              {isHovered
                ? `Vto ${activeItem.windSpeed} km/h ${activeItem.windDirection}`
                : "Roldanillo"}
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-light text-white tracking-tighter leading-none transition-all duration-200">
              {activeItem.cloudbase.toLocaleString()}
            </span>
            <span className="text-[10px] text-white/60 font-semibold tracking-wider leading-none">
              M
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
