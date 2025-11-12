import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  squareMedia?: boolean; // NUEVO
}

export default function ProyectoCard({ project, squareMedia = false }: Props) {
  const { title, slug, cover, tags, description, demoUrl } = project;
  const href = demoUrl ?? `/proyectos/${slug}`;
  const isExternal = /^https?:\/\//.test(href);

  const cardClassName =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-black bg-white transition hover:-translate-y-1 hover:bg-gray-100";

  const media = cover ? (
    squareMedia ? (
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(min-width:1024px) 460px, (min-width:640px) 380px, 86vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    ) : (
      <Image
        src={cover}
        alt={title}
        width={640}
        height={400}
        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
      />
    )
      ) : squareMedia ? (
    <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
      Imagen próximamente
    </div>
  ) : (
    <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
      Imagen próximamente
    </div>
  );

  const content = (
    <>
      {media}
      <div className="flex flex-1 flex-col gap-4 p-6 text-left">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        <ul className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-black px-3 py-1 text-xs uppercase tracking-wider text-black"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClassName}>
      {content}
    </Link>
  );
}
