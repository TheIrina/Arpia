export const Cta = () => {
  return (
    <section className="relative w-full bg-white text-black px-4 py-24 md:px-8 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-2xl flex flex-col lg:flex-row overflow-hidden items-stretch">
          {/* Left: Text & CTA Button */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
            <div>
              {/* White dot / icon placeholder */}
              <div className="w-8 h-8 bg-white rounded-full mb-8"></div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-4 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] tracking-tight">
                Ready to take off? Join the Arpia community
              </h2>

              {/* Description */}
              <p className="text-[#86868B] text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mb-12">
                Download the app to access live weather, find local launch
                sites, and connect with pilots from all over the world. Whether
                you fly for sport or competition, we provide the tools you need.
              </p>
            </div>

            {/* Button */}
            <div>
              <button className="bg-white text-black font-medium py-3 px-8 rounded-full text-sm md:text-base">
                Get Early Access
              </button>
            </div>
          </div>
          {/* Right: Video */}
          <div className="w-full lg:w-1/2 p-4 flex">
            <div className="relative w-full min-h-100 lg:min-h-auto h-full rounded-lg overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source src="/videos/hero3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
