# Postman Guide: Create Property with Images

Complete step-by-step guide to upload images and create a property using Postman.

---

## Prerequisites

- Postman installed
- Server running (`npm run dev`)
- Cloudinary credentials in `.env.local`
- Admin account created

---

## Step-by-Step Process

### Step 1: Login to Get JWT Token

**Request:** `POST {{BASE_URL}}/api/auth/login`

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "...",
      "name": "Admin",
      "email": "admin@test.com"
    }
  },
  "message": "Login successful"
}
```

**📝 Copy the `token` value** - you'll need it for the next steps!

---

### Step 2: Convert Image to Base64

You have **3 options** to get base64 image data:

#### Option A: Use Online Converter (Easiest)

1. Go to [Base64 Image Encoder](https://www.base64-image.de/)
2. Upload your image
3. Copy the entire base64 string (including `data:image/jpeg;base64,` prefix)

#### Option B: Use Node.js Script

Create a file `convert-image.js`:

```javascript
const fs = require("fs");

// Read image file
const imagePath = "./my-property-image.jpg"; // Change to your image path
const imageBuffer = fs.readFileSync(imagePath);

// Convert to base64
const base64Image = imageBuffer.toString("base64");
const mimeType = "image/jpeg"; // Change based on your image type

// Create data URI
const dataUri = `data:${mimeType};base64,${base64Image}`;

console.log(dataUri);
```

Run it:

```bash
node convert-image.js
```

Copy the output.

#### Option C: Use Postman Pre-request Script

In Postman, you can read a file, but it's more complex. Use Options A or B for simplicity.

---

### Step 3: Upload Image to Cloudinary

**Request:** `POST {{BASE_URL}}/api/upload/images`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_FROM_STEP_1
```

**Body (raw JSON):**

For **single image**:

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
  "folder": "properties"
}
```

For **multiple images**:

```json
{
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD..."
  ],
  "folder": "properties"
}
```

**Response (Single Image):**

```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/properties/abc123def.jpg",
    "publicId": "properties/abc123def"
  },
  "message": "Image uploaded successfully"
}
```

**Response (Multiple Images):**

```json
{
  "success": true,
  "data": [
    {
      "url": "https://res.cloudinary.com/.../image1.jpg",
      "publicId": "properties/image1"
    },
    {
      "url": "https://res.cloudinary.com/.../image2.jpg",
      "publicId": "properties/image2"
    },
    {
      "url": "https://res.cloudinary.com/.../image3.jpg",
      "publicId": "properties/image3"
    }
  ],
  "message": "3 images uploaded successfully"
}
```

**📝 Copy the image URL(s)** from the response!

---

### Step 4: Create Property with Image URLs

**Request:** `POST {{BASE_URL}}/api/properties`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_FROM_STEP_1
```

**Body (raw JSON):**

```json
{
  "title": "Luxury Beachfront Villa",
  "description": "Stunning 5-bedroom villa with panoramic ocean views, infinity pool, and private beach access. Recently renovated with high-end finishes throughout.",
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
  "amenities": [
    "Infinity Pool",
    "Private Beach Access",
    "Smart Home System",
    "3-Car Garage",
    "Outdoor Kitchen",
    "Home Theater",
    "Wine Cellar",
    "Gym"
  ],
  "images": [
    "https://res.cloudinary.com/.../image1.jpg",
    "https://res.cloudinary.com/.../image2.jpg",
    "https://res.cloudinary.com/.../image3.jpg"
  ],
  "propertyType": "villa",
  "status": "available",
  "featured": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "671234567890abcdef123456",
    "title": "Luxury Beachfront Villa",
    "description": "Stunning 5-bedroom villa...",
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
    "amenities": ["Infinity Pool", "Private Beach Access", ...],
    "images": [
      "https://res.cloudinary.com/.../image1.jpg",
      "https://res.cloudinary.com/.../image2.jpg",
      "https://res.cloudinary.com/.../image3.jpg"
    ],
    "propertyType": "villa",
    "status": "available",
    "listingDate": "2025-10-09",
    "featured": true,
    "createdAt": "2025-10-09T12:34:56.789Z",
    "updatedAt": "2025-10-09T12:34:56.789Z"
  },
  "message": "Property created successfully"
}
```

**✅ Success!** Your property is now created with images!

---

## Complete Example with Sample Data

### Example 1: Small Test Image (1x1 pixel)

Use this tiny base64 image for quick testing:

```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "folder": "properties"
}
```

This is a 1x1 red pixel PNG - perfect for testing!

---

## Postman Environment Setup

Create a Postman environment with these variables:

1. Click **Environments** (left sidebar)
2. Click **+ New Environment**
3. Name it "Auri Keys Local"
4. Add variables:

| Variable      | Initial Value           | Current Value              |
| ------------- | ----------------------- | -------------------------- |
| `BASE_URL`    | `http://localhost:3000` | `http://localhost:3000`    |
| `TOKEN`       | (leave empty)           | (will be set after login)  |
| `IMAGE_URL_1` | (leave empty)           | (will be set after upload) |
| `IMAGE_URL_2` | (leave empty)           | (will be set after upload) |
| `IMAGE_URL_3` | (leave empty)           | (will be set after upload) |

