// src/data/projects.ts
export type ProjectCategory =
  | "desarrollo-web"
  | "ilustracion"
  | "modelado-3d"
  | "motion-after-effects"
  | "flyers"
  | "concept-art-videojuegos";

export interface Project {
  slug: string;
  title: string;
  cover?: string;
  videoSrc?: string;
  figmaEmbedSrc?: string;
  behanceEmbedSrc?: string;
  tags: string[];
  description: string;
  category: ProjectCategory;
  demoUrl?: string;
  youtubeId?: string;
  sketchfabModelId?: string;
}

export const projects: Project[] = [
  {
    slug: "web-sitio-memoria-viva",
    title: "Plataforma web · NEXORA",
    tags: ["React", "Tailwind CSS", "MongoDB", "APIs"],
    description:
      "Plataforma web de gestión empresarial interna que permite generar cotizaciones, comparar precios entre proveedores y administrar un inventario básico de productos y servicios.",
    category: "desarrollo-web",
    demoUrl: "https://youtu.be/2hOEFu_h684",
    youtubeId: "2hOEFu_h684",
  },

  {
    slug: "web-plataforma-sessions-vip",
    title: "Plataforma · AURA.Mobile First",
    tags: ["ASP.NET Core 9.0", "React + Vite", "Tailwind CSS", "SQL Server"],
    description:
      "Plataforma web educativa orientada a centralizar evidencias de proyectos y optimizar el flujo de trabajo entre estudiantes y docentes, diseñada bajo el enfoque mobile first como parte de mi proyecto de titulación.",
    category: "desarrollo-web",
    demoUrl: "https://www.youtube.com/watch?v=96FgYxY4TE8",
    youtubeId: "96FgYxY4TE8",
  },

  {
    slug: "web-rosalia-experience",
    title: "Fanpage inmersiva · ROSALÍA",
    figmaEmbedSrc:
      "https://embed.figma.com/design/aXAYFGM0P0uove6MTSc7Ek/Sitio?node-id=0-1&embed-host=share",
    tags: ["HTML", "CSS", "Fan experience"],
    description:
      "Micrositio responsive inspirado en la era MOTOMAMI que ofrece una experiencia fan inmersiva con selección de canciones, fragmentos de letras y una interfaz pensada para explorar el universo visual de ROSALÍA.",
    category: "desarrollo-web",
    demoUrl: "https://al211185.github.io/Rosalia",
  },
  {
    slug: "ilustracion-neon-melodias",
    title: "Lo que fui, lo que soy",
    cover: "/images/illsutrations/bissu.png",
    tags: ["Illustration", "Digital Art", "Dia de Muertos"],
    description:
      "Composición basada en la celebración del Día de Muertos, fusionando elementos tradicionales con una estética synthwave vibrante y moderna.",
    category: "ilustracion",
  },
  {
    slug: "ilustracion-virgin",
    title: "La virgen de mi maquila",
    cover: "/images/illsutrations/virgin.jpeg",
    tags: ["Concept Art", "Cyber religious", "Ethel Cain"],
    description:
      "Ilustración que combina lo religioso con la tecnología.",
    category: "ilustracion",
  },
  {
    slug: "ilustracion-hikaru",
    title: "Hikaru",
    cover: "/images/illsutrations/hikaru.jpeg",
    tags: ["Anime", "Fantasy", "Male Protagonist"],
    description:
      "Ilustracion basada en un personaje original de The Summer Hikaru Died.",
    category: "ilustracion",
  },
  {
    slug: "ilustracion-danielle",
    title: "Danielle",
    cover: "/images/illsutrations/danielle.png",
    tags: ["OC", "Feminity", "Demon"],
    description:
      "Ilustracion basada en mi personaje original Danielle.",
    category: "ilustracion",
  },
    {
    slug: "ilustracion-unholy-muse",
    title: "Danielle",
    cover: "/images/illsutrations/unholy.jpeg",
    tags: ["Videogame", "Experimental", "Demon"],
    description:
      "Ilustracion para concept art Unholy Muse.",
    category: "ilustracion",
  },
  {
    slug: "modelado-3d-aurora-santuario",
    title: "ART TOY · Danielle",
    cover: "/images/modelado/render-01.png",
    tags: ["Blender", "DANIELLE", "Cycles"],
    description:
      "Exploración de la feminidad y texturas nacaradas para la conceptualización de una pieza de arte en forma de juguete.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-puerto-sintetico",
    title: "Render · Liderazgo gasolinero 2023",
    cover: "/images/modelado/render-02.png",
    tags: ["Blender", "Shaders", "Cycles"],
    description:
      "Render en Cycles realizado durante mis prácticas profesionales para representar el reconocimiento de liderazgo gasolinero obtenidos por Total Gas en 2023.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-avatar-mistico",
    title: "Render · Liderazgo gasolinero 2025",
    cover: "/images/modelado/render-03.png",
    tags: ["Blender", "Shaders", "Cycles"],
    description:
      "Render en Cycles realizado durante mis prácticas profesionales para representar el reconocimiento de liderazgo gasolinero obtenidos por Total Gas en 2025.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-cristales-rituales",
    title: "Render · ZEN",
    cover: "/images/modelado/render-04.png",
    tags: ["Hard Surface", "Lighting", "Compositing"],
    description:
      "Render en Cycles inspirado en el video musical ZEN - JENNIE",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-rendero-05",
    title: "Video render · Danielle",
    videoSrc: "/images/modelado/rendero-05.mkv",
    tags: ["Blender", "Cycles", "DANIELLE"],
    description:
      "Secuencia en movimiento que explora animación de cámara lenta (basada en el personaje propio Danielle) renderizados en Cycles.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-sketchfab-guardian",
    title: "Modelo interactivo · AS IF IT'S YOUR LAST",
    cover: "/images/ejemplo.jpg",
    tags: ["Sketchfab", "BLACKPINK", "Blender"],
    description:
      "Modelado de isométrico inspirado en el video musical 'AS IF ITS YOUR LAST - BLACKPINK'.",
    category: "modelado-3d",
    demoUrl:
      "https://sketchfab.com/3d-models/isometricos-inspirados-en-as-if-its-your-last-9abfedb355174acfafe4d9b992c7984e",
    sketchfabModelId: "9abfedb355174acfafe4d9b992c7984e",
  },
  {
    slug: "modelado-3d-sketchfab-haven",
    title: "Modelo · ARJOU",
    cover: "/images/ejemplo.jpg",
    tags: ["Sketchfab", "ARJOU", "LOGO"],
    description:
      "Escena publicada en Sketchfab para demostración de logo diseñado para ARJOU.",
    category: "modelado-3d",
    demoUrl:
      "https://sketchfab.com/3d-models/actividad-c2-arjou-logo-7a82bac6b303435fb8e5ca075a08542f",
    sketchfabModelId: "7a82bac6b303435fb8e5ca075a08542f",
  },
  {
    slug: "after-effects-creditos",
    title: "Be My Angel - Concept Trailer",
    cover: "/images/ejemplo.jpg",
    tags: ["After Effects", "Motion Graphics", "2D"],
    description:
      "Dirección y animación de una pieza de animación 2D basado en el concept game Be My Angel",
    category: "motion-after-effects",
    demoUrl: "https://youtu.be/0TSC1JwIKmc",
    youtubeId: "0TSC1JwIKmc",
  },
  {
    slug: "after-effects-brand-reveal",
    title: "Mantra - Jennie",
    cover: "/images/ejemplo.jpg",
    tags: ["MAYA", "Animación", "3D"],
    description:
      "Animación desarrollada en MAYA de coreografía basada en la canción MANTRA - JENNIE.",
    category: "motion-after-effects",
    demoUrl: "https://youtu.be/gx81Hf6j-8g",
    youtubeId: "gx81Hf6j-8g",
  },
  {
    slug: "after-effects-trailer-hyperbloom",
    title: "ZEN · JENNIE",
    cover: "/images/ejemplo.jpg",
    tags: ["After Effects", "Music Edit", "Blender"],
    description:
      "Animación con cortes rítmicos, overlays glitch y tipografía cinética basada en el video musical ZEN - JENNIE.",
    category: "motion-after-effects",
    demoUrl: "https://youtu.be/fySEJBcUL58",
    youtubeId: "fySEJBcUL58",
  },
  {
    slug: "flyers-sintonia-velvet",
    title: "Flyer · Pretty girls",
    cover: "/images/branding/flyer-6.png",
    tags: ["Adobe Illustrator", "Flyer", "Photoshop"],
    description:
      "Cartel de inspiración sesentera para una campaña ficticia del sencillo “Mantra” de Jennie, con tipografía llamativa y texturas de medios tonos que refuerzan un mensaje de empoderamiento femenino.",
    category: "flyers",
  },

  {
    slug: "flyers-sintonia-velvet",
    title: "Flyer · Curso Blender",
    cover: "/images/branding/flyer-1.png",
    tags: ["Adobe Illustrator", "Flyer", "MECH ROBOTIX"],
    description:
      "Flyer creado en Illustrator y Blender para la promoción de un curso online de Blender durante mis prácticas profesionales en Mech Robotix.",
    category: "flyers",
  },
  {
    slug: "flyers-neon-ritual",
    title: "Flyer · Curso AutoCAD",
    cover: "/images/branding/flyer-2.png",
    tags: ["Adobe Illustrator", "Flyer", "MECH ROBOTIX"],
    description:
      "Flyer creado en Illustrator para la promoción de un curso online de AutoCAD durante mis prácticas profesionales en Mech Robotix.",
    category: "flyers",
  },
  {
    slug: "flyers-digital-bloom",
    title: "Flyer · Curso Excel",
    cover: "/images/branding/flyer-3.png",
    tags: ["Adobe Illustrator", "Excel", "MECH ROBOTIX"],
    description:
      "Flyer creado en Excel e Illustrator para la promoción de un curso online de Excel durante mis prácticas profesionales en Mech Robotix.",
    category: "flyers",
  },
  {
    slug: "flyers-laser-nights",
    title: "Flyer · Curso Robótica",
    cover: "/images/branding/flyer-4.png",
    tags: ["Adobe Illustrator", "Flyer", "MECH ROBOTIX"],
    description:
      "Flyer creado en Illustrator para la promoción de un curso online de Robótica durante mis prácticas profesionales en Mech Robotix.",
    category: "flyers",
  },
  {
    slug: "flyers-moonlight-club",
    title: "Flyer · Curso Python",
    cover: "/images/branding/flyer-5.png",
    tags: ["Adobe Illustrator", "Flyer", "MECH ROBOTIX"],
    description:
      "Flyer creado en Illustrator para la promoción de un curso online de Python durante mis prácticas profesionales en Mech Robotix.",
    category: "flyers",
  },
  {
    slug: "concept-art-reliquias-neon",
    title: "Demo · OTIX: Aprende a organizar",
    tags: ["DEMO", "UNITY", "Videojuegos"],
    description:
      "Demo de videojuego centrado en infancias dentro del espectro autista, desarrollado en Unity con modelos 3D creados en Blender, ganador de medalla de plata en Infomatrix Chihuahua.",
    category: "concept-art-videojuegos",
    demoUrl: "https://youtu.be/hjnKhY0YXmQ",
    youtubeId: "hjnKhY0YXmQ",
  },
  {
    slug: "concept-art-metaverso-angel",
    title: "Demo · EAT AN ANGEL",
    tags: ["Storyboards", "Lookdev", "Game concept"],
    description:
      "Video conceptual que presenta la demo de un videojuego experimental con tres mecánicas distintas en tres mundos diferentes, todo ilustrado con un estilo doodle dinámico.",
    category: "concept-art-videojuegos",
    demoUrl: "https://youtu.be/8A8DmZ13m_g",
    youtubeId: "8A8DmZ13m_g",
  },
  {
    slug: "concept-art-behance-galaxia",
    title: "Concept Art · BE MY ANGEL",
    tags: ["Behance", "Characters", "Videojuegos"],
    description:
      "Proyecto de concept art BE MY ANGEL, un character kit publicado en Behance que explora el amor a la feminidad y la banalidad a través de una de mis obras centrales.",
    category: "concept-art-videojuegos",
    demoUrl: "https://www.behance.net/gallery/169279777/Jennie-Jou-Game-Concepts",
    behanceEmbedSrc: "https://www.behance.net/embed/project/169279777?ilo0=1",
  },
];

