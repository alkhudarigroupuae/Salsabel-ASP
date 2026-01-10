"use client"

import { Link } from "@/lib/navigation"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useCurrency } from "@/lib/currency-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const tCommon = useTranslations("Common")
  const tNav = useTranslations("Navigation")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const { currency, setCurrency, symbol } = useCurrency()

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark"
    setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("theme", newTheme)
  }

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "AED", symbol: "AED", name: "UAE Dirham" },
  ] as const

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-muted py-2 hidden md:block border-b border-border">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-xs font-medium text-muted-foreground">
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about-us" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact-us" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={theme === "dark" ? "/logos/logo-dark.png" : "/logos/logo-light.png"}
                alt="Salsabel Auto Spare Parts"
                width={750}
                height={159}
                priority
                unoptimized
                className="h-10 sm:h-12 md:h-[50px] w-auto object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search parts, brands, part numbers..."
                  className="pl-10 bg-secondary border border-[#004aad]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-sm">
                    <span className="font-medium">{symbol}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr.code}
                      onClick={() => setCurrency(curr.code as any)}
                      className={currency === curr.code ? "bg-accent" : ""}
                    >
                      <span className="font-medium w-8">{curr.symbol}</span>
                      <span className="text-muted-foreground">{curr.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="icon" className="lg:hidden">
                <Search className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {user ? (
                    <>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium text-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/my-account/">{tCommon("account")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-account/?tab=orders">{tCommon("orders")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-account/?tab=vehicles">{tCommon("myVehicles")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-destructive">
                        {tCommon("signOut")}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/my-account/">{tCommon("signIn")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-account/">{tCommon("createAccount")}</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/cart/" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                  Home
                </Link>
                <Link href="/shop/" className="text-foreground hover:text-primary transition-colors font-medium">
                  Shop
                </Link>
                <button
                  onClick={() => setBrandsOpen(!brandsOpen)}
                  className="flex items-center justify-between text-foreground hover:text-primary transition-colors font-medium"
                >
                  Brands
                  <ChevronDown className={`h-4 w-4 transition-transform ${brandsOpen ? "rotate-180" : ""}`} />
                </button>
                {brandsOpen && (
                  <div className="pl-4 flex flex-col gap-2">
                    <BrandLinks />
                  </div>
                )}
                <Link href="/blog/" className="text-foreground hover:text-primary transition-colors font-medium">
                  Blog
                </Link>
                <Link href="/about-us/" className="text-foreground hover:text-primary transition-colors font-medium">
                  About
                </Link>
                <Link href="/contact-us/" className="text-foreground hover:text-primary transition-colors font-medium">
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Brands Bar */}
      <div className="bg-black border-b border-white/10 block transition-colors duration-300">
        <div className="container mx-auto px-0 md:px-4">
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 py-2 px-2 md:px-0">
            {[
              { name: "BMW", slug: "bmw-spare-parts" },
              { name: "Mercedes", slug: "mercedes-spare-parts" },
              { name: "Audi", slug: "audi-spare-parts" },
              { name: "Porsche", slug: "porsche-spare-parts" },
              { name: "Range Rover", slug: "range-rover-spare-parts" },
              { name: "Volkswagen", slug: "volkswagen-spare-parts" },
              { name: "Bentley", slug: "bentley-spare-parts" },
              { name: "Rolls Royce", slug: "rolls-royce-spare-parts" },
              { name: "Ferrari", slug: "ferrari-spare-parts" },
              { name: "Lamborghini", slug: "lamborghini-spare-parts" },
              { name: "Mini Cooper", slug: "mini-cooper-spare-parts" },
              { name: "Maserati", slug: "maserati-spare-parts" },
            ].map((brand) => (
              <Link
                key={brand.slug}
                href={`/${brand.slug}`}
                className="px-2 py-1 text-[10px] md:text-sm text-[#004aad] hover:text-[#004aad]/80 hover:bg-white/10 rounded-md transition-colors whitespace-nowrap font-medium"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function BrandLinks({ className }: { className?: string }) {
  const brands = [
    { name: "BMW", slug: "bmw-spare-parts" },
    { name: "Mercedes", slug: "mercedes-spare-parts" },
    { name: "Audi", slug: "audi-spare-parts" },
    { name: "Porsche", slug: "porsche-spare-parts" },
    { name: "Range Rover", slug: "range-rover-spare-parts" },
    { name: "Volkswagen", slug: "volkswagen-spare-parts" },
    { name: "Bentley", slug: "bentley-spare-parts" },
    { name: "Rolls Royce", slug: "rolls-royce-spare-parts" },
    { name: "Ferrari", slug: "ferrari-spare-parts" },
    { name: "Lamborghini", slug: "lamborghini-spare-parts" },
    { name: "Mini Cooper", slug: "mini-cooper-spare-parts" },
    { name: "Maserati", slug: "maserati-spare-parts" },
  ]

  return (
    <>
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/${brand.slug}/`}
          className={className || "px-3 py-1.5 text-sm text-foreground hover:text-primary transition-colors font-medium"}
        >
          {brand.name}
        </Link>
      ))}
    </>
  )
}
