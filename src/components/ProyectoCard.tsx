// src/components/ProyectoCard.tsx
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  slug: string;
  cover?: string;   // <-- opcional
}

export default function ProyectoCard({ title, slug, cover }: Props) {
  return (
    <Link
      href={`/proyectos/${slug}`}
      className="group block overflow-hidden rounded-lg"
    >
      {cover ? (
        <Image
          src={cover}
          alt={title}
          width={400}
          height={250}
          className="transform group-hover:scale-105 transition"
        />
      ) : (
        <div className="h-60 bg-gray-800 flex items-center justify-center text-gray-400">
          Imagen no disponible
        </div>
      )}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    </Link>
  );
}
