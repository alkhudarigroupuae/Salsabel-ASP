"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ShoppingCart, Sparkles } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import Link from "next/link"
import { useProducts } from "@/lib/hooks/use-products"

export function NewArrivalsCarousel() {
  const { products: rawProducts, isLoading } = useProducts({ orderby: "date", order: "desc", per_page: 12 })
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  const products = rawProducts.filter((product) => {
    const price = Number.parseFloat(product.price) || 0
    return price > 0
  })

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
        setItemsPerView(4)
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
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
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
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">New Arrivals</h2>
              <p className="text-sm text-muted-foreground">Latest products just added to our store</p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              disabled={currentIndex === 0}
              className="h-10 w-10 rounded-full border-border hover:bg-primary hover:text-primary-foreground disabled:opacity-50 bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="h-10 w-10 rounded-full border-border hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {products.map((product) => {
              const price = Number.parseFloat(product.price) || 0
              const salePrice = product.sale_price ? Number.parseFloat(product.sale_price) : null
              const isOnSale = salePrice && salePrice < price
              const displayPrice = isOnSale ? salePrice : price
              const image = product.images?.[0]?.src || "/generic-auto-part.png"
              const slug = product.slug || product.id.toString()

              return (
                <div key={product.id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all group h-full hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-4 flex flex-col h-full">
                      {/* Image */}
                      <Link
                        href={`/product/${slug}`}
                        className="block relative aspect-square mb-4 overflow-hidden rounded-lg bg-secondary"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        />
                        {isOnSale && <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sale</Badge>}
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">New</Badge>
                      </Link>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <Link href={`/product/${slug}`}>
                          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {product.categories && product.categories.length > 0 && (
                          <p className="text-xs text-muted-foreground mb-2">{product.categories[0].name}</p>
                        )}

                        {/* Price */}
                        <div className="mt-auto">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">{formatPrice(displayPrice)}</span>
                            {isOnSale && (
                              <span className="text-sm text-muted-foreground line-through">{formatPrice(price)}</span>
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
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(Math.min(i * itemsPerView, maxIndex))}
              className={`h-2 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerView) === i
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-6">
          <Link href="/shop?orderby=date">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              View All New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
