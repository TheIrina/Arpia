import React from "react";
import { RoldanilloMapBg } from "./map-bg";

export function MapCardVisual() {
  return (
    <div className="relative w-full h-100 md:h-125 lg:h-150 rounded-2xl bg-[#fbfbfb] overflow-hidden flex items-center justify-center border border-gray-200">
      {/* Fondo SVG simulando el mapa de Roldanillo / topografía */}
      <RoldanilloMapBg />

      {/* Nodos flotantes (Emojis tipo mensaje) */}
      
      {/* Píldora Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-200 font-medium text-xs md:text-sm text-gray-800 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Roldanillo Airspace
      </div>

      {/* Clima (Sol/Nube) */}
      <div className="absolute top-[15%] left-[20%] bg-white p-3 md:p-4 rounded-2xl border border-gray-200 text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-4 after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm">
        ⛅️
      </div>

      {/* Comida / Restaurantes */}
      <div className="absolute bottom-[25%] left-[20%] bg-white p-3 md:p-4 rounded-2xl border border-gray-200 text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-4 after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm">
        🍔
      </div>

      {/* Marcador Launch Site (Despegue) */}
      <div className="absolute top-[25%] right-[25%] bg-white p-3 md:p-4 rounded-2xl border border-gray-200 text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-4 after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm">
        🪂
      </div>

      {/* Calendario / Evento */}
      <div className="absolute bottom-[30%] right-[15%] bg-white p-3 md:p-4 rounded-2xl border border-gray-200 text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-4 after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm">
        📆
      </div>
      
      {/* Ubicación / Transporte */}
      <div className="absolute top-[60%] left-[10%] bg-white p-2.5 md:p-3.5 rounded-2xl border border-gray-200 text-xl md:text-2xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-3.5 after:h-3.5 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-[6px] after:left-1/2 after:-translate-x-1/2 after:rounded-sm">
        📍
      </div>
    </div>
  );
}
