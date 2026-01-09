import { NextResponse } from "next/server"
import { wooProducts, type WooProduct } from "@/lib/woocommerce"
import { supabase } from "@/lib/supabase-client"

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
  const mockProducts = [
    {
      id: 1,
      name: "Premium Brake Pad Set",
      sku: "BRK-001",
      price: "89.99",
      regular_price: "119.99",
      sale_price: "89.99",
      on_sale: true,
      stock_status: "instock",
      average_rating: "4.8",
      rating_count: 234,
      images: [{ id: 1, src: "/brake-pads-automotive.jpg", alt: "Brake Pads" }],
      categories: [{ id: 1, name: "Brakes", slug: "brakes" }, { id: 101, name: "BMW", slug: "bmw-spare-parts" }],
      short_description: "High-performance ceramic brake pads",
    },
    {
      id: 2,
      name: "Oil Filter - High Performance",
      sku: "ENG-002",
      price: "24.99",
      regular_price: "24.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      average_rating: "4.9",
      rating_count: 567,
      images: [{ id: 2, src: "/oil-filter-automotive.jpg", alt: "Oil Filter" }],
      categories: [{ id: 2, name: "Engine Parts", slug: "engine-parts" }, { id: 101, name: "BMW", slug: "bmw-spare-parts" }, { id: 102, name: "Mercedes", slug: "mercedes-spare-parts" }],
      short_description: "Premium synthetic fiber oil filter",
    },
    {
      id: 3,
      name: "LED Headlight Bulbs H11",
      sku: "LGT-003",
      price: "45.99",
      regular_price: "59.99",
      sale_price: "45.99",
      on_sale: true,
      stock_status: "instock",
      average_rating: "4.7",
      rating_count: 189,
      images: [{ id: 3, src: "/led-headlight-bulbs.jpg", alt: "LED Headlight" }],
      categories: [{ id: 3, name: "Lighting", slug: "lighting" }, { id: 101, name: "BMW", slug: "bmw-spare-parts" }, { id: 103, name: "Audi", slug: "audi-spare-parts" }],
      short_description: "6000K ultra-bright LED bulbs",
    },
    {
      id: 4,
      name: "Spark Plugs - Platinum",
      sku: "ENG-004",
      price: "32.99",
      regular_price: "32.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      average_rating: "4.9",
      rating_count: 892,
      images: [{ id: 4, src: "/spark-plugs-automotive.jpg", alt: "Spark Plugs" }],
      categories: [{ id: 2, name: "Engine Parts", slug: "engine-parts" }, { id: 101, name: "BMW", slug: "bmw-spare-parts" }],
      short_description: "Platinum-tipped for improved efficiency",
    },
    {
      id: 5,
      name: "Air Filter - Performance",
      sku: "ENG-005",
      price: "54.99",
      regular_price: "54.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      average_rating: "4.6",
      rating_count: 345,
      images: [{ id: 5, src: "/air-filter-automotive.jpg", alt: "Air Filter" }],
      categories: [{ id: 2, name: "Engine Parts", slug: "engine-parts" }, { id: 102, name: "Mercedes", slug: "mercedes-spare-parts" }],
      short_description: "High-flow performance air filter",
    },
    {
      id: 6,
      name: "Alternator - Remanufactured",
      sku: "ELC-006",
      price: "189.99",
      regular_price: "249.99",
      sale_price: "189.99",
      on_sale: true,
      stock_status: "instock",
      average_rating: "4.5",
      rating_count: 123,
      images: [{ id: 6, src: "/alternator-automotive.jpg", alt: "Alternator" }],
      categories: [{ id: 4, name: "Electrical", slug: "electrical" }, { id: 101, name: "BMW", slug: "bmw-spare-parts" }],
      short_description: "Quality remanufactured alternator",
    },
    {
      id: 7,
      name: "BMW Genuine Oil Filter",
      sku: "BMW-FIL-001",
      price: "18.99",
      regular_price: "22.99",
      sale_price: "18.99",
      on_sale: true,
      stock_status: "instock",
      average_rating: "5.0",
      rating_count: 42,
      images: [{ id: 7, src: "/oil-filter-automotive.jpg", alt: "BMW Oil Filter" }],
      categories: [{ id: 2, name: "Engine Parts", slug: "engine-parts" }, { id: 101, name: "BMW", slug: "bmw-spare-parts" }],
      short_description: "Genuine BMW Oil Filter for various models",
    },
  ]

  let filtered = mockProducts

  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(searchLower) || p.short_description?.toLowerCase().includes(searchLower),
    )
  }

  if (category) {
    filtered = filtered.filter((p) => p.categories?.some((c) => c.slug === category))
  }

  return filtered
}
