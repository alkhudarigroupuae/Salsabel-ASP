import { NextResponse } from "next/server"
import { wooProducts } from "@/lib/woocommerce"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = Number.parseInt(id)

  try {
    if (!process.env.WOOCOMMERCE_URL) {
      // Return mock product for development
      return NextResponse.json(getMockProduct(productId))
    }

    const product = await wooProducts.getById(productId)
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(getMockProduct(productId))
  }
}

function getMockProduct(id: number) {
  const mockProducts: Record<number, object> = {
    1: {
      id: 1,
      name: "Premium Brake Pad Set",
      sku: "BRK-001",
      price: "89.99",
      regular_price: "119.99",
      sale_price: "89.99",
      on_sale: true,
      stock_status: "instock",
      stock_quantity: 45,
      average_rating: "4.8",
      rating_count: 234,
      images: [{ id: 1, src: "/brake-pads-automotive.jpg", alt: "Brake Pads" }],
      categories: [{ id: 1, name: "Brakes", slug: "brakes" }],
      description:
        "High-performance brake pads designed for superior stopping power. Features ceramic compound for reduced dust and noise. Compatible with a wide range of vehicles.",
      short_description: "High-performance ceramic brake pads",
      attributes: [
        { name: "Material", options: ["Ceramic Compound"] },
        { name: "Position", options: ["Front"] },
        { name: "Warranty", options: ["Limited Lifetime"] },
      ],
    },
    2: {
      id: 2,
      name: "Oil Filter - High Performance",
      sku: "ENG-002",
      price: "24.99",
      regular_price: "24.99",
      sale_price: "",
      on_sale: false,
      stock_status: "instock",
      stock_quantity: 120,
      average_rating: "4.9",
      rating_count: 567,
      images: [{ id: 2, src: "/oil-filter-automotive.jpg", alt: "Oil Filter" }],
      categories: [{ id: 2, name: "Engine Parts", slug: "engine-parts" }],
      description:
        "Premium oil filter with synthetic fiber filtration media. Removes 99% of harmful contaminants. Easy installation with anti-drain back valve.",
      short_description: "Premium synthetic fiber oil filter",
      attributes: [
        { name: "Type", options: ["Spin-On"] },
        { name: "Material", options: ["Synthetic Fiber"] },
        { name: "Warranty", options: ["1 Year"] },
      ],
    },
  }

  return mockProducts[id] || mockProducts[1]
}
