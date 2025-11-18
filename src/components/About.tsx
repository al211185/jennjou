export default function About() {
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
    "Tailwinds",
    "Github",
    "MongoDB",
  ];

  return (
    <section
      id="sobre-mi"
      data-fullpage-section
      className="relative flex min-h-screen w-full items-center justify-center border-y border-black px-4 py-16 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Sobre mííí</h2>

          <p className="text-lg leading-relaxed text-gray-700">
            Diseñador Digital de Medios Interactivos
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            Me considero una persona eficaz y creativa, siempre buscando nuevas
            maneras de combinar arte y tecnología para contar historias
            visuales únicas. Me inspiro en la cultura contemporánea del
            hyperpop y en el arte experimental, intentando siempre estar a la
            vanguardia. Desde enero he estado trabajando como freelancer,
            desarrollando proyectos que abarcan ilustración, modelado 3D,
            animación, diseño web y, este año, la programación de APIs en .NET
            9.0. Aquí encontrarás una muestra de mi proceso y resultados:
            bienvenidx a mi portafolio.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Software
              </h3>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {software.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black px-4 py-1 text-sm text-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Tecnologías
              </h3>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {technologies.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black px-4 py-1 text-sm text-black"
                  >
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
