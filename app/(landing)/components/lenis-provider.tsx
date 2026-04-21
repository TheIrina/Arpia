"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "@/lib/gsap";
import { LenisContextProvider } from "./lenis-context";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ticker for jitter-free scroll
    gsap.ticker.lagSmoothing(0);

    function update(time: number) {
      lenisRef.current?.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContextProvider lenisRef={lenisRef}>{children}</LenisContextProvider>;
};
