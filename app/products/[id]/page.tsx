import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { notFound } from "next/navigation"
import { wooProducts, type WooProduct } from "@/lib/woocommerce"

// Mock product data - will be replaced with WooCommerce API
const products = [
  {
    id: 1,
    name: "Premium Brake Pad Set",
    brand: "Brembo",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 234,
    image: "/brake-pads-automotive.jpg",
    category: "brakes",
    sku: "BRK-001",
    description:
      "High-performance brake pads designed for superior stopping power. Features ceramic compound for reduced dust and noise. Compatible with a wide range of vehicles.",
    stock: 45,
    specs: { material: "Ceramic Compound", position: "Front", warranty: "Limited Lifetime" },
  },
  {
    id: 2,
    name: "Oil Filter - High Performance",
    brand: "K&N",
    price: 24.99,
    rating: 4.9,
    reviews: 567,
    image: "/oil-filter-automotive.jpg",
    category: "engine-parts",
    sku: "ENG-002",
    description:
      "Premium oil filter with synthetic fiber filtration media. Removes 99% of harmful contaminants. Easy installation with anti-drain back valve.",
    stock: 120,
    specs: { type: "Spin-On", material: "Synthetic Fiber", warranty: "1 Year" },
  },
  {
    id: 3,
    name: "LED Headlight Bulbs H11",
    brand: "Sylvania",
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 189,
    image: "/led-headlight-bulbs.jpg",
    category: "lighting",
    sku: "LGT-003",
    description:
      "Ultra-bright LED headlight bulbs with 6000K white light. 300% brighter than halogen. Plug-and-play installation with built-in cooling fan.",
    stock: 78,
    specs: { lumens: "12000", colorTemp: "6000K", warranty: "2 Years" },
  },
  {
    id: 4,
    name: "Spark Plugs - Platinum",
    brand: "NGK",
    price: 32.99,
    rating: 4.9,
    reviews: 892,
    image: "/spark-plugs-automotive.jpg",
    category: "engine-parts",
    sku: "ENG-004",
    description:
      "Platinum-tipped spark plugs for improved fuel efficiency and smoother engine performance. Pre-gapped for easy installation. Set of 4.",
    stock: 200,
    specs: { material: "Platinum", gap: '0.044"', warranty: "Limited Lifetime" },
  },
]

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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  )
}
