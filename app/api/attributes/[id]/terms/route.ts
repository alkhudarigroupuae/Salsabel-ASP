import { NextResponse } from "next/server"
import { wooAttributes } from "@/lib/woocommerce"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const terms = await wooAttributes.getTerms(Number(id))
    return NextResponse.json(terms)
  } catch (error) {
    console.error(`Error fetching terms for attribute ${id}:`, error)
    return NextResponse.json([])
  }
}