export interface PortfolioSection {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

const descriptions: Record<ProjectCategory, string> = {
  "desarrollo-web":
    "Experiencias digitales a medida con enfoque en rendimiento, accesibilidad y storytelling interactivo.",
  ilustracion:
    "Ilustraciones que fusionan cultura pop, paletas neón y composición editorial para narrativas memorables.",
  "modelado-3d":
    "Escenarios y personajes 3D listos para animación, videojuegos o impresión, con especial atención al lookdev.",
  "motion-after-effects":
    "Piezas de motion graphics con ritmo, diseño tipográfico y exploración de texturas audiovisuales.",
  flyers:
    "Campañas impresas y digitales que potencian eventos, lanzamientos y festivales desde la estética hyperpop.",
  "concept-art-videojuegos":
    "Conceptualización de personajes, mundos y sistemas de juego mediante videos pitch y presentaciones interactivas.",
};

export const categoryTitles: Record<ProjectCategory, string> = {
  "desarrollo-web": "Desarrollo web",
  ilustracion: "Ilustraciones",
  "modelado-3d": "Modelado y render 3D",
  "motion-after-effects": "Motion graphics y animaciones",
  flyers: "Flyers & branding impreso",
  "concept-art-videojuegos": "Concept art y videojuegos",
};

export const portfolioSections: PortfolioSection[] = (Object.keys(descriptions) as ProjectCategory[]).map(
  (category) => ({
    id: category,
    title: categoryTitles[category],
    description: descriptions[category],
    projects: projects.filter((project) => project.category === category),
  })
);
