"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Features = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animate headline words
      const words = gsap.utils.toArray(".feature-word");
      gsap.to(words, {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: true,
        },
      });

      // Animate pills fading in
      gsap.from(".feature-pill", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Animate paragraphs fading up
      gsap.from(".feature-paragraph", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // Animate cards fading in from right
      gsap.from(".feature-card", {
        x: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-cards-container",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  const headlineText =
    "Essential Tools: a complete suite for planning flights, analyzing conditions, and flying safely.";

  const renderWords = (text: string) => {
    const wordsArray = text.split(" ");
    return wordsArray.map((word, index) => (
      <span key={index} className="inline-block">
        <span className="feature-word opacity-20">{word}</span>
        {index < wordsArray.length - 1 && <span>&nbsp;</span>}
      </span>
    ));
  };

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
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="feature-pill px-4 py-1.5 rounded-full border border-gray-300 text-xs font-semibold tracking-wide uppercase">
                Live Weather
              </span>
              <span className="feature-pill px-4 py-1.5 rounded-full border border-gray-300 text-xs font-semibold tracking-wide uppercase">
                Launch Sites
              </span>
              <span className="feature-pill px-4 py-1.5 rounded-full border border-gray-300 text-xs font-semibold tracking-wide uppercase">
                Thermal Maps
              </span>
            </div>

            {/* Big Headline */}
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-medium leading-[1.1] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
              {renderWords(headlineText)}
            </h2>
          </div>

          {/* Right: Two columns of descriptive text */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-8 text-sm md:text-base text-gray-800 leading-relaxed font-medium pt-2 lg:pt-16">
            <div className="w-full md:w-1/2 feature-paragraph">
              <p>
                Live weather data and thermal maps are the backbone of any
                cross-country flight. Our platform aggregates real-time wind
                conditions, barometric pressure, and cloud cover to give you a
                precise read on when and where to launch. Built by pilots, for
                pilots.
              </p>
            </div>
            <div className="w-full md:w-1/2 feature-paragraph">
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
          className="feature-cards-container flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Card 1 */}
          <div className="feature-card min-w-[85vw] md:min-w-100 lg:min-w-112.5 h-100 md:h-125 lg:h-150 rounded-2xl bg-blue-100 shrink-0 snap-center flex items-end p-8"></div>

          {/* Card 2 */}
          <div className="feature-card min-w-[85vw] md:min-w-100 lg:min-w-112.5 h-100 md:h-125 lg:h-150 rounded-2xl bg-orange-100 shrink-0 snap-center flex items-end p-8"></div>

          {/* Card 3 */}
          <div className="feature-card min-w-[85vw] md:min-w-100 lg:min-w-112.5 h-100 md:h-125 lg:h-150 rounded-2xl bg-green-100 shrink-0 snap-center flex items-end p-8"></div>

          {/* Card 4 */}
          <div className="feature-card min-w-[85vw] md:min-w-100 lg:min-w-112.5 h-100 md:h-125 lg:h-150 rounded-2xl bg-purple-100 shrink-0 snap-center flex items-end p-8"></div>
        </div>
      </div>
    </section>
  );
};
