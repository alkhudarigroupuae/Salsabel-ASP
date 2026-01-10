// WooCommerce API Client
// Requires environment variables:
// - WOOCOMMERCE_URL (your store URL, e.g., https://yourstore.com)
// - WOOCOMMERCE_CONSUMER_KEY
// - WOOCOMMERCE_CONSUMER_SECRET

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL || "https://salparts.com/"
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "ck_1ca2b9944d435a1038999a523b9c58729f572f6b"
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "cs_213561f5a7fa0dc9e8b13ae01c415e7421503c85"

// Sanitize URL
const sanitizedUrl = WOOCOMMERCE_URL.replace(/\/$/, "")

interface WooCommerceRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: Record<string, unknown>
  params?: Record<string, string | number | boolean | undefined>
}

async function wooCommerceRequest<T>(endpoint: string, options: WooCommerceRequestOptions = {}): Promise<T> {
  const { method = "GET", body, params } = options

  // Build URL with query params
  const url = new URL(`${sanitizedUrl}/wp-json/wc/v3/${endpoint}`)

  // Add OAuth parameters
  url.searchParams.append("consumer_key", CONSUMER_KEY)
  url.searchParams.append("consumer_secret", CONSUMER_SECRET)

  // Add custom params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  // Log URL for debugging (remove in production)
  // console.log(`[WooCommerce] Requesting: ${url.toString()}`)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`WooCommerce API Error: ${response.status} - ${errorText}`)
  }

  const contentType = response.headers.get("content-type")
  if (contentType && !contentType.includes("application/json")) {
    const text = await response.text()
    console.error(`[WooCommerce] Received non-JSON response from ${url.toString()}:`, text.substring(0, 100))
    throw new Error(`WooCommerce API returned non-JSON response: ${contentType}`)
  }

  return response.json()
}

// Product Types
export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  type: string
  status: string
  featured: boolean
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  stock_quantity: number | null
  stock_status: string
  categories: Array<{ id: number; name: string; slug: string }>
  tags: Array<{ id: number; name: string; slug: string }>
  images: Array<{ id: number; src: string; alt: string }>
  attributes: Array<{
    id: number
    name: string
    options: string[]
  }>
  meta_data: Array<{ key: string; value: string }>
  average_rating: string
  rating_count: number
}

export interface WooCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  image: { src: string; alt: string } | null
  count: number
}

export interface WooCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  billing: WooAddress
  shipping: WooAddress
}

export interface WooAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}

export interface WooOrder {
  id: number
  status: string
  total: string
  date_created: string
  line_items: Array<{
    id: number
    name: string
    product_id: number
    quantity: number
    total: string
    price: number
  }>
  billing: WooAddress
  shipping: WooAddress
}

export interface WooLineItem {
  product_id: number
  quantity: number
}

// Products API
export const wooProducts = {
  async getAll(params?: {
    page?: number
    per_page?: number
    search?: string
    category?: string
    tag?: string
    status?: string
    featured?: boolean
    on_sale?: boolean
    min_price?: string
    max_price?: string
    orderby?: string
    order?: "asc" | "desc"
    attribute?: string
    attribute_term?: string
  }): Promise<WooProduct[]> {
    const products = await wooCommerceRequest<WooProduct[]>("products", {
      params: {
        ...params,
        status: params?.status || "publish", // Only published products
      },
    })
    return products
  },

  async getById(id: number): Promise<WooProduct> {
    return wooCommerceRequest<WooProduct>(`products/${id}`)
  },

  async search(query: string, page = 1, perPage = 12): Promise<WooProduct[]> {
    return wooCommerceRequest<WooProduct[]>("products", {
      params: { search: query, page, per_page: perPage },
    })
  },

  async getByCategory(categorySlug: string, page = 1, perPage = 12): Promise<WooProduct[]> {
    return wooCommerceRequest<WooProduct[]>("products", {
      params: { category: categorySlug, page, per_page: perPage },
    })
  },

  async getFeatured(limit = 8): Promise<WooProduct[]> {
    return wooCommerceRequest<WooProduct[]>("products", {
      params: { featured: true, per_page: limit },
    })
  },

  async getOnSale(limit = 8): Promise<WooProduct[]> {
    return wooCommerceRequest<WooProduct[]>("products", {
      params: { on_sale: true, per_page: limit },
    })
  },
}

