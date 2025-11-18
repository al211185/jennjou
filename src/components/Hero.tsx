export default function Hero() {
  return (
    <section
      id="inicio"
      data-fullpage-section
              className="relative isolate flex min-h-[100svh] w-full items-center justify-center border-y border-black px-4 py-16 sm:min-h-screen sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-2 sm:px-4">
        <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            Jennjou
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Diseño visual, desarrollo web y experiencias inmersivas con ADN hyperpop
          </h1>
          <p className="text-base text-gray-700 sm:text-xl">
            Combino ilustración, 3D, motion graphics y código para construir marcas vibrantes y productos digitales memorables.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href="#portfolio"
              className="w-full rounded-full bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Ver portfolio
            </a>
            <a
              href="#contacto"
              className="w-full rounded-full border border-black px-6 py-3 text-center font-semibold text-black transition hover:bg-black hover:text-white sm:w-auto"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

