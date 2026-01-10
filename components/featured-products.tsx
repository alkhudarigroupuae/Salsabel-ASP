"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"

import { useProducts } from "@/lib/hooks/use-products"
import { Sparkles } from "lucide-react"

export function FeaturedProducts() {
  const { products, isLoading } = useProducts({ featured: true, per_page: 8 })
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()

  if (isLoading) {
    return (
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">New Arrival & Spare Parts Sales!</h2>
              <p className="text-muted-foreground">Latest OEM parts from trusted European brands</p>
            </div>
            <div className="h-4 w-32 bg-secondary rounded animate-pulse hidden sm:block" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">New Arrival & Spare Parts Sales!</h2>
            <p className="text-muted-foreground">Latest OEM parts from trusted European brands</p>
          </div>
          <Link href="/shop/" className="text-primary hover:underline hidden sm:block">
            View all products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-card border-border group flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="relative mb-4">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.images[0]?.src || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg bg-secondary"
                    />
                  </Link>
                </div>

                <div className="flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.attributes.find((a) => a.name === "Brand")?.options[0] || "Salsabel"}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground mb-2">Replace Number: {product.sku || "N/A"}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm text-foreground">{product.average_rating || "0"}</span>
                    <span className="text-sm text-muted-foreground">({product.rating_count || 0})</span>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-3">
                      <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
                    </div>
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                        })
                      }
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
