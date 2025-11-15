export default function Hero() {
  return (
    <section
      id="inicio"
      data-fullpage-section
      className="relative isolate flex h-screen w-full scroll-mt-32 items-center justify-center border-y border-black"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-16 text-center sm:px-8">
        <div className="mx-auto max-w-2xl space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
            Jennjou Studio
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Diseño visual, desarrollo web y experiencias inmersivas con ADN hyperpop
          </h1>
          <p className="text-base text-gray-700 sm:text-lg">
            Combino ilustración, 3D, motion graphics y código para construir marcas vibrantes y productos digitales memorables.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Ver portfolio
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-black px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Agendar reunión
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

