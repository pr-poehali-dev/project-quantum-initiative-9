import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Каталог
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Виды телефонов</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {[
            {
              number: "01",
              title: "Кнопочные телефоны",
              category: "Классические мобильные устройства",
              year: "1990-е",
              direction: "left",
              image: "https://cdn.poehali.dev/projects/f1f1ca72-35ae-4635-b789-fcaea8059a42/files/e50ebb62-6449-4022-8229-4dada3ab1797.jpg",
            },
            {
              number: "02",
              title: "Смартфоны",
              category: "Сенсорные многофункциональные устройства",
              year: "2000-е",
              direction: "right",
              image: "https://cdn.poehali.dev/projects/f1f1ca72-35ae-4635-b789-fcaea8059a42/files/f978a65b-3137-4476-a945-d799fb41557d.jpg",
            },
            {
              number: "03",
              title: "Раскладушки и слайдеры",
              category: "Телефоны с необычным форм-фактором",
              year: "2005-е",
              direction: "left",
              image: "https://cdn.poehali.dev/projects/f1f1ca72-35ae-4635-b789-fcaea8059a42/files/30bcce41-ac25-47bf-8aa0-1147095cb951.jpg",
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; year: string; direction: string; image: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/20 md:py-6 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-center gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-foreground/5 md:h-16 md:w-16">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
    </div>
  )
}