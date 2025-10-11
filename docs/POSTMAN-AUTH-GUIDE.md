# Postman Authentication Guide 🔐

## Quick Setup

### 1. Import the Collection

1. Open Postman
2. Click **Import**
3. Select `postman-collection.json`
4. Click **Import**

### 2. You'll see two folders:

- 📁 **Authentication** - Signup & Login
- 📁 **Properties** - All property endpoints

---

## Testing Authentication Flow

### Step 1: Create Admin Account

1. **Open:** Authentication → Admin Signup
2. **Click:** Send
3. ✅ **Token auto-saved** to environment variable `{{admin_token}}`

**Request Body (already filled):**

```json
{
  "name": "Test Admin",
  "email": "admin@test.com",
  "password": "test123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "email": "admin@test.com",
    "name": "Test Admin",
    "role": "admin"
  }
}
```

✨ **Token is automatically saved!** Check console for confirmation.

---

### Step 2: Login (if you already have an account)

1. **Open:** Authentication → Admin Login
2. **Edit** email/password if needed
3. **Click:** Send
4. ✅ **Token auto-saved** to `{{admin_token}}`

---

### Step 3: Use Protected Endpoints

Now that you have a token, you can use protected endpoints:

1. **Open:** Properties → Create Property
2. **Notice:** Authorization header already has `Bearer {{admin_token}}`
3. **Click:** Send
4. ✅ **Property created successfully!**

**All these endpoints are now unlocked:**

- ✅ Create Property
- ✅ Create Luxury Villa
- ✅ Update Property (Partial)
- ✅ Update Property (Full)
- ✅ Delete Property

---

## How Token Auto-Save Works

### Signup Request

The request has a **Test** script that runs after the response:

```javascript
if (pm.response.code === 201) {
  const responseData = pm.response.json();
  pm.environment.set("admin_token", responseData.token);
  pm.environment.set("admin_email", responseData.admin.email);
  console.log("Token saved:", responseData.token);
}
```

### Protected Requests

All protected endpoints include this header:

```
Authorization: Bearer {{admin_token}}
```

The `{{admin_token}}` variable is automatically filled with your saved token!

---

## Testing Without Auth (To See It Fail)

Want to see what happens without authentication?

1. **Open:** Properties → Create Property
2. **Go to Headers** tab
3. **Disable** the Authorization header (uncheck it)
4. **Click:** Send
5. ❌ **Result:** 401 Unauthorized

**Response:**

```json
{
  "success": false,
  "error": "No token provided. Please include Authorization header with Bearer token"
}
```

---

## Complete Test Flow

### 1. Signup

```
POST /api/auth/signup
→ 201 Created
→ Token saved ✅
```

### 2. Create Property (Protected)

```
POST /api/properties
Authorization: Bearer {{admin_token}}
→ 201 Created ✅
→ Property ID saved
```

### 3. Update Property (Protected)

```
PUT /api/properties/{{property_id}}
Authorization: Bearer {{admin_token}}
→ 200 OK ✅
```

### 4. Delete Property (Protected)

```
DELETE /api/properties/{{property_id}}
Authorization: Bearer {{admin_token}}
→ 200 OK ✅
```

### 5. Logout (Clear Token)

Manually clear the environment variable:

- Click Environment (top right)
- Find `admin_token`
- Delete value
- Try protected endpoint → ❌ 401

---

## Environment Variables

The collection uses these variables:

| Variable      | Description  | Auto-filled?                   |
| ------------- | ------------ | ------------------------------ |
| `base_url`    | API base URL | ✅ Yes (http://localhost:3000) |
| `admin_token` | JWT token    | ✅ Yes (after signup/login)    |
| `admin_email` | Admin email  | ✅ Yes (after signup/login)    |
| `property_id` | Property ID  | ✅ Yes (after create)          |

---

## Common Issues

### "Invalid or expired token"

**Solution:** Login again to get a fresh token

```
Authentication → Admin Login → Send
```

### "Email already exists"

**Solution:** Use different email or login with existing account

```
Change email in signup request
OR
Use Admin Login instead
```

### "No token provided"

**Solution:** Make sure you've logged in

```
1. Authentication → Admin Signup/Login
2. Click Send
3. Check console for "Token saved"
4. Try protected endpoint again
```

---

## Quick Commands Cheat Sheet

### 1. Create Admin

```
Authentication → Admin Signup → Send
```

### 2. Login

```
Authentication → Admin Login → Send
```

### 3. Create Property

```
Properties → Create Property → Send
```

### 4. Get All Properties

```
Properties → Get All Properties → Send
```

### 5. Update Property

```
Properties → Update Property (Partial) → Send
```

### 6. Delete Property

```
Properties → Delete Property → Send
```

---

## Public vs Protected Endpoints

### 🌍 Public (No Auth Required)

- POST /api/auth/signup
- POST /api/auth/login

### 🔐 Protected (Auth Required - ALL Property Endpoints)

- GET /api/properties
- GET /api/properties/[id]
- POST /api/properties
- PUT /api/properties/[id]
- PATCH /api/properties/[id]
- DELETE /api/properties/[id]

---

## Tips & Tricks

### 1. Check Token in Console

After signup/login, check Postman console:

```
Token saved: eyJhbGciOiJIUzI1NiIs...
Admin email: admin@test.com
```

### 2. View Environment Variables

Click the eye icon (👁️) next to environment dropdown to see all variables

### 3. Clear Token (Simulate Logout)

1. Click environment dropdown
2. Click edit icon
3. Clear `admin_token` value
4. Save

### 4. Test Multiple Admins

Change email in signup to create different accounts:

```json
{
  "name": "Another Admin",
  "email": "admin2@test.com",
  "password": "test123"
}
```

---

## That's It! 🎉

You now have:

- ✅ Complete authentication flow
- ✅ Auto-saving tokens
- ✅ Protected endpoints ready to use
- ✅ Easy testing workflow

**Start by signing up:**

```
Authentication → Admin Signup → Send
```

Then create your first property:

```
Properties → Create Property → Send
```

Happy testing! 🚀
