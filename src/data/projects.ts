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
  cover?: string;
  videoSrc?: string;
  figmaEmbedSrc?: string;
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
    title: "Micrositio · Memoria Viva",
    tags: ["Next.js", "Scroll-based", "Storytelling"],
    description:
      "Landing one-page que mezcla animaciones sincronizadas con el scroll, transiciones fluidas y un storytelling audiovisual completo.",
    category: "desarrollo-web",
    demoUrl: "https://youtu.be/2hOEFu_h684",
    youtubeId: "2hOEFu_h684",
  },
  {
    slug: "web-plataforma-sessions-vip",
    title: "Plataforma · Sessions VIP",
    tags: ["Responsive", "UI Motion", "Componentes"],
    description:
      "Exploración de interfaz para shows en streaming con layouts responsivos, cards animadas y prototipos navegables registrados en video.",
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
      "Micrositio responsive inspirado en la era MOTOMAMI con biografía, discografía y una línea de tiempo interactiva centrada en fans.",
    category: "desarrollo-web",
    demoUrl: "https://al211185.github.io/Rosalia",
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
    slug: "modelado-3d-rendero-05",
    title: "Video render · Rendero 05",
    videoSrc: "/images/modelado/rendero-05.mkv",
    tags: ["Blender", "Cycles", "Composición"],
    description:
      "Secuencia en movimiento que explora animación de cámara lenta, glow de neón y materiales iridiscentes renderizados en Cycles.",
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
    title: "Mantra - Jennie",
    cover: "/images/ejemplo.jpg",
    tags: ["Branding", "Particle Systems"],
    description:
      "Animación de presentación de marca con partículas programadas y sincronización precisa con banda sonora original.",
    category: "motion-after-effects",
    demoUrl: "https://youtu.be/gx81Hf6j-8g",
    youtubeId: "gx81Hf6j-8g",
  },
  {
    slug: "flyers-sintonia-velvet",
    title: "Flyer · Sintonía Velvet",
    cover: "/images/branding/flyer-1.png",
    tags: ["Print", "Branding", "Tipografía"],
    description:
      "Diseño editorial con lettering líquido y texturas iridiscentes pensado para un ciclo de fiestas synthwave.",
    category: "flyers",
  },
  {
   slug: "flyers-neon-ritual",
    title: "Flyer · Neon Ritual",
    cover: "/images/branding/flyer-2.png",
    tags: ["Poster", "Color", "Editorial"],
    description:
      "Composición vertical con gradientes eléctricos y símbolos modulares que conectan identidad impresa y digital.",
    category: "flyers",
  },
  {
    slug: "flyers-digital-bloom",
    title: "Flyer · Digital Bloom",
    cover: "/images/branding/flyer-3.png",
    tags: ["Branding", "Texturas", "CMYK"],
    description:
      "Arte de campaña que mezcla ilustración botánica experimental y patrones glitch para activaciones editoriales.",
    category: "flyers",
  },
  {
    slug: "flyers-laser-nights",
    title: "Flyer · Laser Nights",
    cover: "/images/branding/flyer-4.png",
    tags: ["Layout", "Retícula", "Festival"],
    description:
      "Sistema de retículas flexibles con fotografía intervenida y contraste alto para comunicar line ups masivos.",
    category: "flyers",
  },
  {
    slug: "flyers-moonlight-club",
    title: "Flyer · Moonlight Club",
    cover: "/images/branding/flyer-5.png",
    tags: ["Flyer", "Metalizados", "Brand System"],
    description:
      "Serie de piezas impresas con barniz sectorizado y color blocking pastel para merchandising de club nocturno.",
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
  "motion-after-effects": "Motion graphics y animaciones",
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
