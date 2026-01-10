"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Headphones } from "lucide-react"
import { Link } from "@/lib/navigation"
import { NewArrivalsCarousel } from "@/components/new-arrivals-carousel"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

const heroImages = [
  "/bmw-spare-parts-banner.jpg",
  "/mercedes-spare-parts-banner.jpg",
  "/audi-spare-parts-banner.jpg",
  "/porsche-spare-parts-banner.jpg",
  "/range-rover-spare-parts-banner.jpg",
]

export function HeroSection() {
  const t = useTranslations("Hero")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100 dark:opacity-40" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/0 dark:from-background/95 dark:via-background/60 dark:to-background/20" />

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">
            {t("tagline")}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight text-balance">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                {t("shopAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button size="lg" variant="outline" className="border-border bg-transparent">
                {t("getQuote")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center gap-3 bg-card/50 rounded-lg p-4 border border-border group hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Truck className="h-5 w-5 text-blue-500 animate-bounce [animation-duration:3s]" />
            </div>
            <div>
              <p className="font-medium text-foreground">{t("features.fastDelivery")}</p>
              <p className="text-sm text-muted-foreground">{t("features.shipping")}</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3 bg-card/50 rounded-lg p-4 border border-border group hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-5 w-5 text-blue-500 animate-pulse [animation-duration:3s]" />
            </div>
            <div>
              <p className="font-medium text-foreground">{t("features.quality")}</p>
              <p className="text-sm text-muted-foreground">{t("features.oem")}</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3 bg-card/50 rounded-lg p-4 border border-border group hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Headphones className="h-5 w-5 text-blue-500 animate-ping [animation-duration:3s]" />
            </div>
            <div>
              <p className="font-medium text-foreground">{t("features.expert")}</p>
              <p className="text-sm text-muted-foreground">{t("features.call")}</p>
            </div>
          </div>
        </div>

        {/* New Arrivals Carousel */}
        <div className="mt-10">
          <NewArrivalsCarousel />
        </div>
      </div>
    </section>
  )
}
