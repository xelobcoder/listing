"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"

interface Property {
  id: string
  title: string
  type: "House" | "Apartment" | "Villa" | "Land"
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  status: "For Sale" | "For Rent" | "Sold" | "Rented"
  area: number
  image: string
  agent: string
}

const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    type: "Villa",
    price: 850000,
    location: "Beverly Hills, CA",
    bedrooms: 5,
    bathrooms: 4,
    status: "For Sale",
    area: 4200,
    image: "/placeholder.jpg",
    agent: "Sarah Johnson"
  },
  {
    id: "2",
    title: "Downtown Apartment",
    type: "Apartment",
    price: 420000,
    location: "Manhattan, NY",
    bedrooms: 2,
    bathrooms: 2,
    status: "For Rent",
    area: 1200,
    image: "/placeholder.jpg",
    agent: "Michael Chen"
  },
  {
    id: "3",
    title: "Suburban Family Home",
    type: "House",
    price: 550000,
    location: "Austin, TX",
    bedrooms: 4,
    bathrooms: 3,
    status: "For Sale",
    area: 2800,
    image: "/placeholder.jpg",
    agent: "Emma Davis"
  },
  {
    id: "4",
    title: "Beachfront Property",
    type: "House",
    price: 1200000,
    location: "Miami, FL",
    bedrooms: 6,
    bathrooms: 5,
    status: "Sold",
    area: 5000,
    image: "/placeholder.jpg",
    agent: "James Wilson"
  },
]

export default function ListingsPage() {
  const [sorting, setSorting] = useState<{
    column: keyof Property | null;
    direction: 'asc' | 'desc';
  }>({ column: null, direction: 'asc' });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const sortData = (column: keyof Property) => {
    const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
    setSorting({ column, direction });
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    return matchesStatus && matchesType;
  });

  // Sort filtered properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sorting.column === null) return 0;
    
    const aValue = a[sorting.column];
    const bValue = b[sorting.column];

    if (sorting.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  // Paginate sorted properties
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = sortedProperties.slice(startIndex, startIndex + itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
  <div>

<div className="container mx-auto py-10">
    <NavigationMenuCustomUi/>
      <h1 className="text-3xl font-bold mb-8">Property Listings</h1>

      <div className="flex gap-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="For Sale">For Sale</SelectItem>
            <SelectItem value="For Rent">For Rent</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
            <SelectItem value="Rented">Rented</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Land">Land</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>A list of all properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortData('type')}>
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortData('price')}>
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Agent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <span>{property.title}</span>
                </div>
              </TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{formatPrice(property.price)}</TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>{property.bedrooms} beds • {property.bathrooms} baths</span>
                  <span>{property.area} sq ft</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={
                  property.status === "For Sale" ? "default" :
                  property.status === "For Rent" ? "secondary" :
                  property.status === "Sold" ? "destructive" : "outline"
                }>
                  {property.status}
                </Badge>
              </TableCell>
              <TableCell>{property.agent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedProperties.length)} of {sortedProperties.length} properties
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}