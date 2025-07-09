// src/components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-4 bg-white/90 fixed top-0 w-full backdrop-blur-md z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"         // ← ruta desde public/
            alt="Logo Jennjou"
            width={40}                     // ajusta al tamaño de tu logo
            height={40}
            priority                       // opcional: carga anticipada
          />
          <span className="sr-only">Jennjou</span>
        </Link>
        <div className="space-x-6">
          <Link href="#sobre-mi" className="hover:text-primary">Sobre mí</Link>
          <Link href="#proyectos" className="hover:text-primary">Proyectos</Link>
          <Link href="#contacto" className="hover:text-primary">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}
