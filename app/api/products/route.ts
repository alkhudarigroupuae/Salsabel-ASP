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
  const featured = searchParams.get("featured") === "true"
  const sort = searchParams.get("sort") || "featured"
  const condition = searchParams.get("condition")
  const brand = searchParams.get("brand")
  const origin = searchParams.get("origin")
  const year = searchParams.get("year")
  const part = searchParams.get("part")

  // Combine filters into search query for basic filtering
  let searchQuery = search
  const filterTerms = [condition, brand, origin, year, part].filter(Boolean)
  if (filterTerms.length > 0) {
    searchQuery = `${searchQuery || ""} ${filterTerms.join(" ")}`.trim()
  }

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
      console.log("Supabase client not initialized")
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
      console.log("Attempting to fetch from WooCommerce...")
      const products = await wooProducts.getAll({
        page,
        per_page: perPage,
        search: searchQuery,
        category,
        min_price: minPrice,
        max_price: maxPrice,
        featured,
        orderby,
        order,
      })
      console.log(`Fetched ${products.length} products from WooCommerce`)

      if (products.length === 0) {
        console.log("WooCommerce returned 0 products, falling back to mocks")
        throw new Error("No products found in WooCommerce")
      }

      return NextResponse.json(products)
    } catch (wooError) {
      console.error("Error fetching products from WooCommerce:", wooError)
      // Return mock data for development
      const mocks = getMockProducts(search, category)
      console.log(`Returning ${mocks.length} mock products (search: ${search}, category: ${category})`)
      return NextResponse.json(mocks)
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
