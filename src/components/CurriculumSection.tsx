const experiences = [
  {
    period: "Enero - Mayo 2025",
    title: "Practicante de diseño y desarrollo interactivo",
    company: "Mech Robotix",
    points: [
      "Impartí un curso introductorio de Blender para niñas, niños y adolescentes.",
      "Diseñé flyers y material gráfico para la promoción de cursos online de robótica y 3D.",
      "Diseñé, desarrollé y programé en Unity el videojuego educativo «Otix aprende a organizar» para niñas y niños dentro del espectro autista.",
    ],
  },
  {
    period: "Enero - Noviembre 2025",
    title: "Proyecto de titulación · Aura.Mobile First",
    company: "Universidad Autónoma de Ciudad Juárez",
    points: [
      "Diseño y desarrollo de una plataforma web para la creación de páginas y sitios con enfoque mobile first.",
      "Implementación del backend utilizando .NET 9 para la gestión de proyectos académicos.",
      "Desarrollo del frontend con React + Vite y Tailwind CSS, cuidando accesibilidad y buenas prácticas de UX/UI.",
    ],
  },
  {
    period: "Agosto 2025 - Actualidad",
    title: "Diseñador de contenido interactivo para capacitación",
    company: "TotalGas",
    points: [
      "Producción de videos para cursos de inducción y capacitación continua para nuevas personas colaboradoras y personal activo.",
      "Diseño de un prototipo en Figma para la futura plataforma interna de cursos interactivos.",
      "Creación de material multimedia utilizando Figma, Illustrator, Photoshop, Blender, Premiere, Audition y After Effects.",
    ],
  },
];

const tools = [
  "Visual Studio",
  "After Effects",
  "ProCreate",
  "Figma",
  "Blender",
  "Photoshop",
  "InDesign",
  "Illustrator",
  "Capcut",
  "GitHub",
];

const skills = [
  "Creatividad",
  "Pensamiento crítico",
  "Empatía",
  "Comunicación eficaz",
  "Adaptabilidad",
  "Paciencia",
  "Liderazgo",
  "Trabajo en equipo",
  "Organización",
  "Flexibilidad",
  "Proactividad",
];

export default function CurriculumSection() {
  return (
    <section
      id="curriculum"
      data-fullpage-section
      className="relative flex h-screen w-full items-start justify-center border-y border-black bg-[var(--background)] px-4 py-8 text-black sm:px-6 overflow-hidden"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col space-y-12 overflow-y-auto pb-16">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Curriculum Vitae
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              José Romero Santiago
            </h2>
            <p className="text-lg text-gray-700">AKA. jennjou</p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-black/10 bg-gray-50 p-4 text-sm sm:gap-4 sm:p-5 md:max-w-xl">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Teléfono
              </p>
              <p className="font-medium text-gray-900">+52 656 768 8767</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Email
              </p>
              <p className="font-medium text-gray-900">
                al211185@alumnos.uacj.mx
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Ubicación
              </p>
              <p className="font-medium text-gray-900">
                Ciudad Juárez, Chihuahua
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                GitHub
              </p>
              <a
                href="https://github.com/al211185"
                className="font-medium underline decoration-gray-300 underline-offset-4 transition hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                github.com/al211185
              </a>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Columna izquierda: experiencia + educación + habilidades */}
          <div className="space-y-6 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Experiencia</h3>
              <span className="rounded-full border border-black px-3 py-1 text-xs uppercase tracking-wide">
                2025
              </span>
            </div>

            {/* Experiencias en grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {experiences.map((experience) => (
                <div
                  key={experience.title + experience.period}
                  className="rounded-xl border border-black/10 bg-gray-50 p-3"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gray-600">
                    {experience.period}
                  </p>
                  <p className="text-sm font-semibold">{experience.title}</p>
                  {experience.company && (
                    <p className="text-xs text-gray-700">
                      {experience.company}
                    </p>
                  )}
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-700">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Educación + habilidades */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-black/10 bg-gray-100 p-4">
                <h4 className="text-lg font-semibold">Educación</h4>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Universidad Autónoma de Ciudad Juárez
                </p>
                <p className="text-sm text-gray-700">
                  Diseñador Digital de Medios Interactivos
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Agosto 2021 - Presente
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-gray-100 p-4">
                <h4 className="text-lg font-semibold">Habilidades</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-black px-3 py-1 text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: intereses, idiomas, herramientas */}
          <div className="space-y-4 lg:space-y-6">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold">Intereses</h3>
              <p className="mt-2 text-sm text-gray-700">
                Diseño artístico, animación, interactividad y bases de datos.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold">Idiomas</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-center justify-between rounded-lg border border-black/5 bg-gray-50 px-3 py-2">
                  <span>Español</span>
                  <span className="rounded-full border border-black px-2 py-0.5 text-xs font-semibold">
                    Nativo
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-black/5 bg-gray-50 px-3 py-2">
                  <span>Inglés</span>
                  <span className="rounded-full border border-black px-2 py-0.5 text-xs font-semibold">
                    Intermedio
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold">Herramientas</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-black px-3 py-1 text-xs font-semibold text-gray-900"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.08)]">
              <h3 className="text-lg font-semibold">Intereses de diseño web</h3>
              <p className="mt-2 text-sm text-gray-700">
                Afinidad por el diseño web artístico con foco en experiencias
                inmersivas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
