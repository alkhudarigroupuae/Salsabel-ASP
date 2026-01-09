"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"

const featuredProducts = [
  {
    id: 1,
    name: "AUDI A5 BUMPER COVER 8W6807081E-D",
    brand: "Audi",
    price: 150,
    rating: 4.8,
    reviews: 234,
    image: "/audi-a5-front-bumper-cover-auto-part.jpg",
    partNumber: "8W6807081E-D",
  },
  {
    id: 2,
    name: "AUDI Q7 FENDER RIGHT 4M0821106D-D",
    brand: "Audi",
    price: 600,
    rating: 4.9,
    reviews: 567,
    image: "/audi-q7-fender-right-side-panel.jpg",
    partNumber: "4M0821106D-D",
  },
  {
    id: 3,
    name: "PORSCHE CAYENNE AIR FLAP LEFT 9Y0122355D-D",
    brand: "Porsche",
    price: 250,
    rating: 4.7,
    reviews: 189,
    image: "/porsche-cayenne-air-flap-vent-auto-part.jpg",
    partNumber: "9Y0122355D-D",
  },
  {
    id: 4,
    name: "AUDI Q3 LID LOCK 83A823509-D",
    brand: "Audi",
    price: 150,
    rating: 4.9,
    reviews: 892,
    image: "/placeholder.svg?height=300&width=300",
    partNumber: "83A823509-D",
  },
]

export function FeaturedProducts() {
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()

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
          {featuredProducts.map((product) => (
            <Card key={product.id} className="bg-card border-border group flex flex-col">
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="relative mb-4">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg bg-secondary"
                    />
                  </Link>
                </div>

                <div className="flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground mb-2">Replace Number: {product.partNumber}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm text-foreground">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-3">
                      <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
