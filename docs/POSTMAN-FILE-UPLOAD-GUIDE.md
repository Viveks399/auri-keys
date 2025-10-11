# Postman File Upload Guide - Select Photos from Device

**Quick guide to uploading images directly from your device in Postman**

---

## 🎯 New Endpoint: Direct File Upload

You can now **select photos directly from your device** instead of converting to base64!

**Endpoint:** `POST /api/upload/images/file`

---

## 🚀 How to Upload in Postman

### Single Image Upload

1. **Open Postman Collection**

   - Navigate to: `Image Upload → Upload File from Device (Single)`

2. **Login First** (if not already)

   - Run `Authentication → Admin Login`
   - Token auto-saves to `{{admin_token}}`

3. **Select Your Image**

   - In the request, go to **Body** tab
   - You'll see mode is set to **form-data**
   - Find the row with key `file`
   - On the right, click **Select Files**
   - Choose an image from your device (jpg, png, gif, etc.)

4. **Send the Request**
   - Click **Send**
   - Image uploads to Cloudinary
   - URL auto-saves to `{{image_url_1}}`

**That's it!** ✅

---

### Multiple Images Upload

1. **Navigate to:**

   - `Image Upload → Upload Files from Device (Multiple)`

2. **Select Multiple Images**

   - Go to **Body** tab
   - You'll see multiple rows with key `files`
   - Click **Select Files** on each row
   - Choose different images for each

3. **Add More Files** (Optional)

   - Click **Add** at bottom
   - Set key to `files`
   - Type: `File`
   - Click **Select Files**
   - Max 10 images total

4. **Send Request**
   - URLs auto-save to `{{image_url_1}}`, `{{image_url_2}}`, etc.

---

## 📸 Step-by-Step with Screenshots

### Step 1: Open Request

```
Postman → Auri Keys Property API → Image Upload → Upload File from Device
```

### Step 2: Body Tab

- Click **Body** tab
- See **form-data** selected

### Step 3: Select File

```
Row 1: file | [File] | [Select Files] ← Click here!
Row 2: folder | properties | (text)
```

### Step 4: Choose Image

- File picker opens
- Navigate to your image
- Click **Open**

### Step 5: Send

- Click **Send** button
- Wait for response
- Check console for success message

---

## 🎨 Visual Guide

```
┌─────────────────────────────────────────────┐
│ POST http://localhost:3000/api/upload/...   │
├─────────────────────────────────────────────┤
│ Body                                         │
│  ○ none  ○ form-data  ○ raw  ○ binary       │
│         ●                                    │
├─────────────────────────────────────────────┤
│ KEY        | TYPE  | VALUE                  │
├────────────┼───────┼────────────────────────┤
│ file       │ File  │ [Select Files] 📁      │ ← Click here!
│ folder     │ Text  │ properties             │
└─────────────────────────────────────────────┘
```

After selecting:

```
┌─────────────────────────────────────────────┐
│ KEY        | TYPE  | VALUE                  │
├────────────┼───────┼────────────────────────┤
│ file       │ File  │ my-property.jpg ✅     │
│ folder     │ Text  │ properties             │
└─────────────────────────────────────────────┘
```

---

## 💡 Comparison: Both Methods

### Method 1: Base64 Upload (Original)

```
Pros:
✅ Works with pure JSON
✅ Can send multiple in one JSON array
✅ Works programmatically easy

Cons:
❌ Manual conversion needed
❌ Large strings in request
```

**Use when:** Programmatic uploads, frontend integration

---

### Method 2: Direct File Upload (New!)

```
Pros:
✅ Select from device directly
✅ No conversion needed
✅ Easy testing in Postman
✅ Familiar file picker

Cons:
❌ Requires multipart/form-data
❌ Slightly larger request size
```

**Use when:** Testing in Postman, manual uploads

---

## 📋 Complete Workflow

### Workflow 1: Upload & Create Property

**Step 1: Login**

```
Run: Authentication → Admin Login
```

