const software = [
  "Adobe InDesign",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Android Studio",
  "Figma",
  "Procreate",
  "Visual Studio",
  "Visual Studio Code",
  "Microsoft Office",
];

const technologies = [
  "ASP .NET 5.0 y 9.0",
  "Vite",
  "Node.js",
  "React",
  "Tailwind",
  "GitHub",
  "MongoDB",
];

export default function About() {
  return (
    <section
      id="sobre-mi"
      data-fullpage-section
      data-tone="about"
      className="relative flex min-h-screen w-full items-center justify-center border-y border-black px-4 py-16 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
        <div className="section-shell reveal-up mx-auto max-w-4xl space-y-6 px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="kicker">Sobre mí</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Diseñador Digital de Medios Interactivos
          </h2>

          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Me considero una persona eficaz y creativa, siempre buscando nuevas
            maneras de combinar arte y tecnología para contar historias visuales
            únicas. Me inspiro en la cultura contemporánea hyperpop y en el
            arte experimental, intentando mantener una propuesta actual y
            memorable.
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            Como freelancer, desarrollo proyectos de ilustración, modelado 3D,
            animación, diseño web y APIs en .NET 9.0. Aquí encontrarás una
            muestra de mi proceso y resultados.
          </p>

          <div className="mt-4 grid gap-5 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-black/20 bg-white/60 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Software
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {software.map((item) => (
                  <span key={item} className="chip px-3 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/20 bg-white/60 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Tecnologías
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {technologies.map((item) => (
                  <span key={item} className="chip px-3 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
