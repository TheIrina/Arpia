import React from "react";

export const Hero3 = () => {
  return (
    <section className="relative w-full min-h-screen bg-white text-black px-4 py-24 md:px-8 lg:px-12 flex flex-col justify-center gap-16 max-w-screen-2xl mx-auto">
      <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left Panel: Immersive Media */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative rounded-2xl overflow-hidden bg-gray-200 order-2 lg:order-1">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero2.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Right Panel: Typography & CTA (No Card, Clean Layout) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-8 lg:gap-12 max-lg:contents order-3 lg:order-2">
          {/* Top: Pill & Headline */}
          <div className="flex flex-col gap-6 order-1 lg:order-1 w-full">
            <span className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold tracking-wide uppercase self-start">
              Arpia App Beta
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-medium leading-none tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
              Master the skies.
            </h1>
          </div>

          {/* Description */}
          <div className="order-3 lg:order-1 w-full">
            <p className="text-sm md:text-base text-gray-500 max-w-lg leading-relaxed font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
              Elevate your cross-country flights with real-time thermal
              tracking, hyper-local weather data, and the world&apos;s largest
              paragliding community.
            </p>
          </div>

          {/* Bottom: CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-4 order-4 lg:order-1 w-full">
            <button className="bg-black text-white font-medium py-3.5 px-8 rounded-full text-base">
              Get Early Access
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
