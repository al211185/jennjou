import ProyectoCard from "./ProyectoCard";
import type { PortfolioSection } from "@/data/projects";
import InstagramGrid from "./InstagramGrid";
import { fetchInstagramMedia, INSTAGRAM_PROFILE_URL } from "@/lib/instagram";

interface Props {
  section: PortfolioSection;
}

export default async function PortfolioSection({ section }: Props) {
  const isIllustrationSection = section.id === "ilustracion";
  const instagramPosts = isIllustrationSection ? await fetchInstagramMedia() : [];
  const imageOnlyInstagramPosts = instagramPosts.filter((post) => post.mediaType === "IMAGE" || post.mediaType === "CAROUSEL_ALBUM");
  const shouldUseInstagram = isIllustrationSection && imageOnlyInstagramPosts.length > 0;
  const projectsToRender = section.projects;

  return (
    <section id={section.id} className="space-y-6 scroll-mt-32">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Portfolio</p>
        <h3 className="text-2xl font-semibold sm:text-3xl">{section.title}</h3>
        <p className="text-base text-gray-600 sm:max-w-2xl">{section.description}</p>
      </header>
  <div className="space-y-6">
        {isIllustrationSection ? (
          <p className="text-sm text-gray-500">
            Sigue el portafolio actualizado en
            {" "}
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 underline underline-offset-4 transition hover:text-black"
            >
              Instagram (@jennjou_)
            </a>
            .
          </p>
        ) : null}
        {shouldUseInstagram ? (
          <InstagramGrid posts={imageOnlyInstagramPosts} profileUrl={INSTAGRAM_PROFILE_URL} />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectsToRender.map((project) => (
              <ProyectoCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}