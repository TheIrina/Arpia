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
    <article ref={containerRef} className="space-y-12 font-sans text-black">
      <header className="border-b border-gray-800 pb-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 uppercase">
          Política de Privacidad
        </h1>
        <p className="text-black text-sm max-w-2xl leading-relaxed mt-4">
          Fecha de la última revisión: Abril 2026
        </p>
      </header>

      <PrivacySections1to4 />
      <PrivacySections5to9 />
    </article>
  );
}
