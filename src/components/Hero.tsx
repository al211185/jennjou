export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-extrabold">Jennjou</h1>
      <p className="mt-4 text-2xl">Ilustración · 3D · Code · Hyperpop</p>
      <a
        href="#proyectos"
        className="mt-8 px-6 py-3 border-2 border-primary hover:bg-primary transition"
      >
        Ver proyectos
      </a>
    </section>
  );
}
