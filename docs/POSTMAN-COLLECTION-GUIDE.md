# Postman Collection Guide - Property with Images

Quick guide to using the updated `postman-collection.json` for testing property creation with Cloudinary images.

---

## 🚀 Quick Start

### 1. Import Collection

1. Open Postman
2. Click **Import** (top left)
3. Select `postman-collection.json`
4. Collection "Auri Keys Property API" will appear in your workspace

---

## 📋 What's Included

### 📁 Authentication

- **Admin Signup** - Create new admin account (auto-saves token)
- **Admin Login** - Login with credentials (auto-saves token)

### 📁 Properties

- **Get All Properties** - Fetch all properties
- **Get All Properties (With Filters)** - Search with filters
- **Get Property by ID** - Fetch single property
- **Create Property** - Create property
- **Create Luxury Villa** - Example villa property
- **Update Property (Partial)** - Partial update
- **Update Property (Full)** - Full update
- **Delete Property** - Remove property

### 📁 Image Upload (NEW!)

- **Upload Single Image** - Upload one image (auto-saves URL)
- **Upload Multiple Images** - Upload up to 10 images (auto-saves all URLs)
- **Delete Image by Public ID** - Delete using public ID
- **Delete Image by URL** - Delete using Cloudinary URL
- **Delete Multiple Images** - Batch delete

### 📁 Complete Workflows (NEW!)

- **1. Login** - Step 1: Get auth token
- **2. Upload Images** - Step 2: Upload to Cloudinary
- **3. Create Property with Images** - Step 3: Create property with uploaded images

---

## ✨ Key Features

### Auto-Save Variables

All requests automatically save important data to environment variables:

| Variable            | Saved By        | Used In                     |
| ------------------- | --------------- | --------------------------- |
| `admin_token`       | Login/Signup    | All authenticated endpoints |
| `property_id`       | Create Property | Get/Update/Delete Property  |
| `image_url_1`       | Upload Images   | Create Property             |
| `image_url_2`       | Upload Images   | Create Property             |
| `image_url_3`       | Upload Images   | Create Property             |
| `image_public_id_1` | Upload Images   | Delete Images               |
| `image_public_id_2` | Upload Images   | Delete Images               |
| `image_public_id_3` | Upload Images   | Delete Images               |

### Console Logging

Each request logs helpful information to Postman console:

- ✅ Success messages
- 📋 Next step instructions
- 🎉 Workflow completion

---

## 🎯 Recommended Workflow

### Option 1: Use "Complete Workflows" Folder

**Easiest way to test end-to-end:**

1. Navigate to **Complete Workflows** folder
2. Run **"1. Login"**
   - Check console: "✅ Step 1: Login successful"
   - Check console: "📋 Next step: Run '2. Upload Images'"
3. Run **"2. Upload Images"**
   - Check console: "✅ Step 2: 3 images uploaded successfully"
   - Check console: "📋 Next step: Run '3. Create Property with Images'"
4. Run **"3. Create Property with Images"**
   - Check console: "🎉 Workflow complete! Property created with images."

**That's it!** The property is created with Cloudinary images.

---

### Option 2: Manual Step-by-Step

If you want more control:

#### Step 1: Authentication

```
1. Run "Authentication → Admin Login"
2. Token automatically saved to {{admin_token}}
```

#### Step 2: Upload Images

```
1. Go to "Image Upload → Upload Multiple Images"
2. (Optional) Replace test base64 images with your own
3. Run the request
4. URLs automatically saved to {{image_url_1}}, {{image_url_2}}, etc.
```

#### Step 3: Create Property

```
1. Go to "Properties → Create Property"
2. Modify the request body
3. In the "images" array, use: ["{{image_url_1}}", "{{image_url_2}}", ...]
4. Run the request
5. Property created with Cloudinary images!
```

---

## 🔧 Customization

### Replace Test Images

The collection uses tiny 1x1 pixel test images by default. To use real images:

1. Convert your image to base64 (see options below)
2. Replace the base64 string in the request body
3. Keep the `data:image/jpeg;base64,` prefix

**Convert Image to Base64:**

**Option A - Online Tool:**

- Go to https://www.base64-image.de/
- Upload image
- Copy the result

**Option B - Node.js Script:**

```javascript
const fs = require("fs");
const imagePath = "./my-image.jpg";
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = imageBuffer.toString("base64");
const dataUri = `data:image/jpeg;base64,${base64Image}`;
console.log(dataUri);
```

