"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { Link } from "@/lib/navigation"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"

import { useProducts } from "@/lib/hooks/use-products"
import { useTranslations } from "next-intl"

export function FeaturedProducts() {
  const t = useTranslations("FeaturedProducts")
  const categories = [
    {
      id: "brakes",
      name: t("categories.brakes"),
      image: "/brake-rotor-automotive.jpg",
      link: "/shop?category=brakes",
    },
    {
      id: "body-parts",
      name: t("categories.bodyParts"),
      image: "/audi-a5-front-bumper-cover-auto-part.jpg",
      link: "/shop?category=body-parts",
    },
    {
      id: "suspension",
      name: t("categories.suspension"),
      image: "/strut-assembly-automotive.jpg",
      link: "/shop?category=suspension",
    },
  ]

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{t("title")}</h2>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link href="/shop/" className="text-primary hover:underline hidden sm:block">
            {t("viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.link} className="group">
              <Card className="bg-card border-border overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary hover:ring-1 hover:ring-primary relative">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
