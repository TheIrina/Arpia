"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap, { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SplitText } from "../components/common/split-text";

export const WhoWeAre = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray(".word");
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 70%",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  const text1 =
    "We are a team of engineers building a dedicated platform for paragliding enthusiasts. Whether you are an international pilot arriving for a competition or a free flyer seeking your next adventure, our app is designed to elevate your experience.";
  const text2 =
    "Beyond the thrill of flight, we want to connect you with the heartbeat of our local community. From discovering the best launch sites to finding hidden gems, local culture, and things to do when you're not in the air—we've got you covered.";

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen text-black px-4 py-24 md:px-8 lg:px-12 flex flex-col justify-center gap-24 lg:gap-32 max-w-screen-2xl mx-auto"
    >
      {/* Block 1: Text Left, Image Right */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 text-4xl md:text-5xl xl:text-6xl font-medium leading-none tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-start">
          <p>
            <SplitText text={text1} wordClassName="word opacity-20" />
          </p>
        </div>
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-[#1A1A1A] rounded-2xl relative overflow-hidden">
          <Image
            src="/logo/para.png"
            alt="Paragliding adventure"
            fill
            priority
            className="object-contain p-8"
          />
        </div>
      </div>

      {/* Block 2: Image Left, Text Right */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-[#1A1A1A] rounded-2xl relative overflow-hidden">
          <Image
            src="/logo/clo.png"
            alt="Local community"
            fill
            className="object-contain p-8"
          />
        </div>
        <div className="w-full lg:w-1/2 text-4xl md:text-5xl xl:text-6xl font-medium leading-none tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-start lg:text-end">
          <p>
            <SplitText text={text2} wordClassName="word opacity-20" />
          </p>
        </div>
      </div>
    </section>
  );
};
