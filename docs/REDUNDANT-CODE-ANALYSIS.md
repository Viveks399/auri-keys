# Redundant Code Analysis

## Issues Found

### 1. **Double Image Loading** ⚠️ **CRITICAL**
**Location**: `PropertySearchSection.tsx` + `EmblaCarousel.tsx`

**Problem**:
- Images are loaded TWICE:
  1. In `ImagePreloader` component (hidden container)
  2. In `EmblaCarousel` (actual carousel images)
- This wastes bandwidth and processing power
- Same images downloaded twice from server

**Current Implementation**:
```typescript
// PropertySearchSection.tsx - Line 97
<ImagePreloader images={imageSources} onAllLoaded={handleCarouselImagesLoaded} />

// Then in EmblaCarousel.tsx, images are loaded again in MemoizedSlide
```

**Solution**: Remove ImagePreloader OR remove image loading from EmblaCarousel. Choose one approach.

---

### 2. **Fake Loading State Tracking** ⚠️ **REDUNDANT**
**Location**: `EmblaCarousel.tsx` Lines 131-140

**Problem**:
```typescript
React.useEffect(() => {
  // Mark all images as "already preloaded" since ImagePreloader handles it
  const timer = setTimeout(() => {
    slides.forEach((_, index) => {
      handleImageLoad(index);  // ← Marks all images as loaded after 50ms
    });
  }, 50);
  
  return () => clearTimeout(timer);
}, [slides, handleImageLoad]);
```

**Issue**:
- Immediately marks ALL images as loaded after 50ms
- Makes `loadedImages` state meaningless
- Makes `imageLoaded` state in MemoizedSlide useless
- Skeleton/loading animations never properly trigger
- The actual image load events from MemoizedSlide are ignored

**Result**: Loading state is fake - it doesn't track actual image loading

---

### 3. **Redundant State Variables**
**Location**: `EmblaCarousel.tsx` Lines 107-108

**Current State**:
```typescript
const [loadedImages, setLoadedImages] = React.useState<Set<number>>(new Set())
const [imagesVisible, setImagesVisible] = React.useState(false)
```

**In MemoizedSlide**:
```typescript
const [imageLoaded, setImageLoaded] = React.useState(false);
```

**Problem**:
- 3 different states tracking image loading
- `loadedImages` (Set of indices)
- `imagesVisible` (boolean)
- `imageLoaded` (boolean per slide)
- They all track the same concept: "is image loaded?"

---

### 4. **Autoplay Initialization** (Minor redundancy)
**Location**: `EmblaCarousel.tsx` Multiple places

**Problem**:
- Autoplay starts in line 286-291 useEffect
- Also starts in visibility/focus change handlers
- Could potentially start twice

---

## Recommendations

### Option 1: Keep ImagePreloader, Simplify EmblaCarousel (RECOMMENDED)

**Pros**:
- Preloads images before carousel renders
- Smooth experience
- No redundant state

**Changes Needed**:
1. Remove the fake loading effect (lines 131-140)
2. Remove `loadedImages` and `imagesVisible` state
3. Keep MemoizedSlide's individual `imageLoaded` state for skeleton
4. Listen to actual image load events

### Option 2: Remove ImagePreloader, Load in Carousel

**Pros**:
- Simpler architecture
- Only load images once
- No redundant preloading

**Cons**:
- Slower initial experience (no preloading)

**Changes Needed**:
1. Remove ImagePreloader usage
2. Keep actual loading tracking in EmblaCarousel
3. Remove fake loading effect

---

## Suggested Clean Up

### Remove These:
1. ❌ Lines 131-140 in EmblaCarousel.tsx (fake loading effect)
2. ❌ `loadedImages` state (Set<number>) - not tracking real loads
3. ❌ `imagesVisible` state - redundant
4. ❌ ImagePreloader component usage - double loading

### Keep These:
1. ✅ MemoizedSlide's `imageLoaded` state (real tracking)
2. ✅ Actual `onLoad` handlers on images
3. ✅ Skeleton/loading animations (they'll work properly)

---

## Performance Impact

**Current**: 
- Images loaded TWICE = 2x bandwidth
- Image sizes: ~416KB + 439KB + 453KB + 531KB = ~1.84 MB
- Total with double loading: **~3.68 MB**
- Plus browser has to render images twice

**After Fix**:
- Images loaded once = 1x bandwidth  
- Total: **~1.84 MB**
- **50% bandwidth savings**
- Faster page loads
- Better performance

---

## Code Smells

1. **Unused State**: `loadedImages` tracks nothing meaningful (always marked as loaded immediately)
2. **Double Network Requests**: Same images fetched twice
3. **Fake Tracking**: Loading state doesn't reflect reality
4. **Dead Code**: Lines 131-140 serve no real purpose
5. **React Anti-pattern**: Using setTimeout to fake async state

