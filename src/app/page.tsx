import Hero from "../components/Hero";
import About from "../components/About";
import PortfolioSection from "../components/PortfolioSection";
import Contact from "../components/Contact";
import BumpSequence from "../components/BumpSequence";
import { portfolioSections } from "@/data/projects";

export default function Home() {
  return (
    <>
      <BumpSequence />
      <Hero />
      <About />

      <section id="portfolio" className="mx-auto mt-24 max-w-6xl space-y-20">
        {portfolioSections.map((section) => (
          <PortfolioSection key={section.id} section={section} />
        ))}
      </section>

      <Contact />
    </>
  );
}
