import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const imageId = request.nextUrl.searchParams.get('imageId');
    
    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const imagePath = path.join(process.cwd(), 'public', 'uploads', 'properties', imageId);
    
    try {
      const file = await fs.readFile(imagePath);
      const imageType = path.extname(imagePath).substring(1);
      
      return new NextResponse(file, {
        headers: {
          'Content-Type': `image/${imageType}`,
          'Content-Disposition': `inline; filename="${imageId}"`,
        },
      });
      
    } catch (error) {
      const placeholderPath = path.join(process.cwd(), 'public', 'placeholder-property.jpg');
      const placeholderFile = await fs.readFile(placeholderPath);
      
      return new NextResponse(placeholderFile, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': 'inline; filename="placeholder-property.jpg"',
        },
      });
    }
  } catch (error) {
    console.error('Error processing image request:', error);
    return NextResponse.json(
      { error: 'Failed to process image request' }, 
      { status: 500 }
    );
  }
}