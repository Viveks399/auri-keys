# Cloudinary Image Upload Guide

This guide explains how to upload and manage property images using Cloudinary integration.

---

## Table of Contents

1. [Setup](#setup)
2. [Upload Images](#upload-images)
3. [Delete Images](#delete-images)
4. [Image Optimization](#image-optimization)
5. [Best Practices](#best-practices)
6. [API Reference](#api-reference)
7. [Testing with Postman](#testing-with-postman)

---

## Setup

### 1. Get Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to [Console Dashboard](https://console.cloudinary.com/)
3. Copy your credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Add to Environment Variables

Add to your `.env.local` file:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

### 3. Restart Server

```bash
npm run dev
```

---

## Upload Images

### Endpoint

```
POST /api/upload/images
```

**Authentication:** Required (Bearer token)

### Single Image Upload

**Request:**

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "folder": "properties"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/properties/abc123.jpg",
    "publicId": "properties/abc123"
  },
  "message": "Image uploaded successfully"
}
```

### Multiple Images Upload

**Request:**

```json
{
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  ],
  "folder": "properties"
}
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "url": "https://res.cloudinary.com/.../abc123.jpg",
      "publicId": "properties/abc123"
    },
    {
      "url": "https://res.cloudinary.com/.../def456.jpg",
      "publicId": "properties/def456"
    }
  ],
  "message": "3 images uploaded successfully"
}
```

### Using with cURL

```bash
# Upload single image
curl -X POST http://localhost:3000/api/upload/images \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "image": "data:image/jpeg;base64,YOUR_BASE64_STRING",
    "folder": "properties"
  }'
```

---

## Delete Images

### Endpoint

```
DELETE /api/upload/images/delete
```

**Authentication:** Required (Bearer token)

### Delete Single Image by Public ID

**Request:**

```json
{
  "publicId": "properties/abc123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### Delete Single Image by URL

**Request:**

```json
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/properties/abc123.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### Delete Multiple Images

**Request:**

```json
{
  "publicIds": ["properties/abc123", "properties/def456", "properties/ghi789"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "deleted": 3,
    "failed": 0
  },
  "message": "Deleted 3 image(s)"
}
```

---

## Image Optimization

Cloudinary automatically optimizes uploaded images:

### Auto Transformations

- **Max dimensions:** 1920x1080
- **Quality:** Auto (good)
- **Format:** Auto (WebP for supported browsers)
- **Crop:** Limit (maintains aspect ratio)

### Custom Transformations

To use different transformations, modify `src/lib/cloudinary.ts`:

```typescript
transformation: [
  {
    width: 2560,
    height: 1440,
    crop: "limit",
    quality: "auto:best",
    fetch_format: "auto",
  },
];
```

---

## Best Practices

### 1. Image Formats

**Recommended:**

- JPEG for photos
- PNG for graphics with transparency
- WebP for modern browsers (auto-converted)

**Supported:**

- JPEG, PNG, GIF, WebP, AVIF, SVG

### 2. File Size

- **Recommended:** Under 5MB per image
- **Maximum:** 10MB per image
- **Batch uploads:** Max 10 images at once

### 3. Security

✅ **Do:**

- Always authenticate uploads
- Store `publicId` with property data
- Delete old images when updating

❌ **Don't:**

- Expose API secret in frontend
- Allow unlimited uploads
- Skip validation

### 4. Folder Organization

```
properties/
├── property-{id}-1.jpg
├── property-{id}-2.jpg
└── property-{id}-3.jpg
```

### 5. Error Handling

Always handle upload failures:

```javascript
try {
  const response = await fetch("/api/upload/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: base64Image }),
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  // Use data.data.url for the image URL
} catch (error) {
  console.error("Upload error:", error);
}
```

---

## API Reference

### Upload Image(s)

**Endpoint:** `POST /api/upload/images`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {token}
```

**Body Parameters:**

| Parameter | Type     | Required | Description                               |
| --------- | -------- | -------- | ----------------------------------------- |
| `image`   | string   | Yes\*    | Base64 encoded image (for single upload)  |
| `images`  | string[] | Yes\*    | Array of base64 images (for multiple)     |
| `folder`  | string   | No       | Cloudinary folder (default: "properties") |

\*Either `image` or `images` is required, not both.

**Response Codes:**

- `200` - Success
- `400` - Bad request (validation error)
- `401` - Unauthorized
- `500` - Server error

---

### Delete Image(s)

**Endpoint:** `DELETE /api/upload/images/delete`

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {token}
```

**Body Parameters:**

| Parameter   | Type     | Required | Description                           |
| ----------- | -------- | -------- | ------------------------------------- |
| `publicId`  | string   | Yes\*    | Cloudinary public ID (single delete)  |
| `url`       | string   | Yes\*    | Cloudinary URL (single delete)        |
| `publicIds` | string[] | Yes\*    | Array of public IDs (multiple delete) |
| `urls`      | string[] | Yes\*    | Array of URLs (multiple delete)       |

\*One of the above is required.

**Response Codes:**

- `200` - Success
- `207` - Partial success (some deletions failed)
- `400` - Bad request
- `401` - Unauthorized
- `500` - Server error

---

## Testing with Postman

### 1. Setup Environment

Add to Postman environment:

```
BASE_URL = http://localhost:3000
TOKEN = your-jwt-token
```

### 2. Upload Test Image

**Request:**

```
POST {{BASE_URL}}/api/upload/images
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Body:**

```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "folder": "test"
}
```

### 3. Delete Test Image

**Request:**

```
DELETE {{BASE_URL}}/api/upload/images/delete
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{TOKEN}}
```

**Body:**

```json
{
  "publicId": "test/your-image-id"
}
```

---

## Complete Workflow Example

### 1. Create Property with Images

```javascript
// Step 1: Upload images
const imageUrls = [];
for (const imageFile of selectedFiles) {
  const base64 = await fileToBase64(imageFile);

  const uploadResponse = await fetch("/api/upload/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: base64, folder: "properties" }),
  });

  const uploadData = await uploadResponse.json();
  imageUrls.push(uploadData.data.url);
}

// Step 2: Create property with image URLs
const propertyResponse = await fetch("/api/properties", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: "Luxury Villa",
    price: 1500000,
    images: imageUrls,
    // ... other property data
  }),
});
```

### 2. Update Property Images

```javascript
// Step 1: Delete old images (optional)
const oldImages = property.images;
for (const imageUrl of oldImages) {
  await fetch("/api/upload/images/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url: imageUrl }),
  });
}

// Step 2: Upload new images
// (same as create workflow)

// Step 3: Update property
await fetch(`/api/properties/${propertyId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    images: newImageUrls,
  }),
});
```

---

## Troubleshooting

### Error: "Failed to upload image"

**Possible causes:**

1. Missing Cloudinary credentials
2. Invalid base64 string
3. File too large
4. Network error

**Solution:**

1. Check `.env.local` has all Cloudinary vars
2. Validate base64 encoding
3. Reduce image size
4. Check Cloudinary dashboard for quota

### Error: "Could not extract publicId from URL"

**Cause:** Invalid Cloudinary URL format

**Solution:** Use the `publicId` returned from upload instead of extracting from URL

### Images not displaying

**Possible causes:**

1. CORS issues
2. Invalid URL
3. Image deleted from Cloudinary

**Solution:**

1. Check Cloudinary CORS settings
2. Verify URL is accessible
3. Re-upload image

---

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [Best Practices](https://cloudinary.com/documentation/image_optimization)

---

**Happy uploading! 📸**
