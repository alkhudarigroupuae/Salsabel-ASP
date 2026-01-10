import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not set. Database features will not work.");
}

// Create a new pool using the connection string
// In development, we want to avoid creating multiple pools when HMR triggers
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined
}

export const pool = globalForDb.pool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

// Database types (mirroring what was in supabase-client.ts for consistency)
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
  category_ids: string // Stored as JSON or comma-separated string in DB
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
