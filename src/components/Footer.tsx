export default function Footer() {
  return (
    <footer
      data-fullpage-section
      className="flex h-screen w-full items-center justify-center border-t border-black px-6 text-center text-sm text-gray-600 lg:px-12"
    >
      © {new Date().getFullYear()} Jennjou Studio · Diseño, código y visuales hiperpop desde Latinoamérica.
    </footer>
  );
}
