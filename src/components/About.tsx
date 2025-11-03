export default function About() {
  return (
    <section
      id="sobre-mi"
      className="relative mt-24 overflow-hidden rounded-3xl border border-black bg-white px-8 py-20 scroll-mt-32"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">Sobre mí</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Soy Jennjou, directora creativa y desarrolladora front-end. Diseño ecosistemas visuales que viven tanto en la pantalla
          como en piezas impresas. Me obsesiona la narrativa, la tecnología emergente y las sinergias entre música, cultura pop
          y estética digital.
        </p>
        <p className="text-base text-gray-600">
          Lidero proyectos de branding, diseño UI, ilustración editorial y motion graphics; colaboro con equipos multidisciplinarios
          para lanzar productos con identidad propia y experiencias que sorprenden.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Dirección de arte", "Design systems", "React & Next.js", "Blender", "Adobe After Effects", "Brand Storytelling"].map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full border border-black px-4 py-1 text-sm text-black"
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
