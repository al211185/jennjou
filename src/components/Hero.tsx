export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-purple-900/50 via-black to-zinc-950 px-8 py-24 text-center shadow-[0_40px_120px_-45px_rgba(168,85,247,0.6)] scroll-mt-32"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-fuchsia-300">
          Jennjou Studio
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
          Diseño visual, desarrollo web y experiencias inmersivas con ADN hyperpop
        </h1>
        <p className="text-lg text-zinc-300 sm:text-xl">
          Combino ilustración, 3D, motion graphics y código para construir marcas vibrantes y productos digitales memorables.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="rounded-full bg-fuchsia-400 px-6 py-3 font-semibold text-black transition hover:bg-fuchsia-300"
          >
            Ver portfolio
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-fuchsia-400 px-6 py-3 font-semibold text-fuchsia-300 transition hover:bg-fuchsia-400/10"
          >
            Agendar reunión
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
    </section>
  );
}
