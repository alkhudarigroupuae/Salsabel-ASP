"use client"

import useSWR from "swr"
import type { WooProduct } from "@/lib/woocommerce"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UseProductsOptions {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
  page?: number
  perPage?: number
  orderby?: string
  order?: "asc" | "desc"
  per_page?: number
}

export function useProducts(options: UseProductsOptions = {}) {
  const params = new URLSearchParams()

  if (options.search) params.set("q", options.search)
  if (options.category) params.set("category", options.category)
  if (options.minPrice) params.set("minPrice", options.minPrice.toString())
  if (options.maxPrice) params.set("maxPrice", options.maxPrice.toString())
  if (options.page) params.set("page", options.page.toString())

  const perPage = options.perPage || options.per_page
  if (perPage) params.set("per_page", perPage.toString())

  if (options.orderby === "date" && options.order === "desc") {
    params.set("sort", "newest")
  } else if (options.sort) {
    params.set("sort", options.sort)
  }

  const { data, error, isLoading, mutate } = useSWR<WooProduct[]>(`/api/products?${params.toString()}`, fetcher)

  return {
    products: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useProduct(id: number) {
  const { data, error, isLoading } = useSWR<WooProduct>(`/api/products/${id}`, fetcher)

  return {
    product: data,
    isLoading,
    isError: error,
  }
}
