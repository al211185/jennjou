export default function Hero() {
  return (
    <section
      id="inicio"
      data-fullpage-section
      data-tone="hero"
      className="relative isolate flex min-h-screen w-full items-center justify-center border-y border-black px-4 py-16 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-2 sm:px-4">
        <div className="section-shell reveal-up mx-auto max-w-4xl space-y-5 px-6 py-10 text-center sm:space-y-6 sm:px-10">
          <p className="kicker">Jennjou</p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Diseño visual, desarrollo web y experiencias inmersivas con ADN
            hyperpop
          </h1>
          <p className="text-base text-gray-700 sm:text-xl">
            Combino ilustración, 3D, motion graphics y código para construir
            marcas vibrantes y productos digitales memorables.
          </p>
          <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
            {["Ilustración", "3D", "Motion", "Web"].map((item) => (
              <span key={item} className="chip px-4 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <a
              href="#portfolio"
              className="btn-primary w-full px-6 py-3 text-center sm:w-auto"
            >
              Ver portfolio
            </a>
            <a
              href="#contacto"
              className="btn-secondary w-full px-6 py-3 text-center sm:w-auto"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
