# Admin Authentication - Quick Reference

## 🚀 Quick Setup

### 1. Add to `.env.local`

```bash
JWT_SECRET=your-secret-key-change-this-in-production
```

### 2. Start Server

```bash
npm run dev
```

### 3. Create Admin Account

Navigate to: `http://localhost:3000/admin/signup`

### 4. Login

Navigate to: `http://localhost:3000/admin/login`

---

## 📍 API Endpoints

### Authentication

| Endpoint           | Method | Public | Description          |
| ------------------ | ------ | ------ | -------------------- |
| `/api/auth/signup` | POST   | ✅     | Create admin account |
| `/api/auth/login`  | POST   | ✅     | Admin login          |

### Properties (All Protected)

| Endpoint               | Method    | Public | Auth Required |
| ---------------------- | --------- | ------ | ------------- |
| `/api/properties`      | GET       | ❌     | Yes           |
| `/api/properties`      | POST      | ❌     | Yes           |
| `/api/properties/[id]` | GET       | ❌     | Yes           |
| `/api/properties/[id]` | PUT/PATCH | ❌     | Yes           |
| `/api/properties/[id]` | DELETE    | ❌     | Yes           |

---

## 🔑 Using Authentication

### 1. Signup Request

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepass123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {...}
}
```

### 2. Login Request

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securepass123"
}
```

### 3. Use Token in Protected Routes

```bash
POST /api/properties
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "title": "New Property",
  "price": 500000,
  ...
}
```

---

## 💻 Frontend Usage

### Login/Signup Components

**Login Page:** `/admin/login`  
**Signup Page:** `/admin/signup`

### Store Token

```javascript
// Token is automatically stored in localStorage
const token = localStorage.getItem("adminToken");
const admin = JSON.parse(localStorage.getItem("adminData"));
```

### Make Authenticated Requests

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

### Logout

```javascript
localStorage.removeItem("adminToken");
localStorage.removeItem("adminData");
window.location.href = "/admin/login";
```

---

## 🧪 Testing in Postman

### 1. Signup

```
POST http://localhost:3000/api/auth/signup
Body (JSON):
{
  "name": "Test Admin",
  "email": "test@admin.com",
  "password": "test123"
}
```

→ Copy `token` from response

### 2. Use Token

Add to Headers in other requests:

```
Key: Authorization
Value: Bearer {paste-token-here}
```

### 3. Create Property (Protected)

```
POST http://localhost:3000/api/properties
Headers:
  Authorization: Bearer {token}
  Content-Type: application/json
Body: {property data}
```

---

## ⚡ Common Commands

### Test Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@test.com","password":"test123"}'
```

### Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"test123"}'
```

### Create Property (with token)

```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","price":500000,...}'
```

---

## 🔒 Security Notes

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens expire in 7 days
- ✅ Tokens required for create/update/delete
- ✅ GET requests remain public
- ✅ Email validation & uniqueness
- ⚠️ Change JWT_SECRET in production!

---

## ❌ Common Errors

| Error              | Cause                     | Solution                    |
| ------------------ | ------------------------- | --------------------------- |
| `401 Unauthorized` | No token or invalid token | Add/refresh token           |
| `409 Conflict`     | Email already exists      | Use different email         |
| `400 Bad Request`  | Missing fields            | Include all required fields |
| `403 Forbidden`    | Account deactivated       | Contact admin               |

---

## 📦 Files Created

```
src/
├── types/admin.ts                  ✅
├── models/Admin.ts                 ✅
├── lib/
│   ├── auth.ts                     ✅
│   └── authMiddleware.ts           ✅
├── app/
│   ├── api/auth/
│   │   ├── signup/route.ts         ✅
│   │   └── login/route.ts          ✅
│   └── admin/
│       ├── login/page.tsx          ✅
│       └── signup/page.tsx         ✅
└── components/
    ├── AdminLogin.tsx              ✅
    └── AdminSignup.tsx             ✅
```

---

## 🎯 Quick Test Flow

1. **Signup:** `http://localhost:3000/admin/signup`
2. **Get token** from response → saved to localStorage
3. **Test protected route:**
   - Try without token → ❌ 401
   - Try with token → ✅ Works!
4. **Logout:** Clear localStorage
5. **Login:** `http://localhost:3000/admin/login`
6. **Continue using** protected routes

---

**That's it! Your auth system is ready to use! 🎉**

For detailed docs, see `AUTH-SETUP.md`
