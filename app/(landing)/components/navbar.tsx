import React from "react";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 md:py-6 lg:py-8 md:px-8 lg:px-12 z-50 pointer-events-none font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-white">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 w-full">
        {/* Header row items (Row 1 from the original grid) */}
        <div className="col-start-1 col-span-2 md:col-span-1 flex items-start gap-2 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-white mt-1 shrink-0"></div>
          <span className="font-bold text-[10px] md:text-xs tracking-wider uppercase leading-tight">
            Roldanillo
            <br />
            Colombia
          </span>
        </div>

        <div className="hidden lg:flex lg:col-start-3 lg:col-span-2 items-start justify-between w-full text-[11px] font-medium tracking-wide pointer-events-auto">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Route
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Instructions
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            FAQ
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            History
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Contact Us
          </a>
        </div>

        <div className="md:col-start-4 lg:col-start-6 flex items-start justify-end pointer-events-auto">
          <button className="hidden md:flex items-center gap-2 text-[11px] font-medium border border-white rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors">
            Register now ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
