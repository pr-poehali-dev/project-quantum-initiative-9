import { useEffect } from "react"
import Icon from "@/components/ui/icon"

type PhoneDetail = {
  title: string
  image: string
  history: string
  specs: { label: string; value: string }[]
  pros: string[]
  era: string
}

export function PhoneDetailModal({
  phone,
  onClose,
}: {
  phone: PhoneDetail | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!phone) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [phone, onClose])

  if (!phone) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl border border-foreground/10 bg-background/95 backdrop-blur-xl sm:rounded-2xl sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 transition-colors hover:bg-foreground/20"
        >
          <Icon name="X" size={16} />
        </button>

        <div className="relative h-56 w-full overflow-hidden rounded-t-2xl md:h-72">
          <img src={phone.image} alt={phone.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="font-mono text-xs text-foreground/60">{phone.era}</span>
            <h2 className="font-sans text-3xl font-light text-foreground md:text-4xl">{phone.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-6 bg-foreground/30" />
              <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">История</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 md:text-base">{phone.history}</p>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-6 bg-foreground/30" />
              <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">Характеристики</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {phone.specs.map((spec, i) => (
                <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 p-3">
                  <div className="font-mono text-xs text-foreground/50 mb-1">{spec.label}</div>
                  <div className="font-sans text-sm font-medium text-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-6 bg-foreground/30" />
              <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">Особенности</span>
            </div>
            <ul className="space-y-2">
              {phone.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 md:text-base">
                  <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-foreground/50" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}