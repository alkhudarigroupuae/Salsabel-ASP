import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"
import { wooCategories } from "@/lib/woocommerce"

const SYNC_SECRET = process.env.SYNC_SECRET_KEY || "default-secret"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${SYNC_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Starting category sync from WooCommerce...")

    if (!supabase) {
      throw new Error("Supabase client not initialized")
    }

    // Fetch all categories from WooCommerce
    const categories = await wooCategories.getAll({ per_page: 100 })
    console.log(`[v0] Fetched ${categories.length} categories from WooCommerce`)

    // Prepare data for Supabase
    const categoriesData = categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image_url: category.image?.src || null,
      parent_id: category.parent || null,
      count: category.count,
      synced_at: new Date().toISOString(),
    }))

    // Upsert into Supabase
    const { error } = await supabase.from("categories").upsert(categoriesData, { onConflict: "id" })

    if (error) throw error

    // Log sync
    await supabase.from("sync_logs").insert({
      type: "categories",
      status: "success",
      items_synced: categoriesData.length,
    })

    console.log("[v0] Category sync completed successfully")

    return NextResponse.json({
      success: true,
      message: `Synced ${categoriesData.length} categories`,
      count: categoriesData.length,
    })
  } catch (error) {
    console.error("[v0] Sync error:", error)

    await supabase.from("sync_logs").insert({
      type: "categories",
      status: "failed",
      error_message: error instanceof Error ? error.message : "Unknown error",
    })

    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}
