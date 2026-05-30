"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap, { useGSAP } from "@/lib/gsap";

const items = [
  {
    title: "Live Weather",
    description:
      "Real-time wind speed, direction, and barometric pressure at every site.",
    bg: "bg-[#E8F4F8]",
    icon: "/logo/hat.png",
    span: "col-span-1 md:col-span-4 lg:col-span-5 row-span-1",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Thermal Maps",
    description:
      "AI-powered thermal predictions for optimal cross-country routing.",
    bg: "bg-[#FFF3E0]",
    icon: "/logo/paraglider-backpack.png",
    span: "col-span-1 md:col-span-4 lg:col-span-7 row-span-1",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Flight Logger",
    description: "Track every flight with GPS, altitude profiles, and replay.",
    bg: "bg-[#F3E5F5]",
    icon: "/logo/para.png",
    span: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Launch Sites",
    description:
      "Certified sites with wind orientation, difficulty ratings, and reviews.",
    bg: "bg-[#E8F5E9]",
    icon: "/logo/hiking-boots.png",
    span: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Pilot Community",
    description:
      "Connect with local experts and international flyers worldwide.",
    bg: "bg-[#FBE9E7]",
    icon: "/logo/clo.png",
    span: "col-span-1 md:col-span-4 lg:col-span-4 row-span-1",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
];

export const ProductShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      gsap.from(".showcase-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".showcase-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          delay: 0.1 * i,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-black px-4 py-24 md:px-8 lg:px-12"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12 md:gap-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-x-4">
          <div className="col-span-1 md:col-span-8 lg:col-span-6">
            <p className="showcase-subtitle text-sm md:text-base tracking-wide uppercase text-[#5f666d] mb-4">
              Our product
            </p>
            <h2 className="showcase-title text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.05] tracking-tighter">
              Everything you need to fly smarter, safer, and together.
            </h2>
          </div>
          <div className="col-span-1 md:col-span-8 lg:col-start-8 lg:col-span-5 flex items-end mt-6 lg:mt-0">
            <p className="text-sm md:text-base text-[#5f666d] leading-relaxed">
              From pre-flight planning to post-flight analysis, Arpia gives
              pilots a single, integrated cockpit for every phase of the
              journey.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3 lg:gap-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`${item.span} ${item.aspect} ${item.bg} rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group transition-transform duration-300 hover:scale-[1.02]`}
            >
              {/* Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 relative opacity-80 group-hover:opacity-100 transition-opacity">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 64px, 80px"
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold font-sans mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#5f666d] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
