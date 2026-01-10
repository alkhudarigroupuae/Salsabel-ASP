"use client"

import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { Link } from "@/lib/navigation"
import { useState } from "react"

export function CartContent() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shipping = total > 75 ? 0 : 9.99
  const tax = (total - discount) * 0.08
  const finalTotal = total - discount + shipping + tax

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(total * 0.1)
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      setDiscount(shipping)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center h-20 w-20 bg-secondary rounded-full mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any parts yet.</p>
        <Link href="/shop/">
          <Button className="bg-primary text-primary-foreground">Browse Parts</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item, index) => (
          <Card key={`${item.id}-${index}`} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg bg-secondary"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-medium text-foreground hover:text-primary">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.price)} each</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-muted-foreground border-border bg-transparent hover:text-destructive"
          >
            Clear Cart
          </Button>
          <Link href="/shop/">
            <Button variant="outline" className="border-border bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="bg-card border-border sticky top-24">
          <CardHeader>
            <CardTitle className="text-foreground">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
              <Button onClick={applyPromoCode} variant="outline" className="border-border bg-transparent">
                Apply
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-500">Discount</span>
                  <span className="text-green-500">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="text-foreground">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-border">
              <span className="text-lg font-bold text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">{formatPrice(finalTotal)}</span>
            </div>

            {total < 75 && (
              <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                Add {formatPrice(75 - total)} more for free shipping!
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/checkout" className="w-full">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
