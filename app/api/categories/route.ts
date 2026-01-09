import { NextResponse } from "next/server"
import { wooCategories, type WooCategory } from "@/lib/woocommerce"

// GET /api/categories - Get all categories from WooCommerce
export async function GET() {
  try {
    const categories = await wooCategories.getAll({ per_page: 100 })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)

    // Return fallback categories if WooCommerce is not configured
    const fallbackCategories: WooCategory[] = [
      { id: 1, name: "BMW", slug: "bmw-spare-parts", parent: 0, description: "BMW Spare Parts", image: null, count: 0 },
      {
        id: 2,
        name: "Mercedes",
        slug: "mercedes-spare-parts",
        parent: 0,
        description: "Mercedes Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 3,
        name: "Audi",
        slug: "audi-spare-parts",
        parent: 0,
        description: "Audi Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 4,
        name: "Porsche",
        slug: "porsche-spare-parts",
        parent: 0,
        description: "Porsche Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 5,
        name: "Range Rover",
        slug: "range-rover-spare-parts",
        parent: 0,
        description: "Range Rover Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 6,
        name: "Volkswagen",
        slug: "volkswagen-spare-parts",
        parent: 0,
        description: "Volkswagen Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 7,
        name: "Bentley",
        slug: "bentley-spare-parts",
        parent: 0,
        description: "Bentley Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 8,
        name: "Rolls Royce",
        slug: "rolls-royce-spare-parts",
        parent: 0,
        description: "Rolls Royce Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 9,
        name: "Ferrari",
        slug: "ferrari-spare-parts",
        parent: 0,
        description: "Ferrari Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 10,
        name: "Lamborghini",
        slug: "lamborghini-spare-parts",
        parent: 0,
        description: "Lamborghini Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 11,
        name: "Mini Cooper",
        slug: "mini-cooper-spare-parts",
        parent: 0,
        description: "Mini Cooper Spare Parts",
        image: null,
        count: 0,
      },
      {
        id: 12,
        name: "Maserati",
        slug: "maserati-spare-parts",
        parent: 0,
        description: "Maserati Spare Parts",
        image: null,
        count: 0,
      },
    ]

    return NextResponse.json(fallbackCategories)
  }
}
