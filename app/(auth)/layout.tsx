"use client";

import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/login.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 relative z-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
