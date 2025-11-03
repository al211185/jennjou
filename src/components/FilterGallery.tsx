// src/components/FilterGallery.tsx
"use client";
import { useState } from "react";
import { projects, Project } from "@/data/projects";
import ProyectoCard from "./ProyectoCard";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function FilterGallery() {
  const [active, setActive] = useState<string>("All");

  const filtered: Project[] =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="proyectos" className="py-12">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`rounded-full border px-4 py-1 text-sm uppercase tracking-widest transition ${
                active === tag
                  ? "border-fuchsia-400 bg-fuchsia-400 text-black"
                  : "border-zinc-700 text-zinc-400 hover:border-fuchsia-400 hover:text-fuchsia-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      <div className="grid gap-8 md:grid-cols-3">
        {filtered.map((project) => (
          <ProyectoCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
