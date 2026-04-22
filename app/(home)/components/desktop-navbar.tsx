import React from "react";

export const DesktopNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full mb-16">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-sm bg-[#d62828] flex items-center justify-center font-bold text-[10px]">
          A
        </div>
        <span className="font-bold tracking-widest text-sm uppercase">Arpia OS</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium tracking-widest uppercase text-white/50">Desktop View</span>
      </div>
    </div>
  );
};
