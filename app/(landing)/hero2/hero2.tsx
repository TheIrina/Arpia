import React from "react";

export const Hero2 = () => {
  return (
    <section className="w-full min-h-screen bg-[#FDFDFD] text-black overflow-hidden flex flex-col pt-24 pb-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-screen-2xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Main Grid Container handling mobile reordering and desktop layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 h-full w-full content-between flex-1">
          {/* 1. Title (Mobile: Top, Desktop: Bottom) */}
          <div className="order-1 lg:order-3 lg:col-span-12 flex items-end pt-4 lg:pt-0">
            <h1 className="text-9xl font-medium leading-[0.8] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] -ml-2 lg:-ml-4">
              Arpia.com
            </h1>
          </div>

          {/* 2. Video (Mobile: Middle, Desktop: Right) */}
          <div className="order-2 lg:order-2 lg:col-span-7 lg:col-start-6 relative flex items-center">
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/hero1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* 3. Text & Button (Mobile: Bottom, Desktop: Left) */}
          <div className="order-3 lg:order-1 lg:col-span-5 flex flex-col justify-start items-start gap-6">
            <p className="text-sm md:text-base text-gray-600 font-normal leading-relaxed tracking-tight font-['Helvetica_Neue',Helvetica,Arial,sans-serif] w-full max-w-xl">
              As a dedicated platform for the paragliding community, Arpia
              collaborates with elite pilots to build tools that transform
              standard weather and topographical data into actionable insights,
              helping you find your competitive edge in the sky.
            </p>
            <button className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-gray-400 hover:border-black transition-colors font-medium text-sm md:text-base">
              <span className="text-[10px]">▶</span>
              Watch the film
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
