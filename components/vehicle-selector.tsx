"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Search } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data - will be replaced with WooCommerce API data
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
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra", "4Runner", "Prius"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey", "Ridgeline"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Edge", "Ranger"],
    Chevrolet: ["Silverado", "Equinox", "Malibu", "Tahoe", "Traverse", "Camaro", "Colorado"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "X7", "7 Series", "M3"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLC", "A-Class"],
  } as Record<string, string[]>,
}

export function VehicleSelector() {
  const router = useRouter()
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [availableModels, setAvailableModels] = useState<string[]>([])

  useEffect(() => {
    if (make && vehicleData.models[make]) {
      setAvailableModels(vehicleData.models[make])
    } else {
      setAvailableModels([])
    }
    setModel("")
  }, [make])

  const handleSearch = () => {
    if (year && make && model) {
      router.push(`/products?year=${year}&make=${make}&model=${model}`)
    }
  }

  const isComplete = year && make && model

  return (
    <section id="vehicle-selector" className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
            <Car className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Select Your Vehicle</h2>
          <p className="text-muted-foreground">Find parts that fit your exact vehicle specifications</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="bg-secondary border-border h-12">
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
              <SelectTrigger className="bg-secondary border-border h-12">
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
              <SelectTrigger className="bg-secondary border-border h-12">
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

            <Button
              onClick={handleSearch}
              disabled={!isComplete}
              className="h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Parts
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Or browse our full{" "}
            <a href="/shop" className="text-primary hover:underline">
              parts catalog
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
