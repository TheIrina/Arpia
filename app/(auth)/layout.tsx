"use client";

import { useRef } from "react";
import { HlsVideo } from "@/components/ui/hls-video";
import gsap, { useGSAP } from "@/lib/gsap";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".entrance-curtain", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full bg-black flex flex-col relative overflow-hidden"
    >
      {/* Entrance transition curtain */}
      <div className="entrance-curtain fixed inset-0 bg-[#0A0A0A] z-100 pointer-events-none" />

      {/* Background Video */}
      <HlsVideo
        src="/videos/hls/login/login.m3u8"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs z-0" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 relative z-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          {children}
        </div>
      </main>

      {/* Geographic coordinates — signature brand element, like the hero section */}
      <div className="fixed bottom-6 right-6 z-10 text-[10px] font-mono text-white/15 tracking-widest uppercase pointer-events-none select-none">
        4&deg; 24&apos; 49&quot; N &mdash; 76&deg; 09&apos; 17&quot; W
      </div>
    </div>
  );
}
