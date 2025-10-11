import { NextRequest, NextResponse } from "next/server";
import { propertyStore } from "@/lib/propertyStore";
import { UpdatePropertyDTO, ApiResponse, Property } from "@/types/property";
import { authenticateAdmin, unauthorizedResponse } from "@/lib/authMiddleware";

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
    const body: UpdatePropertyDTO = await request.json();

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
    const deleted = await propertyStore.delete(id);

    if (!deleted) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Property not found",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<never> = {
      success: true,
      message: "Property deleted successfully",
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
