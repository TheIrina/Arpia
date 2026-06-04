import { HlsVideo } from "@/components/ui/hls-video";

export const Cta = () => {
  return (
    <section className="relative w-full bg-black text-white px-4 py-24 md:px-8 lg:px-12">
      <div className="max-w-screen-2xl mx-auto relative z-20">
        <div className="bg-gradient-to-br from-[#FF5722] to-[#E64A19] rounded-2xl flex flex-col lg:flex-row overflow-hidden items-stretch border border-white/10 shadow-[0_24px_80px_-15px_rgba(255,87,34,0.3)]">
          {/* Left: Text & CTA Button */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-between">
            <div>
              {/* Premium Icon Container */}
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)] backdrop-blur-md">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-4 font-sans tracking-tight leading-tight">
                Ready to take off? Join the Arpia community
              </h2>

              {/* Description */}
              <p className="text-orange-50/90 text-sm md:text-base leading-relaxed max-w-lg mb-12">
                Download the app to access live weather, find local launch
                sites, and connect with pilots from all over the world. Whether
                you fly for sport or competition, we provide the tools you need.
              </p>
            </div>

            {/* Button */}
            <div>
              <button className="bg-white text-black font-medium py-3.5 px-8 rounded-full text-sm md:text-base hover:bg-orange-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex items-center gap-2 group">
                Get Early Access
                <svg className="w-4 h-4 text-black transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4 flex min-h-100">
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <HlsVideo
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/videos/hls/hero2/hero2.m3u8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
