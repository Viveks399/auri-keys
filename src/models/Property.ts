import mongoose, { Schema, Model } from "mongoose";
import { Property } from "@/types/property";

// Mongoose schema definition
const PropertySchema = new Schema<Property>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      zipCode: {
        type: String,
        required: [true, "Zip code is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
    },
    features: {
      bedrooms: {
        type: Number,
        required: [true, "Number of bedrooms is required"],
        min: [0, "Bedrooms must be a positive number"],
      },
      bathrooms: {
        type: Number,
        required: [true, "Number of bathrooms is required"],
        min: [0, "Bathrooms must be a positive number"],
      },
      squareFeet: {
        type: Number,
        required: [true, "Square feet is required"],
        min: [0, "Square feet must be a positive number"],
      },
      lotSize: {
        type: Number,
        min: [0, "Lot size must be a positive number"],
      },
      yearBuilt: {
        type: Number,
        min: [1800, "Year built must be valid"],
        max: [
          new Date().getFullYear() + 1,
          "Year built cannot be in the future",
        ],
      },
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: {
        values: [
          "house",
          "apartment",
          "condo",
          "townhouse",
          "villa",
          "land",
          "commercial",
        ],
        message: "{VALUE} is not a valid property type",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["available", "pending", "sold"],
        message: "{VALUE} is not a valid status",
      },
      default: "available",
    },
    listingDate: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Add indexes for better query performance
PropertySchema.index({ "location.city": 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ propertyType: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ featured: 1 });

// Create the model or use existing one (important for Next.js hot reloading)
const PropertyModel: Model<Property> =
  mongoose.models.Property ||
  mongoose.model<Property>("Property", PropertySchema);

export default PropertyModel;
