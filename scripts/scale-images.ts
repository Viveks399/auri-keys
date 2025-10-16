import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

// Load environment variables from multiple sources
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

// Function to configure Cloudinary with validation
function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("❌ Missing Cloudinary environment variables!");
    console.error("\nPlease set up your Cloudinary credentials:");
    console.error("1. Create a .env.local file in your project root");
    console.error("2. Add the following variables:");
    console.error("   CLOUDINARY_CLOUD_NAME=dtqamrldv");
    console.error("   CLOUDINARY_API_KEY=your_api_key");
    console.error("   CLOUDINARY_API_SECRET=your_api_secret");
    console.error("\nOr set them as environment variables:");
    console.error("   $env:CLOUDINARY_CLOUD_NAME='dtqamrldv'");
    console.error("   $env:CLOUDINARY_API_KEY='your_api_key'");
    console.error("   $env:CLOUDINARY_API_SECRET='your_api_secret'");
    console.error(
      "\nGet your credentials from: https://console.cloudinary.com/"
    );
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  console.log(`✅ Cloudinary configured with cloud: ${cloudName}`);
}

// Configure Cloudinary
configureCloudinary();

interface ImageScaleOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
}

interface ScaleImageResult {
  originalUrl: string;
  scaledUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Scale down an image using Cloudinary transformations
 * @param imageUrl - The Cloudinary image URL or public ID
 * @param options - Transformation options
 * @returns Promise<ScaleImageResult>
 */
export async function scaleImage(
  imageUrl: string,
  options: ImageScaleOptions = {}
): Promise<ScaleImageResult> {
  const {
    width = 1000,
    height,
    quality = "auto",
    format = "auto",
    crop = "scale",
  } = options;

  try {
    // Extract public ID from URL if it's a full Cloudinary URL
    let publicId = imageUrl;
    if (imageUrl.includes("cloudinary.com")) {
      const urlParts = imageUrl.split("/");
      const uploadIndex = urlParts.findIndex((part) => part === "upload");
      if (uploadIndex !== -1 && uploadIndex + 1 < urlParts.length) {
        publicId = urlParts
          .slice(uploadIndex + 2)
          .join("/")
          .split(".")[0];
      }
    }

    // Build transformation options
    const transformations: any = {};

    if (width) transformations.width = width;
    if (height) transformations.height = height;
    if (quality) transformations.quality = quality;
    if (format) transformations.fetch_format = format;
    if (crop) transformations.crop = crop;

    // Generate the scaled image URL
    const scaledUrl = cloudinary.url(publicId, {
      transformation: [transformations],
    });

    // Get image details
    const imageDetails = await cloudinary.api.resource(publicId);

    return {
      originalUrl: imageUrl,
      scaledUrl,
      publicId,
      width: imageDetails.width,
      height: imageDetails.height,
      format: imageDetails.format,
      bytes: imageDetails.bytes,
    };
  } catch (error) {
    console.error("Error scaling image:", error);
    throw new Error(
      `Failed to scale image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Scale multiple images at once
 * @param imageUrls - Array of image URLs or public IDs
 * @param options - Transformation options
 * @returns Promise<ScaleImageResult[]>
 */
export async function scaleMultipleImages(
  imageUrls: string[],
  options: ImageScaleOptions = {}
): Promise<ScaleImageResult[]> {
  const results = await Promise.allSettled(
    imageUrls.map((url) => scaleImage(url, options))
  );

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      console.error(
        `Failed to scale image ${imageUrls[index]}:`,
        result.reason
      );
      throw new Error(
        `Failed to scale image ${imageUrls[index]}: ${result.reason}`
      );
    }
  });
}

/**
 * CLI function to scale images from command line
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: npm run scale-images <image-url-or-public-id> [options]

Options:
  --width <number>     Maximum width (default: 1000)
  --height <number>    Maximum height
  --quality <string>   Quality setting (default: auto)
  --format <string>    Output format (default: auto)
  --crop <string>      Crop mode (default: scale)
  --cloud-name <string> Cloudinary cloud name (overrides env)
  --api-key <string>   Cloudinary API key (overrides env)
  --api-secret <string> Cloudinary API secret (overrides env)

Examples:
  npm run scale-images "sample-image.jpg"
  npm run scale-images "sample-image.jpg" --width 800 --quality 80
  npm run scale-images "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sample-image.jpg"
  
Environment Setup:
  Create a .env.local file with:
  CLOUDINARY_CLOUD_NAME=dtqamrldv
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
    `);
    process.exit(1);
  }

  const imageUrl = args[0];
  const options: ImageScaleOptions = {};

  // Parse command line options
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];

    switch (key) {
      case "--width":
        options.width = parseInt(value);
        break;
      case "--height":
        options.height = parseInt(value);
        break;
      case "--quality":
        options.quality = value;
        break;
      case "--format":
        options.format = value;
        break;
      case "--crop":
        options.crop = value;
        break;
      case "--cloud-name":
        process.env.CLOUDINARY_CLOUD_NAME = value;
        break;
      case "--api-key":
        process.env.CLOUDINARY_API_KEY = value;
        break;
      case "--api-secret":
        process.env.CLOUDINARY_API_SECRET = value;
        break;
    }
  }

  // Reconfigure Cloudinary if credentials were provided via command line
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log(
      `✅ Cloudinary reconfigured with cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`
    );
  }

  try {
    console.log("Scaling image...");
    const result = await scaleImage(imageUrl, options);

    console.log("\n✅ Image scaled successfully!");
    console.log("📊 Results:");
    console.log(`   Original URL: ${result.originalUrl}`);
    console.log(`   Scaled URL: ${result.scaledUrl}`);
    console.log(`   Dimensions: ${result.width}x${result.height}`);
    console.log(`   Format: ${result.format}`);
    console.log(`   Size: ${Math.round(result.bytes / 1024)}KB`);
  } catch (error) {
    console.error("❌ Error scaling image:", error);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main();
}

export default { scaleImage, scaleMultipleImages };
