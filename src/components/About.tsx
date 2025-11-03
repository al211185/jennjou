export default function About() {
  return (
    <section
      id="sobre-mi"
      className="relative mt-24 overflow-hidden rounded-3xl border border-black/10 bg-neutral-50 px-8 py-20 scroll-mt-32"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-black sm:text-4xl">Sobre mí</h2>
        <p className="text-lg leading-relaxed text-black/70">
          Soy Jennjou, directora creativa y desarrolladora front-end. Diseño ecosistemas visuales que viven tanto en la pantalla
          como en piezas impresas. Me obsesiona la narrativa, la tecnología emergente y las sinergias entre música, cultura pop y
          estética digital.
        </p>
        <p className="text-base text-black/60">
          Lidero proyectos de branding, diseño UI, ilustración editorial y motion graphics; colaboro con equipos
          multidisciplinarios para lanzar productos con identidad propia y experiencias que sorprenden.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Dirección de arte", "Design systems", "React & Next.js", "Blender", "Adobe After Effects", "Brand Storytelling"].map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full border border-black/20 bg-white px-4 py-1 text-sm text-black/70"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
