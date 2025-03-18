"use client"

import { properties } from "@/lib/dummydata/properties"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"
import { use } from "react"

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const property = properties.find(p => p.id === resolvedParams.id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div>
      <NavigationMenuCustomUi />
      <div className="container mx-auto py-6 max-w-3xl">
        <Link 
          href="/listing/properties" 
          className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        <div className="space-y-8">
          {/* Image Section */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
            />
            <Badge className="absolute top-4 right-4">
              {property.status}
            </Badge>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="flex items-center gap-8 py-4 border-y">
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">{property.bedrooms}</p>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                  </div>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">{property.bathrooms}</p>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5" />
                <div>
                  <p className="font-semibold">{property.area}m²</p>
                  <p className="text-sm text-gray-600">Area</p>
                </div>
              </div>
            </div>

            {/* Price and Type */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {formatPrice(property.price)}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {property.type}
                </Badge>
              </div>
              {property.yearBuilt && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Year Built</p>
                  <p className="font-semibold">{property.yearBuilt}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Features and Amenities */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Amenities</h3>
                <ul className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Agent Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Contact Agent</h3>
              <div className="space-y-2">
                <p className="text-gray-900 text-lg">{property.agent.name}</p>
                <p className="text-gray-600">{property.agent.phone}</p>
                <p className="text-gray-600">{property.agent.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}