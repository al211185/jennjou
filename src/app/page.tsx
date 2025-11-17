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

      {portfolioSections.map((section, index) => (
        <PortfolioSection
          key={section.id}
          section={section}
          anchorId={index === 0 ? "portfolio" : undefined}
        />
      ))}
      <Contact />
    </>
  );
}
