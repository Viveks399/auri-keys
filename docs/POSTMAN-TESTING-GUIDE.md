# Testing API with Postman

A complete guide to test your Property Management API using Postman.

## Setup

### 1. Install Postman

- Download from [postman.com](https://www.postman.com/downloads/)
- Or use the web version at [web.postman.co](https://web.postman.co)

### 2. Start Your Server

```bash
npm run dev
```

Your API will be running at `http://localhost:3000`

### 3. Import Collection (Optional)

- Import the `postman-collection.json` file (included in project)
- Or create requests manually following the guide below

---

## Testing Each Endpoint

### 1. GET All Properties

**Get all properties or filter with query parameters**

**Request:**

- Method: `GET`
- URL: `http://localhost:3000/api/properties`

**Optional Query Parameters:**

- `?minPrice=500000` - Minimum price
- `?maxPrice=2000000` - Maximum price
- `?city=Miami` - Filter by city
- `?propertyType=villa` - Filter by type
- `?minBedrooms=3` - Minimum bedrooms
- `?status=available` - Filter by status

**Example URLs:**

```
http://localhost:3000/api/properties
http://localhost:3000/api/properties?city=Miami&minPrice=1000000
http://localhost:3000/api/properties?status=available&propertyType=house
```

**Expected Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "67890abc...",
      "title": "Luxury Beachfront Villa",
      "description": "Stunning beachfront property...",
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
      "amenities": ["Pool", "Beach Access", "Smart Home"],
      "images": ["/assets/images/auri-keys.jpeg"],
      "propertyType": "villa",
      "status": "available",
      "listingDate": "2025-10-08T...",
      "featured": true,
      "createdAt": "2025-10-08T...",
      "updatedAt": "2025-10-08T..."
    }
  ],
  "message": "Found 5 properties"
}
```

---

### 2. GET Single Property by ID

**Get details of a specific property**

**Request:**

- Method: `GET`
- URL: `http://localhost:3000/api/properties/{id}`
- Replace `{id}` with actual property ID from previous request

**Example:**

```
http://localhost:3000/api/properties/67890abcdef12345
```

**Expected Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "67890abcdef12345",
    "title": "Luxury Beachfront Villa",
    "description": "Stunning beachfront property...",
    "price": 2500000,
    "location": { ... },
    "features": { ... },
    "amenities": [...],
    "images": [...],
    "propertyType": "villa",
    "status": "available",
    "listingDate": "2025-10-08T...",
    "featured": true,
    "createdAt": "2025-10-08T...",
    "updatedAt": "2025-10-08T..."
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "error": "Property not found"
}
```

---

### 3. POST Create New Property

**Create a new property listing**

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/api/properties`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

**Sample Body:**

```json
{
  "title": "Modern Downtown Loft",
  "description": "Spacious loft with industrial charm and modern amenities in the heart of downtown",
  "price": 750000,
  "location": {
    "address": "555 Main Street, Unit 302",
    "city": "Portland",
    "state": "OR",
    "zipCode": "97205",
    "country": "USA"
  },
  "features": {
    "bedrooms": 2,
    "bathrooms": 2,
    "squareFeet": 1800,
    "yearBuilt": 2021
  },
  "amenities": ["Exposed Brick", "High Ceilings", "Parking", "Gym Access"],
  "images": ["/path/to/image1.jpg", "/path/to/image2.jpg"],
  "propertyType": "apartment",
  "status": "available",
  "featured": false
}
```

**Steps in Postman:**

1. Set method to `POST`
2. Enter URL: `http://localhost:3000/api/properties`
3. Go to **Headers** tab → Add:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to **Body** tab → Select **raw** → Choose **JSON**
5. Paste the JSON above
6. Click **Send**

**Expected Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "newid123456789",
    "title": "Modern Downtown Loft",
    "description": "Spacious loft with industrial charm...",
    "price": 750000,
    "location": { ... },
    "features": { ... },
    "amenities": [...],
    "images": [...],
    "propertyType": "apartment",
    "status": "available",
    "listingDate": "2025-10-08T...",
    "featured": false,
    "createdAt": "2025-10-08T...",
    "updatedAt": "2025-10-08T..."
  },
  "message": "Property created successfully"
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "error": "Missing required fields: title, price, location, features"
}
```

---

### 4. PUT/PATCH Update Property

**Update an existing property (full or partial update)**

**Request:**

- Method: `PUT` or `PATCH`
- URL: `http://localhost:3000/api/properties/{id}`
- Headers:
  - `Content-Type: application/json`
- Body (raw JSON):

**Sample Body (Partial Update):**

```json
{
  "price": 725000,
  "status": "pending",
  "features": {
    "squareFeet": 1850
  }
}
```

**Sample Body (Full Update):**

```json
{
  "title": "Modern Downtown Loft - Updated",
  "description": "Spacious loft with industrial charm, recently renovated",
  "price": 775000,
  "location": {
    "address": "555 Main Street, Unit 302",
    "city": "Portland",
    "state": "OR",
    "zipCode": "97205",
    "country": "USA"
  },
  "features": {
    "bedrooms": 2,
    "bathrooms": 2,
    "squareFeet": 1900,
    "yearBuilt": 2021
  },
  "amenities": [
    "Exposed Brick",
    "High Ceilings",
    "Parking",
    "Gym Access",
    "Rooftop Deck"
  ],
  "images": [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg"
  ],
  "propertyType": "apartment",
  "status": "available",
  "featured": true
}
```

