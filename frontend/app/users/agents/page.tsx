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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  listings: number
  rating: number
  status: "Active" | "On Leave" | "Busy"
  image: string
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@realtor.com",
    phone: "(555) 123-4567",
    specialization: "Luxury Homes",
    listings: 24,
    rating: 4.8,
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@realtor.com",
    phone: "(555) 234-5678",
    specialization: "Commercial",
    listings: 18,
    rating: 4.6,
    status: "Busy",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma.d@realtor.com",
    phone: "(555) 345-6789",
    specialization: "Residential",
    listings: 31,
    rating: 4.9,
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: "4",
    name: "James Wilson",
    email: "j.wilson@realtor.com",
    phone: "(555) 456-7890",
    specialization: "New Construction",
    listings: 15,
    rating: 4.7,
    status: "On Leave",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
]

export default function AgentsPage() {
  const [sorting, setSorting] = useState<{
    column: keyof Agent | null;
    direction: 'asc' | 'desc';
  }>({ column: null, direction: 'asc' });
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const sortData = (column: keyof Agent) => {
    const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
    setSorting({ column, direction });
  };

  const sortedAgents = [...agents].sort((a, b) => {
    if (sorting.column === null) return 0;
    
    const aValue = a[sorting.column];
    const bValue = b[sorting.column];

    if (sorting.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  const SortButton = ({ column, children }: { column: keyof Agent, children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => sortData(column)}
      className="h-8 px-2 hover:bg-transparent"
    >
      {children}
      {sorting.column === column ? (
        sorting.direction === 'asc' ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );

  // Pagination logic
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = sortedAgents.slice(startIndex, startIndex + itemsPerPage);

  return (
<div>
<NavigationMenuCustomUi/>
<div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Real Estate Agents</h1>
      
      {/* Add items per page selector */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">Show</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm">entries</span>
      </div>

      <Table>
        <TableCaption>A list of our qualified real estate agents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton column="name">Agent</SortButton>
            </TableHead>
            <TableHead>
              <SortButton column="specialization">Specialization</SortButton>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">
              <SortButton column="listings">Listings</SortButton>
            </TableHead>
            <TableHead className="text-right">
              <SortButton column="rating">Rating</SortButton>
            </TableHead>
            <TableHead>
              <SortButton column="status">Status</SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAgents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={agent.image} alt={agent.name} />
                  <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-sm text-muted-foreground">{agent.email}</div>
                </div>
              </TableCell>
              <TableCell>{agent.specialization}</TableCell>
              <TableCell>{agent.phone}</TableCell>
              <TableCell className="text-right">{agent.listings}</TableCell>
              <TableCell className="text-right">⭐ {agent.rating}</TableCell>
              <TableCell>
                <Badge variant={
                  agent.status === "Active" ? "success" :
                  agent.status === "Busy" ? "warning" : "secondary"
                }>
                  {agent.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedAgents.length)} of {sortedAgents.length} entries
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