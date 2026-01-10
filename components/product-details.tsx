"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Minus, Plus, Check, Truck, Shield, RotateCcw, XCircle } from "lucide-react"
import { Link, useRouter } from "@/lib/navigation"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import { useLocale } from "next-intl"

import type { WooProduct } from "@/lib/woocommerce"

export function ProductDetails({ product }: { product: WooProduct }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()
  const router = useRouter()
  const locale = useLocale()

  const price = Number.parseFloat(product.price) || 0
  const regularPrice = Number.parseFloat(product.regular_price) || 0
  const salePrice = Number.parseFloat(product.sale_price) || 0
  const isOnSale = product.on_sale && salePrice > 0
  const displayPrice = isOnSale ? salePrice : price
  const rating = Number.parseFloat(product.average_rating) || 0
  const reviewCount = product.rating_count || 0
  const image = product.images?.[0]?.src || "/generic-auto-part.png"
  const inStock = product.stock_status === "instock"
  const stockQuantity = product.stock_quantity || 99

  const brand = product.categories?.[0]?.name || "Auto Parts"

  const specs: Record<string, string> = {}
  product.attributes?.forEach((attr) => {
    specs[attr.name] = attr.options.join(", ")
  })

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: image,
      quantity,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: image,
      quantity,
    })
    router.push("/checkout")
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop/" className="hover:text-primary">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img src={image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={img.id || idx} className="aspect-square bg-secondary rounded-lg overflow-hidden">
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt || product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-primary font-medium mb-1">{brand}</p>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            {product.sku && <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-foreground font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount} reviews)</span>
          </div>

          {/* Price - updated for WooCommerce format */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-foreground">{formatPrice(displayPrice)}</span>
            {isOnSale && regularPrice > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(regularPrice)}</span>
                <Badge className="bg-primary text-primary-foreground">
                  Save {formatPrice(regularPrice - displayPrice)}
                </Badge>
              </>
            )}
          </div>

          {/* Stock Status - updated for WooCommerce format */}
          <div className="flex items-center gap-2">
            {inStock ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-500 font-medium">In Stock</span>
                {stockQuantity && <span className="text-muted-foreground">({stockQuantity} available)</span>}
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-500 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Description - use short_description or description */}
          <div
            className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.short_description || product.description || "" }}
          />

          {/* Quantity & Add to Cart */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                  disabled={!inStock}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(stockQuantity, quantity + 1))}
                  className="rounded-l-none"
                  disabled={!inStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
            <Button
              size="lg"
              className="w-full bg-white text-black border border-border hover:bg-gray-100"
              onClick={handleBuyNow}
              disabled={!inStock}
            >
              Buy Now
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start bg-secondary border-b border-border rounded-none">
            <TabsTrigger value="description" className="data-[state=active]:bg-card">
              Description
            </TabsTrigger>
            {Object.keys(specs).length > 0 && (
              <TabsTrigger value="specs" className="data-[state=active]:bg-card">
                Specifications
              </TabsTrigger>
            )}
            <TabsTrigger value="fitment" className="data-[state=active]:bg-card">
              Vehicle Fitment
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-card">
              Reviews ({reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {Object.keys(specs).length > 0 && (
            <TabsContent value="specs" className="mt-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <dt className="text-muted-foreground capitalize">{key}</dt>
                        <dd className="text-foreground font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="fitment" className="mt-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">This part fits the following vehicles:</p>
                {product.categories && product.categories.length > 0 ? (
                  <ul className="space-y-2 text-foreground">
                    {product.categories.map((cat) => (
                      <li key={cat.id}>• {cat.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Please contact us for vehicle fitment information.</p>
                )}
                <p className="text-sm text-muted-foreground mt-4">
                  Use our vehicle selector to confirm fitment for your specific vehicle.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-foreground">{review.reviewer}</div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString(locale, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>
                    ))}
                  </div>
                ) : reviewCount > 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      This product has {reviewCount} reviews with an average rating of {rating.toFixed(1)} stars.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
