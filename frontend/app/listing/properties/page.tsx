"use client"

import { useState, useEffect } from "react"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"
import { Card, CardContent } from "@/components/ui/card"
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
import Link from "next/link"

// Define the property type
interface Property {
  id: string;
  title: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: string;
  city: string;
  state: string;
  status: string;
  imageUrls: string[];
}

// Add this function at the top of your file, after the imports
const getValidImageUrl = async (imageId: string | undefined): Promise<string> => {
  if (!imageId) return '/placeholder-property.jpg';
  console.log('imageId',imageId)
  try {
    const response = await fetch(`http://localhost:3000/api/properties/images?imageId=${imageId}`);
    console.log(response)
    if (!response.ok) {
      return '/placeholder-property.jpg';
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch {
    return '/placeholder-property.jpg';
  }
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [location, setLocation] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Add price formatter function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let url = '/api/properties?';
      
      // Add filters to the URL
      if (propertyType !== 'all') {
        url += `propertyType=${propertyType}&`;
      }
      
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-');
        if (min) url += `minPrice=${min}&`;
        if (max) url += `maxPrice=${max}&`;
      }
      
      if (location) {
        url += `city=${location}&`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch properties');
      }
      
      setProperties(data.properties || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const urls: Record<string, string> = {};
      
      for (const property of properties) {
        if (property.imageUrls?.[0]) {
          urls[property.id] = await getValidImageUrl(property.imageUrls[0]);
        }
      }
      
      setImageUrls(urls);
    };
    
    if (properties.length > 0) {
      loadImages();
    }
  }, [properties]);

  const handleSearch = () => {
    fetchProperties();
  };

  return (
    <div>
      <NavigationMenuCustomUi />
      <div className="container mx-auto py-10">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input 
                placeholder="Search location..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
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
                <SelectItem value="HOUSE">House</SelectItem>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="VILLA">Villa</SelectItem>
                <SelectItem value="LAND">Land</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch}>Search Properties</Button>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-10">
            <p>Loading properties...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Property Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p>No properties found matching your criteria.</p>
              </div>
            ) : (
              properties.map((property) => (
                <Link href={`/listing/properties/${property.id}`} key={property.id}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                    <div className="relative h-36">
                      <Image
                        src={imageUrls[property.id] || '/placeholder-property.jpg'}
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
                        <span className="truncate">{property.city}, {property.state}</span>
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
                            <span>{property.squareFeet}m²</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] h-5">
                          {property.propertyType}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}