**Steps in Postman:**

1. Set method to `PUT` or `PATCH`
2. Enter URL: `http://localhost:3000/api/properties/{id}` (replace {id})
3. Go to **Headers** tab → Add `Content-Type: application/json`
4. Go to **Body** tab → Select **raw** → Choose **JSON**
5. Paste the JSON above
6. Click **Send**

**Expected Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "67890abcdef12345",
    "title": "Modern Downtown Loft - Updated",
    "price": 775000,
    "status": "available",
    // ... updated fields
    "updatedAt": "2025-10-08T..." // Updated timestamp
  },
  "message": "Property updated successfully"
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "error": "Property not found"
}
```

---

### 5. DELETE Property

**Delete a property listing**

**Request:**

- Method: `DELETE`
- URL: `http://localhost:3000/api/properties/{id}`
- No body required

**Steps in Postman:**

1. Set method to `DELETE`
2. Enter URL: `http://localhost:3000/api/properties/{id}` (replace {id})
3. Click **Send**

**Expected Response (200 OK):**

```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "error": "Property not found"
}
```

---

## Property Type Values

When creating/updating properties, use these exact values:

**propertyType:**

- `"house"`
- `"apartment"`
- `"condo"`
- `"townhouse"`
- `"villa"`
- `"land"`
- `"commercial"`

**status:**

- `"available"`
- `"pending"`
- `"sold"`

---

## Complete Testing Workflow

### 1. Get All Properties (Check what's in database)

```
GET http://localhost:3000/api/properties
```

### 2. Create a New Property

```
POST http://localhost:3000/api/properties
Body: { full property object }
```

→ Copy the `id` from response

### 3. Get Single Property (Verify it was created)

```
GET http://localhost:3000/api/properties/{copied-id}
```

### 4. Update the Property

```
PUT http://localhost:3000/api/properties/{copied-id}
Body: { updated fields }
```

### 5. Verify the Update

```
GET http://localhost:3000/api/properties/{copied-id}
```

### 6. Search/Filter Properties

```
GET http://localhost:3000/api/properties?city=Portland&minPrice=500000
```

### 7. Delete the Property

```
DELETE http://localhost:3000/api/properties/{copied-id}
```

### 8. Verify Deletion

```
GET http://localhost:3000/api/properties/{copied-id}
→ Should return 404 Not Found
```

---

## Tips for Postman

### Save Requests in a Collection

1. Click **New** → **Collection**
2. Name it "Auri Keys API"
3. Save each request to this collection
4. Use variables for base URL

### Use Environment Variables

1. Create an environment: **Environments** → **Create Environment**
2. Add variable:
   - Variable: `base_url`
   - Initial Value: `http://localhost:3000`
3. Use in requests: `{{base_url}}/api/properties`

### Save Property ID as Variable

After creating a property:

1. Go to **Tests** tab in the POST request
2. Add this script:

```javascript
if (pm.response.code === 201) {
  const responseData = pm.response.json();
  pm.environment.set("property_id", responseData.data.id);
}
```

3. Use `{{property_id}}` in subsequent requests

### Common Issues

**Error: "Failed to fetch"**

- Make sure your dev server is running (`npm run dev`)
- Check the URL is correct (`http://localhost:3000`)

**Error: "Please define MONGODB_URI"**

- Create `.env.local` file with MongoDB connection string
- Restart the dev server

**Error: "Validation failed"**

- Check all required fields are included
- Verify data types (price should be number, not string)
- Check enum values match exactly

---

## Sample Test Data

### Sample Property 1: Luxury Villa

```json
{
  "title": "Ocean View Luxury Villa",
  "description": "Stunning villa with panoramic ocean views and private beach access",
  "price": 3500000,
  "location": {
    "address": "789 Coastal Highway",
    "city": "Malibu",
    "state": "CA",
    "zipCode": "90265",
    "country": "USA"
  },
  "features": {
    "bedrooms": 6,
    "bathrooms": 5,
    "squareFeet": 6000,
    "lotSize": 15000,
    "yearBuilt": 2022
  },
  "amenities": [
    "Infinity Pool",
    "Home Theater",
    "Wine Cellar",
    "Beach Access",
    "Smart Home",
    "Guest House"
  ],
  "images": [],
  "propertyType": "villa",
  "status": "available",
  "featured": true
}
```

### Sample Property 2: Starter Condo

```json
{
  "title": "Cozy 1-Bedroom Condo",
  "description": "Perfect starter home with modern updates and great location",
  "price": 285000,
  "location": {
    "address": "123 Park Avenue, Unit 4B",
    "city": "Chicago",
    "state": "IL",
    "zipCode": "60614",
    "country": "USA"
  },
  "features": {
    "bedrooms": 1,
    "bathrooms": 1,
    "squareFeet": 750
  },
  "amenities": ["Parking", "Storage", "Pet Friendly"],
  "images": [],
  "propertyType": "condo",
  "status": "available",
  "featured": false
}
```

---

## Next Steps

1. ✅ Test all endpoints in Postman
2. ✅ Import the collection for quick testing
3. ✅ Set up environment variables
4. ✅ Save commonly used requests
5. 📝 Integrate API calls into your frontend
6. 📝 Add authentication headers (when implemented)

---

**Happy Testing! 🚀**
