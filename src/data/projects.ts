// src/data/projects.ts
export type ProjectCategory =
  | "desarrollo-web"
  | "ilustracion"
  | "modelado-3d"
  | "motion-after-effects"
  | "flyers";

export interface Project {
  slug: string;
  title: string;
  cover: string;
  tags: string[];
  description: string;
  category: ProjectCategory;
  demoUrl?: string;
  youtubeId?: string;
  sketchfabModelId?: string;
}

export const projects: Project[] = [
  {
    slug: "web-laboratorio-digital",
    title: "Laboratorio Digital - Sitio corporativo",
    cover: "/images/ejemplo.jpg",
    tags: ["Next.js", "UI Systems", "UX"],
    description:
      "Arquitectura y desarrollo de un sitio institucional que integra un diseño modular con componentes accesibles y un CMS headless.",
    category: "desarrollo-web",
    demoUrl: "https://example.com/laboratorio-digital",
  },
  {
    slug: "web-plataforma-musical",
    title: "Plataforma Musical Hyperpop",
    cover: "/images/ejemplo.jpg",
    tags: ["React", "API REST", "Design System"],
    description:
      "Landing dinámica con integración a APIs públicas para charts musicales, dashboards personalizados y experiencias responsivas.",
    category: "desarrollo-web",
  },
  {
    slug: "web-ecommerce-fantasia",
    title: "E-commerce Fantasía Tech",
    cover: "/images/ejemplo.jpg",
    tags: ["Commerce", "Animations", "Storytelling"],
    description:
      "Tienda digital con narrativa inmersiva, microinteracciones y checkout optimizado para incrementar la conversión móvil.",
    category: "desarrollo-web",
  },
  {
    slug: "ilustracion-neon-melodias",
    title: "Neon Melodías",
    cover: "/images/ejemplo.jpg",
    tags: ["Illustration", "Digital Art", "Synthwave"],
    description:
      "Serie de retratos ilustrados que fusionan sintetizadores retro con texturas fluidas y tipografías experimentales.",
    category: "ilustracion",
  },
  {
    slug: "ilustracion-bestias-urbanas",
    title: "Bestias Urbanas",
    cover: "/images/ejemplo.jpg",
    tags: ["Concept Art", "Editorial"],
    description:
      "Colección de pósters editoriales donde criaturas fantásticas habitan paisajes urbanos hiperrealistas.",
    category: "ilustracion",
  },
  {
    slug: "ilustracion-cuento-lunar",
    title: "Cuento Lunar",
    cover: "/images/ejemplo.jpg",
    tags: ["Children", "Fantasy", "Color Grading"],
    description:
      "Ilustraciones para un cuento infantil con composición onírica y paleta luminosa inspirada en la cultura pop asiática.",
    category: "ilustracion",
  },
  {
    slug: "modelado-3d-aurora-santuario",
    title: "Render · Santuario Aurora",
    cover: "/images/modelado/render-01.png",
    tags: ["Blender", "Cycles", "Lookdev"],
    description:
      "Exploración de iluminación volumétrica y texturas nacaradas para un santuario sci-fi que mezcla mármol sintético con neón.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-puerto-sintetico",
    title: "Render · Puerto Sintético",
    cover: "/images/modelado/render-02.png",
    tags: ["Environment", "Shaders", "Color grading"],
    description:
      "Paisaje urbano renderizado en Cycles con atmósferas nocturnas y niebla procedural que refuerza la escala cinematográfica.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-avatar-mistico",
    title: "Render · Avatar Místico",
    cover: "/images/modelado/render-03.png",
    tags: ["Character", "Lookdev", "Texturing"],
    description:
      "Retrato estilizado con piel translúcida, dispersión subsuperficial y paleta cálida inspirada en la estética hyperpop.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-cristales-rituales",
    title: "Render · Cristales rituales",
    cover: "/images/modelado/render-04.png",
    tags: ["Hard Surface", "Lighting", "Compositing"],
    description:
      "Still frame con minerales flotantes y reflejos anamorficos creado para una secuencia de título experimental.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-sketchfab-guardian",
    title: "Modelo interactivo · Guardian Core",
    cover: "/images/ejemplo.jpg",
    tags: ["Sketchfab", "Realtime", "Blender"],
    description:
      "Versión optimizada para WebGL del mecha Guardian Core con animaciones orbitales y materiales PBR.",
    category: "modelado-3d",
    demoUrl:
      "https://sketchfab.com/3d-models/isometricos-inspirados-en-as-if-its-your-last-9abfedb355174acfafe4d9b992c7984e",
    sketchfabModelId: "9abfedb355174acfafe4d9b992c7984e",
  },
  {
    slug: "modelado-3d-sketchfab-haven",
    title: "Modelo interactivo · Haven Capsule",
    cover: "/images/ejemplo.jpg",
    tags: ["Sketchfab", "Realtime", "Texturing"],
    description:
      "Escena publicada en Sketchfab para recorridos 360° con assets listos para VR y bake de iluminación global.",
    category: "modelado-3d",
    demoUrl:
      "https://sketchfab.com/3d-models/actividad-c2-arjou-logo-7a82bac6b303435fb8e5ca075a08542f",
    sketchfabModelId: "7a82bac6b303435fb8e5ca075a08542f",
  },
  {
    slug: "after-effects-creditos",
    title: "Be My Angel - Concept Trailer",
    cover: "/images/ejemplo.jpg",
    tags: ["After Effects", "Motion Graphics", "Kinetic Type"],
    description:
      "Dirección y animación de una pieza de animación 2D basado en el concept game Be My Angel",
    category: "motion-after-effects",
    demoUrl: "https://youtu.be/0TSC1JwIKmc",
    youtubeId: "0TSC1JwIKmc",
  },
  {
    slug: "after-effects-brand-reveal",
    title: "Brand Reveal Aurora",
    cover: "/images/ejemplo.jpg",
    tags: ["Branding", "Particle Systems"],
    description:
      "Animación de presentación de marca con partículas programadas y sincronización precisa con banda sonora original.",
    category: "motion-after-effects",
    demoUrl: "https://youtu.be/gx81Hf6j-8g",
    youtubeId: "gx81Hf6j-8g",
  },
  {
    slug: "flyers-hyperpop-tour",
    title: "Hyperpop Tour 2025",
    cover: "/images/ejemplo.jpg",
    tags: ["Print", "Layout", "Typography"],
    description:
      "Serie de flyers impresos con tipografía líquida y texturas metalizadas, pensados para eventos musicales futuristas.",
    category: "flyers",
  },
  {
    slug: "flyers-festival-visual",
    title: "Festival Visual Synth",
    cover: "/images/ejemplo.jpg",
    tags: ["Poster", "Color", "Gradient Maps"],
    description:
      "Campaña gráfica con variaciones cromáticas que mantienen consistencia de marca en formatos impresos y digitales.",
    category: "flyers",
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
};

export const categoryTitles: Record<ProjectCategory, string> = {
  "desarrollo-web": "Desarrollo web",
  ilustracion: "Ilustraciones",
  "modelado-3d": "Modelado y render 3D",
  "motion-after-effects": "Motion graphics · After Effects",
  flyers: "Flyers & branding impreso",
};

export const portfolioSections: PortfolioSection[] = (Object.keys(descriptions) as ProjectCategory[]).map(
  (category) => ({
    id: category,
    title: categoryTitles[category],
    description: descriptions[category],
    projects: projects.filter((project) => project.category === category),
  })
);
