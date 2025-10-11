# Property Fields Guide

This document describes all the fields required when creating or updating a property in the Auri Keys real estate platform.

## Updated Property Structure

The property model has been enhanced with more detailed fields to better capture real estate listings.

## Required Fields

### 1. Basic Information

| Field         | Type   | Description                    | Example                        |
| ------------- | ------ | ------------------------------ | ------------------------------ |
| `title`       | string | Property title (max 200 chars) | "Luxury Villa in Dubai Marina" |
| `description` | string | Detailed property description  | "Beautiful 5-bedroom villa..." |
| `price`       | number | Property price (must be > 0)   | 5000000                        |

### 2. Transaction Type ✨ NEW

| Field             | Type   | Options             | Description                              |
| ----------------- | ------ | ------------------- | ---------------------------------------- |
| `transactionType` | string | `"buy"` or `"rent"` | Whether the property is for sale or rent |

**Example:**

```json
{
  "transactionType": "buy"
}
```

### 3. Property Type ✨ UPDATED

| Field          | Type   | Options   | Description      |
| -------------- | ------ | --------- | ---------------- |
| `propertyType` | string | See below | Type of property |

**Available Options:**

- `"house"`
- `"apartment"`
- `"penthouse"` ✨ NEW
- `"plot"` ✨ NEW
- `"villa"`
- `"land"`
- `"townhouse"`
- `"duplex"` ✨ NEW

**Example:**

```json
{
  "propertyType": "villa"
}
```

### 4. Property Details ✨ NEW

| Field   | Type   | Description               | Example |
| ------- | ------ | ------------------------- | ------- |
| `beds`  | number | Number of bedrooms (≥ 0)  | 5       |
| `baths` | number | Number of bathrooms (≥ 0) | 6       |
| `size`  | number | Size in square feet (> 0) | 4500    |

**Example:**

```json
{
  "beds": 5,
  "baths": 6,
  "size": 4500
}
```

### 5. Furnishing Status ✨ NEW

| Field              | Type   | Options   | Description      |
| ------------------ | ------ | --------- | ---------------- |
| `furnishingStatus` | string | See below | Furnishing level |

**Available Options:**

- `"furnished"` - Fully furnished
- `"semi-furnished"` - Partially furnished
- `"non-furnished"` - Unfurnished

**Example:**

```json
{
  "furnishingStatus": "furnished"
}
```

### 6. Property Features ✨ NEW

| Field              | Type     | Description                | Example                   |
| ------------------ | -------- | -------------------------- | ------------------------- |
| `propertyFeatures` | string[] | Array of property features | `["Private Pool", "Gym"]` |

**Available Features:**

- `"Private Pool"`
- `"Upgraded"`
- `"Large Plot"`
- `"Close to Park"`
- `"Brand New"`
- `"Vacant on Transfer"`
- `"Waterviews"`
- `"Golf Course View"`
- `"Balcony"`
- `"Garden"`
- `"Maid Room"`
- `"Beach Access"`
- `"Gym"`

**Example:**

```json
{
  "propertyFeatures": [
    "Private Pool",
    "Beach Access",
    "Gym",
    "Balcony",
    "Garden"
  ]
}
```

### 7. Seller Information ✨ NEW

| Field          | Type   | Description           | Example                      |
| -------------- | ------ | --------------------- | ---------------------------- |
| `seller.name`  | string | Name of seller        | "Ahmed Al-Mansouri"          |
| `seller.job`   | string | Job/title of seller   | "Senior Property Consultant" |
| `seller.phone` | string | Phone number          | "+971-50-123-4567"           |
| `seller.email` | string | Email address (valid) | "ahmed@aurikeys.com"         |

**Example:**

```json
{
  "seller": {
    "name": "Ahmed Al-Mansouri",
    "job": "Senior Property Consultant",
    "phone": "+971-50-123-4567",
    "email": "ahmed.almansouri@aurikeys.com"
  }
}
```

### 8. Location (Required)

| Field              | Type   | Description    | Example           |
| ------------------ | ------ | -------------- | ----------------- |
| `location.address` | string | Street address | "123 Marina Walk" |
| `location.city`    | string | City name      | "Dubai"           |
| `location.state`   | string | State/Emirate  | "Dubai"           |
| `location.zipCode` | string | Postal code    | "12345"           |
| `location.country` | string | Country        | "UAE"             |

**Example:**

```json
{
  "location": {
    "address": "123 Marina Walk",
    "city": "Dubai",
    "state": "Dubai",
    "zipCode": "12345",
    "country": "UAE"
  }
}
```

## Optional Fields

| Field       | Type     | Description                             | Default       |
| ----------- | -------- | --------------------------------------- | ------------- |
| `amenities` | string[] | General amenities                       | `[]`          |
| `images`    | string[] | Array of image URLs                     | `[]`          |
| `status`    | string   | `"available"`, `"pending"`, or `"sold"` | `"available"` |
| `featured`  | boolean  | Whether property is featured            | `false`       |
| `yearBuilt` | number   | Year property was built (1800-2026)     | -             |
| `lotSize`   | number   | Lot size (≥ 0)                          | -             |

