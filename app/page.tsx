import { Hero } from "./(landing)/components/hero";
import { Navbar } from "./(landing)/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fefefe]">
      <Navbar />
      <Hero />
    </main>
  );
}
