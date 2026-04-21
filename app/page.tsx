import { Hero } from "./(landing)/components/hero";
import { WhoWeAre } from "./(landing)/whoweare/who";
import { Features } from "./(landing)/features/features";
import { Cta } from "./(landing)/cta/cta";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./(landing)/components/navbar").then((mod) => mod.Navbar));
const MobileNav = dynamic(() => import("./(landing)/components/mobile-nav").then((mod) => mod.MobileNav));

{
  /* import { Hero2 } from "./(landing)/hero2/hero2";
import { Hero3 } from "./(landing)/hero3/hero3"; */
}
import { Footer } from "./(landing)/footer/footer";
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
