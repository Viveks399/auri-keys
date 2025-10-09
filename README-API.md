# Property Management API Documentation

## Overview

This API provides CRUD operations for managing real estate properties in the Auri Keys application.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### 1. Get All Properties

**GET** `/api/properties`

Retrieve all properties or filter properties using query parameters.

**Query Parameters:**

- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `city` (optional): City name filter
- `propertyType` (optional): Property type (house, apartment, condo, townhouse, villa, land, commercial)
- `minBedrooms` (optional): Minimum number of bedrooms
- `status` (optional): Property status (available, pending, sold)

**Example Request:**

```bash
GET /api/properties?city=Miami&minPrice=1000000&status=available
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Luxury Beachfront Villa",
      "description": "Stunning beachfront property with panoramic ocean views",
      "price": 2500000,
      "location": {
        "address": "123 Ocean Drive",
        "city": "Miami Beach",
        "state": "FL",
        "zipCode": "33139",
        "country": "USA"
      },
      "features": {
        "bedrooms": 5,
        "bathrooms": 4,
        "squareFeet": 4500,
        "lotSize": 8000,
        "yearBuilt": 2020
      },
      "amenities": ["Pool", "Beach Access", "Smart Home", "Garage", "Garden"],
      "images": ["/assets/images/auri-keys.jpeg"],
      "propertyType": "villa",
      "status": "available",
      "listingDate": "2025-01-01",
      "featured": true,
      "createdAt": "2025-10-08T...",
      "updatedAt": "2025-10-08T..."
    }
  ],
  "message": "Found 1 properties"
}
```

---

### 2. Get Single Property

**GET** `/api/properties/[id]`

Retrieve a specific property by ID.

**Example Request:**

```bash
GET /api/properties/1
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Luxury Beachfront Villa",
    ...
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Property not found"
}
```

---

### 3. Create Property

**POST** `/api/properties`

Create a new property listing.

**Request Body:**

```json
{
  "title": "Modern Family Home",
  "description": "Beautiful 4-bedroom home in a quiet neighborhood",
  "price": 850000,
  "location": {
    "address": "789 Elm Street",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78701",
    "country": "USA"
  },
  "features": {
    "bedrooms": 4,
    "bathrooms": 3,
    "squareFeet": 3000,
    "lotSize": 7500,
    "yearBuilt": 2018
  },
  "amenities": ["Pool", "Backyard", "Garage", "Fireplace"],
  "images": ["/path/to/image1.jpg", "/path/to/image2.jpg"],
  "propertyType": "house",
  "status": "available",
  "featured": false
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "prop_1234567890_abc123def",
    "title": "Modern Family Home",
    ...
    "createdAt": "2025-10-08T...",
    "updatedAt": "2025-10-08T..."
  },
  "message": "Property created successfully"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "error": "Missing required fields: title, price, location, features"
}
```

---

### 4. Update Property

**PUT** `/api/properties/[id]`  
**PATCH** `/api/properties/[id]`

Update an existing property. Both PUT and PATCH support partial updates.

**Request Body (partial update):**

```json
{
  "price": 875000,
  "status": "pending",
  "features": {
    "squareFeet": 3100
  }
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Modern Family Home",
    "price": 875000,
    "status": "pending",
    ...
    "updatedAt": "2025-10-08T..."
  },
  "message": "Property updated successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Property not found"
}
```

---

### 5. Delete Property

**DELETE** `/api/properties/[id]`

Delete a property listing.

**Example Request:**

```bash
DELETE /api/properties/1
```

**Response (200):**

```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "Property not found"
}
```

---

## Using the API from Frontend

You can use the utility functions provided in `src/lib/api-utils.ts`:

```typescript
import {
  fetchProperties,
  fetchPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/api-utils";

// Get all properties
const result = await fetchProperties();

// Filter properties
const filtered = await fetchProperties({
  city: "Miami",
  minPrice: 1000000,
  status: "available",
});

// Get single property
const property = await fetchPropertyById("1");

// Create property
const newProperty = await createProperty({
  title: "New Listing",
  price: 500000,
  // ... other fields
});

// Update property
const updated = await updateProperty("1", {
  price: 550000,
  status: "pending",
});

// Delete property
await deleteProperty("1");
```

---

## Data Storage

Currently, the API uses an in-memory data store (`src/lib/propertyStore.ts`) with sample properties. This is suitable for development and testing.

**For Production:**
Replace the in-memory store with a real database:

- PostgreSQL with Prisma
- MongoDB with Mongoose
- Supabase
- Firebase Firestore

---

## Property Type Definition

```typescript
interface Property {
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
```

---

## Testing the API

You can test the API using:

1. **cURL:**

```bash
# Get all properties
curl http://localhost:3000/api/properties

# Get single property
curl http://localhost:3000/api/properties/1

# Create property
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Property","price":500000,...}'

# Update property
curl -X PUT http://localhost:3000/api/properties/1 \
  -H "Content-Type: application/json" \
  -d '{"price":550000}'

# Delete property
curl -X DELETE http://localhost:3000/api/properties/1
```

2. **Postman or Insomnia:**
   Import the endpoints and test with a GUI.

3. **Browser DevTools:**
   Use the browser console to test fetch requests.

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## Next Steps

1. **Add Authentication:** Protect endpoints with JWT or session-based auth
2. **Add Database:** Replace in-memory store with a real database
3. **Add Image Upload:** Implement file upload for property images
4. **Add Pagination:** Implement pagination for large property lists
5. **Add Validation:** Use a validation library like Zod or Yup
6. **Add Rate Limiting:** Protect API from abuse
7. **Add Logging:** Implement request/error logging
