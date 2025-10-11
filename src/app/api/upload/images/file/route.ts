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
 * POST /api/upload/images/file - Upload images directly from device (multipart/form-data)
 * Protected endpoint - requires admin authentication
 *
 * Form fields:
 * - file: Single file (for single upload)
 * - files: Multiple files (for multiple uploads)
 * - folder: Optional folder name (default: "properties")
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const formData = await request.formData();
    const folder = (formData.get("folder") as string) || "properties";

    // Get single file or multiple files
    const file = formData.get("file") as File | null;
    const files = formData.getAll("files") as File[];

    // Validate request
    if (!file && files.length === 0) {
      const response: UploadResponse = {
        success: false,
        error:
          "No file(s) provided. Include 'file' for single upload or 'files' for multiple uploads",
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (file && files.length > 0) {
      const response: UploadResponse = {
        success: false,
        error: "Cannot upload both single 'file' and 'files' array. Choose one",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Handle single file upload
    if (file) {
      // Validate file is an image
      if (!file.type.startsWith("image/")) {
        const response: UploadResponse = {
          success: false,
          error: `Invalid file type: ${file.type}. Only image files are allowed.`,
        };
        return NextResponse.json(response, { status: 400 });
      }

      // Convert file to base64
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64Image}`;

      // Upload to Cloudinary
      const result = await uploadImage(dataUri, folder);
      const response: UploadResponse = {
        success: true,
        data: result,
        message: "Image uploaded successfully",
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Handle multiple files upload
    if (files.length > 0) {
      if (files.length > 10) {
        const response: UploadResponse = {
          success: false,
          error: "Cannot upload more than 10 images at once",
        };
        return NextResponse.json(response, { status: 400 });
      }

      // Validate all files are images
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          const response: UploadResponse = {
            success: false,
            error: `Invalid file type: ${file.type}. Only image files are allowed.`,
          };
          return NextResponse.json(response, { status: 400 });
        }
      }

      // Convert all files to base64
      const base64Images: string[] = [];
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");
        const dataUri = `data:${file.type};base64,${base64Image}`;
        base64Images.push(dataUri);
      }

      // Upload to Cloudinary
      const results = await uploadMultipleImages(base64Images, folder);
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
    console.error("Error in file upload:", error);
    const response: UploadResponse = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to upload file(s)",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
