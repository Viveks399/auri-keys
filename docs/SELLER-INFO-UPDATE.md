# Seller Information Update

## ✅ Changes Made

Added seller information fields to all properties. This allows you to store contact details for the person or agent listing the property.

## 🆕 New Fields

All seller fields are **required** when creating a property:

| Field          | Type   | Required | Description                  | Example                         |
| -------------- | ------ | -------- | ---------------------------- | ------------------------------- |
| `seller.name`  | string | ✅       | Full name of seller          | "Ahmed Al-Mansouri"             |
| `seller.job`   | string | ✅       | Job title/role               | "Senior Property Consultant"    |
| `seller.phone` | string | ✅       | Contact phone number         | "+971-50-123-4567"              |
| `seller.email` | string | ✅       | Email (must be valid format) | "ahmed.almansouri@aurikeys.com" |

## 📝 Example Usage

### Creating a Property with Seller Info

```json
{
  "title": "Luxury Villa in Dubai Marina",
  "description": "Beautiful 5-bedroom villa with stunning views",
  "price": 5000000,
  "transactionType": "buy",
  "propertyType": "villa",
  "beds": 5,
  "baths": 6,
  "size": 4500,
  "furnishingStatus": "furnished",
  "propertyFeatures": ["Private Pool", "Beach Access", "Gym"],
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
  }
}
```

### Updating Seller Information

You can update seller information partially:

```json
{
  "seller": {
    "phone": "+971-50-999-8888",
    "email": "ahmed.new@aurikeys.com"
  }
}
```

## ✅ Validation

### Email Validation

The seller email is validated using regex to ensure proper format:

- ✅ `john.doe@example.com`
- ✅ `agent_123@realty.co.uk`
- ❌ `invalid.email` (no @ or domain)
- ❌ `@nodomain.com` (no username)

### All Fields Required on Creation

When creating a new property, all 4 seller fields must be provided:

- `seller.name` - Cannot be empty
- `seller.job` - Cannot be empty
- `seller.phone` - Cannot be empty
- `seller.email` - Must be valid email format

## 🔧 Updated Files

1. **Type Definitions** (`src/types/property.ts`)

   - Added `seller` object to Property interface
   - Added to CreatePropertyDTO
   - Added to UpdatePropertyDTO (optional fields)

2. **Database Model** (`src/models/Property.ts`)

   - Added seller schema with validation
   - Email format validation
   - Required field constraints

3. **API Validation** (`src/app/api/properties/route.ts`)

   - Added seller object validation
   - Validates all seller sub-fields

4. **Postman Collection** (`postman-collection.json`)

   - Updated all property creation examples
   - Added seller information to all requests

5. **Constants** (`src/types/property-constants.ts`)

   - Updated example property with seller info

6. **Documentation**
   - Updated PROPERTY-FIELDS-GUIDE.md
   - Updated PROPERTY-UPDATE-SUMMARY.md

## 🚀 Testing in Postman

The Postman collection has been updated with seller information in all property creation requests. Simply import the updated `postman-collection.json` and test the API.

### Quick Test

1. **Login** using the "Admin Login" request
2. **Create Property** using any of the property creation requests - they now include seller info

Example from Postman:

```json
{
  "seller": {
    "name": "John Smith",
    "job": "Real Estate Agent",
    "phone": "+1-555-123-4567",
    "email": "john.smith@realestate.com"
  }
}
```

## ❗ Important Notes

1. **Breaking Change**: Properties created without seller information will fail validation
2. **Migration Needed**: Existing properties in your database will need to be updated to include seller information
3. **Email Validation**: The email format is strictly validated
4. **All Fields Required**: You cannot omit any seller field when creating a property

## 📚 Related Documentation

- [Property Fields Guide](./PROPERTY-FIELDS-GUIDE.md) - Complete reference
- [Property Update Summary](./PROPERTY-UPDATE-SUMMARY.md) - All recent changes
- [Postman Testing Guide](./POSTMAN-TESTING-GUIDE.md) - API testing

---

**Status:** ✅ Complete
**Date:** October 10, 2025
