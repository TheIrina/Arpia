import Link from "next/link";
import { MapAttribution } from "./map-attribution";

export const DesktopNavbar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-24 bg-zinc-950/20 backdrop-blur-xs [mask-image:linear-gradient(to_bottom,black_20%,transparent)] z-40 pointer-events-none" />
      <nav className="flex items-center justify-between w-full text-[12px] font-light text-white tracking-wide relative z-50">
      <div className="flex items-center gap-2">
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
      <Link
        href="/"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Fleet
      </Link>
      <Link
        href="/"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Routes
      </Link>
      <Link
        href="/"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Analytics
      </Link>
      <Link
        href="/"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Maintenance
      </Link>
      <Link
        href="/"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Incidents
      </Link>
      <Link
        href="/"
        className="px-4 py-2.5 rounded-full hover:bg-black/20 hover:backdrop-blur-xs hover:text-white transition-all"
      >
        Crew
      </Link>
      </div>
      <MapAttribution />
    </nav>
    </>
  );
};
