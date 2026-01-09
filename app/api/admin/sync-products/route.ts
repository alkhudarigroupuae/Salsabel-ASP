import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"
import { wooProducts } from "@/lib/woocommerce"

// Protect this endpoint with a secret key
const SYNC_SECRET = process.env.SYNC_SECRET_KEY || "default-secret"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${SYNC_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Starting product sync from WooCommerce...")

    // Fetch all products from WooCommerce
    const products = await wooProducts.getAll({ per_page: 100 })
    console.log(`[v0] Fetched ${products.length} products from WooCommerce`)

    // Prepare data for Supabase
    const productsData = products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number.parseFloat(product.price),
      regular_price: Number.parseFloat(product.regular_price),
      sale_price: product.sale_price ? Number.parseFloat(product.sale_price) : null,
      image_url: product.images[0]?.src || null,
      sku: product.sku,
      stock_quantity: product.stock_quantity || 0,
      stock_status: product.stock_status,
      category_ids: JSON.stringify(product.categories.map((c) => c.id)),
      featured: product.featured,
      on_sale: product.on_sale,
      rating_count: product.rating_count,
      average_rating: product.average_rating ? Number.parseFloat(product.average_rating) : null,
      meta_data: product.meta_data,
      synced_at: new Date().toISOString(),
    }))

    // Upsert into Supabase
    const { error } = await supabase.from("products").upsert(productsData, { onConflict: "id" })

    if (error) {
      console.error("[v0] Supabase error:", error)
      throw error
    }

    // Log sync
    await supabase.from("sync_logs").insert({
      type: "products",
      status: "success",
      items_synced: productsData.length,
    })

    console.log("[v0] Product sync completed successfully")

    return NextResponse.json({
      success: true,
      message: `Synced ${productsData.length} products`,
      count: productsData.length,
    })
  } catch (error) {
    console.error("[v0] Sync error:", error)

    await supabase.from("sync_logs").insert({
      type: "products",
      status: "failed",
      error_message: error instanceof Error ? error.message : "Unknown error",
    })

    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}
