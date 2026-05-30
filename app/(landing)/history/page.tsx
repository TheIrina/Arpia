import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { WhoWeAre } from "../whoweare/who";
import { Footer } from "../footer/footer";

const Navbar = dynamic(() => import("../components/navbar").then((mod) => mod.Navbar));
const MobileNav = dynamic(() => import("../components/mobile-nav").then((mod) => mod.MobileNav));

export const metadata: Metadata = {
  title: "Arpia | Our History",
  description:
    "Discover the story behind Arpia — a team of engineers building the future of paragliding in Roldanillo, Colombia.",
};

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#fefefe]">
      <Navbar />
      <MobileNav />

      {/* Hero Header */}
      <section className="relative w-full min-h-[60dvh] bg-black text-white flex items-end px-4 py-24 md:px-8 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-0" />
        <div className="relative z-10 max-w-screen-2xl mx-auto w-full">
          <p className="text-sm md:text-base font-semibold tracking-wide uppercase text-white/60 mb-4">
            Our story
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tighter leading-[1.05] font-sans max-w-4xl">
            Built by pilots, for pilots.
          </h1>
          <p className="text-base md:text-lg text-white/70 mt-6 max-w-2xl leading-relaxed">
            From a local passion in Roldanillo to a platform serving pilots
            worldwide — this is where it all began.
          </p>
        </div>
      </section>

      <WhoWeAre />
      <Footer />
    </main>
  );
}
