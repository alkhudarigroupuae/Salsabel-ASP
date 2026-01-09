"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const categories = [
  { id: "engine-parts", name: "Engine Parts" },
  { id: "brakes", name: "Brakes" },
  { id: "electrical", name: "Electrical" },
  { id: "suspension", name: "Suspension" },
  { id: "hvac", name: "HVAC" },
  { id: "lighting", name: "Lighting" },
  { id: "body-parts", name: "Body Parts" },
  { id: "tools", name: "Tools" },
]

const brands = ["Bosch", "Denso", "ACDelco", "Brembo", "K&N", "Moog", "NGK", "Sylvania", "Wagner"]

const vehicleData = {
  years: Array.from({ length: 30 }, (_, i) => (2025 - i).toString()),
  makes: [
    "Acura",
    "Audi",
    "BMW",
    "Chevrolet",
    "Dodge",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Jeep",
    "Kia",
    "Lexus",
    "Mazda",
    "Mercedes-Benz",
    "Nissan",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
  ],
  models: {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Edge"],
    Chevrolet: ["Silverado", "Equinox", "Malibu", "Tahoe", "Traverse", "Camaro"],
  } as Record<string, string[]>,
}

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get("category")?.split(",") || [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.get("brand")?.split(",") || [])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [year, setYear] = useState(searchParams.get("year") || "")
  const [make, setMake] = useState(searchParams.get("make") || "")
  const [model, setModel] = useState(searchParams.get("model") || "")
  const [availableModels, setAvailableModels] = useState<string[]>([])

  useEffect(() => {
    if (make && vehicleData.models[make]) {
      setAvailableModels(vehicleData.models[make])
    } else {
      setAvailableModels([])
    }
  }, [make])

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    } else {
      params.delete("category")
    }

    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands.join(","))
    } else {
      params.delete("brand")
    }

    if (priceRange[0] > 0 || priceRange[1] < 500) {
      params.set("minPrice", priceRange[0].toString())
      params.set("maxPrice", priceRange[1].toString())
    }

    if (year) params.set("year", year)
    else params.delete("year")

    if (make) params.set("make", make)
    else params.delete("make")

    if (model) params.set("model", model)
    else params.delete("model")

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 500])
    setYear("")
    setMake("")
    setModel("")
    router.push("/products")
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Filter */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Vehicle Fit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {vehicleData.years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={make} onValueChange={setMake}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              {vehicleData.makes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={model} onValueChange={setModel} disabled={!make}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={brand} className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters} className="w-full bg-primary text-primary-foreground">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" className="w-full border-border bg-transparent">
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
