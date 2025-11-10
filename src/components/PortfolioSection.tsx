import ProyectoCard from "./ProyectoCard";
import type { PortfolioSection, Project } from "@/data/projects";
import { fetchInstagramMedia, INSTAGRAM_PROFILE_URL } from "@/lib/instagram";
import HorizontalCarousel from "./HorizontalCarousel";

interface Props {
  section: PortfolioSection;
    anchorId?: string;
}

function formatInstagramDescription(caption: string | null): { title: string; description: string } {
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
  const description = rawDescription.length > 220 ? `${rawDescription.slice(0, 217)}...` : rawDescription;

  return { title, description };
}

export default async function PortfolioSection({ section, anchorId }: Props) {
  const isIllustrationSection = section.id === "ilustracion";
  const instagramPosts = isIllustrationSection ? await fetchInstagramMedia() : [];
  const imageOnlyInstagramPosts = instagramPosts.filter(
    (post) => post.mediaType === "IMAGE" || post.mediaType === "CAROUSEL_ALBUM"
  );
  const shouldUseInstagram = isIllustrationSection && imageOnlyInstagramPosts.length > 0;

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
      className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center space-y-10 rounded-3xl border border-black bg-white px-8 py-20 scroll-mt-32 snap-start"
    >
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Portfolio</p>
        <h3 className="text-2xl font-semibold sm:text-3xl">{section.title}</h3>
        <p className="text-base text-gray-600 sm:max-w-2xl">{section.description}</p>
      </header>

        {isIllustrationSection ? (
          <HorizontalCarousel ariaLabel="Carrusel de ilustraciones">
            {projectsToRender.map((project) => (
              <ProyectoCard key={project.slug} project={project} />
            ))}
          </HorizontalCarousel>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectsToRender.map((project) => (
              <ProyectoCard key={project.slug} project={project} />
            ))}
          </div>
        )}

        {shouldUseInstagram ? (
          <div className="text-center sm:text-right">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-600 transition hover:text-black"
            >
              Ver más en Instagram
              <span aria-hidden className="text-base leading-none">↗</span>
            </a>
          </div>
        ) : null}
    </section>
  );
}