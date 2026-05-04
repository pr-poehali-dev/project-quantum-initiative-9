import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { PhoneDetailModal } from "@/components/sections/phone-detail-modal"
import Icon from "@/components/ui/icon"

type PhoneData = {
  number: string
  title: string
  category: string
  year: string
  direction: string
  image: string
  history: string
  specs: { label: string; value: string }[]
  pros: string[]
  era: string
}

const phones: PhoneData[] = [
  {
    number: "01",
    title: "Кнопочные телефоны",
    category: "Классические мобильные устройства",
    year: "1990-е",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/f1f1ca72-35ae-4635-b789-fcaea8059a42/files/e50ebb62-6449-4022-8229-4dada3ab1797.jpg",
    era: "1990-е — 2000-е",
    history:
      "Первые массовые мобильные телефоны появились в начале 1990-х. Самые известные модели — Nokia 3310, Motorola RAZR и Siemens. Их отличала невероятная надёжность, простота управления и огромное время работы от батареи — до нескольких недель. Именно кнопочные телефоны сделали мобильную связь доступной для миллионов людей по всему миру.",
    specs: [
      { label: "Дисплей", value: "1–2 дюйма" },
      { label: "Батарея", value: "До 30 дней" },
      { label: "Вес", value: "60–120 г" },
      { label: "Память", value: "До 32 МБ" },
      { label: "Камера", value: "Нет / VGA" },
      { label: "ОС", value: "Собственная" },
    ],
    pros: [
      "Невероятно долгий заряд — до нескольких недель",
      "Простое и интуитивное управление кнопками",
      "Прочный корпус, устойчивый к падениям",
      "Небольшой размер и малый вес",
      "Отсутствие отвлекающих факторов — только звонки и SMS",
    ],
  },
  {
    number: "02",
    title: "Смартфоны",
    category: "Сенсорные многофункциональные устройства",
    year: "2000-е",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/f1f1ca72-35ae-4635-b789-fcaea8059a42/files/f978a65b-3137-4476-a945-d799fb41557d.jpg",
    era: "2007 — настоящее время",
    history:
      "Революция смартфонов началась в 2007 году с выходом первого iPhone от Apple. Вслед за ним появились устройства на Android от Samsung, HTC и других производителей. Сенсорный экран заменил кнопки, а магазины приложений открыли безграничные возможности. Сегодня смартфон — это карманный компьютер, фотоаппарат, навигатор и развлекательный центр одновременно.",
    specs: [
      { label: "Дисплей", value: "6–7 дюймов" },
      { label: "Батарея", value: "1–3 дня" },
      { label: "Вес", value: "150–230 г" },
      { label: "Память", value: "128–1000 ГБ" },
      { label: "Камера", value: "12–200 МП" },
      { label: "ОС", value: "Android / iOS" },
    ],
    pros: [
      "Доступ к интернету и тысячам приложений",
      "Качественная многокамерная система",
      "GPS-навигация и карты",
      "Поддержка социальных сетей и мессенджеров",
      "Мощный процессор для игр и работы",
    ],
  },
  {
    number: "03",
    title: "Раскладушки и слайдеры",
    category: "Телефоны с необычным форм-фактором",
    year: "2000-е",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/f1f1ca72-35ae-4635-b789-fcaea8059a42/files/30bcce41-ac25-47bf-8aa0-1147095cb951.jpg",
    era: "1996 — 2010-е",
    history:
      "Раскладушки появились в середине 1990-х и стали иконой стиля нулевых. Motorola RAZR, Samsung SGH-E700, Nokia 6260 — эти модели были верхом моды. Слайдеры позволяли скрыть QWERTY-клавиатуру под экраном. Сегодня форм-фактор возвращается в виде современных складных смартфонов — Samsung Galaxy Z Flip и Motorola Razr с гибким дисплеем.",
    specs: [
      { label: "Дисплей", value: "2–3 дюйма" },
      { label: "Батарея", value: "3–7 дней" },
      { label: "Вес", value: "90–150 г" },
      { label: "Память", value: "До 256 МБ" },
      { label: "Камера", value: "1–5 МП" },
      { label: "Форм-фактор", value: "Раскладной" },
    ],
    pros: [
      "Компактный размер в сложенном состоянии",
      "Стильный и узнаваемый дизайн",
      "Защита экрана при закрытии крышки",
      "Удобная физическая клавиатура у слайдеров",
      "Современные версии с гибким OLED-дисплеем",
    ],
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [selectedPhone, setSelectedPhone] = useState<PhoneData | null>(null)

  return (
    <>
      <section
        ref={ref}
        className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-16 md:px-12 md:pt-0 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={`mb-10 transition-all duration-700 md:mb-14 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Каталог
            </h2>
            <p className="font-mono text-xs text-foreground/60 md:text-sm md:text-base">/ Виды телефонов — нажмите для подробностей</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {phones.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                isVisible={isVisible}
                onClick={() => setSelectedPhone(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <PhoneDetailModal phone={selectedPhone} onClose={() => setSelectedPhone(null)} />
    </>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
  onClick,
}: {
  project: PhoneData
  index: number
  isVisible: boolean
  onClick: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left transition-all duration-700 hover:border-foreground/20 md:py-6 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-3 md:gap-8">
        <span className="hidden font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 sm:block md:text-base">
          {project.number}
        </span>
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-foreground/5 md:h-16 md:w-16">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div>
          <h3 className="mb-0.5 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:mb-1 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-[10px] text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
        <Icon name="ArrowRight" size={16} className="text-foreground/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/50" />
      </div>
    </button>
  )
}