import { NextRequest, NextResponse } from "next/server";
import { uploadImage, uploadMultipleImages } from "@/lib/cloudinary";
import { authenticateAdmin, unauthorizedResponse } from "@/lib/authMiddleware";

// Type for the upload response
interface UploadResponse {
  success: boolean;
  data?:
    | {
        url: string;
        publicId: string;
      }
    | {
        url: string;
        publicId: string;
      }[];
  error?: string;
  message?: string;
}

/**
 * POST /api/upload/images - Upload single or multiple images to Cloudinary
 * Protected endpoint - requires admin authentication
 *
 * Request body:
 * - For single image: { image: "base64_string", folder?: "optional_folder" }
 * - For multiple images: { images: ["base64_string1", "base64_string2"], folder?: "optional_folder" }
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const { image, images, folder } = body;

    // Validate request
    if (!image && !images) {
      const response: UploadResponse = {
        success: false,
        error:
          "No image(s) provided. Include 'image' for single upload or 'images' for multiple uploads",
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (image && images) {
      const response: UploadResponse = {
        success: false,
        error:
          "Cannot upload both single 'image' and 'images' array. Choose one",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Handle single image upload
    if (image) {
      if (typeof image !== "string") {
        const response: UploadResponse = {
          success: false,
          error: "Image must be a base64 encoded string",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const result = await uploadImage(image, folder);
      const response: UploadResponse = {
        success: true,
        data: result,
        message: "Image uploaded successfully",
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Handle multiple images upload
    if (images) {
      if (!Array.isArray(images)) {
        const response: UploadResponse = {
          success: false,
          error: "Images must be an array of base64 encoded strings",
        };
        return NextResponse.json(response, { status: 400 });
      }

      if (images.length === 0) {
        const response: UploadResponse = {
          success: false,
          error: "Images array cannot be empty",
        };
        return NextResponse.json(response, { status: 400 });
      }

      if (images.length > 10) {
        const response: UploadResponse = {
          success: false,
          error: "Cannot upload more than 10 images at once",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const results = await uploadMultipleImages(images, folder);
      const response: UploadResponse = {
        success: true,
        data: results,
        message: `${results.length} images uploaded successfully`,
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Should never reach here
    const response: UploadResponse = {
      success: false,
      error: "Invalid request",
    };
    return NextResponse.json(response, { status: 400 });
  } catch (error) {
    console.error("Error in image upload:", error);
    const response: UploadResponse = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to upload image(s)",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
