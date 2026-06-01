export function MapCardVisual() {
  return (
    <div className="relative w-full h-72 sm:h-100 md:h-125 lg:h-150 rounded-2xl bg-[#fbfbfb] overflow-hidden flex items-center justify-center border border-gray-200">


      {/* Nodos flotantes (Emojis tipo mensaje) */}

      {/* Píldora Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-gray-200 font-medium text-[10px] sm:text-xs md:text-sm text-gray-800 z-10 flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Roldanillo Airspace
      </div>

      {/* Clima (Sol/Nube) */}
      <div
        className="absolute top-[12%] left-[18%] bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-gray-200 text-lg sm:text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-3 after:h-3 sm:after:w-4 sm:after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-1.5 sm:after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm"
      >
        ⛅️
      </div>

      {/* Comida / Restaurantes */}
      <div
        className="absolute bottom-[22%] left-[18%] bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-gray-200 text-lg sm:text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-3 after:h-3 sm:after:w-4 sm:after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-1.5 sm:after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm"
      >
        🍔
      </div>

      {/* Marcador Launch Site (Despegue) */}
      <div
        className="absolute top-[22%] right-[22%] bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-gray-200 text-lg sm:text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-3 after:h-3 sm:after:w-4 sm:after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-1.5 sm:after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm"
      >
        🪂
      </div>

      {/* Calendario / Evento */}
      <div
        className="absolute bottom-[28%] right-[12%] bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-gray-200 text-lg sm:text-2xl md:text-3xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-3 after:h-3 sm:after:w-4 sm:after:h-4 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-1.5 sm:after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:rounded-sm"
      >
        📆
      </div>

      {/* Ubicación / Transporte */}
      <div
        className="absolute top-[60%] left-[8%] bg-white p-1.5 sm:p-2.5 md:p-3.5 rounded-xl sm:rounded-2xl border border-gray-200 text-base sm:text-xl md:text-2xl flex items-center justify-center
                      after:absolute after:content-[''] after:w-2.5 after:h-2.5 sm:after:w-3.5 sm:after:h-3.5 after:bg-white after:border-r after:border-b after:border-gray-200 after:rotate-45 after:-bottom-[5px] sm:after:-bottom-[6px] after:left-1/2 after:-translate-x-1/2 after:rounded-sm"
      >
        📍
      </div>
    </div>
  );
}
