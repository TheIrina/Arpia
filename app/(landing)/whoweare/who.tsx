"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
          start: "top 70%",
          end: "bottom 10%",
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

  const renderWords = (text: string) => {
    const wordsArray = text.split(" ");
    return wordsArray.map((word, index) => (
      <span key={index} className="inline-block">
        <span className="word opacity-20">{word}</span>
        {index < wordsArray.length - 1 && <span>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen text-black px-4 py-24 md:px-8 lg:px-12 flex flex-col justify-center gap-24 lg:gap-32 max-w-screen-2xl mx-auto"
    >
      {/* Block 1: Text Left, Image Right */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium leading-none tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-start">
          <p>{renderWords(text1)}</p>
        </div>
        {/* Placeholder Imagen 1 */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-black rounded-2xl relative overflow-hidden">
          <Image src="/logo/para.png" alt="Paragliding adventure" fill className="object-contain p-8" />
        </div>
      </div>

      {/* Block 2: Image Left, Text Right */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        {/* Placeholder Imagen 2 */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-black rounded-2xl relative overflow-hidden">
          <Image src="/logo/clo.png" alt="Local community" fill className="object-contain p-8" />
        </div>
        <div className="w-full lg:w-1/2 text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium leading-none tracking-tighter font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-start lg:text-end">
          <p>{renderWords(text2)}</p>
        </div>
      </div>
    </section>
  );
};
