import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";
import { JWTPayload } from "@/types/admin";

export interface AuthenticatedRequest extends NextRequest {
  admin?: JWTPayload;
}

// Middleware to verify JWT token and authenticate admin
export async function authenticateAdmin(
  request: NextRequest
): Promise<{ authenticated: boolean; admin?: JWTPayload; error?: string }> {
  try {
    // Get Authorization header
    const authHeader = request.headers.get("Authorization");

    // Extract token
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return {
        authenticated: false,
        error:
          "No token provided. Please include Authorization header with Bearer token",
      };
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        authenticated: false,
        error: "Invalid or expired token",
      };
    }

    return {
      authenticated: true,
      admin: decoded,
    };
  } catch (error) {
    return {
      authenticated: false,
      error: "Authentication failed",
    };
  }
}

// Helper function to send unauthorized response
export function unauthorizedResponse(message?: string) {
  return NextResponse.json(
    {
      success: false,
      error: message || "Unauthorized. Please login to access this resource.",
    },
    { status: 401 }
  );
}

// Helper function to check if admin has required role
export function hasRequiredRole(
  admin: JWTPayload,
  requiredRoles: ("admin" | "superadmin")[]
): boolean {
  return requiredRoles.includes(admin.role);
}
