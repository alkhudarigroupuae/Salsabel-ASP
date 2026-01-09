import { NextResponse } from "next/server"
import { wooOrders, type WooAddress, type WooLineItem } from "@/lib/woocommerce"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { customerId, billing, shipping, lineItems, paymentMethod } = body as {
      customerId?: number
      billing: WooAddress
      shipping: WooAddress
      lineItems: WooLineItem[]
      paymentMethod?: string
    }

    if (!process.env.WOOCOMMERCE_URL) {
      // Return mock order for development
      return NextResponse.json({
        id: Math.floor(Math.random() * 10000),
        status: "processing",
        total: lineItems.reduce((sum, item) => sum + item.quantity * 50, 0).toString(),
        date_created: new Date().toISOString(),
      })
    }

    const order = await wooOrders.create({
      customer_id: customerId,
      billing,
      shipping,
      line_items: lineItems,
      payment_method: paymentMethod || "cod",
      payment_method_title: paymentMethod === "stripe" ? "Credit Card" : "Cash on Delivery",
      set_paid: false,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
