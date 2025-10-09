import { NextRequest, NextResponse } from "next/server";
import { propertyStore } from "@/lib/propertyStore";
import { CreatePropertyDTO, ApiResponse, Property } from "@/types/property";
import { authenticateAdmin, unauthorizedResponse } from "@/lib/authMiddleware";

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

// POST /api/properties - Create a new property (Protected - Requires Authentication)
export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = await authenticateAdmin(request);
    if (!authResult.authenticated) {
      return unauthorizedResponse(authResult.error);
    }

    const body: CreatePropertyDTO = await request.json();

    // Basic validation
    if (!body.title || !body.price || !body.location || !body.features) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Missing required fields: title, price, location, features",
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

    const newProperty = await propertyStore.create(body);

    const response: ApiResponse<Property> = {
      success: true,
      data: newProperty,
      message: "Property created successfully",
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
