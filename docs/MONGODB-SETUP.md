# MongoDB Setup Guide for Auri Keys

This guide will help you set up MongoDB for your property management system.

## Prerequisites

- Node.js installed
- MongoDB account (for MongoDB Atlas) OR MongoDB installed locally

---

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free tier is sufficient for development)

### Step 2: Get Your Connection String

1. In MongoDB Atlas Dashboard, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (it looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual database user password
5. Add database name after `.net/` → `.net/auri-keys?retryWrites=true&w=majority`

### Step 3: Configure Network Access

1. In Atlas, go to **"Network Access"**
2. Click **"Add IP Address"**
3. For development, you can add `0.0.0.0/0` (allows access from anywhere)
4. For production, add only your server's IP address

### Step 4: Create Database User

1. Go to **"Database Access"**
2. Click **"Add New Database User"**
3. Create username and password
4. Give **"Read and write to any database"** permission

---

## Option 2: Local MongoDB

### Step 1: Install MongoDB Locally

**Windows:**

- Download MongoDB from [official website](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**Mac (using Homebrew):**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Step 2: Connection String for Local MongoDB

Your connection string will be:

```
mongodb://localhost:27017/auri-keys
```

---

## Environment Setup

### Step 1: Create `.env.local` File

In your project root, create a `.env.local` file:

```bash
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/auri-keys?retryWrites=true&w=majority

# OR for Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/auri-keys
```

⚠️ **Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

### Step 2: Verify Connection

Start your development server:

```bash
npm run dev
```

Then make a test API call:

```bash
# Get all properties (will be empty initially)
curl http://localhost:3000/api/properties
```

If connected successfully, you'll see:

```json
{
  "success": true,
  "data": [],
  "message": "Found 0 properties"
}
```

---

## Seeding Sample Data

### Option 1: Use the API to Create Sample Properties

```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Luxury Beachfront Villa",
    "description": "Stunning beachfront property with panoramic ocean views",
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
    "amenities": ["Pool", "Beach Access", "Smart Home", "Garage", "Garden"],
    "images": ["/assets/images/auri-keys.jpeg"],
    "propertyType": "villa",
    "status": "available",
    "featured": true
  }'
```

### Option 2: Use MongoDB Compass (GUI Tool)

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect using your connection string
3. Navigate to `auri-keys` database → `properties` collection
4. Click **"Add Data"** → **"Insert Document"**
5. Paste the JSON from the example above

### Option 3: Create a Seed Script (Recommended)

A seed script has been created for you at `scripts/seed-db.ts`. Run it with:

```bash
npm run seed
```

---

## Verifying Your Setup

### 1. Check Database Connection

In your browser console or API testing tool, call:

```
GET http://localhost:3000/api/properties
```

### 2. View Database in MongoDB Compass

1. Open MongoDB Compass
2. Connect using your connection string
3. You should see:
   - Database: `auri-keys`
   - Collection: `properties`
   - Documents: Your property listings

### 3. Test CRUD Operations

**Create:**

```bash
POST http://localhost:3000/api/properties
```

**Read:**

```bash
GET http://localhost:3000/api/properties
GET http://localhost:3000/api/properties/[id]
```

**Update:**

```bash
PUT http://localhost:3000/api/properties/[id]
```

**Delete:**

```bash
DELETE http://localhost:3000/api/properties/[id]
```

---

## MongoDB Schema Structure

The Property model includes the following fields:

```typescript
{
  _id: ObjectId,              // Auto-generated MongoDB ID
  title: String,              // Required
  description: String,        // Required
  price: Number,              // Required, min: 0
  location: {
    address: String,          // Required
    city: String,             // Required
    state: String,            // Required
    zipCode: String,          // Required
    country: String           // Required
  },
  features: {
    bedrooms: Number,         // Required, min: 0
    bathrooms: Number,        // Required, min: 0
    squareFeet: Number,       // Required, min: 0
    lotSize: Number,          // Optional
    yearBuilt: Number         // Optional, 1800-current year
  },
  amenities: [String],        // Array of amenities
  images: [String],           // Array of image URLs
  propertyType: String,       // Enum: house, apartment, condo, etc.
  status: String,             // Enum: available, pending, sold
  listingDate: String,        // ISO date string
  featured: Boolean,          // Default: false
  createdAt: Date,           // Auto-generated timestamp
  updatedAt: Date            // Auto-updated timestamp
}
```

### Indexes

The following indexes are created for performance:

- `location.city` - For city-based searches
- `price` - For price range queries
- `propertyType` - For filtering by type
- `status` - For filtering by availability
- `featured` - For featuring properties

---

## Troubleshooting

### Connection Error: "MongooseServerSelectionError"

**Problem:** Cannot connect to MongoDB

**Solutions:**

1. Verify your connection string in `.env.local`
2. Check if MongoDB service is running (for local MongoDB)
3. Check Network Access in MongoDB Atlas (for cloud)
4. Verify your username/password

### Error: "Please define the MONGODB_URI environment variable"

**Problem:** Environment variable not found

**Solutions:**

1. Ensure `.env.local` file exists in project root
2. Restart your development server after creating/editing `.env.local`
3. Check that the variable is named exactly `MONGODB_URI`

### Error: "Validation failed"

**Problem:** Data doesn't match schema requirements

**Solutions:**

1. Check that all required fields are provided
2. Verify data types match the schema (e.g., price is a number)
3. Check enum values (propertyType, status)

### Warning: "DeprecationWarning: collection.ensureIndex"

**Solution:** Update mongoose to the latest version:

```bash
npm update mongoose
```

---

## Production Considerations

### 1. Security

- ✅ Never commit `.env.local` or expose connection strings
- ✅ Use environment variables on your hosting platform
- ✅ Restrict IP addresses in MongoDB Atlas Network Access
- ✅ Use strong passwords for database users
- ✅ Enable authentication on local MongoDB

### 2. Performance

- ✅ Indexes are already configured
- ✅ Use pagination for large datasets (implement if needed)
- ✅ Consider adding compound indexes for common query patterns

### 3. Backup

- ✅ MongoDB Atlas provides automatic backups (paid tiers)
- ✅ For local MongoDB, set up regular backup scripts
- ✅ Use `mongodump` and `mongorestore` for manual backups

### 4. Monitoring

- ✅ Use MongoDB Atlas monitoring dashboard
- ✅ Set up alerts for performance issues
- ✅ Monitor connection pool usage

---

## Next Steps

1. ✅ Set up MongoDB (Cloud or Local)
2. ✅ Configure `.env.local` with connection string
3. ✅ Test the connection
4. ✅ Seed sample data
5. ✅ Test all CRUD operations
6. 📝 Integrate with your frontend components
7. 📝 Add authentication/authorization
8. 📝 Deploy to production

---

## Useful Commands

```bash
# Start development server
npm run dev

# Seed database with sample data
npm run seed

# Check MongoDB connection
curl http://localhost:3000/api/properties

# View MongoDB logs (local)
tail -f /usr/local/var/log/mongodb/mongo.log  # Mac
tail -f /var/log/mongodb/mongod.log           # Linux
```

---

## Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

For more help, check `README-API.md` for API documentation.