**Option C - Command Line (Mac/Linux):**

```bash
base64 -i my-image.jpg | pbcopy
# Then manually add "data:image/jpeg;base64," prefix
```

---

## 📊 Environment Variables

The collection includes these variables:

| Variable            | Default                 | Auto-Set | Description               |
| ------------------- | ----------------------- | -------- | ------------------------- |
| `base_url`          | `http://localhost:3000` | No       | API base URL              |
| `admin_token`       | Empty                   | Yes      | JWT auth token            |
| `admin_email`       | Empty                   | Yes      | Logged in admin email     |
| `property_id`       | Empty                   | Yes      | Last created property ID  |
| `image_url_1`       | Empty                   | Yes      | First uploaded image URL  |
| `image_url_2`       | Empty                   | Yes      | Second uploaded image URL |
| `image_url_3`       | Empty                   | Yes      | Third uploaded image URL  |
| `image_public_id_1` | Empty                   | Yes      | First image public ID     |
| `image_public_id_2` | Empty                   | Yes      | Second image public ID    |
| `image_public_id_3` | Empty                   | Yes      | Third image public ID     |

**View Variables:**

- Click the collection name
- Go to "Variables" tab
- See current values

---

## 🎨 Testing Different Scenarios

### Test 1: Single Image Property

```
1. Run "Image Upload → Upload Single Image"
2. Run "Properties → Create Property"
3. Modify images to: ["{{image_url_1}}"]
```

### Test 2: Multiple Images Property

```
1. Run "Image Upload → Upload Multiple Images"
2. Run "Properties → Create Property"
3. Use: ["{{image_url_1}}", "{{image_url_2}}", "{{image_url_3}}"]
```

### Test 3: Update Property Images

```
1. Create property (with or without images)
2. Upload new images
3. Run "Properties → Update Property (Partial)"
4. Update only images: {"images": ["{{image_url_1}}", "{{image_url_2}}"]}
```

### Test 4: Clean Up Old Images

```
1. Delete property images from Cloudinary
2. Run "Image Upload → Delete Multiple Images"
3. Uses saved public IDs automatically
```

---

## 🐛 Troubleshooting

### "Unauthorized" Error

**Problem:** Token missing or expired  
**Solution:** Run "Authentication → Admin Login" first

### "No image(s) provided" Error

**Problem:** Base64 string missing or invalid  
**Solution:** Check the base64 string includes `data:image/...;base64,` prefix

### Images Not Appearing in Cloudinary

**Problem:** Cloudinary credentials not set  
**Solution:**

1. Check `.env.local` has all Cloudinary variables
2. Restart server (`npm run dev`)

### {{image_url_1}} Shows as Literal Text

**Problem:** Variable not set  
**Solution:** Run image upload request first

### Request Times Out

**Problem:** Server not running or wrong URL  
**Solution:**

1. Check server is running: `npm run dev`
2. Verify `base_url` is `http://localhost:3000`

---

## 💡 Pro Tips

### 1. Use Postman Console

Press `Ctrl + Alt + C` (Windows) or `Cmd + Alt + C` (Mac) to open console and see detailed logs.

### 2. Check Response Times

Look at the time in bottom right of each response to monitor API performance.

### 3. Save Responses

Click "Save Response" to keep example responses for documentation.

### 4. Create Test Scripts

Add custom test scripts to validate responses automatically.

### 5. Use Collection Runner

Run entire workflow automatically:

1. Click collection → Run
2. Select "Complete Workflows" folder
3. Click "Run Auri Keys Property API"

---

## 📚 Related Documentation

- [POSTMAN-PROPERTY-WITH-IMAGES.md](POSTMAN-PROPERTY-WITH-IMAGES.md) - Detailed guide
- [CLOUDINARY-IMAGE-UPLOAD.md](CLOUDINARY-IMAGE-UPLOAD.md) - Cloudinary integration guide
- [README-API.md](README-API.md) - Full API documentation
- [POSTMAN-TESTING-GUIDE.md](POSTMAN-TESTING-GUIDE.md) - General testing guide

---

## 🎉 Success!

You're now ready to test property creation with Cloudinary images!

**Quick Test:**

1. Run "Complete Workflows → 1. Login"
2. Run "Complete Workflows → 2. Upload Images"
3. Run "Complete Workflows → 3. Create Property with Images"

Check Postman console for success messages and next steps! 🚀
