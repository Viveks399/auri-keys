/**
 * Property Constants
 * Valid values for property fields
 */

export const TRANSACTION_TYPES = ["buy", "rent"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const PROPERTY_TYPES = [
  "house",
  "apartment",
  "penthouse",
  "plot",
  "villa",
  "land",
  "townhouse",
  "duplex",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const FURNISHING_STATUS = [
  "furnished",
  "semi-furnished",
  "non-furnished",
] as const;
export type FurnishingStatus = (typeof FURNISHING_STATUS)[number];

export const PROPERTY_FEATURES = [
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
] as const;
export type PropertyFeature = (typeof PROPERTY_FEATURES)[number];

export const PROPERTY_STATUS = ["available", "pending", "sold"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUS)[number];

/**
 * Example property creation payload
 */
export const EXAMPLE_PROPERTY = {
  title: "Luxury Villa in Dubai Marina",
  description: "Beautiful 5-bedroom villa with stunning views",
  price: 5000000,
  transactionType: "buy" as TransactionType,
  propertyType: "villa" as PropertyType,
  beds: 5,
  baths: 6,
  size: 4500,
  furnishingStatus: "furnished" as FurnishingStatus,
  propertyFeatures: [
    "Private Pool",
    "Beach Access",
    "Gym",
    "Balcony",
  ] as PropertyFeature[],
  seller: {
    name: "Ahmed Al-Mansouri",
    job: "Senior Property Consultant",
    phone: "+971-50-123-4567",
    email: "ahmed.almansouri@aurikeys.com",
  },
  location: {
    address: "123 Marina Walk",
    city: "Dubai",
    state: "Dubai",
    zipCode: "12345",
    country: "UAE",
  },
  amenities: ["24/7 Security", "Parking", "Concierge"],
  images: [],
  status: "available" as PropertyStatus,
  featured: true,
  yearBuilt: 2023,
  lotSize: 5000,
};
