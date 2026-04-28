import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-['Helvetica_Neue',Helvetica,Arial,sans-serif] bg-[#FDFDFD]">
      {/* Left Panel: Form */}
      <div className="flex flex-col w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen border-r border-black/5 bg-white relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 relative w-full">
          {/* Header / Back to home */}
          <Link
            href="/"
            className="absolute top-8 left-6 lg:left-12 flex items-center gap-2.5 group"
          >
            <div className="w-2 h-2 rounded-full bg-[#1A1A1A] group-hover:bg-[#d62828] transition-colors duration-300" />
            <span className="text-[#1A1A1A] text-sm font-semibold tracking-wider uppercase">
              Arpia
            </span>
          </Link>

          <div className="w-full max-w-sm mx-auto mt-16 lg:mt-0">
            {children}
          </div>
        </div>
      </div>

      {/* Right Panel: Multimedia (Visible on mobile as bottom or top, desktop as right side) */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1A1A1A]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/hero1-poster.avif"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        >
          <source src="/videos/hero1.webm" type="video/webm" />
          <source src="/videos/hero1.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Brand / Catchphrase overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center pointer-events-none">
          <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight max-w-md leading-[1.1]">
            Fly it to prove yourself
          </h2>
          <p className="text-white/80 text-sm mt-4 font-medium max-w-xs">
            Join us, for the love of flight. Conquer yourself.
          </p>
        </div>

        <p className="absolute bottom-8 z-10 text-[11px] text-white/50 tracking-wide">
          © 2026 Arpia.com — All rights reserved.
        </p>
      </div>
    </div>
  );
}
