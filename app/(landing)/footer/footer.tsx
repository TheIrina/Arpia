import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-white text-black px-4 pt-24 pb-12 md:px-8 lg:px-12">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-12">
          {/* Logo & Vision */}
          <div className="col-span-2 md:col-span-8 lg:col-span-5 flex flex-col items-start gap-8">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-none font-['Helvetica_Neue',Helvetica,Arial,sans-serif] max-w-md">
              Elevating the paragliding experience, one thermal at a time.
            </h2>
          </div>

          {/* Product */}
          <div className="col-span-1 md:col-span-2 lg:col-start-7 lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs md:text-base uppercase font-semibold tracking-wide text-black">
              Product
            </h4>
            <nav className="flex text-sm md:text-base font-medium text-[#5f666d] flex-col gap-2">
              <Link href="#" className="hover:underline">
                Features
              </Link>
              <Link href="#" className="hover:underline">
                Beta Access
              </Link>
              <Link href="#" className="hover:underline">
                Mobile App
              </Link>
              <Link href="#" className="hover:underline">
                Community
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2 lg:col-start-9 lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs md:text-base uppercase font-semibold tracking-wide text-black">
              Company
            </h4>
            <nav className="flex text-sm md:text-base font-medium text-[#5f666d] flex-col gap-2">
              <Link href="#" className="hover:underline">
                Who We Are
              </Link>
              <Link href="#" className="hover:underline">
                Manifesto
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
              <Link href="#" className="hover:underline">
                Support
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="col-span-1 md:col-span-2 lg:col-start-11 lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs md:text-base uppercase font-semibold tracking-wide text-black">
              Social
            </h4>
            <nav className="flex text-sm md:text-base font-medium text-[#5f666d] flex-col gap-2">
              <Link href="#" className="hover:underline">
                Instagram
              </Link>
              <Link href="#" className="hover:underline">
                X (Twitter)
              </Link>
              <Link href="#" className="hover:underline">
                YouTube
              </Link>
              <Link href="#" className="hover:underline">
                Discord
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section: Giant Typography & Legal */}
        <div className="flex flex-col gap-8 md:gap-18">
          <div className="w-full pt-8">
            <h1 className="text-[16vw] font-medium leading-[0.7] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] -ml-2 lg:-ml-6 select-none text-black/5">
              Arpia.com
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12 gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-4 items-start md:items-center font-medium text-xs text-[#5f666d] uppercase">
            <div className="col-span-2 md:col-span-4 lg:col-span-6">
              <p>© 2026 Arpia.com All rights reserved.</p>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-start-7 lg:col-span-2">
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-start-9 lg:col-span-2">
              <Link href="#" className="hover:underline">
                Terms of Service
              </Link>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-start-11 lg:col-span-2">
              <Link href="#" className="hover:underline">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
