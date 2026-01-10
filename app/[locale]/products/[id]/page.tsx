import { ProductDetails } from "@/components/product-details"
import { notFound } from "next/navigation"
import { wooProducts, type WooProduct } from "@/lib/woocommerce"
import { MOCK_PRODUCTS } from "@/lib/mock-products"

async function getProduct(id: number): Promise<WooProduct | null> {
  try {
    // Try to fetch from WooCommerce API
    if (process.env.WOOCOMMERCE_URL) {
      const product = await wooProducts.getById(id)
      return product
    }
  } catch (error) {
    console.error("Error fetching product from WooCommerce:", error)
  }

  // Fallback to mock data
  const mockProduct = MOCK_PRODUCTS.find((p) => p.id === id)
  if (mockProduct) {
    return mockProduct
  }

  // Return null if not found - will show a user-friendly message
  return null
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = Number.parseInt(id)

  const product = await getProduct(productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
    </div>
  )
}
