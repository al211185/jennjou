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
    href: "https://www.linkedin.com/in/josé-romero-46454b28b ",
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      data-fullpage-section
      className="flex h-screen w-full items-center justify-center border-y border-black"
    >
      <div className="mx-auto max-w-6xl px-8 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Contacto</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          ¿Creamos algo icónico?
        </h2>
        <a
          href="mailto:arjoustudio@gmail.com"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          arjoustudio@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm uppercase tracking-[0.2em] text-gray-600">
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

