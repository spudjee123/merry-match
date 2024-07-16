import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import path from 'path';
import fs from 'fs';

// dotenv.config();

cloudinary.v2.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_KEY,
  // api_secret: process.env.CLOUD_KEY_SECRET,
  cloud_name: "doybu3uxs",
  api_key: "618891563426527",
  api_secret: "0Cx7qKP4JvbRXiCrjLnBoGDTPwI",
});

const imgIcon = [
  path.join(path.resolve(), 'client/src/assets/icons/basic.png'),
  path.join(path.resolve(), 'client/src/assets/icons/platinum.png'),
  path.join(path.resolve(), 'client/src/assets/icons/premium.png'),
];

(async function run() {
  for (const img of imgIcon) {
    if (!fs.existsSync(img)) {
      console.error(`File not found: ${img}`);
      continue;
    }
    try {
      const result = await cloudinary.v2.uploader.upload(img);
      console.log(`Uploaded ${img} to ${result.secure_url}`);
    } catch (error) {
      console.error(`Failed to upload ${img}:`, error.message);
    }
  }
})();





export default cloudinary;
