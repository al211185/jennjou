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
      className="mt-24 rounded-3xl border border-black/10 bg-white px-8 py-16 text-center scroll-mt-32"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-black/60">Contacto</p>
      <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
        ¿Creamos algo icónico?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base text-black/60">
        Estoy disponible para colaboraciones, lanzamientos de productos, dirección de arte y consultoría creativa.
        Escríbeme y agendemos una reunión virtual.
      </p>
      <a
        href="mailto:hola@jennjou.studio"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3 font-semibold text-white transition hover:bg-black/80"
      >
        hola@jennjou.studio
      </a>

      <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm uppercase tracking-[0.2em] text-black/60">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-black/15 px-5 py-2 transition hover:border-black hover:text-black"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
