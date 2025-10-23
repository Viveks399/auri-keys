import { NextRequest, NextResponse } from "next/server";
import { propertyStore } from "@/lib/propertyStore";
import { CreatePropertyDTO, ApiResponse, Property } from "@/types/property";
import { authenticateAdmin, unauthorizedResponse } from "@/lib/authMiddleware";
import { uploadImage } from "@/lib/cloudinary";

// GET /api/properties - Get all properties or search with filters (Protected - Requires Authentication)
export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const { searchParams } = new URL(request.url);

    // Check if there are search filters
    const filters = {
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      city: searchParams.get("city") || undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      minBedrooms: searchParams.get("minBedrooms")
        ? Number(searchParams.get("minBedrooms"))
        : undefined,
      status: searchParams.get("status") || undefined,
    };

    // If any filters are provided, use search, otherwise get all
    const hasFilters = Object.values(filters).some(
      (value) => value !== undefined
    );
    const properties = hasFilters
      ? await propertyStore.search(filters)
      : await propertyStore.getAll();

    const response: ApiResponse<Property[]> = {
      success: true,
      data: properties,
      message: `Found ${properties.length} properties`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch properties",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/properties - Create a new property with optional image uploads (Protected - Requires Authentication)
export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const contentType = request.headers.get("content-type") || "";
    let body: CreatePropertyDTO;
    let imageUrls: string[] = [];

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
      } catch {
        const response: ApiResponse<never> = {
          success: false,
          error: "Invalid JSON in propertyData field",
        };
        return NextResponse.json(response, { status: 400 });
      }

      // Handle file uploads
      const files: File[] = [];
      formData.forEach((value, key) => {
        if (key === "images" && value instanceof File) {
          files.push(value);
        }
      });

      // Upload files to Cloudinary
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
        imageUrls = uploadResults.map(
          (result: { url: string; publicId: string }) => result.url
        );
      }
    } else {
      // Handle regular JSON request (backward compatibility)
      body = await request.json();
    }

    // Basic validation
    if (
      !body.title ||
      !body.price ||
      !body.location ||
      !body.transactionType ||
      !body.propertyType ||
      body.beds === undefined ||
      body.baths === undefined ||
      body.size === undefined ||
      !body.furnishingStatus ||
      !body.seller
    ) {
      const response: ApiResponse<never> = {
        success: false,
        error:
          "Missing required fields: title, price, location, transactionType, propertyType, beds, baths, size, furnishingStatus, seller",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate seller information
    if (
      !body.seller.name ||
      !body.seller.job ||
      !body.seller.phone ||
      !body.seller.email
    ) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Missing required seller fields: name, job, phone, email",
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (body.price <= 0) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Price must be greater than 0",
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (body.beds < 0 || body.baths < 0 || body.size <= 0) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Beds, baths, and size must be positive numbers",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Merge uploaded images with any images in the body
    const allImages = [...imageUrls, ...(body.images || [])];
    body.images = allImages;

    const newProperty = await propertyStore.create(body);

    const response: ApiResponse<Property> = {
      success: true,
      data: newProperty,
      message: `Property created successfully${
        imageUrls.length > 0
          ? ` with ${imageUrls.length} image(s) uploaded`
          : ""
      }`,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create property",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
