import { NextResponse } from "next/server"
import { wooCustomers } from "@/lib/woocommerce"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, password } = body as {
      email: string
      firstName: string
      lastName: string
      password: string
    }

    if (!process.env.WOOCOMMERCE_URL) {
      // Return mock customer for development
      return NextResponse.json({
        id: Math.floor(Math.random() * 10000),
        email,
        first_name: firstName,
        last_name: lastName,
      })
    }

    const customer = await wooCustomers.create({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    })

    return NextResponse.json(customer)
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
