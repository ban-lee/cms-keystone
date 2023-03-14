import * as dotenv from 'dotenv';

dotenv.config();

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.CLOUDINARY_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
};
