import Hero from "../components/Hero";
import About from "../components/About";
import CurriculumSection from "../components/CurriculumSection";
import PortfolioSection from "../components/PortfolioSection";
import Contact from "../components/Contact";
import BumpSequence from "../components/BumpSequence";
import FullPageScrollManager from "../components/FullPageScrollManager";
import { portfolioSections } from "@/data/projects";

export default function Home() {
  return (
    <>
      <FullPageScrollManager />
      <BumpSequence />
      <Hero />
      <About />
      <CurriculumSection />

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
