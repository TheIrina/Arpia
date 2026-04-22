import React from "react";
import Link from "next/link";
import { NAV_LINKS, AUTH_LINKS } from "@/lib/navigation";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 md:py-6 lg:py-8 md:px-8 lg:px-12 z-50 pointer-events-none font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-white">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 w-full">
        {/* Header row items (Row 1 from the original grid) */}
        <div className="col-start-1 col-span-2 md:col-span-1 flex items-start gap-2 pointer-events-auto">
          <span className="text-2xl md:text-3xl">Arpia</span>
        </div>

        <div className="hidden lg:flex lg:col-start-3 lg:col-span-2 items-center justify-between w-full text-[11px] font-medium tracking-wide pointer-events-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="md:col-start-4 lg:col-start-6 flex items-start justify-end pointer-events-auto gap-3">
          <Link
            href={AUTH_LINKS[0].href}
            className="hidden md:flex items-center text-[11px] font-medium hover:text-gray-300 transition-colors"
          >
            {AUTH_LINKS[0].label}
          </Link>
          <button className="hidden md:flex items-center gap-2 text-[11px] font-medium rounded-full px-5 py-2 bg-black/20 backdrop-blur-xs text-white">
            {AUTH_LINKS[1].label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
