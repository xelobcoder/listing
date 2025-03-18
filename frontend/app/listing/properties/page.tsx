"use client"

import { useState } from "react"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MapPin, Search } from "lucide-react"
import Image from "next/image"
import { properties } from "@/lib/dummydata/properties"
import Link from "next/link"



export default function PropertiesPage() {
  const [priceRange, setPriceRange] = useState<string>("all")
  const [propertyType, setPropertyType] = useState<string>("all")

  // Add price formatter function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div>
      <NavigationMenuCustomUi />
      <div className="container mx-auto py-10">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input placeholder="Search location..." />
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-250000">GH₵0 - GH₵250,000</SelectItem>
                <SelectItem value="250000-500000">GH₵250,000 - GH₵500,000</SelectItem>
                <SelectItem value="500000-1000000">GH₵500,000 - GH₵1,000,000</SelectItem>
                <SelectItem value="1000000+">GH₵1,000,000+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
            <Button>Search Properties</Button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
          {properties.map((property) => (
            <Link href={`/listing/properties/${property.id}`} key={property.id}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative h-36">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5">
                    {property.status}
                  </Badge>
                </div>
                <CardContent className="p-2.5 space-y-1.5">
                  <span className="text-lg font-bold text-primary block">
                    {formatPrice(property.price)}
                  </span>
                  <h3 className="font-medium text-sm leading-tight truncate">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3 w-3" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3 w-3" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-3 w-3" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] h-5">
                      {property.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}