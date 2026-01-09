import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null

// Database types
export interface DbProduct {
  id: number
  name: string
  slug: string
  description: string | null
  price: number
  regular_price: number
  sale_price: number | null
  image_url: string | null
  sku: string
  stock_quantity: number
  stock_status: string
  category_ids: string
  featured: boolean
  on_sale: boolean
  rating_count: number
  average_rating: number | null
  meta_data: any
  synced_at: string
}

export interface DbCategory {
  id: number
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: number | null
  count: number
  synced_at: string
}
