import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToFileSystem } from '../../../lib/uploadImage';
import connection from '@/lib/knex';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract basic property data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const propertyType = formData.get('propertyType') as string;
    const bedrooms = Number(formData.get('bedrooms'));
    const bathrooms = Number(formData.get('bathrooms'));
    const squareFeet = Number(formData.get('squareFeet'));
    const lotSize = Number(formData.get('lotSize'));
    const yearBuilt = Number(formData.get('yearBuilt'));
    const status = formData.get('status') as string;
    
    // Extract location data
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const postalCode = formData.get('postalCode') as string;
    const country = formData.get('country') as string;
    const latitude = Number(formData.get('latitude') || 0);
    const longitude = Number(formData.get('longitude') || 0);
    
    // Extract features
    const hasGarage = formData.get('hasGarage') === 'true';
    const hasPool = formData.get('hasPool') === 'true';
    const hasBasement = formData.get('hasBasement') === 'true';
    const hasFireplace = formData.get('hasFireplace') === 'true';
    const parkingSpaces = Number(formData.get('parkingSpaces') || 0);
    const heatingType = formData.get('heatingType') as string;
    const coolingType = formData.get('coolingType') as string;
    
    // Extract media URLs
    const imageUrlsJson = formData.get('imageUrls') as string;
    const imageUrls = imageUrlsJson ? JSON.parse(imageUrlsJson) : [];
    const videoUrl = formData.get('videoUrl') as string;
    const floorPlansJson = formData.get('floorPlans') as string;
    const floorPlans = floorPlansJson ? JSON.parse(floorPlansJson) : [];
    
    // Extract agent ID
    const agentId = formData.get('agentId') as string;
    
    // Handle image uploads
    const uploadedImageUrls: string[] = [];
    
    // Find all image files in the form data
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('image_') && value instanceof File) {
        const imageUrl = await uploadImageToFileSystem(value);
        if (imageUrl) {
          uploadedImageUrls.push(imageUrl);
        }
      }
    }
    
    // Combine uploaded images with provided image URLs
    const allImageUrls = [...uploadedImageUrls, ...imageUrls];
    
    // Create property ID
    const propertyId = uuidv4();
    
    // Create property in database using Knex
    const [property] = await connection('properties')
      .insert({
        id: propertyId,
        title,
        description,
        price,
        property_type: propertyType,
        bedrooms,
        bathrooms,
        square_feet: squareFeet,
        lot_size: lotSize,
        year_built: yearBuilt,
        status,
        address,
        city,
        state,
        postal_code: postalCode,
        country,
        latitude,
        longitude,
        has_garage: hasGarage,
        has_pool: hasPool,
        has_basement: hasBasement,
        has_fireplace: hasFireplace,
        parking_spaces: parkingSpaces,
        heating_type: heatingType,
        cooling_type: coolingType,
        image_urls: JSON.stringify(allImageUrls),
        video_url: videoUrl,
        floor_plans: JSON.stringify(floorPlans),
        agent_id: agentId,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');
    
    return NextResponse.json({ 
      success: true, 
      property 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create property listing' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyType = searchParams.get('propertyType');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const city = searchParams.get('city');
    
    // Build query with Knex
    let query = connection('properties').select('*').orderBy('created_at', 'desc');
    
    if (propertyType) {
      query = query.where('property_type', propertyType);
    }
    
    if (minPrice !== undefined) {
      query = query.where('price', '>=', minPrice);
    }
    
    if (maxPrice !== undefined) {
      query = query.where('price', '<=', maxPrice);
    }
    
    if (city) {
      query = query.whereRaw('LOWER(city) LIKE ?', [`%${city.toLowerCase()}%`]);
    }
    
    const properties = await query;
    
    // Transform snake_case to camelCase for frontend
    const formattedProperties = properties.map(property => ({
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      propertyType: property.property_type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.square_feet,
      lotSize: property.lot_size,
      yearBuilt: property.year_built,
      status: property.status,
      address: property.address,
      city: property.city,
      state: property.state,
      postalCode: property.postal_code,
      country: property.country,
      latitude: property.latitude,
      longitude: property.longitude,
      hasGarage: property.has_garage,
      hasPool: property.has_pool,
      hasBasement: property.has_basement,
      hasFireplace: property.has_fireplace,
      parkingSpaces: property.parking_spaces,
      heatingType: property.heating_type,
      coolingType: property.cooling_type,
      imageUrls: JSON.parse(property.image_urls || '[]'),
      videoUrl: property.video_url,
      floorPlans: JSON.parse(property.floor_plans || '[]'),
      agentId: property.agent_id,
      createdAt: property.created_at,
      updatedAt: property.updated_at
    }));
    
    return NextResponse.json({ properties: formattedProperties });
    
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch properties' 
    }, { status: 500 });
  }
}