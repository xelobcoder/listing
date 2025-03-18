'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NavigationMenuCustomUi from "@/components/customui/NavigationMenu"

// Define a schema that mirrors your table fields
const propertySchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string(),
  price: z.number().min(0, 'Price must be positive'),
  propertyType: z.enum(['HOUSE', 'APARTMENT', 'CONDO', 'LAND', 'TOWNHOUSE', 'MULTI_FAMILY', 'COMMERCIAL']),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  squareFeet: z.number().int().optional(),
  lotSize: z.number().int().optional(),
  yearBuilt: z.number().int().optional(),
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
  parkingSpaces: z.number().int().optional(),
  heatingType: z.enum(['NONE', 'GAS', 'ELECTRIC', 'WOOD', 'GEOTHERMAL', 'SOLAR']).default('NONE'),
  coolingType: z.enum(['NONE', 'CENTRAL_AIR', 'WINDOW_UNIT', 'EVAPORATIVE', 'GEOTHERMAL']).default('NONE'),
  imageUrls: z.array(z.string().url()).optional(),
  videoUrl: z.string().url().optional(),
  floorPlans: z.array(z.string().url()).optional(),
  agentId: z.string().uuid().nonempty('Agent ID is required'),
});

export default function PropertyForm() {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      propertyType: "HOUSE",
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 0,
      lotSize: 0,
      yearBuilt: 0,
      status: "PENDING",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      latitude: 0,
      longitude: 0,
      hasGarage: false,
      hasPool: false,
      hasBasement: false,
      hasFireplace: false,
      parkingSpaces: 0,
      heatingType: "NONE",
      coolingType: "NONE",
      imageUrls: [],
      videoUrl: "",
      floorPlans: [],
      agentId: "", // This should be populated with the current agent's ID
    },
  });

  function onSubmit(values: z.infer<typeof propertySchema>) {
    console.log(values);
  }

  // Update the form fields to match the schema
  return (
    <div>
      <NavigationMenuCustomUi />
      <div className="container mx-auto py-10 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Property Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Property title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Property price" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Property description..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Property Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Number of bedrooms" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Number of bathrooms" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="squareFeet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Square Feet</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Square footage" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="yearBuilt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Built</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Year built" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Location Information */}
                  <h3 className="text-lg font-semibold">Location</h3>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State/Province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal/ZIP code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="HOUSE">House</SelectItem>
                              <SelectItem value="APARTMENT">Apartment</SelectItem>
                              <SelectItem value="CONDO">Condo</SelectItem>
                              <SelectItem value="LAND">Land</SelectItem>
                              <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                              <SelectItem value="MULTI_FAMILY">Multi Family</SelectItem>
                              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="APPROVED">Approved</SelectItem>
                              <SelectItem value="REJECTED">Rejected</SelectItem>
                              <SelectItem value="AVAILABLE">Available</SelectItem>
                              <SelectItem value="SOLD">Sold</SelectItem>
                              <SelectItem value="OFF_MARKET">Off Market</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hasGarage"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Has Garage</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hasPool"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Has Pool</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hasBasement"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Has Basement</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hasFireplace"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Has Fireplace</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Systems */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Systems</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="heatingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heating Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select heating type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">None</SelectItem>
                                <SelectItem value="GAS">Gas</SelectItem>
                                <SelectItem value="ELECTRIC">Electric</SelectItem>
                                <SelectItem value="WOOD">Wood</SelectItem>
                                <SelectItem value="GEOTHERMAL">Geothermal</SelectItem>
                                <SelectItem value="SOLAR">Solar</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="coolingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cooling Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select cooling type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NONE">None</SelectItem>
                                <SelectItem value="CENTRAL_AIR">Central Air</SelectItem>
                                <SelectItem value="WINDOW_UNIT">Window Unit</SelectItem>
                                <SelectItem value="EVAPORATIVE">Evaporative</SelectItem>
                                <SelectItem value="GEOTHERMAL">Geothermal</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Media */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Media</h3>
                    <FormField
                      control={form.control}
                      name="imageUrls"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URLs (comma-separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                              value={field.value?.join(', ') || ''}
                              onChange={(e) => field.onChange(e.target.value ? e.target.value.split(',').map(url => url.trim()) : [])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/video.mp4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="floorPlans"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Floor Plans URLs (comma-separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/floor1.jpg, https://example.com/floor2.jpg"
                              value={field.value?.join(', ') || ''}
                              onChange={(e) => field.onChange(e.target.value ? e.target.value.split(',').map(url => url.trim()) : [])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">Create Listing</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
