const contactLinks = [
  {
    label: "behance",
    href: "https://www.behance.net/gallery/225913675/Portfolio-jennjou/modules/1291817753",
  },
  {
    label: "instagram",
    href: "https://www.instagram.com/jennjou_/?hl=es-la",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/josé-romero-46454b28b",
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      data-fullpage-section
      data-tone="contact"
      className="flex min-h-screen w-full items-center justify-center border-y border-black px-4 py-16 sm:px-6"
    >
      <div className="section-shell reveal-up mx-auto w-full max-w-5xl px-6 py-10 text-center sm:px-10">
        <p className="kicker">Contacto</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          ¿Creamos algo icónico?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700">
          Abierto a colaboraciones en branding, visual design, motion y
          desarrollo web creativo.
        </p>
        <a
          href="mailto:arjoustudio@gmail.com"
          className="btn-primary mt-8 inline-flex w-full px-8 py-3 sm:w-auto"
        >
          arjoustudio@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-700 sm:text-sm">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary px-5 py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
