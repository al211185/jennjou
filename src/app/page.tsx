import Hero from "../components/Hero"
import About from "../components/About"
import ProyectoCard from "../components/ProyectoCard"

export default function Home() {
  const destacados = [
    {
      title: "Próximo proyecto",
      slug: "proximo",
      cover: "/images/ejemplo.jpg"   // ← ruta desde `public/`, con slash inicial
    },
    //  …otros proyectos…
  ]

  return (
    <>
      <Hero />
      <About />

      <section id="proyectos" className="mt-12 grid gap-8 md:grid-cols-3">
        {destacados.map(p => (
          <ProyectoCard key={p.slug} {...p} />
        ))}
      </section>
    </>
  )
}
