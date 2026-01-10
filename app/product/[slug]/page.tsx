import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductDetails } from "@/components/product-details"
import { wooProducts, type WooProduct } from "@/lib/woocommerce"
import { MOCK_PRODUCTS } from "@/lib/mock-products"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  try {
    if (!process.env.WOOCOMMERCE_URL) {
      // Try to find by slug
      const productBySlug = MOCK_PRODUCTS.find((p) => p.slug === slug)
      if (productBySlug) return productBySlug

      // Try to find by ID if slug is numeric
      if (!isNaN(Number(slug))) {
        const productById = MOCK_PRODUCTS.find((p) => p.id === Number(slug))
        if (productById) return productById
      }

      return null
    }

    // WooCommerce API: get product by slug
    const products = await wooProducts.getAll({ search: slug, per_page: 1 })
    
    // If no product found by slug search, and slug is numeric, try by ID
    if (products.length === 0 && !isNaN(Number(slug))) {
        try {
            const product = await wooProducts.getById(Number(slug))
            return product
        } catch (e) {
            return null
        }
    }

    return products[0] || null
  } catch (error) {
    console.error("Error fetching product:", error)
    // Fallback to mock data on error
    const productBySlug = MOCK_PRODUCTS.find((p) => p.slug === slug)
    if (productBySlug) return productBySlug
    
    if (!isNaN(Number(slug))) {
      const productById = MOCK_PRODUCTS.find((p) => p.id === Number(slug))
      if (productById) return productById
    }
    
    return null
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
