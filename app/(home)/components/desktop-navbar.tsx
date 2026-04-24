import React from "react";

export const DesktopNavbar = () => {
  return (
    <nav className="flex items-center gap-2 text-[12px] font-light text-white/50 tracking-wide">
      <div className="mr-2 flex items-center justify-center p-2 rounded-full bg-black/20 backdrop-blur-xs cursor-pointer">
        {/* Diagonal lines logo */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="12" y2="5"></line>
          <line x1="5" y1="19" x2="19" y2="5"></line>
          <line x1="12" y1="19" x2="19" y2="12"></line>
        </svg>
      </div>
      <div className="bg-black/20 backdrop-blur-xs text-white px-5 py-2.5 rounded-full font-normal cursor-pointer">
        Live Map
      </div>
      <a
        href="#"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Fleet
      </a>
      <a
        href="#"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Routes
      </a>
      <a
        href="#"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Analytics
      </a>
      <a
        href="#"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Maintenance
      </a>
      <a
        href="#"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Incidents
      </a>
      <a
        href="#"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Crew
      </a>
    </nav>
  );
};
