import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("❌ Please define MONGODB_URI in .env.local");
  process.exit(1);
}

// Property Schema (replicate from model)
const propertySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    features: {
      bedrooms: Number,
      bathrooms: Number,
      squareFeet: Number,
      lotSize: Number,
      yearBuilt: Number,
    },
    amenities: [String],
    images: [String],
    propertyType: String,
    status: String,
    listingDate: String,
    featured: Boolean,
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

const sampleProperties = [
  {
    title: "Luxury Beachfront Villa",
    description:
      "Stunning beachfront property with panoramic ocean views. This magnificent villa features modern architecture, high-end finishes, and direct beach access. Perfect for those seeking the ultimate coastal lifestyle.",
    price: 2500000,
    location: {
      address: "123 Ocean Drive",
      city: "Miami Beach",
      state: "FL",
      zipCode: "33139",
      country: "USA",
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      squareFeet: 4500,
      lotSize: 8000,
      yearBuilt: 2020,
    },
    amenities: [
      "Pool",
      "Beach Access",
      "Smart Home",
      "Garage",
      "Garden",
      "Ocean View",
      "Security System",
    ],
    images: ["/assets/images/auri-keys.jpeg"],
    propertyType: "villa",
    status: "available",
    listingDate: new Date().toISOString(),
    featured: true,
  },
  {
    title: "Modern Downtown Penthouse",
    description:
      "Elegant penthouse in the heart of the city with breathtaking skyline views. Features include floor-to-ceiling windows, gourmet kitchen, and access to world-class amenities.",
    price: 1800000,
    location: {
      address: "456 City Center Blvd",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 3200,
      yearBuilt: 2022,
    },
    amenities: [
      "Gym",
      "Concierge",
      "Rooftop Access",
      "Parking",
      "City View",
      "Wine Cellar",
    ],
    images: ["/assets/images/auri-keys-2.jpg"],
    propertyType: "apartment",
    status: "available",
    listingDate: new Date().toISOString(),
    featured: true,
  },
  {
    title: "Charming Suburban Family Home",
    description:
      "Beautiful 4-bedroom home in a quiet, family-friendly neighborhood. Features a spacious backyard, updated kitchen, and near top-rated schools.",
    price: 650000,
    location: {
      address: "789 Maple Street",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA",
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2800,
      lotSize: 7500,
      yearBuilt: 2015,
    },
    amenities: [
      "Backyard",
      "Garage",
      "Fireplace",
      "Updated Kitchen",
      "Hardwood Floors",
    ],
    images: ["/assets/images/auri-keys-bg.jpg"],
    propertyType: "house",
    status: "available",
    listingDate: new Date().toISOString(),
    featured: false,
  },
  {
    title: "Cozy Downtown Condo",
    description:
      "Perfect starter home or investment property. This modern condo features an open floor plan, stainless steel appliances, and is walking distance to shops and restaurants.",
    price: 425000,
    location: {
      address: "321 Urban Ave, Unit 5B",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA",
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      yearBuilt: 2018,
    },
    amenities: ["Gym", "Parking", "Storage", "Balcony"],
    images: ["/assets/images/mobile-bg.jpg"],
    propertyType: "condo",
    status: "pending",
    listingDate: new Date().toISOString(),
    featured: false,
  },
  {
    title: "Luxury Mountain Retreat",
    description:
      "Escape to this stunning mountain estate featuring timber frame construction, soaring ceilings, and panoramic mountain views. Perfect for year-round enjoyment.",
    price: 3200000,
    location: {
      address: "100 Summit Ridge",
      city: "Aspen",
      state: "CO",
      zipCode: "81611",
      country: "USA",
    },
    features: {
      bedrooms: 6,
      bathrooms: 5,
      squareFeet: 5500,
      lotSize: 12000,
      yearBuilt: 2019,
    },
    amenities: [
      "Hot Tub",
      "Ski-in/Ski-out",
      "Wine Cellar",
      "Home Theater",
      "Gym",
      "Guest House",
    ],
    images: ["/assets/images/auri-bg.jpg"],
    propertyType: "house",
    status: "available",
    listingDate: new Date().toISOString(),
    featured: true,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing properties
    console.log("🗑️  Clearing existing properties...");
    await Property.deleteMany({});
    console.log("✅ Cleared existing properties");

    // Insert sample properties
    console.log("📝 Inserting sample properties...");
    const result = await Property.insertMany(sampleProperties);
    console.log(`✅ Successfully inserted ${result.length} properties`);

    // Display inserted properties
    console.log("\n📋 Inserted Properties:");
    result.forEach((prop, index) => {
      console.log(
        `   ${index + 1}. ${prop.title} - $${prop.price.toLocaleString()} (${
          prop.propertyType
        })`
      );
    });

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n🚀 You can now start your server and test the API:");
    console.log("   npm run dev");
    console.log("   curl http://localhost:3000/api/properties");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
  }
}

// Run the seed function
seedDatabase();
