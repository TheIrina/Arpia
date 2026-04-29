export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-sans bg-white ">
      {/* Left Panel: Multimedia */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-sm">
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
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex flex-col w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center relative w-full px-6">
          <div className="w-full max-w-sm mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
