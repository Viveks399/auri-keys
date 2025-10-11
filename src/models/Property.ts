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
    transactionType: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: {
        values: ["buy", "rent"],
        message: "{VALUE} is not a valid transaction type",
      },
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: {
        values: [
          "house",
          "apartment",
          "penthouse",
          "plot",
          "villa",
          "land",
          "townhouse",
          "duplex",
        ],
        message: "{VALUE} is not a valid property type",
      },
    },
    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
      min: [0, "Beds must be a positive number"],
    },
    baths: {
      type: Number,
      required: [true, "Number of baths is required"],
      min: [0, "Baths must be a positive number"],
    },
    size: {
      type: Number,
      required: [true, "Size in sq.ft is required"],
      min: [0, "Size must be a positive number"],
    },
    furnishingStatus: {
      type: String,
      required: [true, "Furnishing status is required"],
      enum: {
        values: ["furnished", "semi-furnished", "non-furnished"],
        message: "{VALUE} is not a valid furnishing status",
      },
    },
    propertyFeatures: {
      type: [String],
      default: [],
      validate: {
        validator: function (features: string[]) {
          const validFeatures = [
            "Private Pool",
            "Upgraded",
            "Large Plot",
            "Close to Park",
            "Brand New",
            "Vacant on Transfer",
            "Waterviews",
            "Golf Course View",
            "Balcony",
            "Garden",
            "Maid Room",
            "Beach Access",
            "Gym",
          ];
          return features.every((feature) => validFeatures.includes(feature));
        },
        message: "Invalid property feature",
      },
    },
    seller: {
      name: {
        type: String,
        required: [true, "Seller name is required"],
        trim: true,
      },
      job: {
        type: String,
        required: [true, "Seller job is required"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Seller phone is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Seller email is required"],
        trim: true,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please provide a valid email address",
        ],
      },
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
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
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
    yearBuilt: {
      type: Number,
      min: [1800, "Year built must be valid"],
      max: [new Date().getFullYear() + 1, "Year built cannot be in the future"],
    },
    lotSize: {
      type: Number,
      min: [0, "Lot size must be a positive number"],
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
PropertySchema.index({ transactionType: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ featured: 1 });
PropertySchema.index({ beds: 1 });
PropertySchema.index({ baths: 1 });
PropertySchema.index({ furnishingStatus: 1 });

// Create the model or use existing one (important for Next.js hot reloading)
const PropertyModel: Model<Property> =
  mongoose.models.Property ||
  mongoose.model<Property>("Property", PropertySchema);

export default PropertyModel;
