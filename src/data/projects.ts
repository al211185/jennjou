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
    slug: "modelado-3d-metaescena",
    title: "Metaescena Holográfica",
    cover: "/images/ejemplo.jpg",
    tags: ["Blender", "Shaders", "Lighting"],
    description:
      "Modelado y texturizado de un entorno holográfico con iluminación volumétrica y assets optimizados para tiempo real.",
    category: "modelado-3d",
  },
  {
    slug: "modelado-3d-figura-coleccionable",
    title: "Figura Coleccionable Interdimensional",
    cover: "/images/ejemplo.jpg",
    tags: ["Sculpt", "Retopology", "Lookdev"],
    description:
      "Escultura digital detallada con retopología lista para impresión 3D y materiales PBR listos para render cinematográfico.",
    category: "modelado-3d",
  },
  {
    slug: "after-effects-creditos",
    title: "Secuencia de créditos Hyperdrive",
    cover: "/images/ejemplo.jpg",
    tags: ["After Effects", "Motion Graphics", "Kinetic Type"],
    description:
      "Dirección y animación de una pieza tipográfica cinética que mezcla glitches analógicos con gradients cromáticos.",
    category: "motion-after-effects",
  },
  {
    slug: "after-effects-brand-reveal",
    title: "Brand Reveal Aurora",
    cover: "/images/ejemplo.jpg",
    tags: ["Branding", "Particle Systems"],
    description:
      "Animación de presentación de marca con partículas programadas y sincronización precisa con banda sonora original.",
    category: "motion-after-effects",
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
