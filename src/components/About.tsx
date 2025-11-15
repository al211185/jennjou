export default function About() {
  return (
    <section
      id="sobre-mi"
      data-fullpage-section
      className="relative flex h-screen w-full scroll-mt-32 items-center justify-center border-y border-black"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center overflow-hidden px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-5 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Sobre mí</h2>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Soy Jennjou, directora creativa y desarrolladora front-end. Diseño ecosistemas visuales que viven tanto en la pantalla
            como en piezas impresas. Me obsesiona la narrativa, la tecnología emergente y las sinergias entre música, cultura pop
            y estética digital.
          </p>
          <p className="text-sm text-gray-600 sm:text-base">
            Lidero proyectos de branding, diseño UI, ilustración editorial y motion graphics; colaboro con equipos multidisciplinarios
            para lanzar productos con identidad propia y experiencias que sorprenden.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Dirección de arte",
              "Design systems",
              "React & Next.js",
              "Blender",
              "Adobe After Effects",
              "Brand Storytelling",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-black px-4 py-1 text-sm text-black"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
