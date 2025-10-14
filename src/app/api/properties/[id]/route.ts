import { NextRequest, NextResponse } from "next/server";
import { propertyStore } from "@/lib/propertyStore";
import { UpdatePropertyDTO, ApiResponse, Property } from "@/types/property";
import { authenticateAdmin, unauthorizedResponse } from "@/lib/authMiddleware";
import {
  uploadImage,
  deleteMultipleImages,
  extractPublicId,
} from "@/lib/cloudinary";

// GET /api/properties/[id] - Get a single property by ID (Protected - Requires Authentication)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const property = await propertyStore.getById(id);

    if (!property) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Property not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Property> = {
      success: true,
      data: property,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch property",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PUT /api/properties/[id] - Update a property (Protected - Requires Authentication)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;

    // Get the existing property to track image changes
    const existingProperty = await propertyStore.getById(id);
    if (!existingProperty) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Property not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const contentType = request.headers.get("content-type") || "";
    let body: UpdatePropertyDTO;
    let newImageUrls: string[] = [];

    // Handle both form-data (with files) and JSON requests
    if (contentType.includes("multipart/form-data")) {
      // Handle form data with file uploads
      const formData = await request.formData();

      // Parse property data from form field
      const propertyDataField = formData.get("propertyData");
      if (!propertyDataField) {
        const response: ApiResponse<never> = {
          success: false,
          error:
            "Missing propertyData field. Send property details as JSON string in 'propertyData' field",
        };
        return NextResponse.json(response, { status: 400 });
      }

      try {
        body = JSON.parse(propertyDataField.toString());
      } catch (parseError) {
        const response: ApiResponse<never> = {
          success: false,
          error: "Invalid JSON in propertyData field",
        };
        return NextResponse.json(response, { status: 400 });
      }

      // Handle new file uploads
      const files: File[] = [];
      formData.forEach((value, key) => {
        if (key === "images" && value instanceof File) {
          files.push(value);
        }
      });

      // Upload new images to Cloudinary
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const base64Image = `data:${file.type};base64,${buffer.toString(
            "base64"
          )}`;

          return uploadImage(base64Image, "properties");
        });

        const uploadResults = await Promise.all(uploadPromises);
        newImageUrls = uploadResults.map(
          (result: { url: string; publicId: string }) => result.url
        );
      }

      // Merge existing images with new images
      const existingImages = Array.isArray(body.images) ? body.images : [];
      body.images = [...existingImages, ...newImageUrls];
    } else {
      // Handle regular JSON request
      body = await request.json();
    }

    // Handle image deletion - find images that were removed
    const existingImageUrls = existingProperty.images || [];
    const newImageUrlsFromBody = Array.isArray(body.images) ? body.images : [];

    // Find images that were removed (exist in old but not in new)
    const removedImages = existingImageUrls.filter(
      (url) => !newImageUrlsFromBody.includes(url)
    );

    // Delete removed images from Cloudinary
    if (removedImages.length > 0) {
      try {
        const publicIdsToDelete = removedImages
          .map((url) => extractPublicId(url))
          .filter((id): id is string => id !== null);

        if (publicIdsToDelete.length > 0) {
          await deleteMultipleImages(publicIdsToDelete);
          console.log(
            `Deleted ${publicIdsToDelete.length} images from Cloudinary`
          );
        }
      } catch (deleteError) {
        console.error("Error deleting images from Cloudinary:", deleteError);
        // Continue with the update even if image deletion fails
      }
    }

    // Validate price if provided
    if (body.price !== undefined && body.price <= 0) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Price must be greater than 0",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const updatedProperty = await propertyStore.update(id, body);

    if (!updatedProperty) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Property not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Property> = {
      success: true,
      data: updatedProperty,
      message: "Property updated successfully",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update property",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PATCH /api/properties/[id] - Partial update a property
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Same as PUT for partial updates
  return PUT(request, { params });
}

// DELETE /api/properties/[id] - Delete a property (Protected - Requires Authentication)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;

    // Get the property first to access its images
    const property = await propertyStore.getById(id);
    if (!property) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Property not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Delete all images from Cloudinary before deleting the property
    const imageUrls = property.images || [];
    if (imageUrls.length > 0) {
      try {
        const publicIdsToDelete = imageUrls
          .map((url) => extractPublicId(url))
          .filter((id): id is string => id !== null);

        if (publicIdsToDelete.length > 0) {
          await deleteMultipleImages(publicIdsToDelete);
          console.log(
            `Deleted ${publicIdsToDelete.length} images from Cloudinary for property ${id}`
          );
        }
      } catch (deleteError) {
        console.error("Error deleting images from Cloudinary:", deleteError);
        // Continue with property deletion even if image deletion fails
      }
    }

    // Delete the property from database
    const deleted = await propertyStore.delete(id);

    if (!deleted) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Failed to delete property from database",
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<never> = {
      success: true,
      message: "Property and associated images deleted successfully",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete property",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
