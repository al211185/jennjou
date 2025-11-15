export default function Hero() {
  return (
    <section
      id="inicio"
      data-fullpage-section
      className="relative isolate flex h-screen w-full items-center justify-center border-y border-black"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center px-8 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            Jennjou Studio
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Diseño visual, desarrollo web y experiencias inmersivas con ADN hyperpop
          </h1>
          <p className="text-lg text-gray-700 sm:text-xl">
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

