"use client";

import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col relative">
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
