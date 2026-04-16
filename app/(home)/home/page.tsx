"use client";

import { Navbar } from "../components/navbar";
import Link from "next/link";
import { useRef } from "react";
import gsap, { useGSAP } from "@/lib/gsap";

export default function AppHome() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Intro animation for dashboard cards
      gsap.fromTo(
        ".dashboard-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main className="min-h-screen bg-[#111111] text-white flex flex-col font-['Helvetica_Neue',Helvetica,Arial,sans-serif] selection:bg-white selection:text-black">
      <Navbar />

      <section
        ref={containerRef}
        className="flex-1 w-full pt-32 pb-20 px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto flex flex-col gap-10"
      >
        {/* Dashboard Header */}
        <div className="flex flex-col gap-4 dashboard-anim">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#d62828] animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">
              System Online
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
            Welcome back, Pilot.
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed font-medium">
            Your flight parameters are optimal. Everything is ready for a new
            route. Explore current weather conditions, manage your upcoming
            launches, and connect with the community.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full mt-4">
          {/* Main Flight Card */}
          <div className="dashboard-anim lg:col-span-2 bg-[#1a1a1a] border border-white/10 rounded-[24px] p-6 lg:p-10 flex flex-col justify-between min-h-[340px] overflow-hidden relative group">
            {/* Background topological decoration */}
            <div className="absolute top-0 right-0 w-[60%] h-full opacity-20 pointer-events-none transition-transform duration-1000 group-hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] to-transparent z-10"></div>
              {/* Fake topographic lines */}
              <div
                className="w-full h-full border border-white/20 rounded-full absolute -top-1/4 -right-1/4"
                style={{ transform: "scale(1.5)" }}
              ></div>
              <div
                className="w-full h-full border border-white/20 rounded-full absolute -top-1/4 -right-1/4"
                style={{ transform: "scale(2.2)" }}
              ></div>
              <div
                className="w-full h-full border border-white/20 rounded-full absolute -top-1/4 -right-1/4"
                style={{ transform: "scale(3.0)" }}
              ></div>
            </div>

            <div className="relative z-10">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase mb-6 inline-block backdrop-blur-md">
                Next Launch
              </span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                Roldanillo, Colombia
              </h2>
              <p className="text-sm md:text-base text-gray-400 mt-3 font-medium">
                Lat 4° 24&apos; 49&quot; N / Lon 76° 09&apos; 17&quot; W
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-12">
              <div className="flex gap-8 md:gap-12">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#5f666d] font-bold">
                    Planned Date
                  </span>
                  <span className="text-lg md:text-xl font-medium">
                    Oct 12, 08:30 AM
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#5f666d] font-bold">
                    Expected conditions
                  </span>
                  <span className="text-lg md:text-xl font-medium text-emerald-400">
                    Excellent
                  </span>
                </div>
              </div>

              <button className="bg-white text-black font-medium text-[11px] md:text-xs rounded-full px-7 py-3 md:py-3.5 hover:bg-gray-200 transition-all flex items-center gap-2 group-hover:pr-6">
                View Flight Plan
                <span className="transform transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* Live Weather Card */}
          <div className="dashboard-anim bg-[#1a1a1a] border border-white/10 rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[340px] hover:border-white/20 transition-all group">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase">
                  Live Weather
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <h3 className="text-6xl lg:text-7xl font-medium mb-3 tracking-tighter">
                18°C
              </h3>
              <p className="text-base text-gray-400 font-medium">
                Clear sky, scattered clouds
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-[#5f666d] font-bold">
                  Wind
                </span>
                <span className="text-lg font-medium">12 km/h NE</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-[#5f666d] font-bold">
                  Pressure
                </span>
                <span className="text-lg font-medium">1015 hPa</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-anim bg-[#1a1a1a] border border-white/10 rounded-[24px] p-6 lg:p-8 hover:border-white/20 transition-all flex flex-col min-h-[260px]">
            <span className="text-[10px] font-bold tracking-widest text-[#5f666d] uppercase mb-6 block">
              Quick Links
            </span>

            <div className="flex flex-col gap-3 flex-1 justify-center">
              {[
                { label: "New Flight Plan", href: "#", icon: "M12 4v16m8-8H4" },
                {
                  label: "Logbook & History",
                  href: "#",
                  icon: "M4 6h16M4 12h16m-7 6h7",
                },
                {
                  label: "Equipment Status",
                  href: "#",
                  icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
                },
                {
                  label: "Community Routes",
                  href: "#",
                  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={link.icon}
                      />
                    </svg>
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>
                  <span className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Summary Card */}
          <div className="dashboard-anim lg:col-span-2 bg-[#d62828] rounded-[24px] p-6 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between min-h-[180px] text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>

            <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
              <h3 className="text-3xl font-medium tracking-tight">
                Your Pilot Stats
              </h3>
              <p className="text-sm md:text-base text-white/80 max-w-sm font-medium leading-relaxed">
                You are in the top 15% of active pilots this month. Keep up the
                momentum.
              </p>
            </div>

            <div className="flex gap-10 mt-8 md:mt-0 relative z-10 w-full md:w-auto">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] tracking-widest uppercase text-white/70 font-bold">
                  Flight Hours
                </span>
                <span className="text-5xl font-medium tracking-tighter">
                  142
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] tracking-widest uppercase text-white/70 font-bold">
                  Launches
                </span>
                <span className="text-5xl font-medium tracking-tighter">
                  87
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
