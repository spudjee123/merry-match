import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
// import fs from 'fs';

// file upload 3) Sending file upload request to Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

export default cloudinary;