5. Save the environment
6. Select it from the dropdown (top right)

---

## Auto-Save Token (Advanced)

To automatically save the token after login:

1. In the **Login** request, go to **Tests** tab
2. Add this script:

```javascript
// Parse response
const response = pm.response.json();

// Save token to environment
if (response.success && response.data.token) {
  pm.environment.set("TOKEN", response.data.token);
  console.log("✅ Token saved to environment");
}
```

3. Now after login, the token is automatically saved!
4. Use `{{TOKEN}}` in Authorization headers

---

## Auto-Save Image URLs (Advanced)

For the **Upload Images** request:

1. Go to **Tests** tab
2. Add this script:

**For single image upload:**

```javascript
const response = pm.response.json();

if (response.success && response.data.url) {
  pm.environment.set("IMAGE_URL_1", response.data.url);
  console.log("✅ Image URL saved:", response.data.url);
}
```

**For multiple images upload:**

```javascript
const response = pm.response.json();

if (response.success && response.data) {
  response.data.forEach((img, index) => {
    pm.environment.set(`IMAGE_URL_${index + 1}`, img.url);
    console.log(`✅ Image ${index + 1} saved:`, img.url);
  });
}
```

3. Now you can use `{{IMAGE_URL_1}}`, `{{IMAGE_URL_2}}`, etc. in property creation!

---

## Complete Workflow with Variables

### 1. Login

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

**Tests (auto-save token):**

```javascript
const response = pm.response.json();
if (response.success && response.data.token) {
  pm.environment.set("TOKEN", response.data.token);
}
```

---

### 2. Upload Images

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Body:**

```json
{
  "images": [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
  ],
  "folder": "properties"
}
```

**Tests (auto-save URLs):**

```javascript
const response = pm.response.json();
if (response.success && response.data) {
  response.data.forEach((img, index) => {
    pm.environment.set(`IMAGE_URL_${index + 1}`, img.url);
  });
}
```

---

### 3. Create Property

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Body:**

```json
{
  "title": "Modern Downtown Condo",
  "description": "Sleek 2-bedroom condo in the heart of downtown",
  "price": 750000,
  "location": {
    "address": "456 Main Street",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78701",
    "country": "USA"
  },
  "features": {
    "bedrooms": 2,
    "bathrooms": 2,
    "squareFeet": 1500,
    "yearBuilt": 2022
  },
  "amenities": ["Rooftop Pool", "Gym", "Concierge", "Parking"],
  "images": ["{{IMAGE_URL_1}}", "{{IMAGE_URL_2}}", "{{IMAGE_URL_3}}"],
  "propertyType": "condo",
  "status": "available",
  "featured": false
}
```

---

## Troubleshooting

### Error: "No image(s) provided"

**Solution:** Make sure the base64 string includes the `data:image/jpeg;base64,` prefix

### Error: "Authentication required"

**Solution:**

- Check Authorization header has `Bearer {{TOKEN}}`
- Make sure you logged in first
- Token might be expired - login again

### Error: "Failed to upload image"

**Solution:**

- Verify Cloudinary credentials in `.env.local`
- Check base64 encoding is valid
- Try with the small test image first

### Error: "Missing required fields"

**Solution:** Check all required fields in property creation:

- title
- price
- location (address, city, state, zipCode, country)
- features (bedrooms, bathrooms, squareFeet)
- propertyType

### Images not showing in Cloudinary

**Solution:**

- Login to [Cloudinary Dashboard](https://console.cloudinary.com/)
- Go to Media Library
- Check "properties" folder
- Verify credentials are correct

---

## Quick Test

Want to test quickly? Use this complete sequence:

**1. Login**

```
POST http://localhost:3000/api/auth/login
Body: {"email":"admin@test.com","password":"password123"}
```

**2. Upload Test Image**

```
POST http://localhost:3000/api/upload/images
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "folder": "test"
}
```

**3. Create Test Property**

```
POST http://localhost:3000/api/properties
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "title": "Test Property",
  "price": 500000,
  "description": "Test description",
  "location": {
    "address": "123 Test St",
    "city": "Test City",
    "state": "TX",
    "zipCode": "12345",
    "country": "USA"
  },
  "features": {
    "bedrooms": 3,
    "bathrooms": 2,
    "squareFeet": 2000
  },
  "images": ["YOUR_CLOUDINARY_URL_HERE"],
  "propertyType": "house",
  "status": "available"
}
```

---

## Next Steps

After creating a property with images:

1. **Verify in Database:** Check MongoDB to see the property
2. **Get Property:** `GET /api/properties/PROPERTY_ID`
3. **Check Images:** Open Cloudinary URLs in browser
4. **Update Property:** `PUT /api/properties/PROPERTY_ID`
5. **Delete if needed:** `DELETE /api/properties/PROPERTY_ID`

---

## Additional Resources

- [Full API Documentation](README-API.md)
- [Cloudinary Upload Guide](CLOUDINARY-IMAGE-UPLOAD.md)
- [Postman Testing Guide](POSTMAN-TESTING-GUIDE.md)
- [Environment Setup](ENV-SETUP.md)

---

**Happy testing! 🚀**
