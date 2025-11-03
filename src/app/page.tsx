import Hero from "../components/Hero";
import About from "../components/About";
import PortfolioSection from "../components/PortfolioSection";
import Contact from "../components/Contact";
import { portfolioSections } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <section id="portfolio" className="mt-24 space-y-20">
        {portfolioSections.map((section) => (
          <PortfolioSection key={section.id} section={section} />
        ))}
      </section>

      <Contact />
    </>
  );
}
