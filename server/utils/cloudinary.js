// Import dotenv from dotenv.
import dotenv from "dotenv";
// Import cloudinary from cloudinary.
import { v2 as cloudinary } from "cloudinary";
// Configure dotenv.
dotenv.config();
// Configure cloudinary with the environment variables.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Export the uploadToCloudinary function to upload files to Cloudinary.
export const uploadToCloudinary = async (file) => {
  console.log("File received in uploadToCloudinary:", file);
  try {
    // Call createReadStream on the file object to get the stream.
    const stream = file.createReadStream();

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.pipe(uploadStream); // Pipe the file stream to the Cloudinary upload stream.
    });
    // Return the secure URL of the uploaded file.
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};
