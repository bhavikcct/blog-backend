import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export { cloudinary };


export const extractPublicId = (url: string): string | null => {
    try {
      const parts = url.split('/');
      const filename = parts.pop();
      if (!filename) return null;
  
      const [publicId] = filename.split('.'); 
      const folder = parts.slice(parts.indexOf('upload') + 1).join('/'); 
  
      return `${folder}/${publicId}`; 
    } catch {
      return null;
    }
  };