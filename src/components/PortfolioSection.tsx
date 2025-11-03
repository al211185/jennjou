import ProyectoCard from "./ProyectoCard";
import type { PortfolioSection } from "@/data/projects";

interface Props {
  section: PortfolioSection;
}

export default function PortfolioSection({ section }: Props) {
  return (
    <section id={section.id} className="space-y-6 scroll-mt-32">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Portfolio</p>
        <h3 className="text-2xl font-semibold text-black sm:text-3xl">{section.title}</h3>
        <p className="text-base text-black/60 sm:max-w-2xl">{section.description}</p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {section.projects.map((project) => (
          <ProyectoCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
