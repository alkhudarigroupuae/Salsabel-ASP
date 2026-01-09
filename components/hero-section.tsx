"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Headphones } from "lucide-react"
import Link from "next/link"
import { NewArrivalsCarousel } from "@/components/new-arrivals-carousel"
import { useState, useEffect } from "react"

const heroImages = [
  "/bmw-spare-parts-banner.jpg",
  "/mercedes-spare-parts-banner.jpg",
  "/audi-spare-parts-banner.jpg",
  "/porsche-spare-parts-banner.jpg",
  "/range-rover-spare-parts-banner.jpg",
]

export function HeroSection() {
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
            index === currentImageIndex ? "opacity-30" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">
            Genuine Spare Parts For Your Car Brand
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight text-balance">
            Premium Auto Spare Parts In Sharjah
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Welcome to our extensive inventory of premium auto spare parts shop in Industrial Area Sharjah. We offer a
            diverse range of authentic parts sourced from best car parts suppliers, guaranteeing exceptional quality and
            seamless integration with Original Equipment Manufacturer standards.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop/">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                Shop All Parts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact/">
              <Button size="lg" variant="outline" className="border-border bg-transparent">
                Get a Free Quotation
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-card/50 rounded-lg p-4 border border-border">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Fast Delivery</p>
              <p className="text-sm text-muted-foreground">FedEx & DHL Shipping</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card/50 rounded-lg p-4 border border-border">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Quality Assurance</p>
              <p className="text-sm text-muted-foreground">OEM & Genuine Parts</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card/50 rounded-lg p-4 border border-border">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Headphones className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Expert Assistance</p>
              <p className="text-sm text-muted-foreground">Call +971 50 316 1689</p>
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
