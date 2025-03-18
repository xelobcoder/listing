import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Ensure the upload directory exists
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'properties');

// Create a function to ensure the upload directory exists
async function ensureUploadDirExists() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function uploadImageToFileSystem(file: File): Promise<string | null> {
  try {
    await ensureUploadDirExists();
    
    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    // Convert file to buffer and save to filesystem
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // Return the public URL path
    return `/uploads/properties/${fileName}`;
  } catch (error) {
    console.error('Error uploading image to file system:', error);
    return null;
  }
}