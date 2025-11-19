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
      className="border-y border-black bg-slate-50 px-4 py-16 text-slate-900 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-700">Curriculum Vitae</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">José Romero Santiago</h2>
            <p className="text-lg text-slate-700">AKA. jennjou</p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-x-8">
            <div>
              <p className="font-medium text-slate-800">Teléfono</p>
              <p>+52 656 768 8767</p>
            </div>
            <div>
              <p className="font-medium text-slate-800">Email</p>
              <p>al211185@alumnos.uacj.mx</p>
            </div>
            <div>
              <p className="font-medium text-slate-800">Ubicación</p>
              <p>Ciudad Juárez, Chihuahua</p>
            </div>
            <div>
              <p className="font-medium text-slate-800">GitHub</p>
              <a
                href="https://github.com/al211185"
                className="underline decoration-slate-400 underline-offset-2 transition hover:text-slate-600"
                target="_blank"
                rel="noreferrer"
              >
                github.com/al211185
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="text-xl font-semibold text-slate-900">Experiencia</h3>
            <div className="space-y-6">
              {experiences.map((experience) => (
                <div
                  key={experience.title + experience.period}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    {experience.period}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">{experience.title}</p>
                  {experience.company && (
                    <p className="text-sm text-slate-700">{experience.company}</p>
                  )}
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}


            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-lg font-semibold text-slate-900">Educación</h4>
                <p className="mt-1 text-sm text-slate-800">
                  Universidad Autónoma de Ciudad Juárez
                </p>
                <p className="text-sm text-slate-700">Diseñador Digital de Medios Interactivos</p>
                <p className="text-xs uppercase tracking-wide text-slate-600">Agosto 2021 - Presente</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-lg font-semibold text-slate-900">Habilidades</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Intereses</h3>
              <p className="mt-2 text-sm text-slate-700">
                Diseño artístico, animación, interactividad y bases de datos.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Idiomas</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li className="flex items-center justify-between">
                  <span>Español</span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Nativo</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Inglés</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">Intermedio</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Herramientas</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-800">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Intereses de diseño web</h3>
              <p className="mt-2 text-sm text-slate-700">
                Afinidad por el diseño web artístico con foco en experiencias inmersivas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
