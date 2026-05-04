import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HarmSection } from "@/components/sections/harm-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState, useCallback } from "react"

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const NAV_ITEMS = ["Главная", "Каталог", "Виды", "О проекте", "Вред", "Контакты"]

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) clearInterval(intervalId)
    }, 100)

    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((r) => r === entry.target)
            if (index !== -1) setCurrentSection(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [isLoaded])

  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index]
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setCurrentSection(index)
    }
    setMobileMenuOpen(false)
  }, [])

  const setSectionRef = useCallback((index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }, [])

  return (
    <main className="relative w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Fixed shader background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-12 md:py-6">
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25 md:h-10 md:w-10">
              <span className="font-sans text-lg font-bold text-foreground md:text-xl">📱</span>
            </div>
            <span className="font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl">ФонТека</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`group relative font-sans text-sm font-medium transition-colors ${
                  currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                    currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton variant="secondary" onClick={() => scrollToSection(1)} className="hidden sm:flex">
              Каталог
            </MagneticButton>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg bg-foreground/15 backdrop-blur-md transition-colors hover:bg-foreground/25 md:hidden"
            >
              <span className={`h-0.5 w-5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-foreground/10 bg-background/95 backdrop-blur-xl md:hidden">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`flex w-full items-center justify-between border-b border-foreground/10 px-5 py-3.5 text-left font-sans text-sm transition-colors ${
                  currentSection === index ? "text-foreground" : "text-foreground/70"
                }`}
              >
                <span>{item}</span>
                {currentSection === index && <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Vertical scrollable content */}
      <div className={`relative z-10 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

        {/* Hero */}
        <section
          ref={setSectionRef(0)}
          className="flex min-h-screen flex-col justify-end px-5 pb-12 pt-24 md:px-12 md:pb-24"
        >
          <div className="max-w-3xl">
            <div className="mb-3 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1 backdrop-blur-md duration-700 md:mb-4 md:px-4 md:py-1.5">
              <p className="font-mono text-[10px] text-foreground/90 md:text-xs">Энциклопедия мобильных устройств</p>
            </div>
            <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:mb-6 md:text-7xl lg:text-8xl">
              <span className="text-balance">Мир телефонов</span>
            </h1>
            <p className="mb-6 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 md:mb-8 md:text-xl">
              <span className="text-pretty">
                Всё о мобильных телефонах: от первых моделей до современных смартфонов. Узнай историю, виды и характеристики.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
                Смотреть каталог
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                Виды телефонов
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Листайте вниз</p>
              <div className="flex h-8 w-5 items-start justify-center rounded-full border border-foreground/30 bg-foreground/10 pt-1.5 backdrop-blur-md">
                <div className="h-1.5 w-1 animate-bounce rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection sectionRef={setSectionRef(1)} />
        <ServicesSection sectionRef={setSectionRef(2)} />
        <AboutSection scrollToSection={scrollToSection} sectionRef={setSectionRef(3)} />
        <HarmSection sectionRef={setSectionRef(4)} />
        <ContactSection sectionRef={setSectionRef(5)} />
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
    </main>
  )
}
