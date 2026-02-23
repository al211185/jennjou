export default function Footer() {
  return (
    <footer
      data-fullpage-section
      data-tone="footer"
      className="flex h-screen w-full items-center justify-center border-t border-black px-6 py-14 text-center lg:px-12"
    >
      <div className="section-shell reveal-up max-w-4xl px-8 py-8 text-sm text-gray-700">
        © {new Date().getFullYear()} Jennjou · Diseño, código y visuales
        hyperpop desde Latinoamérica.
      </div>
    </footer>
  );
}
