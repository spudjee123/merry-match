// import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
// import fs from 'fs';

// dotenv.config();


// file upload 3) Sending file upload request to Cloudinary
cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_KEY,
  // api_secret: process.env.CLOUD_KEY_SECRET,
  cloud_name: "doybu3uxs",
  api_key: "618891563426527",
  api_secret: "0Cx7qKP4JvbRXiCrjLnBoGDTPwI",
});

export default cloudinary;
