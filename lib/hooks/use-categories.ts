"use client"

import useSWR from "swr"
import type { WooCategory } from "@/lib/woocommerce"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useCategories() {
  const { data, error, isLoading } = useSWR<WooCategory[]>("/api/categories", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache for 1 minute
  })

  return {
    categories: data || [],
    isLoading,
    error,
  }
}
