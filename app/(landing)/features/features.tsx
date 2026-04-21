"use client";

import { useRef } from "react";
import gsap, { useGSAP } from "@/lib/gsap";
import { SplitText } from "../components/common/split-text";
import dynamic from "next/dynamic";
const MapCardVisual = dynamic(() => import("./cards/map").then(mod => mod.MapCardVisual), { ssr: false });
const WeatherCard = dynamic(() => import("./cards/weather").then(mod => mod.WeatherCard), { ssr: false });

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
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-12">
          {/* Left: Tags & Big Title */}
          <div className="col-span-1 md:col-span-8 lg:col-span-5 flex flex-col items-start">
            {/* Tags / Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-gray-950 text-white text-[10px] md:text-xs font-semibold tracking-wide uppercase">
                Live Weather
              </span>
              <span className="px-4 py-1.5 rounded-full bg-gray-950 text-white text-[10px] md:text-xs font-semibold tracking-wide uppercase">
                Launch Sites
              </span>
              <span className="px-4 py-1.5 rounded-full bg-gray-950 text-white text-[10px] md:text-xs font-semibold tracking-wide uppercase">
                Thermal Maps
              </span>
            </div>

            {/* Big Headline */}
            <h2 className="text-4xl md:text-5xl xl:text-[4rem] font-medium leading-[1.05] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
              <SplitText text={headlineText} wordClassName="feature-word opacity-20" />
            </h2>
          </div>

          {/* Right: Text 1 */}
          <div className="col-span-1 md:col-span-4 lg:col-start-7 lg:col-span-3 text-sm md:text-base text-[#5f666d] leading-relaxed font-medium pt-2 lg:pt-24">
            <p>
              Live weather data and thermal maps are the backbone of any
              cross-country flight. Our platform aggregates real-time wind
              conditions, barometric pressure, and cloud cover to give you a
              precise read on when and where to launch. Built by pilots, for
              pilots.
            </p>
          </div>

          {/* Right: Text 2 */}
          <div className="col-span-1 md:col-span-4 lg:col-start-10 lg:col-span-3 text-sm md:text-base text-[#5f666d] leading-relaxed font-medium pt-2 lg:pt-24">
            <p>
              We map out every certified launch site and safe landing zone in
              the region. Each location profile includes difficulty ratings,
              optimal wind orientations, and recent reviews from the local
              community, ensuring you always know what to expect before you
              arrive.
            </p>
          </div>
        </div>

        {/* Bottom Cards / Gallery Section */}
        <div
          className="flex overflow-x-auto gap-2 md:gap-3 lg:gap-4 pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Card 1 */}
          <div className="flex flex-col gap-4 w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(41.666667%-9.333px)] shrink-0 snap-start">
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
          <div className="flex flex-col gap-4 w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(41.666667%-9.333px)] shrink-0 snap-start">
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
          <div className="flex flex-col gap-4 w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(41.666667%-9.333px)] shrink-0 snap-start">
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
          <div className="flex flex-col gap-4 w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(41.666667%-9.333px)] shrink-0 snap-start">
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
          <div className="flex flex-col gap-4 w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(41.666667%-9.333px)] shrink-0 snap-start">
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
