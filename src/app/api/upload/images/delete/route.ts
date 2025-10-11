import { NextRequest, NextResponse } from "next/server";
import {
  deleteImage,
  deleteMultipleImages,
  extractPublicId,
} from "@/lib/cloudinary";
import { authenticateAdmin, unauthorizedResponse } from "@/lib/authMiddleware";

// Type for the delete response
interface DeleteResponse {
  success: boolean;
  data?: {
    deleted: number;
    failed: number;
  };
  error?: string;
  message?: string;
}

/**
 * DELETE /api/upload/images/delete - Delete single or multiple images from Cloudinary
 * Protected endpoint - requires admin authentication
 *
 * Request body:
 * - For single image: { publicId: "image_public_id" } OR { url: "cloudinary_url" }
 * - For multiple images: { publicIds: ["id1", "id2"] } OR { urls: ["url1", "url2"] }
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const { publicId, publicIds, url, urls } = body;

    // Validate request
    if (!publicId && !publicIds && !url && !urls) {
      const response: DeleteResponse = {
        success: false,
        error:
          "No image identifier provided. Include 'publicId', 'publicIds', 'url', or 'urls'",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Handle single image deletion by publicId
    if (publicId) {
      if (typeof publicId !== "string") {
        const response: DeleteResponse = {
          success: false,
          error: "publicId must be a string",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const deleted = await deleteImage(publicId);
      const response: DeleteResponse = {
        success: deleted,
        message: deleted
          ? "Image deleted successfully"
          : "Failed to delete image",
      };
      return NextResponse.json(response, { status: deleted ? 200 : 500 });
    }

    // Handle single image deletion by URL
    if (url) {
      if (typeof url !== "string") {
        const response: DeleteResponse = {
          success: false,
          error: "url must be a string",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const extractedPublicId = extractPublicId(url);
      if (!extractedPublicId) {
        const response: DeleteResponse = {
          success: false,
          error:
            "Could not extract publicId from URL. Please provide publicId directly",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const deleted = await deleteImage(extractedPublicId);
      const response: DeleteResponse = {
        success: deleted,
        message: deleted
          ? "Image deleted successfully"
          : "Failed to delete image",
      };
      return NextResponse.json(response, { status: deleted ? 200 : 500 });
    }

    // Handle multiple images deletion by publicIds
    if (publicIds) {
      if (!Array.isArray(publicIds)) {
        const response: DeleteResponse = {
          success: false,
          error: "publicIds must be an array of strings",
        };
        return NextResponse.json(response, { status: 400 });
      }

      if (publicIds.length === 0) {
        const response: DeleteResponse = {
          success: false,
          error: "publicIds array cannot be empty",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const results = await deleteMultipleImages(publicIds);
      const deletedCount = results.filter((r) => r).length;
      const failedCount = results.length - deletedCount;

      const response: DeleteResponse = {
        success: failedCount === 0,
        data: {
          deleted: deletedCount,
          failed: failedCount,
        },
        message: `Deleted ${deletedCount} image(s)${
          failedCount > 0 ? `, failed to delete ${failedCount}` : ""
        }`,
      };
      return NextResponse.json(response, {
        status: failedCount === 0 ? 200 : 207,
      });
    }

    // Handle multiple images deletion by URLs
    if (urls) {
      if (!Array.isArray(urls)) {
        const response: DeleteResponse = {
          success: false,
          error: "urls must be an array of strings",
        };
        return NextResponse.json(response, { status: 400 });
      }

      if (urls.length === 0) {
        const response: DeleteResponse = {
          success: false,
          error: "urls array cannot be empty",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const extractedIds = urls
        .map((u) => extractPublicId(u))
        .filter((id): id is string => id !== null);

      if (extractedIds.length !== urls.length) {
        const response: DeleteResponse = {
          success: false,
          error:
            "Could not extract publicIds from all URLs. Some URLs may be invalid",
        };
        return NextResponse.json(response, { status: 400 });
      }

      const results = await deleteMultipleImages(extractedIds);
      const deletedCount = results.filter((r) => r).length;
      const failedCount = results.length - deletedCount;

      const response: DeleteResponse = {
        success: failedCount === 0,
        data: {
          deleted: deletedCount,
          failed: failedCount,
        },
        message: `Deleted ${deletedCount} image(s)${
          failedCount > 0 ? `, failed to delete ${failedCount}` : ""
        }`,
      };
      return NextResponse.json(response, {
        status: failedCount === 0 ? 200 : 207,
      });
    }

    // Should never reach here
    const response: DeleteResponse = {
      success: false,
      error: "Invalid request",
    };
    return NextResponse.json(response, { status: 400 });
  } catch (error) {
    console.error("Error in image deletion:", error);
    const response: DeleteResponse = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete image(s)",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
