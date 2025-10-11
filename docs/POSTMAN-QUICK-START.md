# Postman Quick Start Guide 🚀

## Option 1: Import Collection (Fastest!)

### Step 1: Import

1. Open Postman
2. Click **Import** button (top left)
3. Select **files** tab
4. Choose `postman-collection.json` from your project
5. Click **Import**

### Step 2: You're Done! ✅

All endpoints are ready to use:

- ✅ Get All Properties
- ✅ Get All Properties (With Filters)
- ✅ Get Property by ID
- ✅ Create Property
- ✅ Create Luxury Villa
- ✅ Update Property (Partial)
- ✅ Update Property (Full)
- ✅ Delete Property

### Step 3: Test

1. Make sure your server is running: `npm run dev`
2. Click any request in the collection
3. Click **Send**

---

## Option 2: Manual Setup (Step-by-Step)

### 1. GET All Properties

```
Method: GET
URL: http://localhost:3000/api/properties
```

Click **Send** → You'll see all properties

---

### 2. POST Create Property

```
Method: POST
URL: http://localhost:3000/api/properties
```

**Headers:**

- Key: `Content-Type`
- Value: `application/json`

**Body** (select raw → JSON):

```json
{
  "title": "Test Property",
  "description": "A beautiful test property",
  "price": 500000,
  "location": {
    "address": "123 Test St",
    "city": "Test City",
    "state": "TC",
    "zipCode": "12345",
    "country": "USA"
  },
  "features": {
    "bedrooms": 3,
    "bathrooms": 2,
    "squareFeet": 2000
  },
  "amenities": ["Parking", "Garden"],
  "images": [],
  "propertyType": "house",
  "status": "available",
  "featured": false
}
```

Click **Send** → Copy the `id` from response

---

### 3. GET Single Property

```
Method: GET
URL: http://localhost:3000/api/properties/{paste-id-here}
```

Replace `{paste-id-here}` with the ID you copied

---

### 4. PUT Update Property

```
Method: PUT
URL: http://localhost:3000/api/properties/{paste-id-here}
```

**Headers:**

- Key: `Content-Type`
- Value: `application/json`

**Body** (select raw → JSON):

```json
{
  "price": 550000,
  "status": "pending"
}
```

---

### 5. DELETE Property

```
Method: DELETE
URL: http://localhost:3000/api/properties/{paste-id-here}
```

---

## Testing with Filters

### Filter by City

```
GET http://localhost:3000/api/properties?city=Miami
```

### Filter by Price Range

```
GET http://localhost:3000/api/properties?minPrice=500000&maxPrice=2000000
```

### Filter by Type and Status

```
GET http://localhost:3000/api/properties?propertyType=villa&status=available
```

### Multiple Filters

```
GET http://localhost:3000/api/properties?city=Miami&minPrice=1000000&status=available&minBedrooms=3
```

---

## Common Issues & Solutions

### ❌ Error: "Failed to fetch"

**Solution:** Start your server

```bash
npm run dev
```

### ❌ Error: "Please define MONGODB_URI"

**Solution:** Create `.env.local` file

```bash
MONGODB_URI=mongodb://localhost:27017/auri-keys
```

Then restart server

### ❌ Error: "Property not found" (404)

**Solution:** Check the property ID is correct

- First do `GET /api/properties` to see all IDs
- Copy a valid ID
- Use it in your request

### ❌ Error: "Missing required fields" (400)

**Solution:** Make sure you include all required fields:

- title ✅
- price ✅
- location (with address, city, state, zipCode, country) ✅
- features (with bedrooms, bathrooms, squareFeet) ✅

---

## Quick Test Workflow

### 1️⃣ Check Database

```
GET /api/properties
```

### 2️⃣ Create Property

```
POST /api/properties
(with JSON body)
```

→ Save the returned `id`

### 3️⃣ Verify Creation

```
GET /api/properties/{id}
```

### 4️⃣ Update Price

```
PUT /api/properties/{id}
Body: { "price": 600000 }
```

### 5️⃣ Check Update

```
GET /api/properties/{id}
```

### 6️⃣ Search

```
GET /api/properties?minPrice=500000
```

### 7️⃣ Delete

```
DELETE /api/properties/{id}
```

### 8️⃣ Confirm Deletion

```
GET /api/properties/{id}
→ Should return 404
```

---

## Pro Tips 💡

### Save Property ID Automatically

In POST Create Property request:

1. Go to **Tests** tab
2. Add this code:

```javascript
if (pm.response.code === 201) {
  const responseData = pm.response.json();
  pm.environment.set("property_id", responseData.data.id);
}
```

3. Now use `{{property_id}}` in other requests!

### Use Environment Variables

1. Click **Environments** (left sidebar)
2. Create new environment: "Local Development"
3. Add variables:
   - `base_url` = `http://localhost:3000`
   - `property_id` = (leave empty, auto-filled by script above)
4. Select this environment (top right dropdown)
5. Use in requests: `{{base_url}}/api/properties`

---

## Sample Test Data

### Luxury Property

```json
{
  "title": "Beachfront Paradise",
  "description": "Stunning beachfront villa with ocean views",
  "price": 2500000,
  "location": {
    "address": "100 Ocean Drive",
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
  "images": [],
  "propertyType": "villa",
  "status": "available",
  "featured": true
}
```

### Starter Home

```json
{
  "title": "Cozy Starter Home",
  "description": "Perfect for first-time buyers",
  "price": 350000,
  "location": {
    "address": "456 Elm St",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78701",
    "country": "USA"
  },
  "features": {
    "bedrooms": 3,
    "bathrooms": 2,
    "squareFeet": 1500
  },
  "amenities": ["Garage", "Backyard"],
  "images": [],
  "propertyType": "house",
  "status": "available",
  "featured": false
}
```

---

## Valid Values

### propertyType

- `house`
- `apartment`
- `condo`
- `townhouse`
- `villa`
- `land`
- `commercial`

### status

- `available`
- `pending`
- `sold`

---

**That's it! You're ready to test! 🎉**

For detailed documentation, see `POSTMAN-TESTING-GUIDE.md`
