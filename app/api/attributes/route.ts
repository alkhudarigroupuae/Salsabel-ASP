import { NextResponse } from "next/server"
import { wooAttributes, type WooAttribute } from "@/lib/woocommerce"

export async function GET() {
  try {
    const attributes = await wooAttributes.getAll()
    return NextResponse.json(attributes)
  } catch (error) {
    console.error("Error fetching attributes:", error)
    return NextResponse.json([])
  }
}
