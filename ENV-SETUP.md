# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# MongoDB Connection String
# Replace with your actual MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/auri-keys

# For MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auri-keys?retryWrites=true&w=majority

# JWT Secret for Authentication
# IMPORTANT: Change this to a strong, random secret in production!
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

---

## Generating a Secure JWT Secret

### Method 1: Using Node.js

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Method 2: Using OpenSSL

```bash
openssl rand -hex 32
```

### Method 3: Online Generator

Use a secure password generator with 64+ characters

---

## Example `.env.local` File

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/auri-keys

# JWT Authentication
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

## Environment Variables Explained

### MONGODB_URI

- **Purpose:** Database connection string
- **Format (Local):** `mongodb://localhost:27017/database-name`
- **Format (Atlas):** `mongodb+srv://user:pass@cluster.net/db?options`
- **Required:** Yes
- **Default:** None (must be set)

### JWT_SECRET

- **Purpose:** Secret key for signing JWT tokens
- **Format:** Any string (recommended: 32+ character random string)
- **Required:** Yes
- **Default:** `your-secret-key-change-in-production` (⚠️ insecure!)

---

## Security Best Practices

### 1. Never Commit `.env.local`

✅ Already in `.gitignore`

```gitignore
.env*
```

### 2. Use Different Secrets per Environment

- Development: One secret
- Staging: Different secret
- Production: Strong, unique secret

### 3. Rotate Secrets Regularly

- Change JWT_SECRET periodically
- Invalidates all existing tokens
- Users need to re-login

### 4. Store Secrets Securely

- Use environment variables in production
- Use secret management services:
  - AWS Secrets Manager
  - Google Cloud Secret Manager
  - HashiCorp Vault
  - Vercel Environment Variables

---

## Platform-Specific Setup

### Vercel

1. Go to Project Settings
2. Navigate to Environment Variables
3. Add:
   - `MONGODB_URI` = your connection string
   - `JWT_SECRET` = your secret key
4. Deploy

### Netlify

1. Go to Site Settings → Environment
2. Add variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
3. Redeploy

### Railway

1. Go to Variables tab
2. Add:
   - `MONGODB_URI`
   - `JWT_SECRET`
3. Deploy

### Heroku

```bash
heroku config:set MONGODB_URI="your-connection-string"
heroku config:set JWT_SECRET="your-secret-key"
```

---

## Troubleshooting

### Error: "Please define the MONGODB_URI environment variable"

**Solution:**

1. Create `.env.local` in project root
2. Add `MONGODB_URI=...`
3. Restart dev server

### Error: "Invalid or expired token"

**Solution:**

1. Check JWT_SECRET is set
2. Ensure it hasn't changed
3. Login again to get new token

### Error: "Failed to connect to MongoDB"

**Solution:**

1. Verify connection string format
2. Check MongoDB is running (local)
3. Check network access (Atlas)
4. Verify credentials

---

## Checking Environment Variables

### In Development

```javascript
// Add to any server-side file temporarily
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set ✅" : "Missing ❌");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set ✅" : "Missing ❌");
```

### Terminal Check

```bash
# Mac/Linux
echo $MONGODB_URI
echo $JWT_SECRET

# Windows PowerShell
$env:MONGODB_URI
$env:JWT_SECRET
```

---

## Complete Setup Checklist

- [ ] Create `.env.local` file in project root
- [ ] Add `MONGODB_URI` with valid connection string
- [ ] Add `JWT_SECRET` with strong random key (32+ chars)
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Restart development server (`npm run dev`)
- [ ] Test database connection
- [ ] Test authentication (signup/login)
- [ ] For production: Add env vars to hosting platform
- [ ] For production: Use different JWT_SECRET

---

## Quick Test

After setting up `.env.local`:

```bash
# 1. Start server
npm run dev

# 2. Test database connection
curl http://localhost:3000/api/properties

# 3. Test authentication
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

If all work without errors, you're good to go! ✅

---

## Template `.env.local`

Copy and fill in:

```bash
# MongoDB Connection
MONGODB_URI=

# JWT Authentication Secret
JWT_SECRET=

# Optional: Add more as needed
# NODE_ENV=development
# PORT=3000
```

---

**Environment setup complete! 🎉**