**Step 2: Upload Images from Device**

```
Run: Image Upload → Upload Files from Device (Multiple)
- Select file 1 from device
- Select file 2 from device
- Select file 3 from device
- Send
```

**Step 3: Create Property**

```
Run: Complete Workflows → 3. Create Property with Images
- Uses {{image_url_1}}, {{image_url_2}}, {{image_url_3}}
- Auto-populated from step 2!
```

Done! Property created with your device images! 🎉

---

## 🔧 Supported File Types

The API accepts:

- ✅ **JPEG/JPG** - Photos, property images
- ✅ **PNG** - Screenshots, graphics
- ✅ **GIF** - Animated images
- ✅ **WebP** - Modern format
- ✅ **AVIF** - Latest format

**File Size:**

- Recommended: Under 5MB per image
- Maximum: 10MB per image

---

## ⚡ Quick Test

**Test with a single image:**

1. Open: `Image Upload → Upload File from Device (Single)`
2. Click **Select Files** next to `file`
3. Choose any image from your computer
4. Click **Send**
5. Check response - see Cloudinary URL!

**30 seconds total!** ✅

---

## 🐛 Troubleshooting

### "No file(s) provided"

**Problem:** No file selected  
**Solution:** Click "Select Files" and choose an image

### "Invalid file type"

**Problem:** File is not an image  
**Solution:** Select a .jpg, .png, .gif, or .webp file

### "Cannot upload more than 10 images"

**Problem:** Too many files selected  
**Solution:** Remove some files, max 10 at a time

### "Unauthorized"

**Problem:** Not logged in  
**Solution:** Run `Authentication → Admin Login` first

### File not appearing in request

**Problem:** File wasn't selected properly  
**Solution:**

- Click "Select Files" again
- Make sure file name appears in the row
- Try a different file

---

## 📊 Both Upload Methods Side-by-Side

| Feature                 | Base64 Upload        | File Upload               |
| ----------------------- | -------------------- | ------------------------- |
| **Endpoint**            | `/api/upload/images` | `/api/upload/images/file` |
| **Method**              | POST (JSON)          | POST (FormData)           |
| **Select from device?** | ❌ No                | ✅ Yes                    |
| **Conversion needed?**  | ✅ Yes (to base64)   | ❌ No                     |
| **Postman friendly?**   | Medium               | ✅ Very!                  |
| **Programmatic?**       | ✅ Easy              | Medium                    |
| **Request body**        | JSON                 | multipart/form-data       |
| **Use for testing?**    | Good                 | ✅ Best!                  |

---

## 🎯 Recommendations

**For Postman Testing:**
→ Use **File Upload** (`/api/upload/images/file`) ⭐  
**Easier, faster, more intuitive**

**For Frontend/Programmatic:**
→ Use **Base64 Upload** (`/api/upload/images`)  
**Better for React/Next.js integration**

---

## 📝 Example Response

```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1728467890/properties/abc123def.jpg",
    "publicId": "properties/abc123def"
  },
  "message": "Image uploaded successfully"
}
```

The URL is automatically saved to `{{image_url_1}}` for use in property creation!

---

## 🚀 Next Steps

After uploading images:

1. **Verify Upload**

   - Check Postman console
   - See success message
   - URL saved to environment

2. **Check Cloudinary**

   - Login to [Cloudinary Dashboard](https://console.cloudinary.com/)
   - Go to Media Library
   - Find your images in `properties` folder

3. **Create Property**
   - Run `Complete Workflows → 3. Create Property with Images`
   - Images automatically included!

---

## 📚 Related Docs

- [Postman Collection Guide](POSTMAN-COLLECTION-GUIDE.md) - Full collection guide
- [Property with Images](POSTMAN-PROPERTY-WITH-IMAGES.md) - Complete workflow
- [Cloudinary Setup](CLOUDINARY-IMAGE-UPLOAD.md) - Cloudinary integration

---

**Now you can easily select and upload photos from your device!** 📸🚀
