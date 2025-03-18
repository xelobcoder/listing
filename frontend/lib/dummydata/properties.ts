export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "House" | "Apartment" | "Villa" | "Land" | "Commercial" | "Office";
  status: "For Sale" | "For Rent" | "New Build" | "Off Plan" | "Short Let";
  image: string;
  description: string;
  features: string[];
  amenities: string[];
  yearBuilt?: number;
  parkingSpaces?: number;
  furnished?: boolean;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    price: 2500000,
    location: "East Legon, Accra",
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    type: "Villa",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
    description: "Luxurious villa with modern architecture, featuring a private pool and garden. Perfect for diplomatic residences.",
    features: ["Private Pool", "Garden", "Security Post", "Boys Quarters", "Garage"],
    amenities: ["Air Conditioning", "Backup Generator", "Water Storage", "CCTV"],
    yearBuilt: 2022,
    parkingSpaces: 4,
    furnished: true,
    agent: {
      name: "Kwame Mensah",
      phone: "+233 50 123 4567",
      email: "kwame@realestate.com"
    }
  },
  {
    id: "2",
    title: "Executive Office Space",
    price: 15000,
    location: "Airport City, Accra",
    area: 2800,
    type: "Commercial",
    status: "For Rent",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    description: "Premium office space in Airport City's business district. Modern facilities with 24/7 access.",
    features: ["Reception Area", "Conference Room", "Kitchen", "Server Room"],
    amenities: ["24/7 Access", "Elevator", "Parking", "Security"],
    yearBuilt: 2020,
    parkingSpaces: 10,
    furnished: true,
    agent: {
      name: "Abena Osei",
      phone: "+233 50 987 6543",
      email: "abena@realestate.com"
    }
  },
  {
    id: "3",
    title: "New Apartment Complex",
    price: 850000,
    location: "Cantonments, Accra",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "Apartment",
    status: "New Build",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
    description: "Brand new apartment in a modern complex with shared facilities and 24-hour security.",
    features: ["Balcony", "Built-in Wardrobes", "Modern Kitchen"],
    amenities: ["Swimming Pool", "Gym", "Children's Play Area", "Parking"],
    yearBuilt: 2024,
    parkingSpaces: 2,
    furnished: false,
    agent: {
      name: "John Addo",
      phone: "+233 50 456 7890",
      email: "john@realestate.com"
    }
  },
  // First three properties are correct, continuing from property 4...
  
    {
      id: "4",
      title: "Modern Studio Apartment",
      price: 2500,
      location: "Osu, Accra",
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      type: "Apartment",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
      description: "Cozy studio apartment in the heart of Osu, perfect for young professionals.",
      features: ["Built-in Wardrobe", "Modern Kitchen", "Balcony"],
      amenities: ["Air Conditioning", "Internet Ready", "24/7 Security"],
      yearBuilt: 2020,
      parkingSpaces: 1,
      furnished: true,
      agent: {
        name: "Emma Kofie",
        phone: "+233 50 234 5678",
        email: "emma@realestate.com"
      }
    },
    {
      id: "5",
      title: "Mediterranean Villa",
      price: 1500000,
      location: "Trasacco Valley, Accra",
      bedrooms: 6,
      bathrooms: 5,
      area: 5500,
      type: "Villa",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
      description: "Luxurious Mediterranean-style villa with spectacular views and premium finishes.",
      features: ["Swimming Pool", "Tennis Court", "Wine Cellar", "Staff Quarters"],
      amenities: ["Smart Home System", "Solar Power", "Water Treatment", "Elevator"],
      yearBuilt: 2021,
      parkingSpaces: 6,
      furnished: true,
      agent: {
        name: "Daniel Asare",
        phone: "+233 50 345 6789",
        email: "daniel@realestate.com"
      }
    },
    {
      id: "6",
      title: "Urban Loft",
      price: 3200,
      location: "Ridge, Accra",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "Apartment",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
      description: "Modern loft apartment with high ceilings and contemporary design.",
      features: ["High Ceilings", "Open Plan", "City Views"],
      amenities: ["Gym", "Rooftop Garden", "Concierge Service"],
      yearBuilt: 2019,
      parkingSpaces: 2,
      furnished: true,
      agent: {
        name: "Sophia Mensah",
        phone: "+233 50 456 7890",
        email: "sophia@realestate.com"
      }
    },
    // Property 7 is mostly complete, just adding missing amenities
    {
      id: "8",
      title: "Luxury Beachfront Condo",
      price: 895000,
      location: "Labadi, Accra",
      bedrooms: 2,
      bathrooms: 2.5,
      area: 1800,
      type: "Apartment",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
      description: "Exclusive beachfront condo with panoramic ocean views.",
      features: ["Ocean View", "Private Beach Access", "Large Terrace"],
      amenities: ["Beach Club", "Infinity Pool", "24/7 Security"],
      yearBuilt: 2023,
      parkingSpaces: 2,
      furnished: true,
      agent: {
        name: "Grace Owusu",
        phone: "+233 50 567 8901",
        email: "grace@realestate.com"
      }
    },
    {
      id: "9",
      title: "Mountain View Estate",
      price: 2200000,
      location: "Aburi, Eastern Region",
      bedrooms: 7,
      bathrooms: 6,
      area: 6800,
      type: "Villa",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      description: "Spectacular mountain estate with breathtaking views of Aburi hills.",
      features: ["Mountain Views", "Guest House", "Tropical Garden"],
      amenities: ["Private Security", "Backup Power", "Borehole Water"],
      yearBuilt: 2022,
      parkingSpaces: 8,
      furnished: false,
      agent: {
        name: "Michael Addo",
        phone: "+233 50 678 9012",
        email: "michael@realestate.com"
      }
    },
    {
      id: "10",
      title: "Historic Townhouse",
      price: 4500,
      location: "Jamestown, Accra",
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2400,
      type: "House",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800",
      description: "Renovated historic townhouse with modern amenities in Jamestown.",
      features: ["Original Architecture", "Courtyard", "Roof Terrace"],
      amenities: ["Modern Kitchen", "Air Conditioning", "Security System"],
      yearBuilt: 1950,
      parkingSpaces: 2,
      furnished: true,
      agent: {
        name: "Elizabeth Addo",
        phone: "+233 50 789 0123",
        email: "elizabeth@realestate.com"
      }
    }
]