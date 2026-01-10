import { NextResponse } from "next/server"
import { wooProducts, type WooProduct } from "@/lib/woocommerce"
import { supabase } from "@/lib/supabase-client"
import { MOCK_PRODUCTS } from "@/lib/mock-products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const perPage = Number.parseInt(searchParams.get("per_page") || "12")
  const search = searchParams.get("q") || undefined
  const category = searchParams.get("category") || undefined
  const minPrice = searchParams.get("minPrice") || undefined
  const maxPrice = searchParams.get("maxPrice") || undefined
  const sort = searchParams.get("sort") || "featured"

  // Determine orderby and order from sort param
  let orderby = "menu_order"
  let order: "asc" | "desc" = "asc"

  switch (sort) {
    case "price-asc":
      orderby = "price"
      order = "asc"
      break
    case "price-desc":
      orderby = "price"
      order = "desc"
      break
    case "rating":
      orderby = "rating"
      order = "desc"
      break
    case "newest":
      orderby = "date"
      order = "desc"
      break
  }

  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized")
    }

    let query = supabase.from("products").select("*")

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const offset = (page - 1) * perPage
    const { data, error, count } = await query
      .range(offset, offset + perPage - 1)
      .order("synced_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        per_page: perPage,
        total: count || 0,
        pages: Math.ceil((count || 0) / perPage),
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    // Fallback to WooCommerce data if Supabase fails
    try {
      const products = await wooProducts.getAll({
        page,
        per_page: perPage,
        search,
        category,
        min_price: minPrice,
        max_price: maxPrice,
        orderby,
        order,
      })

      return NextResponse.json(products)
    } catch (wooError) {
      console.error("Error fetching products from WooCommerce:", wooError)
      // Return mock data for development
      return NextResponse.json(getMockProducts(search, category))
    }
  }
}

// Mock products for development/demo
function getMockProducts(search?: string, category?: string): Partial<WooProduct>[] {
  let filtered = [...MOCK_PRODUCTS]

  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.sku?.toLowerCase().includes(searchLower) ||
        p.categories?.some((c) => c.name.toLowerCase().includes(searchLower))
    )
  }

  if (category) {
    filtered = filtered.filter((p) => p.categories?.some((c) => c.slug === category || c.id.toString() === category))
  }

  return filtered
}
