import { writeFile, readdir } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'properties');

async function ensureUploadDirExists() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function uploadImageToFileSystem(file: File, listingId: string): Promise<string | null> {
  try {
    await ensureUploadDirExists();
    
    const fileExtension = file.name.split('.').pop();
    const imageQueue = await getNextImageQueue(listingId);
    const fileName = `${listingId}-${imageQueue}.${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    
    return `/uploads/properties/${fileName}`;
  } catch (error) {
    console.error('Error uploading image to file system:', error);
    return null;
  }
}

async function getNextImageQueue(listingId: string): Promise<number> {
  const files = await readdir(UPLOAD_DIR);
  const existingImages = files.filter(file => file.startsWith(listingId));
  return existingImages.length + 1;
}