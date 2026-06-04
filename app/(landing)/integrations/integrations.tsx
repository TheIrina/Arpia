"use client";

import React, { useRef, useEffect, useState } from "react";
import { DotLoader } from "../components/dots";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  curvature?: number;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  id: string;
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0.4,
  duration = 3.5,
  delay = 0,
  pathColor = "#1a1a1a",
  pathWidth = 1.5,
  pathOpacity = 0.4,
  gradientStartColor = "#ffffff",
  gradientStopColor = "#ffffff",
  id,
}: AnimatedBeamProps) => {
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      const controlX = startX + (endX - startX) * curvature;
      const path = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;
      setPathD(path);
    };

    updatePath();

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    window.addEventListener("resize", updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop
            offset="30%"
            stopColor={gradientStartColor}
            stopOpacity="0.85"
          />
          <stop offset="70%" stopColor={gradientStopColor} stopOpacity="0.85" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Background line */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        fill="none"
      />
      {/* Light beam pulse */}
      <path
        d={pathD}
        stroke={`url(#grad-${id})`}
        strokeWidth={pathWidth + 0.5}
        strokeLinecap="round"
        fill="none"
        strokeDasharray="40 180"
        className="animate-pulse-flow"
        style={{
          animation: `pulse-flow ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
  );
};

const VERTICAL_WIND_FRAMES = [
  [32, 33],
  [26, 27, 31, 34],
  [20, 21, 25, 28, 30, 35],
  [14, 15, 19, 22, 24, 29],
  [8, 9, 13, 16, 18, 23],
  [2, 3, 7, 10, 12, 17],
  [1, 4, 6, 11],
  [0, 5],
  [],
  [],
];

export const Integrations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Left side refs
  const garminRef = useRef<HTMLDivElement>(null);
  const varioRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLDivElement>(null);

  // Center ref
  const arpiaRef = useRef<HTMLDivElement>(null);

  // Right side refs
  const xcontestRef = useRef<HTMLDivElement>(null);
  const stravaRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full bg-black text-white px-4 py-24 md:px-8 lg:px-12 overflow-hidden">
      <style jsx global>{`
        @keyframes pulse-flow {
          0% {
            stroke-dashoffset: 220;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12 md:gap-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <p className="showcase-subtitle text-sm md:text-base tracking-wide uppercase text-[#CCCCCC] mb-4">
            Connected Cockpit
          </p>
          <h2 className="showcase-title text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-tighter mb-4">
            Unified flight data. <br />
            Connecting all your gear.
          </h2>
          <p className="text-sm md:text-base text-[#CCCCCC] leading-relaxed max-w-md">
            Arpia bridges instruments, meteorology, and flight logs
            automatically into one centralized cockpit dashboard.
          </p>
        </div>

        {/* Animated Beam Diagram Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto grid grid-cols-3 items-center justify-center py-12 px-4 select-none min-h-[420px]"
        >
          {/* Animated Beams (All pure white) */}
          <AnimatedBeam
            id="garmin-arpia"
            containerRef={containerRef}
            fromRef={garminRef}
            toRef={arpiaRef}
            gradientStartColor="#ffffff"
            gradientStopColor="#ffffff"
            duration={3}
          />
          <AnimatedBeam
            id="vario-arpia"
            containerRef={containerRef}
            fromRef={varioRef}
            toRef={arpiaRef}
            gradientStartColor="#ffffff"
            gradientStopColor="#ffffff"
            duration={3}
            delay={0.8}
            curvature={0}
          />
          <AnimatedBeam
            id="files-arpia"
            containerRef={containerRef}
            fromRef={fileRef}
            toRef={arpiaRef}
            gradientStartColor="#ffffff"
            gradientStopColor="#ffffff"
            duration={3.2}
            delay={0.4}
          />

          <AnimatedBeam
            id="arpia-xcontest"
            containerRef={containerRef}
            fromRef={arpiaRef}
            toRef={xcontestRef}
            gradientStartColor="#ffffff"
            gradientStopColor="#ffffff"
            duration={2.8}
            delay={0.2}
          />
          <AnimatedBeam
            id="arpia-strava"
            containerRef={containerRef}
            fromRef={arpiaRef}
            toRef={stravaRef}
            gradientStartColor="#ffffff"
            gradientStopColor="#ffffff"
            duration={3}
            delay={1.0}
            curvature={0}
          />
          <AnimatedBeam
            id="arpia-live"
            containerRef={containerRef}
            fromRef={arpiaRef}
            toRef={liveRef}
            gradientStartColor="#ffffff"
            gradientStopColor="#ffffff"
            duration={3.4}
            delay={0.6}
          />

          {/* LEFT COLUMN: Inputs */}
          <div className="flex flex-col gap-10 justify-center h-full z-10 pr-2 md:pr-0">
            {/* GPS Instruments */}
            <div className="flex items-center gap-3 md:gap-4 justify-end group">
              <div className="text-right hidden sm:block">
                <div className="text-xs md:text-sm font-semibold text-white">
                  GPS Instruments
                </div>
                <div className="text-[10px] text-[#CCCCCC]">
                  Garmin, Oudie & Syride
                </div>
              </div>
              <div
                ref={garminRef}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.04)]"
              >
                <svg
                  className="w-5 h-5 text-white/80 transition-colors group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
            </div>

            {/* Bluetooth Vario */}
            <div className="flex items-center gap-3 md:gap-4 justify-end group">
              <div className="text-right hidden sm:block">
                <div className="text-xs md:text-sm font-semibold text-white">
                  BLE Variometers
                </div>
                <div className="text-[10px] text-[#CCCCCC]">
                  XC Tracer & Sensors
                </div>
              </div>
              <div
                ref={varioRef}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.04)]"
              >
                <svg
                  className="w-5 h-5 text-white/80 transition-colors group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>

            {/* IGC File Uploads */}
            <div className="flex items-center gap-3 md:gap-4 justify-end group">
              <div className="text-right hidden sm:block">
                <div className="text-xs md:text-sm font-semibold text-white">
                  File Uploads
                </div>
                <div className="text-[10px] text-[#CCCCCC]">
                  .IGC & .GPX Formats
                </div>
              </div>
              <div
                ref={fileRef}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.04)]"
              >
                <svg
                  className="w-5 h-5 text-white/80 transition-colors group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Core (Dot Loader) */}
          <div className="flex justify-center items-center h-full z-10">
            <div
              ref={arpiaRef}
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border border-neutral-900 flex items-center justify-center z-20 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
            >
              {/* Radial glow pulse */}
              <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse-slow" />
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-850 flex items-center justify-center text-center">
                {/* Dot Loader Core */}
                <DotLoader
                  frames={VERTICAL_WIND_FRAMES}
                  duration={120}
                  activeDotClassName="bg-white"
                  inactiveDotClassName="bg-white/10"
                  dotSizeClassName="w-[2.2px] h-[2.2px] md:w-[2.8px] md:h-[2.8px]"
                  gapClassName="gap-px"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Outputs */}
          <div className="flex flex-col gap-10 justify-center h-full z-10 pl-2 md:pl-0">
            {/* XC Competitions */}
            <div className="flex items-center gap-3 md:gap-4 justify-start group">
              <div
                ref={xcontestRef}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.04)]"
              >
                <svg
                  className="w-5 h-5 text-white/80 transition-colors group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs md:text-sm font-semibold text-white">
                  XC Championships
                </div>
                <div className="text-[10px] text-[#CCCCCC]">
                  XContest & Leonardo
                </div>
              </div>
            </div>

            {/* Strava Sync */}
            <div className="flex items-center gap-3 md:gap-4 justify-start group">
              <div
                ref={stravaRef}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.04)]"
              >
                <svg
                  className="w-5 h-5 text-white/80 transition-colors group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs md:text-sm font-semibold text-white">
                  Strava Sync
                </div>
                <div className="text-[10px] text-[#CCCCCC]">
                  Activities & 3D Tracks
                </div>
              </div>
            </div>

            {/* Safety Retrieve */}
            <div className="flex items-center gap-3 md:gap-4 justify-start group">
              <div
                ref={liveRef}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.04)]"
              >
                <svg
                  className="w-5 h-5 text-white/80 transition-colors group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs md:text-sm font-semibold text-white">
                  Live Tracking & Rescue
                </div>
                <div className="text-[10px] text-[#CCCCCC]">
                  WhatsApp & Telegram Coordinates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
