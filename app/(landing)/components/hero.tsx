import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen p-4 md:py-6 lg:py-8 md:px-8 lg:px-12 text-white font-sans flex flex-col overflow-hidden selection:bg-white selection:text-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/hero1-poster.avif"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero1.webm" type="video/webm" />
      </video>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Grid Container */}
      <div className="relative z-10 flex-1 w-full overflow-hidden">
        {/* Foreground Content Grid */}
        <div className="absolute inset-0 z-10 grid grid-cols-3 grid-rows-8 md:grid-cols-4 md:grid-rows-6 lg:grid-cols-6 lg:grid-rows-4 gap-2 md:gap-3 lg:gap-4 pointer-events-none">
          {/* Main Title Area */}
          <main className="col-span-full row-start-4 md:row-start-3 lg:row-start-2 flex flex-col items-center justify-center text-center pointer-events-auto">
            <h1 className="text-4xl md:text-6xl font-normal tracking-tight mb-2 md:mb-4 text-white">
              Fly it to prove yourself
            </h1>
            <p className="text-sm max-w-100 font-medium">
              Join us, for the love of flight. Conquer yourself.
            </p>
          </main>

          {/* Button Area */}
          <div className="col-span-full lg:col-start-3 lg:col-span-2 row-start-5 md:row-start-4 lg:row-start-3 flex flex-col items-center justify-start pointer-events-auto">
            <Link
              href="/login"
              className="bg-white text-black font-medium text-[11px] md:text-xs rounded-full px-6 py-2.5 hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Register now ↗
            </Link>
          </div>

          {/* Bottom Footer Area */}
          <footer className="col-span-full row-start-8 md:row-start-6 lg:row-start-4 self-end grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 items-end text-[8px] md:text-[9px] font-bold tracking-widest uppercase text-white/80 pointer-events-auto pb-4 lg:pb-0">
            <div className="hidden md:flex md:col-start-1">The Irina</div>

            <div className="col-span-3 md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-2 flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d62828] mb-px"></div>
                <span>48 DAYS</span>
              </div>
              <span>23 HOURS</span>
              <span>42 MINUTES</span>
              <span>11 SECONDS</span>
            </div>

            <div className="hidden md:flex justify-between w-full md:col-start-4 lg:col-start-6">
              <span>4&deg; 24&apos; 49&quot; N</span>
              <span>76&deg; 09&apos; 17&quot; W</span>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
