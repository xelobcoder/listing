"use client"

import { properties } from "@/lib/dummydata/properties"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id == params.id)

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
      <div className="container mx-auto py-6">
        <Link 
          href="/listing/properties" 
          className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Badge className="absolute top-4 right-4">
              {property.status}
            </Badge>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-8 py-4 border-y">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <div>
                  <p className="font-semibold">{property.bedrooms}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <div>
                  <p className="font-semibold">{property.bathrooms}</p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5" />
                <div>
                  <p className="font-semibold">{property.area}m²</p>
                  <p className="text-sm text-gray-600">Area</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {formatPrice(property.price)}
              </h2>
              <Badge variant="outline" className="text-sm">
                {property.type}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">
                This beautiful property offers modern amenities and comfortable living spaces.
                Perfect for families looking for a place to call home in a prime location.
                Contact us for more information or to schedule a viewing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}