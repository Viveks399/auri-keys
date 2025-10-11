// Property type definitions
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  transactionType: "buy" | "rent"; // NEW: Buy or Rent
  propertyType:
    | "house"
    | "apartment"
    | "penthouse"
    | "plot"
    | "villa"
    | "land"
    | "townhouse"
    | "duplex"; // UPDATED: Added penthouse, plot, duplex; removed condo, commercial
  beds: number; // NEW: Number of bedrooms
  baths: number; // NEW: Number of bathrooms
  size: number; // NEW: Size in sq.ft
  furnishingStatus: "furnished" | "semi-furnished" | "non-furnished"; // NEW: Furnishing status
  propertyFeatures: string[]; // NEW: Array of features like "Private Pool", "Upgraded", etc.
  seller: {
    // NEW: Seller information
    name: string;
    job: string;
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  amenities: string[]; // General amenities (keeping for backward compatibility)
  images: string[];
  status: "available" | "pending" | "sold";
  listingDate: string;
  featured?: boolean;
  yearBuilt?: number; // MOVED: From features to top level
  lotSize?: number; // MOVED: From features to top level
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyDTO {
  title: string;
  description: string;
  price: number;
  transactionType: "buy" | "rent"; // NEW: Buy or Rent
  propertyType:
    | "house"
    | "apartment"
    | "penthouse"
    | "plot"
    | "villa"
    | "land"
    | "townhouse"
    | "duplex"; // UPDATED: Added penthouse, plot, duplex
  beds: number; // NEW: Number of bedrooms
  baths: number; // NEW: Number of bathrooms
  size: number; // NEW: Size in sq.ft
  furnishingStatus: "furnished" | "semi-furnished" | "non-furnished"; // NEW: Furnishing status
  propertyFeatures: string[]; // NEW: Array of features
  seller: {
    // NEW: Seller information
    name: string;
    job: string;
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  amenities?: string[]; // Optional: General amenities
  images?: string[];
  status?: "available" | "pending" | "sold";
  featured?: boolean;
  yearBuilt?: number; // Optional: Year built
  lotSize?: number; // Optional: Lot size
}

export interface UpdatePropertyDTO {
  title?: string;
  description?: string;
  price?: number;
  transactionType?: "buy" | "rent";
  propertyType?:
    | "house"
    | "apartment"
    | "penthouse"
    | "plot"
    | "villa"
    | "land"
    | "townhouse"
    | "duplex";
  beds?: number;
  baths?: number;
  size?: number;
  furnishingStatus?: "furnished" | "semi-furnished" | "non-furnished";
  propertyFeatures?: string[];
  seller?: {
    name?: string;
    job?: string;
    phone?: string;
    email?: string;
  };
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  amenities?: string[];
  images?: string[];
  status?: "available" | "pending" | "sold";
  featured?: boolean;
  yearBuilt?: number;
  lotSize?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
