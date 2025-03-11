'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

// Define a schema that mirrors your table fields
const propertySchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  propertyType: z.enum(['HOUSE', 'APARTMENT', 'CONDO', 'LAND', 'TOWNHOUSE', 'MULTI_FAMILY', 'COMMERCIAL']),
  bedrooms: z.number().min(0, 'Must be at least 0'),
  bathrooms: z.number().min(0, 'Must be at least 0'),
  squareFeet: z.number().optional(),
  lotSize: z.number().optional(),
  yearBuilt: z.number().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'AVAILABLE', 'SOLD', 'OFF_MARKET']).default('PENDING'),
  address: z.string().nonempty('Address is required'),
  city: z.string().nonempty('City is required'),
  state: z.string().nonempty('State is required'),
  postalCode: z.string().nonempty('Postal code is required'),
  country: z.string().nonempty('Country is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  hasGarage: z.boolean().default(false),
  hasPool: z.boolean().default(false),
  hasBasement: z.boolean().default(false),
  hasFireplace: z.boolean().default(false),
  parkingSpaces: z.number().optional(),
  heatingType: z.enum(['NONE', 'GAS', 'ELECTRIC', 'WOOD', 'GEOTHERMAL', 'SOLAR']).default('NONE'),
  coolingType: z.enum(['NONE', 'CENTRAL_AIR', 'WINDOW_UNIT', 'EVAPORATIVE', 'GEOTHERMAL']).default('NONE'),
  imageUrls: z.string().optional(), // expect comma separated URLs
  videoUrl: z.string().optional(),
  floorPlans: z.string().optional(), // expect comma separated URLs
  agentId: z.string().nonempty('Agent ID is required'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function PropertyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      status: 'PENDING',
      hasGarage: false,
      hasPool: false,
      hasBasement: false,
      hasFireplace: false,
      heatingType: 'NONE',
      coolingType: 'NONE',
    },
  });

  const onSubmit = (data: PropertyFormData) => {
    // Convert comma separated strings to arrays if needed:
    if (data.imageUrls) {
      data.imageUrls = data.imageUrls.split(',').map(url => url.trim()).filter(Boolean).join(',');
    }
    if (data.floorPlans) {
      data.floorPlans = data.floorPlans.split(',').map(url => url.trim()).filter(Boolean).join(',');
    }
    console.log('Form Data:', data);
    // perform your API call here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Title */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Title</label>
        <Input placeholder="Property title" {...register('title')} />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Description</label>
        <Textarea placeholder="Describe the property" {...register('description')} />
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Price</label>
        <Input type="number" step="0.01" placeholder="Price" {...register('price', { valueAsNumber: true })} />
        {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
      </div>

      {/* Property Type */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Property Type</label>
        <select {...register('propertyType')} className="p-2 border rounded">
          <option value="HOUSE">House</option>
          <option value="APARTMENT">Apartment</option>
          <option value="CONDO">Condo</option>
          <option value="LAND">Land</option>
          <option value="TOWNHOUSE">Townhouse</option>
          <option value="MULTI_FAMILY">Multi Family</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Bedrooms</label>
          <Input type="number" placeholder="Bedrooms" {...register('bedrooms', { valueAsNumber: true })} />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Bathrooms</label>
          <Input type="number" placeholder="Bathrooms" {...register('bathrooms', { valueAsNumber: true })} />
        </div>
      </div>

      {/* Square Feet, Lot Size, Year Built */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Square Feet</label>
          <Input type="number" placeholder="Square Feet" {...register('squareFeet', { valueAsNumber: true })} />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Lot Size</label>
          <Input type="number" placeholder="Lot Size" {...register('lotSize', { valueAsNumber: true })} />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Year Built</label>
          <Input type="number" placeholder="Year Built" {...register('yearBuilt', { valueAsNumber: true })} />
        </div>
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Status</label>
        <select {...register('status')} className="p-2 border rounded">
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="OFF_MARKET">Off Market</option>
        </select>
      </div>

      {/* Address Fields */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Address</label>
        <Input placeholder="Address" {...register('address')} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">City</label>
          <Input placeholder="City" {...register('city')} />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">State</label>
          <Input placeholder="State" {...register('state')} />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Postal Code</label>
          <Input placeholder="Postal Code" {...register('postalCode')} />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Country</label>
        <Input placeholder="Country" {...register('country')} />
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Latitude</label>
          <Input type="number" step="0.000001" placeholder="Latitude" {...register('latitude', { valueAsNumber: true })} />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Longitude</label>
          <Input type="number" step="0.000001" placeholder="Longitude" {...register('longitude', { valueAsNumber: true })} />
        </div>
      </div>

      {/* Feature Checkboxes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="hasGarage" {...register('hasGarage')} />
          <label htmlFor="hasGarage">Has Garage</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hasPool" {...register('hasPool')} />
          <label htmlFor="hasPool">Has Pool</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hasBasement" {...register('hasBasement')} />
          <label htmlFor="hasBasement">Has Basement</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hasFireplace" {...register('hasFireplace')} />
          <label htmlFor="hasFireplace">Has Fireplace</label>
        </div>
      </div>

      {/* Parking Spaces */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Parking Spaces</label>
        <Input type="number" placeholder="Parking Spaces" {...register('parkingSpaces', { valueAsNumber: true })} />
      </div>

      {/* Heating Type */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Heating Type</label>
        <select {...register('heatingType')} className="p-2 border rounded">
          <option value="NONE">None</option>
          <option value="GAS">Gas</option>
          <option value="ELECTRIC">Electric</option>
          <option value="WOOD">Wood</option>
          <option value="GEOTHERMAL">Geothermal</option>
          <option value="SOLAR">Solar</option>
        </select>
      </div>

      {/* Cooling Type */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Cooling Type</label>
        <select {...register('coolingType')} className="p-2 border rounded">
          <option value="NONE">None</option>
          <option value="CENTRAL_AIR">Central Air</option>
          <option value="WINDOW_UNIT">Window Unit</option>
          <option value="EVAPORATIVE">Evaporative</option>
          <option value="GEOTHERMAL">Geothermal</option>
        </select>
      </div>

      {/* Image URLs */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Image URLs (comma separated)</label>
        <Input placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" {...register('imageUrls')} />
      </div>

      {/* Video URL */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Video URL</label>
        <Input placeholder="https://example.com/video.mp4" {...register('videoUrl')} />
      </div>

      {/* Floor Plans */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Floor Plans (comma separated)</label>
        <Input placeholder="https://example.com/floorplan1.jpg, https://example.com/floorplan2.jpg" {...register('floorPlans')} />
      </div>

      {/* Agent ID */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Agent ID</label>
        <Input placeholder="Agent UUID" {...register('agentId')} />
        {errors.agentId && <p className="text-sm text-red-600">{errors.agentId.message}</p>}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
