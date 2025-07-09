import Image from "next/image";

export default function About() {
  return (
    <section id="sobre-mi" className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden">
          <Image
            src="/images/avatar.jpg"
            alt="Jennjou Retrato"
            width={160}
            height={160}
            className="object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold mt-6">Sobre mí</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Soy Jennjou, una creativa multidisciplinar que fusiona ilustración,
          3D y desarrollo web con un toque experimental.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["JavaScript", "React", "Next.js", "Blender", "Unity", ".NET 9"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary text-black rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
