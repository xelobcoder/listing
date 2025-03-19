import * as z from 'zod';

export const propertySchema = z.object({
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
  videoUrl: z.string().url().optional(),
  floorPlans: z.array(z.string().url()).optional(),
  agentId: z.string().uuid().nonempty('Agent ID is required'),
  imageFiles: z.array(z.instanceof(File)).optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;