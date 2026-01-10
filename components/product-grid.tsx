"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Check } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import { useProducts } from "@/lib/hooks/use-products"

interface ProductGridProps {
  category?: string
}

export function ProductGrid({ category }: ProductGridProps) {
  const searchParams = useSearchParams()
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()

  const { products: rawProducts, isLoading } = useProducts({
    search: searchParams.get("q") || undefined,
    category: category || searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sort: searchParams.get("sort") || undefined,
  })

  const products = rawProducts
    .filter((product, index, self) => index === self.findIndex((t) => t.id === product.id))

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-card border-border animate-pulse">
            <CardContent className="p-4">
              <div className="aspect-square bg-secondary rounded-lg mb-4" />
              <div className="h-4 bg-secondary rounded mb-2" />
              <div className="h-4 bg-secondary rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
        <Link href="/shop/">
          <Button variant="outline" className="border-border bg-transparent">
            Clear Filters
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const price = Number.parseFloat(product.price) || 0
          const regularPrice = Number.parseFloat(product.regular_price) || 0
          const rating = Number.parseFloat(product.average_rating) || 0
          const image = product.images?.[0]?.src || "/generic-auto-part.png"
          const productSlug = product.slug || product.id.toString()

          return (
            <Card key={product.id} className="bg-card border-border group flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="relative mb-4">
                  {product.on_sale && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground z-10">Sale</Badge>
                  )}
                  <Link href={`/product/${productSlug}/`}>
                    <img
                      src={image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg bg-secondary"
                    />
                  </Link>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{product.categories?.[0]?.name || "Parts"}</p>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>

                  <Link href={`/product/${productSlug}/`}>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  {rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm text-foreground">{rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({product.rating_count})</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>{product.stock_status === "instock" ? "In Stock" : "Out of Stock"}</span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-foreground">{formatPrice(price)}</span>
                      {product.on_sale && regularPrice > price && (
                        <span className="text-sm text-muted-foreground line-through">{formatPrice(regularPrice)}</span>
                      )}
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={product.stock_status !== "instock"}
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price,
                          image,
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
          )
        })}
      </div>
    </div>
  )
}
