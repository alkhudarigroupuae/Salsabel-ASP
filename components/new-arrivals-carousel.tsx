"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ShoppingCart, Sparkles } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import { Link } from "@/lib/navigation"
import { useProducts } from "@/lib/hooks/use-products"
import { useTranslations, useLocale } from "next-intl"
import { SnakeBorder } from "@/components/ui/snake-border"

export function NewArrivalsCarousel() {
  const t = useTranslations("NewArrivals")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const { products: rawProducts, isLoading } = useProducts({ orderby: "date", order: "desc", per_page: 12 })
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  const products = rawProducts
    .filter((product, index, self) => index === self.findIndex((t) => t.id === product.id))

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const next = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [maxIndex])

  if (isLoading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-card border-border animate-pulse">
                <CardContent className="p-4">
                  <div className="aspect-square bg-secondary rounded-lg mb-4" />
                  <div className="h-4 bg-secondary rounded mb-2" />
                  <div className="h-4 bg-secondary rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 bg-primary/10 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("title")}</h2>
              <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Product Grid - 2 rows x 6 columns (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.slice(0, 12).map((product) => {
            const price = Number.parseFloat(product.price) || 0
            const salePrice = product.sale_price ? Number.parseFloat(product.sale_price) : null
            const isOnSale = salePrice && salePrice < price
            const displayPrice = isOnSale ? salePrice : price
            const image = product.images?.[0]?.src || "/generic-auto-part.png"
            const slug = product.slug || product.id.toString()

            return (
              <Card key={product.id} className="bg-card border-border transition-all group h-full hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 relative overflow-hidden">
                <CardContent className="p-4 flex flex-col h-full">
                  {/* Image */}
                  <Link
                    href={`/product/${slug}`}
                    className="block relative aspect-square mb-4 overflow-hidden rounded-lg bg-secondary snake-border-container"
                  >
                    <SnakeBorder />
                    <img
                      src={image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    {isOnSale && <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sale</Badge>}
                    <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white">New</Badge>
                  </Link>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <Link href={`/product/${slug}`}>
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors text-sm">
                        {product.name}
                      </h3>
                    </Link>

                    {product.categories && product.categories.length > 0 && (
                      <p className="text-xs text-muted-foreground mb-2">{product.categories[0].name}</p>
                    )}

                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-bold text-primary">{formatPrice(displayPrice)}</span>
                        {isOnSale && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(price)}</span>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <Button
                        onClick={() =>
                          addItem({
                            id: product.id.toString(),
                            name: product.name,
                            price: displayPrice,
                            image,
                            quantity: 1,
                          })
                        }
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link href="/shop?orderby=date">
            <Button
              variant="outline"
              className="border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-colors"
            >
              View All New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
