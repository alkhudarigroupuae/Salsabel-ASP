import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto bg-card border-border">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-green-500/10 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>

            <div className="bg-secondary p-4 rounded-lg mb-8">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-xl font-bold text-foreground">{orderNumber}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Confirmation Email</p>
                  <p className="text-xs text-muted-foreground">Sent to your email</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Package className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">5-7 business days</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/account/orders">
                <Button variant="outline" className="w-full sm:w-auto border-border bg-transparent">
                  View Order
                </Button>
              </Link>
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
