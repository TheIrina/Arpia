import { Hero } from "./(landing)/components/hero";
import { Navbar } from "./(landing)/components/navbar";
import { WhoWeAre } from "./(landing)/whoweare/who";
import { Features } from "./(landing)/features/features";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fefefe]">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Features />
    </main>
  );
}
