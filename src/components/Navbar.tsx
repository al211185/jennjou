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
    <nav className="fixed top-0 z-20 w-full border-b border-black bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-black">
          <Image src="/images/logo.png" alt="Logo Jennjou" width={40} height={40} priority />
          Jennjou
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