## Complete Example

### POST Request to Create Property

```json
{
  "title": "Luxury Villa in Dubai Marina",
  "description": "Beautiful 5-bedroom villa with stunning marina views. This property features modern architecture, high-end finishes, and access to world-class amenities.",
  "price": 5000000,
  "transactionType": "buy",
  "propertyType": "villa",
  "beds": 5,
  "baths": 6,
  "size": 4500,
  "furnishingStatus": "furnished",
  "propertyFeatures": [
    "Private Pool",
    "Beach Access",
    "Gym",
    "Balcony",
    "Garden",
    "Maid Room"
  ],
  "seller": {
    "name": "Ahmed Al-Mansouri",
    "job": "Senior Property Consultant",
    "phone": "+971-50-123-4567",
    "email": "ahmed.almansouri@aurikeys.com"
  },
  "location": {
    "address": "123 Marina Walk",
    "city": "Dubai",
    "state": "Dubai",
    "zipCode": "12345",
    "country": "UAE"
  },
  "amenities": ["24/7 Security", "Parking", "Concierge", "Smart Home System"],
  "images": [
    "https://res.cloudinary.com/your-cloud/image/upload/v123/villa1.jpg",
    "https://res.cloudinary.com/your-cloud/image/upload/v123/villa2.jpg"
  ],
  "status": "available",
  "featured": true,
  "yearBuilt": 2023,
  "lotSize": 5000
}
```

### PUT/PATCH Request to Update Property

All fields are optional in update requests. Only include the fields you want to change:

```json
{
  "price": 4800000,
  "status": "pending",
  "propertyFeatures": [
    "Private Pool",
    "Beach Access",
    "Gym",
    "Balcony",
    "Garden",
    "Maid Room",
    "Upgraded"
  ]
}
```

## API Endpoints

### Create Property

```
POST /api/properties
Authorization: Bearer <token>
Content-Type: application/json

Body: CreatePropertyDTO (see example above)
```

### Get All Properties

```
GET /api/properties
Authorization: Bearer <token>
```

### Get Single Property

```
GET /api/properties/{id}
Authorization: Bearer <token>
```

### Update Property

```
PUT /api/properties/{id}
Authorization: Bearer <token>
Content-Type: application/json

Body: UpdatePropertyDTO (partial fields)
```

### Delete Property

```
DELETE /api/properties/{id}
Authorization: Bearer <token>
```

## Validation Rules

1. **Title**: Required, max 200 characters
2. **Description**: Required
3. **Price**: Required, must be greater than 0
4. **Transaction Type**: Required, must be "buy" or "rent"
5. **Property Type**: Required, must be one of the valid types
6. **Beds**: Required, must be ≥ 0
7. **Baths**: Required, must be ≥ 0
8. **Size**: Required, must be > 0
9. **Furnishing Status**: Required, must be one of the valid statuses
10. **Property Features**: Optional, each feature must be from the valid list
11. **Seller**: All seller fields are required (name, job, phone, email with valid format)
12. **Location**: All location fields are required
13. **Year Built**: If provided, must be between 1800 and 2026
14. **Lot Size**: If provided, must be ≥ 0

## Migration Notes

If you have existing properties with the old schema, they will need to be updated to include:

- `transactionType`
- `beds` (migrated from `features.bedrooms`)
- `baths` (migrated from `features.bathrooms`)
- `size` (migrated from `features.squareFeet`)
- `furnishingStatus`
- `propertyFeatures` (optional, can be empty array)
- `seller` object with all fields (name, job, phone, email)

### Old vs New Structure

**Old Structure:**

```json
{
  "features": {
    "bedrooms": 5,
    "bathrooms": 6,
    "squareFeet": 4500,
    "lotSize": 5000,
    "yearBuilt": 2023
  },
  "propertyType": "villa"
}
```

**New Structure:**

```json
{
  "beds": 5,
  "baths": 6,
  "size": 4500,
  "lotSize": 5000,
  "yearBuilt": 2023,
  "transactionType": "buy",
  "propertyType": "villa",
  "furnishingStatus": "furnished",
  "propertyFeatures": ["Private Pool", "Garden"],
  "seller": {
    "name": "Ahmed Al-Mansouri",
    "job": "Senior Property Consultant",
    "phone": "+971-50-123-4567",
    "email": "ahmed@aurikeys.com"
  }
}
```

## Quick Reference

### Minimum Required Fields for Creation

```json
{
  "title": "string",
  "description": "string",
  "price": 1000000,
  "transactionType": "buy",
  "propertyType": "villa",
  "beds": 5,
  "baths": 6,
  "size": 4500,
  "furnishingStatus": "furnished",
  "propertyFeatures": [],
  "seller": {
    "name": "string",
    "job": "string",
    "phone": "string",
    "email": "string"
  },
  "location": {
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
}
```

## Questions?

For API testing, see: [POSTMAN-TESTING-GUIDE.md](./POSTMAN-TESTING-GUIDE.md)

For authentication setup, see: [AUTH-QUICK-REFERENCE.md](./AUTH-QUICK-REFERENCE.md)
