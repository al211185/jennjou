// src/components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-20 w-full border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
          <Image src="/images/logo.png" alt="Logo Jennjou" width={40} height={40} priority />
          Jennjou
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-300">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-fuchsia-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
