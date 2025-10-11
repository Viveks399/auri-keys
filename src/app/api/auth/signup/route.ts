import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/Admin";
import { AdminSignupDTO, AuthResponse } from "@/types/admin";
import { hashPassword, generateToken } from "@/lib/auth";

// POST /api/auth/signup - Register new admin
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body: AdminSignupDTO = await request.json();

    // Validate required fields
    if (!body.email || !body.password || !body.name) {
      const response: AuthResponse = {
        success: false,
        error: "Email, password, and name are required",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate password length
    if (body.password.length < 6) {
      const response: AuthResponse = {
        success: false,
        error: "Password must be at least 6 characters long",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: body.email });
    if (existingAdmin) {
      const response: AuthResponse = {
        success: false,
        error: "An admin with this email already exists",
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password);

    // Create new admin
    const newAdmin = await AdminModel.create({
      email: body.email,
      password: hashedPassword,
      name: body.name,
      role: body.role || "admin",
      isActive: true,
    });

    // Generate JWT token
    const token = generateToken({
      adminId: newAdmin._id.toString(),
      email: newAdmin.email,
      role: newAdmin.role,
    });

    // Return admin data without password
    const adminData = {
      id: newAdmin._id.toString(),
      email: newAdmin.email,
      name: newAdmin.name,
      role: newAdmin.role,
      isActive: newAdmin.isActive,
      createdAt: newAdmin.createdAt?.toString() || new Date().toISOString(),
      updatedAt: newAdmin.updatedAt?.toString() || new Date().toISOString(),
    };

    const response: AuthResponse = {
      success: true,
      token,
      admin: adminData,
      message: "Admin account created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    const response: AuthResponse = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create admin account",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
