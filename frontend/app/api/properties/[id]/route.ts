import connection from '@/lib/knex';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await connection('properties')
      .where('id', params.id)
      .first();
    
    if (!property) {
      return NextResponse.json({ 
        success: false, 
        error: 'Property not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ property });
    
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch property' 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    
    // Extract all the property data from formData
    // Similar to POST but for updating
    
    // Update property in database
    const [property] = await connection('properties')
      .where('id', params.id)
      .update({
        // All the updated fields
        // ...
        updated_at: new Date()
      })
      .returning('*');
    
    return NextResponse.json({ property });
    
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update property' 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connection('properties')
      .where('id', params.id)
      .delete();
    
    return NextResponse.json({ 
      success: true,
      message: 'Property deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete property' 
    }, { status: 500 });
  }
}