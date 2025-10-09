// Property type definitions
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize?: number;
    yearBuilt?: number;
  };
  amenities: string[];
  images: string[];
  propertyType:
    | "house"
    | "apartment"
    | "condo"
    | "townhouse"
    | "villa"
    | "land"
    | "commercial";
  status: "available" | "pending" | "sold";
  listingDate: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyDTO {
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize?: number;
    yearBuilt?: number;
  };
  amenities: string[];
  images: string[];
  propertyType:
    | "house"
    | "apartment"
    | "condo"
    | "townhouse"
    | "villa"
    | "land"
    | "commercial";
  status?: "available" | "pending" | "sold";
  featured?: boolean;
}

export interface UpdatePropertyDTO {
  title?: string;
  description?: string;
  price?: number;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  features?: {
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    lotSize?: number;
    yearBuilt?: number;
  };
  amenities?: string[];
  images?: string[];
  propertyType?:
    | "house"
    | "apartment"
    | "condo"
    | "townhouse"
    | "villa"
    | "land"
    | "commercial";
  status?: "available" | "pending" | "sold";
  featured?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
