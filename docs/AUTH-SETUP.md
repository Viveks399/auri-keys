# Admin Authentication System - Complete Guide

## Overview

A complete admin authentication system with signup, login, and protected API routes using JWT tokens and bcrypt password hashing.

---

## What Was Created

### 1. **Authentication Backend**

- ✅ Admin user model with email/password
- ✅ Password hashing with bcrypt
- ✅ JWT token generation and verification
- ✅ Signup endpoint (`/api/auth/signup`)
- ✅ Login endpoint (`/api/auth/login`)
- ✅ Authentication middleware for protected routes

### 2. **Protected API Routes**

- ✅ POST `/api/properties` - Create property (requires auth)
- ✅ PUT `/api/properties/[id]` - Update property (requires auth)
- ✅ PATCH `/api/properties/[id]` - Partial update (requires auth)
- ✅ DELETE `/api/properties/[id]` - Delete property (requires auth)
- ✅ GET endpoints remain public

### 3. **Frontend Components**

- ✅ Admin Login page (`/admin/login`)
- ✅ Admin Signup page (`/admin/signup`)
- ✅ Beautiful, responsive UI with Tailwind CSS

### 4. **Packages Installed**

- ✅ bcryptjs - Password hashing
- ✅ jsonwebtoken - JWT authentication
- ✅ @types/bcryptjs - TypeScript types
- ✅ @types/jsonwebtoken - TypeScript types

---

## Environment Setup

### Update `.env.local`

Add JWT secret to your `.env.local` file:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/auri-keys

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

⚠️ **Important:** Use a strong, random secret in production! Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## File Structure

```
src/
├── types/
│   └── admin.ts                    # Admin & Auth type definitions
├── models/
│   └── Admin.ts                    # Admin Mongoose schema
├── lib/
│   ├── auth.ts                     # Auth utilities (hash, JWT)
│   └── authMiddleware.ts           # Authentication middleware
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts     # POST - Admin signup
│   │   │   └── login/route.ts      # POST - Admin login
│   │   └── properties/
│   │       ├── route.ts            # Protected POST endpoint
│   │       └── [id]/route.ts       # Protected PUT, PATCH, DELETE
│   └── admin/
│       ├── login/page.tsx          # Login page
│       └── signup/page.tsx         # Signup page
└── components/
    ├── AdminLogin.tsx              # Login component
    └── AdminSignup.tsx             # Signup component
```

---

## API Endpoints

### 1. Signup - Create Admin Account

**POST** `/api/auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "67890abc...",
    "email": "admin@example.com",
    "name": "John Doe",
    "role": "admin",
    "isActive": true,
    "createdAt": "2025-10-08T...",
    "updatedAt": "2025-10-08T..."
  },
  "message": "Admin account created successfully"
}
```

**Error Responses:**

- `400` - Missing required fields or password too short
- `409` - Email already exists
- `500` - Server error

---

### 2. Login - Admin Authentication

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "67890abc...",
    "email": "admin@example.com",
    "name": "John Doe",
    "role": "admin",
    "isActive": true,
    "createdAt": "2025-10-08T...",
    "updatedAt": "2025-10-08T..."
  },
  "message": "Login successful"
}
```

**Error Responses:**

- `400` - Missing email or password
- `401` - Invalid credentials
- `403` - Account deactivated
- `500` - Server error

---

## Using Protected Endpoints

### How to Authenticate

After login/signup, you receive a JWT token. Include it in the `Authorization` header for protected endpoints:

**Example: Create Property (Protected)**

```bash
POST http://localhost:3000/api/properties
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json

Body:
{
  "title": "New Property",
  "price": 500000,
  ...
}
```

### In Postman

1. Go to **Headers** tab
2. Add header:
   - Key: `Authorization`
   - Value: `Bearer {your-token-here}`
3. Send request

### In JavaScript/Frontend

```javascript
const token = localStorage.getItem("adminToken");

const response = await fetch("/api/properties", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(propertyData),
});
```

---

## Frontend Usage

### 1. Access Login Page

Navigate to: `http://localhost:3000/admin/login`

### 2. Create Admin Account

Navigate to: `http://localhost:3000/admin/signup`

Fill in:

- Full Name
- Email Address
- Password (min 6 characters)
- Confirm Password

### 3. Token Storage

After successful login/signup:

- Token is stored in `localStorage` as `adminToken`
- Admin data is stored as `adminData`

### 4. Use Token in API Calls

