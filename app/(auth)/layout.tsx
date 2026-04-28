import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] overflow-hidden">
      {/* Background Video — same as hero */}
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
        <source src="/videos/hero1.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast with the white card */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Back to home */}
      <Link
        href="/"
        className="relative z-10 mb-10 flex items-center gap-2.5 group"
      >
        <div className="w-2 h-2 rounded-full bg-white group-hover:bg-[#d62828] transition-colors duration-300" />
        <span className="text-white text-sm font-semibold tracking-wider uppercase">
          Arpia
        </span>
      </Link>

      {/* Page content (Login / Signup card) */}
      <div className="relative z-10 w-full max-w-md">{children}</div>

      {/* Footer legal */}
      <p className="relative z-10 mt-10 text-[11px] text-white/50 tracking-wide">
        © 2026 Arpia.com — All rights reserved.
      </p>
    </div>
  );
}
