const contactLinks = [
  {
    label: "behance",
    href: "https://www.behance.net/",
  },
  {
    label: "instagram",
    href: "https://www.instagram.com/",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/",
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      data-fullpage-section
      className="flex h-screen w-full scroll-mt-32 items-center justify-center border-y border-black"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8">
        <p className="text-[0.7rem] uppercase tracking-[0.35em] text-gray-500">Contacto</p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          ¿Creamos algo icónico?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-700 sm:text-base">
          Estoy disponible para colaboraciones, lanzamientos de productos, dirección de arte y consultoría creativa.
          Escríbeme y agendemos una reunión virtual.
        </p>
        <a
          href="mailto:hola@jennjou.studio"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:px-8"
        >
          hola@jennjou.studio
        </a>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-600 sm:text-sm">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-black px-5 py-2 transition hover:bg-black hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

