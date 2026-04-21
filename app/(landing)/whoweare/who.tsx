"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap, { useGSAP } from "@/lib/gsap";
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
      {/* Block 1 */}
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-x-4">
        {/* Text starts at col 5 */}
        <div className="col-span-1 md:col-span-8 lg:col-start-5 lg:col-span-8 text-4xl md:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-start">
          <p>
            <SplitText text={text1} wordClassName="word opacity-20" />
          </p>
        </div>

        {/* Image is placed below the text, aligned with it */}
        <div className="col-span-1 md:col-span-8 lg:col-start-5 lg:col-span-8 h-[50vh] lg:h-[70vh] bg-[#1A1A1A] rounded-2xl relative overflow-hidden mt-12 lg:mt-24">
          <Image
            src="/logo/para.avif"
            alt="Paragliding adventure"
            fill
            priority
            className="object-contain p-8"
          />
        </div>
      </div>

      {/* Block 2 */}
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-x-4">
        {/* Text starts at col 1 and spans very wide horizontally */}
        <div className="col-span-1 md:col-span-8 lg:col-start-1 lg:col-span-12 text-4xl md:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-start">
          <p>
            <SplitText text={text2} wordClassName="word opacity-20" />
          </p>
        </div>

        {/* Image is placed below the text */}
        <div className="col-span-1 md:col-span-8 lg:col-start-1 lg:col-span-12 h-[50vh] lg:h-[70vh] bg-[#1A1A1A] rounded-2xl relative overflow-hidden mt-12 lg:mt-24">
          <Image
            src="/logo/clo.avif"
            alt="Local community"
            fill
            className="object-contain p-8"
          />
        </div>
      </div>
    </section>
  );
};