export interface WooAttribute {
  id: number
  name: string
  slug: string
  type: string
  order_by: string
  has_archives: boolean
}

export interface WooAttributeTerm {
  id: number
  name: string
  slug: string
  description: string
  menu_order: number
  count: number
}

export const wooAttributes = {
  getAll: async (): Promise<WooAttribute[]> => {
    return wooCommerceRequest<WooAttribute[]>("products/attributes")
  },

  getTerms: async (attributeId: number): Promise<WooAttributeTerm[]> => {
    return wooCommerceRequest<WooAttributeTerm[]>(`products/attributes/${attributeId}/terms`, {
      params: { per_page: 100 },
    })
  },
}

// Categories API
export const wooCategories = {
  async getAll(params?: { page?: number; per_page?: number; parent?: number }): Promise<WooCategory[]> {
    return wooCommerceRequest<WooCategory[]>("products/categories", { params })
  },

  async getById(id: number): Promise<WooCategory> {
    return wooCommerceRequest<WooCategory>(`products/categories/${id}`)
  },

  async getBySlug(slug: string): Promise<WooCategory | null> {
    const categories = await wooCommerceRequest<WooCategory[]>("products/categories", {
      params: { slug },
    })
    return categories[0] || null
  },
}

// Customers API
export const wooCustomers = {
  async create(data: {
    email: string
    first_name: string
    last_name: string
    password: string
  }): Promise<WooCustomer> {
    return wooCommerceRequest<WooCustomer>("customers", {
      method: "POST",
      body: data,
    })
  },

  async getById(id: number): Promise<WooCustomer> {
    return wooCommerceRequest<WooCustomer>(`customers/${id}`)
  },

  async update(id: number, data: Partial<WooCustomer>): Promise<WooCustomer> {
    return wooCommerceRequest<WooCustomer>(`customers/${id}`, {
      method: "PUT",
      body: data,
    })
  },

  async getByEmail(email: string): Promise<WooCustomer | null> {
    const customers = await wooCommerceRequest<WooCustomer[]>("customers", {
      params: { email },
    })
    return customers[0] || null
  },
}

// Orders API
export const wooOrders = {
  async create(data: {
    customer_id?: number
    billing: WooAddress
    shipping: WooAddress
    line_items: WooLineItem[]
    payment_method?: string
    payment_method_title?: string
    set_paid?: boolean
  }): Promise<WooOrder> {
    return wooCommerceRequest<WooOrder>("orders", {
      method: "POST",
      body: data,
    })
  },

  async getById(id: number): Promise<WooOrder> {
    return wooCommerceRequest<WooOrder>(`orders/${id}`)
  },

  async getByCustomer(customerId: number): Promise<WooOrder[]> {
    return wooCommerceRequest<WooOrder[]>("orders", {
      params: { customer: customerId },
    })
  },

  async update(
    id: number,
    data: {
      status?: string
    },
  ): Promise<WooOrder> {
    return wooCommerceRequest<WooOrder>(`orders/${id}`, {
      method: "PUT",
      body: data,
    })
  },
}

// Helper functions
export function formatWooPrice(price: string): number {
  return Number.parseFloat(price) || 0
}

export function getProductImage(product: WooProduct): string {
  return product.images[0]?.src || "/generic-auto-part.png"
}

export function isInStock(product: WooProduct): boolean {
  return product.stock_status === "instock"
}

// Get vehicle fitment from product meta data (assumes custom meta field)
export function getVehicleFitment(product: WooProduct): string[] {
  const fitmentMeta = product.meta_data.find((m) => m.key === "_vehicle_fitment")
  if (fitmentMeta && fitmentMeta.value) {
    return fitmentMeta.value.split(",").map((v) => v.trim())
  }
  return []
}
