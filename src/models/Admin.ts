import mongoose, { Schema, Model } from "mongoose";
import { Admin } from "@/types/admin";

// Mongoose schema definition for Admin
const AdminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "superadmin"],
        message: "{VALUE} is not a valid role",
      },
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id.toString();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (ret as any)._id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (ret as any).__v;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (ret as any).password; // Never return password in JSON
        return ret;
      },
    },
  }
);

// Email index is automatically created by unique: true constraint

// Create the model or use existing one
const AdminModel: Model<Admin> =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", AdminSchema);

export default AdminModel;
