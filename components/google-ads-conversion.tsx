"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}

export function GoogleAdsConversion() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views on route change
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_search: searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  return null
}

// Call this function when a purchase is completed
export function trackPurchase(transactionId: string, value: number, currency = "AED") {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-XXXXXXXXX/CONVERSION_LABEL",
      value: value,
      currency: currency,
      transaction_id: transactionId,
    })
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Purchase", {
      value: value,
      currency: currency,
    })
  }
}

// Call this function when an item is added to cart
export function trackAddToCart(productName: string, productId: string, value: number) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "add_to_cart", {
      currency: "AED",
      value: value,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: value,
          quantity: 1,
        },
      ],
    })
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "AddToCart", {
      content_name: productName,
      content_ids: [productId],
      content_type: "product",
      value: value,
      currency: "AED",
    })
  }
}

// Call this function when checkout begins
export function trackBeginCheckout(
  value: number,
  items: Array<{ id: string; name: string; price: number; quantity: number }>,
) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "begin_checkout", {
      currency: "AED",
      value: value,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout", {
      content_ids: items.map((item) => item.id),
      content_type: "product",
      value: value,
      currency: "AED",
      num_items: items.length,
    })
  }
}
