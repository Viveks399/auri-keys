# Create Property with Images - One Request! 🎉

## ✨ New Feature

You can now **create a property and upload images in ONE single request**! No more complicated two-step process.

## 🚀 How It Works

The `/api/properties` endpoint now accepts **both JSON and Form Data** requests:

### Option 1: Form Data with File Uploads (NEW! ✨)

Upload property details + image files in one request

### Option 2: JSON Only (Original)

Send property details as JSON (backward compatible)

## 📸 Create Property with Images

### Using Postman

1. **Select the Request**: "Create Property with Images (Form Upload)"

2. **Go to Body Tab** → Select "form-data"

3. **Add Property Data**:

   - Key: `propertyData`
   - Type: `Text`
   - Value: Your property JSON (see example below)

4. **Add Image Files**:

   - Key: `images` (can repeat this key for multiple files)
   - Type: `File`
   - Click "Select Files" and choose your images

5. **Send Request** → Images upload to Cloudinary automatically!

### Example Property Data (JSON String)

```json
{
  "title": "Stunning Penthouse with City Views",
  "description": "Modern 3-bedroom penthouse with floor-to-ceiling windows",
  "price": 2800000,
  "transactionType": "buy",
  "propertyType": "penthouse",
  "beds": 3,
  "baths": 3,
  "size": 2500,
  "furnishingStatus": "furnished",
  "propertyFeatures": ["Balcony", "Gym", "Upgraded", "Waterviews"],
  "seller": {
    "name": "Emily Chen",
    "job": "Property Specialist",
    "phone": "+1-555-444-3333",
    "email": "emily.chen@realestate.com"
  },
  "location": {
    "address": "100 Tower Boulevard, Penthouse Suite",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "amenities": ["Concierge", "Rooftop Pool", "Valet Parking"],
  "yearBuilt": 2023,
  "status": "available",
  "featured": true
}
```

### Form Data Structure

```
POST /api/properties
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Fields:
├─ propertyData: <JSON string from above>
├─ images: <file1.jpg>
├─ images: <file2.jpg>
└─ images: <file3.jpg>
```

## 🎯 Response

```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Stunning Penthouse with City Views",
    "price": 2800000,
    "images": [
      "https://res.cloudinary.com/.../image1.jpg",
      "https://res.cloudinary.com/.../image2.jpg",
      "https://res.cloudinary.com/.../image3.jpg"
    ],
    "beds": 3,
    "baths": 3,
    "seller": {
      "name": "Emily Chen",
      "job": "Property Specialist",
      "phone": "+1-555-444-3333",
      "email": "emily.chen@realestate.com"
    },
    ...
  },
  "message": "Property created successfully with 3 image(s) uploaded"
}
```

## 🔧 How the Backend Works

1. **Detects Request Type**:

   - Checks `Content-Type` header
   - Form-data → Handles file uploads
   - JSON → Handles traditional JSON

2. **Extracts Property Data**:

   - Parses `propertyData` field from form

3. **Processes Image Files**:

   - Converts files to base64
   - Uploads to Cloudinary in parallel
   - Gets back Cloudinary URLs

4. **Creates Property**:

   - Combines property data + image URLs
   - Saves to database

5. **Returns Response**:
   - Property object with Cloudinary URLs in `images` array

## 📝 Using with Code (Frontend Example)

### JavaScript/TypeScript

```javascript
async function createPropertyWithImages(propertyData, imageFiles) {
  const formData = new FormData();

  // Add property data as JSON string
  formData.append("propertyData", JSON.stringify(propertyData));

  // Add image files
  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  const response = await fetch("http://localhost:3000/api/properties", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type - browser sets it automatically for FormData
    },
    body: formData,
  });

  return await response.json();
}

// Usage
const propertyData = {
  title: "Luxury Villa",
  price: 5000000,
  transactionType: "buy",
  propertyType: "villa",
  beds: 5,
  baths: 6,
  size: 4500,
  furnishingStatus: "furnished",
  propertyFeatures: ["Private Pool", "Garden"],
  seller: {
    name: "John Doe",
    job: "Agent",
    phone: "+1-555-1234",
    email: "john@example.com",
  },
  location: {
    address: "123 Main St",
    city: "Miami",
    state: "FL",
    zipCode: "12345",
    country: "USA",
  },
};

const images = [file1, file2, file3]; // File objects from input
const result = await createPropertyWithImages(propertyData, images);
console.log("Property created:", result.data.id);
console.log("Images uploaded:", result.data.images);
```

### React Example with File Input

```jsx
import { useState } from "react";

function CreatePropertyForm() {
  const [images, setImages] = useState([]);
  const [propertyData, setPropertyData] = useState({
    title: "",
    price: 0,
    // ... other fields
  });

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyData", JSON.stringify(propertyData));

    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Created:", result);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Property fields */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Create Property</button>
    </form>
  );
}
```

## ⚡ Advantages

### Before (2-Step Process)

1. Upload images → Get URLs
2. Create property with URLs
3. Manual copying of URLs
4. More API calls
5. Risk of orphaned images

### Now (1-Step Process) ✨

1. Create property + upload images in one request
2. Automatic URL handling
3. Single API call
4. Cleaner code
5. Better user experience

## 🔄 Backward Compatibility

The old JSON-only method still works! You can still send requests like:

```json
POST /api/properties
Content-Type: application/json

{
  "title": "Property",
  "images": ["url1", "url2"],
  ...
}
```

## ❗ Important Notes

1. **propertyData Must Be JSON String**: When using form-data, the `propertyData` field must be a JSON string, not a plain object

2. **Image Field Name**: Use `images` (plural) as the field name for files

3. **Multiple Images**: Repeat the `images` key for each file (don't use array notation)

4. **File Types**: Cloudinary auto-detects file types (jpg, png, webp, etc.)

5. **Max Upload**: No hard limit in code, but Cloudinary may have limits based on your plan

6. **Authorization**: Still required - must include Bearer token

## 🐛 Troubleshooting

### Error: "Missing propertyData field"

- Make sure you have a field named `propertyData` (exact name)
- Value must be a valid JSON string

### Error: "Invalid JSON in propertyData field"

- Check your JSON syntax
- Make sure strings are properly escaped
- Use online JSON validator

### Images not uploading

- Check file field name is `images`
- Verify files are actual image files
- Check Cloudinary credentials in `.env`

### Property created but no images

- Check if files were actually selected
- Check browser console for errors
- Verify Content-Type is multipart/form-data

## 📚 Related Documentation

- [Property Fields Guide](./PROPERTY-FIELDS-GUIDE.md) - All property fields
- [Cloudinary Setup](./CLOUDINARY-SETUP-SUMMARY.md) - Cloudinary configuration
- [Postman Guide](./POSTMAN-TESTING-GUIDE.md) - API testing

---

**Status:** ✅ Ready to use!
**Endpoint:** `POST /api/properties`
**Supports:** JSON (original) + Form Data with files (new)
