import cloudinary from "./cloudinary.js";
import fs from "fs/promises";

const cloudinaryProfileUplaod = async (files) => {
  const fileURL = [];

  console.log(files);
  console.log("length is", Object.keys(files));
  if (!files.image?.length) {
    return fileURL;
  }

  for (let file of files.image) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "merry-match/profile-images",
      type: "private",
    });

    fileURL.push({
      url: result.secure_url,
      publicId: result.public_id,
    });

    await fs.unlink(file.path);
  }

  return fileURL;
};

export default cloudinaryProfileUplaod;
