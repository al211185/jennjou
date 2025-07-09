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
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {["All", ...allTags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-4 py-1 rounded-full border ${
              active === tag
                ? "bg-primary text-black"
                : "border-gray-500 text-gray-300"
            } transition`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {filtered.map((p) => (
          <ProyectoCard key={p.slug} {...p} />
        ))}
      </div>
    </section>
  );
}
