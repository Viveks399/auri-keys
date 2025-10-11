# Cloudinary Integration - Setup Summary

✅ **Cloudinary integration for property image uploads is now complete!**

---

## What Was Added

### 1. Cloudinary SDK

- **Package:** `cloudinary@latest`
- **Installed via:** `npm install cloudinary`

### 2. Utility Functions (`src/lib/cloudinary.ts`)

- `uploadImage()` - Upload single image
- `uploadMultipleImages()` - Upload multiple images at once
- `deleteImage()` - Delete single image
- `deleteMultipleImages()` - Delete multiple images
- `extractPublicId()` - Extract public ID from Cloudinary URL
- Auto-optimization (1920x1080, quality:auto, format:auto)

### 3. API Endpoints

#### Upload Images

**Endpoint:** `POST /api/upload/images`

- Upload single or multiple images
- Returns Cloudinary URL and public ID
- Protected (requires authentication)
- Max 10 images per request
- Auto-optimization enabled

#### Delete Images

**Endpoint:** `DELETE /api/upload/images/delete`

- Delete by public ID or URL
- Single or batch deletion
- Protected (requires authentication)
- Returns deletion status

### 4. Documentation

- `CLOUDINARY-IMAGE-UPLOAD.md` - Complete image upload guide
- `README-API.md` - Updated with image upload endpoints
- `ENV-SETUP.md` - Updated with Cloudinary environment variables
- `env.example` - Template with Cloudinary credentials

---

## Environment Variables Required

Add these to your `.env.local`:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Get your credentials from:** [Cloudinary Console](https://console.cloudinary.com/)

---

## Quick Start

### 1. Setup Cloudinary Account

```bash
# 1. Sign up at https://cloudinary.com/
# 2. Get credentials from dashboard
# 3. Add to .env.local
```

### 2. Test Image Upload

```bash
# Get auth token first
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'

# Upload image
curl -X POST http://localhost:3000/api/upload/images \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "folder": "test"
  }'
```

---

## Usage Examples

### Single Image Upload

```typescript
const response = await fetch("/api/upload/images", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    image: base64Image,
    folder: "properties",
  }),
});

const data = await response.json();
const imageUrl = data.data.url; // Use this for property.images
```

### Multiple Images Upload

```typescript
const response = await fetch("/api/upload/images", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    images: [base64Image1, base64Image2, base64Image3],
    folder: "properties",
  }),
});

const data = await response.json();
const imageUrls = data.data.map((img) => img.url);
```

### Delete Image

```typescript
const response = await fetch("/api/upload/images/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    publicId: "properties/image123",
  }),
});
```

---

## Integration with Properties

### Creating Property with Images

```typescript
// Step 1: Upload images first
const uploadedImages = [];
for (const imageFile of selectedFiles) {
  const base64 = await convertToBase64(imageFile);
  const response = await fetch("/api/upload/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: base64, folder: "properties" }),
  });
  const data = await response.json();
  uploadedImages.push(data.data.url);
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
    images: uploadedImages, // Cloudinary URLs
    // ... other property data
  }),
});
```

---

## Image Optimization

All images are automatically optimized:

- **Max dimensions:** 1920x1080 (maintains aspect ratio)
- **Quality:** Auto (good quality, optimized size)
- **Format:** Auto (WebP for supported browsers)
- **Compression:** Automatic

---

## Features

✅ Single and batch image uploads  
✅ Image deletion (cleanup)  
✅ Auto-optimization (resize, quality, format)  
✅ Secure (authentication required)  
✅ Base64 upload support  
✅ Public ID extraction from URLs  
✅ Error handling  
✅ TypeScript support  
✅ Comprehensive documentation

---

## Security

- **Authentication:** All upload/delete endpoints require valid JWT token
- **Rate limiting:** Consider adding rate limiting in production
- **File validation:** Only image formats allowed
- **Size limits:** Max 10 images per request
- **API secret:** Never exposed to frontend

---

## File Structure

```
src/
├── lib/
│   └── cloudinary.ts              # Cloudinary utility functions
└── app/
    └── api/
        └── upload/
            └── images/
                ├── route.ts        # Upload endpoint
                └── delete/
                    └── route.ts    # Delete endpoint

Documentation:
├── CLOUDINARY-IMAGE-UPLOAD.md     # Complete guide
├── CLOUDINARY-SETUP-SUMMARY.md    # This file
├── README-API.md                  # Updated with upload endpoints
├── ENV-SETUP.md                   # Updated with Cloudinary vars
└── env.example                    # Environment template
```

---

## Testing

### Postman Testing

1. Import endpoints:

   - `POST {{BASE_URL}}/api/upload/images`
   - `DELETE {{BASE_URL}}/api/upload/images/delete`

2. Set environment variables:

   ```
   BASE_URL = http://localhost:3000
   TOKEN = your-jwt-token
   ```

3. Test with sample base64 image:
   ```
   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==
   ```

### Manual Testing

```bash
# 1. Start server
npm run dev

# 2. Login to get token
# (Use Postman or cURL)

# 3. Upload test image
# (Use the upload endpoint)

# 4. Check Cloudinary dashboard
# Images should appear in the 'properties' folder
```

---

## Troubleshooting

### "Missing Cloudinary credentials"

- Check `.env.local` has all 3 variables
- Restart dev server after adding env vars

### "Failed to upload image"

- Check base64 encoding is valid
- Verify file size is under 10MB
- Check Cloudinary quota/limits

### "Authentication required"

- Include `Authorization: Bearer {token}` header
- Get token from `/api/auth/login`

### Images not showing in Cloudinary

- Check cloud name is correct
- Verify API credentials are valid
- Check Cloudinary dashboard for errors

---

## Next Steps

1. ✅ Setup Cloudinary account
2. ✅ Add environment variables
3. ✅ Test image upload
4. 🔄 Integrate with property creation forms
5. 🔄 Add image preview in admin panel
6. 🔄 Add drag-and-drop upload UI
7. 🔄 Add image cropping/editing
8. 🔄 Add progress indicators

---

## Resources

- [Cloudinary Dashboard](https://console.cloudinary.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Image Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [CLOUDINARY-IMAGE-UPLOAD.md](CLOUDINARY-IMAGE-UPLOAD.md) - Full guide

---

## Support

For issues or questions:

1. Check `CLOUDINARY-IMAGE-UPLOAD.md` for detailed docs
2. Check `ENV-SETUP.md` for environment setup
3. Check Cloudinary documentation
4. Check `.env.local` configuration

---

**Cloudinary integration complete! 🎉**

You can now upload property images to Cloudinary and use the URLs in your property listings.
