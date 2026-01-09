import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Number.parseInt(searchParams.get("page") || "1")
    const perPage = Number.parseInt(searchParams.get("per_page") || "12")
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"
    const onSale = searchParams.get("on_sale") === "true"

    let query = supabase.from("products").select("*")

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (featured) {
      query = query.eq("featured", true)
    }

    if (onSale) {
      query = query.eq("on_sale", true)
    }

    // Handle pagination
    const offset = (page - 1) * perPage
    const { data, error, count } = await query
      .range(offset, offset + perPage - 1)
      .order("synced_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({
      data,
      pagination: {
        page,
        per_page: perPage,
        total: count,
        pages: Math.ceil((count || 0) / perPage),
      },
    })
  } catch (error) {
    console.error("[v0] Database error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
