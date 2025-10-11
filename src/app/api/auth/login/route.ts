import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/Admin";
import { AdminLoginDTO, AuthResponse } from "@/types/admin";
import { verifyPassword, generateToken } from "@/lib/auth";

// POST /api/auth/login - Admin login
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body: AdminLoginDTO = await request.json();

    // Validate required fields
    if (!body.email || !body.password) {
      const response: AuthResponse = {
        success: false,
        error: "Email and password are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find admin by email
    const admin = await AdminModel.findOne({ email: body.email });
    if (!admin) {
      const response: AuthResponse = {
        success: false,
        error: "Invalid email or password",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Check if admin is active
    if (!admin.isActive) {
      const response: AuthResponse = {
        success: false,
        error: "Your account has been deactivated. Please contact support.",
      };
      return NextResponse.json(response, { status: 403 });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(body.password, admin.password);
    if (!isPasswordValid) {
      const response: AuthResponse = {
        success: false,
        error: "Invalid email or password",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    // Return admin data without password
    const adminData = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
      isActive: admin.isActive,
      createdAt: admin.createdAt?.toString() || new Date().toISOString(),
      updatedAt: admin.updatedAt?.toString() || new Date().toISOString(),
    };

    const response: AuthResponse = {
      success: true,
      token,
      admin: adminData,
      message: "Login successful",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    const response: AuthResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to login",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
