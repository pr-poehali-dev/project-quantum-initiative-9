import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const harms = [
  {
    icon: "Eye",
    title: "Вред для зрения",
    description:
      "Длительное смотрение на экран вызывает синдром сухого глаза, усталость и снижение остроты зрения. Синий свет нарушает выработку мелатонина и мешает засыпать.",
    stat: "2 часа",
    statLabel: "максимум перед сном",
  },
  {
    icon: "Brain",
    title: "Влияние на психику",
    description:
      "Постоянные уведомления и соцсети формируют зависимость. Тревожность, снижение концентрации и «FOMO» — синдром упущенной выгоды — распространённые последствия.",
    stat: "4+ часа",
    statLabel: "в день — зона риска",
  },
  {
    icon: "PersonStanding",
    title: "Осанка и шея",
    description:
      "«Текстовая шея» — наклон головы при взгляде на телефон создаёт нагрузку до 27 кг на позвоночник. Это приводит к хроническим болям в шее и спине.",
    stat: "60°",
    statLabel: "угол наклона = 27 кг нагрузки",
  },
  {
    icon: "Moon",
    title: "Нарушение сна",
    description:
      "Использование телефона перед сном задерживает засыпание на 1–2 часа. Качество сна ухудшается, что влияет на память, иммунитет и настроение на следующий день.",
    stat: "1–2 ч",
    statLabel: "задержка засыпания",
  },
  {
    icon: "Users",
    title: "Социальная изоляция",
    description:
      "Чрезмерное использование телефона снижает качество живого общения. Люди предпочитают переписку разговору и теряют навыки реального взаимодействия.",
    stat: "70%",
    statLabel: "подростков чувствуют зависимость",
  },
  {
    icon: "Shield",
    title: "Как защититься",
    description:
      "Делай перерывы каждые 20 минут, используй режим «Не беспокоить» ночью, убирай телефон во время еды и общения. Цифровой детокс хотя бы раз в неделю — отличная привычка.",
    stat: "20-20-20",
    statLabel: "правило для глаз",
  },
]

export function HarmSection() {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col px-6 pt-20 pb-8 md:px-12 lg:px-16 overflow-y-auto"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Вред
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / Чрезмерное использование телефона
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 pb-8">
          {harms.map((item, i) => (
            <div
              key={i}
              className={`group rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/8 md:p-6 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/10 transition-colors group-hover:bg-foreground/15">
                  <Icon name={item.icon} fallback="Circle" size={20} className="text-foreground/70" />
                </div>
                <div className="text-right">
                  <div className="font-sans text-xl font-light text-foreground md:text-2xl">{item.stat}</div>
                  <div className="font-mono text-[10px] text-foreground/40 leading-tight max-w-[120px]">{item.statLabel}</div>
                </div>
              </div>
              <h3 className="mb-2 font-sans text-lg font-light text-foreground md:text-xl">{item.title}</h3>
              <p className="text-xs leading-relaxed text-foreground/70 md:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}