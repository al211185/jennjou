export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-24 text-center shadow-[0_30px_80px_-60px_rgba(0,0,0,0.45)] scroll-mt-32"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">
          Jennjou Studio
        </p>
        <h1 className="text-4xl font-bold leading-tight text-black sm:text-6xl">
          Diseño visual, desarrollo web y experiencias inmersivas con sello propio
        </h1>
        <p className="text-lg text-black/70 sm:text-xl">
          Combino ilustración, 3D, motion graphics y código para construir marcas memorables con precisión artesanal.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-black/80"
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
    </section>
  );
}
