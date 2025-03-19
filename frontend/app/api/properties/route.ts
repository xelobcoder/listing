import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToFileSystem } from '../../../lib/uploadImage';
import connection from '../../../lib/knex';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const propertyId = uuidv4();
    const now = new Date();
    
    const [property] = await connection('properties')
      .insert({
        id: propertyId,
        title: formData.get('title'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        property_type: formData.get('propertyType'),
        bedrooms: Number(formData.get('bedrooms')),
        bathrooms: Number(formData.get('bathrooms')),
        square_feet: Number(formData.get('squareFeet')),
        lot_size: Number(formData.get('lotSize')),
        year_built: Number(formData.get('yearBuilt')),
        status: formData.get('status'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        postal_code: formData.get('postalCode'),
        country: formData.get('country'),
        latitude: Number(formData.get('latitude') || 0),
        longitude: Number(formData.get('longitude') || 0),
        has_garage: formData.get('hasGarage') === 'true',
        has_pool: formData.get('hasPool') === 'true',
        has_basement: formData.get('hasBasement') === 'true',
        has_fireplace: formData.get('hasFireplace') === 'true',
        parking_spaces: Number(formData.get('parkingSpaces') || 0),
        heating_type: formData.get('heatingType'),
        cooling_type: formData.get('coolingType'),
        video_url: formData.get('videoUrl'),
        floor_plans: formData.get('floorPlans') || '[]',
        agent_id: formData.get('agentId'),
        created_at: now,
        updated_at: now
      })
      .returning('*');

    const uploadedImageUrls: string[] = [];
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('image_') && value instanceof File) {
        const imageUrl = await uploadImageToFileSystem(value, propertyId);
        if (imageUrl) {
          uploadedImageUrls.push(imageUrl);
        }
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      property: {
        ...property,
        imageUrls: uploadedImageUrls
      }
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
    
    // Pagination parameters
    const page = Number(searchParams.get('page') || '1');
    const count = Number(searchParams.get('count') || '10');
    
    // Calculate offset
    const offset = (page - 1) * count;
    
    // Build the base query
    let query = connection('properties').select('*');
    
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
    
    // Get total count for pagination
    const totalCount = await connection('properties')
      .count('* as count')
      .where(function() {
        if (propertyType) this.where('property_type', propertyType);
        if (minPrice !== undefined) this.where('price', '>=', minPrice);
        if (maxPrice !== undefined) this.where('price', '<=', maxPrice);
        if (city) this.whereRaw('LOWER(city) LIKE ?', [`%${city.toLowerCase()}%`]);
      })
      .first();
    
    const total = totalCount ? Number(totalCount.count) : 0;
    
    // Apply pagination to the main query
    const properties = await query
      .orderBy('created_at', 'desc')
      .limit(count)
      .offset(offset);
    
    const formattedProperties = properties.map(property => {
      let imageUrls = [];
      let floorPlans = [];
      
      try {
        imageUrls = typeof property.image_urls === 'string' 
          ? JSON.parse(property.image_urls) 
          : property.image_urls || [];
      } catch (e) {
        console.error('Error parsing image URLs:', property.image_urls);
        imageUrls = Array.isArray(property.image_urls) 
          ? property.image_urls 
          : [property.image_urls].filter(Boolean);
      }
      
      try {
        floorPlans = typeof property.floor_plans === 'string'
          ? JSON.parse(property.floor_plans)
          : property.floor_plans || [];
      } catch (e) {
        console.error('Error parsing floor plans:', property.floor_plans);
        floorPlans = [];
      }

      return {
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
        imageUrls,
        videoUrl: property.video_url,
        floorPlans,
        agentId: property.agent_id,
        createdAt: property.created_at,
        updatedAt: property.updated_at
      };
    });
    
    return NextResponse.json({ 
      properties: formattedProperties,
      pagination: {
        total,
        page,
        count,
        totalPages: Math.ceil(total / count)
      }
    });
    
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch properties' 
    }, { status: 500 });
  }
}