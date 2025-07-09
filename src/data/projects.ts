// src/data/projects.ts
export interface Project {
  slug: string;
  title: string;
  cover: string;      // /images/…
  tags: string[];     // ["Illustration","APIS",…]
  description: string; 
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "ilustracion",
    title: "Serie Ilustración Experimental",
    cover: "/images/illu.jpg",
    tags: ["Illustration", "Graphic Designer"],
    description:
      "Una serie de ilustraciones con paleta neon y estética cyber-pop donde exploro tipografías dinámicas.",
  },
  {
    slug: "web-design-apis",
    title: "Diseño Web & APIs",
    cover: "/images/web-apis.jpg",
    tags: ["Web Design", "APIS"],
    description:
      "Portal estático con consumo de APIs REST para mostrar datos en tiempo real, usando Next.js y Tailwind.",
    demoUrl: "https://your-demo-url.com",
  },
  {
    slug: "animacion-3d",
    title: "Animación 3D React-Three",
    cover: "/images/3d.jpg",
    tags: ["animation", "ILLUSTRATION"],
    description:
      "Demo interactiva en WebGL con React-Three-Fiber, shaders y controles de cámara personalizados.",
  },
  // …más proyectos según tu Behance…
];
