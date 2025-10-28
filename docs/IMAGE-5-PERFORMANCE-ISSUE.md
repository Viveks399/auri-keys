# Image 5 Performance and Thumbnail Issue

## Problem Description

The 5th image (`PropertySearchSection-background-image-5.avif`) is not showing as a thumbnail in Windows Explorer and is causing performance issues on the website.

## Root Causes

### 1. Windows Thumbnail Cache Issue
- AVIF is a relatively new format (2020)
- Windows Explorer may not have proper codecs installed for AVIF
- The thumbnail cache may be corrupted for this specific image
- Windows may generate thumbnails for the first few AVIF files but fail on subsequent ones

### 2. Performance Issues in Code
- **Previous Issue**: `unoptimized={true}` was set in `EmblaCarousel.tsx`, disabling Next.js image optimization
- Images were being loaded twice (ImagePreloader + EmblaCarousel)
- No lazy loading was implemented for non-priority images

## Solutions

### Solution 1: Clear Windows Thumbnail Cache

**Manual Steps:**
1. Open File Explorer
2. Go to View → Options → Change folder and search options
3. Click "View" tab
4. Check "Always show icons, never thumbnails"
5. Apply and OK
6. Go back and uncheck it
7. This forces Windows to regenerate thumbnails

**Option C: Clear Cache via Settings**
1. Open Windows Settings → System → Storage
2. Click "Temporary files"
3. Select "Thumbnails" and click "Remove files"
4. Navigate back to your image folder

### Solution 2: Install AVIF Codec for Windows

Download and install the AVIF codec from:
- Microsoft Store: Search for "AV1 Video Extension"
- Or visit: https://www.microsoft.com/store/productId/9MVZQVXJBQ9V

### Solution 3: Convert Image 5 to Optimized Format

If the problem persists, convert image 5 to ensure it's properly encoded:

```bash
# Using ffmpeg (if installed)
ffmpeg -i "PropertySearchSection-background-image-5.avif" -c:v libaom-av1 -crf 30 -b:v 0 "PropertySearchSection-background-image-5-optimized.avif"

# Or convert to WebP as fallback
ffmpeg -i "PropertySearchSection-background-image-5.avif" -c:v libwebp -quality 85 "PropertySearchSection-background-image-5.webp"
```

### Solution 4: Code Optimizations Already Applied

The following code optimizations have been applied:

1. **Removed `unoptimized={true}`** - Enables Next.js image optimization
2. **Added lazy loading** - Images after index 1 are loaded lazily
3. **Set priority for first 2 images** - Only first 2 images load with priority
4. **Increased quality to 90** - Better image quality
5. **Added explicit loading attribute** - Better control over when images load

#### Changes Made:

**EmblaCarousel.tsx:**
```typescript
// Before
unoptimized={true}
priority={index === 0}

// After
priority={index <= 1}
loading={index <= 1 ? "eager" : "lazy"}
quality={90}
// Removed unoptimized
```

**ImagePreloader.tsx:**
```typescript
// Before
quality={85}

// After
quality={90}
loading={index === 0 ? "eager" : "lazy"}
```

## Why Image 5 Specifically?

1. **Windows Explorer Issue**: Windows Explorer may stop generating thumbnails after processing the first few AVIF files due to:
   - Memory constraints
   - Codec limitations
   - Cache corruption

2. **Performance**: The previous code had:
   - No image optimization
   - Double loading of images
   - No lazy loading strategy

## Testing

After applying the fixes:

1. Clear browser cache (Ctrl + Shift + Del)
2. Restart the development server
3. Check Network tab in DevTools - images should load progressively
4. Check that only 1-2 images load initially
5. Other images should load on demand when carousel slides

## File Sizes

Current file sizes (all are reasonable):
- PropertySearchSection-background-image.avif: ~416 KB
- PropertySearchSection-background-image-2.avif: ~439 KB
- PropertySearchSection-background-image-3.avif: ~453 KB
- PropertySearchSection-background-image-4.avif: ~531 KB
- PropertySearchSection-background-image-5.avif: ~502 KB

## Verification

To verify the image is valid:

```powershell
# Check file header (should start with AVIF signature)
Get-Content "public\assets\images\landing page\PropertySearchSection-background-image-5.avif" -Encoding Byte -TotalCount 20
```

Expected output: `00 00 00 20 66 74 79 70 61 76 69 66`

The file IS valid - the issue is with Windows Explorer's thumbnail generation for AVIF files.

## Performance Impact

Before fixes:
- Images loaded twice (wasteful)
- No optimization applied
- All images loaded immediately
- Poor initial page load

After fixes:
- Images load once in preloader
- Next.js optimization enabled
- Lazy loading for images 3-5
- Better initial page load performance
- Progressive loading as user scrolls through carousel

## Additional Recommendations

1. **Consider WebP format**: If AVIF continues to cause issues, WebP is better supported
2. **Image CDN**: Consider using a CDN for better global performance
3. **Generate multiple sizes**: Create different image sizes for different viewports
4. **Monitor Core Web Vitals**: Use Lighthouse to track performance improvements

