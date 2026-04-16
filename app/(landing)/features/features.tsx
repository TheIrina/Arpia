"use client";

import { useRef } from "react";
import gsap, { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SplitText } from "../components/common/split-text";
import { MapCardVisual } from "./cards/map";
import { WeatherCard } from "./cards/weather";

export const Features = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animate headline words
      const words = gsap.utils.toArray(".feature-word");
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  const headlineText =
    "Essential Tools: a complete suite for planning flights, analyzing conditions, and flying safely.";

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-black px-4 py-24 md:px-8 lg:px-12"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-16">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Left: Tags & Big Title */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            {/* Tags / Pills */}
            <div className="flex flex-wrap mb-8">
              <span className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase">
                Live Weather
              </span>
              <span className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase">
                Launch Sites
              </span>
              <span className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase">
                Thermal Maps
              </span>
            </div>

            {/* Big Headline */}
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-medium leading-[1.1] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
              <SplitText text={headlineText} wordClassName="feature-word opacity-20" />
            </h2>
          </div>

          {/* Right: Two columns of descriptive text */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-8 text-sm md:text-base text-[#5f666d] leading-relaxed font-medium pt-2 lg:pt-16">
            <div className="w-full md:w-1/2">
              <p>
                Live weather data and thermal maps are the backbone of any
                cross-country flight. Our platform aggregates real-time wind
                conditions, barometric pressure, and cloud cover to give you a
                precise read on when and where to launch. Built by pilots, for
                pilots.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p>
                We map out every certified launch site and safe landing zone in
                the region. Each location profile includes difficulty ratings,
                optimal wind orientations, and recent reviews from the local
                community, ensuring you always know what to expect before you
                arrive.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards / Gallery Section */}
        {/* Horizontal scroll container (hide scrollbar for cleaner look) */}
        <div
          className="flex overflow-x-auto gap-4 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Card 1 */}
          <div className="flex flex-col gap-4 min-w-[85vw] md:min-w-100 lg:min-w-112.5 shrink-0 snap-center">
            <WeatherCard />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-medium font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
                Live Weather Interface
              </h3>
              <p className="text-sm md:text-base text-[#5f666d]">
                Real-time wind, pressure, and cloud cover data.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-4 min-w-[85vw] md:min-w-100 lg:min-w-112.5 shrink-0 snap-center">
            <div className="w-full h-100 md:h-125 lg:h-150 rounded-2xl bg-orange-100"></div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-medium font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
                Thermal Tracking
              </h3>
              <p className="text-sm md:text-base text-[#5f666d]">
                Advanced heat mapping for cross-country routes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-4 min-w-[85vw] md:min-w-100 lg:min-w-112.5 shrink-0 snap-center">
            <div className="w-full h-100 md:h-125 lg:h-150 rounded-2xl bg-green-100"></div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-medium font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
                Site Topography
              </h3>
              <p className="text-sm md:text-base text-[#5f666d]">
                Detailed 3D models of certified launch sites.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col gap-4 min-w-[85vw] md:min-w-100 lg:min-w-112.5 shrink-0 snap-center">
            <div className="w-full h-100 md:h-125 lg:h-150 rounded-2xl bg-purple-100"></div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-medium font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
                Pilot Community
              </h3>
              <p className="text-sm md:text-base text-[#5f666d]">
                Connect with local experts and international flyers.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex flex-col gap-4 min-w-[85vw] md:min-w-100 lg:min-w-112.5 shrink-0 snap-center">
            <MapCardVisual />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-medium font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
                Roldanillo Launch Sites
              </h3>
              <p className="text-sm md:text-base text-[#5f666d]">
                Explore top launch sites and thermals around Roldanillo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
