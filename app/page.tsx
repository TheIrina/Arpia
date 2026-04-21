import type { Metadata } from "next";
import { Hero } from "./(landing)/components/hero";
import { WhoWeAre } from "./(landing)/whoweare/who";
import { Features } from "./(landing)/features/features";
import { Cta } from "./(landing)/cta/cta";
import dynamic from "next/dynamic";
import { Footer } from "./(landing)/footer/footer";

const Navbar = dynamic(() => import("./(landing)/components/navbar").then((mod) => mod.Navbar));
const MobileNav = dynamic(() => import("./(landing)/components/mobile-nav").then((mod) => mod.MobileNav));

export const metadata: Metadata = {
  title: "Arpia | Elevating the Paragliding Experience",
  description:
    "Master the skies with real-time thermal tracking, hyper-local weather data, and the world's largest paragliding community in Roldanillo, Colombia.",
};
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fefefe]">
      <Navbar />
      <MobileNav />
      {/* <Hero /> */}
      <Hero />
      <WhoWeAre />
      <Features />
      <Cta />
      <Footer />
    </main>
  );
}
