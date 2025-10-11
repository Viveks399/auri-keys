import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param file - The base64 encoded image or file buffer
 * @param folder - Optional folder name in Cloudinary (default: 'properties')
 * @returns The uploaded image URL
 */
export async function uploadImage(
  file: string,
  folder: string = "properties"
): Promise<{ url: string; publicId: string }> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      transformation: [
        {
          width: 1920,
          height: 1080,
          crop: "limit",
          quality: "auto:good",
          fetch_format: "auto",
        },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error(
      `Failed to upload image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of base64 encoded images
 * @param folder - Optional folder name in Cloudinary
 * @returns Array of uploaded image URLs
 */
export async function uploadMultipleImages(
  files: string[],
  folder: string = "properties"
): Promise<{ url: string; publicId: string }[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error(
      `Failed to upload images: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Success status
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error(
      `Failed to delete image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param publicIds - Array of public IDs to delete
 * @returns Success status
 */
export async function deleteMultipleImages(
  publicIds: string[]
): Promise<boolean[]> {
  try {
    const deletePromises = publicIds.map((publicId) => deleteImage(publicId));
    return await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting multiple images:", error);
    throw new Error(
      `Failed to delete images: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - The Cloudinary image URL
 * @returns The public ID
 */
export function extractPublicId(url: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
}

export default cloudinary;
