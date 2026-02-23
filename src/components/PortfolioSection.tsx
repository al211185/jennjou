import ProyectoCard from "./ProyectoCard";
import type { PortfolioSection, Project } from "@/data/projects";
import { fetchInstagramMedia } from "@/lib/instagram";
import HorizontalCarousel from "./HorizontalCarousel";

interface Props {
  section: PortfolioSection;
  anchorId?: string;
}

function formatInstagramDescription(caption: string | null): {
  title: string;
  description: string;
} {
  if (!caption || caption.trim().length === 0) {
    return {
      title: "Ilustración destacada",
      description: "Explora esta ilustración directamente en Instagram.",
    };
  }

  const lines = caption
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const title = lines[0] ?? "Ilustración destacada";
  const rawDescription = lines.join(" ");
  const description =
    rawDescription.length > 220
      ? `${rawDescription.slice(0, 217)}...`
      : rawDescription;

  return { title, description };
}

export default async function PortfolioSection({ section, anchorId }: Props) {
  const isIllustrationSection = section.id === "ilustracion";
  const instagramPosts = isIllustrationSection ? await fetchInstagramMedia() : [];
  const imageOnlyInstagramPosts = instagramPosts.filter(
    (post) => post.mediaType === "IMAGE" || post.mediaType === "CAROUSEL_ALBUM"
  );
  const shouldUseInstagram =
    isIllustrationSection && imageOnlyInstagramPosts.length > 0;

  const instagramProjects: Project[] = imageOnlyInstagramPosts.map((post) => {
    const { title, description } = formatInstagramDescription(post.caption);
    return {
      slug: `instagram-${post.id}`,
      title,
      cover: post.mediaUrl,
      tags: ["Instagram"],
      description,
      category: "ilustracion",
      demoUrl: post.permalink,
    } satisfies Project;
  });

  const projectsToRender = shouldUseInstagram ? instagramProjects : section.projects;
  const sectionId = anchorId ?? section.id;

  return (
    <section
      id={sectionId}
      data-section-id={section.id}
      data-fullpage-section
      data-tone="portfolio"
      className="flex min-h-screen w-full items-center justify-center border-y border-black px-4 py-16 sm:px-6"
    >
      <div className="section-shell reveal-up mx-auto flex w-full max-w-6xl flex-col justify-center space-y-8 px-3 py-6 sm:px-4 sm:py-8">
        <header className="space-y-3 px-2 text-center sm:text-left">
          <p className="kicker">Portfolio</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h3 className="text-2xl font-semibold sm:text-3xl">{section.title}</h3>
            <span className="chip px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em]">
              {projectsToRender.length} piezas
            </span>
          </div>
          <p className="text-base text-gray-700 sm:max-w-2xl">{section.description}</p>
        </header>

        <HorizontalCarousel ariaLabel={`Carrusel de ${section.title.toLowerCase()}`}>
          {projectsToRender.map((project) => (
            <ProyectoCard
              key={project.slug}
              project={project}
              squareMedia={isIllustrationSection}
            />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
}
