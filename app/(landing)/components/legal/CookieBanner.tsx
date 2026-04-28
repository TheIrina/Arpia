"use client";
import { useConsentStore } from "@/store/useConsentStore";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

export default function ArpiaCookieBanner() {
  const { hasInteracted, setConsent } = useConsentStore();

  if (hasInteracted) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-90 animate-in fade-in duration-500" />

      <div className="fixed bottom-4 right-4 z-100 w-[calc(100vw-2rem)] md:w-96 font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
        <div className="bg-black flex flex-col p-6 rounded-2xl shadow-2xl border border-white/10">
          <p className="text-white text-sm mb-6 leading-relaxed font-normal text-left">
            Usamos cookies para personalizar tu experiencia. Al aceptar, nos
            permites mejorar tu experiencia de usuario y ofrecerte contenido
            relevante para tu próxima aventura.{" "}
            <Link
              href="/cookies"
              className="underline text-white/70 hover:text-white transition-colors inline-block mt-2"
            >
              Leer Política de Cookies
            </Link>
          </p>
          <div className="flex flex-col items-end gap-3 w-full text-right">
            <button
              onClick={() => setConsent(true)}
              className="group flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-full text-lg font-medium tracking-tight w-full transition-all hover:bg-white/90"
            >
              Aceptar cookies
              <ArrowUpRightIcon size={18} weight="bold" />
            </button>
            <button
              onClick={() => setConsent(false)}
              className="group flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-full text-lg font-medium tracking-tight w-full transition-all hover:bg-white/90"
            >
              Solo esenciales
              <ArrowUpRightIcon size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
