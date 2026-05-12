import Link from "next/link";
import { NAV_LINKS } from "@/lib/navigation";
import { DotLoader } from "./dots";

const VERTICAL_WIND_FRAMES = [
  [32, 33],
  [26, 27, 31, 34],
  [20, 21, 25, 28, 30, 35],
  [14, 15, 19, 22, 24, 29],
  [8, 9, 13, 16, 18, 23],
  [2, 3, 7, 10, 12, 17],
  [1, 4, 6, 11],
  [0, 5],
  [],
  [],
];

export const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-24 bg-zinc-950/20 backdrop-blur-xs [mask-image:linear-gradient(to_bottom,black_20%,transparent)] z-40 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full p-4 md:py-6 lg:py-8 md:px-8 lg:px-12 z-50 pointer-events-none font-sans text-white">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 w-full">
          {/* Header row items (Row 1 from the original grid) */}
          <div className="col-start-1 col-span-2 md:col-span-1 flex items-center gap-2 pointer-events-auto">
            <DotLoader
              frames={VERTICAL_WIND_FRAMES}
              duration={120}
              activeDotClassName="bg-white"
              inactiveDotClassName="bg-white/20"
              dotSizeClassName="w-[3px] h-[3px]"
              gapClassName="gap-px"
            />
            <span className="text-2xl md:text-3xl tracking-tight">Arpia</span>
          </div>

          <div className="hidden md:flex md:col-start-2 lg:col-start-3 md:col-span-2 lg:col-span-2 items-center justify-between w-full text-[11px] font-medium tracking-wide pointer-events-auto">
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

          <div className="md:col-start-4 lg:col-start-6 flex items-start justify-end pointer-events-auto">
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 text-[11px] font-medium border border-white/30 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors bg-black/10 backdrop-blur-sm"
            >
              Register now ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
