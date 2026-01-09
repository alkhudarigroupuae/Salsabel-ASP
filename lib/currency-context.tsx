"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Currency = "USD" | "EUR" | "AED"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (priceInAED: number) => number
  formatPrice: (priceInAED: number) => string
  symbol: string
}

// Approximate exchange rates (AED to other currencies)
const exchangeRates: Record<Currency, number> = {
  AED: 1,
  USD: 0.27, // 1 AED = 0.27 USD
  EUR: 0.25, // 1 AED = 0.25 EUR
}

const currencySymbols: Record<Currency, string> = {
  AED: "AED",
  USD: "$",
  EUR: "€",
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD")

  const convertPrice = (priceInAED: number): number => {
    return priceInAED * exchangeRates[currency]
  }

  const formatPrice = (priceInAED: number): string => {
    const converted = convertPrice(priceInAED)
    const symbol = currencySymbols[currency]

    if (currency === "AED") {
      return `${converted.toFixed(2)} ${symbol}`
    }
    return `${symbol}${converted.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        symbol: currencySymbols[currency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