```javascript
// Get token from localStorage
const token = localStorage.getItem("adminToken");

// Include in API requests
fetch("/api/properties", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

---

## Security Features

### 1. Password Security

- ✅ Passwords hashed with bcrypt (salt rounds: 10)
- ✅ Minimum 6 characters required
- ✅ Passwords never returned in API responses

### 2. JWT Tokens

- ✅ Tokens expire in 7 days
- ✅ Contains admin ID, email, and role
- ✅ Verified on every protected request

### 3. Protected Routes

- ✅ POST, PUT, PATCH, DELETE require authentication
- ✅ GET requests remain public
- ✅ Unauthorized requests return 401

### 4. Email Validation

- ✅ Valid email format required
- ✅ Lowercase conversion
- ✅ Unique email constraint

---

## Admin Roles

Two roles are supported:

1. **admin** - Standard admin user (default)
2. **superadmin** - Higher privileges (for future features)

Set role during signup:

```json
{
  "name": "John Doe",
  "email": "admin@example.com",
  "password": "password123",
  "role": "superadmin" // Optional, defaults to "admin"
}
```

---

## Testing Authentication

### 1. Create Admin Account

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "email": "test@admin.com",
    "password": "test123"
  }'
```

Save the token from the response.

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@admin.com",
    "password": "test123"
  }'
```

### 3. Test Protected Endpoint

```bash
# With token (should work)
curl -X POST http://localhost:3000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{...property data...}'

# Without token (should fail with 401)
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{...property data...}'
```

---

## Logout Implementation

Currently, logout is client-side only (remove token from storage):

```javascript
// Logout function
function logout() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
  window.location.href = "/admin/login";
}
```

For enhanced security, implement token blacklisting or use refresh tokens.

---

## Error Handling

### Common Errors

**401 Unauthorized**

```json
{
  "success": false,
  "error": "No token provided. Please include Authorization header with Bearer token"
}
```

**401 Invalid Token**

```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

**409 Email Exists**

```json
{
  "success": false,
  "error": "An admin with this email already exists"
}
```

---

## Production Checklist

- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Use HTTPS for all requests
- [ ] Implement refresh tokens for better security
- [ ] Add rate limiting to prevent brute force
- [ ] Implement email verification
- [ ] Add password reset functionality
- [ ] Set up CORS properly
- [ ] Implement token blacklisting for logout
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Monitor failed login attempts
- [ ] Hash JWT_SECRET in environment variables
- [ ] Set shorter token expiration for production
- [ ] Implement session management
- [ ] Add audit logging for admin actions

---

## Advanced Features (Future)

1. **Password Reset**

   - Email-based password reset
   - Temporary reset tokens

2. **Email Verification**

   - Verify email on signup
   - Resend verification email

3. **Session Management**

   - Track active sessions
   - Force logout from all devices

4. **Activity Logging**

   - Log all admin actions
   - Track property changes

5. **Role-Based Access Control (RBAC)**
   - Granular permissions
   - Feature-level access control

---

## Troubleshooting

### "Invalid or expired token"

- Token has expired (7 days)
- Token is malformed
- JWT_SECRET changed
- **Solution:** Login again to get new token

### "No token provided"

- Missing Authorization header
- Incorrect header format
- **Solution:** Add `Authorization: Bearer {token}`

### "Account deactivated"

- Admin isActive = false
- **Solution:** Contact superadmin or update database

### Login not working

- Check MongoDB connection
- Verify email/password
- Check server logs for errors

---

## Database Schema

```javascript
Admin {
  _id: ObjectId
  email: String (unique, required, lowercase)
  password: String (hashed, required, min 6 chars)
  name: String (required)
  role: String (enum: ['admin', 'superadmin'], default: 'admin')
  isActive: Boolean (default: true)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

**Indexes:**

- email (unique)

---

## Quick Start

1. **Add JWT_SECRET to `.env.local`**

   ```bash
   JWT_SECRET=your-secret-key-here
   ```

2. **Start server**

   ```bash
   npm run dev
   ```

3. **Create admin account**

   - Go to: `http://localhost:3000/admin/signup`
   - Fill in details
   - Click "Sign Up"

4. **Login**

   - Go to: `http://localhost:3000/admin/login`
   - Enter credentials
   - Click "Login"

5. **Use protected endpoints**
   - Token is automatically stored
   - Use token in Authorization header
   - Create/Update/Delete properties

---

**Your admin authentication system is ready! 🎉**

See `README-API.md` for API documentation.
