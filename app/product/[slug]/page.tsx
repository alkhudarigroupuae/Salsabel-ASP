import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductDetails } from "@/components/product-details"
import { wooProducts, type WooProduct } from "@/lib/woocommerce"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// Mock products for development
const MOCK_PRODUCTS: Record<string, WooProduct> = {
  "premium-brake-pad-set": {
    id: 1,
    name: "Premium Brake Pad Set",
    slug: "premium-brake-pad-set",
    permalink: "/product/premium-brake-pad-set/",
    type: "simple",
    status: "publish",
    featured: true,
    sku: "BRK-001",
    price: "89.99",
    regular_price: "119.99",
    sale_price: "89.99",
    on_sale: true,
    stock_quantity: 45,
    stock_status: "instock",
    categories: [{ id: 1, name: "Brakes", slug: "brakes" }],
    tags: [],
    images: [{ id: 1, src: "/brake-pads-automotive.jpg", alt: "Brake Pads" }],
    description:
      "High-performance brake pads designed for superior stopping power. Features ceramic compound for reduced dust and noise. Compatible with a wide range of vehicles.",
    short_description: "High-performance ceramic brake pads",
    attributes: [
      { id: 1, name: "Material", options: ["Ceramic Compound"] },
      { id: 2, name: "Position", options: ["Front"] },
      { id: 3, name: "Warranty", options: ["Limited Lifetime"] },
    ],
    meta_data: [],
    average_rating: "4.8",
    rating_count: 234,
  },
  "oil-filter-high-performance": {
    id: 2,
    name: "Oil Filter - High Performance",
    slug: "oil-filter-high-performance",
    permalink: "/product/oil-filter-high-performance/",
    type: "simple",
    status: "publish",
    featured: false,
    sku: "ENG-002",
    price: "24.99",
    regular_price: "24.99",
    sale_price: "",
    on_sale: false,
    stock_quantity: 120,
    stock_status: "instock",
    categories: [{ id: 2, name: "Engine Parts", slug: "engine-parts" }],
    tags: [],
    images: [{ id: 2, src: "/oil-filter-automotive.jpg", alt: "Oil Filter" }],
    description:
      "Premium oil filter with synthetic fiber filtration media. Removes 99% of harmful contaminants. Easy installation with anti-drain back valve.",
    short_description: "Premium synthetic fiber oil filter",
    attributes: [
      { id: 1, name: "Type", options: ["Spin-On"] },
      { id: 2, name: "Material", options: ["Synthetic Fiber"] },
      { id: 3, name: "Warranty", options: ["1 Year"] },
    ],
    meta_data: [],
    average_rating: "4.9",
    rating_count: 567,
  },
}

async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  try {
    if (!process.env.WOOCOMMERCE_URL) {
      return MOCK_PRODUCTS[slug] || null
    }

    // WooCommerce API: get product by slug
    const products = await wooProducts.getAll({ search: slug, per_page: 1 })
    return products[0] || null
  } catch (error) {
    console.error("Error fetching product:", error)
    return MOCK_PRODUCTS[slug] || null
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found - Salsabel Auto Spare Parts",
    }
  }

  return {
    title: `${product.name} - Salsabel Auto Spare Parts`,
    description:
      product.short_description?.replace(/<[^>]*>/g, "") || `Shop ${product.name} at Salsabel Auto Spare Parts`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </div>
  )
}
