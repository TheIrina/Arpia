import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 md:py-6 md:px-8 lg:px-12 z-50 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-white backdrop-blur-md bg-[#111111]/70 border-b border-white/5">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-sm bg-[#d62828] flex items-center justify-center font-bold text-[10px]">
            A
          </div>
          <span className="font-bold tracking-widest text-sm uppercase">Arpia OS</span>
        </div>

        {/* Dashboard Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-gray-400">
          <Link href="/home" className="text-white hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Flights
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Weather
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Equipment
          </Link>
        </div>

        {/* User Profile / Actions */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-white">Pilot</span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">Active</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
             </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
