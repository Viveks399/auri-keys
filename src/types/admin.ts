// Admin/User type definitions for authentication
export interface Admin {
  id: string;
  email: string;
  password: string; // Hashed password
  name: string;
  role: "admin" | "superadmin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSignupDTO {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "superadmin";
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  admin?: Omit<Admin, "password">; // Return admin data without password
  error?: string;
  message?: string;
}

export interface JWTPayload {
  adminId: string;
  email: string;
  role: "admin" | "superadmin";
}
