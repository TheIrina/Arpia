import { Hero } from "./(landing)/components/hero";
import { Navbar } from "./(landing)/components/navbar";
import { WhoWeAre } from "./(landing)/whoweare/who";
import { Features } from "./(landing)/features/features";
import { Cta } from "./(landing)/cta/cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fefefe]">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Features />
      <Cta />
    </main>
  );
}
