import type { MetadataRoute } from "next"
import { wooProducts } from "@/lib/woocommerce"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://salparts.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/my-account`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  // Category pages (matching WooCommerce URL structure)
  const categoryPages: MetadataRoute.Sitemap = [
    "bmw-spare-parts",
    "mercedes-spare-parts",
    "audi-spare-parts",
    "porsche-spare-parts",
    "range-rover-spare-parts",
    "volkswagen-spare-parts",
    "bentley-spare-parts",
    "rolls-royce-spare-parts",
    "ferrari-spare-parts",
    "lamborghini-spare-parts",
    "mini-cooper-spare-parts",
    "maserati-spare-parts",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // Try to fetch products from WooCommerce for product URLs
  let productPages: MetadataRoute.Sitemap = []
  try {
    const products = await wooProducts.getAll({ per_page: 100 })
    productPages = products.map((product: { slug: string; date_modified: string }) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.date_modified),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (error) {
    // WooCommerce not configured, use mock data
    console.log("WooCommerce not configured, using static sitemap")
  }

  return [...staticPages, ...categoryPages, ...productPages]
}
