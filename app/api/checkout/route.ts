import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const { items, shippingMethod } = await req.json()

    if (!items || items.length === 0) {
      return new NextResponse("No items in cart", { status: 400 })
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "aed", // Assuming AED based on "Sharjah" in hero text, or use USD. Let's check context.
        product_data: {
          name: item.name,
          images: item.image ? [item.image.startsWith("http") ? item.image : `${process.env.WOOCOMMERCE_URL}${item.image}`] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Calculate shipping
    const total = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const shippingCost = shippingMethod === "express" ? 19.99 : total > 75 ? 0 : 9.99
    
    if (shippingCost > 0) {
        lineItems.push({
            price_data: {
                currency: "aed",
                product_data: {
                    name: "Shipping",
                    description: shippingMethod === "express" ? "Express Shipping" : "Standard Shipping",
                },
                unit_amount: Math.round(shippingCost * 100),
            },
            quantity: 1,
        })
    }

    const origin = req.headers.get("origin") || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[STRIPE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
