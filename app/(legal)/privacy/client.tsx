"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PrivacySections1to4 } from "./sections-1-4";
import { PrivacySections5to9 } from "./sections-5-9";

export default function PrivacyPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("section", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <article ref={containerRef} className="space-y-24 font-sans text-black">
      <header className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-x-4">
        <div className="col-span-2 md:col-span-8 lg:col-span-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tighter leading-[1.05] uppercase">
            Política de Privacidad
          </h1>
        </div>
        <div className="col-span-2 md:col-span-8 lg:col-start-7 lg:col-span-6 mt-4 lg:mt-0">
          <p className="text-sm md:text-base text-[#5f666d] leading-relaxed font-medium">
            Fecha de la última revisión: Abril 2026
          </p>
        </div>
      </header>

      <PrivacySections1to4 />
      <PrivacySections5to9 />
    </article>
  );
}
