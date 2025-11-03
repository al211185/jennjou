// src/components/ProyectoCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
}

export default function ProyectoCard({ project }: Props) {
  const { title, slug, cover, tags, description } = project;

  return (
    <Link
      href={`/proyectos/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:-translate-y-1 hover:border-black"
    >
      {cover ? (
        <Image
          src={cover}
          alt={title}
          width={640}
          height={400}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-black/5 text-sm text-black/40">
          Imagen próximamente
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6 text-left">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <p className="text-sm leading-relaxed text-black/60">{description}</p>
        <ul className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-black/15 px-3 py-1 text-xs uppercase tracking-wider text-black/60"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
